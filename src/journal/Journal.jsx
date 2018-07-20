import React, { Component } from 'react';

import Quill from 'quill';
import { getRoutePathEnd } from '../history.js';
import _ from 'lodash';
import { axios } from '../App';

import './Journal.css';

const saveChanges = _.debounce(quill => {
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
    this.state = { book: null };
  }

  componentDidMount() {
    const quill = new Quill('#journal-editor', {
      theme: 'bubble',
    });
    const bookId = getRoutePathEnd();

    axios
      .get(`/user/entries/${bookId}`)
      .then(res => {
        const entry = res.data;

        if (entry) {
          quill.setContents(entry.contents);
        }

        quill.on('text-change', () => {
          saveChanges(quill);
        });
      })
      .catch();

    axios.get(`/api/books/${bookId}`).then(res => {
      this.setState({ book: res.data });
    });
  }

  render() {
    return (
      <div>
        <div className="journal-heading">
          <div className="journal-book-info">
            <div className="journal-book-title">
              {this.state.book && this.state.book.title}
            </div>

            <div className="journal-book-author">
              {this.state.book && this.state.book.author_name}
            </div>

            <div className="journal-book-rating">★★★★★</div>

            <div className="journal-entry-author">Ricky L.</div>
          </div>

          <div className="journal-book-cover" />
        </div>

        <div id="journal-editor" className="journal-editor">
          Tell us what you thought...
        </div>
      </div>
    );
  }
}

export default Journal;
