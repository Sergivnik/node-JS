const express = require("express");
const router = express.Router();
const controler = require("../controlers/chat.js");

router.get("/", controler.getChat);

module.exports = router;
