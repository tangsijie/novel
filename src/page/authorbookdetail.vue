<template>
  <div style="background:#f6f6f6;height:100%;padding:40px 0">
      <el-button type="primary" icon="el-icon-edit" circle style="position:fixed;right:30px" @click="gowritebook"></el-button>
      <div style="background:#fff;width:80%;margin: 0 auto; padding:20px" >
          <div style="margin-bottom:20px">{{bookname}}</div>
          <div style="display:flex;flex-wrap:wrap">
              <div v-for="item in sections" :key="item" style="width:20%;margin:0 0 10px 0" class="section">{{item.zhangjieshu}} ： {{item.title}}</div>
          </div>
            
      </div>
  </div>
</template>

<script>
	import axios from "axios";
export default {
 data(){
     return{
         bookname:'斗破苍穹',
         sections:[
             {
                 zhangjieshu:'第一章',
                 title:'神秘老者'
             },
              {
                 zhangjieshu:'第一章',
                 title:'神秘老者'
             },
              {
                 zhangjieshu:'第一章',
                 title:'神秘老者'
             },
              {
                 zhangjieshu:'第一章',
                 title:'神秘老者'
             },
              {
                 zhangjieshu:'第一章',
                 title:'神秘老者'
             },
              {
                 zhangjieshu:'第一章',
                 title:'神秘老者'
             },
         ]
     }
 },
 methods:{
     getbookname(){
         this.bookname =  this.$route.params&&this.$route.params.bookname
     },
     getsections(){
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/author/getsections",
                data:{
                    bookname:this.bookname
                }
                    }).then(res => {
                        this.sections = res.data.data
                            })
     },
     gowritebook(){
         this.$router.push({
             name:'writebook',
             params:{
                bookname : this.bookname
             }
         })
     }
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
}
.section:hover{
    color:rgb(8, 50, 238)
}
</style>
