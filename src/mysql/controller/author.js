const db = require("../core/mysql.js");
const moment = require("moment");
const jwt = require("jwt-simple");
class AccountCountroller {
    //获得子分类
    async getzifenlei(request, response, next) {
        let getSql = " SELECT distinct zifenlei FROM book where fufenlei = ?; ";
        let params = [request.body.fufenlei];
        try {
          let result = await db.exec(getSql, params);
          if (result && result.length >= 1) {
            // console.log("访问服务器成功！"),
              response.json({
                code: 200,
                msg: "查询成功",
                data: result,
                token: "createToken(result)"
              });
          } else {
            response.json({
              code: 200,
              msg: "登录失败",
              data: result
            });
          }
        } catch (error) {
          //TODO handle the exception
          response.json({
            code: 200,
            msg: "服务器异常",
            error
          });
        }
        function createToken(data) {
          return jwt.encode(
            {
              exp: Date.now() + 1000 * 60 * 60 * 24,
              info: data
            },
            require("../config").tokenKey
          );
        }
      }

   //创建书本
   async createbook(request, response, next) {
    let insertSql = " INSERT INTO book (bookname,writer,jieshao,fufenlei,zifenlei,bookimg) value (?,?,?,?,?,?); ";
    let params = [request.body.fufenlei];
    try {
      let result = await db.exec(insertSql, params);
      if (result && result.length >= 1) {
        // console.log("访问服务器成功！"),
          response.json({
            code: 200,
            msg: "插入成功",
          });
      } else {
        response.json({
          code: 200,
          msg: "插入失败",
        });
      }
    } catch (error) {
      //TODO handle the exception
      response.json({
        code: 200,
        msg: "服务器异常",
        error
      });
    }
    function createToken(data) {
      return jwt.encode(
        {
          exp: Date.now() + 1000 * 60 * 60 * 24,
          info: data
        },
        require("../config").tokenKey
      );
    }
  }








}
    module.exports = new AccountCountroller();
    