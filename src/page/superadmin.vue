<template>
  <div style="height:100%">
      <el-container style="height:100%">
      <el-aside width="250px" height="100%" style="background:#274b77">
          <div @click="goadmin">读者管理</div>
          <div @click="goauthorAdmin">作者管理</div>
          <div style="background:rgb(26, 51, 82)">管理员管理</div>
      </el-aside>
      <el-main>
          <el-button type="primary" style="margin:10px" @click="addadmin">添加管理员</el-button>
          <el-table
    :data="admin"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="adminid"
      label="id"
      >
    </el-table-column>
    <el-table-column
      prop="aname"
      label="管理名"
      >
    </el-table-column>
    <el-table-column
      prop="apwd"
      label="密码"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" @click="deleteadmin(scope.row)"  size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-main>
</el-container>
<el-dialog
  title="添加管理员"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-input v-model="adminname" placeholder="管理员账号" style="margin:0 0 20px 0"></el-input>
  <el-input v-model="adminpassword"  placeholder="管理员密码"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">添加</el-button>
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
            admin:[{
            adminid:1,
            aname:"zzl",
            apwd:"123",
        }],
        dialogVisible:false,
        adminpassword:'',
        adminname:''
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
       goauthorAdmin(){
                    this.$router.push({
                      path:'/authorAdmin'
                    })
                  },
      getadmin(){
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/getadmin",
                    }).then(res => {
                        this.admin = res.data.data;
                            })
                 },
            deleteadmin(e){
                 axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/deleteadmin",
                data :{
                    id:e.adminid
                }
                    }).then(res => {
                         alert("删除成功")
                        this.getadmin()
                            })
                 },
                 addadmin(){
                     this.dialogVisible=true
                 },
                 add(){
                      axios({
		                method: "post",
	                     url: "http://127.0.0.1:3000/admin/addadmin",
                        data :{
                             aname:this.adminname,
                             apwd:this.adminpassword
                            }
                            }).then(res => {
                                alert("添加成功")
								this.dialogVisible = false
                             this.getadmin()
                                 })
                 }
                     },
			mounted() {
							this.getadmin()
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