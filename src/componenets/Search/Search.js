import React, { Component } from "react";

class Search extends Component //= ({ value, onChange, onSubmit, children }) => 
{
  componentDidMount(){
    if(this.input){
      this.input.focus();
    }
  }

  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <input type="text"
          value={value}
          onChange={onChange}
          ref = {el=> this.input = el}
        />
        <button type="submit">
          {children}
        </button>
      </form>
    );
  }
}

export default Search