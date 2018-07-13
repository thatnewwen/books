import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import history from './history';

import Navbar from './navbar/Navbar';
import Landing from './landing/Landing';
import Login from './login/Login';
import Profile from './profile/Profile';
import Journal from './journal/Journal';
import Search from './search/Search';

const LoginContext = React.createContext('loggedIn');
let axios = getAxios();

function getAxios(token = localStorage.getItem('token')) {
  const params = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  return Axios.create(params);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: localStorage.getItem('user'),
      login: this.login.bind(this),
      logout: this.logout.bind(this),
    };
  }

  login({ token, user }, callback) {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', user);

      axios = getAxios();

      this.setState({ user }, callback);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    axios = getAxios();

    this.setState({ user: null });
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
                <Route exact path="/register" component={Login} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/journal" component={Journal} />
                <Route path="/search" component={Search} />

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
