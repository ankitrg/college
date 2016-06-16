class CreateInstitutes < ActiveRecord::Migration
  def change
    # drop_table :institutes
    create_table :institutes do |t|
      t.string :name
      t.string :estd

      t.timestamps
    end
  end
end
