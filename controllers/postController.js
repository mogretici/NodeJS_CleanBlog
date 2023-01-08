const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 5;
  const countPromise = await Post.countDocuments();
  const skip = (page - 1) * perPage;
  const postPromise = await Post.find({})
    .sort({ dateCreated: -1 })
    .skip(skip)
    .limit(perPage);
  const [posts, count] = await Promise.all([postPromise, countPromise]);
  const pages = Math.ceil(count / perPage);
  if (!posts.length && skip) {
    res.redirect(`/page/${pages}`);
    return;
  }
  res.render("index", {
    posts, //total posts
    page, //current page
    pages, //total pages
  });

  // const posts = await Post.find({}).sort({ dateCreated: -1 });
  // res.render("index", {
  //   posts: posts,
  // });
};

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
