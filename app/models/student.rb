class Student < ActiveRecord::Base
  attr_accessible :chemistry, :department, :maths, :physics,
                  :student_id, :year, :institute_id
  belongs_to :institute
end
