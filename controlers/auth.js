const users = require("../models/users.js");
const bcryptjs = require("bcryptjs");
module.exports.authGetLogin = (req, res, next) => {
  res.render("login.hbs", {});
};
module.exports.authGetSignup = (req, res, next) => {
  res.render("signup.hbs", {});
};
module.exports.authGetExit = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
module.exports.authPostLogin = (req, res, next) => {
  if (req.body.save === "on") {
    req.session.cookie.maxAge = 600000 * 6 * 24;
  } else {
    req.session.cookie.maxAge = 600000;
  }
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
};
module.exports.authPostSignup = (req, res, next) => {
  const password = req.body.password;
  if (req.body.save === "on") {
    req.session.cookie.maxAge = 600000 * 6 * 24;
  } else {
    req.session.cookie.maxAge = 600000;
  }
  const newUser = users.createUser(req.body).then((user) => {
    if (user.length > 0) {
      user = user[0];
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
};
