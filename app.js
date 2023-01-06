const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();
const port = 3000;

//dbConnect
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/cleanblog-test-db");

//template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  const posts = Post.find({}, (error, posts) => {
    res.render("index", {
      posts: posts,
    });
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});
app.get("/post", (req, res) => {
  res.render("post");
});
app.post("/sendpost", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});
