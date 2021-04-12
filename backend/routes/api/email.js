const { json } = require("body-parser");
const express = require("express");
const isEmpty = require("is-empty");
const router = express.Router();
require("dotenv").config();
var nodemailer = require("nodemailer");

const clubEmail = process.env.CLUB_EMAIL;
const email = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;

router.post("/newMember", (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    var mailOptions = {
        from: 'UF Club Golf',
        to: req.body.email,
        subject: 'New Member Information',
        html: '<h1>Thanks for Registering to Join Florida Club Golf</h1><h3>Here are the next steps you should take to make the most out of the club</h3><ul><li>Venmo your dues ($30) to @Florida-ClubGolf</li><li>Come to our weekly practices on Sundays at 1:00</li><li>Check the website often for upcoming events and other announcements</li></ul><p>Do not reply to this email, it will not be seen, if you need to contact the club, email any executive board member from the about us page</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json("Unable to send email");
        } else {
            res.status(200).json("Email sent: " + info.response);
        }
    });
})

router.post("/club", (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    var userInfo = {
        name: req.body.firstname + " " + req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.number,
        facebook: !isEmpty(req.body.facebook) ? req.body.facebook : "Not provided"
    }

    var mailOptions = {
        from: 'UF Club Golf',
        to: clubEmail,
        subject: 'A New Member Has Registered to Join the Club',
        html: `<h3>Here is some information about the new member:</h3><ul><li>Name: ${userInfo.name}</li><li>Email: ${userInfo.email}</li><li>Phone Number: ${userInfo.phoneNumber}</li><li>Facebook Username: ${userInfo.facebook}</li></ul>`,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json("Unable to send email");
        } else {
            res.status(200).json("Email sent: " + info.response);
        }
    }); 
})

module.exports = router;