const axios = require("axios");
const express = require("express");
const path = require("path");
const app = express();
var cookieParser = require("cookie-parser");
var cheerio = require("cheerio");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

function getData(req) {
  console.log(req);
  axios
    .get(req.site)
    .then((response) => {
      var $ = cheerio.load(response.data);
      $(req.selector).each(function (i, element) {
        var cols = $(this).text();
        cols = cols.replace(/^\s*/gm, "").replace(/\s+$/, "");
        console.log(cols);
        if (i > 3) return false;
      });
      console.log(" ");
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

app.post("/", (req, response) => {
  console.log("Cookies: ", req.cookies);
  const data = req.body;
  console.log(data);
  getData({
    site: "https://www.euro-football.ru/",
    selector: ".main-news__item",
  });
  getData({
    site: "https://www.f1news.ru/",
    selector: ".b-news-list__title",
  });
  getData({
    site: "https://allhockey.ru/",
    selector: ".summary > a",
  });

  response.send("ffff");
});

app.listen(3000, () => console.log("Listening on port 3000"));
