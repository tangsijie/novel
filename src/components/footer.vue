<template>
	<div>
		<div id="footer">
			<div class="share">
				<div class="">
					<p>分享到：</p>
					<ul>
						<li>
							<a href="#" title="分享到微信">
						       <span style="background-size: 100% 100%;"></span>
							   <p>微信</p>
						    </a>
						</li>
						 <li>
						 	<a href="#" title="分享到易信">
						        <span style="background-size: 100% 100%;"></span>
						 	   <p>易信</p>
						     </a>
						 </li>
						 <li>
						 	<a href="#" title="分享到新浪微薄">
						        <span style="background-size: 100% 100%;"></span>
						 	   <p>新浪微薄</p>
						     </a>
						 </li>
						 <li>
						 	<a href="#" title="分享到QQ空间">
						        <span style="background-size: 100% 100%;"></span>
						 	   <p>QQ空间</p>
						     </a>
						 </li>
						 <li>
						 	<a href="#" title="更多">
						        <span style="background-size: 100% 100%;"></span>
						 	   <p>更多</p>
						     </a>
						 </li>
					</ul>
				</div>
			</div>
		</div>
			

			<div class="end">
				<div class="end1">
					<span class="end-span1">
						<a  class="end-span1-a1"></a>
						<a  class="end-span1-a2"></a>
					</span>
					<span class="end-span2">
						<p>公司简介 - 客户服务 - 凤凰小说隐私政策及儿童个人信息保护规则 - 凤凰小说 - 联系我们 - 商务合作 - 加入我们 ></p>
						<div class="">
							<p>凤凰小说版权所有©2021-2022</p>
							<span>点击查看家长关爱平台</span>
						</div>
						
					</span>
				</div>
				<div class="end2">
					<p>本小说网站适合16岁以上的玩家进入。</p>
					<p>积极健康的阅读心态是健康阅读的开端，本小说故事情节设置紧凑，请您合理控制阅读时间，避免沉溺小说影响生活，注意自我保护，防范网络陷阱。</p>
					<p>《网络小说管理暂行办法》 文网游备字〔2017〕Ｃ-RPG 0015 号 《网络文化经营许可证》 批准文号：新广出审[2017]1020号 浙新广[2016]667 号</p>
					<p>ISBN 978-7-7979-4611-7 浙网文[2019]1372-138号 违法及不良信息举报中心 ICP备案：粤B2-20090191-18</p>
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
		
		
	}
</script>

<style>
#footer{
		margin-left: 300px;
	      }
	.share{
		width:100%;
		height: 36.4px;
		position: relative;
		margin-top: 30px;
		display: flex;
		justify-content: center;
	}
	.share>div{
		width: 537px;
		height: 30px;
		/* position: absolute; */
		left: 50%;margin-left: -268.5px;
	}
	.share>div>p{
		
		position: relative;
		top: 25px;right: 45px;
		font-size: 18px;
		color: rgb(75, 86, 93);
	}
	.share>div>ul{
		width: 600px;
		height: 30px;
	}
	.share>div>ul>li{
		width: 100px;
		height: 30px;
		float: left;
		list-style: none;
		position: relative;
		left: 30px;
		padding-right: 10px;
	}
	.share>div>ul>li>a{
		width: 90px;
		height: 30px;
		display: block;
		position: relative;
		text-decoration: none;
		padding-right: 10px;
	}
	.share>div>ul>li>a>p{
		color: rgb(75, 86, 93);
		position: relative;
		top: -25px;left: 35px;
		
	}
	.share>div>ul>li>a>span{
		width: 34px;
		height: 32px;
		display: block;
		background-image: url(../assets/img/微信.png);
	}
	.end{
		width: 90%;
		height: 228px;
		margin-top: 50px;
		margin-left: 100px;
	}
	.end1{
		width: 800px;
		height: 96px;
		position: relative;
		left: -200px;
		top: -30px;
		margin-left: 401px;
	}
	.end-span1{
		width: 300px;
		height: 48px;
		position: relative;
	}
	.end-span1-a1{
		width: 118px;
		height: 36px;
		display: block;
		position: relative;
		float: left;
		background-size: 100% 100%;
	}
	.end-span1-a2{
		width: 149px;
		height: 36px;
		display: block;
		position: relative;float: left;
		background-size: 100% 100%;
	}
	.end-span2{
		width: 590px;
		height: 48px;
	}
	.end-span2>p{
		font-size: 12px;
		width: 900px;
		height: 16px;
		position: relative;
		position: relative;
		top: 45px;left: -269px;
	}
	.end-span2>div{
		width: 600px;
		height: 48px;
		position: relative;
		top: 0px;
	}
	.end-span2>div>p{
		position: relative;
		top: 53px;
		left: -269px;
	}
	.end-span2>div>span{
		position: relative;
		top: 65px;left: 200px;
		background-color: #610000;
		color: white;
		font-size: 12px;
	}
	.end2{
		width: 800px;
		height: 106px;
		margin-top: 10px;
		position: relative;
		left: -200px;
		top: -30px;
		margin-left: 401px;
	}
	.end2>p{
		width: 800px;
		height: 24px;
		font-size: 12px;
	}
	.guding{
		width: 174px;
		height: 202px;
		position: absolute;
		right: 0px;top: 160px;
		position: fixed;
		z-index: 10;
	}
	.guding>p{
		width: 20px;
		height: 68px;
		position: absolute;
		color: white;
		background-color: #c91431;
		line-height: 20px;
	}
	.di{
		width: 113px;
		height: 165px;
		position: absolute;
		right: 20px;top: 20px;
	}
	.didi{
		width: 153px;
		height: 202px;
		position: absolute;
		background-color: white;
		right: 0px;top: 0px;
	}
</style>
