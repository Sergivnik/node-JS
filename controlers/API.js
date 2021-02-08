const db = require("../models/db.js");

module.exports.taskGet = (req, res) => {
  db.query("SELECT * FROM listtodo").then(([data, fields]) => {
    res.send(data);
  });
};
module.exports.taskAdd = (req, res) => {
  db.query("INSERT INTO listtodo SET ?", req.body).then(([data, fields]) => {
    res.send(data);
  });
};
module.exports.deleteID = (req, res) => {
  db.query("DELETE FROM listtodo WHERE ?", req.body).then(([data, fields]) => {
    res.send(data);
  });
};
module.exports.completeID = (req, res) => {
  db.query(`UPDATE listtodo SET ? where id=${req.body.id}`, [{ complete: "1" }]).then(
    ([data, fields]) => {
      res.send(data);
    }
  );
};
