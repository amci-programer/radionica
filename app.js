const express = require("express")
const path = require('path');
const app = express()
const Campground = require("./models/campgrounds")

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));

// localhost:3000
app.get("/", (req, res) => {
  res.render("index")
})

app.get("/krhni", async (req, res) => {
  const camp = new Campground({title: "Izlet"})
  await camp.save()
  res.send(camp)
})

app.get("/new", (req, res) => {
  res.render("new")
})

app.post("/new", async (req, res) => {
  console.log(req)
  console.log(req.body)
  const campground = new Campground(req.body);
  console.log(campground)
  await campground.save();
  res.send(JSON.stringify(campground))
})

app.listen(3000, () => {
  console.log("Server pokrenut")
})