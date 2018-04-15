import axios from 'axios';

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
  render() {
    return (
      <div>
        <span> What are you reading? </span>
        <span className="link">Start a diary</span>
        <span> and tell your friends… </span>
      </div>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, books: [] };
  }

  componentDidMount() {
    setAuthToken();
    axios
      .get('/user/profile')
      .then(res => {
        const user = res.data;

        this.setState({ user });

        axios
          .get('/api/books', { params: { bookIds: user.bookIds } })
          .then(res => {
            this.setState({ books: res.data });
          })
          .catch();
      })
      .catch();
  }

  render() {
    if (!this.state.user) {
      return <div> Loading... </div>;
    }

    return (
      <div>
        <div> I am {this.state.user.username}.</div>
        <div> These are my books: </div>
        <br />
        <ul>
          {this.state.books.map((book, index) => (
            <li key={index}> {book.title} </li>
          ))}
        </ul>
      </div>
    );
  }
}

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

export default App;
