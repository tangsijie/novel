<template>
	<div>
		<fenleihead></fenleihead>
		<div class="headbj"></div>
		<div class="main">
			
			<el-tabs v-model="fenleimesgValue" @tab-click="handleClick">
			  <el-tab-pane
			    v-for="(item, index) in fenleimesg"
			    :key="index"
			    :label="item.zifenlei"
			    :name="index"
			  >
			    {{item.bookname}}
			  </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import fenleihead from "../components/bookone.vue"
	export default{
		data(){
			return{
				fenleimesgValue:'2',
				fenleimesg:'',
			};
		},
		methods:{
			handleClick(tab, event) {
			        console.log(tab, event);
			      },
			getzifenleidata(){
				this.fenleimesg=this.$route.params.passfenlei;
				console.log('fenleimesg', this.fenleimesg);
			}
		},
		components:{
			fenleihead,
		},
		mounted(){
			this.getzifenleidata()
		}
	}
</script>

<style scoped="scoped">
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
</style>
