<template>
  <div id="product">
    <div class="self-header">
      <div>
        <img :src="imgurl" alt="" />
        <p>个人中心</p>
      </div>
      <ul>
        <li @click="goself" style="cursor: pointer;">
          <div>我的首页</div>
        </li>
        <li style="background-color: #ee4259;">
          <div>消息中心</div>
        </li>
        <li @click="goselfinfo" style="cursor: pointer;">
          <div>个人资料</div>
        </li>
      </ul>
      <b @click="$router.push('/')" style="cursor: pointer;">小说首页</b>
      <p>{{ LoginUser.rname }}</p>
      <span @click="signout" style="cursor: pointer;">退出</span>
    </div>
    <div class="xinxi">
      <div class="message" v-for="(v, k, i) in msgObj" :key="i">
        <div class="messageHeader">
          <p>{{ k }}</p>
          <div v-for="(item, index) in v" :key="index">

            <ul>
              <li class="liuyanLi">
                <span class="time">{{ item.time | dateFmt("YYYY-MM-DD HH:mm:ss") }}</span>
                {{ item.value.replaceAll('"', '') }}
                <button class="del" @click="delmesg(item.id)"> 删除</button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "product",

  data() {
    return {
      LoginUser: {},
      comshowmeag: [],
      msgObj: {},
      imgurl:''
    };
  },
  watch: {
    comshowmeag: {
      handler(newV, oldV) {
        if (newV.length > 0) {
          let obj = {}
          // obj.length=0
          if (this.comshowmeag.length > 0) {
            this.comshowmeag.forEach((item) => {
              if (!obj[item.bookname]) {
                obj[item.bookname] = []
                // obj.length+=1
              }
              obj[item.bookname].push({ id: item.id, bookname: item.bookname, value: item.value, time: item.time })
            })
            console.log("obj::", obj);
            this.msgObj = obj
          } else {
            this.msgObj = {}
          }
        }
      }, 
      deep: true,
      immediate: true
    }
  },

  methods: {
    // 获取评论
    commentshow() {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/mycommentSql",
        data: {
          username: this.LoginUser.rname
        }
      }).then(
        res => {
          console.log("评论：", res);
          this.comshowmeag = res.data.data;
          console.log("this.comshowmeag", this.comshowmeag);
          this.comshowmeag.sort((a, b) => {
            return new Date(b.time) - new Date(a.time);
          });
        },
        err => {
          console.log(err);
        }
      );
    },
    // 删除评论
    delmesg(e) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/delmycommentSql",
        data: {
          id: [e]
        }
      }).then(
        res => {
          alert("删除成功");
          this.commentshow();
        },
        err => {
          console.log(err.msg);
        }
      );
    },
    signout() {
      this.$store.commit("setData", ""); //更新userInfo
      alert("退出成功");
      this.getuser();
      this.$router.push({
        path: "/"
      });
    },
    goself() {
      this.$router.push({
        name: "self"
      });
    },
    goselfinfo() {
      this.$router.push({
        name: "selfinfo"
      });
    },
    getuser() {
      this.LoginUser = this.$store.state.user;
      this.imgurl = this.$store.state.user.img;
    }
  },
  mounted() {
    this.getuser();
    this.commentshow();
  }
};
</script>

<style scoped="scoped">
html {
  font-family: Helvetica, "PingFang SC", "Source Han Sans CN",
    "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
  overflow-y: scroll;
  background: #58cd83;
}

.self-header {
  width: 100%;
  height: 70px;
  background-color: #3e3d43;
  display: flex;
  color: white;
  position: relative;
  justify-content: center;
  align-items: center;
}

.self-header>ul>li {
  float: left;
  line-height: 20px;
  display: block;
  padding: 22px 22px;
  transition: background 0.2s, border 0.2s;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
}

.self-header>div {
  position: absolute;
  left: 15%;
}

.self-header>div>img {
  width: 60px;
  height: 50px;
  float: left;
}

.self-header>div>p {
  color: #fff;
  font-size: 28px;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}

.self-header>b {
  position: absolute;
  right: 28%;
}

.self-header>p {
  position: absolute;
  right: 19%;
}

.self-header>ul>li:hover {
  background-color: #000000;
}

.self-header>span {
  position: absolute;
  right: 10%;
}

.xinxi {
  width: 700px;
  margin: 0 auto;
}

.message {

  /* height: 100px; */
  /* border: 1px solid black; */
  margin-top: 50px;
}

.messageHeader {
  position: relative;
  text-align: center;
  /* height: 50px; */
  line-height: 50px;
  margin-top: 10px;
  border-radius: 25px;
  /* background-color: rgb(218, 136, 37); */
  background: linear-gradient(to right, #1a9f5f, rgb(0, 255, 255));
}

.time {
  position: absolute;
  display: inline-block;
  left: 0;
  font-size: 12px;
}

.liuyanLi {
  position: relative;
  /* height: 150px;
  line-height: 150px;  */
  border-radius: 25px;
  background: linear-gradient(to left, yellow, pink);
}

.del {
  display: inline-block;
  position: absolute;
  right: 10px;
  text-align: center;
  line-height: 30px;
  width: 50px;
  margin-top: 10px;
  background-color: #1a9f5f;
  color: red;
}</style>
