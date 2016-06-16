var Search = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  handleOnSearch: function (key) {
    console.log("handle on Search");
    console.log(key);
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: key,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    console.log("search");
    return(
      <div>
        Search
        <SearchBox onSearch={this.handleOnSearch} />
        <ResultBox data={this.state.data} />
      </div>
    );
  }
});


var SearchBox = React.createClass({
  getInitialState: function () {
      return {key : ''};
  },

  // called when text in search box changes
  handleSearch: function (e) {
    this.setState({key: e.target.value});
    console.log("in handle search");
    console.log(e.target.value);
    // sending query with this key to server form base
    this.props.onSearch({key: e.target.value});

  },

  render: function () {
    return (
      <form className="formClass">
        <input
          type="text"
          placeholder="search text"
          value={this.state.key}
          onChange={this.handleSearch}
        />
      </form>
    );
  }
});


var ResultBox = React.createClass({
  render: function () {
    var results = this.props.data.map(function (d) {
      return(
        <tr>
          {d.key}
        </tr>
      );
    })
    return(
      <div className="resultTable">
        <table>
          {results}
        </table>
      </div>
    );
  }
});


var ready = function () {
  console.log("ready");
  React.render(
    // <HelloWorld students = {RG.students}/>,
    <Search url="hello"/>,
    document.getElementById('search-container')
  );
};

$(document).ready(ready);
