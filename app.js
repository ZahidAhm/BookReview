const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users').authenticated;
const genl_routes = require('./router/general').general;
const booksAPI = require('./router/books');
const send = require('send');
const app = express();

//..........................................
// Serve static files from the "public" folder
app.use(express.static('public'));

//.............................................

app.use(express.json());

// Replace 'your_secret_key_here' with your actual secret key for JWT
const secretKey = 'zahid';

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Middleware to authenticate user for /customer/auth/* routes
app.use("/customer/auth/*", function auth(req, res, next) {
  // Check if the request has a valid JWT token in the 'Authorization' header
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the JWT token using the secret key
    const decodedToken = jwt.verify(authToken, secretKey);

    // Attach the user information to the request for future use
    req.user = decodedToken;

    // If everything is valid, call next() to proceed to the next middleware or route.
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// Login route (example)
app.post('/login', (req, res) => {
  // In a real application, you would check the credentials and database to validate the user
  const { username, password } = req.body;

  // For simplicity, let's assume the login is successful and generate a JWT token
  const user = { username }; // Replace with actual user data
  const token = jwt.sign(user, secretKey);

  res.json({ token });
});

// Route handlers for Task 6: Register New user
app.post('/register', (req, res) => {
  // Write your code here (Task 6)
});

// Route handlers for Task 7: Login as a Registered user
app.post('/login', (req, res) => {
  // Write your code here (Task 7)
});



//............................Fetch Book list.....................................
// const booksController = require('./booksController.js');

// // Your other middleware and route configurations...

// // Define the route to handle the "Show Book" button click
// app.get('/getBookList', (req, res) => {
//   const bookList = booksController.getBookList();
//   res.json(bookList);
// });

// // Define the route to get book details by ISBN
// app.get('/getBookByISBN/:isbn', (req, res) => {
//   const { isbn } = req.params;
//   const book = booksController.getBookByISBN(isbn);
//   if (book) {
//     res.json(book);
//   } else {
//     res.status(404).json({ message: 'Book not found' });
//   }
// });

//................................................................................







app.use("/customer", customer_routes);
app.use("/", genl_routes);
let port = 3000

app.listen(port, () => console.log("Server is running http://localhost:3000"));
