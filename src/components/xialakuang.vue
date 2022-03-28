<template>
	<div>
	<el-dropdown @command="handleCommand">
	  <span class="el-dropdown-link">
	    更多<i class="el-icon-arrow-down el-icon--right"></i>
	  </span>
	  <el-dropdown-menu slot="dropdown">
	    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
	    <el-dropdown-item command="b">狮子头</el-dropdown-item>
	    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
	    <el-dropdown-item command="d" >双皮奶</el-dropdown-item>
	    <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
	  </el-dropdown-menu>
	</el-dropdown>
	 
	</div>
</template>

<script>
	 
		 export default{
			 name:'xialakuang',
		 		  data() {
		 		        return {
		 		        
		 		        };
		 		      },
		 		     methods: {
		 		       handleCommand(command) {
		 		         this.$message('click on item ' + command);
		 		       }
		 		     },
		 		 components:{
		 			
		 		 }
		 
	   
	  }
</script>

<style scoped="scoped">
	.el-dropdown-link {
	    cursor: pointer;
		color: #ccc;
	  }
	  .el-icon-arrow-down {
	    font-size: 12px;
	  }
</style>
