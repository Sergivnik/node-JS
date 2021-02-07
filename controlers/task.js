var tasks = require("../models/tasks.js");
module.exports.taskGet = (req, res) => {
  tasks.list((data) => {
    if (!req.session.username) {
      res.redirect("/auth/login/");
    } else {
      console.log(req.session.username);
      if (data.error) {
        console.log(data.error.errno);
        res.render("errorPage.hbs", { err: data.error.errno });
      } else {
        data.forEach((elem) => {
          elem.complete = elem.complete ? "true" : "false";
        });
        res.render("startPage.hbs", { data });
      }
    }
  });
};
module.exports.taskGetAdd = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("addPage.hbs", {});
    } catch {}
  }
};
module.exports.taskGetDelete = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("deletePage.hbs", {});
    } catch {}
  }
};
module.exports.taskGetSearch = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("searchPage.hbs", {});
    } catch {}
  }
};
module.exports.taskGetComplete = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("completePage.hbs", {});
    } catch {}
  }
};
module.exports.taskPostAdd = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    console.log("Request: ", req.body);
    tasks.add(req.body, (data) => {
      if (data.error) {
        console.log(data.error.errno);
        res.render("errorPage.hbs", { err: data.error.errno });
      } else {
        console.log(data);
        res.redirect("/");
      }
    });
  }
};
module.exports.taskDeleteDelete = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    console.log("Request: ", req.body);
    tasks.delete(req.body, (data) => {
      if (data.error) {
        console.log(data.error.errno);
        res.render("errorPage.hbs", { err: data.error.errno });
      } else {
        console.log(data);
        res.redirect("/");
      }
    });
  }
};
module.exports.taskPostSearch = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    console.log("Request: ", req.body);
    tasks.search(req.body, (data) => {
      if (data.error) {
        console.log(data.error.errno);
        res.render("errorPage.hbs", { err: data.error.errno });
      } else {
        console.log(data);
        res.render("resSearchPage.hbs", { data });
      }
    });
  }
};
module.exports.taskPutChange = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    console.log("Request: ", req.body);
    tasks.change(req.body, (data) => {
      if (data.error) {
        console.log(data.error.errno);
        res.render("errorPage.hbs", { err: data.error.errno });
      } else {
        console.log(data);
        res.redirect("/");
      }
    });
  }
};
module.exports.taskPutComplete = async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    console.log("Request: ", req.body);
    tasks.complete(req.body, (data) => {
      if (data.error) {
        console.log(data.error.errno);
        res.render("errorPage.hbs", { err: data.error.errno });
      } else {
        console.log(data);
        res.redirect("/");
      }
    });
  }
};
