// Import the mongoose library
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
function connectToDb() {
  // Connect to the MongoDB database using the connection string from environment variables
  mongoose
    .connect(process.env.DB_CONNECT)
    // If the connection is successful, log a success message
    .then(() => console.log("Connected to MongoDB"))
    // If the connection fails, log an error message
    .catch((err) => console.log("Failed to connect to MongoDB:", err));
}

// Export the connectToDb function so it can be used in other files
module.exports = connectToDb;
