var request = require("request");
var cheerio = require("cheerio");
request("https://rostov.rbc.ru/", function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    console.log($("js_news_feed_banner"));
    $(".news-feed__item__title").each(function (i, element) {
      var cols = $(this).text();
      console.log(cols);
    });
  }
});
