require("dotenv").config();
const express = require("express");
const router = express.Router();

const validateTournamentContent = require("../../validation/tournament");

// Load Announcement model
const Tournament = require("../../models/Tournament");


// @route GET api/tournaments
// @desc Return all stored events
// @access Public
router.route("/").get(function (req, res) {
    Tournament.find(function (err, tournaments) {
        if (err) {
            res.json(err);
        } else {
            res.json(tournaments);
        }
    })
})


router.route("/find").post((req, res)  => {
    Tournament.findById(req.body._id, (err, tournament) => {
        if(err) {
            res.json(err);
        } else {
            res.json(tournament);
        }
    })
})

// @route POST api/tournaments/create
// @desc Creates new events 
router.route("/create").post((req, res) => {
    // Form Validation
    const { errors, isValid } = validateTournamentContent(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newTournament = new Tournament({
        title: req.body.title,
        startDate: req.body.startDate,
        body: req.body.body,
    })

    newTournament
        .save()
        .then((tournament) => res.json(tournament))
        .catch((err) => console.log(err));
})


router.post("/", (req, res) => {
    Tournament.findOneAndDelete({ _id: req.body._id }, (err, tournament) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(200).json(tournament);
    });
  });


module.exports = router;