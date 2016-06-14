class StudentsController < ApplicationController
  # GET /students
  # GET /students.json
  def index
    @students = Student.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @students }
    end
  end

  # GET /students/1
  # GET /students/1.json
  def show
    @student = Student.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @student }
    end
  end

  # GET /students/new
  # GET /students/new.json
  def new
    @student = Student.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @student }
    end
  end

  # GET /students/1/edit
  def edit
    @student = Student.find(params[:id])
  end

  # POST /students
  # POST /students.json
  def create
    @student = Student.new(params[:student])

    respond_to do |format|
      if @student.save
        format.html { redirect_to @student,
                      notice: 'Student was successfully created.' }
        format.json { render json: @student,
                      status: :created,
                      location: @student }
      else
        format.html { render action: "new" }
        format.json { render json: @student.errors,
                      status: :unprocessable_entity }
      end
    end
  end

  # PUT /students/1
  # PUT /students/1.json
  def update
    @student = Student.find(params[:id])

    respond_to do |format|
      if @student.update_attributes(params[:student])
        format.html { redirect_to @student,
                      notice: 'Student was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @student.errors,
                      status: :unprocessable_entity }
      end
    end
  end

  # DELETE /students/1
  # DELETE /students/1.json
  def destroy
    @student = Student.find(params[:id])
    @student.destroy

    respond_to do |format|
      format.html { redirect_to students_url }
      format.json { head :no_content }
    end
  end

  def query
    # use .distinct with 4.2
    @years = Student.select(:year).uniq
    @departments = Student.select(:department).uniq
  end

  def get
    # render plain:  params[:first].inspect
    sortby = params[:sort]
    group = params[:group]
    # group = [].push("id", group)

    fields = params[:fields]

    compare = params[:compare]
    compareon = params[:on]
    first = params[:first]
    second = params[:second]

    if compare == 'true'

    end

    total = params[:total]
    q = get_display_params(fields)
    q.push(group)
    @total = nil
    if total == 'true'
      q1 = get_total_params(fields)
      @total = Student.select(q1)
      # q = q + q1
    end



    @count = Student.all.count

    @students = Student.group(group).select(q).order(sortby)
    # Data for head
    head_fields = [group] + fields

    current_data = get_current_data(@students, fields)

    @obj = {:head_fields => head_fields,
            :current_data=> current_data,
            :count=> @count, :total=> @total
          }
    # render json: @obj
  end

  # Private section begins
  private

    def get_current_data(students, fields)
      current_data = []
      students.each do |student|
        temp = {}
        fields.each do |field|
          temp[field] = student[field]
        end
        current_data.push(temp)
      end
      current_data
    end

    def get_total_params(fields)
      lst = []
      fields.each do |field|
        temp = "SUM(#{field}) as #{field}_sum"
        lst.push(temp)
      end
      lst
    end

    def get_display_params(fields)
      lst = []
      fields.each do |field|
        temp = "AVG(#{field}) as #{field}"
        lst.push(temp)
      end
      return lst
    end


    def student_params
      params.require(:student).permit(
        :student_id,
        :department,
        :maths,
        :physics,
        :chemistry,
        :year
        )
    end
end
