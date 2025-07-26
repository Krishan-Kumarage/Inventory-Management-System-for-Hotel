const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log incoming requests

// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
  .then(() => console.log("Mongodb connection successful!"))
  .catch((err) => console.error("Mongodb connection error:", err));

// Inventory routes
const InventoryRouter = require("./routes/inventoryRoutes.js");
app.use("/inventory", InventoryRouter);

// Health check route (optional)
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
});
