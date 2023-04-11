<template>
    <div>
        <fenleihead></fenleihead>
        <div class="headbj"></div>
        <div class="main">
            <div class="main2">
                <div class="main2mid">
                    <div class="booklist">
                        <div class="books" v-for="(item, index) in mesg" :key="index" @click="godetail(item)">

                            <div class="box-shadow"></div>
                            <div class="box-img"><img :src="item.bookimg"></div>
                            <h4>{{ item.bookname }}</h4>
                            <p class="jieshao">{{ item.jieshao }}</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import fenleihead from "../components/bookone.vue"
export default {
    data() {
        return {
            mesg: "",
            fenlei: "",
            zhangjie: ""
        };
    },
    methods: {
        bookshow() {
            this.$axios({
                method: "post",
                url: "http://127.0.0.1:3000/getSql/getSql",

            }).then(
                res => {
                    console.log(" res.data.data:", res);
                    this.mesg = res.data.data;
                    this.mesg.sort((a, b) => {
                        return -(a.tuijianshu - b.tuijianshu);
                    });
                    for (var i = 0; i < this.mesg.length; i++) {
                        this.mesg[i].bookimg = this.mesg[i].bookimg;
                    }
                    this.fufenleishow();
                },
                err => {
                    console.log(err.msg);
                }
            );
        },
        fufenleishow() {
            axios({
                method: "post",
                url: "http://127.0.0.1:3000/getSql/fufenleiSql",
                data: {
                    //           no: this.$store.state.isaccount
                }
            }).then(
                res => {
                    console.log("fenlei++++", res.data.data);
                    this.fenlei = res.data.data;
                },
                err => {
                    console.log(err.msg);
                }
            );
        },
        godetail(b) {
            axios({
                method: "post",
                url: "http://127.0.0.1:3000/getSql/zhangjieSql",
                data: {
                    bookname: b.bookname
                }
            }).then(
                res => {
                    //           console.log(res.data);
                    this.zhangjie = res.data.data;
                    this.$router.push({
                        name: 'detail',
                        params: {
                            detailmesg: b,
                            zhangjiemesg: this.zhangjie,
                        }
                    });
                },
                err => {
                    console.log(err.msg);
                }
            );
        }
    },
    components: {
        fenleihead,
    },
    mounted() {
        // this.getfufenleidata();
        this.bookshow()

    }
}
</script>

<style scoped="scoped">
@import url("../assets/icon-font/iconfont.css");

.headbj {
    width: 100%;
    height: 160px;
    background-image: url(../../static/img/8.jpg);
    background-size: 100%;
}


.main2mid {
    width: 60%;
    border: 1px solid black;
    margin-left: 30px;
    margin-right: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

}

.books {

    background: url(../../static/img/book_bottom.png) no-repeat 33px 1px;
    float: left;
    margin-right: -26px;
    width: 170px;
    position: relative;
    text-align: center;
    z-index: 1;
}

.box-shadow {
    background: url(../../static/img/shadow.png) no-repeat;
    bottom: 54px;
    height: 8px;
    left: 50%;
    margin-left: -78px;
    width: 159px;
    position: absolute;
    transition: all .3s;
    z-index: 2;
}

.box-img {
    height: 165px;
    margin: 1px auto 10px;
    width: 105px;
}

.box-img>img {
    height: 140px;
    width: 100%;
    transition: all .5s;
}

.box-img>img:hover {
    transform: translateX(0%) rotateY(-30deg);
    transform-origin: left;
}

.books>h4 {
    font: 700 16px/21px PingFangSC-Regular, HelveticaNeue-Light, Helvetica Neue Light, Microsoft YaHei, "sans-serif";
    height: 21px;
    margin: 0 auto 6px;
    max-width: 112px;
    overflow: hidden;
}

.jieshao {
    font-size: 12px;
    overflow: hidden;
    display: inline-block;
    width: 120px;
    height: 100px;
    margin-bottom: 10px;
}

.p4 {
    font-size: 14px;
    position: absolute;
    top: 10%;

}

.p4>p {
    margin: 10px 0px;
}

.newbook>h3 {
    background: #ed4259;
    float: left;
    height: 50px;
    position: relative;
    text-align: center;
    width: 50px;
    margin-left: 20px;
    z-index: 1;
}

.newbook>h3>span {
    color: #fff;
    display: block;
    font: 16px/20px FZZCYSK;
    padding: 5px 9px;
    width: 32px;
}

.newbook>h3>cite {
    border-color: transparent currentcolor transparent #ed4259;
    border-style: solid none solid solid;
    border-width: 6px 0 6px 6px;
    height: 0;
    position: absolute;
    right: -6px;
    top: 18px;
    width: 0;
    z-index: 1;
}

.newbook>p {
    float: left;
    height: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    overflow: hidden;
    width: 40%;
}

#pai>ul {
    margin-top: 10px;
}

#pai>ul>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#pai>ul>li>div:first-child {
    color: gray;
    min-width: 200px;
    overflow: hidden;
    font-size: 14px;
}

#pai>ul>li>div:first-child:hover {
    color: red;
}

#pai>ul>li>div:nth-child(2):hover {
    color: red;
}

#pai>ul>li>div:last-child:hover {
    color: red;
}

#pai>ul>li>div:nth-child(2) {
    color: #1a1a1a;
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    text-align: left;
}

#pai>ul>li>div:last-child {
    color: #b3b3b3;
    float: right;
    font: 12px/32px PingFangSC-Regular, -apple-system, Simsun;
    overflow: hidden;
    text-align: right;
    text-overflow: ellipsis;
    white-space: normal;
    width: 64px;
    white-space: nowrap;
}

#pai>h3 {
    color: #1a1a1a;
    font-size: 18px;
    font-weight: 400;
    height: 24px;
    line-height: 25px;
    line-height: 1;
    overflow: hidden;
    padding-bottom: 4px;
    border-bottom: 1px solid #666;
}

#pai>ul>li>div:first-child>span {
    background: url(../assets/img/tag.png) 0 -24px no-repeat;
    height: 9px;
    position: relative;
    top: -5px;
    width: 17px;
    display: inline-block;
}
</style>
