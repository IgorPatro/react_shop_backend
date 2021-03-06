const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// App
const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// Database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

// Routes
const adminRoute = require("./routes/admin");
// const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");

// Routers
app.use("/api/admin", adminRoute);
app.use("/api/categories", categoriesRoute);
// app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send(`API is working`);
});

// Server
app.listen(process.env.PORT || 8080, () =>
  console.log("Server is running on localhost:8080")
);
