# frozen_string_literal: true

class BigQueryService
    require 'google/cloud/bigquery'

    def initialize
    # You can move this one to setting instead
    project_id = 'rubyduckies'
    key_file = Rails.root.join('./app/rubyduckies-d1f7f1d6fbc3.json')
    @big_q = Google::Cloud::Bigquery.new project: project_id, keyfile: key_file
    @dataset = @big_q.dataset "rubyduckies_bigquery_dataset", skip_lookup: true
    @table = @dataset.table "categories_table", skip_lookup: true
    super
    end

    def query(raw_query)
    @big_q.query raw_query
    end

    def datasets
    @big_q.datasets
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