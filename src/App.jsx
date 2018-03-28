import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './navbar/Navbar';

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
        const book = _.sample(books);

        if (book) {
          this.setState({ book: `"${book.title_suggest}"` });
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

            <div> I'm reading {this.state.book} right now. </div>
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

const Login = () => <div>You are not logged in.</div>;

export default App;
