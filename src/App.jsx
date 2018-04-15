import axios from 'axios';
import _ from 'lodash';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './navbar/Navbar';
import Login, { setAuthToken } from './login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <div className="page-container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

class Landing extends Component {
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
      <div>
        <span> What are you reading? </span>
        <span className="link">Start a diary</span>
        <span> and tell your friends… </span>

        <div>
          I am reading {this.state.title} by {this.state.author} right now.
        </div>
      </div>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    setAuthToken();
    axios
      .get('/user/profile')
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch();
  }

  render() {
    return (
      <div>
        I am {this.state.user ? this.state.user.username : 'not logged in'}.
      </div>
    );
  }
}

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

export default App;
