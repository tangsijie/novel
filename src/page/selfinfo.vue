<template>
	<div>
	<div class="self-header">
		<div>
			<img src="../assets/logo.jpg">
			<p>个人中心</p>
		</div>
		<ul>
			<li>
				<div @click="goself">我的首页</div>
			</li>
			<li>
				<div>消息中心</div>
			</li>
			<li  style="background-color: #ee4259;">
				<div>个人资料</div>
			</li>
		</ul>
		<b @click="$router.push('/')">小说首页</b>
		<p>昵称</p>
		<span>退出</span>
	</div>
	<div class="infomidall">
	<div class="infomid">
		<el-form :model="LoginUser" :rules="rules" ref="LoginUser" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="昵称" prop="rname">
		    <el-input v-model="LoginUser.rname" class="item"></el-input>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="phone">
		    <el-input v-model="LoginUser.phone"  class="item"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱" prop="email">
		    <el-input v-model="LoginUser.email" class="item"></el-input>
		  </el-form-item>
		  </el-form-item>
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
		    <el-input type="textarea" v-model="LoginUser.jianjie"  class="jianjie"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="updateSqlshow">修改资料</el-button>
		    <el-button @click="resetForm('LoginUser')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
	    <el-upload
		class="upimg"
	  action="http://127.0.0.1:3000/uploadImg/upload"
	  list-type="picture-card"
	  :auto-upload="true"
	   :limit="1"
	  :on-success="getsuccess"
	  >
	    <i slot="default" class="el-icon-plus"></i>
	    <div slot="file" slot-scope="{file}">
	      <img
	        class="el-upload-list__item-thumbnail"
	        :src="file.url" alt="" 
	      >
	      <span class="el-upload-list__item-actions">
	        <span
	          class="el-upload-list__item-preview"
	          @click="handlePictureCardPreview(file)"
	        >
	          <i class="el-icon-zoom-in"></i>
	        </span>
	        <span
	          v-if="!disabled"
	          class="el-upload-list__item-delete"
	          @click="handleDownload(file)"
	        >
	          <i class="el-icon-download"></i>
	        </span>
	        <span
	          v-if="!disabled"
	          class="el-upload-list__item-delete"
	          @click="handleRemove(file)"
	        >
	          <i class="el-icon-delete"></i>
	        </span>
	      </span>
	    </div>
	</el-upload>
	<p class="touxiang">头像</p>
	<div class="imgshow"><img :src="LoginUser.img" alt=""></div>
	<div class="infomid2"> 
		<el-form :model="LoginUser" status-icon :rules="rules" ref="LoginUser" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="新密码" prop="rpwd">
		    <el-input type="password" v-model="LoginUser.rpwd" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="mima.checkPass" autocomplete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="gaimimashow">提交</el-button>
		    <el-button @click="rest('LoginUser')">重置</el-button>
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
			        if (value === '') {
			          callback(new Error('请输入密码'));
			        } else {
			          if (this.mima.checkPass !== '') {
			            this.$refs.mima.validateField('checkPass');
			          }
			          callback();
			        }
			      };
			      var validatePass2 = (rule, value, callback) => {
			        if (value === '') {
			          callback(new Error('请再次输入密码'));
			        } else if (value !== this.LoginUser.rpwd) {
			          callback(new Error('两次输入密码不一致!'));
			        } else {
			          callback();
			        }
					};
					
	      return {
			  LoginUser:'',
			  mima:{
				 checkPass:''
			  },
	        rules: {
				  rpwd:[
				            { validator: validatePass, trigger: 'blur' }
				          ],
				          checkPass: [
				            { validator: validatePass2, trigger: 'blur' }
				          ],
				          
	          rname: [
	            { required: true, message: '请输入你的昵称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          
	          shengri:[
	            {  required: true, message: '请选择日期', trigger: 'blur' }
	          ],
	          sex: [
	            { required: true, message: '请选择性别', trigger: 'blur' }
	          ],
	          jianjie: [
	            { required: true, message: '请输入简介介绍一下自己', trigger: 'blur' }
	          ],
			  phone:[
				  {required: true, message: '请输入11位合法的手机号码', pattern:/^1[35789]\d{9}$/,trigger: 'blur'}
			  ],
			  email:[
				  {required: true, message: '请输入正确的邮箱格式',pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, trigger: 'blur'}
			  ]
	        }
	      };
	    },
	    methods: {
			//上传图片
			getsuccess(res){
			  // this.geturl= 'data:image/png;base64,'+res.data
			  this.bookimg=res.data.path
							console.log('img',this.bookimg)
			  //解析图片
			},
			gaimimashow(){
				if(this.LoginUser.rpwd==this.mima.checkPass){
			        axios({
			          method: "post",
			            url: "http://127.0.0.1:3000/getSql/updatemimaSql",
			          data: {
						readerid:this.LoginUser.readerid,
			            rpwd:this.LoginUser.rpwd,
			          },
			        }).then(
			          res => {
				
						if (res.data.msg == "更新成功") {
						              alert("信息修改成功"); 
						            }
						else if(res.data.msg == "更新失败"){
							// alert("信息修改失败");
						}
			          },
			          err => {
			            console.log(err);
			            
			          }
			        );
			    }
			},
			//更新按钮
			    updateSqlshow(){
			        axios({
			          method: "post",
			            url: "http://127.0.0.1:3000/getSql/updateSql",
			          data: {
			            readerid:this.LoginUser.readerid,
						rpwd:this.LoginUser.rpwd,
			            rname:this.LoginUser.rname,
						email:this.LoginUser.email,
						phone:this.LoginUser.phone,
						shengri:this.LoginUser.shengri,
						sex:this.LoginUser.sex,
						jianjie:this.LoginUser.jianjie,
			          },
			        }).then(
			          res => {
						if (res.data.msg == "更新成功") {
						              alert("信息修改成功");
						              this.$router.go(0);
						            }
						else if(res.data.msg == "更新失败"){
							// alert("信息修改失败");
						}
						this.gaimimashow()
			          },
			          err => {
			            console.log(err);
			            
			          }
			        );
			    },
			goself(){
				// name:'self';
				this.$router.push('/self')
				// params:{date:1}
			},
			getuser(){
					this.LoginUser=this.$store.store.state.user	
							  this.LoginUser.img = 'data:image/jpg;base64,'+this.LoginUser.img ;
			},
			resetForm(LoginUser) {
			        this.$refs[LoginUser].resetFields();
			      },
	      rest(mima) {
	        this.$refs[mima].resetFields();
			this.mima.checkPass='';
	      },
		   
	    },
		mounted(){
			this.updateSqlshow();
			this.getuser();
			
		},
	  }
</script>



<style scoped="scoped">
	html{
		font-family: Helvetica,'PingFang SC','Source Han Sans CN','WenQuanYi Micro Hei','Microsoft YaHei',sans-serif;
		overflow-y: scroll;
		background: #f7f6f2;
		
	}
	.self-header{
		width: 100%;
		height: 70px;
		background-color: #3e3d43;
		display: flex;
		color: white;
		position: relative;
		justify-content: center;
		align-items: center;
	}
	.self-header>ul>li{
			float: left;
		    line-height: 20px;
		    display: block;
		    padding: 22px 22px;
		    transition: background .2s,border .2s;
		    border-top: 3px solid transparent;
		    border-bottom: 3px solid transparent;
	}
	.self-header>div{
		position: absolute;
		left: 15%;
	}
	.self-header>div>img{
		width: 60px;
		height: 50px;
		float: left;
	}
	.self-header>div>p{
			color: #fff;
			font-size: 28px;
			float: left;
			margin-top: 5px;
			margin-left: 5px;
	}
	.self-header>b{
		position: absolute;
		right: 28%;
	}
	.self-header>p{
		position: absolute;
		right: 19%;
	}
	.self-header>ul>li:hover{
		background-color: #000000;
	}
	.self-header>span{
		position: absolute;
		right: 10%;
	}
	.infomid{
		width: 50%;
		margin: 50px 0px 0 250px;
	}
	.infomid2{
		width: 30%;
		margin: 0px 350px 0 0px;
	}
	.item>>>.el-input__inner{
		width: 300px;
	}
	.el-textarea{
		width: 60%;
		
	}
	.infomidall{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.imgshow{
		width: 100px;
		height: 100px;
		position: absolute;
		background-color: #000000;
		right: 322px;
		top: 95px;
	}
	.imgshow>img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 100%;
		
	}
	.upimg>>>.el-upload--picture-card{
		width: 100px;
		height: 100px;
		position: absolute;
		right: 445px;
		top: 95px;
	}
	.el-icon-plus{
		margin-top: -10px;
	}
	.touxiang{
		position: absolute;
		right: 560px;
		top:136px;
		font-size: 14px;
		    color: #606266;
	}
</style>
