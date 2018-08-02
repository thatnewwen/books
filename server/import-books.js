const Books = require('./models/books.js');

const _ = require('lodash');

const csv = require('fast-csv');
const fs = require('fs');

const stream = fs.createReadStream('ol_dump_works_2018-07-31.txt');

let booksBuffer = [];

const csvStream = csv({ delimiter: '\t' })
  .on('data', function(data) {
    const jsonString = data[4];
    const jsonObject = JSON.parse(jsonString);
    const book = _.pick(jsonObject, ['title', 'subjects', 'key']);

    book.authors = _.compact(_.map(jsonObject.authors, 'author.key'));

    booksBuffer.push(book);

    if (booksBuffer.length % 10000 === 0) {
      Books.insertMany(booksBuffer);

      booksBuffer = [];

      Books.count().then(count => console.log(`Loaded ${count} books.`));
    }
  })
  .on('end', () => {
    Books.insertMany(booksBuffer);

    Books.count().then(count => console.log(`FINISHED. Total ${count} books.`));
  });

Books.remove().then(() => stream.pipe(csvStream));
