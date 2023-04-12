const express = require("express");
let router = express.Router();
let admin = require("../mysql/controller/admin.js")

router.post("/getreader", admin.getreader);
router.post("/deletereader", admin.deletereader);
router.post("/getauthor", admin.getauthor);
router.post("/getauthorwork", admin.getauthorwork);
router.post("/deleteauthor", admin.deleteauthor);
router.post("/deletebook", admin.deletebook);
router.post("/deleteadmin", admin.deleteadmin);
router.post("/updatebook", admin.updatebook);
router.post("/getadmin", admin.getadmin);
router.post("/addadmin", admin.addadmin);

router.post("/updateshSql", admin.updateshSql);
router.post("/getshbook", admin.getshbook);

module.exports = router;