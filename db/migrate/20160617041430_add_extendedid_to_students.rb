class AddExtendedidToStudents < ActiveRecord::Migration
  def change
    add_column :students, :extended_id, :string
  end
end
