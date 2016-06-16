class AddInstituteToStudents < ActiveRecord::Migration
  def change
    add_column :students, :institute_id, :integer
  end
end
