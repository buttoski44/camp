const mongoose = require("mongoose");
const Campground = require("../models/campground.js");
const cities = require("./citites.js");
const { descriptors, places } = require("./seedHelpers.js");

mongoose.connect("mongodb://127.0.0.1:27017/camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connection");
});

const randomSelector = (array) =>
  array[Math.floor(Math.random() * array.length)];

const seedDB = async (req, res) => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      title: `${randomSelector(descriptors)}, ${randomSelector(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      price,
      location: `${cities[random].city}, ${cities[random].state}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis voluptas laboriosam, recusandae ducimus dignissimos magni provident odio earum incidunt. Eius tempora neque dicta necessitatibus obcaecati! Itaque dicta id iusto consequuntur",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
