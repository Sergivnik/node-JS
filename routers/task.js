const express = require("express");
const router = express.Router();
const controler = require("../controlers/task.js");

router.get("/", controler.taskGet);
router.get("/ADD", controler.taskGetAdd);
router.get("/DELETE", controler.taskGetDelete);
router.get("/SEARCH", controler.taskGetSearch);
router.get("/COMPLETE", controler.taskGetComplete);
router.post("/ADDTASK", controler.taskPostAdd);
router.post("/DELETETASK", controler.taskDeleteDelete);
router.post("/SEARCHTASK", controler.taskPostSearch);
router.post("/CHANGETASK", controler.taskPutChange);
router.post("/COMPLETETASK", controler.taskPutComplete);

module.exports = router;
