var argv = require("minimist")(process.argv.slice(2));
var readline = require("readline");
var fs = require("fs");

//const util = require("util");
console.dir(argv._[0]);
//console.log(util.inspect(argv));
//console.dir(argv);
var rl = readline.createInterface({
  input: process.stdin, // ввод из стандартного потока
  output: process.stdout, // вывод в стандартный поток
});
let lastNumber;
let report;
fs.readFile(argv._[0], function (err, data) {
  if (err) throw err;
  report = JSON.parse(data);
  lastNumber = report[report.length - 1].game_number + 1;
});
console.log("Type ypur bet (1 or 2)");
rl.on("line", function (cmd) {
  console.log("Your bet: " + cmd);
  let myBet = Math.floor(Math.random() * 2 + 1);
  let resultGame = myBet == cmd ? "Win" : "Loss";
  console.log(`My bet is ${myBet} You're ${resultGame.toLowerCase()}`);
  report.push({ game_number: lastNumber, result: resultGame });
  fs.writeFile(argv._[0], JSON.stringify(report, null, "\t"), function (err) {
    if (err) throw err;
    //console.log(data.toString());
  });
  rl.close();

  fs.readFile(argv._[0], function (err, data) {
    if (err) throw err;
    report = JSON.parse(data);
    console.log(report);
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
      if (element.result == lastResult && element.result == "Win") seriesWin++;
      if (element.result == lastResult && element.result == "Loss")
        seriesLoss++;
      if (element.result != lastResult) {
        if (lastResult == "Win") {
          maxSeriesWin = seriesWin >= maxSeriesWin ? seriesWin : maxSeriesWin;
          seriesWin = 1;
        } else {
          maxSeriesLoss =
            seriesLoss >= maxSeriesLoss ? seriesLoss : maxSeriesLoss;
          seriesLoss = 1;
        }
      }
      lastResult = element.result;
    });
    console.log("Total games - ", report.length);
    console.log("Total Wins - ", totalWin);
    console.log("Total Losss - ", totalLoss);
    console.log("Max wins series - ", maxSeriesWin);
    console.log("Max wins series - ", maxSeriesLoss);
  });
});
