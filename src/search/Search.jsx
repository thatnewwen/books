import React, { Component } from 'react';
import { axios } from '../App';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [], isLoaded: false };
    this.searchBooks = this.searchBooks.bind(this);
  }

  componentDidMount() {
    this.searchBooks();
  }

  searchBooks(event = { target: { value: '' } }) {
    const value = event.target.value;

    this.setState({ isLoaded: false });

    axios
      .get('/api/books', { params: { search: value } })
      .then(res => {
        this.setState({ books: res.data, isLoaded: true });
      })
      .catch();
  }

  render() {
    return (
      <div className="page-container">
        <input
          className="search-input input"
          type="search"
          placeholder="Search for a book…"
          autoFocus="true"
          onChange={this.searchBooks}
        />

        <ul className="book-list">
          {this.state.books.map((book, index) => (
            <Link to={'/journal/' + book._id} key={index} className="book-item">
              <div className="book-title">{book.title}</div>
              <div className="book-author">{_.first(book.author_name)}</div>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default Search;
