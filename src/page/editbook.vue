<template>
  <div>
    <!-- <router-link :to="{name:'authorbookdetail',params:bookname}">返回</router-link> -->
    <div @click="getBookName">返回</div>

    <div class="text">
      <header class="header">
        <p>{{ zhangjieInfo.title }}</p>
      </header>
      <div class="main">
        <!-- <div v-html="zhangjieInfo.value"></div> -->
        <div style="width:80%;margin: 40px auto">
          <span>章节数：</span>
          <el-input
            v-model="zhangjieInfo.zhangjieshu"
            label="章节数"
            style="margin-bottom:10px;width: 200px;"
          >
          </el-input>
          <span>章节名：</span>
          <el-input
            v-model="zhangjieInfo.title"
            label="章节名"
            style="width: 200px;margin-left: -5px;"
          >
          </el-input>
        </div>
        <!-- <VueEditor :config="config" ref="vueEditor"/> -->
        
        <el-input
          ref="Htmlvalue"
          type="textarea"
          :rows="32"
          placeholder="请输入内容"
          v-model="value"
          
        >
        </el-input>
        <!-- <div id="context" ref="Htmlvaluea"></div> -->
      </div>
      <footer>
        <div @click="update" style="cursor: pointer;">确认修改</div>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookname: {},
      zhangjieInfo: {},
      value: "",
    };
  },

  methods: {
    getBookName() {
      this.$router.push({
        name: "authorbookdetail",
        params: { bookname: window.localStorage.getItem("bookname") }
      });
    },
    getsections(title, bookname, id) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/whichzhangjieSql",
        data: {
          title,
          bookname,
          id
        }
      }).then(res => {
        this.zhangjieInfo = res.data.data[0];
        this.value = this.zhangjieInfo.value.replace(/<[^<>]+>/g, "");
        this.value=this.value.replace(/&nbsp;/g,'')
        // console.log(this.value);
        // console.log("章节信息：", res);
      });
    },
    update() {
      console.log(123);
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/author/updatesection",
        data: {
          title: this.zhangjieInfo.title,
          zhangjieshu: this.zhangjieInfo.zhangjieshu,
          value: this.value,
          id: this.zhangjieInfo.id
          }
        }).then(res => {
          this.getsections()
          alert('修改成功！')
          // console.log("update:", res);
        }
        )
    }
  },
  created() {
    let {
      zhangjiemesg: { title, bookname, id }
    } = this.$route.params;
    this.getsections(title, bookname, id);
  }
  }
</script>
<style scoped>
.text {
  position: relative;
  width: 800px;
  background: linear-gradient(rgb(106, 106, 196), pink);
  margin: 0 auto;
  color: #fff;
}
header {
  text-align: center;
  line-height: 50px;
  position: fixed;
  top: 0;
  width: 800px;
  height: 50px;
  background: linear-gradient(to right, rgb(0, 255, 187), rgb(255, 192, 232));
}
.main {
  padding-top: 50px;
  padding-bottom: 50px;
  line-height: 30px;
}
footer {
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 800px;
  height: 50px;
  line-height: 50px;
  background: linear-gradient(to right, rgb(255, 192, 232), rgb(0, 255, 187));
}
</style>
