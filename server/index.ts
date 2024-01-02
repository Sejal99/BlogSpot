
import express from 'express';


// Create an Express application
const app = express();


// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your backend!');
});

// Set the port for the server
const port = 8000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
