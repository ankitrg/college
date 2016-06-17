class Institute < ActiveRecord::Base
  attr_accessible :estd, :name
  has_many :students
  before_update :update_student_extended_id

  protected
    def update_student_extended_id
      if self.name_changed?
        students = get_student_list
        students.each do |student|
          student.extended_id = get_extended_id(student)
          # student.extended_id = params[:name]
          student.save
        end
      end
    end

    def get_student_list
      students = Student.where(institute_id: self.id)
    end

    def get_extended_id(student)
      eid = student.student_id.to_s + "_"
      eid += self.name[0...2] + "_"
      eid += student.institute.id.to_s
      eid
    end
end
