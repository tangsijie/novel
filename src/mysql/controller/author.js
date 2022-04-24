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
    let params = [request.body.bookname,request.body.writer,request.body.jieshao,request.body.fufenlei,request.body.zifenlei,request.body.bookimg];
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
  //获得该作者的所有书籍
  async getauthorbook(request, response, next) {
    let getSql = " SELECT * FROM book where writer = ? and status='1'; ";
    let params = [request.body.writer];
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
  
  //删除该作者的某个书籍
  async delauthorbook(request, response, next) {
    let getSql = " Delete from book where bookname=?; ";
    let params = [request.body.bookname];
    try {
      let result = await db.exec(getSql, params);
      if (result && result.length >= 1) {
        // console.log("访问服务器成功！"),
          response.json({
            code: 200,
            msg: "删除书本成功",
            data: result,
            token: "createToken(result)"
          });
      } else {
        response.json({
          code: 200,
          msg: "删除书本失败",
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
	//获取该书的所有章节
	async getbooksections(request, response, next) {
	  let getSql = " SELECT * FROM zhangjie where bookname = ?; ";
	  let params = [request.body.bookname];
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
//增加书的章节
async addsection(request, response, next) {
  let insertSql = " INSERT INTO zhangjie(bookname,zhangjieshu,title,value) value (?,?,?,?); ";
  let params = [request.body.bookname,request.body.zhangjieshu,request.body.title,request.body.value];
  try {
    let result = await db.exec(insertSql, params);
	console.log('resd',result)
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
  //更新书的章节
  async updatesection(request, response, next) {
    let insertSql = " UPDATE zhangjie SET zhangjieshu = ?,title=?,value=? where id=? ; ";
    let params = [request.body.zhangjieshu,request.body.title,request.body.value,request.body.id];
    try {
      let result = await db.exec(insertSql, params);
  	console.log('resd',result)
      if (result && result.length >= 1) {
        // console.log("访问服务器成功！"),
          response.json({
            code: 200,
            msg: "更新成功",
            data: result,
            token: "createToken(result)"
          });
      } else {
        response.json({
          code: 200,
          msg: "更新失败",
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




}
    module.exports = new AccountCountroller();
    