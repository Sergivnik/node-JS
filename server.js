const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

var cookieParser = require("cookie-parser");
var tasks = require("./models/tasks");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  tasks.list((data) => {
    if (data.error) {
      console.log(data.error.errno);
      res.render("errorPage.hbs", {err: data.error.errno});
    } else {
      data.forEach((elem) => {
        elem.complete = elem.complete ? "true" : "false";
      });
      res.render("startPage.hbs", { data });
    }
  });
});

app.post("/", async (req, response) => {});

app.listen(3000, () => console.log("Listening on port 3000"));
