const express = require("express");
const router = express.Router();

const taskRouter = require("./task.js");
const authRouter = require("./auth.js");

router.use("/", taskRouter);
router.use("/auth", authRouter);

module.exports = router;
