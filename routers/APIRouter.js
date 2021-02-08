const express = require("express");
const router = express.Router();
const API = require("../controlers/API.js");

router.get("/getDATA", API.taskGet);
router.post("/addDATA", API.taskAdd);
router.delete("/deleteID", API.deleteID);
router.put("/completeID", API.completeID);

module.exports = router;
