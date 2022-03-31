<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<div class="bform">
						<input type="email" placeholder="账号" v-model="isaccount">
						<span class="errTips" v-if="emailError">* 账号填写错误 *</span>
						<input type="password" placeholder="密码" v-model="ispassword">
						<span class="errTips" v-if="emailError">* 密码填写错误 *</span>
					</div>
					<div class="radioss">
							<label></label>
							<input @click="st1" id="radio3" type="radio" name="radio3" value="读者" />读者
							<input @click="st2" id="radio3" type="radio" name="radio3" value="作者"/>作者
							<input @click="st3" id="radio3" type="radio" name="radio3" value="管理员"/>管理员
					</div>
					<button class="bbutton" @click="login">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<div class="bform">
						<input type="text" placeholder="用户名" v-model="lisaccount">
						<span class="errTips" v-if="existed">* 用户名已经存在！ *</span>
						<input type="password" placeholder="密码" v-model="lispassword">
						<input type="password" placeholder="确认密码" v-model="lispassword2">
					</div>
					<div class="radioss">
							<label></label>
							<input @click="lclick1" id="radio3" type="radio" name="radio3" value="读者" />读者
							<input @click="lclick2" id="radio3" type="radio" name="radio3" value="作者"/>作者
							
					</div>
					<button class="bbutton" @click="register">注册</button>
					
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle" @click="home1">回去首页!</div>
					<p class="scontent">开始注册，和我们一起旅行</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle" @click="home1">回去首页!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	
	export default {
		name:'login-register',
	  data() {
	    return {
		isLogin:false,
		emailError: false,
		passwordError: false,
		existed: false,
		form:{
			username:'',
			useremail:'',
			userpwd:'',
	    },
	isaccount: "",
	      ispassword: "",
	      count: 0,
	      alink: "",
		lcount: 0,
	      lisaccount: "",
	      lispassword: "",
	      lispassword2: "",
	  }
	},
	 methods:{
		home1(){
		 this.$router.push('/');
		}
			,
		changeType() {
			this.isLogin = !this.isLogin
			this.form.username = ''
			this.form.useremail = ''
			this.form.userpwd = ''
		},
		 lclick1() {
		      this.lcount = 1;
		    },
		    lclick2() {
		      this.lcount = 2;
		    },
		    register() {
		      if (this.lispassword == this.lispassword2 && this.lisaccount!= "" && this.lispassword != "" ) {
		        axios({
		          method: "post",
		           url: "http://127.0.0.1:3000/account/register",
		          data: {
		            no: this.lisaccount,
		            pwd: this.lispassword,
		            status: this.lcount
		          }
		        }).then(
		          res => {
		//             console.log(res.data.msg);
		            if (res.data.msg == "注册成功") {
		              alert(this.lisaccount + "账号注册成功，返回登录！");
					  // this.login();
		              this.$router.go(0);
		            }
					else if (res.data.msg == "用户已存在"){
						 alert(this.lisaccount + "用户已存在，请重新注册");
					}
					else if(res.data.msg == "服务器异常"){
						alter("服务器异常");
					}
		          },
		          err => {
		            console.log(err);
		          }
		        )
		      }
		 else if(this.lisaccount== "" ||this.lispassword == ""){
			 alert("用户或密码不能为空");
		 }
		else {
		        alert("密码与确认密码不相同，请重新填写密码或确认密码");
		      }
		    },
		  
	    //radio判断
	    st1() {
	      //学生
	      this.count = 1;
	    },
	    st2() {
	      //企业
	      this.count = 2;
	    },
	    st3() {
	      //学校
	      this.count = 3;
	    },
	    //注册
	    login() {
	      this.$router.push("/loginRegister");
	    },
	    //登录按键
	    login() {
	      
	        axios({
	          method: "post",
	            url: "http://127.0.0.1:3000/account/login",
	          data: {
	            no: this.isaccount,
	            pwd: this.ispassword,
	            status: this.count
	          },
	        }).then(
	
	          res => {
	            if (res.data.msg == "登录成功" &&this.count==1) {
					alert("登录成功");
					 this.$store.store.commit("setData",res.data.data);
	              this.$router.push("/");
	            } 
				else{
					if(res.data.msg == "登录成功" &&this.count==2){
							alert("登录成功");
							this.$store.store.commit("setadmindata",res.data.data);
							this.$router.push("/");
					}
					else{
						if(res.data.msg == "登录成功" &&this.count==3){
								alert("登录成功");
								this.$router.push("/admin");
						}
						else {
						              alert("账号或者密码错误，请重新登录");
						            }
					}
				}
	          },
	          err => {
	            console.log(err);
	            alert("用户名或密码错误，请重新登陆！");
	          }
	        );
	    }
	  }
	}
</script>

<style scoped="scoped">
	.radioss{
		position: relative;
		top: -30px;
	}
	.login-register{
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57,167,176);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
