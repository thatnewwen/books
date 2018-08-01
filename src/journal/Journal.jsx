import React, { Component } from 'react';

import Quill from 'quill';
import { getRoutePathEnd } from '../history.js';
import _ from 'lodash';
import { axios } from '../App';

import './Journal.css';

const updateContent = _.debounce(quill => {
  const contents = quill.getContents();
  const bookId = getRoutePathEnd();

  axios
    .put('/user/entries', { bookId, contents })
    .then()
    .catch();
}, 1000);

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = { book: undefined, rating: undefined };
  }

  componentDidMount() {
    const quill = new Quill('#journal-editor', {
      theme: 'bubble',
      placeholder: 'Tell us what you thought...',
    });
    const bookId = getRoutePathEnd();

    quill.focus();

    axios
      .get(`/user/entries/${bookId}`)
      .then(res => {
        const entry = res.data;

        if (entry) {
          quill.setContents(entry.contents);
          this.setState({ rating: entry.rating });
        }

        quill.on('text-change', () => updateContent(quill));
      })
      .catch();

    axios.get(`/api/books/${bookId}`).then(res => {
      const book = res.data || null;
      this.setState({ book });
    });
  }

  ratingStars() {
    const savedRating = this.state.rating;

    return _.times(5, rating => {
      const active = rating === savedRating ? 'active' : '';
      const className = `rating-star ${active}`;

      return (
        <span
          key={rating}
          className={className}
          onClick={this.getRateBook(rating)}
        >
          ★
        </span>
      );
    });
  }

  getRateBook(rating) {
    return () => {
      this.setState({ rating });

      const bookId = getRoutePathEnd();

      axios
        .put('/user/entries', { bookId, rating })
        .then()
        .catch();
    };
  }

  render() {
    const { book, rating } = this.state;

    let journalHeading;

    if (book === null) {
      journalHeading = <div className="loading-large"> Book not found. </div>;
    } else if (book === undefined) {
      journalHeading = <div className="loading-large"> Loading... </div>;
    } else {
      journalHeading = (
        <div className="journal-heading">
          <div className="journal-book-info">
            <div className="journal-book-title">{book.title}</div>
            <div className="journal-book-author">{book.author_name}</div>
            <div className={'journal-book-rating ' + (rating && 'rated')}>
              {this.ratingStars()}
            </div>

            <div className="journal-entry-author">Ricky L.</div>
          </div>

          <div className="journal-book-cover" />
        </div>
      );
    }

    return (
      <div>
        {journalHeading}

        <div id="journal-editor" className="journal-editor" />
      </div>
    );
  }
}

export default Journal;
