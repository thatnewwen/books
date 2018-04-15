import axios from 'axios';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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
      <div className="tagline">
        <div>
          What are you <b>reading</b>?
        </div>
        <div>
          Let's
          <Link to="/login" className="link">
            start a diary
          </Link>
          and show your friends.
        </div>
      </div>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [], isLoaded: false };
  }

  componentDidMount() {
    setAuthToken();
    axios
      .get('/user/profile')
      .then(res => {
        const user = res.data;
        this.setState({ isLoaded: true });

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
    if (!this.state.isLoaded) {
      return <div className="book-shelf"> Loading... </div>;
    }

    return (
      <div>
        <div className="book-shelf">Your Bookshelf</div>
        <ul>
          {this.state.books.map((book, index) => (
            <li key={index} className="book-container">
              {book.title}
            </li>
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
