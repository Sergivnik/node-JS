const express = require("express");
const router = express.Router();
const API = require("../controlers/API.js");

router.get("/getDATA", API.taskGet);
