class CreatePendingPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :pending_posts do |t|
      t.string :score
      t.string :img
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
