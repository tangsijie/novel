<template>
  <div>
    <div @click="gozp" class="izp"><i class="el-icon-back"></i>我的作品</div>

    <div style="height:100%;background:#f6f6f6">
      <el-form ref="form" :model="form" label-width="80px" style="width:80%;
     margin:50px auto;
     -webkit-box-shadow: 0 1px 3px rgba(18,18,18,.1);
     box-shadow: 0 1px 3px rgba(18,18,18,.1);
     background:#fff;padding:20px;
     border-radius:15px">
        <el-form-item label="小说名称">
          <el-input v-model="form.name" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
        </el-form-item>
        <el-form-item label="父分类">
          <el-select v-model="form.fufenlei" placeholder="请选择分类" @change="checkiffufenlei">
            <el-option label="武侠" value="武侠"></el-option>
            <el-option label="修仙" value="修仙"></el-option>
            <el-option label="搞笑" value="搞笑"></el-option>
            <el-option label="玄幻" value="玄幻"></el-option>
            <el-option label="奇幻" value="奇幻"></el-option>
            <el-option label="仙侠" value="仙侠"></el-option>
            <el-option label="都市" value="都市"></el-option>
            <el-option label="现实" value="现实"></el-option>
            <el-option label="军事" value="军事"></el-option>
            <el-option label="历史" value="历史"></el-option>
            <el-option label="游戏" value="游戏"></el-option>
            <el-option label="体育" value="体育"></el-option>
            <el-option label="科幻" value="科幻"></el-option>
            <el-option label="悬疑" value="悬疑"></el-option>
            <el-option label="轻小说" value="轻小说"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="子分类">
          <el-select v-model="form.zifenlei" placeholder="请选择子分类" :disabled="this.iffufenlei">
            <el-option :label="item.zifenlei" :value="item.zifenlei" v-for="(item, index) in zifenleivalue"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书本简介">
          <el-input type="textarea" v-model="form.jianjie"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload :limit="1" :on-success="getsuccess" action="http://127.0.0.1:3000/uploadImg/upload"
            list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        name: '',
        fufenlei: '',
        zifenlei: '',
        jianjie: '',
      },
      iffufenlei: true,
      zifenleivalue: [
        {
          zifenlei: "玄幻"
        },
        {
          zifenlei: "武侠"
        }
      ],
      LoginAuthor: [],
      bookimg: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    }
  },
  methods: {
    getadmin() {
      this.LoginAuthor = this.$store.state.admin
    },
    handleRemove(file) {
      // console.log(file);
      file.url = '';
      this.disabled = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
    ,
    gozp() {
      this.$router.push({
        name: 'authordetail'
      })
    },

    getsuccess(res) {
      // this.geturl= 'data:image/png;base64,'+res.data
      this.bookimg = res.data.path
      // console.log(this.bookimg)
      //解析图片
    },
    // 提交信息
    onSubmit() {
      if (this.form.name === '' && this.form.fufenlei === '') {
        return alert('创建失败')
      } else {
        axios({
          method: "post",
          url: "http://127.0.0.1:3000/author/createbook",
          data: {
            bookname: this.form.name,
            writer: this.LoginAuthor.wname,
            jieshao: this.form.jianjie,
            fufenlei: this.form.fufenlei,
            zifenlei: this.form.zifenlei,
            bookimg: this.bookimg
          }
        }).then(res => {
          alert("创建成功")
          this.$router.push(
            {
              name: 'authordetail'
            }
          )
        })
      }

    },
    checkiffufenlei() {
      // console.log(this.form.fufenlei)
      if (this.form.fufenlei !== '') {
        this.iffufenlei = false
        axios({
          method: "post",
          url: "http://127.0.0.1:3000/author/getzifenlei",
          data: {
            fufenlei: this.form.fufenlei
          }
        }).then(res => {
          this.zifenleivalue = res.data.data
          // console.log('11111' + res.data.data);
        })
      }
    }
  },
  mounted() {
    this.getadmin()
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}

html,
body {
  height: 100%;
  background: #f6f6f6;
}

.izp:hover {
  color: #aa0000;
  cursor: pointer;
  font-weight: 800;
}
</style>