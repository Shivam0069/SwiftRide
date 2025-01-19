// Import the http module
const http = require("http");

// Import the app module and the database connection function
const { app, connectToDb } = require("./app");

// Define the port to listen on, using the environment variable PORT if available, otherwise default to 3000
const port = process.env.PORT || 3000;

// Import the socket initialization function
const { initializeSocket } = require("./socket");

// Async function to start the server
async function startServer() {
  try {
    // Wait for the database connection to be established
    await connectToDb();
    console.log("Database connected successfully");

    // Create an HTTP server using the app module
    const server = http.createServer(app);

    // Initialize the socket
    initializeSocket(server);

    // Start the server and listen on the defined port
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit the process with a failure code
  }
}

// Start the server
startServer();
