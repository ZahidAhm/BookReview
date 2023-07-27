const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Write code to check if the username is valid
  // For example, you could check if the username meets certain criteria like minimum length, etc.
  return true; // Replace with your validation logic
};

const authenticatedUser = (username, password) => {
  // Write code to check if the username and password match the one we have in records.
  // For this example, we'll assume the users are stored in the 'users' array
  const user = users.find((user) => user.username === username && user.password === password);
  return user ? true : false;
};

// Register new user
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "Registration successful" });
});

// Login route
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Generate and send the JWT token as a response upon successful login
  const token = jwt.sign({ username }, "your_secret_key_here");
  return res.status(200).json({ token });
});

// Add/Modify a book review (Task 8 - Only accessible to registered users)
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Write your code here
});

// Delete book review added by that particular user (Task 9 - Only accessible to registered users)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Write your code here
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
