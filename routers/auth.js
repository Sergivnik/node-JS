const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
var users = require("../models/users.js");

router.get("/login/", (req, res, next) => {
  res.render("login.hbs", {});
});

router.get("/signup/", (req, res, next) => {
  res.render("signup.hbs", {});
});

router.get("/exit", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.post("/login/", (req, res, next) => {
  const user = users.findUserByName(req.body.username).then((user) => {
    if (user.length > 0) {
      user = user[0];
      if (bcryptjs.compareSync(req.body.password, user[0].password)) {
        req.session.username = req.body.username;
        console.log(req.session.username);
        req.session.save(function (err) {
          if (!err) {
            res.redirect("/");
          }
        });
      } else {
        res.redirect("/auth/login/");
      }
    } else {
      res.redirect("/auth/login/");
    }
  });
});

router.post("/signup/", (req, res, next) => {
  const password = req.body.password;
  const newUser = users.createUser(req.body).then((user) => {
    if (user.length > 0) {
      user = user[0];
      console.log(user[0].password);
      console.log(req.body.password);
      if (bcryptjs.compareSync(password, user[0].password)) {
        req.session.username = req.body.username;
        console.log(req.session.username);
        req.session.save(function (err) {
          if (!err) {
            res.redirect("/");
          }
        });
      } else {
        res.redirect("/auth/login/");
      }
    } else {
      res.redirect("/auth/login/");
    }
  });
});

module.exports = router;
