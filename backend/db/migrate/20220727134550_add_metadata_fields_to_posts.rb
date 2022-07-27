class AddMetadataFieldsToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :meta_label_detection, :text
    add_column :posts, :meta_cat_gen, :text
    add_column :posts, :meta_date_gen, :text
    add_column :posts, :meta_title_gen, :text
  end
end