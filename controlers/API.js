const db = require("../models/db.js");

module.exports.taskGet = (req, res) => {
  db.query("SELECT * FROM listtodo").then(([data, fields]) => {
    res.send(data);
  });
};
