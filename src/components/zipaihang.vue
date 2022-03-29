<template>
	<div id="pai">
		<h3>本周推荐</h3>
		<ul>
			<li v-for="(item,index) in car.slice(0,17)" :key="index" >
				<div>{{item.fufenlei}}</div>
				<div @click="book1">{{item.bookname}}<span v-if="index==0||index==4"></span></div>
				<div class="zuozhe">{{item.writer}}</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript" >
	import axios from "axios";
 export default({
		name:'paihang',
		data(){
			return{
				car:'',
			}
			},
				methods:{
					book1(){
						this.$router.push("/book");
					},
					bookshow() {
					      axios({
					        method: "post",
					        url: "http://127.0.0.1:3000/getSql/getSql",
					        data: {
					//           no: this.$store.state.isaccount
					        }
					      }).then(
					        res => {
							this.car = res.data.data;
							// console.log("car",this.car);
					        },
					        err => {
					          console.log(err.msg);
					        }
					      );
					    },
					
				},
				mounted(){
					this.bookshow()
				},
		})

</script>

<style scoped>
	#pai>ul{
		margin-top: 10px;	
	}
	#pai>ul>li{
		display: flex;
		justify-content: space-between;
	}
	
	#pai>ul>li>div:first-child{
	color: gray;
    height: 32px;
    margin-left: -8px;
    min-width: 56px;
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
h3{
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
span{
		background: url(../assets/img/tag.png) 0 -24px no-repeat;
		    height: 9px;
		    right: -30px;
		    top: -12px;
		    width: 17px;
	}
.zuozhe{
	
}
</style>