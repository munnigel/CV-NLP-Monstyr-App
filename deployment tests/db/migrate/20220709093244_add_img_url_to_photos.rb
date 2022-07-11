class AddImgUrlToPhotos < ActiveRecord::Migration[7.0]
  def change
    add_column :photos, :ImgUrl, :string
  end
end
