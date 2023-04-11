const path=require("path")
const name=defaultSettings.title||"noval"
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  devServer: {
    // 端口号
    port: 8081,
    // 配置不同的后台API地址
    proxy: {
      '/account/register': {
        // target: 'http://127.0.0.1:8080/account',
        changeOrigin: true, // 是否跨域
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/account/register': ''
        }
      },
      '/loginRegister': {
        // target: 'http://127.0.0.1:8080/loginRegister',
        changeOrigin: true, // 是否跨域
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/loginRegister': ''
        }
      }
    }
  },
  configureWebpack:{
    name:name,
    resolve:{
      alias:{
        "@":resolve("src")
      }
    }
  }
}
