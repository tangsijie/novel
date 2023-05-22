<template>
  <div>
    <div class="self-header">
      <div>
              <img :src="imgurl" alt="" />
        <!-- <img src="../assets/logo.jpg" /> -->
        <p>个人中心</p>
      </div>
      <ul>
        <li>
          <div @click="goself" style="cursor: pointer;">我的首页</div>
        </li>
        <li>
				<div @click="$router.push('/message')" style="cursor: pointer;">消息中心</div>
			</li>
        <li style="background-color: #ee4259;">
          <div>个人资料</div>
        </li>
      </ul>
      <b @click="$router.push('/')" style="cursor: pointer;">小说首页</b>
      <p>{{ LoginUser.rname }}</p>
      <span @click="signout" style="cursor: pointer;">退出</span>
    </div>
    <div class="infomidall">
      <div class="infomid">
        <el-form
          :model="LoginUser"
          :rules="rules"
          ref="LoginUserInfo"
          label-width="100px"
          class="demo-ruleForm"
        >
         <el-form-item label="id" prop="readerid" style="display:none">
            <el-input v-model="LoginUser.readerid" class="item" disabled></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="rname">
            <el-input v-model="LoginUser.rname" class="item"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="LoginUser.phone" class="item"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="LoginUser.email" class="item"></el-input>
          </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="生日" prop="shengri">
            <el-col :span="11">
              <el-input v-model="LoginUser.shengri" class="item"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="LoginUser.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介" prop="jianjie">
            <el-input
              type="textarea"
              v-model="LoginUser.jianjie"
              class="jianjie"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateSqlshow"
              >修改资料</el-button
            >
            <el-button @click="resetForm('LoginUser')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="infomid2">
        <el-form
          :model="LoginUser"
          status-icon
          :rules="rules"
          ref="LoginUser"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="rpwd">
            <el-input
              type="password"
              v-model="LoginUser.rpwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="mima.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="gaimimashow">提交</el-button>
            <el-button @click="rest('LoginUser')">重置</el-button>
          </el-form-item>
          <el-form-item label="头像">
            <div
              class="imgshow"
              style="height:150px;width:150px;margin-right:10px;"
            >
              <img :src="imgurl" alt="" />
            </div>
            <el-upload
              :limit="1"
              :on-success="getsuccess"
              action="http://127.0.0.1:3000/uploadImg/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <span>{{dialogImageUrl}}</span>
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.mima.checkPass !== "") {
          this.$refs.mima.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.mima.checkPass !== this.LoginUser.rpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      avatarImg: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      LoginUser: {
        rname: ""
      },
      imgurl: "",
      mima: {
        checkPass: ""
      },
      rules: {
        rpwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],

        rname: [
          { required: true, message: "请输入你的昵称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],

        shengri: [{ required: true, message: "请选择日期", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        jianjie: [
          { required: true, message: "请输入简介介绍一下自己", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "请输入11位合法的手机号码",
            pattern: /^1[35789]\d{9}$/,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入正确的邮箱格式",
            pattern: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //上传图片
    getsuccess(res) {
      // console.log(res, 0);
      // this.geturl= 'data:image/png;base64,'+res.data
      if(res){
        this.avatarImg = res.data.path;
      }
      // console.log("img----", this.avatarImg);
      //解析图片
    },
    gaimimashow() {
      if (this.LoginUser.rpwd == this.mima.checkPass) {
        axios({
          method: "post",
          url: "http://127.0.0.1:3000/getSql/updatemimaSql",
          data: {
            readerid: this.LoginUser.readerid,
            rpwd: this.LoginUser.rpwd
          }
        }).then(
          res => {
            if (res.data.msg == "更新成功") {
              alert("密码修改成功");
            } else if (res.data.msg == "更新失败") {
              alert("密码修改失败");
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    getImg(){
      return "@/mysql/public/image/1673511255660_2.png"
    },
    //更新按钮
    updateSqlshow() {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/getSql/updateSql",
        data: {
          readerid: this.LoginUser.readerid,
          rpwd: this.LoginUser.rpwd,
          rname: this.LoginUser.rname,
          email: this.LoginUser.email,
          phone: this.LoginUser.phone,
          shengri: this.LoginUser.shengri,
          sex: this.LoginUser.sex,
          jianjie: this.LoginUser.jianjie,
          img: this.avatarImg
        }
      }).then(
        res => {
          // console.log("resssss:",res)
          if (res.data.msg == "更新成功") {
            alert("信息修改成功");
            this.$router.push({
              name: "loginRegister"
            });
          } else if (res.data.msg == "更新失败") {
            // alert("信息修改失败");
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    goself() {
      // name:'self';
      this.$router.push({
        name: "self"
      });
      // params:{date:1}
    },
    getuser() {
      // console.log('STORE:',this.$store.state.user);
      // this.LoginUser = this.$store.state.user;
      this.LoginUser = JSON.parse(window.localStorage.getItem("userInfo"))
      this.imgurl =this.$store.state.user.img;
      // console.log('imgurl::::',this.imgurl);
    },
    signout() {
      this.$store.commit("setData", ""); //更新userInfo
      alert("退出成功");
      this.getuser();
      this.$router.push({
        path: "/"
      });
    },
    resetForm(LoginUser) {
      this.$refs.LoginUserInfo.resetFields();
    },
    rest(mima) {
      this.$refs[mima].resetFields();
      this.mima.checkPass = "";
    },
    handleRemove(file) {
      // console.log(file);
      file.url = "";
      this.disabled = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created(){
    this.getuser();
  }
};
</script>

<style scoped="scoped">
html {
  font-family: Helvetica, "PingFang SC", "Source Han Sans CN",
    "WenQuanYi Micro Hei", "Microsoft YaHei", sans-serif;
  overflow-y: scroll;
  background: #f7f6f2;
}
/* .readerid{
  visibility: hidden;
} */
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
.self-header > ul > li {
  float: left;
  line-height: 20px;
  display: block;
  padding: 22px 22px;
  transition: background 0.2s, border 0.2s;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
}
.self-header > div {
  position: absolute;
  left: 15%;
}
.self-header > div > img {
  width: 60px;
  height: 50px;
  float: left;
}
.self-header > div > p {
  color: #fff;
  font-size: 28px;
  float: left;
  margin-top: 5px;
  margin-left: 5px;
}
.self-header > b {
  position: absolute;
  right: 28%;
}
.self-header > p {
  position: absolute;
  right: 19%;
}
.self-header > ul > li:hover {
  background-color: #000000;
}
.self-header > span {
  position: absolute;
  right: 10%;
}
.infomid {
  width: 50%;
  margin: 50px 0px 0 250px;
}
.infomid2 {
  width: 30%;
  margin: 0px 350px 0 0px;
}
.item >>> .el-input__inner {
  width: 300px;
}
.el-textarea {
  width: 60%;
}
.infomidall {
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgshow > img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.el-icon-plus {
  margin-top: -10px;
}
</style>
