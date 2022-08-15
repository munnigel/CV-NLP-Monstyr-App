# frozen_string_literal: true

class BigQueryService
    require 'google/cloud/bigquery'

    def initialize
    # You can move this one to setting instead
    project_id = '' # insert BigQuery project id
    key_file = Rails.root.join('./app/keyfile.json') # change keyfile.json to appropriate keyfile for Google service account
    @big_q = Google::Cloud::Bigquery.new project: project_id, keyfile: key_file
    @dataset = @big_q.dataset "custom_training_data", skip_lookup: true
    @table = @dataset.table "custom-text-classification", skip_lookup: true
    super
    end

    def query(raw_query)
    @big_q.query raw_query
    end

    def datasets
    @big_q.datasets
    end

    def extract_table bucket_name = "gs://monstyrxai-bucket", # change to appropriate bucket
        dataset_id  = "custom_training_data",
        table_id    = "custom_text_classification"

        bigquery = Google::Cloud::Bigquery.new
        dataset  = bigquery.dataset dataset_id
        table    = dataset.table    table_id

        # Define a destination URI. Use a single wildcard URI if you think
        # your exported data will be larger than the 1 GB maximum value.
        destination_uri = "gs://#{bucket_name}/output.csv"

        extract_job = table.extract_job destination_uri do |config|
        # Location must match that of the source table.
        config.location = "US"
        end
        extract_job.wait_until_done! # Waits for the job to complete

        puts "Exported #{table.id} to #{destination_uri}"
    end

    def stream_data(rows)
    # rows = [
    #     {
    #         "content" => "Introducing Swisslineâs Formula X-02 Oxygen-Shock Activator. Delivers an extra boost of 0â and radiance to your skin, it's the go-to product to revitalise dullness and get you looking at your best! Drop by in-store at Swissline Counter, Cosmetics Department, Level 1 to check out the full collections today! #takashimayasg",
    #         "categories" => ["Women's","Sports"]
    #     },
    #     {
    #         "content" => "Random content decription thing.",
    #         "categories" => ["category_1","category_2"]
    #     }
    # ]
    @table.insert rows
    end

end