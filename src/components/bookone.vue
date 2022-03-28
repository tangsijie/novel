<template>
	<div class="top">
		<div class="topm">
			<div class="topl">
				<ul>
					<li @click="home">凤凰小说</li>
					<li>玄幻</li>
					<li>都市</li>
					<li>仙侠</li>
					<li>科幻</li>
					<li>诸天无限</li>
					<li>游戏</li>
					<li>历史</li>
					<li>排行</li>
					<xialakuang class="xia"></xialakuang>
				</ul>
				
			</div>
			
			<div class="topr">
				<el-input
				style="width: 180px;"
				  placeholder="请输入内容"
				  v-model="input"
				  clearable>
				</el-input>
				  <el-button icon="el-icon-search" circle style="position: relative; margin-left: -30px;"></el-button>
				  <el-dropdown>
				       <span class="el-dropdown-link" style="color: white;">
				         个人中心<i class="el-icon-arrow-down el-icon--right"></i>
				       </span>
				       <el-dropdown-menu slot="dropdown">
				         <el-dropdown-item icon="el-icon-plus">我的书架</el-dropdown-item>
				         <el-dropdown-item icon="el-icon-circle-plus">我的信息</el-dropdown-item>
				         <el-dropdown-item icon="el-icon-circle-plus-outline">我的消息</el-dropdown-item>
				       </el-dropdown-menu>
				     </el-dropdown>
				  	<div style="color: white;"><i class="el-icon-reading"></i>我的书架</div>
			</div>
		</div>
	</div>
</template>

<script>
	import xialakuang from '../components/xialakuang.vue'
	export default({
				
			  data(){
			        return {
			         input: ''
			        };
			      },
			      methods: {
			        home(){
						this.$router.push({
							name:"home"
						});
					}
			        },
			 components:{
				xialakuang,
			 }
	})
</script>

<style>
	.top{
		width: 100%;
		height: 42px;
		background-color: #3e3d43;
		
	}
	.topm{
		width: 80%;
		height: 100%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.topl{
		height: 100%;
		width: 60%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.topl>ul{
		display: flex;
		align-items: center;
	}
	.topl>ul>li{
		margin-left: 20px;
		color:#ccc ;
		font-size: 14px;
	}
	.topl>ul>li:first-child{
		font-size: 20px;
		position: relative;
		left: -80px;
		font-weight: 800;
	}
	.topr{
		height: 100%;
		width: 40%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.xia{
		position:absolute;
		right: 90px;
		color:#ccc ;
	}
</style>
