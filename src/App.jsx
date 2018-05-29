import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import history from './history';

import Navbar from './navbar/Navbar';
import Landing from './landing/Landing';
import Login from './login/Login';
import Profile from './profile/Profile';
import Journal from './journal/Journal';

const LoginContext = React.createContext('loggedIn');
let axios = Axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  login(token, callback) {
    if (token) {
      localStorage.setItem('token', token);

      axios = Axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      this.setState({ loggedIn: true }, callback);
    }
  }

  logout() {
    localStorage.setItem('token', null);
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <Router history={history}>
          <div>
            <Navbar />

            <div className="page-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/journal" component={Journal} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </LoginContext.Provider>
    );
  }
}

const NotFound = () => (
  <h1>Whoops! We can't find the page you're looking for.</h1>
);

export { App, LoginContext, axios };
