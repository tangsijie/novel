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
import admin from '../page/admin.vue'
import authorAdmin from '../page/authorAdmin.vue'
import superadmin from '../page/superadmin.vue'
import writebook from '../page/writebook.vue'
import authoraddbook from '../page/authoraddbook.vue'
import authordetail from '../page/authordetail.vue'
import authorbookdetail from '../page/authorbookdetail.vue'
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
		  path:'/fenlei/:detailmesg/:zhangjiemesg',//页面的一个路径
		  name:'fenlei',
		  component:fenlei//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/admin',//页面的一个路径
			name:'admin',
			component:admin//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/authorAdmin',//页面的一个路径
			name:'authorAdmin',
			component:authorAdmin//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/superadmin',//页面的一个路径
			name:'superadmin',
			component:superadmin//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/writebook',//页面的一个路径
			name:'writebook',
			component:writebook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/authoraddbook',//页面的一个路径
			name:'authoraddbook',
			component:authoraddbook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/authordetail/:bookname',//页面的一个路径
			name:'authordetail',
			component:authordetail//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path:'/authorbookdetail/:bookname',//页面的一个路径
			name:'authorbookdetail',
			component:authorbookdetail//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		}
		
  ]
})
