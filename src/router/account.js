const express = require("express");
let router = express.Router();
let accountcontroller = require("../mysql/controller/account.js")

router.post("/login", accountcontroller.login);
router.post("/register", accountcontroller.register);


module.exports = router;