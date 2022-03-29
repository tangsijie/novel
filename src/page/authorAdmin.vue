<template>
  <div style="height:100%">
      <el-container style="height:100%">
      <el-aside width="250px" height="100%" style="background:#274b77">
          <div @click="goadmin">读者管理</div>
          <div style="background:rgb(26, 51, 82)">作者管理</div>
          <div @click="gosuperadmin">管理员管理</div>
      </el-aside>
      <el-main>
          <el-table
    :data="author"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="writerid"
      label="id"
      width="60">
    </el-table-column>
    <el-table-column
      prop="wname"
      label="作者名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="wpwd"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="worknum"
      label="作品数量"
      width="180">
    </el-table-column>
    <el-table-column
      prop="jianjie"
      label="简介"
      width="150">
    </el-table-column>
    <el-table-column
      prop="status"
      label="审核状态"
      width="120">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
          <el-button type="text" @click="checkwork(scope.row)"  size="small">查看作品</el-button>
        <el-button type="text" @click="deleteauthor(scope.row)"  size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-main>
</el-container>

                <el-dialog
                        title="他的作品"
                        :visible.sync="dialogVisible"
                        fullscreen
                        :before-close="handleClose">
                             <el-table
                                :data="book"
                                border
                                style="width: 100%">
                                             <el-table-column
                                                fixed
                                                prop="id"
                                                label="id"
                                                width="60">
                                            </el-table-column>
                                             <el-table-column
                                                prop="bookname"
                                                label="书名"
                                                 width="120">
                                            </el-table-column>
                                            <el-table-column
                                              prop="jieshao"
                                              label="介绍"
                                              width="120">
                                            </el-table-column>
                                            <el-table-column
                                              prop="fufenlei"
                                              label="副分类"
                                              width="180">
                                            </el-table-column>
                                            <el-table-column
                                              prop="zifenlei"
                                              label="子分类"
                                              width="150">
                                            </el-table-column>
                                            <el-table-column
                                              prop="biaoqian"
                                              label="标签"
                                              width="120">
                                            </el-table-column>
                                             <el-table-column
                                              prop="tuijianshu"
                                              label="推荐数"
                                              width="120">
                                            </el-table-column>
                                             <el-table-column
                                              prop="fangwenliang"
                                              label="访问量"
                                              width="120">
                                            </el-table-column>
                                             <el-table-column
                                              prop="starttime"
                                              label="开始时间"
                                              width="120">
                                            </el-table-column>
                                             <el-table-column
                                              fixed="right"
                                              label="操作"
                                              width="200">
                                              <template slot-scope="scope">
                                                <el-button type="text" @click="deletebook(scope.row)"  size="small">删除</el-button>
                                              </template>
                                            </el-table-column>
                                        </el-table>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                         <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
  </div>
</template>

<script>
	import axios from "axios";
export default {
    data(){
        // reader:''
        return{
            author:[{
                writerid:1,
                wname:"mff",
                wpwd:"zzz",
                worknum:'2',
                jianjie:"我爱写作",
                status:0
            }],
            book:[{
                id:1,
                bookname:"斗破苍穹",
                jieshao:"这本书真牛逼",
                fufenlei:"休闲",
                zifenlei:"神秘幻想",
                biaoqian:"完结",
                tuijianshu:"123",
                fangfenliang:'1000',
                starttime:'2018.1.1'
            }],
             dialogVisible: false

        }
       
    },
    methods:{
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      goadmin(){
          this.$router.push({
              path:'/admin'
              })
      },
         gosuperadmin(){
              this.$router.push({
                path:'/superadmin'
              })
          },
      //获取到所有作者
        getauthor(){
             axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/getauthor",
                    }).then(res => {
                        this.author = res.data.data;
                            })
        },

      //获取到作者的id或者名字，从作品表中找到该作者的作品
      checkwork(e){
          this.dialogVisible = true
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/getauthorwork",
                data:{
                    writer:e.wname
                }
                    }).then(res => {
                        this.book = res.data.data
                         this.dialogVisible = true
                            })
      },
      //删除作者
      deleteauthor(row){
             axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/deleteauthor",
                data:{
                    id:row.id
                }
                    }).then(res => {
                         alert("删除成功")
                            this.getauthor()
                            })
      },
      deletebook(row){
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/deletebook",
                data:{
                    id:row.id
                }
                    }).then(res => {
                        alert("删除成功")
                            this.checkwork()
                            })
      }
    },
    mounted(){
        this.getauthor()
    }
}
</script>

<style>
	
*{
	padding:0;
	margin: 0;
	list-style: none;
}
html,body{
    height: 100%;
    width: 100%;
}
.el-aside>div{
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size:20px;
    font-weight: bold;
}
.el-aside>div:hover{
    background:rgb(26, 51, 82);
}
</style>