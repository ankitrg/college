var Table = React.createClass({
  render: function() {
    console.log("Table");
    console.log(this.props.students);
    return(
      <table className="students_table">
          <TableRows
            students={this.props.students.current_data}
            heads={this.props.students.head_fields}
            past_students={this.props.students.past_data}
            total={this.props.students.total}
            count={this.props.students.count}
          />
      </table>
    );
  }
});

var TableRows = React.createClass({
  getDataRows: function (students, past_students) {
    lst = [];
    for(var i=0; i<students.length; i++){
      //push groupby console
      if (past_students != null) {
        lst.push(<tr><td>
          {past_students[i].group}</td>
        </tr>);
      }

      //push first compror column
      lst.push(<tr>
      <TableCols student={students[i]}
        heads={this.props.heads} />
      </tr>);

      //push second comparor column
      if (past_students != null) {
        lst.push(<tr>
          <TableCols student={past_students[i]}
            heads={this.props.heads} />
        </tr>);
      }
    }
    return lst;
  },

  render: function () {
    console.log("TableRows");
    console.log(this.props.students);
    console.log(this.props.total);

    return(
      <div>
        <tr>
          <TableHeads heads={this.props.heads} />
        </tr>

        {this.getDataRows(this.props.students, this.props.past_students)}

        <tr>
          <TableSum
            total={this.props.total}
            count={this.props.count}
            heads={this.props.heads}
          />
        </tr>
      </div>
    );
  }
});

var TableHeads = React.createClass({
  render: function () {
    lst = [];
    for (var i=0; i < this.props.heads.length; i++){
      var x = this.props.heads[i];
      lst.push(<th>{x}</th>);
    }

    return(
      <div>
        {lst}
      </div>
    );
  }
});

var TableCols = React.createClass({
  render: function () {
    console.log("TableCols");
    console.log(this.props.student);
    console.log(this.props.heads);
    lst = [];

    for (var i=0; i < this.props.heads.length; i++){
      var x = this.props.heads[i];
      console.log(this.props.student[x]);
      lst.push(<td>{this.props.student[x]}</td>);
    }
    // {lst}
    //   <tr>{lst}</tr>
    return(
      <div>
        {lst}
      </div>
    );
  }
});

var TableSum = React.createClass({
  render: function() {
    console.log("in TableSum");
    console.log(this.props.total);
    lst = [];

    if (this.props.total != null) {
      lst.push(<td>Total</td>);
      console.log("not null");
      total = this.props.total;
      console.log(total.length);
      for (var i=1; i < this.props.heads.length; i++) {
        console.log("inside for");
        var x = this.props.heads[i];
        console.log(x);
        console.log(this.props.total[x]);
        lst.push(<td>{Math.trunc(this.props.total[x] / this.props.count)}</td>);
      }
    }
    return(
      <div>
        {lst}
      </div>
    );
  }
});


var ready = function () {
  React.render(
    // <HelloWorld students = {RG.students}/>,
    <Table students = {RG.students} />,
    document.getElementById('data-container')
  );
};

$(document).ready(ready);
