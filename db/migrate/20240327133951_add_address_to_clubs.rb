class AddAddressToClubs < ActiveRecord::Migration[7.1]
  def change
    add_column :clubs, :address, :string
  end
end
