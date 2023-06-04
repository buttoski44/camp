// net start MongoDB
const express = require("express");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const Campground = require("./db/models/campground.js");

const PORT = process.env.PORT || 8080;
const app = express();

//mongoo
mongoose.connect("mongodb://127.0.0.1:27017/camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connection");
});

// middlewares
app.use(express.json());
// app.use(methodOverride("_method"));

// API's
app.get("/api", (req, res) => {
  res.send({ message: "Hello from server!" });
});

app.get("/api/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.send(campgrounds);
});

app.post("/api/campground", async (req, res) => {
  try {
    const campground = new Campground(req.body);
    await campground.save();

    res.send({ message: false });
  } catch (e) {
    res.send({ message: true });
  }
});

app.get("/api/campgrounds/new", async (req, res) => {
  res.send({ message: "new" });
});

app.get("/api/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.send(campground);
});

app.put("/api/campgrounds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, req.body);
    res.send({ message: true });
    console.log("success");
  } catch (e) {
    res.send({ message: false });
    console.log("fails");
  }
});

app.delete("/api/campgrounds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.send({ message: true });
  } catch (e) {
    res.send({ message: false });
  }
});

app.get("/api/campgrounds/:id/edit", async (req, res) => {
  res.send({ message: "Hello from server!" });
});

// Connection
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
