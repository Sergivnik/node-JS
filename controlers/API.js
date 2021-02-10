const db = require("../models/db.js");
var tasks = require("../models/tasks.js");

module.exports.taskGet = (req, res) => {
  tasks.list((data) => {
    if (data.error) {
      // Я понимаю, что можно на фронте эту ошибку отловить также, но этот рендер уже сделан
      // и мне показалось так проще
      res.render("errorPage.hbs", { err: data.error.errno });
    } else {
      res.send(data);
    }
  });
};
module.exports.taskAdd = (req, res) => {
  tasks.add(req.body, (data) => {
    if (data.error) {
      res.render("errorPage.hbs", { err: data.error.errno });
    } else {
      res.send(data);
    }
  });
};
module.exports.deleteID = (req, res) => {
  tasks.delete(req.params, (data) => {
    if (data.error) {
      res.render("errorPage.hbs", { err: data.error.errno });
    } else {
      res.send(data);
    }
  });
};
module.exports.completeID = (req, res) => {
  tasks.complete(req.params, (data) => {
    if (data.error) {
      res.render("errorPage.hbs", { err: data.error.errno });
    } else {
      res.send(data);
    }
  });
};
