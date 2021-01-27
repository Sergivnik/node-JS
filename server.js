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

async function getData(req) {
  let listNews = [];
  a = axios
    .get(req.site)
    .then((response) => {
      var $ = cheerio.load(response.data);
      $(req.selector).each(function (i, element) {
        var cols = $(this).text();
        cols = cols.replace(/^\s*/gm, "").replace(/\s+$/, "");
        listNews.push(cols);
        if (i > req.number - 2) return false;
      });
      listNews.push("");
      return listNews;
    })
    .catch((err) => {
      console.log("error", err);
    });
  let result = await a;
  return result;
}

app.post("/", (req, response) => {
  let arrNews = [];
  console.log("Cookies: ", req.cookies);
  const data = req.body;
  console.log(data);
  if (data.Football === "on") {
    getData({
      site: "https://www.euro-football.ru/",
      selector: ".main-news__item",
      number: data.numberNews,
    })
      .then((result) => {
        arrNews.push("Футбол");
        arrNews = arrNews.concat(result);
      })
  }
  if (data.F1 === "on")
    getData({
      site: "https://www.f1news.ru/",
      selector: ".b-news-list__title",
      number: data.numberNews,
    })
      .then((result) => {
        arrNews.push("Ф1");
        arrNews = arrNews.concat(result);
      })
  if (data.hockey === "on")
    getData({
      site: "https://allhockey.ru/",
      selector: ".summary > a",
      number: data.numberNews,
    })
      .then((result) => {
        arrNews.push("Хоккей");
        arrNews = arrNews.concat(result);
      })
  setTimeout(()=>response.send(arrNews), 5000); 
});

app.listen(3000, () => console.log("Listening on port 3000"));
