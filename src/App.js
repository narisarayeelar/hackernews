import React, { Component } from "react";
import "./App.css";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

const isSearch = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list,
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    //New dont'have to do bind (this) to class method. It automatically bind
    // this.onDismiss = this.onDismiss.bind(this);
  }

  // onDismiss(id){
  //   // function isNotId(item){
  //   //   return item.objectID !==id;
  //   // }
  //   // const updatedList = this.state.list.filter(isNotId)

  //   //ES6
  //   const isNotId = (item) => item.objectID !==id;
  //   const updatedList = this.state.list.filter(isNotId);
  //   this.setState({list:updatedList});

  // }

  //********************************************************************** */
  //Class methods can be auto-bound using JavaScript ES6 arrow functions:
  //********************************************************************** */
  onDismiss = id => {
    const isNotId = item => item.objectID !== id;
    //const updatedList = this.state.list.filter(isNotId);
    const updatedHits = this.state.result.hits.filter(isNotId);
    //this.setState({ list: updatedList });
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  };

  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  //// ES5
  // isSearch(searchTerm){
  //   return function(item){
  //     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   }
  // }

  setSearchTopStories(result) {
    this.setState({ result: result });
  }

  render() {
    const { result, searchTerm } = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
}

// class Search extends Component {
//   render() {
//     const { searchTerm, onSearchChange, children } = this.props
//     return (
//       <form>
//         {children}
//         <input type="text" onChange={onSearchChange} value={searchTerm} />
//       </form>
//     )
//   }
// }

const Search = ({ value, onChange, children }) => {
  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
};

const largeColumn = {
  width: "40%"
};

const midColumn = {
  width: "30%"
};

const smallColumn = {
  width: "10%"
};

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearch(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: "30%" }}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span style={smallColumn}>{item.points}</span>
        <span style={{ width: "10%" }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);

class Button extends Component {
  render() {
    const { onClick, className = "", children } = this.props;

    return (
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    );
  }
}

export default App;
