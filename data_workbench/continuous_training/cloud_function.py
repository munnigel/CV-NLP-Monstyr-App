import kfp
import json
import time
from google.cloud import bigquery
from google.cloud.exceptions import NotFound
from kfp.v2.google.client import AIPlatformClient

client = bigquery.Client()
RETRAIN_THRESHOLD = 100 # Change this based on your use case

def insert_bq_data(table_id, num_rows):
    rows_to_insert = [
        {u"num_rows_last_retraining": num_rows, u"last_retrain_time": time.time()}
    ]

    errors = client.insert_rows_json(table_id, rows_to_insert)
    if errors == []:
        print("New rows have been added.")
    else:
        print(f"Encountered errors while inserting rows: {errors}")

def create_count_table(table_id, num_rows):
    schema = [
        bigquery.SchemaField("num_rows_last_retraining", "INTEGER", mode="REQUIRED"),
        bigquery.SchemaField("last_retrain_time", "TIMESTAMP", mode="REQUIRED")
    ]
    table = bigquery.Table(table_id, schema=schema)
    table = client.create_table(table)
    print(f"Created table {table.project}.{table.dataset_id}.{table.table_id}")

    insert_bq_data(table_id, num_rows)
    
def create_pipeline_run():
    print('Kicking off a pipeline run...')
    
    REGION = "asia-southeast1" # Change this to the region you want to run in
    api_client = AIPlatformClient(
        project_id=client.project,
        region=REGION,
    )
    try:
        response = api_client.create_run_from_job_spec(
            "gs://monstyrxai-bucket/compiled_pipeline.json",
            pipeline_root="gs://monstyrxai-bucket/pipeline_root/",
            parameter_values={"project": client.project, "display_name": "pipeline_gcf_trigger"}
        )
        return response
    except:
        print("Error trying to run the pipeline")
        raise

# This should be the entrypoint for your Cloud Function
def check_table_size(request):
    request = request.get_data()

    try: 
        request_json = json.loads(request.decode())
    except ValueError as e:
        print(f"Error decoding JSON: {e}")
        return "JSON Error", 400
    
    if request_json and 'bq_dataset' in request_json:
        dataset = request_json['bq_dataset']
        table = request_json['bq_table']

        data_table = client.get_table(f"{client.project}.{dataset}.{table}")

        query = (
            "SELECT content FROM `monstyrxai.custom_training_data.custom-text-classification` "
            )
        query_job = client.query(
            query,
            # Location must match that of the dataset(s) referenced in the query.
            location="asia-southeast1",
        )  # API request - starts the query

        results = query_job.result()  # Wait for query to complete.



        current_rows = results.total_rows
        print(f"{table} table has {current_rows} rows")

        # See if `count` table exists in dataset
        try:
            count_table = client.get_table(f"{client.project}.{dataset}.count")
            print("Count table exists, querying to see how many rows at last pipeline run")

        except NotFound:
            print("No count table found, creating one...")
            create_count_table(f"{client.project}.{dataset}.count", current_rows)
    
        query_job = client.query(
            """
            SELECT num_rows_last_retraining FROM `monstyrxai.custom_training_data.count`
            ORDER BY last_retrain_time DESC
            LIMIT 1"""
        )

        results = query_job.result()
        for i in results:
            last_retrain_count = i[0]

        rows_added_since_last_pipeline_run = current_rows - last_retrain_count
        print(f"{rows_added_since_last_pipeline_run} rows have been added since we last ran the pipeline")

        if (rows_added_since_last_pipeline_run >= RETRAIN_THRESHOLD):

            # convert bq table to csv and put it in bucket as output.csv
            # from google.cloud import bigquery
            # client = bigquery.Client()
            bucket_name = 'bucket-for-outputcsv'
            project = "monstyrxai"
            dataset_id = "custom_training_data"
            table_id = "custom-text-classification"

            destination_uri = "gs://{}/{}".format(bucket_name, "output.csv")
            # dataset_ref = bigquery.DatasetReference(project, dataset_id)
            # table_ref = dataset_ref.table(table_id)

            extract_job = client.extract_table(
                "monstyrxai.custom_training_data.custom-text-classification",
                destination_uri,
                # Location must match that of the source table.
                location="asia-southeast1",
            )  # API request
            extract_job.result()  # Waits for job to complete.

            print(
                "Exported {}:{}.{} to {}".format(project, dataset_id, table_id, destination_uri)
            )

            # run pipeline
            pipeline_result = create_pipeline_run()
            insert_bq_data(f"{client.project}.{dataset}.count", current_rows)
    else:
        return f"No BigQuery data given"