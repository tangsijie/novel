<template>
  <div >
      <div style="width:80%;margin:20px auto; padding:40px;background:#fff   " >
      <div style="margin:0 0 20px 0">我的作品</div>
        <el-collapse v-model="activeNames" @change="handleChange" >
        <el-collapse-item v-for="(item,index) in book" :key="index" :title="item.bookname" :name="index"  @change="handleChange(index)">
        <div style="display:flex;flex-wrap:wrap;" class="section-contain">
            <div v-for="(value,index) in item.bookdetail" :key="index">{{value.section}} : {{value.sectionName}}</div>
    </div>
    
  </el-collapse-item>
</el-collapse>
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
             book:[
                 {
                 bookname:"斗破苍穹",
                 bookdetail:[
                     {
                         section:'第一章',
                         sectionName:"这个就是爱情"
                     },
                       {
                         section:'第二章',
                         sectionName:"这个就是爱情2"
                     },
                       {
                         section:'第三章',
                         sectionName:"这个就是爱情3"
                     },
                       {
                         section:'第四章',
                         sectionName:"这个就是爱情4"
                     },
                       {
                         section:'第五章',
                         sectionName:"这个就是爱情5"
                     },
                 ]
             },
              {
                 bookname:"斗破苍穹2",
                 bookdetail:[
                     {
                         section:'第一章',
                         sectionName:"这个就是爱情"
                     },
                       {
                         section:'第二章',
                         sectionName:"这个就是爱情2"
                     },
                       {
                         section:'第三章',
                         sectionName:"这个就是爱情3"
                     },
                       {
                         section:'第四章',
                         sectionName:"这个就是爱情4"
                     },
                       {
                         section:'第五章',
                         sectionName:"这个就是爱情5"
                     },
                 ]
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
.section-contain>div{
    width: 25%;
    margin:10px 0;
    color:#2751b1;
}
.section-contain>div:hover{
    color:#0d4ee7
}
</style>
