const db = require("../models/db.js");
const session = require("express-session");
const sessionStore = new (require("express-mysql-session")(session))({}, db);
module.exports.sessionMiddleware = session({
  store: sessionStore,
  secret: "Top secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 },
});
