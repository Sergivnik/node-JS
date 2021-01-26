
const express = require("express");
const path = require("path");
const app = express();
var cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.post("/", (req, response) => {
  console.log("Cookies: ", req.cookies);
  const data = req.body;
  console.log(data);

  var request = require("request");
  var cheerio = require("cheerio");
  request("https://www.euro-football.ru/", function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $(".main-news__item").each(function (i, element) {
        var cols = $(this).text();
        cols = cols.replace(/^\s*/gm, "").replace(/\s+$/, "");
        console.log(cols);
        if (i > 5) return false;
      });
      console.log(" ");
    }
  });
  request("https://www.f1news.ru/", function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $(".b-news-list__title").each(function (i, element) {
        var cols = $(this).text();
        cols = cols.replace(/^\s*/gm, "").replace(/\s+$/, "");
        console.log(cols);
        if (i > 5) return false;
      });
      console.log(" ");
    }
  });
  request("https://allhockey.ru/", function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var f = $(".summary > a");
      f.each(function (i, element) {
        var cols = $(this).text();
        cols = cols.replace(/^\s*/gm, "").replace(/\s+$/, "");
        console.log(cols);
        if (i > 5) return false;
      });
    }
  });
  response.send("ffff")
});

app.listen(3000, () => console.log("Listening on port 3000"));
