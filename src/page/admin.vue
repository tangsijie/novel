<template>
  <div style="height:100%">
      <el-container style="height:100%">
      <el-aside width="250px" height="100%" style="background:#274b77">
          <div style="background:rgb(26, 51, 82)">读者管理</div>
          <div>作者管理</div>
          <div>管理员管理</div>
      </el-aside>
      <el-main>
          <el-table
    :data="reader"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="readerid"
      label="id"
      width="60">
    </el-table-column>
    <el-table-column
      prop="rname"
      label="用户名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="rpwd"
      label="密码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机"
      width="300">
    </el-table-column>
    <el-table-column
      prop="shengri"
      label="生日"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jianjie"
      label="简介"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-main>
</el-container>
  </div>
</template>

<script>
export default {
    data(){
        // reader:''
        return{
             reader:[{
            readerid:1,
            rname:"zzl",
            rpwd:"123",
            email:"1131481780@qq.com",
            phone:"13544217565",
            shengri:"2021.1.2",
            sex:"男",
            jianjie:"我爱读书"
        }]
        }
       
    },
    methods:{
        handleClick(row) {
        console.log(row);
      },
      getuser(){
          this.axios({
		         method: "post",
	            url: "http://127.0.0.1:3000/account/getreader",
                    }).then(res => {
                        this.reader = this.res.data.data
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