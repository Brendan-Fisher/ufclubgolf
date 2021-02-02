const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Member = require("../../models/Member");


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Member.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newMember = new Member({
                name: req.body.name,
                email: req.body.email,
                position: (req.body.position) ? req.body.position : "",
                password: req.body.password,
                memberType: (req.body.memberType) ? req.body.memberType : "member",
            });

            // Hash password before saving in database 
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newMember.password, salt, (err, hash) => {
                    if (err) throw err;
                    newMember.password = hash;
                    newMember
                        .save()
                        .then(member => res.json(member))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/members/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    
    Member.findOne({ email }).then(member => {
        // Check if user exists
        if (!member) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, member.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT payload
                const payload = {
                    id: member.id,
                    name: member.name,
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            }
            else {
                return res.status(400).json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;