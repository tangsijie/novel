import Vue from 'vue'
import Router from 'vue-router'
import home from '../page/home.vue'//引入一个文件也就是页面，前面的这个home就是你文件引入进来之后取得名字
// import lunbo from "../components/lunbotu.vue"
import loginRegister from '../page/loginRegister.vue'
import book from '../page/book.vue'
// import xialakuang from '../components/xialakuang.vue'
import detail from '../page/detail.vue'
import self from '../page/self.vue'
import selfinfo from '../page/selfinfo.vue'
// import renull from '../page/renull.vue'
// import gohome from '../page/gohome.vue'
import fenlei from '../page/fenlei.vue'
import admin from '../page/admin.vue'
import authorAdmin from '../page/authorAdmin.vue'
import superadmin from '../page/superadmin.vue'
import writebook from '../page/writebook.vue'
import authoraddbook from '../page/authoraddbook.vue'
import authordetail from '../page/authordetail.vue'
import authorbookdetail from '../page/authorbookdetail.vue'
import editbook from '../page/editbook'
import message from '../page/message'
// import renull from '../page/renull
import allbook from '../page/allbook'
import adminupdatebook from '../page/adminupdatebook'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',//页面的一个路径
			name: 'home',
			component: home//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/book',//页面的一个路径，书籍详细
			name: 'book',
			component: book//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/home/:book/:passfenlei',//页面的一个路径
			name: 'home',
			component: home//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/loginRegister',//页面的一个路径,登录注册页面
			name: 'loginRegister',
			component: loginRegister//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/book/:detailmesg/:zhangjiemesg',//页面的一个路径
			name: 'book',
			component: book//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/self',//页面的一个路径
			name: 'self',
			component: self//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/book/detail',//页面的一个路径
			name: 'detail',
			component: detail//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/self/:detailmesg/:zhangjiemesg',//页面的一个路径
			name: 'self',
			component: self//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/selfinfo',//页面的一个路径，个人中心
			name: 'selfinfo',
			component: selfinfo//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/fenlei',//页面的一个路径
			name: 'fenlei',
			component: fenlei//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/allbook',//页面的一个路径
			name: 'allbook',
			component: allbook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/fenlei/:detailmesg/:zhangjiemesg',//页面的一个路径
			name: 'fenlei',
			component: fenlei//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/admin',//页面的一个路径，管理员
			name: 'admin',
			component: admin//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/adminupdatebook/:id/:bookname',//页面的一个路径，管理员
			name: 'adminupdatebook',
			component: adminupdatebook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/authorAdmin',//页面的一个路径，作者管理
			name: 'authorAdmin',
			component: authorAdmin//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/superadmin',//页面的一个路径，审核小说
			name: 'superadmin',
			component: superadmin//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/writebook',//页面的一个路径，作者写小说
			name: 'writebook',
			component: writebook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/authoraddbook',//页面的一个路径，作者添加书本
			name: 'authoraddbook',
			component: authoraddbook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/authordetail/:bookname',//页面的一个路径
			name: 'authordetail',
			component: authordetail//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},

		{
			path: '/authorbookdetail/:bookname/:zhangjiemesg',//页面的一个路径
			name: 'authorbookdetail',
			component: authorbookdetail//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/editbook',//页面的一个路径
			name: 'editbook',
			component: editbook//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
		{
			path: '/message',//页面的一个路径
			name: 'message',
			component: message//申明你现在的这个路径是导向哪一个文件也就是页面的含义
		},
	]
})
