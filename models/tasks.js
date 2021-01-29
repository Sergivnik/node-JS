var options = require("./config");
const mysql2 = require("mysql2");
var Tasks = {
  list: function (callback) {
    const pool = mysql2.createPool(options).promise();
    pool
      .query("SELECT * FROM listtodo")
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      })
      .finally(() => {
        pool.end();
      });
  },
  add: function (task, callback) {
    / /; // TODO
  },
  change: function (id, text, callback) {
    / /; // TODO
  },
  complete: function (id, callback) {
    / /; // TODO
  },
  delete: function (id, callback) {
    / /; // TODO
  },
};
module.exports = Tasks;
