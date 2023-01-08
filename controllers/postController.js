const Post = require("../models/Post");

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post: post,
  });
};

exports.sendPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
};
exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
