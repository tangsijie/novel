<template>
  <div>
	  
	  <div class="zp" @click="gozj" style="cursor: pointer;"><i class="el-icon-back"></i>我的作品</div>
    <div style="width:80%;margin: 40px auto">
      <span>章节数：</span><el-input v-model="zhangjieshu" label="章节数" style="margin-bottom:10px;width: 200px;"></el-input>
     <span>章节名：</span> <el-input v-model="title" label="章节名" style="width: 300px;margin-left: -5px;"></el-input>
    </div>
    
    <div id="context" style="width:80%;margin:auto"></div>
    <div style="display:flex;justify-content:center;margin-top:10px" ><el-button type="primary" @click="fabu">发布</el-button></div>
  </div>
</template>

<script>
	import axios from "axios";
  import wangEditor from 'wangeditor'
export default {
    data(){
        return{
            editorData:'',
            editor:null,
            zhangjieshu:'',
            title:''
        }
    },
    methods:{
		gozj(){
			this.$router.push({
				name:'authorbookdetail'
			})
		},
      fabu(){
         axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/author/addsection",
                data:{
                    bookname:this.$route.params.bookname,
                    zhangjieshu:this.zhangjieshu,
                    title:this.title,
                    value:this.editorData

                }
                    }).then(res => {
                       alert("发布成功")
					   this.$router.push({
					   	name:'authorbookdetail'
					   })
                            })
      }
    },
    mounted(){
         const editor = new wangEditor(`#context`)

      // 配置 onchange 回调函数，将数据同步到 vue 中
       editor.config.onchange = (newHtml) => {
               this.editorData = newHtml
        }

    // editor.customConfig.menus = [
    //     'head',  // 标题
    //    'bold',  // 粗体
    //     'fontSize',  // 字号
    //   'fontName',  // 字体
    //   'italic',  // 斜体
    //   'underline',  // 下划线
    //   'strikeThrough',  // 删除线
    //   'foreColor',  // 文字颜色
    //   'backColor',  // 背景颜色
    //   'undo',  // 撤销
    //   'redo'  // 重复
    // ]

    // 创建编辑器
      editor.create()

       this.editor = editor
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
.zp:hover{
	color: #aa0000;
	font-weight: 800;
}
</style>
