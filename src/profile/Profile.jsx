import React, { Component } from 'react';
import { axios } from '../App';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [], isLoaded: false };
  }

  componentDidMount() {
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
        <ul className="book-list">
          {this.state.books.map((book, index) => (
            <Link
              to={'/journal/' + book._id}
              key={index}
              className="book-container"
            >
              <div className="book-title">{book.title}</div>
              <div className="book-author">{_.first(book.author_name)}</div>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default Profile;
