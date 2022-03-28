import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home.vue'//引入一个文件也就是页面，前面的这个home就是你文件引入进来之后取得名字
import lunbo from "../components/lunbotu.vue"
import loginRegister from '../page/loginRegister.vue'
import book from '../page/book.vue'
import xialakuang from '../components/xialakuang.vue'
import detail from '../page/detail.vue'
import self from '../page/self.vue'
import selfinfo from '../page/selfinfo.vue'
import renull from '../page/renull.vue'
import gohome from '../page/gohome.vue'
import fenlei from '../page/fenlei.vue'
Vue.use(Router)

export default new Router({
  routes: [
	  {
	    path: '/',//页面的一个路径
	    name: 'gohome',
	    component: gohome//申明你现在的这个路径是导向哪一个文件也就是页面的含义
	  },
    {
      path: '/home/:book/:passfenlei',//页面的一个路径
      name: 'home',
      component: home//申明你现在的这个路径是导向哪一个文件也就是页面的含义
    },
		{
		  path: '/loginRegister',//页面的一个路径
		  name: 'loginRegister',
		  component: loginRegister//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
		  path:'/book/:detailmesg/:zhangjiemesg',//页面的一个路径
		  name:'book',
		  component:book//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
		  path:'/book/detail',//页面的一个路径
		  name:'detail',
		  component:detail//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
		  path:'/self',//页面的一个路径
		  name:'self',
		  component:self//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
		  path:'/selfinfo',//页面的一个路径
		  name:'selfinfo',
		  component:selfinfo//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
		  path:'/renull',//页面的一个路径
		  name:'renull',
		  component:renull//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
		  path:'/fenlei',//页面的一个路径
		  name:'fenlei',
		  component:fenlei//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		}
  ]
})
