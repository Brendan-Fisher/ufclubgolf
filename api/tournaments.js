require("dotenv").config();
const express = require("express");
const router = express.Router();

const validate = require("./validate");

// Load Announcement model
const Tournament = require("../models/TournamentModel");


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
    const { errors, isValid } = validate.validateTournamentContent(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

   
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;

    const newTournament = new Tournament({
        title: req.body.title,
        startDate: req.body.startDate,
        createdDate: today,
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