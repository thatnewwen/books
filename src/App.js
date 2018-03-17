import React, { Component } from 'react';

import axios from 'axios';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { book: 'nothing' };
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
    return (
      <div className="container">
        <div className="another">I'm reading {this.state.book} right now.</div>
      </div>
    );
  }
}

export default App;
