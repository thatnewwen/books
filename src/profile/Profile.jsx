import React, { Component } from 'react';
import axios from 'axios';
import { setAuthToken } from '../login/Login';

import './Profile.css';

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
      return <div className="profile-header"> Loading... </div>;
    }

    return (
      <div>
        <div className="profile-header">Your Bookshelf</div>
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

export default Profile;
