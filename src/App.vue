<template>
  <div id="app">
    
    <router-view></router-view>
  </div>
</template>

<script>
	import axios from "axios";
export default {
  name: 'App'
}
</script>

<style>
	
*{
	padding:0;
	margin: 0;
	list-style: none;
}
body,html{
  height: 100%;
}
#app{
  height: 100%;
}
</style>
