class AddCreatorIdToClubs < ActiveRecord::Migration[7.1]
  def change
    add_column :clubs, :creator_id, :integer
    add_index :clubs, :creator_id
  end
end
