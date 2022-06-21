class CreatePendings < ActiveRecord::Migration[7.0]
  def change
    create_table :pendings do |t|
      t.string :imgUrl
      t.string :title
      t.string :category
      t.string :promotionDate
      t.string :description

      t.timestamps
    end
  end
end
