require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const inventoryRoutes = require("./routes/inventory");

// express app
const app = express();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8081",
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/inventory", inventoryRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });