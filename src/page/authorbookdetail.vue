<template>
<div>
	<div @click="goback" class="fh"><i class="el-icon-back"></i>返回</div>
  <div style="background:#f6f6f6;height:100%;padding:40px 0">
      <el-button type="primary" icon="el-icon-edit" circle style="position:fixed;right:30px" @click="gowritebook">添加</el-button>
      <div style="background:#fff;width:80%;margin: 0 auto; padding:20px" >
          <div style="margin-bottom:20px">{{bookmesg}}</div>
          <div style="display:flex;flex-wrap:wrap;">
              <div v-for="(item,index) in sections" :key="index" 
              style="width:20%;margin:0 0 10px 0;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;" 
              class="section">
              <p @click="dvalue(item)">{{item.zhangjieshu}} ： {{item.title}}</p>
              <span @click="delArtice(item.id)">删除</span>
              </div>
		  </div>
            
      </div>
  </div>
</div>
</template>

<script>
	import axios from "axios";
export default {
 data(){
     return{
		 detailvalue: false,
         bookmesg:'',
         sections:[],
         id:''
     }
 },
 methods:{
	 dvalue(e){
		 this.$router.push({
		     name:'editbook',
		     params:{
		        zhangjiemesg : e
		     }
		 })
	 },
	  
     getbookname(){
         this.bookmesg =  this.$route.params.bookname;
		 this.getsections();
     },
     getsections(){
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/author/getbooksections",
                data:{
                    bookname:this.bookmesg
                }
                    }).then(res => {
                        this.sections = res.data.data
						console.log('se',this.sections)
                            })
     },
	 goback(){
		 this.$router.push({
		     name:'authordetail',
		 })
	 },
     gowritebook(){
         this.$router.push({
             name:'writebook',
             params:{
                bookname : this.bookmesg
             }
         })
     },
     delArtice(e){
        axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/author/delsection",
                data:{
                    id:e
                }
                    }).then(res => { 
						console.log('res',res)
                        alert('删除成功')
                        this.getsections()
                            })
     }
 },
		mounted(){
			this.getbookname()
		}
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
.section{
    font-size:14px;
    color:#3636c3;
	cursor: pointer;
}
.section:hover{
    color:rgb(255, 0, 0)
}
.detailvalue{
	position: absolute;
	width: 40%;
	top: 10%;
	left: 10%;
	background-color: white;
}
.fh:hover{
	cursor: pointer;
	color: #aa0000;
	font-weight: 800;
}
</style>
