const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

var tasks = require("./models/tasks");

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  tasks.list((data) => {
    if (data.error) {
      console.log(data.error.errno);
      res.render("errorPage.hbs", { err: data.error.errno });
    } else {
      data.forEach((elem) => {
        elem.complete = elem.complete ? "true" : "false";
      });
      res.render("startPage.hbs", { data });
    }
  });
});

app.get("/ADD", async (req, res) => {
  try {
    res.render("addPage.hbs", {});
  } catch {}
});

app.get("/DELETE", async (req, res) => {
  try {
    res.render("deletePage.hbs", {});
  } catch {}
});

app.get("/SEARCH", async (req, res) => {
  try {
    res.render("searchPage.hbs", {});
  } catch {}
});

app.get("/COMPLETE", async (req, res) => {
  try {
    res.render("completePage.hbs", {});
  } catch {}
});

app.post("/ADDTASK", async (req, res) => {
  console.log("Request: ", req.body);
  tasks.add(req.body, (data) => {
    console.log(data);
    res.redirect("/");
  });
});

app.post("/DELETETASK", async (req, res) => {
  console.log("Request: ", req.body);
  tasks.delete(req.body, (data) => {
    console.log(data);
    res.redirect("/");
  });
});

app.post("/SEARCHTASK", async (req, res) => {
  console.log("Request: ", req.body);
  tasks.search(req.body, (data) => {
    console.log(data);
    res.render("resSearchPage.hbs", { data });
  });
});

app.post("/CHANGETASK", async (req, res) => {
  console.log("Request: ", req.body);
  tasks.change(req.body, (data) => {
    console.log(data);
    res.redirect("/");
  });
});

app.post("/COMPLETETASK", async (req, res) => {
  console.log("Request: ", req.body);
  tasks.complete(req.body, (data) => {
    console.log(data);
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
