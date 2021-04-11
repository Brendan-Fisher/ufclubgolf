require("dotenv").config();
const express = require("express");
const router = express.Router();

// Load content validation
const validateEventContent = require("../../validation/event");

// Load Announcement model
const ClubEvent = require("../../models/Event");


// @route GET api/events
// @desc Return all stored events
// @access Public
router.route("/").get(function (req, res) {
    ClubEvent.find(function (err, events) {
        if (err) {
            res.json(err);
        } else {
            res.json(events);
        }
    })
})

// @route POST api/events/create
// @desc Creates new events 
router.route("/create").post((req, res) => {
    // Form Validation
    const { errors, isValid } = validateEventContent(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;

    const newEvent = new ClubEvent({
        title: req.body.title,
        eventDate: req.body.date,
        createdDate: today,
        body: req.body.body,
    })

    newEvent
        .save()
        .then((event) => res.json(event))
        .catch((err) => console.log(err));
})

module.exports = router;