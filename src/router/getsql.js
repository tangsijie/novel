const express = require("express");
let router = express.Router();
let getsql = require("../mysql/controller/getsql")

router.post("/getSql", getsql.getSql);//接口路径
router.post("/fufenleiSql", getsql.fufenleiSql);
router.post("/zhangjieSql", getsql.zhangjieSql);
router.post("/updateSql", getsql.updateSql);
router.post("/updatemimaSql", getsql.updatemimaSql);
router.post("/shujiaSql", getsql.shujiaSql);
router.post("/delshujiaSql", getsql.delshujiaSql);
router.post("/addshujiaSql", getsql.addshujiaSql);
router.post("/isaddshujiaSql", getsql.isaddshujiaSql);
router.post("/addtuijianSql", getsql.addtuijianSql);
router.post("/isaddtuijianSql", getsql.isaddtuijianSql);
router.post("/updatetuijianSql", getsql.updatetuijianSql);
router.post("/tuijianshowSql", getsql.tuijianshowSql);
router.post("/getfufenleiSql", getsql.getfufenleiSql);
router.post("/zifenleiSql", getsql.zifenleiSql);
router.post("/unizifenleiSql", getsql.unizifenleiSql);
module.exports = router;