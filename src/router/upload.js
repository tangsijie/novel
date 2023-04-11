var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require("multer") 
const path=require('path')
 //接受用户图片
 console.log("dirname:",__dirname)
 router.post(
    "/upload",
    multer({
      //设置文件存储路径
      dest:path.join(__dirname,"../../static/public/image")
    }).array("file", 1),
    function (req, res, next) {
      let files = req.files;
      let file = files[0];
        let fileInfo = {};
      let path = "../../static/public/image/" + Date.now().toString() + "_" + file.originalname;
      fs.renameSync("../../static/public/image/" + file.filename, path);
      //获取文件基本信息
      fileInfo.type = file.mimetype;
      fileInfo.name = file.originalname;
      fileInfo.size = file.size;
      fileInfo.path = path;
      // const base64 = fs.readFileSync(fileInfo.path, 'base64')//解析方式
      res.json({
        code: 200,
        msg: "OK",
        data: fileInfo,
      });
    }
);
  
module.exports = router;