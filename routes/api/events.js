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


router.route("/find").post((req, res)  => {
    ClubEvent.findById(req.body._id, (err, event) => {
        if(err) {
            res.json(err);
        } else {
            res.json(event);
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


router.post("/", (req, res) => {
    ClubEvent.findOneAndDelete({ _id: req.body._id }, (err, event) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(200).json(event);
    });
  });


module.exports = router;