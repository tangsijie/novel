<template>
	<div>
	<el-dropdown @command="handleCommand">
	  <span class="el-dropdown-link">
	    更多<i class="el-icon-arrow-down el-icon--right"></i>
	  </span>
	  <el-dropdown-menu slot="dropdown">
	    <el-dropdown-item command="a">现实</el-dropdown-item>
	    <el-dropdown-item command="b">游戏</el-dropdown-item>
	    <el-dropdown-item command="c">体育</el-dropdown-item>
	    <el-dropdown-item command="d" >修仙</el-dropdown-item>
	    <el-dropdown-item command="e" divided>历史</el-dropdown-item>
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
