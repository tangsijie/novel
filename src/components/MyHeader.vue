<template>
  <div>
      <div class="top">
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
</template>

<script>
import axios from "axios";
export default {
  name: "MyHeader",
  data() {
    return {
			searchvalue: "",
			searchshow: false,
			LoginUser: "",
			islogin: true,
			searchmesg:[]
		};
  },
  methods: {
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
		  gobook(e) {
      this.$router.push({
        name: "book",
        params: {
          book: e
        }
      });
      this.$store.commit('setbook',e)
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
		 signout() {
      this.$store.commit("setData", ""); //更新userInfo
      alert("退出成功");
      this.islogin = !this.islogin;
      this.getuser();
    },
		getuser() {
      this.LoginUser = this.$store.state.user;
      // console.log(this.LoginUser.rname)
      if (this.LoginUser == "") {
        this.islogin = false;
      } else {
        this.islogin = true;
      }
      this.bookshow();
    },
		 bookshow() {
      this.$axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/getSql",

      }).then(
        res => {
          // console.log(" res.data.data:", res);
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
  }
};
</script>

<style>
.top {
	display: flex;
	width: 80%;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
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

.mybook-contain {
  width: 200px;
  display: flex;
  justify-content: space-between; 
  align-items: center;
}
.mybook {
  padding: 10px;
  border: 1px solid black;
} 
</style>
