<template>
	<div id="banner">
	 <el-carousel :interval="4000" type="card" height="124px">
	    <el-carousel-item v-for="(item,index) in img_list" :key="index">
	      <img :src="item" alt="">
	    </el-carousel-item>
	  </el-carousel>
	  </div>
</template>

</<script type="text/javascript">
	export default{
		 name: "Banner",
		        data(){
		          return{
		            // 图片地址数组
		            img_list:[
		              "../static/img/1.jpg",
		               "../static/img/2.jpg",
		               "../static/img/90.jpg",
		               "../static/img/10.jpg",
					  "../static/img/11.jpg",
		            ],
		          }
		        },
		        methods:{
		}         
	}
</script>

<style scoped="scoped">
	.el-carousel{
		margin-top: 30px;
	}
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 200px;
	    margin: 0;
	  }
	  
	  .el-carousel__item:nth-child(2n) {
	    background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	    background-color: #d3dce6;
	  }
	  .el-carousel__item--card{
		  width: 93px;
		  left: 40px;
	  }
	   img{
	      /*设置图片宽度和浏览器宽度一致*/
	      width: 93px;
	      height: inherit;
	    }
</style>
