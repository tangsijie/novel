const mysql=require('mysql');
const conn=mysql.createdConnection(config:{
	host:"localhost",
	user:"root",
	password:"123456",
	port:3306,
	database:"sys"
});
conn.connect();
module.exports=conn;