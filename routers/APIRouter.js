const express = require("express");
const router = express.Router();
const API = require("../controlers/API.js");

router.get("/getDATA", API.taskGet);
router.post("/addDATA", API.taskAdd);
router.delete("/:id", API.deleteID);
router.put("/:id", API.completeID);

module.exports = router;
