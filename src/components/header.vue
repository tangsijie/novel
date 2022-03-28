<template>
	<div >
		<div id="" class="nav1">
		<!-- <myheader></myheader> -->
		 <!-- 调用组件 --> 
			
		<div>
			<div class="logo-contain">
				<img src="../assets/logo.jpg">
				<p class="logo2">凤凰小说</p>
			</div>
				<div class="nav-mid">
					<input class="search" type="text" placeholder="斗破苍穹">
					<el-button type="primary" icon="el-icon-search">搜索</el-button>
				</div>
				<div class="mybook-contain">
					<div class="mybook" @click="$router.push('/self')">我的书</div>
					<div @click="gologin">登录</div>
					<div @click="gologin">注册</div>
				</div>
		</div>
		
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{
			}
		},
		components:{
		},
		methods:{
			gologin(){//你给事件所定义的事件名
				this.$router.push({//this就是调用这个文件里面的方法和数据,$router的意思就是调用路由，使得路由进行跳转
					path:"/loginRegister"
				})
			}
		}
	}
</script>

<style>
	.logo-contain{
		display: flex;/* 横向排列 */
		justify-content: center;/* 把子容器中间排列无间隔 */
		align-items: center;/* 上下居中 */
	}
	.logo-contain img{
		height: 70px;
		width: 77px;
		margin: 0 10px 0 0;
	}
	.logo-contain p{
		font-size:16px;
		font-weight: bold;
	}
	.search{
		    font: 14px/38px PingFangSC-Regular,'-apple-system',Simsun;
		    width: 326px;
		    height: 38px;
		    padding: 0 11px;
	}
	.nav1{
		-webkit-box-shadow: 0 1px 3px rgba(18,18,18,.1);
		 box-shadow: 0 1px 3px rgba(18,18,18,.1);
	}
	.nav1>div{
		width: 80%;
		margin: auto;
		display: flex;
		justify-content: space-around;/* 把子容器平均排列有间隔 */
		align-items: center;
		padding: 10px;
		
	}
	.nav-mid{
	}
	.mybook-contain{
		width: 200px;
		display: flex;
		justify-content: space-between;/* 把子容器平均排列无间隔 */
		align-items: center;
		
	}
	.mybook{
		padding:10px;
		border: 1px solid black;
	}
</style>
