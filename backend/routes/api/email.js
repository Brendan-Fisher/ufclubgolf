const express = require("express");
const router = express.Router();
require("dotenv").config();
var nodemailer = require("nodemailer");

const email = process.env.EMAIL_ADDRESS;
const password = process.env.EMAIL_PASSWORD;

router.post("/newMember", (req, res) => {
    console.log(req.body);

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
        subject: 'Thanks for Registering to Join the UF Golf Club',
        html: '<h1>Thanks for Registering to Join the UF Golf Club</h1><h3>Here are the next steps you should take to make the most out of the club</h3><ul><li>Venmo your dues ($30) to @Florida-ClubGolf</li><li>Come to our weekly practices on Sundays at 1:00</li><li>Check the website often for upcoming events and other announcements</li></ul><p>Do not reply to this email, it will not be seen, if you need to contact the club, email any executive board member from the about us page</p>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json("Unable to send email");
        } else {
            res.status(200).json("Email send: " + info.response);
        }
    });
})

module.exports = router;