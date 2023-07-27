// booksController.js
const books = require("./booksdb.js");

// Function to get the list of all books
const getBookList = () => {
  return Object.values(books);
};

// Function to get book details by ISBN
const getBookByISBN = (isbn) => {
  return books[isbn] || null;
};

// Export the functions to use them in other modules
module.exports = {
  getBookList,
  getBookByISBN,
};
