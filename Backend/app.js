// Import the dotenv package to load environment variables from a .env file into process.env
const dotenv = require("dotenv");
dotenv.config(); // Initialize dotenv to read the .env file

// Import the express framework for creating a web server
const express = require("express");

// Import the cors package to enable Cross-Origin Resource Sharing
const cors = require("cors");

// Create an instance of an Express application
const app = express();

// Import the cookie-parser package to parse cookies attached to the client request object
const cookieParser = require("cookie-parser");
// Import a custom module to connect to the database
const connectToDb = require("./db/db");

// Import user-related routes from a separate file
const userRoutes = require("./routes/user.routes");

const captainRoutes = require("./routes/captain.routes");

const emailVerificationRoutes = require("./routes/emailVerification.routes");

// Call the connectToDb function to establish a connection to the database
connectToDb();

// Enable CORS to allow requests from other origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Define a simple GET route for the root URL that responds with "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Mount the user routes on the "/users" endpoint
app.use("/users", userRoutes);

app.use("/captains", captainRoutes);

app.use("/email", emailVerificationRoutes);

// Export the app instance for use in other parts of the application
module.exports = app;
