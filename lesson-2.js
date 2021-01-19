// node lesson-2.js  result.json
// команда запуска

var argv = require("minimist")(process.argv.slice(2));
var colors = require("colors");
var readline = require("readline");
var fs = require("fs");

var rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout, // вывод в стандартный поток
});
let lastNumber;
let report = [];
let readError = false;
fs.readFile(argv._[0], function (err, data) {
  if (err) {
    console.log("error");
    readError = true;
  } else {
    report = JSON.parse(data);
    lastNumber = report[report.length - 1].game_number + 1;
  }
});
console.log("Type ypur bet (1 or 2)");
rl.on("line", function (cmd) {
  console.log("Your bet: " + cmd);
  let myBet = Math.floor(Math.random() * 2 + 1);
  let resultGame = myBet == cmd ? "Win" : "Loss";
  console.log(
    myBet == cmd
      ? colors.red(`My bet is ${myBet}`)
      : colors.green(`My bet is ${myBet}`),
    myBet == cmd
      ? colors.green(`You're ${resultGame.toLowerCase()}`)
      : colors.red(`You're ${resultGame.toLowerCase()}`)
  );
  report.push({ game_number: lastNumber, result: resultGame });

  if (!readError) {
    fs.writeFile(argv._[0], JSON.stringify(report, null, "\t"), function (err) {
      if (err) console.log("error");
    });
  }
  rl.close();

  fs.readFile(argv._[0], function (err, data) {
    if (err) {
      console.log("error");
    } else {
      report = JSON.parse(data);
      //console.log(report);
      let totalWin = 0;
      let totalLoss = 0;
      let seriesWin = 1;
      let seriesLoss = 1;
      let maxSeriesWin = 1;
      let maxSeriesLoss = 1;
      let lastResult = "";
      report.forEach((element) => {
        if (element.result == "Win") totalWin++;
        if (element.result == "Loss") totalLoss++;
        if (element.result == lastResult && element.result == "Win") {
          seriesWin++;
          if (seriesWin > maxSeriesWin) maxSeriesWin = seriesWin;
        }
        if (element.result == lastResult && element.result == "Loss") {
          seriesLoss++;
          if (seriesLoss > maxSeriesLoss) maxSeriesLoss = seriesLoss;
        }
        if (element.result != lastResult) {
          seriesWin = 1;
          seriesLoss = 1;
        }
        lastResult = element.result;
      });
      console.log("Total games - ".yellow, report.length);
      console.log("Total Wins - ".yellow, totalWin);
      console.log("Total Loss - ".yellow, totalLoss);
      console.log("Max wins series - ".yellow, maxSeriesWin);
      console.log("Max losses series - ".yellow, maxSeriesLoss);
    }
  });
});
