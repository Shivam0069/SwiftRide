// Import the http module
const http = require("http");
// Import the app module
const app = require("./app");
// Define the port to listen on, using the environment variable PORT if available, otherwise default to 3000
const port = process.env.PORT | 3000;
// Create an HTTP server using the app module
const server = http.createServer(app);
// Start the server and listen on the defined port, logging a message to the console when the server is running
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
