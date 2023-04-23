<template>
  <div style="height:100%">
    <el-container style="height:100%">
      <el-aside width="250px" height="100%" style="background:#55aa7f">
        <div style="cursor: pointer;background:rgb(95, 95, 95)">读者管理</div>
        <div @click="goauthorAdmin" style="cursor: pointer;">作者管理</div>
        <div @click="gosuperadmin" style="cursor: pointer;">小说审核</div>
        <div @click="tuichu" style="cursor: pointer;">退出系统</div>
      </el-aside>
      <el-main>
        <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
          添加用户
        </el-button>
        <el-drawer title="新增用户" :visible.sync="drawer" :direction="direction">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="rname">
              <el-input placeholder="请输入用户名" v-model="form.rname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="rpwd">
              <el-input placeholder="请输入密码" v-model="form.rpwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="简介">
              <el-input type="textarea" v-model="form.jianjie"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click=submitForm>确认</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
        <el-table :data="reader" border style="width: 100%">
          <el-table-column fixed prop="readerid" label="id" width="60">
          </el-table-column>
          <el-table-column prop="rname" label="用户名" width="120">
          </el-table-column>

          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机" width="150">
          </el-table-column>
          <el-table-column prop="shengri" label="生日" width="120">
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="120">
          </el-table-column>
          <el-table-column prop="jianjie" label="简介" width="220">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
    };
    // reader:''
    return {
      reader: ([]),
      drawer: false,
      direction: 'rtl',
      form: {
        rname: '',
        email: '',
        phone: '',
        rpwd: '',
        sex: '',
        jianjie: ''
      },
      rules: {
        rname: [
          { required: true, message: "请输入你的昵称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        rpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        jianjie: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
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
    }

  },
  methods: {
    tuichu() {
      this.$router.push({
        name: 'loginRegister'
      })
    },

    //获取所有读者
    getreader() {
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/admin/getreader",
      }).then(res => {
        this.reader = res.data.data;
      })
    },
    gosuperadmin() {
      this.$router.push({
        path: '/superadmin'
      })
    },
    //删除对应读者
    handleClick(e) {
      console.log(1)
      axios({
        method: "post",
        url: "http://127.0.0.1:3000/admin/deletereader",
        data: {
          readerid: e.readerid
        }
      })
        .then(res => {
          alert("删除成功")
          this.getreader()
        })
    },
    goauthorAdmin() {
      this.$router.push({
        path: '/authorAdmin'
      })
    },
    // 表单验证
    submitForm() {
      this.$refs.form.validate()
      axios({
        method:'post',
        url:'http://127.0.0.1:3000/admin/adduser',
        data:{
          rname:this.form.rname,
          rpwd: this.form.rpwd,
          email: this.form.email,
          phone: this.form.phone,
          sex: this.form.sex,
          jianjie: this.form.jianjie,
        }
      }).then(
        res=>{
          // console.log('尺寸');
          this.drawer=false
          this.getreader()
          
        }
      )
    },
    // 提交表单
    // onSubmit() {
    //   console.log('submit!');
    // },
    // 重置
    resetForm(form) {
      this.$refs[form].resetFields();
    },
  
  },
  mounted() {
    this.getreader()
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  list-style: none;
}

html,
body {
  height: 100%;
  width: 100%;
}

.el-aside>div {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.el-aside>div:hover {
  color: brown;
}
</style>