const express = require("express");
const path = require("path");
const app = express();
const router = require("./routers");
var passport = require("passport");
var YandexStrategy = require("passport-yandex").Strategy;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

const session = require("./middleware/session.js");
app.use(session.sessionMiddleware);

const yadata = require("./models/yandex.js");
passport.use(
  new YandexStrategy(
    {
      clientID: yadata.CLIENT_ID,
      clientSecret: yadata.CLIENT_SECRET,
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

const http = require("http").createServer(app);
const io = require("socket.io")(http);
io.use((socket, next) => {
  session.sessionMiddleware(socket.request, {}, next);
});
io.on("connection", (socket) => {
  if (!socket.request.session || !socket.request.session.username) {
    console.log("Unauthorised user connected!");
    socket.disconnect();
    return;
  }

  console.log("Chat user connected:", socket.request.session.username);

  socket.on("disconnect", () => {
    console.log("Chat user disconnected:", socket.request.session.username);
  });

  socket.on("chatMessage", (data) => {
    console.log(
      "Chat message from",
      socket.request.session.username + ":",
      data
    );
    data.message = socket.request.session.username + ": " + data.message;
    io.emit("chatMessage", data);
    // console.log(io.sockets.sockets);
  });
});

app.use(router);

http.listen(3000, () => console.log("Listening on port 3000"));
