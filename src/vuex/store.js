import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: "",
    admin: "",
    book: null,
    fufenlei:"",
    bookdetail:{}
  },
  mutations: {
    setData(state, data) {
      // console.log('data::',data);
      state.user = data;
    },
    setadmindata(state, data) {
      state.admin = data;
    },
    setfufenlei(state,data){
      state.fufenlei=data
    },
    setbook(state,data){
      state.book=data
    },
    setbookdetail(state,data){
      state.bookdetail.detailmesg=data.detailmesg
      state.bookdetail.zhangjiemesg=data.zhangjiemesg
    }
  }
});
export default store;
