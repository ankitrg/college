class Student < ActiveRecord::Base
  attr_accessible :chemistry, :department, :maths, :physics, :student_id, :year
end
