<template>
	<div>
		<fenleihead></fenleihead>
		<div class="headbj"></div>
		<div class="main">
			<el-tabs @tab-click="handleClick">
			  <el-tab-pane
			    v-for="(item, index) in unizifenleimesg"
			    :key="index"
			    :label="item.zifenlei"
				
			  >
			  <div class="main2">
				  <div class="main2left">
					  <div id="pai">
					  	<h3>本周推荐</h3>
					  	<ul>
					  		<li v-for="(item,index) in zifenleimesg.slice(0,17)" :key="index" >
					  			<div>{{item.bookname}}<span v-if="index==0||index==4"></span></div>
					  			<div>{{item.writer}}</div>
					  		</li>
					  	</ul>
					  </div>
				  </div>
				  <div class="main2mid">
					  <div class="booklist" >
						  <div class="books" v-for="(item,index) in zifenleimesg" :key="index" @click="godetail(item)">
							  <div class="box-shadow"></div>
							  <div class="box-img"><img :src="item.bookimg" ></div>
							  <h2>{{item.bookname}}</h2>
							  <p>{{item.jieshao}}</p>
						  </div>
					  </div>
					  <div class="newbook">
						  <h3>
							  <span>新书推荐</span>
							  <cite></cite>
						  </h3>
						  <p v-for="(item,index) in zifenleimesg" :key="index">
						  {{item.bookname}} - {{item.jieshao}}
						  </p>
					  </div>
				  </div>
				  <div class="main2right">
					  <div>
					  	<span class="tead">风凌天下新书震撼发布</span>
					  	<div class="p4">
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
					  	<div style="position: absolute;top: 50%;">
					  	<i class="iconfont icon-laba"></i><marquee style="width: 80%;"><span style="font-size: 12px;color: #262626;">【资讯】斗破苍穹新书发布，赶紧来看不容错过，巅峰对决</span></marquee>
					  </div>
					  </div>
					  
					  <img src="../assets/lun4.gif" style="margin-top: 110px;position: absolute;bottom: 0px;">
				  </div>
			  </div>
			  
			    {{item.bookname}}
			  </el-tab-pane>
			  
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import fenleihead from "../components/bookone.vue"
	import zipaihang from "../components/zipaihang.vue"
	export default{
		data(){
			return{
				unizifenleimesg:[],
				fenleimesg:[],
				zifenleimesg:[],
				zhangjie:[],
			};
		},
		methods:{
			handleClick(e) {
					axios({
					        method: "post",
					        url: "http://127.0.0.1:3000/getSql/zifenleiSql",
					        data: {
					          zifenlei:e._props.label
					        }
					      }).then(
					        res => {
							this.zifenleimesg = res.data.data;
							for(var i = 0 ;i<this.zifenleimesg.length;i++){
								this.zifenleimesg[i].bookimg = 'data:image/jpg;base64,'+ this.zifenleimesg[i].bookimg
							}
					        },
					        err => {
					          console.log(err.msg);
					        }
					      );
			      },
			getfufenleidata(){
				this.fenleimesg=this.$route.params.passfenlei;
				this.unizifenleiSql();
			},
			unizifenleiSql(){
				axios({
				        method: "post",
				        url: "http://127.0.0.1:3000/getSql/unizifenleiSql",
				        data: {
				          fufenlei:this.fenleimesg[0].fufenlei
				        }
				      }).then(
				        res => {
						this.unizifenleimesg = res.data.data;
						this.getzifenleidata();
				        },
				        err => {
				          console.log(err.msg);
				        }
				      );
			},
			getzifenleidata(){
				axios({
				        method: "post",
				        url: "http://127.0.0.1:3000/getSql/zifenleiSql",
				        data: {
				          zifenlei:this.fenleimesg[0].zifenlei
				        }
				      }).then(
				        res => {
						this.zifenleimesg = res.data.data;
						for(var i = 0 ;i<this.zifenleimesg.length;i++){
							this.zifenleimesg[i].bookimg = 'data:image/jpg;base64,'+ this.zifenleimesg[i].bookimg
						}
				        },
				        err => {
				          console.log(err.msg);
				        }
				      );
				    },
			godetail(b){
				axios({
				        method: "post",
				        url: "http://127.0.0.1:3000/getSql/zhangjieSql",
				        data: {
							bookname:b.bookname
				        }
				      }).then(
				        res => {
				//           console.log(res.data);
							this.zhangjie = res.data.data;
							this.$router.push({
								name:'detail',
								params:{
									detailmesg:b,
									zhangjiemesg:this.zhangjie,
								}
							});
				        },
				        err => {
				          console.log(err.msg);
				        }
				      );
			}
		},
		components:{
			fenleihead,
			zipaihang,
		},
		mounted(){
			this.getfufenleidata();
			
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
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.booklist{
		padding-top: 30px;
		position: relative;
	}
	.main2right{
		width: 20%;
		position: relative;
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
		top: 30%;
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
	.newbook{
		    border-top: 1px solid #e6e6e6;
		    margin: 40px auto 0;
		    padding-top: 23px;
			position: relative;
	}
	.newbook>h3{
		    background: #ed4259;
		    float: left;
		    height: 50px;
		    position: relative;
		    text-align: center;
		    width: 50px;
			margin-left: 20px;
		    z-index: 1;
	}
	.newbook>h3>span{
		color: #fff;
		    display: block;
		    font: 16px/20px FZZCYSK;
		    padding: 5px 9px;
		    width: 32px;
	}
	.newbook>h3>cite{
		    border-color: transparent currentcolor transparent #ed4259;
		    border-style: solid none solid solid;
		    border-width: 6px 0 6px 6px;
		    height: 0;
		    position: absolute;
		    right: -6px;
		    top: 18px;
		    width: 0;
		    z-index: 1;
	}
	.newbook>p{
		    float: left;
		        height: 20px;
		        margin-bottom: 10px;
				margin-left: 20px;
		        overflow: hidden;
		        width: 40%;
	}
	#pai>ul{
			margin-top: 10px;	
		}
		#pai>ul>li{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		#pai>ul>li>div:first-child{
		color: gray;
	    min-width: 96px;
	    overflow: hidden;
		font-size: 14px;
		}
	#pai>ul>li>div:first-child:hover{
			color: red;
		}
	#pai>ul>li>div:nth-child(2):hover{
			color: red;
		}
	#pai>ul>li>div:last-child:hover{
			color: red;
		}
	#pai>ul>li>div:nth-child(2){
		color: #1a1a1a;
		width: 100px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 14px;
		display: flex;
		justify-content:flex-start;
		text-align: left;
		}
	#pai>ul>li>div:last-child{
		color: #b3b3b3;
		float: right;
		font: 12px/32px PingFangSC-Regular,-apple-system,Simsun;
		overflow: hidden;
		text-align: right;
		text-overflow: ellipsis;
		white-space: normal;
		width: 64px;
		white-space: nowrap;
		}
	#pai>h3{
			color: #1a1a1a;
			    font-size: 18px;
			    font-weight: 400;
			    height: 24px;
			    line-height: 25px;
			    line-height: 1;
			    overflow: hidden;
			    padding-bottom: 4px;
				border-bottom: 1px solid #666;
		}
	#pai>ul>li>div:first-child>span{
			background: url(../assets/img/tag.png) 0 -24px no-repeat;
			    height: 9px;
			    position: relative;
				top: -5px;
			    width: 17px;
				display: inline-block;
		}
</style>
