<template>
  <div>
    <div class="prompt" v-if="box">
      <div></div>
      <p>删除成功</p>
    </div>
    <div style="width:80%;margin:20px auto; padding:40px;background:#fff ">
      <div style="margin:0 0 20px 0">{{ this.LoginAuthor.wname }} 的作品</div>
      <div class="tuichu" @click="gosy" @click.stop=""><i class="el-icon-loading" style="right:130px;top: 30px;"></i>
      </div>
      <p style="position:fixed;right:145px;top: 50px;cursor: pointer;" @click="gosy">退出</p>

      <el-button type="primary" icon="el-icon-edit" circle style="position:fixed;right:30px"
        @click="goaddbook">添加书籍</el-button>
      <div style="display:flex; justify-content:space-around;flex-wrap:wrap">
        <div v-for="(item, index) in allbook" :key="index" style="margin-bottom:20px;cursor: pointer;"
          @click="gobookdetail(item.bookname)">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ item.bookname }}</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="delbook(item.bookname)"
                @click.stop="">删除</el-button>
            </div>
            <div class="jieshao">{{ item.jieshao }}</div>
            <div class="biaoqian" style="margin:20px 0 0 0">
              <span>{{ item.fufenlei }}</span>
              <span>{{ item.zifenlei }}</span>
              <!-- <span>{{item.biaoqian}}</span> -->
              <span>{{ item.starttime.substring(0, 10) }}</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activeNames: ['1'],
      LoginAuthor: {},
      allbook: [],
      box: false,
    }

  },
  methods: {
    gosy() {
      // console.log('w')
      this.$router.push({
        name: 'loginRegister'
      })
    },
    //删除书籍
    delbook(e) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/author/delauthorbook",
        data: {
          bookname: e
        },
      }).then(
        res => {
          this.getboxtimer();
          this.delboxtimer();
          this.getauthorbook();
        },
        err => {
          console.log(err.msg);
        })
    },
    getboxtimer() {
      var that = this;
      setTimeout(function () {
        that.box = true;
      }, 1000)
    },
    delboxtimer() {
      var that = this;
      setTimeout(function () {
        that.box = false;
      }, 3000)
    },
    handleChange(val) {
      this.activeNames = val
    },
    getadmin() {
      // console.log('this.$store.state.admin:', this.$store.state.admin);
      this.LoginAuthor = this.$store.state.admin
      // console.log('LoginAutho:', this.LoginAuthor);
      this.getauthorbook();
    },
    getauthorbook() {
      // console.log('LoginAutho11121:', this.LoginAuthor);

      axios({
        method: "post",
        url: "http://127.0.0.1:3000/author/getauthorbook",
        data: {
          writer: this.LoginAuthor.wname
        }
      }).then(res => {
        this.allbook = res.data.data
      })
    },
    goaddbook() {
      this.$router.push(
        {
          name: 'authoraddbook'
        }
      )
    },
    gobookdetail(item) {
      window.localStorage.setItem('bookname', item)
      this.$router.push({
        name: 'authorbookdetail',
        params: { bookname: item }
      })
    }
  },
  created() {
    this.getadmin()
  },
  mounted() {
    this.getadmin()
  }
}
</script>

<style scoped="scoped">
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

body,
html {
  height: 100%;
  background: #f6f6f6
}

.prompt {
  padding: 10px 30px;
  position: fixed;
  top: 45%;
  left: 45%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 5000;
  color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prompt>div {
  background-image: url(../../static/img/勾号.png);
  background-size: 100% 100%;
  width: 40px;
  height: 40px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

.jieshao {
  max-height: 100px;
  color: #646464;
  overflow: hidden;
  word-wrap: break-word;
  font-size: 14px;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  display: -webkit-box;
}

.biaoqian>span {
  font-size: 10px;
  padding: 5px;
  border: 1px solid #646464;
  border-radius: 10px;
}

.tuichu {
  animation: rotating 2s linear infinite;
  cursor: pointer;
  position: fixed;
  right: 129px;
  top: 30px;
  width: 60px;
  height: 60px;
  background-color: #42B983;
  border: 1px solid #fff;
  border: 1px solid rgba(255, 255, 255, .5);
  border-radius: 50%;
}</style>
