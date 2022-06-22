class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :img_url
      t.text :description
      t.string :title
      t.datetime :validity_start
      t.datetime :validity_end
      t.string :category
      t.string :tag
      t.string :ocr_img_url

      t.timestamps
    end
  end
end
