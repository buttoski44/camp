// net start MongoDB
const express = require("express");
const mongoose = require("mongoose");
const wrapperError = require("./utils/errors/wrappererror");
const ExpressError = require("./utils/errors/apperror");
// const methodOverride = require("method-override");
const Campground = require("./db/models/campground.js");
const Joi = require("joi");
const { campgroundSchema } = require("./joiSchemas");

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

// midleware validator
const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// API's
app.get("/api", (req, res) => {
  res.send({ message: "Hello from server!" });
});

app.get(
  "/api/campgrounds",
  wrapperError(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.send(campgrounds);
  })
);

app.post(
  "/api/campground",
  validateCampground,
  wrapperError(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.send({ success: false });
  })
);

app.get(
  "/api/campgrounds/:id",
  wrapperError(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.send(campground);
  })
);

app.put(
  "/api/campgrounds/:id",
  validateCampground,
  wrapperError(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(
      id,
      req.body.campground
    );
    res.send({ success: true });
  })
);

app.delete(
  "/api/campgrounds/:id",
  wrapperError(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.send({ success: true });
  })
);

// app.get(
//   "/api/campgrounds/:id/edit",
//   wrapperError(async (req, res) => {
//     res.send({ message: "Hello from server!" });
//   })
// );

app.all("*", (req, res, next) => {
  next(new ExpressError("Bad Request", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" } = err;
  console.log(err);
  res.status(statusCode).send({ message: message, success: false });
});

// Connection
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
