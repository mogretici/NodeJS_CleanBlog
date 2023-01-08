const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
///
const Post = require("./models/Post");
const pageControllers = require("./controllers/pageControllers");
const postController = require("./controllers/postController");
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
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});

//routes_page

app.get("/about", pageControllers.getAboutPage);
app.get("/add_post", pageControllers.getAddPostPage);
app.get("/edit_post/:id", pageControllers.editPostPage);

//routes_api

app.get("/", postController.getAllPosts);
app.get("/post/:id", postController.getPost);
app.post("/sendpost", postController.sendPost);
app.put("/updatepost/:id", postController.updatePost);
app.delete("/deletepost/:id", postController.deletePost);
