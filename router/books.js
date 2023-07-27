const axios = require('axios');

// Task 10: Get all books - Using async callback function
async function getAllBooks() {
  try {
    const response = await axios.get('http://localhost:3000/books');
    return response.data;
  } catch (error) {
    console.error("Error fetching all books:", error.message);
    return [];
  }
}

// Task 11: Search by ISBN - Using Promises
function searchByISBN(isbn) {
  return axios.get(`http://localhost:3000/isbn/${isbn}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error searching by ISBN:", error.message);
      return null;
    });
}

// Task 12: Search by Author
async function searchByAuthor(author) {
  try {
    const allBooks = await getAllBooks();
    return allBooks.filter(book => book.author === author);
  } catch (error) {
    console.error("Error searching by author:", error.message);
    return [];
  }
}

// Task 13: Search by Title
async function searchByTitle(title) {
  try {
    const allBooks = await getAllBooks();
    return allBooks.filter(book => book.title === title);
  } catch (error) {
    console.error("Error searching by title:", error.message);
    return [];
  }
}

module.exports = { getAllBooks, searchByISBN, searchByAuthor, searchByTitle };
