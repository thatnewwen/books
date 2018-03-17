import React, { Component } from 'react';

import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    axios
      .get('/books')
      .then(res => {
        this.setState({ books: res.data[1].name });
      })
      .catch();
  }

  render() {
    return <div>{this.state.books}</div>;
  }
}

export default App;
