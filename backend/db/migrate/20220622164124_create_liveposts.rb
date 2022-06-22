class CreateLiveposts < ActiveRecord::Migration[5.2]
  def change
    create_table :liveposts do |t|
      t.string :imgUrl
      t.string :title
      t.string :category
      t.string :promotionDate
      t.string :description

      t.timestamps
    end
  end
end
