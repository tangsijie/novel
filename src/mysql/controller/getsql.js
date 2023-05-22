const db = require("../core/mysql.js");
const moment = require("moment");
const fs = require('fs');
const jwt = require("jwt-simple");
class AccountCountroller {
	//评论
	async addcommentSql(request, response, next) {
		// 格式化时间-0
		function timeFormat(t) {
			return t < 10 ? '0' + t : t
		}
		// 获取当前时间
		function getTime() {
			let time = new Date()
			let year = time.getFullYear()
			let Month = timeFormat(time.getMonth() + 1)
			let Day = timeFormat(time.getDate())
			let h = timeFormat(time.getHours())
			let m = timeFormat(time.getMinutes())
			let s = timeFormat(time.getSeconds())
			return `${year}-${Month}-${Day} ${h}:${m}:${s}`
		}
		let comimg = "SELECT img  FROM reader where rname=? ; ";
		let params2 = [request.body.username];
		let result2 = await db.exec(comimg, params2);
		let comSql = " INSERT INTO message(username,img,value,bookname,time)VALUE(?,?,?,?,?);";
		let params = [request.body.username, result2[0].img, request.body.value, request.body.bookname, getTime()];
		try {
			let result = await db.exec(comSql, params);

			if (result && result.affectedRows >= 1) {
				response.json({
					code: 200,
					msg: "加入评论成功",
					data: result,
					// token: "createToken(result)"
				});
			} else {
				response.json({
					code: 200,
					msg: "加入评论失败",
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
	//展示评论表
	async commentshowSql(request, response, next) {
		let comshowSql = " SELECT *  FROM message where bookname=? ; ";
		let params = [request.body.bookname];
		try {
			let result = await db.exec(comshowSql, params);
			// for(var i = 0 ;i<result.length;i++){
			// 	result[i].img =  fs.readFileSync(result[i].img, 'base64');
			// }
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "展示推荐",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "展示失败",
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
	//我的评论
	async mycommentSql(request, response, next) {
		let mycomSql = " SELECT *  FROM message where username=? ; ";
		let params = [request.body.username];
		try {
			let result = await db.exec(mycomSql, params);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "展示推荐",
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
	//删除评论
	async delmycommentSql(request, response, next) {
		let mycommentSql2 = " Delete from message where id=?;";
		let params = [request.body.id];
		let p = request.body.id;
		try {
			let result = await db.exec(mycommentSql2, p);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "删除成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "删除失败",
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
	//搜索功能
	async searchSql(request, response, next) {
		let getsSql = " SELECT * FROM book where bookname like '%" + request.body.inputvalue + "%' and status='1'; ";
		let params = [request.body.inputvalue];
		try {
			let result = await db.exec(getsSql, params);
			if (result && result.length >= 1) {
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
   //修改book信息（访问量）
   async updatebook(request, response, next) {
	let insertSql = " UPDATE book SET fangwenliang=? where  bookname = ?;  ";
	let params = [request.body.fangwenliang,request.body.bookname];
	// console.log(request,123);
	try {
	  let result = await db.exec(insertSql, params);
	// console.log('resd',result)
	  if (result) {
		// console.log("访问服务器成功！"),
		  response.json({
			code: 200,
			msg: "更新访问量成功",
			data: result,
			token: "createToken(result)"
		  });
	  } else {
		response.json({
		  code: 201,
		  msg: "更新访问量失败",
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
	//修改密码
	async updatemimaSql(request, response, next) {
		let updatemimaSql = " UPDATE reader SET rpwd=? WHERE readerid = ? ; ";
		let params = [request.body.rpwd, request.body.readerid];
		try {
			let result = await db.exec(updatemimaSql, params);
			if (result && result.affectedRows >= 1) {
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
	//修改读者信息
	async updateSql(request, response, next) {
		let updateSql = " UPDATE reader SET img=?,rname = ? ,email=? ,phone=? ,shengri=? ,sex=? ,jianjie=? WHERE readerid = ? ; ";
		let params = [request.body.img, request.body.rname, request.body.email, request.body.phone, request.body.shengri, request.body.sex, request.body.jianjie, request.body.readerid];
		try {
			let result = await db.exec(updateSql, params);
			if (result && result.affectedRows >= 1) {
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
	//筛选是否可以加入推荐表
	async isaddtuijianSql(request, response, next) {
		let isaddtuijianSql = " SELECT * FROM tuijian where username=? and bookname=?; ";
		let params = [request.body.username, request.body.bookname];
		try {
			let result = await db.exec(isaddtuijianSql, params);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "可以推荐",
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
	//加入推荐表
	async addtuijianSql(request, response, next) {
		let addtuijianSql = " INSERT INTO tuijian(username,bookname,tuijianshu)VALUE(?,?,?);";
		let addtuijianSql2 = " update tuijian set tuijianshu = tuijianshu + 1 where bookname=?";
		let params = [request.body.username, request.body.bookname, request.body.tuijianshu];
		let params2 = [request.body.bookname];
		try {
			let result = await db.exec(addtuijianSql, params);
			let result2 = await db.exec(addtuijianSql2, params2);
			if (result && result.affectedRows >= 1 && result2 && result2.affectedRows >= 1) {
				response.json({
					code: 200,
					msg: "推荐成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({
					code: 200,
					msg: "推荐失败",
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
	//更新推荐表
	async updatetuijianSql(request, response, next) {
		let updatetuijianSql = " UPDATE tuijian SET tuijianshu = ? where bookname=? and username=?;";
		let updatetuijianSql2 = " update tuijian set tuijianshu = ? where bookname=?";
		let params = [request.body.tuijianshu, request.body.bookname, request.body.username];
		let params2 = [request.body.tuijianshu, request.body.bookname];
		try {
			let result = await db.exec(updatetuijianSql, params);
			let result2 = await db.exec(updatetuijianSql2, params2);
			if (result && result.affectedRows >= 1 && result2 && result2.affectedRows >= 1) {
				response.json({
					code: 200,
					msg: "更新推荐成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({
					code: 200,
					msg: "加入书架失败",
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
	//展示推荐数
	async tuijianshowSql(request, response, next) {
		let tuijianshowSql = " SELECT * FROM tuijian where bookname=?";
		let params = [request.body.bookname];
		try {
			let result = await db.exec(tuijianshowSql, params);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "展示推荐",
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
	//筛选是否可以加入书架
	async isaddshujiaSql(request, response, next) {
		let isaddshujiaSql = " SELECT * FROM shujia where username=? and bookname=?; ";
		let params = [request.body.username, request.body.bookname];
		try {
			let result = await db.exec(isaddshujiaSql, params);
			if (result && result.length >= 1) {
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
	//加入书架
	async addshujiaSql(request, response, next) {
		// 格式化时间-0
		function timeFormat(t) {
			return t < 10 ? '0' + t : t
		}
		// 获取当前时间
		function getTime() {
			let time = new Date()
			let year = time.getFullYear()
			let Month = timeFormat(time.getMonth() + 1)
			let Day = timeFormat(time.getDate())
			let h = timeFormat(time.getHours())
			let m = timeFormat(time.getMinutes())
			let s = timeFormat(time.getSeconds())
			return `${year}-${Month}-${Day} ${h}:${m}:${s}`
		}
		// console.log("this.getTime():",getTime());
		let comimg2 = "SELECT bookimg  FROM book where bookname=? and status='1'; ";
		let params2 = [request.body.bookname];
		let result2 = await db.exec(comimg2, params2);

		let addshujiaSql = " INSERT INTO shujia(bookimg,username,bookname,status,fenlei,zhangjie,title,time,writer)VALUE(?,?,?,?,?,?,?,?,?);";
		let params = [result2[0].bookimg, request.body.username, request.body.bookname, request.body.status, request.body.fenlei, request.body.zhangjie, request.body.title, getTime(), request.body.writer];
		try {
			let result = await db.exec(addshujiaSql, params);
			if (result && result.affectedRows >= 1) {
				response.json({
					code: 200,
					msg: "加入书架成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({
					code: 200,
					msg: "加入书架失败",
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
	//删除书架
	async delshujiaSql(request, response, next) {
		let delshujiaSql = " Delete from shujia where id=?;";
		let params = [request.body.id];
		let p = request.body.id;
		try {
			for (var i = 0; i < p.length; i++) {
				let result = await db.exec(delshujiaSql, p[i]);
			}
			if (result && result.length >= 1) {
				//   console.log('xx',msg)
				response.json({
					code: 200,
					msg: "删除成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "删除失败",
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
	//搜索书架
	async searchsjSql(request, response, next) {
		let getsSql2 = " SELECT * FROM shujia where username=? and bookname like '%" + request.body.inputvalue2 + "%'; ";
		let params = [request.body.username, request.body.inputvalue2];
		try {
			let result = await db.exec(getsSql2, params);
			if (result && result.length >= 1) {
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
	//书架展示
	async shujiaSql(request, response, next) {
		let shujiaSql = " SELECT * FROM shujia where username=?; ";
		let params = [request.body.username];
		try {
			let result = await db.exec(shujiaSql, params);
			// for(var i = 0 ;i<result.length;i++){
			// 	result[i].bookimg =  fs.readFileSync(result[i].bookimg, 'base64');
			// }
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "查询成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "查询失败",
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
	//传输后端数据到前端,book的各种信息
	async getSql(request, response, next) {
		let getSql = " SELECT * FROM book where status='1'; ";
		let params = [];
		try {
			let result = await db.exec(getSql, params);
			// console.log('result:',result)
			// for(let j = 0 ;j<result.length;j++){
			// 	result[j].bookimg =  fs.readFileSync(result[j].bookimg, 'base64');
			// }
			// console.log('result2222:',result)
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "查询成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "查询失败",
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
	//传输后端数据到前端,某一本book的各种信息
	async getoneSql(request, response, next) {
		let getSql2 = " SELECT * FROM book where bookname=? and status='1'; ";
		let params = [request.body.bookname];
		try {
			let result = await db.exec(getSql2, params);
			// result[0].bookimg =  fs.readFileSync(result[0].bookimg, 'base64');
			if (result && result.length >= 1) {
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
	//传输后端数据到前端,fufenlei的各种信息
	async getfufenleiSql(request, response, next) {

		let fufenleiSql = " SELECT * FROM book where fufenlei= ? and status='1'; ";
		let params = [request.body.fufenlei];
		try {
			let result = await db.exec(fufenleiSql, params);
			if (result && result.length >= 1) {
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
	//传输后端数据到前端,zifenlei的各种信息
	async zifenleiSql(request, response, next) {
		let zifenleiSql = " SELECT  * FROM book where zifenlei=? and status='1'; ";
		let params = [request.body.zifenlei];
		try {
			let result = await db.exec(zifenleiSql, params);
			for (var j = 0; j < result.length; j++) {
				result[j].bookimg = fs.readFileSync(result[j].bookimg, 'base64');
			}
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "查询成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "查询失败",
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
	//传输后端数据到前端,去重zifenlei的各种信息
	async unizifenleiSql(request, response, next) {
		let onlyzifenleiSql = " SELECT distinct zifenlei FROM book where fufenlei=? and status='1';";
		let params = [request.body.fufenlei];
		try {
			let result = await db.exec(onlyzifenleiSql, params);
			if (result && result.length >= 1) {
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
	//章节
	async zhangjieSql(request, response, next) {
		let getSql = " SELECT * FROM zhangjie where bookname=?; ";
		let params = [request.body.bookname];
		try {
			let result = await db.exec(getSql, params);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "查询成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "查询失败",
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
	// 获取对应章节内容
	async whichzhangjieSql(request, response, next) {
		let getSql = " SELECT * FROM zhangjie where bookname=? and title=? and id=?; ";
		let params = [request.body.bookname, request.body.title, request.body.id];
		try {
			let result = await db.exec(getSql, params);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "查询成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "查询失败",
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
	// 获取对应书籍内容
	async getbook(request, response, next) {
		// console.log(123);
		let getSql = " SELECT * FROM book where bookname=? and id=?  ";
		// console.log(request,"123");
		let params = [request.query.bookname, request.query.id];
		// console.log(request.query.bookname,'1223456');
		try {
			let result = await db.exec(getSql, params);
			if (result && result.length >= 1) {
				response.json({
					code: 200,
					msg: "查询成功",
					data: result,
					token: "createToken(result)"
				});
			} else {
				response.json({

					code: 200,
					msg: "查询失败",
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

	async fufenleiSql(request, response, next) {
		let getSql = " SELECT distinct fufenlei FROM book where status='1'; ";
		let params = [];
		try {
			let result = await db.exec(getSql, params);
			if (result && result.length >= 1) {
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
}
module.exports = new AccountCountroller();