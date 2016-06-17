class UpdateStudentEid
  # may need attr_reader
  # itera
  def self.update
    students = Student.all
    students.each do |student|
      if student.extended_id == nil
        student.extended_id = get_extended_id(student)
        student.save
      end
    end
  end

  def self.get_extended_id(student)
    eid = student.student_id.to_s + "_"
    eid += student.institute.name[0...2] + "_"
    eid += student.institute.id.to_s
    eid
  end
end
