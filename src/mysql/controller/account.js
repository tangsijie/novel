const db = require("../core/mysql.js");
const moment = require("moment");
const fs = require('fs');
const jwt = require("jwt-simple");
class AccountCountroller {
  //注册
  async register(request, response, next) {
    let insertSql = "INSERT INTO `reader`(`rname`,`rpwd`)VALUE(?,?) ; ";
    let params = [request.body.no, request.body.pwd, request.body.status];
	let sel_sql =  "Select * from `reader` where `rname` = ? ; " ;
    if (params[2] == 2) {
      insertSql = "INSERT INTO `writer`(`wname`,`wpwd`)VALUE(?,?) ; ";
	  sel_sql =  "Select * from `writer` where `wname` = ? ; " ;
    }
	 // else if (params[2] == 3) {
      // insertSql = "INSERT INTO `admin`(`aname`,`apwd`)VALUE(?,?) ; ";
  //   }
    try {
		
      let result = await db.exec(insertSql, params);
	  let result2 = await db.exec(sel_sql, params);
      if (result && result.affectedRows >= 1 &&result2 && result2.affectedRows ==null) {
        console.log("访问服务器成功！"),
          response.json({
            code: 200,
            msg: "注册成功"
          });
      }
			 else if(result2 && result2.affectedRows !=null){
				response.json({
				  code: 200,
				  msg: "用户已存在"
				});
			}
			else {
        response.json({
          code: 200,
          msg: "注册失败"
        });
      }
    } catch (error) {
      response.json({
        code: -200,
        msg: "服务器异常",
        error
      });
    }
  }
  //登录
  async login(request, response, next) {
    let loginSql = " ";
    let params = [request.body.no, request.body.pwd, request.body.status];
   if (params[2] == 1) {
     loginSql = "SELECT * FROM reader WHERE rname=? AND rpwd=? ; ";
   }
	else {
		if (params[2] == 2) {
		  loginSql = " SELECT * FROM writer WHERE wname=? AND wpwd=? ; ";
		} 
		else{
			if(params[2] == 3) {
			  loginSql = " SELECT * FROM admin WHERE aname=? AND apwd=? ; ";
			}
		}
	}
    try {
      let result = await db.exec(loginSql, params);
	  console.log('img',result[0].img)
	  if(result[0].img ==null){
		  console.log('无头像')
	  }
	  else{
		  result[0].img = fs.readFileSync(result[0].img, 'base64');
	  }
      if (result && result.length >= 1) {
		
        // console.log("访问服务器成功！"),
          response.json({
            code: 200,
            msg: "登录成功",
            data: result[0],
            token: "createToken(result[0])"
          });
      } else {
        response.json({
			
          code: 200,
          msg: "登录失败",
          data: result[0]
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
  
  //数据传输
 
}
module.exports = new AccountCountroller();
