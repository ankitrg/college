require_relative "update_student_eid"
namespace :backfill do
  desc "Backfills students extended id column with task"
  task update_eid:  :environment do
    UpdateStudentEid.update
    puts "I am here"
  end
end
