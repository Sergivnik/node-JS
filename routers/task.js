const express = require("express");
const router = express.Router();
var tasks = require("../models/tasks.js");

router.get("/", (req, res) => {
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
});

router.get("/ADD", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("addPage.hbs", {});
    } catch {}
  }
});

router.get("/DELETE", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("deletePage.hbs", {});
    } catch {}
  }
});

router.get("/SEARCH", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("searchPage.hbs", {});
    } catch {}
  }
});

router.get("/COMPLETE", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/auth/login/");
  } else {
    try {
      res.render("completePage.hbs", {});
    } catch {}
  }
});

router.post("/ADDTASK", async (req, res) => {
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
});

router.post("/DELETETASK", async (req, res) => {
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
});

router.post("/SEARCHTASK", async (req, res) => {
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
});

router.post("/CHANGETASK", async (req, res) => {
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
});

router.post("/COMPLETETASK", async (req, res) => {
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
});

module.exports = router;
