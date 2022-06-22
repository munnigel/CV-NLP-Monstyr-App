class CreatePendingposts < ActiveRecord::Migration[5.2]
  def change
    create_table :pendingposts do |t|
      t.string :score
      t.string :imgUrl
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
