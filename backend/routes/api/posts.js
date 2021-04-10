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

    const newPost = new Post({
        title: req.body.title,
        category: req.body.category,
        body: req.body.body,
    })

    newPost
        .save()
        .then((post) => res.json(post))
        .catch((err) => console.log(err));
})

module.exports = router;