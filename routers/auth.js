const express = require("express");
const router = express.Router();
var users = require("../models/users.js");

router.get("/login/", (req, res, next) => {
  res.render("login.hbs", {});
});

router.post("/login/", (req, res, next) => {
  const user = users.findUserByName(req.body.username).then((user) => {
    if (user.length > 0) {
      user = user[0];
      if (user[0].password === req.body.password) {
        req.session.username = req.body.username;
        console.log(req.session.username);
        res.redirect("/");
      } else {
        res.redirect("/auth/login/");
      }
    } else {
      res.redirect("/auth/login/");
    }
  });
});
module.exports = router;
