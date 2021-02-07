const express = require("express");
const router = express.Router();
const auth = require("../controlers/auth.js");

router.get("/login/", auth.authGetLogin);
router.get("/signup/", auth.authGetSignup);
router.get("/exit", auth.authGetExit);
router.post("/login/", auth.authPostLogin);
router.post("/signup/", auth.authPostSignup);

module.exports = router;
