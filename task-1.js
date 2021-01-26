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
