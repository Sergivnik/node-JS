const db = require("./db.js");

var Tasks = {
  list: function (callback) {
    db.query("SELECT * FROM listtodo")
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
  add: function (task, callback) {
    db.query("INSERT INTO listtodo SET ?", task)
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
  change: function (task, callback) {
    db.query("UPDATE listtodo SET ? where id=?", [task, task.id])
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
  search: function (id, callback) {
    db.query("SELECT * FROM listtodo WHERE ?", id)
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
  complete: function (id, callback) {
    db.query("UPDATE listtodo SET ? where id=?", [{ complete: "1" }, id.id])
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
  delete: function (id, callback) {
    db.query("DELETE FROM listtodo WHERE ?", id)
      .then(([data, fields]) => {
        callback(data);
      })
      .catch((err) => {
        callback({ error: err });
      });
    // .finally(() => {
    //   pool.end();
    // });
  },
};
module.exports = Tasks;
