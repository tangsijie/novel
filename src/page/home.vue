<template>
  <div>
    <div id="" class="nav1">
      <!-- <My-Header></My-Header> -->
      <!-- 调用组件 -->

      <div>
        <div class="logo-contain">
          <img src="../assets/R-C.jpg" />
          <p class="logo2">汤圆网</p>
        </div>
        <div class="nav-mid">
          <input
            class="search"
            type="text"
            v-model="searchvalue"
            placeholder="斗破苍穹"
            style="cursor:default;"
          />
          <div class="search2" v-if="searchshow">
            <p
              v-for="(item, index) in searchmesg"
              :key="index"
              @click="gobook(item)"
            >
              {{ item.bookname }}
            </p>
          </div>
          <el-button type="primary" icon="el-icon-search" @click="searchclick"
            >搜索</el-button
          >
        </div>
        <div class="mybook-contain">
          <div @click="gomybook" style="cursor: pointer;">我的书</div>
          <div
            @click="gologin"
            v-if="islogin"
            style="margin-left: 40px;cursor: pointer;"
          >
            登录
          </div>
          <router-link
            to="/loginRegister"
            style="margin-left: 40px;cursor: pointer;"
            >注册</router-link
          >
          <div style="margin-left: 20px;" v-if="!islogin">
            你好，{{ LoginUser.rname }}
          </div>
          <div
            style="margin-left: 40px;cursor: pointer;"
            @click="signout"
            v-if="!islogin"
          >
            退出
          </div>
        </div>
      </div>  
    </div>

    <div class="nav2">
      <div class="fenlei">
        <img src="../assets/目录.png" class="fenlei-icon" />作品排行
      </div>
      <div @click="allbook">全部作品</div>
      <div>全民热点</div>
      <div>排行</div>
      <div>完本</div>
      <div>免费</div>
      <div>作家作品</div>
      <div>男生区</div>
      <div>女生区</div>
    </div>
    <div class="contain1">
      <div style="width: 20%; margin-left:-80px;padding-right:30px">
        <ul class="fenlei-contain">
          <li
            v-for="(item, index) in fenlei.slice(0, 14)"
            :key="index"
            @click="gofufenlei(item)"
            style="cursor: pointer;"
          >
            <i class="el-icon-reading"></i>
            <p>{{ item.fufenlei }}</p>
            <p>{{ mesg[index].fangwenliang }}</p>
          </li>
        </ul>
      </div>
      <!-- 轮播图 -->
      <div style="width: 60%;">
        <div class="block">
          <span class="demonstration"></span>
          <el-carousel height="250px">
            <el-carousel-item v-for="(item, index) in img_list2" :key="index">
              <img :src="item" alt="" style="width: 100%;height: inherit;" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="lun">
          <img src="../assets/s1.jpg" />
          <img src="../assets/s2.jpg" />
          <img src="../assets/s3.jpg" />
        </div>
      </div>
      <!-- 咨询 -->
      <div style="width: 20%;" class="conrig">
        <div>
          <span class="tead">风凌天下新书震撼发布</span>
          <div class="p4">
            <p @click="getonebook('巫界术士')">【资讯】巫术世界新书发布</p>
            <p @click="getonebook('主神崛起')">【资讯】主神崛起新书发布</p>
            <p @click="getonebook('诸天读书人')">【资讯】诸天读书人新书发布</p>
            <p @click="getonebook('讨逆')">【资讯】讨逆新书发布</p>
          </div>
          <div class="yeyou">
            <div>
              <div>页游</div>
              <p>巫术世界新书发布</p>
            </div>
            <div style="margin-top: 30px;">
              <div>页游</div>
              <p>主神崛起新书发布</p>
            </div>
          </div>
          <div style="position: absolute;top: 54%;">
            <i class="iconfont icon-laba"></i>
            <marquee style="width: 80%;">
              <span style="font-size: 12px;color: #262626;">
                【资讯】巫术世界新书发布，赶紧来看不容错过，巅峰对决</span>
            </marquee>
          </div>
        </div>

        <img
          src="../assets/lun4.gif"
          style="margin-top: 110px;position: absolute;bottom: 0px;padding-left: 10px;"
        />
      </div>
    </div>
    <div class="conts">
      <!-- <toplist></toplist> -->
      <!-- 总推荐排行榜 -->
      <div style="width: 20%;">
        <div id="pai">
          <h3>总推荐排行榜</h3>
          <ul>
            <li v-for="(item, index) in mesg.slice(0, 14)" :key="index">
              <div
                v-if="index == 0"
                style="display: flex;width: 100%;position: relative;left: -30px;"
                @click="gobook(item)"
                class="ibox"
              >
                <div style="text-align: left;width: 100px;float: left;">
                  <h3 class="ph1">NO.1</h3>
                  <h2 style="color: red;font-size: 16px;margin-top: 5px;">
                    {{ item.bookname }}
                  </h2>
                  <p style="color: #bf2c24;font-size: 16px;padding: 3px 0 0;">
                    {{ item.tuijianshu }}推荐
                  </p>
                  <p>{{ item.fufenlei }} - {{ item.zifenlei }}</p>
                </div>
                <div
                  class="tupian"
                  style="width: 90px;height: 120px;overflow: hidden;border: 1px solid black;text-align: center;"
                >
                  <img :src="item.bookimg" style="width: 80px;height: 120px;background-size: cover;"/>
                </div>
              </div>

              <div :class="ph[index]" v-if="index != 0">{{ index + 1 }}</div>
              <div @click="gobook(item)" v-if="index != 0">
                {{ item.bookname }}<span v-if="index == 0 || index == 4"></span>
              </div>
              <div class="zuozhe" v-if="index != 0">{{ item.tuijianshu }}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 编辑推荐 -->
      <div style="width: 60%;" class="conts-secd">
        <h3>编辑推荐</h3>
        <div class="conts-secd3">
          <div class="conts-secd1">
            <lunbotu style="width: 100%;height: 100%;"></lunbotu>
          </div>
          <div class="conts-secd2">
            <p>巫术世界</p>
            <p>上帝佛但是覅但是覅的身份后第四</p>
            <p @click="getonebook('巫界术士')">书籍详情</p>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in mesg.slice(0, 6)"
            :key="index"
            @click="gobook(item)"
            style="cursor: pointer;"
          >
            <div>{{ item.bookname }}</div>
            <div>
              <p>{{item.fangwenliang}}</p>
              <p>人在追</p>
            </div>
            <p>{{ item.jieshao }}</p>
          </li>
        </ul>
        <hr style="position: relative;top: 30px;" />
        <div class="conts-fre">
          <div
            v-for="(item, index) in mesg.slice(0, 2)"
            :key="index"
            @click="gobook(item)"
            style="cursor: pointer;"
          >
          
            <p>{{ item.bookname }}</p>
            <p></p>
            <p>{{ item.jieshao }}</p>
            <img :src="item.bookimg" style="width: 70px;height: 90px;background-size: cover;"/>
          </div>
        </div>
      </div>
      <!-- 本周推荐 -->
      <div style="width: 20%;">
        <div id="pai">
          <h3>本周推荐</h3>
          <ul>
            <li v-for="(item, index) in mesg.slice(0, 17)" :key="index">
             
              <div class="tjb">{{ item.fufenlei }}</div>
              <div @click="gobook(item)" style="cursor: pointer;">
                {{ item.bookname }}<span v-if="index == 0 || index == 4"></span>
              </div>
              <div class="zuozhe">{{ item.writer }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ggao"><span></span></div>
    <!-- 底部 -->
    <footer1></footer1>
  </div>
</template>

<script>
import axios from "axios";
// import MyHeader from '../components/MyHeader.vue'
// import paihang from '../components/paihang.vue'
import footer1 from "../components/footer.vue";
import lunbotu from "../components/lunbotu.vue";
// import toplist from '../components/toplist.vue'
export default {
  data() {
    return {
      ph: [
        "ph1",
        "ph2",
        "ph3",
        "ph4",
        "ph4",
        "ph5",
        "ph6",
        "ph7",
        "ph8",
        "ph9",
        "ph10",
        "ph11",
        "ph12",
        "ph13",
        "ph14",
        "ph15",
        "ph16"
      ],
      searchshow: false,
      searchmesg: [],
      searchvalue: "",
      fufenlei: "",
      fenlei: "",
      mesg: "",
      LoginUser: "",
      img_list2: [
        "../static/img/7.jpg",
        "../static/img/780.jpg",
        "../static/img/781.jpg",
        "../static/img/783.jpg"
      ],
      islogin: true
    };
  },
  methods: {
    gobook(e) {
      this.$router.push({
        name: "book",
        params: {
          book: e
        }
      });
      this.$store.commit('setbook',e)
    },
    gofufenlei(f) {
      console.log("f", f.fufenlei);
      //获取子分类
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/getfufenleiSql",
        data: {
          fufenlei: f.fufenlei
        }
      }).then(
        res => {
          this.fufenleimesg = res.data.data;
          this.$router.push({
            name: "fenlei",
            params: {
              passfenlei: this.fufenleimesg,
              fufenlei:f.fufenlei
            }
          });
        },
        err => {
          console.log(err.msg);
        }
      );
    },
    //搜索功能
    searchclick() {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/searchSql",
        data: {
          inputvalue: this.searchvalue
        }
      }).then(
        res => {
          this.searchmesg = res.data.data;
          this.searchshow = true;
        },
        err => {
          console.log(err.msg);
        }
      );
    },
    gologin() {
      //你给事件所定义的事件名
      this.$router.push({
        //this就是调用这个文件里面的方法和数据,$router的意思就是调用路由，使得路由进行跳转
        path: "/loginRegister"
      });
    },
    gomybook() {
      if (this.LoginUser === "") {
        alert("请先登录");
        this.$router.push({
          path: "/loginRegister"
        });
      } else {
        this.$router.push({
          name: "self"
        });
      }
    },
    //退出方法，将store和localstorage里面存储的userinfo值清空，并返回到登录界面，同时点击浏览器后退按钮测试，不能后退，这是因为第3步中已经设置了判断当store值为空或者在登录界面时是不能后退，并且路由指向到登录界面
    signout() {
      this.$store.commit("setData", ""); //更新userInfo
      alert("退出成功");
      this.islogin = !this.islogin;
      this.getuser();
    },
    //this.$store.store.state.user拿到登录信息存进数组
    getuser() {
      this.LoginUser = this.$store.state.user;
      // console.log(this.LoginUser.rname)
      if (this.LoginUser !== "") {
        this.islogin = false;
      } else {
        this.islogin = true;
      }
      this.bookshow();
    },
    //获取夫分类
    fufenleishow() {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/fufenleiSql",
        data: {
          //           no: this.$store.state.isaccount
        }
      }).then(
        res => {
          console.log("fenlei",res.data.data);
          this.fenlei = res.data.data;
        },
        err => {
          console.log(err.msg);
        }
      );
    },
    bookshow() {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/getSql",

      }).then(
        res => {
          console.log(" res.data.data:", res);
          this.mesg = res.data.data;
          this.mesg.sort((a, b) => {
            return -(a.tuijianshu - b.tuijianshu);
          });
          for (var i = 0; i < this.mesg.length; i++) {
            this.mesg[i].bookimg = this.mesg[i].bookimg;
          }
          this.fufenleishow();
        },
        err => {
          console.log(err.msg);
        }
      );
    },
    getonebook(name){
      axios({
        method:'post',
        url:"http://127.0.0.1:3000/getSql/getoneSql",
        data:{
          bookname:name
        }
      }).then(res=>{
        // console.log('bookname',res);
        this.gobook(res.data.data[0])
      })
    },
    allbook(){
      this.$router.push({
        path:'/allbook'
      })
    }
  },
  mounted() {
    this.getuser();
  },
  components: {
    // MyHeader,
    // paihang,
    footer1,
    lunbotu
    // toplist
  }
};
</script>

<style scoped="scoped">
/* @import url("../assets/css/paihang.css"); */
@import url("../assets/icon-font/iconfont.css");
.el-carousel__item--card {
  left: 64px;
}
#pai > ul {
  margin-top: 10px;
}
#pai > ul > li {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.tupian > img {
  transition: all 0.6s;
  width: 100%;
background-size: cover;
}
.ibox:hover > .tupian > img {
  transform: scale(1.2);
}
.tjb {
  color: gray;
  min-width: 56px;
  overflow: hidden;
  font-size: 14px;
}
.ph1,
.ph2,
.ph3,
.ph4,
.ph5,
.ph6,
.ph7,
.ph8,
.ph9,
.ph10,
.ph11,
.ph12,
.ph13,
.ph14,
.ph15,
.ph16 {
  background: #ededed;
  color: #666;
  font: 700 14px/16px Arial;
  height: 16px;
  letter-spacing: -1px;
  margin-top: 8px;
  overflow: hidden;
  text-align: center;
  width: 16px;
}
.ph1 {
  color: white;
  background: #bf2c24;
  width: 36px;
}
.ph2 {
  color: white;
  background: #e67225;
}
.ph3 {
  color: white;
  background: #e6bf25;
}
#pai > ul > li > div:first-child:hover {
  color: red;
  cursor: pointer;
  transition: all 0.6s;
}
#pai > ul > li > div:nth-child(2):hover {
  color: red;
  cursor: pointer;
  transition: all 0.6s;
}
#pai > ul > li > div:last-child:hover {
  color: red;
}
#pai > ul > li > div:nth-child(2) {
  color: #1a1a1a;
  width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  line-height: 32px;
  margin-left: 10px;
}
#pai > ul > li > div:last-child {
  margin-left: 30px;
  color: #b3b3b3;
  float: right;
  font: 12px/32px PingFangSC-Regular, -apple-system, Simsun;
  overflow: hidden;
  text-align: right;
  text-overflow: ellipsis;
  white-space: normal;
  /* width: 64px; */
  white-space: nowrap;
}
#pai > h3 {
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 400;
  height: 24px;
  line-height: 25px;
  line-height: 1;
  overflow: hidden;
  padding-bottom: 4px;
  border-bottom: 1px solid #666;
}
#pai > ul > li > div > span {
  background: url(../assets/img/tag.png) 0 -24px no-repeat;
  height: 9px;
  right: -30px;
  top: -12px;
  width: 17px;
}
.logo-contain {
  display: flex; /* 横向排列 */
  justify-content: center; /* 把子容器中间排列无间隔 */
  align-items: center; /* 上下居中 */
}
.logo-contain img {
  height: 70px;
  width: 77px;
  margin: 0 10px 0 0;
}
.logo-contain p {
  font-size: 16px;
  font-weight: bold;
}
.search {
  font: 14px/38px PingFangSC-Regular, "-apple-system", Simsun;
  width: 326px;
  height: 38px;
  padding: 0 11px;
}
.search2 {
  font: 14px/38px PingFangSC-Regular, "-apple-system", Simsun;
  width: 326px;
  height: 200px;
  padding: 0 11px;
  position: absolute;
  z-index: 99;
  background-color: white;
  overflow: auto;
}
.search2 > p:hover {
  background-color: rgba(18, 18, 18, 0.1);
}
/* .nav1{
		-webkit-box-shadow: 0 1px 3px rgba(18,18,18,.1);
		 box-shadow: 0 1px 3px rgba(18,18,18,.1);
	} */
.nav1 > div {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-around; /* 把子容器平均排列有间隔 */
  align-items: center;
  padding: 10px;
}
.mybook-contain {
  /* width: 200px; */
  display: flex;
  justify-content: space-between; /* 把子容器平均排列无间隔 */
  align-items: center;
}
.mybook {
  padding: 10px;
  border: 1px solid black;
}
.conts-secd > h3 {
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 400;
  height: 24px;
  line-height: 25px;
  *line-height: 1;
  overflow: hidden;
  padding-bottom: 4px;
  border-bottom: 1px solid #666;
}
.block {
  margin: auto;
  margin-top: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.nav2 {
  display: flex;
  justify-content: center;
  background-color: #3e3d43;
}
.nav2 > div {
  margin: 2px;
  padding: 10px;
  color: #fff;
}
.nav2 > div:hover:not(.fenlei) {
  background: #000;
  border-bottom: 1px solid orange;
}
.nav2 > div:first-child {
  position: relative;
  left: -250px;
  background: #000;
  line-height: 15px;
  padding-bottom: 10px;
}
.contain1 {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: auto;
}
.fenlei-icon {
  position: relative;
  width: 24px;
  top: 6px;
  right: 5px;
}
.fenlei-contain {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 17px 0 0 0;
}
.fenlei-contain > li {
  width: 50%;
  height: 50px;
  list-style: none;
  font-size: 14px;
  color: #333;
  padding: 10px 0px 0px 0px;
  background-color: #f7f6f2;
  text-align: center;
  position: relative;
}
.fenlei-contain > li:hover {
  color: red;
}
.fenlei-contain > li > p:last-child:hover {
  color: red;
}
.fenlei-contain > li > i {
  font-size: 24px;
  position: absolute;
  left: 20px;
  top: 10px;
}
.fenlei-contain > li > p {
  margin-left: 20px;
  /* width: 34px; */
  position: relative;
  /* left: 30px; */
}
.fenlei-contain > li > p:last-child {
  color: #999;
  font-size: 12px;
}
.lun {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 165px;
  padding: 10px;
  padding-left: 0;
}
.lun > img {
  width: 32%;
  background-size: contain;
}
.lun > img:hover {
  transition: box-shadow 0.5s;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
}
.iconfont.icon-laba {
  font-size: 18px;
  background-color: red;
  position: relative;
  margin-top: 200px;
}
.conrig {
  position: relative;
  background-color: #ffffff;
  margin-top: 20px;
}
.yeyou {
  position: absolute;
  top: 40%;
}
.yeyou > div > div {
  width: 38px;
  height: 18px;
  text-align: center;
  color: #fff;
  background: #bf2c24;
  float: left;
  margin-left: 10px;
}
.yeyou > div {
  font-size: 14px;
  color: red;
  width: 100%;
  position: absolute;
  top: 37%;
}
.yeyou > div > p {
  width: 170px;
  margin-left: 60px;
}
.p4 {
  font-size: 14px;
  position: absolute;
  top: 10%;
}
.p4 > p {
  margin: 10px 0px;
}
.tead {
  font-weight: 800;
  position: absolute;
  margin: 10px 0 0 10px;
  font-size: 16px;
}
.conts {
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 20px auto;
}
.conts-secd {
  margin-left: 30px;
  margin-right: 30px;
}
.conts-secd3 {
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #666;
  align-items: center;
}
.conts-secd1 {
  width: 380px;
}
.conts-secd2 > div:first-child {
  width: 57%;
}
.conts-secd2 > div:nth-child(2) {
  display: flex;
  width: 40%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.conts-secd2 > div:last-child {
  position: relative;
}
.conts-secd > div > div > p:first-child {
  font-size: 18px;
  height: 24px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 220px;
  font-weight: 800;
}
.conts-secd > div > div > p:nth-child(2) {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}
.conts-secd > div > div:nth-child(2) > div {
  background: #bf2c24;
  border: 1px solid #bf2c24;
  border-radius: 15px;
  color: #fff;
  display: block;
  font: 14px/28px PingFangSC-Regular, -apple-system, Simsun;
  height: 28px;
  text-align: center;
  width: 98px;
  margin-top: 20px;
}
.conts-secd > ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
.conts-secd > ul > li {
  width: 30%;
  float: left;
  margin-top: 30px;
  position: relative;
}
.conts-secd > ul > li > div:first-child {
  color: #1a1a1a;
  font: 16px/20px PingFangSC-Regular, HelveticaNeue-Light, Helvetica Neue Light,
    Microsoft YaHei, "sans-serif";
}
.conts-secd > ul > li > div:nth-child(2) {
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
}
.conts-secd > ul > li > div:nth-child(2) > p:first-child {
  font-family: Arial;
  font-size: 16px;
  font-weight: 700;
  margin-right: 3px;
  vertical-align: middle;
  color: #bf2c24;
}
.conts-secd > ul > li > div:nth-child(2) > p:last-child {
  font-family: PingFangSC-Regular, -apple-system, Simsun;
  font-size: 12px;
  vertical-align: middle;
  color: #bf2c24;
}
.conts-secd > ul > li > p {
  color: #666;
  font-family: PingFangSC-Regular, -apple-system, Simsun;
  font-size: 12px;
  height: 36px;
  line-height: 20px;
  overflow: hidden;
}
.conts-fre > div > p:first-child {
  color: #fc6c28;
  font: 700 16px/21px PingFangSC-Regular, HelveticaNeue-Light,
    Helvetica Neue Light, Microsoft YaHei, "sans-serif";
}
.conts-fre > div > p:nth-child(3) {
  width: 174px;
  font: 12px PingFangSC-Regular, -apple-system, Simsun;
  height: 38px;
  overflow: hidden;
}
.conts-fre {
  height: 94px;
  display: flex;
  justify-content: space-between;
  top: 50px;
  border-bottom: 1px solid #666;
  align-items: center;
  position: relative;
}
.conts-fre > div {
  width: 45%;
  height: 94px;
  position: relative;
}
.conts-fre > div:hover {
  transition: box-shadow 0.5s;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
}
.conts-fre > div > p {
  margin-left: 15px;
  margin-top: 10px;
}
.conts-fre > div > img {
  width: 51px;
  position: absolute;
  right: 5px;
  top: 5px;
}
.ggao {
  width: 80%;
  background-image: url(../assets/img/6.jpg);
  height: 100px;
  background-size: 100% 100%;
  margin: auto;
  position: relative;
  margin-top: 50px;
  z-index: 2;
}
.ggao > span {
  background: url(../assets/img/ggao.png) no-repeat;
  bottom: 4px;
  height: 14px;
  position: absolute;
  right: 4px;
  width: 24px;
  z-index: 5;
}
</style>
