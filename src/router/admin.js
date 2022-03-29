const express = require("express");
let router = express.Router();
let admin = require("../mysql/controller/admin.js")

router.post("/getreader", admin.getreader);


module.exports = router;