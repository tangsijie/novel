<template>
  <div id="banner">
    <el-carousel :interval="4000" type="card" height="124px">
      <el-carousel-item v-for="(item, index) in img_list" :key="index">
        <img :src="item.src" alt="" @click="getonebook(item.bookname)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Banner",
  data() {
    return {
      // 图片地址数组
      img_list: [
        { src: "../static/img/1.jpg", bookname: "讨逆" },
        { src: "../static/img/OIP-C.jpg", bookname: "巫界术士" },
        { src: "../static/img/90.jpg", bookname: "开局顶流的我怎么会糊" },
        { src: "../static/img/10.jpg", bookname: "诸天读书人" },
        { src: "../static/img/11.jpg", bookname: "重生之大文豪" }
      ]
    };
  },
  methods: {
    gobook(e) {
			// console.log(e);
      this.$router.push({
        name: "book",
        params: {
          book: e
        }
      });
			this.$store.commit('setbook',e)
			
    },
    getonebook(name) {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/getoneSql",
        data: {
          bookname: name
        }
      }).then(res => {
        // console.log('bookname',res);
        this.gobook(res.data.data[0]);
      });
    }
  },
};
</script>

<style scoped="scoped">
.el-carousel {
  margin-top: 30px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__item--card {
  width: 93px;
  left: 40px;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 93px;
  height: inherit;
}
</style>
