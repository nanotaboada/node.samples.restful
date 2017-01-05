CREATE TABLE IF NOT EXISTS Books (
  isbn             TEXT PRIMARY KEY,
  title            TEXT NOT NULL,
  subtitle         TEXT NOT NULL,
  author           TEXT NOT NULL,
  published        TEXT NOT NULL, -- ISO8601 strings
  publisher        TEXT NOT NULL,
  pages            INTEGER NOT NULL,
  description      TEXT NOT NULL,
  website          TEXT NOT NULL
);

INSERT INTO Books
(
  isbn,
  title,
  subtitle,
  author,
  published,
  publisher,
  pages,
  description,
  website
)
VALUES
(
  '9781593275846',
  'Eloquent JavaScript, Second Edition',
  'A Modern Introduction to Programming',
  'Marijn Haverbeke',
  '2014-12-14T00:00:00.000Z',
  'No Starch Press',
  472,
  'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
  'http://eloquentjavascript.net/'
),
(
  '9781449331818',
  'Learning JavaScript Design Patterns',
  'A JavaScript and jQuery Developer''s Guide',
  'Addy Osmani',
  '2012-07-01T00:00:00.000',
  'O''Reilly Media',
  254,
  'With Learning JavaScript Design Patterns, you''ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.',
  'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/'
),
(
  '9781449365035',
  'Speaking JavaScript',
  'An In-Depth Guide for Programmers',
  'Axel Rauschmayer',
  '2014-02-01T00:00:00.000Z',
  'O''Reilly Media',
  460,
  'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.',
  'http://speakingjs.com/'
);
