class AddDetailsToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :sp_id, :integer
    add_column :posts, :pid, :integer
    add_column :posts, :status, :string
    add_column :posts, :gen_title, :text
    change_column :posts, :title, :text
    add_column :posts, :gen_categories, :text
    add_column :posts, :categories, :text
    add_column :posts, :gen_start_date, :datetime
    add_column :posts, :start_date, :datetime
    add_column :posts, :gen_end_date, :datetime
    add_column :posts, :end_date, :datetime
    add_column :posts, :gen_tags, :text
    add_column :posts, :tags, :text
    add_column :posts, :od_image, :text
    add_column :posts, :ocr_image, :text
    add_column :posts, :gen_content, :text
    add_column :posts, :images, :text
    add_column :posts, :content, :text
    add_column :posts, :score, :float
    add_column :posts, :od_latency, :integer
    add_column :posts, :ocr_latency, :integer
    add_column :posts, :ner_date_latency, :integer
    add_column :posts, :ner_categories_latency, :integer
    add_column :posts, :ner_title_latency, :integer
  end
end
