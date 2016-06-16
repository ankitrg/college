class Institute < ActiveRecord::Base
  attr_accessible :estd, :name
  has_many :students
end
