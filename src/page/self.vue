<template>
	<div id="product">
		<div class="self-header">
			<div>
				<img :src="imgurl" alt="" />
				<p>个人中心</p>
			</div>
			<ul>
				<li style="background-color: #ee4259;">
					<div>我的首页</div>
				</li>
				<li>
					<div @click="$router.push('/message')" style="cursor: pointer;"> 消息中心</div>
				</li>
				<li @click="goselfinfo" style="cursor: pointer;">
					<div>个人资料</div>
				</li>
			</ul>
			<b @click="$router.push('/')" style="cursor: pointer;">小说首页</b>
			<p>{{ LoginUser.rname }}</p>
			<span @click="signout" style="cursor: pointer;">退出</span>
		</div>
		<div class="self-mid">
			<div class="self-midtop">
				<div class="touxiang">
					<div><img :src="imgurl"></div>
					<div></div>
				</div>
				<div class="midright">
					<h3>{{ LoginUser.rname }}<i>Lv0</i></h3>
					<div>
						<p>安全级别</p>
						<div>
							<div>
								<div></div>
							</div>
						</div>
						<span class="yanse">45</span>/100
					</div>
					<div class="midrightdi">
						<span>
							<p>关注<b>0</b></p>
							<p>粉丝<b>0</b></p>
						</span>
						<p>大神之光<b>0</b></p>
					</div>
				</div>
			</div>
			<div class="self-midbottom">
				<div class="search">
					<el-input class="ser" v-model="input2" clearable placeholder="输入作品名" @blur="shujiashow"></el-input>
					<div class="search2" @click="searchclick">搜书架</div>
				</div>
				<div class="shujialist">
					<div class="shujialist1">
						<h2>我的书架</h2>
						<p>共<strong>{{ shujiamesg.length }}</strong>本书籍</p>
					</div>
					<el-table ref="multipleTable" :data="shujiamesg" tooltip-effect="dark" style="width: 100%"
						@selection-change="handleSelectionChange">

						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column :show-overflow-tooltip="true" label="书名/最近更新章节"
							prop="fenlei,bookname,zhangjie,title" width="280">
							<template slot-scope="scope">【{{ scope.row.fenlei }}】 {{ scope.row.bookname }} &nbsp; &nbsp;
								{{ scope.row.zhangjie }} &nbsp; {{ scope.row.title }}</template>
						</el-table-column>
						<el-table-column prop="time" label="更新时间" width="100">
							<template slot-scope="scope">{{ scope.row.time.substring(0, 10) }}</template>
						</el-table-column>
						<el-table-column prop="writer" label="作者" width="120" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="delete" label="操作" fixed="right" width="100">
							<template slot-scope="scope">
								<el-button @click="godetail(scope.row)" type="text" size="small">查看</el-button>
								<el-button @click="delone(scope.row)" type="text" size="small">
									移除
								</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div style="margin-top: 20px">
						<el-button @click="delshujiashow" :disabled="this.tableChecked.length === 0">批量删除</el-button>
						<el-button @click="toggleSelection()">取消选择</el-button>
					</div>

				</div>

			</div>
		</div>

	</div>
</template>

<script>
import axios from "axios";
export default {
	name: 'product',

	data() {
		return {
			imgurl: {},
			searchmesg: [],
			input2: '',
			zhangjie2: [],
			mesg2: [],
			shujiamesg: [],
			tableChecked: [],
			idStr: '',
			LoginUser: {},

			multipleSelection: []
		}
	},
	methods: {
		//搜索功能
		searchclick() {
			axios({
				method: "post",
				url: "http://127.0.0.1:3000/getSql/searchsjSql",
				data: {
					username: this.LoginUser.rname,
					inputvalue2: this.input2,
				}
			}).then(
				res => {
					this.shujiamesg = res.data.data;
					console.log('sssss', this.shujiamesg);
				},
				err => {
					console.log(err.msg);
				}
			);
		},
		godetail(e) {
			//获取某本书的信息
			axios({
				method: "post",
				url: "http://127.0.0.1:3000/getSql/getoneSql",
				data: {
					bookname: e.bookname
				}
			}).then(
				res => {
					console.log("this.mesg2::", res.data.data);
					this.mesg2 = res.data.data;
					// this.mesg2[0].bookimg = 'data:image/jpg;base64,'+ this.mesg2[0].bookimg
				});
			//章节获取
			axios({
				method: "post",
				url: "http://127.0.0.1:3000/getSql/zhangjieSql",
				data: {
					bookname: e.bookname
				}
			}).then(
				res => {
					this.zhangjie2 = res.data.data;
					this.$router.push({
						name: 'detail',
						params: {
							detailmesg: this.mesg2[0],
							zhangjiemesg: this.zhangjie2,
						}
					});
				},
			);
		},
		signout() {
			this.$store.commit('setData', '');//更新userInfo
			alert("退出成功")
			this.getuser()
			this.$router.push({
				path: '/'
			})
		},
		goselfinfo() {
			this.$router.push({
				name: 'selfinfo'
			})
		},
		getuser() {
			this.LoginUser = this.$store.state.user;
			this.imgurl = this.$store.state.user.img;
		},
		// 书架展示
		shujiashow() {
			axios({
				method: "post",
				url: "http://127.0.0.1:3000/getSql/shujiaSql",
				data: {
					username: this.LoginUser.rname
				},

			}).then(
				res => {
					this.shujiamesg = res.data.data;
					for (var i = 0; i < this.shujiamesg.length; i++) {
						this.shujiamesg[i].bookimg = this.shujiamesg[i].bookimg
					}
				},
				err => {
					console.log(err.msg);
				}
			);
		},
		//一键删除
		delshujiashow() {
			this.idStr = this.idStr.split(',')
			axios({
				method: "post",
				url: "http://127.0.0.1:3000/getSql/delshujiaSql",

				data: {
					id: this.idStr
				},
			}).then(
				res => {
					alert("删除成功");
					this.shujiashow();
				},
				err => {
					console.log(err.msg);
				})

		},
		//单个删除
		delone(e) {
			console.log('test', e.id);
			axios({
				method: "post",
				url: "http://127.0.0.1:3000/getSql/delshujiaSql",

				data: {
					id: [e.id]
				},
			}).then(
				res => {
					alert("删除成功");
					this.shujiashow();
				},
				err => {
					console.log(err.msg);
				})

		},
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			//  console.log("handleSelectionChange--",val)
			this.tableChecked = val
			this.multipleSelection = val;
			this.idStr = val.map(item => item.id).toString();
			console.log(this.idStr, 'idStr');
		},

	},
	mounted() {
		this.getuser();
		this.shujiashow();

	}
}
</script>

<style scoped="scoped">
html {
	font-family: Helvetica, 'PingFang SC', 'Source Han Sans CN', 'WenQuanYi Micro Hei', 'Microsoft YaHei', sans-serif;
	overflow-y: scroll;
	background: #f7f6f2;

}

.self-header {
	width: 100%;
	height: 70px;
	background-color: #3e3d43;
	display: flex;
	color: white;
	position: relative;
	justify-content: center;
	align-items: center;
}

.self-header>ul>li {
	float: left;
	line-height: 20px;
	display: block;
	padding: 22px 22px;
	transition: background .2s, border .2s;
	border-top: 3px solid transparent;
	border-bottom: 3px solid transparent;
}

.self-header>div {
	position: absolute;
	left: 15%;
}

.self-header>div>img {
	width: 60px;
	height: 50px;
	float: left;
}

.self-header>div>p {
	color: #fff;
	font-size: 28px;
	float: left;
	margin-top: 5px;
	margin-left: 5px;
}

.self-header>b {
	position: absolute;
	right: 28%;
}

.self-header>p {
	position: absolute;
	right: 19%;
}

.self-header>ul>li:hover {
	background-color: #000000;
}

.self-header>span {
	position: absolute;
	right: 10%;
}

.self-mid {
	width: 50%;
	height: 900px;
	margin: 40px auto;
}

.self-midtop {
	border: 1px solid #e0deda;
	border-radius: 4px;
	padding: 55px 0 0 0;
	background: url(../../static/img/selfbg.png) no-repeat;
}

.touxiang {
	position: relative;
	width: 100px;
}

.touxiang>div:first-child>img {
	width: 100px;
	height: 100px;
	vertical-align: top;
	border: 3px solid #fff;
	border: 3px solid rgba(255, 255, 255, .5);
	border-radius: 50%;
}

.touxiang>div:last-child {
	background-image: url(../../static/img/spriteself.png);
	background-position: 0 0;
	width: 52px;
	height: 20px;
	font-size: 12px;
	position: absolute;
	bottom: -7px;
	left: 50%;
	margin: 0 0 0 -25px;
	color: #fff;
	border-radius: 2px;
}

.midright {
	margin: 0 0 0 140px;

}

.midright>h3 {
	display: flex;
	font-size: 20px;
	font-weight: 600;
	color: white;
	margin-top: -90px;
}

.midright>h3>i {
	font-size: 12px;
	display: inline-block;
	margin: 0 0 0 9px;
	margin-top: 5px;
	height: 18px;
	padding: 0 6px;
	vertical-align: .5ex;
	color: #fff;
	border-radius: 2px;
	background: #ee4259;
	text-align: center;
}

.midright>div:nth-child(2) {
	display: flex;
	line-height: 54px;
	border-bottom: 1px solid #e0deda;
	align-items: center;
	margin-top: 10px;
}

.midright>div:last-child {
	display: flex;
	line-height: 54px;
	align-items: center;

}

.yanse {
	margin-left: 8px;
	color: #ee4259;
}

.midright>div>div {
	position: relative;
	display: inline-block;
	width: 80px;
	margin: 0 0 0 8px;
	vertical-align: 1.1ex;
}

.midright>div>div>div {
	position: absolute;
	width: 100%;
	height: 6px;
	border-radius: 3px;
	background: #e6e4df;
}

.midright>div>div>div>div {
	width: 45%;
	height: 100%;
	border-radius: 3px;
	background: #ee4259;
	background: linear-gradient(to right, #ffd500, #ee4259);

}

.midright>div:last-child>span {
	display: flex;
}

.midrightdi>span {
	margin-right: 30px;

}

.midrightdi>span>p:last-child {
	margin-left: 30px;
}

b {
	margin-left: 10px;
}

.search>input,
.shujialist {
	border: 1px solid #e0deda;
	border-radius: 4px;
}

.search {
	display: flex;
	justify-content: center;
	margin: 30px auto;
	align-items: center;
}

.el-input {
	width: 300px;
}

.ser>>>.el-input__inner {
	width: 294px;
	height: 36px;
	padding: 0 10px;
	outline: 0;
}

.search2 {
	line-height: 38px;
	min-width: 42px;
	padding: 0 15px;
	cursor: pointer;
	color: #fff;
	border: none;
	border-radius: 0 4px 4px 0;
	background: #bf2c24;
	font-size: 14px;
}

.shujialist {
	font-size: 14px;
	line-height: 20px;
	padding: 20px 20px;
	border-bottom: 1px solid #e0deda;

}

.shujialist1 {
	display: flex;
	font-size: 14px;
	line-height: 20px;
	padding: 20px 10px;
	border-bottom: 1px solid #e0deda;
}

.shujialist1 {
	margin-top: -20px;
}

.shujialist1>p {
	padding: 0 40px;
	color: #7f7f7f;
}

strong {
	font-weight: 800;
	color: #000000;
	margin: 0 10px;
}

.el-table {
	font-size: 12px;
}

.el-table>tr>td:nth-child(2) {
	background-color: #000000;
}</style>
