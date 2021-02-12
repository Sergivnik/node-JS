const db = require("./db.js");
const bcryptjs = require("bcryptjs");

var Users = {
  findUserByName: async function (name) {
    const user = await db.query("SELECT * from users WHERE name = ?", [name]);
    return user;
  },
  createUser: async function (user) {
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(user.password, salt);
    try {
      const newUser = await db.query(
        "INSERT INTO users(name, password, email) VALUES (?, ?, ?)",
        [user.username, user.password, user.email]
      );
    } catch {}
    newUser = await db.query("SELECT * from users WHERE name = ?", [
      user.username,
    ]);
    return newUser;
  },
};

module.exports = Users;
