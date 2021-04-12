const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
cors = require('cors');
const path = require('path');

const members = require("./routes/api/members");
const email = require("./routes/api/email");
const announcements = require("./routes/api/announcements");
const posts = require("./routes/api/posts");
const events = require("./routes/api/events");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/members", members);
app.use("/api/email", email);
app.use("/api/announcements", announcements);
app.use("/api/posts", posts);
app.use("/api/events", events);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('../frontent/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port}!`));

module.exports = app;
