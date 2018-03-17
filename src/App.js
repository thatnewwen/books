import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    axios
      .get('/api/books')
      .then(res => {
        const books = res.data;
        const book = _.first(books);

        if (book) {
          this.setState({ book: book.title });
        }
      })
      .catch();
  }

  render() {
    return <div>{this.state.book}</div>;
  }
}

export default App;
