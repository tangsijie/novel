const express = require("express");
const server = express();
//引入中间件
// server.use(badyParser.urlencoded({extended:false}));
// server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
//跨域
server.all("*", (req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", "3.2.1");
  res.header("Cache-Control", "public,max-age=60000");
  // 任何请求之前有一个预请求，预请求后无其他回调处理，其他请求要进入下一个回调
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.use("/account", require("../router/account.js"));
server.use("/getSql", require("../router/getsql.js"));//路由路径

server.listen(3000, () => {
  console.log("服务器启动成功！");
});
