class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.integer :student_id
      t.string :department
      t.string :year
      t.integer :maths
      t.integer :physics
      t.integer :chemistry

      t.timestamps
    end
  end
end
