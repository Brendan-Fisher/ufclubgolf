require("dotenv").config();
const express = require("express");
const router = express.Router();

// Load content validation
const validateAnnouncementContent = require("../../validation/announcement");

// Load Announcement model
const Announcement = require("../../models/Announcement");


// @route GET api/announcements
// @desc Return stored announcement
// @access Public
router.route("/").get(function (req, res) {
    Announcement.findOne(function (err, announcement) {
        if (err) {
            res.json(err);
        } else {
            res.json(announcement.content);
        }
    })
})

// @route POST api/announcements/create
// @desc Creates new announcement to replace existing one
router.route("/create").post((req, res) => {
    // Form Validation
    const { errors, isValid } = validateAnnouncementContent(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Announcement.replaceOne({}, req.body, (err, announcement) => {
        if (err){
            res.status(400).send(err);
        } else res.status(200).json(announcement);
    }) 

})

module.exports = router;