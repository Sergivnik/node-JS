const express = require("express");
const path = require("path");
const app = express();
const db = require("./models/db.js");
const router = require("./routers");
var passport = require("passport");
var YandexStrategy = require("passport-yandex").Strategy;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

const session = require("express-session");
const sessionStore = new (require("express-mysql-session")(session))({}, db);
const sessionMiddleware = session({
  store: sessionStore,
  secret: "Top secret",
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { maxAge: 600000 },
});
app.use(sessionMiddleware);



const yadata = require("./models/yandex.js");
passport.use(
  new YandexStrategy(
    {
      clientID: yadata.YANDEX_CLIENT_ID,
      clientSecret: yadata.YANDEX_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/yandex/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
app.get("/auth/yandex", passport.authenticate("yandex"), (req, res) => {});

app.get(
  "/auth/yandex/callback",
  passport.authenticate("yandex", { failureRedirect: "/auth/login/" }),
  // Вот тут почему-то не redirect на /auth/login/ после того как порчу пароль не разобрался((
  (req, res) => {
    req.session.username = req.user.username;
    res.redirect("/");
  }
);

app.use(router);

app.listen(3000, () => console.log("Listening on port 3000"));
