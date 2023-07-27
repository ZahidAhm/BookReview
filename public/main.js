// Get the reference to the "Show Book" button
const showButton = document.getElementById('showButton');

// Get the reference to the book table
const bookTable = document.getElementById('bookTable');

// Add a click event listener to the "Show Book" button
showButton.addEventListener('click', async () => {
    try {
        // Make a fetch request to the server to get the book list
        const response = await fetch('/getBookList');
        const data = await response.json();

        // Clear the previous table data
        bookTable.innerHTML = '';

        // Insert the book data into the table
        data.forEach(book => {
            const row = bookTable.insertRow();
            const isbnCell = row.insertCell();
            const titleCell = row.insertCell();
            const authorCell = row.insertCell();

            isbnCell.textContent = book.isbn;
            titleCell.textContent = book.title;
            authorCell.textContent = book.author;
        });
    } catch (error) {
        console.error('Error fetching book list:', error);
    }
});


































// // Function to display the book list in a table
// function displayBookList(books) {
//     const table = document.getElementById('bookTable');
//     let tableHTML = '<tr><th>ISBN</th><th>Title</th><th>Author</th></tr>';
  
//     // Loop through the books array and add rows to the table
//     books.forEach(book => {
//       tableHTML += `<tr><td>${book.isbn}</td><td>${book.title}</td><td>${book.author}</td></tr>`;
//     });
  
//     table.innerHTML = tableHTML;
//   }
  
//   // Function to fetch the book list from the server
//   async function fetchBookList() {
//     try {
//       const response = await fetch('books');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching book list:', error);
//       return [];
//     }
//   }
  
//   // Add event listener to the "Show Book" button
//   document.getElementById('showBookBtn').addEventListener('click', async () => {
//     const bookList = await fetchBookList();
//     displayBookList(bookList);
//   });
  