require("dotenv").config();
const express = require("express");
const router = express.Router();

// Load content validation
const validatePostContent = require("../../validation/post");

// Load Announcement model
const Post = require("../../models/Post");


// @route GET api/posts
// @desc Return all stored posts
// @access Public
router.route("/").get(function (req, res) {
    Post.find(function (err, posts) {
        if (err) {
            res.json(err);
        } else {
            res.json(posts);
        }
    })
})

// @route POST api/posts/create
// @desc Creates new post 
router.route("/create").post((req, res) => {
    // Form Validation
    const { errors, isValid } = validatePostContent(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;

    const newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        date: today,
        body: req.body.body,
    })

    newPost
        .save()
        .then((post) => res.json(post))
        .catch((err) => console.log(err));
})

router.post("/", (req, res) => {
    Post.findOneAndDelete({ _id: req.body._id }, (err, post) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(200).json(post);
    });
  });

module.exports = router;