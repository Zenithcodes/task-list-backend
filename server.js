const express = require('express');
const cors = require('cors');
const mainRouter = require('./api-routes');
const app = express();

const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', mainRouter);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Logs the error stack
  res.status(500).send({ message: 'Something went wrong! Please try again later.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
