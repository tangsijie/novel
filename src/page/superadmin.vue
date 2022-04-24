<template>
  <div style="height:100%">
      <el-container style="height:100%">
      <el-aside width="250px" height="100%" style="background:#55aa7f">
          <div @click="goadmin" style="cursor: pointer;" >读者管理</div>
          <div @click="goauthorAdmin" style="cursor: pointer;">作者管理</div>
          <div style="cursor: pointer;background:rgb(95, 95, 95)">小说审核</div>
		  <div @click="tuichu" style="cursor: pointer;">退出系统</div>
      </el-aside>
      <el-main>
          <!-- <el-button type="primary" style="margin:10px" @click="addadmin">添加管理员</el-button> -->
          <el-table
    :data="shbook"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
	   width="60"
      >
    </el-table-column>
    <el-table-column
      prop="bookname"
      label="小说名"
	   width="180"
      >
    </el-table-column>
    <el-table-column
      prop="jieshao"
      label="小说简介"
	  show-overflow-tooltip
	   
      >
    </el-table-column>
	<el-table-column
	  prop="starttime"
	  label="创建时间"
	   width="180"
	  >
	  <template slot-scope="scope">{{starttime| dateFmt('YYYY-MM-DD HH:mm:ss')}}</template>
	</el-table-column>
	<el-table-column
	  prop="writer"
	  label="作者"
	  width="180"
	  >
	</el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
		  <el-button type="text" @click="updatesh(scope.row)"  size="small">审核通过</el-button>
        <el-button type="text" @click="delbook(scope.row)"  size="small">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-main>
</el-container>
<!-- <el-dialog
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
</el-dialog> -->

  </div>
</template>

<script>
	import axios from "axios";
export default {
    data(){
        // reader:''
        return{
          shbook:[],
        dialogVisible:false,
        adminpassword:'',
        adminname:''
        }
       
    },
    methods:{
		tuichu(){
			this.$router.push({
				name:'loginRegister'
			})
		},
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
      getsh(){
          axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/getshbook",
                    }).then(res => {
						this.shbook = res.data.data;
						
                            })
                 },
            delbook(e){
                 axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/admin/deletebook",
                data :{
                    id:e.id
                }
                    }).then(res => {
                         alert("审核不通过")
                        this.getsh()
                            })
                 },
                 // addadmin(){
                 //     this.dialogVisible=true
                 // },
              updatesh(e){
                   axios({
                   method: "post",
                  url: "http://127.0.0.1:3000/admin/updateshSql",
                  data :{
                      id:e.id
                  }
                      }).then(res => {
                           alert("审核通过")
                          this.getsh()
                              })
                   },
                     },
			mounted() {
							this.getsh()
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
    color: brown;
}
</style>