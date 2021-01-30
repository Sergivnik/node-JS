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
    const pool = mysql2.createPool(options).promise();
    pool
      .query("INSERT INTO listtodo SET ?", task)
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
  change: function (task, callback) {
    const pool = mysql2.createPool(options).promise();
    pool
      .query("UPDATE listtodo SET ? where id=?", [task, task.id])
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
  search: function (id, callback) {
    const pool = mysql2.createPool(options).promise();
    pool
      .query("SELECT * FROM listtodo WHERE ?", id)
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
  complete: function (id, callback) {
    const pool = mysql2.createPool(options).promise();
    pool
      .query("UPDATE listtodo SET ? where id=?", [{ complete: "1" }, id.id])
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
  delete: function (id, callback) {
    const pool = mysql2.createPool(options).promise();
    pool
      .query("DELETE FROM listtodo WHERE ?", id)
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
};
module.exports = Tasks;
