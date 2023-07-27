const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 1: Get the book list available in the shop
// public_users.get('/', function (req, res) {
//   res.json(books);
// });
//.....................................................................
public_users.get('/', function (req, res) {
  // Format the books data into an HTML table
   let tableHtml = "<table><tr><th>ISBN</th><th>Title</th><th>Author</th></tr>";

  
  for (let isbn in books) {
    let book = books[isbn];
    tableHtml += `<tr><td>${isbn}</td><td>${book.title}</td><td>${book.author}</td></tr>`;
    
  }

  tableHtml += "</table>";

  // Send the HTML table as the response

  res.send(tableHtml);
});








//....................................................................

// Task 2: Get books based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.send(book);
});

// Task 3: Get all books by Author
public_users.get('/author/:author', function (req, res) {
  const { author } = req.params;
  const booksByAuthor = Object.values(books).filter(book => book.author === author);
  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "Books by author not found" });
  }
  res.json(booksByAuthor);
});

// Task 4: Get all books based on Title
public_users.get('/title/:title', function (req, res) {
  const { title } = req.params;
  const booksByTitle = Object.values(books).filter(book => book.title === title);
  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "Books by title not found" });
  }
  res.json(booksByTitle);
});

// Task 5: Get book Review
public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book.reviews);
});

module.exports.general = public_users;
