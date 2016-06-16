var Search = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    // this.searchOnServer();
    // setInterval(this.searchOnServer, this.props.pollInterval);
  },

  searchOnServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: key,
      success: function (data) {
        console.log("in ajax");
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
        console.log("in ajax");
        console.log(data);
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
    debugger;
    console.log("result box");
    console.log(this.props.data);
    var results = this.props.data.map(function (d) {
      console.log(d.name);
      return(
        <tr key={d.id}>
          <td>{d.name}</td>
        </tr>
      );
    });

    console.log(results);
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
    <Search url="find" pollInterval={1000}/>,
    document.getElementById('search-container')
  );
};

$(document).ready(ready);
