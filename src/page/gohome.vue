<template>

</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			gohome(){
				this.$router.push({
					name:"home"
				})
			}
		},
		mounted(){
			this.gohome()
		}
	}
</script>
<style type="text/css">
	
</style>