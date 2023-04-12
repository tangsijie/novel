<template>
    <div>

        <div class="text">
            <div class="main">
                <div style="width:80%;margin: 40px auto">
                    <span>作者名：</span>
                    <el-input v-model="book.writer" label="作者名" style="width: 200px;margin-left: -5px;">
                    </el-input>
                    <span>父分类：</span>
                    <el-input v-model="book.fufenlei" label="父分类" style="width: 200px;margin-left: -5px;">
                    </el-input>
                    <span>子分类：</span>
                    <el-input v-model="book.zifenlei" label="子分类" style="margin-bottom:10px;width: 200px;">
                    </el-input>

                </div>

                <el-input ref="Htmlvalue" type="textarea" :rows="8" :cols="8" placeholder="请输入内容" v-model="book.jieshao">
                </el-input>
            </div>
            <footer>
                <div @click="update" class="xiugai">确认修改</div>
            </footer>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            book: [],
        }
    },
    methods: {
        getbook() {
            axios({
                method: "post",
                url: "http://127.0.0.1:3000/getSql/getbook",
                params: {
                    bookname: this.$route.params.bookname,
                    id: this.$route.params.id
                }
            }).then(res => {
                this.book = res.data.data[0];
                // console.log('params'+this.$route.params.id);
                // console.log("cccc：", this.book);
            });
        },
        update() {
            axios({
                method: 'post',
                url: "http://127.0.0.1:3000/admin/updatebook",
                data: {
                    bookname: this.book.bookname,
                    zifenlei: this.book.zifenlei,
                    fufenlei:this.book.fufenlei,
                    jieshao: this.book.jieshao,
                    id: this.book.id
                }
            }).then(res => {
                this.getbook()
                alert('修改成功！')
                // console.log("update:", res);
            }
            )
        }
    },
    mounted() {
        // this.getadmin()
        this.getbook()
    }
}
</script>
<style>
* {
    padding: 0;
    margin: 0;
}

html,
body {
    height: 100%;
    background: #f6f6f6;
}

.izp:hover {
    color: #aa0000;
    cursor: pointer;
    font-weight: 800;
}
.xiugai{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid green;
    background-color: green;
    margin:10px auto;
}
</style>