class AddAccTypeColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :account_type, :string
  end
end
