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

app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "\\views");

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
      return ["Что-то не ладится в Дацком корлевстве"]
    });
  let result = await a;
  return result;
}

app.post("/", async (req, response) => {
  let arrNews = [];
  const data = req.body;

  if (data.Football === "on") {
    const footbalResult = await getData({
      site: "https://www.euro-football.ru/",
      selector: ".main-news__item",
      number: data.numberNews,
    });
    const result = {
      name: "Футбол",
      data: await footbalResult,
    };
    arrNews.push(result);
  } else {
    const result = {
      name: null,
      data: [],
    };
    arrNews.push(result);
  }
  if (data.F1 === "on") {
    const f1Result = await getData({
      site: "https://www.f1news.ru/",
      selector: ".b-news-list__title",
      number: data.numberNews,
    });
    const result = {
      name: "Ф1",
      data: await f1Result,
    };
    arrNews.push(result);
  } else {
    const result = {
      name: null,
      data: [],
    };
    arrNews.push(result);
  }

  if (data.hockey === "on") {
    const hockeyResult = await getData({
      site: "https://allhockey.ru/",
      selector: ".summary > a",
      number: data.numberNews,
    });

    const result = {
      name: "Хоккей",
      data: await hockeyResult,
    };
    arrNews.push(result);
  } else {
    const result = {
      name: null,
      data: [],
    };
    arrNews.push(result);
  }
  try {
    response.render("news", {
      Football: arrNews[0].name,
      listFootball: arrNews[0].data,
      F1: arrNews[1].name,
      listF1: arrNews[1].data,
      Hockey: arrNews[2].name,
      listHockey: arrNews[2].data,
    });
  } catch (err) {
    response.render("news", { err: true });
  }
});

app.listen(3000, () => console.log("Listening on port 3000"));
