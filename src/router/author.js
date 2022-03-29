const express = require("express");
let router = express.Router();
let author = require("../mysql/controller/author.js")


router.post("/getzifenlei", author.getzifenlei);
router.post("/createbook", author.createbook);

module.exports = router;