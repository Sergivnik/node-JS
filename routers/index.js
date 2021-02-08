const express = require("express");
const router = express.Router();

const taskRouter = require("./task.js");
const authRouter = require("./auth.js");
const APIRouter = require("./APIRouter.js");

router.use("/", taskRouter);
router.use("/auth", authRouter);
router.use("/API", APIRouter);

module.exports = router;
