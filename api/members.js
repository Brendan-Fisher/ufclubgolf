const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load input validation
const validate = require("./validate");


// Load User model
const Member = require("../models/MemberModel");

// @route GET api/members
// @desc Return all registered members
// @access Public
router.route("/").get(function (req, res) {
  Member.find(function (err, members) {
    if (err) {
      res.json(err);
    } else {
      res.json(members);
    }
  });
});

// @route PUT api/members/promote
// @desc Promotes a member to the next memberType
// @access Admin
router.put("/promote", (req, res) => {
  const { errors, isValid, newType } = validate.validatePromoteUser(req.body);

  if(!isValid) {
    return res.status(400).json("Unable to promote user");
  }
  
  Member.findOneAndUpdate(
    { email: req.body.email },
    { memberType: newType },
    (err) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(200).json("promoted to " + newType);
    }
  );
});

// @route PUT api/members/demote
// @desc Demotes a member to the previous memberType
// @access Admin
router.route("/demote").put(function (req, res) {
  const { errors, isValid, newType } = validate.validateDemoteUser(req.body);
  
  if(!isValid){
    return res.status(400).send("Unable to demote user");
  }

  Member.findOneAndUpdate(
    { email: req.body.email },
    { memberType: newType },
    (err) => {
      if (err) {
        res.status(400).send(err);
      } else res.status(200).json("demoted to " + newType);
    }
  );
});

// @route POST api/members
// @desc Deletes specified member
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validate.validateDeleteUser(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  Member.findOneAndDelete({ email: req.body.email }, (err, member) => {
    if (err) {
      res.status(400).send(err);
    } else res.status(200).json(member);
  });
});

// @route POST api/members/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form Validation
  const { errors, isValid } = validate.validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Member.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newMember = new Member({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        position: req.body.position ? req.body.position : "",
        password: req.body.password,
        memberType: req.body.memberType ? req.body.memberType : "pending",
        number: req.body.number,
        facebook: req.body.facebook,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newMember.password, salt, (err, hash) => {
          if (err) throw err;
          newMember.password = hash;
          newMember
            .save()
            .then((member) => res.json(member))
            .catch((err) => console.log(err));
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
  const { errors, isValid } = validate.validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Member.findOne({ email }).then((member) => {
    // Check if user exists
    if (!member) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, member.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT payload
        const payload = {
          id: member.id,
          name: member.name,
          memberType: member.memberType,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
