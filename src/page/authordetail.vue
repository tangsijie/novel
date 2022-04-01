<template>
  <div >
      <div style="width:80%;margin:20px auto; padding:40px;background:#fff " >
      <div style="margin:0 0 20px 0">我的作品</div>
      <el-button type="primary" icon="el-icon-edit" circle style="position:fixed;right:30px" @click="goaddbook"></el-button>
      <div style="display:flex; justify-content:space-around;flex-wrap:wrap">
          <el-card class="box-card" v-for="(item,index) in bookname" :key="index" style="margin-bottom:20px" @click="gobookdetail(item.bookname)">
              <div slot="header" class="clearfix">
              <span>{{item.bookname}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
              </div>
              <div class="jieshao">{{item.jieshao}}</div>
              <div class="biaoqian" style="margin:20px 0 0 0">
                 <span>{{item.fufenlei}}</span>
                 <span>{{item.zifenlei}}</span>
                 <span>{{item.biaoqian}}</span>
                 <span>{{item.starttime}}</span>
           </div>
          </el-card>
    </div>
</div>
  </div>
</template>

<script>
	import axios from "axios";
export default {
    data(){
        return{
             activeNames: ['1'],
             LoginAuthor:'',
             bookname:[
                  {
                 bookname:"斗破苍穹",
                 jieshao:"我是你爹",
                 fufenlei:"玄幻",
                 zifenlei:"异世大陆",
                 biaoqian:'完结',
                 starttime:"2018.1.1"
                  },
                   {
                 bookname:"斗破苍穹",
                  },
                   {
                 bookname:"斗破苍穹",
                  }
                 ]
        }
       
    },
    methods:{
        handleChange(val) {
            this.activeNames = val
      },
      
      getauthorbook(){
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/author/getauthorbook",
                data:{
                    id:this.LoginAuthor.writerid
                }
                    }).then(res => {
                        this.bookname = res.data.data
                            })
      },
      goaddbook(){
        this.$router.push(
          {
            path:'/authoraddbook'
          }
        )
      },
      gobookdetail(item){
        this.$router.push({
          name:'authorbookdetail',
          params:{bookname:item}
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
  background:#f6f6f6
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .jieshao{
     max-height: 100px;
      color:#646464;
      overflow: hidden;
      word-wrap:break-word;
      font-size:14px;
      text-overflow: ellipsis
  }
  .biaoqian>span{
    font-size:10px;
    padding: 5px;
    border:1px solid #646464 ;
    border-radius: 10px;
  }
</style>
