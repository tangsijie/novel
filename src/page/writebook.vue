<template>
  <div>
    <div id="context"></div>
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
</style>
