<template>
	<div>
		<div class="prompt"  v-if="box">
			<div></div>
			<p>成功加入书架</p>
		</div>
		<div class="prompt2"  v-if="tui">
			<div></div>
			<p>推荐成功</p>
		</div>
		<div class="prompt3"  v-if="deltui">
			<div></div>
			<p>已取消推荐</p>
		</div>
	<bookone></bookone>
	<div id="bimg">
	<div >切换背景</div>
	</div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item class="myColor" :to="{ name:'home' }" >首页</el-breadcrumb-item>
		  <el-breadcrumb-item class="myColor" ><span >{{getBook.fufenlei}}</span></el-breadcrumb-item>
		  <el-breadcrumb-item class="myColor" ><span >{{getBook.zifenlei}}</span></el-breadcrumb-item>
		  <el-breadcrumb-item class="myColor">{{getBook.bookname}}</el-breadcrumb-item>
		</el-breadcrumb>
		
	
	<div class="cont">
		
		<div class="cont1">
			
			<div><img src="../../static/img/10.jpg" ></div>
			<div  id="code" v-show="isshow" style="display:block; position: absolute;right: 120px;top: -30px;background-color:white;width:180px;height: 200px;">
				<div>
					<div>
						<p style="border-top:1px solid black;position: absolute;bottom: 130px;left: 50px;padding-top: 10px;">凤凰公众号</p>
						<div style="position: absolute;width:113px;height:113px;bottom: 0px;left: 35px; background-image: url(../../static/img/code-wx.png);background-size: 100%;" ></div>
					</div>
				</div>
			</div>
			<div>
				<div>
					<h1>{{getBook.bookname}}</h1>
					<p>{{getBook.writer}}</p>
					<span>著</span>
				</div>
				<p >
					<span>{{getBook.biaoqian}}</span>
					<span>签约</span>
					<span>免费</span>
					<span style="color: red;">{{getBook.fufenlei}}</span>
					<span style="color: red;">{{getBook.zifenlei}}</span>
				</p>
				<p>{{getBook.jieshao}}</p>
				<p>
					<em>12.16</em>
					<cite>万字</cite>
					<i>|</i>
					<em>
					{{this.tuijianshowmesg[0].num}}
					</em>
					<cite>总推荐</cite>
					<i>|</i>
					<em>48</em>
					<cite>周推荐</cite>
					<i>|</i>
				</p>
				<div class="ma">
					
					<div @click="godetail">免费试读</div>
					<div v-if="isadd" @click="addbook">加入书架</div>
					<div v-if="!isadd" >已在书架</div>
					<div v-if="isaddtui" @click="addtuijian">推荐该书</div>
					<div v-if="!isaddtui" @click="deltuijian" >已推荐该书</div>
					<div id="xin" @mousemove="controlshow" @mouseleave="controldown">下载APP 新人免费读</div>
				</div>
				
			</div>
		</div>
		<div>
			  <el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="作品信息" name="first">
					<div class="cont2">
					<div class="cont2-left">
						<p>{{getBook.jieshao}}</p>
						<div class="lab">
							<div class="lab1">
								<p>作者自定义标签</p>
								<div >
									<p>明星</p>
								</div>
							</div>
							<div class="lab2">
								<p>荣誉动态</p>
								<div>
									<p>2022-03-07 累积获得三万个收藏</p>
									<p>荣誉殿堂</p>
								</div>
							</div>
							<div class="lab3">
								<p>最新章节</p>
								<div>
									<div v-for="(item,index) in zhangjie.slice(0,30)" :key="index">
										<p>{{item.zhangjieshu}} {{item.title}}</p><i>-</i><em>{{item.time}}</em>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cont2-right">
						<div>
							<div><img src="../../static/img/touxiang2.jpg"></div>
							<span>大神</span>
							<p class="maomi">别人家的小猫咪<i></i></p>
							<p>阅文集团大神作家，文豪流开创者，带领了一股发扬文化知识为题材的小说。</p>
						</div>
						<div>
							<ul>
								<li>
									<span></span>
									<p>作品总数</p>
									<em>6</em>
								</li>
								<li>
									<span></span>
									<p>作品总数</p>
									<em>6</em>
								</li>
								<li>
									<span></span>
									<p>作品总数</p>
									<em>6</em>
								</li>
							</ul>
						</div>
						<div class="cont2-right3">
							<h3>其他作品<span>更多></span></h3>
							<div>
								<div>
									<img src="../../static/img/11.jpg" alt="">
									<b>重生之大文豪</b>
									<p>都市-8.7分</p>
								</div>
								<p>重生与地球相似的异界，脑中平白无故多了一个搜索引擎。他写的《陆小凤传奇》、《楚留香传奇》让武侠小说重新焕</p>
								<span>加入书架</span>
							</div>
						</div>
					</div>
					</div>
				</el-tab-pane>
			    <el-tab-pane label="目录" name="second">
				<div class="tabwrap">
					<h3>翻红之路-共{{zhangjie.length}}章<span>免费</span></h3>
					<ul>
						<li v-for="(item,index) in zhangjie" :key="index">
							{{item.zhangjieshu}}&nbsp;{{item.title}}
						</li>
					</ul>
				</div>
				</el-tab-pane>
			  </el-tabs>
		</div>
	</div>
	<footer1></footer1>
	</div>
</template>

<script>
	import bookone from '../components/bookone.vue'
	import footer1 from '../components/footer.vue'
	import axios from "axios";
	export default{
		data(){
			return{
				tuijianshowmesg:[],
				isaddtuijianmesg:[],
				isaddshujiamesg:[],
				getBook:[],
				isadd:true,
				isaddtui:true,
				box:false,
				tui:false,
				deltui:false,
				LoginUser:'',
				isshow:false,
				activeName: 'first',
				zhangjie:[],
				shujiamesg:[],
			}
			
		},
		methods:{
			// 获取用户数据
			getuserdata(){
				this.LoginUser=this.$store.store.state.user;
				//加载方法顺序
				this.getbookdata();
			},
			//获取点的具体书本信息
			getbookdata(){
			 this.getBook=this.$route.params.book;
			 this.shujiashow();
			},
			//书架表展示
			shujiashow(){
			      axios({
			        method: "post",
			        url: "http://127.0.0.1:3000/getSql/shujiaSql",
			        data: {
			          username: this.LoginUser.rname
			        },
			      }).then(
			        res => {
					this.shujiamesg = res.data.data;
					this.zhangjieshow();
			        },
			        err => {
			          console.log(err.msg);
			        }
			      );
			    },
			//章节展示
			zhangjieshow(){
			      axios({
			        method: "post",
			        url: "http://127.0.0.1:3000/getSql/zhangjieSql",
			        data: {
						bookname:this.getBook.bookname
			        }
			      }).then(
			        res => {
			//           console.log(res.data);
						this.zhangjie = res.data.data;
						this.tuijianshow();
			        },
			        err => {
			          console.log(err.msg);
			        }
			      );
			    },
			//推荐表展示
			tuijianshow() {
			      axios({
			        method: "post",
			        url: "http://127.0.0.1:3000/getSql/tuijianshowSql",
			        data: {
			          bookname: this.getBook.bookname
			        },
					
			      }).then(
			        res => {
					this.tuijianshowmesg = res.data.data;
					this.isaddshujiashow();
					console.log('tuijianshow',this.tuijianshowmesg[0].num)
			        },
			        err => {
			          console.log(err.msg);
			        }
			      );
			    },
			//是否可以加入书架
			isaddshujiashow(){
			      axios({
			        method: "post",
			        url: "http://127.0.0.1:3000/getSql/isaddshujiaSql",
			        data: {
			          username: this.LoginUser.rname,
					  bookname: this.getBook.bookname
			        },
					
			      }).then(
			        res => {
					this.isaddshujiamesg = res.data.data;
					this.isaddtuijianshow();
					this.isaddbookcheck();
			        },
			        err => {
			          console.log(err.msg);
			        }
			      );
			    },
			//是否已推荐
			isaddtuijianshow(){
			      axios({
			        method: "post",
			        url: "http://127.0.0.1:3000/getSql/isaddtuijianSql",
			        data: {
			          username: this.LoginUser.rname,
					  bookname: this.getBook.bookname
			        },
					
			      }).then(
			        res => {
					this.isaddtuijianmesg = res.data.data;
					this.isaddtuijiancheck();
					
			        },
			        err => {
			          console.log(err.msg);
			        }
			      );
			    },
			isaddbookcheck(){
				if(this.isaddshujiamesg.length == 0){
					this.isadd=true
				}
				else{
					this.isadd=false
				}
				
			},
			isaddtuijiancheck(){
				if(this.isaddtuijianmesg.length == 0 ||this.isaddtuijianmesg[0].tuijianshu == 0){
					this.isaddtui=true
				}
				else{
					this.isaddtui=false
				}
				
			},
			
			getboxtimer(){
				var that=this;
				 setTimeout(function () {
				         that.box = true;
				        }, 1000)
			},
			delboxtimer(){
				var that=this;
				 setTimeout(function () {
				         that.box = false;
				        }, 3000)
			},
			getttuitimer(){
				var that=this;
				 setTimeout(function () {
				         that.tui = true;
				        }, 1000)
			},
			delttuitimer(){
				var that=this;
				 setTimeout(function () {
				         that.tui = false;
				        }, 3000)
			},
			getttui2timer(){
				var that=this;
				 setTimeout(function () {
				         that.deltui = true;
				        }, 1000)
			},
			delttui2timer(){
				var that=this;
				 setTimeout(function () {
				         that.deltui = false;
				        }, 3000)
			},
			
			//加入书架按钮
			addbook(){
				let bookid=this.$route.params.bookid;
				if(this.LoginUser === ''){
					alert("请先登录")
					this.$router.push({
						path:'/loginRegister'
										  })
				}
				else {
					if(this.isaddshujiamesg.length == 0){
						let length=this.zhangjie.length;
						axios({
						        method: "post",
						        url: "http://127.0.0.1:3000/getSql/addshujiaSql",
						        data: {
						          username:this.LoginUser.rname,
								  bookname:this.getBook.bookname,
								  status:1,
								  fenlei:this.getBook.fufenlei,
								  zhangjie:this.zhangjie[length-1].zhangjieshu,
								  title:this.zhangjie[length-1].title,
								  time:this.zhangjie[length-1].time,
								  writer:this.getBook.writer,
						        },
						      }).then(
						        res => {
									if (res.data.msg == "加入书架成功") {
										this.getboxtimer();
										this.delboxtimer();
										this.isadd=false;
						//               this.$router.push("/");
						            } 
						        },
						        err => {
						          console.log(err.msg);
						        }
						      );
					}
					else{
						console.log('已加入书架')
					}
				 }
				},
				
				//加入推荐按钮
				addtuijian(){
					if(this.LoginUser === ''){
						alert("请先登录")
						this.$router.push({
							path:'/loginRegister'
											  })
					}
					else {
						let shu=this.getBook.tuijianshu;
						console.log('shu',shu+1);
						if(this.isaddtuijianmesg.length == 0 ||this.isaddtuijianmesg[0].tuijianshu == 0){
							axios({
							        method: "post",
							        url: "http://127.0.0.1:3000/getSql/addtuijianSql",
							        data: {
							          username:this.LoginUser.rname,
									  bookname:this.getBook.bookname,
									  tuijianshu:shu+1,
									
							        },
							      }).then(
							        res => {
										if (res.data.msg == "推荐成功") {
											this.getttuitimer();
											this.delttuitimer();
											this.isaddtui=false;
							 //               this.$router.go(0);
							            } 
							        },
							        err => {
							          console.log(err.msg);
							        }
							      );
						}
						else{
							console.log('已推荐该书')
						}
					 }
					},
				//取消推荐按钮
				deltuijian(){
					let shu=this.isaddtuijianmesg[0].tuijianshu;
					console.log('shu',shu-1)
						if(this.isaddtuijianmesg.length == 1){
							axios({
							        method: "post",
							        url: "http://127.0.0.1:3000/getSql/updatetuijianSql",
							        data: {
									  tuijianshu:shu-1,
									  username:this.LoginUser.rname,
									  bookname:this.getBook.bookname,
							        },
							      }).then(
							        res => {
										if (res.data.msg == "更新推荐成功") {
											
											this.getttui2timer();
											this.delttui2timer();
											this.isaddtui=true;
											 // this.$router.go(0);
							            } 
							        },
							        err => {
							          console.log(err.msg);
							        }
							      );
						}
						else{
							console.log('已取消推荐')
						}
					 
					},
			controlshow(){
				this.isshow=true;
			},
			controldown(){
				this.isshow=false;
			},
			 handleClick(tab, event) {
			        console.log(tab, event);
			      },
			godetail(){
				this.$router.push({
					name:'detail',
					params:{
						detailmesg:this.getBook,
						zhangjiemesg:this.zhangjie,
					}
				});
			},
		// gofenlei(){
		// 	console.log('gofenlei',this.getBook)
		// 	this.$router.push({
		// 		name:'fenlei',
		// 		params:{
		// 			passfenlei:this.getBook
		// 		}
		// 	});
		// },	
			
			
			
			
			
		},
		mounted(){
			//获取数据
			this.getuserdata();
			//展示接口数据
			//判断是否可以加入书架推荐
			//检查是否已加入书架推荐状态
			
			
		},
		components:{
			bookone,
			footer1,
		}
	}
</script>

<style scoped="scoped">
	.prompt{
	    padding:10px 30px;
	    position: fixed;
	    top: 45%; left:45%;
	    border-radius:5px;
	    background: rgba(0,0,0,0.8);
	    z-index: 5000;
	    color:#FFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.prompt>div{
		background-image: url(../../static/img/勾号.png);
		background-size: 100% 100%;	
		width: 40px;height: 40px;
	}
	.prompt2{
	    padding:10px 30px;
	    position: fixed;
	    top: 45%; left:50%;
	    border-radius:5px;
	    background: rgba(0,0,0,0.8);
	    z-index: 5000;
	    color:#FFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.prompt2>div{
		background-image: url(../../static/img/勾号.png);
		background-size: 100% 100%;	
		width: 40px;height: 40px;
	}
	.prompt3{
	    padding:10px 30px;
	    position: fixed;
	    top: 45%; left:50%;
	    border-radius:5px;
	    background: rgba(0,0,0,0.8);
	    z-index: 5000;
	    color:#FFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.prompt3>div{
		background-image: url(../../static/img/勾号.png);
		background-size: 100% 100%;	
		width: 40px;height: 40px;
	}
	#bimg{
		width: 100%;
		height: 300px;
		background: url(../../static/img/9.jpg) no-repeat;
		background-size: 100% 100%;
		position: absolute;
		z-index: -1;
	}
	#bimg>div:last-child{
		position: absolute;
		z-index: 10;
		right: 17px;
		/* background-color: rgba(0,0,0,.3); */
		background-color: #000000;
		font-size: 14px;
		color: white;
		font-family: PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		text-align: left;
		padding: 0 8px;
		line-height: 24px;
	}
	.el-breadcrumb{
		position: absolute;
		z-index: 2;
		top: 70px;
		height: 12px;
		left: 250px;
		padding: 0 6px 4px;
		border-radius: 5px;
		background: rgba(0,0,0,.2);
		font-size: 13px;
	}
	.myColor >>> .el-breadcrumb__inner{
		font-family: PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		text-align: left;
		color: white;
		line-height: 12px;
	}
	.cont{
		width: 60%;
		margin: auto auto;
		border: 1px solid black;
		margin-top: 200px;
		background-color: white;
		position: relative;
	}
	.cont1{
		width: 100%;
		height: 232px;
		display: flex;
		border: 1px solid black;
	}
	.cont1>div:first-child{
		width: 144px;
		height: 192px;
		box-shadow: 0 1px 6px rgba(0,0,0,.35);
		margin: 20px 20px 0;
		overflow: hidden;
	}
	.cont1>div:first-child>img{
		    position: relative;
		    width: 100%;
		    height: 100%;
		    transition: transform .3s ease-out;
	}
	.cont1>div:first-child>img:hover{
		transform: scale(1.1); 
	}
	.cont1>div:last-child{
		width: 525px;
		height: 192px;
		margin-top: 20px;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
	}
	.cont1>div>div{
		display: flex;
	}
	.cont1>div>div>h1{
		font: 700 26px/38px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		overflow: hidden;
		height: 38px;
		margin-bottom: 12px;
		text-align: left;
		color: #262626;
		-webkit-font-smoothing: antialiased;
	}
	.cont1>div>div>p{
		margin-top: 10px;
		margin-left: 30px;
		font-size: 14px;
	}
	.cont1>div>div>p:hover{
		color: red;
	}
	.cont1>div>div>span{
		font-size: 14px;
		margin-top: 10px;
		margin-left: 10px;
	}
	.cont1>div>p:nth-child(3){
		font: 14px/20px PingFangSC-Regular,'-apple-system',Simsun;
		    overflow: hidden;
		    height: 20px;
		    margin-bottom: 11px;
			margin-top: 10px;
	}
	.cont1>div>p:nth-child(4)>em{
		font-family: 'qmxLuJRX' !important;
		    display: initial !important;
		    color: inherit !important;
		    vertical-align: initial !important;
			font: 18px/22px Arial;
			    letter-spacing: .5px;
			    color: red;
	}
	.cont1>div>p:nth-child(4)>cite{
		    font: 12px/20px PingFangSC-Regular,'-apple-system',Simsun;
		    margin-top: 2px;
		    margin-left: 3px;
	}
	.cont1>div>p:nth-child(4)>i{
		font: 18px/22px PingFangSC-Regular,'-apple-system',Simsun;
		    margin: 0 10px;
		    color: #e6e6e6;
	}
	.ma>div{
		    font: 14px/34px PingFangSC-Regular,'-apple-system',Simsun;
		    display: inline-block;
		    width: 102px;
		    height: 34px;
		    margin-right: 15px;
		    text-align: center;
		    vertical-align: middle;
		    border-width: 1px;
		    border-style: solid;
			    color: #3f5a93;
			    border-color: #3f5a93;
				margin-top: 16px;
	}
	.ma>div:last-child{
		font: 14px/34px PingFangSC-Regular,'-apple-system',Simsun;
		display: inline-block;
		width: 140px;
		height: 34px;
		bottom: 0px;
		text-align: center;
		vertical-align: middle;
		color: white;
		position: relative;
		background-color: #be2c23;
		right: 0px;
	}
	.ma>div:hover:not(#xin){
		background-color: rgba(0, 85, 255, 0.1);
		transition: color .3s,background-color .3s;
	}
	.cont1>div>p>span{
		    font: 12px/22px PingFangSC-Regular,'-apple-system',Simsun;
		    display: inline-block;
		    overflow: hidden;
		    height: 22px;
		    margin-right: 12px;
		    padding: 0 10px;
		    text-align: center;
		    vertical-align: middle;
		    border-width: 1px;
		    border-style: solid;
		    border-radius: 15px;
	}
	.cont1>div>p>span:hover{
		    font-weight: 800;
	}
	.cont2{
		display: flex;
		justify-content: space-between;
	}
	.cont2-left{
		width: 70%;
	}
	.cont2-left>div>ul>li{
		display: flex;
		justify-content: flex-start;
		width: 100%;
	}
	.divlab:nth-child(2){
		border-bottom:1px solid #e6e6e61px solid #e6e6e6 ;
		border-top: 1px solid #e6e6e6;
	}
	.cont2-left>p{
		    font: 14px/28px PingFangSC-Regular,'-apple-system',Simsun;
		    overflow: hidden;
			text-align: left; 
			color: #262626;
			text-indent:2em;
			margin-left: -20px;
			    padding-bottom: 20px;
			    border-bottom: 1px solid #e6e6e6;
	}
	.lab{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content:flex-start;
		align-items: center;
	}
	.lab1{
		width: 100%;
		display: flex;
	}
	.lab1>p{
		font: 14px/24px PingFangSC-Regular,'-apple-system',Simsun;
		    float: left;
		    width: 98px;
		    margin: 19px 20px 0 0;
		    color: #999;
	}
	.lab1>div{
		width: 70%;
		
	}
	.lab1>div>p{
		    font: 12px PingFangSC-Regular,'-apple-system',Simsun;
		    display: inline-block;
		    margin-top: 20px;
			/* margin-left: 50%; */
		    padding: 3px 9px;
		    vertical-align: middle;
		    color: #3f5a93;
		    border: 1px solid #3f5a93;
		    border-radius: 100px;
	}
	.lab2{
		width: 100%;
		display: flex;

	}
	.lab2>p{
		    font: 14px/24px PingFangSC-Regular,'-apple-system',Simsun;
		    float: left;
		    width: 98px;
		    margin: 19px 20px 0 0;
		    color: #999;
	}
	.lab2>div{
		    float: left;
		    width: 542px;
		    padding: 20px 0;
			margin: auto;
		    border-bottom: 1px solid #e6e6e6;
			border-top:1px solid #e6e6e6 ;
	}
	.lab2>div>p:first-child{
		font: 14px/22px PingFangSC-Regular,'-apple-system',Simsun;
		    display: block;
		    margin: 0 10px 8px 0;
		    cursor: pointer;
	}
	.lab2>div>p:last-child{
		font: 14px/22px PingFangSC-Regular,'-apple-system',Simsun;
		color: #3f5a93;
	}
	.lab3{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.lab3>p{
			height: 24px;
		    font: 14px/24px PingFangSC-Regular,'-apple-system',Simsun;
		    width: 98px;
		    margin: 19px 20px 0 0;
		    color: #999;
	}
	.lab3>div{
		/* display: flex; */
		width: 700px;
		float: left;
		margin-top: 30px;
		/* height: 180px; */
	}
	.lab3>div>div{
		display: flex;
		width: 240px;
		float: left;
		/* height: 180px; */
	}
	.lab3>div>div>p{
		font: 14px/22px PingFangSC-Regular,'-apple-system',Simsun;
		color: #0055ff;
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		white-space: normal;
		white-space: nowrap;
	}
	.lab3>div>div>i{
		    font-family: Arial;
		    margin: 0px 5px 0;
		    color: #a6a6a6;
	}
	.lab3>div>div>em{
		font: 14px/22px Arial;
		color: #999;
	}
	.cont2-right{
		width: 30%;
		background: #f7f6f2;
		height: 710px;
	}
	.cont2-right>div{
		position: relative;
	}
	.cont2-right>div>span{
		    font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
		    position: absolute;
		    z-index: 1;
		    top: 84px;
		    left: 50%;
		    width: 28px;
		    height: 16px;
		    margin-left: -14px;
		    text-align: center;
		    color: #fff;
		    border-radius: 2px;
			background: #bf2c24;
	}
	.maomi{
		    font: 16px/1 PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    position: relative;
		    overflow: hidden;
		    height: 22px;
		    margin-bottom: 8px;
		    text-align: center;
	}
	.cont2-right>div>p:last-child{
		    font: 12px/24px PingFangSC-Regular,'-apple-system',Simsun;
		    overflow: hidden;
		    max-height: 72px;
			text-overflow: ellipsis;
			word-wrap: break-word;
			-webkit-line-clamp: 2;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			text-align: center;
			margin: 10px 10px;
	}
	.cont2-right>div>div{
		        position: relative;
		        z-index: 1;
		        width: 100px;
		        height: 100px;
		        margin: 16px auto 16px;
	}
	.cont2-right>div>div>img{
		    display: block;
		    width: 100%;
		    height: 100%;
		    border-radius: 100%;
	}
	.cont2-right>div>p>i{
		    width: 18px;
		    height: 16px;
		    background-image: url(../../static/img/sprite.png);
		    background-repeat: no-repeat;
		    background-position: -129px -64px;
		    background-size: 335px;
			display: inline-block;
			margin-left: 5px;
			vertical-align: -1px;
	}
	.cont2-right>div>ul>li{
		    float: left;
		    width: 50px;
		    margin-left: 28px;
	}
	.cont2-right>div:nth-child(2){
		    padding: 20px 0;
			height: 98px;
		    border-top: 1px solid #e5e5e5;
			border-bottom:1px solid #e5e5e5; ;
	}
	.cont2-right>div>ul>li>span{
		    display: block;
		    margin-bottom: 9px;
		    width: 48px;
		    height: 48px;
		    background-image: url(../../static/img/sprite.png);
		    background-repeat: no-repeat;
		    background-position: -193px -80px;
		    background-size: 335px;
	}
	.cont2-right>div>ul>li>p{
		    font: 12px/18px PingFangSC-Regular,'-apple-system',Simsun;
		    color: #666;
	}
	.cont2-right>div>ul>li>em{
		font: 14px/18px Arial;
		    white-space: nowrap;
		    color: #bf2c24;
			display: block;
			text-align: center;
	}
	.cont2-right3{
		padding: 10px 0;
	}
	.cont2-right3>h3{
		    font-size: 16px;
		    line-height: 21px;
		    overflow: hidden;
		    height: 21px;
		    margin-bottom: 20px;
		    text-align: left;
			font-family: FZZCYSK;
			font-weight: 400;
	}
	.cont2-right3>h3>span{
		font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
		    float: right;
		    margin-top: 3px;
			color: #3f5a93;
	}
	.cont2-right3>div>div>b{
		font-size: 14px;
	}
	.cont2-right3>div>div>p{
		font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
		    overflow: hidden;
		    height: 16px;
		    margin-top: 5px;
			color: #bf2c24;
			text-align: center;
			margin-left: -20px;
	}
	.cont2-right3>div>div>img{
		    width: 84px;
		    height: 112px;
	}
	.cont2-right3>div>p{
		    font: 12px/20px PingFangSC-Regular,'-apple-system',Simsun;
		    overflow: hidden;
			width: 226px;
		    height: 60px;
		    margin-bottom: 16px;
		    text-align: left;
		    color: grey;
			margin-top: 10px;
			margin-left: -60px;
	}
	.cont2-right3>div>span{
		font: 14px/1 PingFangSC-Regular,'-apple-system',Simsun;
		    display: block;
		    width: 98px;
		    margin: 0 auto;
		    padding: 7px 0;
		    border-width: 1px;
		    border-style: solid;
		    border-radius: 20px;
			text-align: center;
			color: #3f5a93;
			border-color: #3f5a93;
	}
	.tabwrap>h3{
		font: 700 18px/24px PingFangSC-Regular,HelveticaNeue-Light,'Helvetica Neue Light','Microsoft YaHei',sans-serif;
		    overflow: hidden;
		    height: 24px;
		    padding-bottom: 11px;
		    border-bottom: 1px solid #666;
	}
	.tabwrap>h3>span{
		font: 10px/14px PingFangSC-Regular,'-apple-system',Simsun;
		display: inline-block;
		min-width: 24px;
		margin: 0px 4px 0;
		padding: 0 3px;
		text-align: center;
		vertical-align: middle;
		color: #fff;
		background: #aa0000;
	}
	.tabwrap>ul>li{
		font: 20px/40px PingFangSC-Regular,'-apple-system',Simsun;
		float: left;
		overflow: hidden;
		width: 200px;
		height: 40px;
		padding-right: 60px;
		border-bottom: 1px solid #ebebeb;
	}

</style>
