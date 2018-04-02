import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './navbar/Navbar';
import Login from './login/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'nothing',
      author: ['no one'],
    };
  }

  componentDidMount() {
    axios
      .get('/api/books')
      .then(res => {
        const books = res.data;
        const book = _.sample(books);

        if (book) {
          this.setState({
            title: `"${book.title}"`,
            author: _.first(book.author_name),
          });
        }
      })
      .catch();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <div className="page-container">
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />

            <div>
              I am reading {this.state.title} by {this.state.author} right now.
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const Landing = () => (
  <h1>
    What are you reading? <span className="link"> Start a diary </span> and tell
    your friends…
  </h1>
);

export default App;
