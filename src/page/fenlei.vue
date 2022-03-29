<template>
	<div>
		<fenleihead></fenleihead>
		<div class="headbj"></div>
		<div class="main">
			<el-tabs @tab-click="handleClick">
			  <el-tab-pane
			    v-for="(item, index) in fenleimesg"
			    :key="index"
			    :label="item.zifenlei"
			  >
			  <div class="main2">
				  <div class="main2left"><zipaihang></zipaihang></div>
				  <div class="main2mid">
					  <div >
						  <div class="books" v-for="(item,index) in fenleimesg" :key="index">
							  <div class="box-shadow"></div>
							  <div class="box-img"><img src="../../static/img/150.jpg" ></div>
							  <h2>{{item.bookname}}</h2>
							  <p>{{item.jieshao}}</p>
						  </div>
					  </div>
					  <div>
						  
					  </div>
				  </div>
				  <div class="main2right">
					  <div>
					  	<span class="tead">风凌天下新书震撼发布</span>
					  	<div class="p4">
					  	<p>【资讯】斗破苍穹新书发布</p>
					  	<p>【资讯】斗破苍穹新书发布</p>
					  	<p>【资讯】斗破苍穹新书发布</p>
					  	<p>【资讯】斗破苍穹新书发布</p>
					  	</div>
					  	<div class="yeyou">
					  		<div>
					  		<div>页游</div><p>斗破苍穹新书发布</p>
					  		</div>
					  		<div style="margin-top: 30px;">
					  			<div>页游</div><p>斗破苍穹新书发布</p>
					  		</div>
					  	</div>
					  	<div style="position: absolute;top: 54%;">
					  	<i class="iconfont icon-laba"></i><marquee style="width: 80%;"><span style="font-size: 12px;color: #262626;">【资讯】斗破苍穹新书发布，赶紧来看不容错过，巅峰对决</span></marquee>
					  </div>
					  </div>
					  
					  <img src="../assets/lun4.gif" style="margin-top: 110px;position: absolute;bottom: 30px;">
				  </div>
			  </div>
			  
			    {{item.bookname}}
			  </el-tab-pane>
			  
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import fenleihead from "../components/bookone.vue"
	import zipaihang from "../components/zipaihang.vue"
	export default{
		data(){
			return{
				fenleimesg:[],
			};
		},
		methods:{
			handleClick(tab, event) {
			        console.log(tab, event);
			      },
			getzifenleidata(){
				this.fenleimesg=this.$route.params.passfenlei;
				
			}
		},
		components:{
			fenleihead,
			zipaihang,
		},
		mounted(){
			this.getzifenleidata()
		}
	}
</script>

<style scoped="scoped">
	@import url("../assets/icon-font/iconfont.css");
	.headbj{
		width: 100%;
		height: 160px;
		background-image: url(../../static/img/8.jpg);
		background-size: 100%;
	}
	.main{
		width: 80%;
		margin: auto;
	}
	.main2{
		display: flex;
		justify-content: space-between;
	}
	.main2left{
		width: 20%;
	}
	.main2mid{
		width: 60%;
		border: 1px solid black;
		margin-left: 30px;
		margin-right: 30px;
	}
	.main2mid>div{
		padding-top: 30px;
		position: relative;
	}
	.main2right{
		width: 20%;
	}
	.books{
		    background: url(../../static/img/book_bottom.png) no-repeat 33px 1px;
		    float: left;
		    margin-right: -26px;
		    width: 170px;
			position: relative;
			text-align: center;
			z-index: 1;
	}
	.box-shadow{
		    background: url(../../static/img/shadow.png) no-repeat;
		    bottom: 54px;
		    height: 8px;
		    left: 50%;
		    margin-left: -78px;
		    width: 159px;
			position: absolute;
			transition: all .3s;
			    z-index: 2;
	}
	.box-img{
		    height: 165px;
		    margin: 4px auto 10px;
			width: 105px;
	}
	.box-img>img{
		    height: 140px;
		    width: 100%;
			transition:all .5s;
	}
	.box-img>img:hover{
		transform: translateX(0%) rotateY(-30deg);
		transform-origin: left ;
	}
	.books>h2{
		font: 700 16px/21px PingFangSC-Regular,HelveticaNeue-Light,Helvetica Neue Light,Microsoft YaHei,"sans-serif";
		    height: 21px;
		    margin: 0 auto 6px;
			    max-width: 112px;
			    overflow: hidden;
	}
	.books>p{
		    color: gray;
		    font: 12px/16px PingFangSC-Regular,-apple-system,Simsun;
		    height: 16px;
		    margin: 0 auto;
		    overflow: hidden;
			max-width: 112px;
	}
	.yeyou{
		position: absolute;
		top: 40%;
	}
	.yeyou>div>div{
		    width: 38px;
		    height: 18px;
		    text-align: center;
		    color: #fff;
		    background: #bf2c24;
		    float: left;
			margin-left: 10px;
	}
	.yeyou>div{
		font-size: 14px;
		color: red;
		width: 100%;
		position: absolute;
		top: 37%;
	}
	.yeyou>div>p{
		width: 170px;
		margin-left: 60px;
	}
	.p4{
		font-size: 14px;
		position: absolute;
		top: 10%;
		
	}
	.p4>p{
		margin: 10px 0px;
	}
	.tead{
		font-weight: 800;
		position: absolute;
		margin: 10px 0 0 10px;
		font-size: 16px;
	}
	.iconfont.icon-laba{
		font-size: 18px;
		background-color: red;
		position: relative;
		margin-top: 200px;
	}
</style>
