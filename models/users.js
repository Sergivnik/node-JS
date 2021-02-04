const db = require("./db.js");

var Users = {
  findUserByName: async function (name) {
    const user = await db.query("SELECT * from users WHERE name = ?", [name]);
    return user;
  },
};
module.exports = Users;
