class AddSelectedTitleToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :selected_title, :string
  end
end
