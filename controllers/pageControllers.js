const Post = require("../models/Post");

exports.getHomePage = async (req, res) => {
  const posts = await Post.find({}).sort({ dateCreated: -1 });
  res.render("index", {
    posts: posts,
  });
};

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getAddPostPage = (req, res) => {
  res.render("add_post");
};
exports.editPostPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit_post", {
    post: post,
  });
};
