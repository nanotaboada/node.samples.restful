CREATE DATABASE Catalog

CREATE TABLE Books (
   Isbn           VARCHAR(13) PRIMARY KEY,
   Title          VARCHAR(128) NOT NULL,
   Subtitle       VARCHAR(256) NOT NULL,
   Author         VARCHAR(64) NOT NULL,
   Published      DATE NOT NULL,
   Publisher      VARCHAR(64) NOT NULL,
   Pages          INTEGER NOT NULL,
   Description    VARCHAR(512),
   Website        VARCHAR(128)
);

INSERT INTO Books (
   Isbn,
   Title,
   Subtitle,
   Author,
   Published,
   Publisher,
   Pages,
   Description,
   Website
)
VALUES (
   '9781593275846',
   'Eloquent JavaScript, Second Edition',
   'A Modern Introduction to Programming',
   'Marijn Haverbeke',
   '2014-12-14T00:00:00.000Z',
   'No Starch Press',
   472,
   'JavaScript lies at the heart of almost every modern web application, from social apps to the newest browser-based games. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.',
   'http://eloquentjavascript.net/'
),(
   '9781449331818',
   'Learning JavaScript Design Patterns',
   'A JavaScript and jQuery Developer''s Guide',
   'Addy Osmani',
   '2012-07-01T00:00:00.000Z',
   'O''Reilly Media',
   254,
   'With Learning JavaScript Design Patterns, you''ll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-date with the latest best practices, this book is for you.',
   'http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/'
),(
   '9781449365035',
   'Speaking JavaScript',
   'An In-Depth Guide for Programmers',
   'Axel Rauschmayer',
   '2014-02-01T00:00:00.000Z',
   'O''Reilly Media',
   460,
   'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who once found himself in the same position.',
   'http://speakingjs.com/'
),(
   '9781491950296',
   'Programming JavaScript Applications',
   'Robust Web Architecture with Node, HTML5, and Modern JS Libraries',
   'Eric Elliott',
   '2014-07-01T00:00:00.000Z',
   'O''Reilly Media',
   254,
   'Take advantage of JavaScript''s power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that''s easier-yes, easier-to work with as your code base grows.',
   'http://chimera.labs.oreilly.com/books/1234000000262/index.html'
),(
   '9781593277574',
   'Understanding ECMAScript 6',
   'The Definitive Guide for JavaScript Developers',
   'Nicholas C. Zakas',
   '2016-09-03T00:00:00.000Z',
   'No Starch Press',
   352,
   'ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that ECMAScript 6 brings to JavaScript.',
   'https://leanpub.com/understandinges6/read'
),(
   '9781491904244',
   'You Don''t Know JS',
   'ES6 & Beyond',
   'Kyle Simpson',
   '2015-12-27T00:00:00.000Z',
   'O''Reilly Media',
   278,
   'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the "You Don’t Know JS" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the standard upon which JavaScript is built.',
   'https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond'
);


