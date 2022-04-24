<template>
	<div :class="dark == true ? 'body' :'body2'">
		<myheader></myheader>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item class="myColor" :to="{ path:'/' }" >首页</el-breadcrumb-item>
		  <el-breadcrumb-item class="myColor">{{book.fufenlei}}</el-breadcrumb-item>
		  <el-breadcrumb-item class="myColor">{{book.zifenlei}}</el-breadcrumb-item>
		  <el-breadcrumb-item class="myColor">{{book.bookname}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div :class="mululist1Fixed == true ? 'mululist1' :''">
		<div :class="mululist2Fixed == true ? 'mululist2' :''">
			<div @click="showmuluclick"><i class="iconfont icon-mulu"></i><p>目录</p></div>
			<div @click="yewan"><i class="iconfont icon-yewanmoshi"></i><p>护眼</p></div>
			<div><i class="iconfont icon-shouji"></i><p>手机</p></div>
			<div @click="goshujia"><i class="el-icon-reading"></i><p>书架</p></div>
			<div @click="goshuye"><i class="iconfont icon-fanhuishuye"></i><p>书页</p></div>
		</div>
		</div>
		<div :class="mulu1Fixed == true ? 'mulu1' :''">
		<div :class="mulu2Fixed == true ? 'mulu2' :''" v-show="showmulu">
			<p>{{book.bookname}}</p>
			<br>
			<ul>
				<li v-for="(item,index) in zhangjie" :key="index" @click="pageclick(index)">
				<p>{{item.zhangjieshu}}</p>
				<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
		</div>
			<div class="contianer-top" v-if="fengmian">
				<div class="imgbox">
					<img :src="book.bookimg" >
				</div>
				<h1>{{book.bookname}}</h1>
				<h2>{{book.writer}} 著</h2>
				<div class="xinxi">
					<div>
						<p>{{book.fufenlei}}</p>
						<span>类型</span>
					</div>
					<div>
						<p>{{book.starttime| dateFmt('YYYY-MM-DD')}}</p>
						<span>上架</span>
					</div>
					<div>
						<p>12.98万</p>
						<span>连载（字）</span>
					</div>
				</div>
				<h3>
					与<span>{{book.fangwenliang}}</span>位书友共同开启《诸天读书人》的武侠之旅
				</h3>
				<h5>本站由凤凰小说自行创作研究学习</h5>
				<h6>©版权所有 侵权必究</h6>
			</div>
			<div class="contianer-last">
				<div class="contianer-last1" >
					<span>{{zhangjie[this.num-1].zhangjieshu}}   {{zhangjie[this.num-1].title}}</span>
					<pre>
					<p v-html="zhangjie[this.num-1].value"></p>
					</pre>
				</div>
				
			</div>
		<div class="bottom">
			<div @click="pre">上一章</div>
			<div @click="showmuluclick">目录</div>
			<div @click="nextone">下一章</div>
		</div>
			<div class="block">
			  <el-pagination
			    @size-change="handleSizeChange"
			    @current-change="handleCurrentChange"
			    :current-page.sync="currentPage3"
			    :page-size="1"
			    layout="prev, pager, next, jumper"
			    :total="this.zhangjie.length">
			  </el-pagination>
		  </div>
				<el-backtop></el-backtop>
		<div class="comment">
			<input type="text" v-if="comshow" class="site" placeholder="快点来一起评论吧" @click="com"/>
			<div class="com-box" v-if="comshow2">
			<textarea class="site2" maxlength="150" @input="descInput" v-model="desc" placeholder="快点来一起评论吧" >
			</textarea>
			<span class="xianzhi">{{remnant}}/150</span>
			<div class="fabiao" @click="fabiao">发表</div>
			</div>
			<div class="comment-box" >
				<div v-for="(item,index) in comshowmeag" :key="index"  class="comall">
					<!-- @mousemove="onmeshow(index)" @mouseleave="offmeshow(index)" -->
					<div class="img-box"><img :src="item.img" ></div>
					<p class="com-name">{{item.username}}</p><p class="com-time">发表于{{item.time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</p>
					<div class="com-value">{{item.value}}</div>
					<div class="com-button" v-if="LoginUser !=''&&LoginUser.rname!=item.username">回复</div>
					<div class="com-button" v-if="LoginUser !=''&&LoginUser.rname==item.username" @click="delmesg(item.id)" @click.stop="">删除</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import myheader from '../components/bookone.vue'
	import axios from "axios";
	export default{
			  data() {
			        return {
						// current:0,
						isreshow:false,
						isdelshow:false,
						comshowmeag:[],
						comshow:true,
						comshow2:false,
						desc:'',
						remnant: 0,
						LoginUser:'',
						dark:'',
						fengmian:true,
						showmulu:false,
						mululist2Fixed:false,
						mulu2Fixed:false,
						mululist1Fixed:true,
						mulu1Fixed:true,
						num:1,
						book:[],
						zhangjie:[],
						// length:this.zhangjie.length,
						currentPage3: 1,
			        };
			      },
			      methods: {
					 
					  // onmeshow:function(index){
						 //  for(var i = 0 ;i<this.comshowmeag.length;i++){
						 //  	if(this.LoginUser.rname==this.comshowmeag[i].username){
						 //  								  this.isdelshow=true;
						 //  								  this.current=index;
						 //  	}
						 //  	else
						 //  	{
						 //  								  this.isreshow=true;
						 //  								  // this.isdelshow=true;
						 //  								  this.current=index;
						 //  	}
						 //  }
						  
					  // },
					  // offmeshow:function(index){
						 //  this.isdelshow=false;
						 //  this.isreshow=false;
						 //  this.current=null;
					  // },
					  //发表评论
					  fabiao(){
						  axios({
						            method: "post",
						              url: "http://127.0.0.1:3000/getSql/addcommentSql",
						            data: {
						  			username:this.LoginUser.rname,
						  			value:this.desc,
						  			bookname:this.book.bookname,
						            },
						          }).then(
						            res => {
						  			if (res.data.msg == "加入评论成功") {
						  			              alert("发表成功");
						  			              this.commentshow();
												this.comshow=true;
												this.comshow2=false; 
												this.desc='';
						  			            }
						  			else if(res.data.msg == "加入评论失败"){
						  				// alert("信息修改失败");
						  			}
						            },
						            err => {
						              console.log(err);
						              
						            }
						          );
					  },
					  //展示评论
					  commentshow(){
					          axios({
					            method: "post",
					              url: "http://127.0.0.1:3000/getSql/commentshowSql",
					            data: {
					  			bookname:this.book.bookname,
					            },
					          }).then(
					            res => {
								this.comshowmeag=res.data.data;
								this.comshowmeag.sort((a,b)=>{
									return new Date(b.time) - new Date(a.time)
								})
								for(var i = 0 ;i<this.comshowmeag.length;i++){
									this.comshowmeag[i].img = 'data:image/jpg;base64,'+ this.comshowmeag[i].img
								}
								// this.panduan();
					            },
					            err => {
					              console.log(err);
					              
					            }
					          );
					      
					  },
					  //删除评论
					  delmesg(e){
					   axios({
					           method: "post",
					           url: "http://127.0.0.1:3000/getSql/delmycommentSql",
					           data: {
					             id: [e]
					           },
					         }).then(
					  res => {
						  alert("删除成功");
						   this.commentshow();
					          },
					          err => {
					            console.log(err.msg);
					          })
					  },
					  //切换评论
					  com(){
						  if(this.LoginUser === ''){
						  		alert("请先登录")
						  		 this.$router.push({
						  			path:'/loginRegister'
						  						})
						  }
						  else{
							this.comshow=false;
							this.comshow2=true;  
						  }
					  },
					  //剩余字数
					   descInput(){
					   var txtVal = this.desc.length;
					   this.remnant =  txtVal;
					   },
					  //夜晚模式
					 yewan(){
						 if(this.dark==false){
							 this.dark=true
						 }
						 else{
							 this.dark=false
						 }
					 },
					 goshujia(){
						 if(this.LoginUser === ''){
						 		alert("请先登录")
						 		 this.$router.push({
						 			path:'/loginRegister'
						 						})
						 }
						 else {
						 		this.$router.push({
						 		path:'/self'
						 			})
						 }
					 },
					 goshuye(){
						 
					 },
					  //目录是否显示
					  showmuluclick(){
					if(this.showmulu===false){
						this.showmulu=true;
					}
					else if(this.showmulu===true){
						this.showmulu=false;
					}
					  },
					  //绝对定位回到顶端切换固定定位
					  handleScroll(){
					          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;//网页被卷起来的高度
					    //       var offsetTop = document.querySelector('#mululist1').offsetTop;//距离顶部的高度
							  // var offsetTop2 = document.querySelector('#mulu1').offsetTop;//距离顶部的高度
					    //       console.log('w',scrollTop)
					    //       console.log('1',offsetTop2)
					          if (scrollTop>115) {
					            this.mululist2Fixed =true
								this.mulu2Fixed = true
								this.mululist1Fixed = false
								this.mulu1Fixed = false
					          } else {
					            this.mululist1Fixed = true
					            this.mulu1Fixed = true
								this.mululist2Fixed = false
								this.mulu2Fixed = false
					          }
					          // console.log(this.searchBarFixed)
					        },
					  //获取传递数据
					  getdata(){
						  this.book=this.$route.params.detailmesg;
						  this.zhangjie=this.$route.params.zhangjiemesg;
						  this.LoginUser=this.$store.store.state.user;
						  this.commentshow();
					  },
					     handleSizeChange(val) {
					          // console.log(`每页 ${val} 条`);
					        },
							//点击页码跳转
					        handleCurrentChange(val) {
					          // console.log(`当前页: ${val}`);
							  this.num = val ;
							  if(val==1){
								  this.fengmian=true;
							  }else{
								  this.fengmian=false;
							  }
							  document.documentElement.scrollTop = 0;
							   this.getdata();
					        },
							//下一章
						nextone(){
							this.fengmian=false;
							this.num++;
							this.currentPage3=this.num;
							document.documentElement.scrollTop = 0;
						},
						//上一章
						pre(){
							if(this.num===2){
								this.fengmian=true;
								this.num--;
								this.currentPage3=this.num;
								document.documentElement.scrollTop = 0;
							}
							else{
								this.fengmian=false;
								this.num--;
								this.currentPage3=this.num;
								document.documentElement.scrollTop = 0;
							}
						},
						//点击目录跳转对应章节内容
						pageclick(index){
							this.num=index+1;
							this.currentPage3=this.num;
							this.showmulu=false;
							this.fengmian=false;
							document.documentElement.scrollTop = 0;
						},
			        },
					mounted(){
						
						this.getdata();
						window.addEventListener('scroll', this.handleScroll);
						window.ontouchmove = this.handleScroll;
					},
					destroyed () {
					    window.removeEventListener('scroll', this.handleScroll)
					  },
			 components:{
				 myheader,
			 }
	}
</script>

<style scoped="scoped" >
	@import url("../assets/icon-font/fontlist/iconfont.css");
	@import url("../assets/icon-font/yewan/iconfont.css");
	.body2{
		/* background: #e0ce9e; */
		/* background-color: #f3e9c6; */
		background-color: #e0ce9e;
	}
	.body{
		filter: invert(1) hue-rotate(180deg);
		 /* background: var(--fill-1); */
		 /* background-color: #1F1C19; */
		 background-color: white;
	}
	
	.mulu1>div{
		position: absolute;
		z-index: 10;
		width: 48.7%;
		margin-left: 379.5px;
		top: 115px;
		padding: 10px 10px;
		background: white;
		border: 1px solid #d8d8d8;
		box-shadow: 0px 0 5px 2px #d8d8d8;
		height: 400px;
		overflow: auto;
	}
	.mulu1>div>p{
		color: red;
	}
	.mulu1>div>ul>li{
		width: 50%;
		display: flex;
		float: left;
		padding: 10px 0;
		border-top: 1px solid #f2f2f2;
		justify-content: flex-start;
		align-items: center;
	}
	.mulu1>div>ul>li>p{
		padding-left: 10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.mulu1>div>ul>li:hover>p{
		color: red;
	}
	.mulu2{
		position: fixed;
		z-index: 10;
		width: 48.7%;
		margin-left: 379.5px;
		top: 0px;
		padding: 10px 10px;
		background: white;
		border: 1px solid #d8d8d8;
		box-shadow: 0px 0 5px 2px #d8d8d8;
		height: 400px;
		overflow: auto;
	}
	.mulu2>ul>li:hover>p{
		color: red;
	}
	.mulu2>p{
		color: red;
	}
	.mulu2>ul>li{
		width: 50%;
		display: flex;
		float: left;
		padding: 10px 0;
		border-top: 1px solid #f2f2f2;
		justify-content: flex-start;
		align-items: center;
	}
	.mulu2>ul>li>p{
		padding-left: 10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.block{
		width: 50%;
		margin: auto;
	}
	.el-pagination__jump {
	    margin-left: 200px;
	}
	.el-pagination {
		display: flex;
		justify-content: space-between;
	}
	.el-pager{
		width: 90%;
	}
	.el-breadcrumb{
		position: absolute;
		z-index: 2;
		top: 70px;
		height: 12px;
		left: 340px;
		padding: 0 6px 4px;
		border-radius: 5px;
		font-size: 12px;
		min-width: 12px;
		margin: 2px 0 0 3px;
		color: #999;
		color: rgba(0,0,0,.4);
	}
	.myColor >>> .el-breadcrumb__inner{
		    font-family: PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    text-align: left;
		    color: #1a1a1a;
		    -webkit-font-smoothing: antialiased;
	}
	.mululist1>div{
		z-index: 102;
		top: 115px;
		left: 50%;
		margin-left: -453px;
		position: absolute;
		width: 60px;
		font-family: PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		text-align: left;
		color: #262626;
		/* background:#ede7da; */
		background: #f3e9c6;
		
	}
	.mululist1>div>div{
		position: relative;
		z-index: 100;
		cursor: pointer;
		border: 1px solid #d8d8d8;
		border: 1px solid rgba(0,0,0,.1);
		border-top: none;
		font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.mululist1>div>div>p{
		margin-top: 6px;
		margin-bottom: 6px;
	}
	.mululist1>div>div>i{
		font-size: 16px;
		    display: block;
		    width: 16px;
		    height: 16px;
		    padding-top: 10px;
			margin: auto;
		    transition: color .3s;
		    color: #000;
	}
	.mululist2{
		z-index: 102;
		top: 0px;
		left: 50%;
		margin-left: -453px;
		position: fixed;
		width: 60px;
		font-family: PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		text-align: left;
		color: #262626;
		/* background:#ede7da; */
		background: #f3e9c6;
	}
	.mululist2>div{
		position: relative;
		z-index: 100;
		cursor: pointer;
		border: 1px solid #d8d8d8;
		border: 1px solid rgba(0,0,0,.1);
		border-top: none;
		font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.mululist2>div>p{
		margin-top: 6px;
		margin-bottom: 6px;
	}
	.mululist2>div>i{
		font-size: 16px;
		    display: block;
		    width: 16px;
		    height: 16px;
		    padding-top: 10px;
			margin: auto;
		    transition: color .3s;
		    color: #000;
	}
	.contianer-top{
		width: 50%;
		/* height: 1800px; */
		margin: auto;
		/* background:#ede7da; */
		background: #f3e9c6;
		position: relative;
		top: 65px;
		border: 1px solid #d8d8d8;
	    margin:8px auto;
	    text-align: center;
		padding-bottom: 30px;
	}
	.contianer-last{
		width: 50%;
		/* height: 1800px; */
		margin: auto;
		/* background:#ede7da; */
		background: #f3e9c6;
		position: relative;
		top: 65px;
		border: 1px solid #d8d8d8;
		margin:8px auto;
		text-align: left;
		border: 1px solid #d8d8d8;
	}
	.contianer-last1{
		width: 80%;
		margin: 60px auto;
	}
	.contianer-last1>span{
		    font: 24px/32px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    overflow: hidden;
		    height: 32px;
		    margin-bottom: 12px;
	}
	.contianer-last1>pre>p{
			margin-top: 30px;
		    font-size: 18px;
			font-family: 'Microsoft YaHei',PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light',sans-serif;
			white-space: pre-wrap;
			width: 95%;
			line-height: 51px;
			overflow: auto;
			margin-left: 20px;
	}
	.imgbox{
		width: 128px;
		height: 168px;
		margin: 64px auto 24px;
		border: 1px solid #efece5;
		background: #fffbf2;
	}
	.imgbox>img{
		display: block;
		width: 120px;
		height: 160px;
		margin: 4px auto;
	}
	.contianer-top>h1{
		font: 30px/45px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    overflow: hidden;
		    height: 45px;
		    margin-bottom: 7px;
	}
	.contianer-top>h2{
		    font: 14px/26px PingFangSC-Regular,'-apple-system',Simsun;
		    overflow: hidden;
		    height: 26px;
		    margin-bottom: 48px;
		    color: #999;
		    color: rgba(0,0,0,.4);
	}
	.xinxi{
		overflow: hidden;
		width: 380px;
		margin: 0 auto 48px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.xinxi>div>p{
		font: 18px/26px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		margin-bottom: 5px;
		white-space: nowrap;
	}
	.xinxi>div>span{
		font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
		    display: block;
		    color: #999;
		    color: rgba(0,0,0,.4);
	}
	.contianer-top>h3{
		    font: 16px/26px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    overflow: hidden;
		    height: 26px;
		    margin-bottom: 8px;
			text-align: center;
	}
	.contianer-top>h5{
		    font: 14px/26px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    color: #666;
			margin-top: 20px;
	}
	.contianer-top>h6{
		    color: rgba(0,0,0,.4);
			font: 14px/26px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
	}
	.text-value>span{
		    font: 24px/32px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    overflow: hidden;
		    height: 32px;
		    margin-bottom: 12px;
			text-align: left;
	}
	.bottom{
		width: 50%;
		margin: auto;
		/* background:#ede7da; */
		background: #f3e9c6;
		position: relative;
		top: 65px;
		margin-top: 20px;
		border: 1px solid #d8d8d8;	
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 100px;
	}
	.bottom>div{
		    font: 18px/50px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    width: 33.2%;
			text-align: center;
			border: 1px solid #d8d8d8;	
	}
	.bottom>div:hover{
		background-color: #aaaa7f;
	}
	.comment{
		width: 50%;
		background: #f3e9c6;
		top: 115px;
		margin: 30px auto 20px;
	}
	.com-box{
		position: relative;
	}
	.fabiao{
		background-color: #bf2c24;
		bottom: 10px;
		right: 150px;
		position: absolute;
		z-index: 99;
		font-size: 14px;
		line-height: 29px;
		width: 68px;
		height: 29px;
		text-align: center;
		border-radius: 2px;
		color: white;
	}
	.comment-box{
		width: 100%;
		position: relative;
	}
	.comall{
		/* margin: 20px 20px 20px; */
		width: 100%;
		position: relative;
		padding-bottom: 20px;
		border-bottom: 1px solid #888888;
	}
	.img-box{
		width: 50px;
		height: 50px;
		margin-top: 20px;
		margin-left: 20px;
	}
	.img-box>img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	.com-name{
		position: absolute;
		top: 10px;
		left: 80px;
	}
	.com-time{
		top: 10px;
		right: 30px;
		position: absolute;
		    font-size: 12px;
		    font-weight: 400;
		    color: #999;
	}
	.com-value{
		margin-left: 30px;
		margin-top: 20px;
		width: 70%;
		max-height: 200px;
		overflow: auto;
		    font: 14px/1.5 'MicroSoft YaHei';
		    color: #333;
	}
	.com-button{
		cursor: pointer;
		background-color:#a6a6a6 ;
		margin-left: 80%;
		position: absolute;
		width: 40px;
		margin-top: -20px;
		text-align: center;
		border-radius: 2px;
		font-size: 14px;
		padding: 5px 10px 5px;
	}
	.site{
		width: 70%;
		height: 35px;
		left: 50%; 
		position: relative;
		margin-left: -40%;
		margin-top: 20px;
	}
	.site2{
		width: 70%;
		height: 150px;
		left: 50%; 
		position: relative;
		margin-left: -40%;
		margin-top: 20px;
	}
	.xianzhi{
		display: block;
		z-index: 12;
		bottom: 15px;
		right: 230px;
		font-size: 14px;
		margin-top: 4px;
		color: #a6a6a6;
		position: absolute;
	}
</style>
