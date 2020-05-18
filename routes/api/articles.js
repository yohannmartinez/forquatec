const express = require("express");
const router = express.Router();

// Load Article model
const Article = require("../../models/Article");

// @route GET api/articles/getAll
// @desc get all articles
// @access Public
router.get("/getAll", (req, res) => {
  Article.find({}).sort('-date').exec(function (err, articles) {
    if (!err) {
      res.status(200).json({ message: "articles retrieved", articles: articles })
    } else {
      res.status(400).json({ message: err })
    }
  })
});

// @route GET api/articles/getById
// @desc get all articles
// @access Public
router.get("/getById", (req, res) => {
  Article.findOne({_id : req.query.id} , function (err, article) {
    if (!err) {
      res.status(200).json({ message: "articles retrieved", article: article })
    } else {
      res.status(400).json({ message: "L'article que vous cherchez n'existe pas" })
    }
  })
});

// @route POST api/articles/create
// @desc create an article
// @access Public
router.post("/create", (req, res) => {
  // Form validation
  const newArticle = new Article({
    title: req.body.title,
    text: req.body.text,
    videoLink: req.body.videoLink,
    imageLink: req.body.imageLink
  })
  newArticle.save()
    .then(article => res.status(200).json({ message: "article created", article: article }))
    .catch(err => status(400).json({ message: "something went rong, please retry with an other image or title" }));
});

// @route DELETE api/articles/delete
// @desc delete an article with the id
// @access Public
router.post("/delete", (req, res) => {
  console.log("id is ", req.body.id)
  Article.deleteOne({ _id: req.body.id }, function (err) {
    if (!err) {
      res.status(200).json({ message: "article deleted" })
    }
    else {
      res.status(400).json({ message: err })
    }
  })
});

// @route POST api/articles/update
// @desc modify an article with the id
// @access Public
router.post("/update", (req, res) => {
  Article.updateOne({ _id: req.body.id }, {
    title: req.body.title,
    text: req.body.text,
    videoLink: req.body.videoLink,
    imageLink: req.body.imageLink,
  }).then(article => {
    res.status(200).json({ message: "article updated", article: article });
  }).catch(err => {
    res.status(400).json({ message: err })
  })
});


module.exports = router;
