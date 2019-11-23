import React, { Component } from "react";
import axios from 'axios';
import {DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from '../../constants'
import {Button} from '../Button'
import {Table} from '../Table'
import {Search} from '../Search'
import "./App.css";

// const list = [
//   {
//     title: "React",
//     url: "https://reactjs.org/",
//     author: "Jordan Walke",
//     num_comments: 3,
//     points: 4,
//     objectID: 0
//   },
//   {
//     title: "Redux",
//     url: "https://redux.js.org/",
//     author: "Dan Abramov, Andrew Clark",
//     num_comments: 2,
//     points: 5,
//     objectID: 1
//   }
// ];

// const isSearch = searchTerm => item =>
//   item.title.toLowerCase().includes(searchTerm.toLowerCase());
// const DEFAULT_QUERY = "redux";
// const DEFAULT_HPP = '10';
// const PATH_BASE = "https://hn.algolia.com/api/v1"; //'https://hn.mydomain.com/api/v1';//
// const PATH_SEARCH = "/search";
// const PARAM_SEARCH = "query=";
// const PARAM_PAGE = 'page=';
// const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // list,
      result: null,
      searchTerm: DEFAULT_QUERY,
      error: null,
    };
    //New dont'have to do bind (this) to class method. It automatically bind
    // this.onDismiss = this.onDismiss.bind(this);

    // this.setSearchTopStories = this.setSearchTopStories.bind(this);
    // this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    // this.onSearchChange = this.onSearchChange.bind(this);
    // this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

  setSearchTopStories=(result)=> {
    //this.setState({ result: result });
    const { hits, page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      result: { hits: updatedHits, page }
    });
  }

  onSearchSubmit = (event) => {
    //console.log(this.state.searchTerm)
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault();

  }

  fetchSearchTopStories(searchTerm, page = 0) {
    //fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    //   .then(response => response.json())
    //   .then(result => this.setSearchTopStories(result))
    //   .catch(error => this.setState({ error }));

      axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }



  render() {
    const { result, searchTerm ,error} = this.state;
    const page = (result && result.page) || 0;

    // if (error) {
    //   return <p>Something went wrong.</p>;
    // }

    // if (!result) {
    //   return null;
    // }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
            Search
          </Search>
        </div>
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
          </div>
          : result && (
            <Table
              list={result.hits}
              pattern={searchTerm}
              onDismiss={this.onDismiss}
            />
          )
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm)
    // fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    //   .then(response => response.json())
    //   .then(result => this.setSearchTopStories(result))
    //   .catch(error => error);
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

// const Search = ({ value, onChange, onSubmit, children }) => {
//   return (
//     <form onSubmit={onSubmit}>
//       <input type="text" value={value} onChange={onChange} />
//       <button type="submit">
//         {children}
//       </button>
//     </form>
//   );
// };

// const largeColumn = {
//   width: "40%"
// };

// const midColumn = {
//   width: "30%"
// };

// const smallColumn = {
//   width: "10%"
// };

// const Table = ({ list, pattern, onDismiss }) => (
//   <div className="table">
//     {list.map(item => (
//       <div key={item.objectID} className="table-row">
//         <span style={largeColumn}>
//           <a href={item.url}>{item.title}</a>
//         </span>
//         <span style={{ width: "30%" }}>{item.author}</span>
//         <span style={smallColumn}>{item.num_comments}</span>
//         <span style={smallColumn}>{item.points}</span>
//         <span style={{ width: "10%" }}>
//           <Button
//             onClick={() => onDismiss(item.objectID)}
//             className="button-inline"
//           >
//             Dismiss
//           </Button>
//         </span>
//       </div>
//     ))}
//   </div>
// );

// class Button extends Component {
//   render() {
//     const { onClick, className = "", children } = this.props;

//     return (
//       <button onClick={onClick} className={className} type="button">
//         {children}
//       </button>
//     );
//   }
// }

export default App;
