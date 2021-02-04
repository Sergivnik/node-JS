const express = require("express");
const path = require("path");
const app = express();
const db = require("./models/db.js");
const router = require("./routers");

var tasks = require("./models/tasks");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

const session = require("express-session");
const sessionStore = new (require("express-mysql-session")(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Большой секрет",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 60000 },
});
app.use(sessionMiddleware);

app.use(router);

app.listen(3000, () => console.log("Listening on port 3000"));
