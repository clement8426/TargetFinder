class CreateClubs < ActiveRecord::Migration[7.1]
  def change
    create_table :clubs do |t|
      t.string :name
      t.string :city
      t.text :description

      t.timestamps
    end
  end
end
