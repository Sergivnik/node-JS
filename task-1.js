var request = require("request");
var cheerio = require("cheerio");
request("https://www.f1news.ru/", function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $(".b-news-list__title").each(function (i, element) {
      var cols = $(this).text();
      console.log(cols);
    });
  }
});
