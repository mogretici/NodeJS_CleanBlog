const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

//middlewares
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});
app.get("/index.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/index.html"));
});
app.get("/about.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/about.html"));
});
app.get("/post.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/post.html"));
});
app.get("/add_post.html", (req, res) => {
  res.sendFile(path.resolve(__dirname, "temp/add_post.html"));
});

app.listen(port, () => {
  console.log(`Server started on: ${port}`);
});
