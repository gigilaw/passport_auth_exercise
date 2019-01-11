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
app.use(bodyParser.urlencoded({ extended: true }));
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

//Auth Routes
//signup form
app.get("/register", function(req, res) {
  res.render("register");
});

//user signup
app.post("/register", function(req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function(err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secret");
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Server Started");
});
