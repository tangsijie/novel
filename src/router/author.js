const express = require("express");
let router = express.Router();
let author = require("../mysql/controller/author.js")


router.post("/getzifenlei", author.getzifenlei);
router.post("/createbook", author.createbook);
router.post("/getauthorbook", author.getauthorbook);
router.post("/getbooksections", author.getbooksections);
router.post("/addsection", author.addsection);

module.exports = router;