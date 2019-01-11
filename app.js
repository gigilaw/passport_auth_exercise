let express = require("express");
let mongoose = require("mongoose");
let passport = require("passport");
let bodyParser = require("body-parser");
let localStrategy = require("passport-local");
let passportLocalMongoose = require("passport-local-mongoose");
let User = require("./models/user");

mongoose.connect(
  "mongodb://localhost/auth_demo",
  { useNewUrlParser: true }
);

let app = express();
app.set("view engine", "ejs");
app.use(
  require("express-session")({
    secret: "shhhhhhh secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", function(req, res) {
  res.render("secret");
});

app.listen(3000, () => {
  console.log("Server Started");
});
