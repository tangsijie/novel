import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        user: '',
        admin:'',
    },
    mutations: {
        setData(state,data) { 
            state.user=data
        },
        setadmindata(state, data) {
            state.admin=data
         },
	
},
	
});
export default {
    store
}