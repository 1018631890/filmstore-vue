import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/Login.vue'
import store from '@/store'
import Film from '../views/Film.vue'
import Center from '../views/PersonalCenter.vue'
import News from '../views/News.vue'
import About from '../views/About.vue'
import Admin from '../views/Admin.vue'
import NowPlaying from '../views/Film/NowPlaying.vue'
import ComingSoon from '../views/Film/ComingSoon.vue'
import Search from '../views/Search.vue'
import Detail from '../views/Detailed.vue'
import Select01 from '../views/Admin/select01.vue'
import FilmControlller from '../views/Admin/FilmController.vue'
import NewsController from '../views/Admin/NewsController.vue'
import UserController from '../views/Admin/UserController.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/index',
		name: 'Index',
		component: Index,
		meta: {
			title: '首页'
		}
	},
	{
		path: '/',
		redirect: '/login'
	},
    {
        path: '/login',
        name: 'Login',
        component: Login,
		meta: {
			title: '登录'
		}
    },
	{
		path: '/film',
		name: 'Film',
		component: Film,
		children: [
			{
				path: 'nowplaying',
				name: 'NowPlaying',
				component: NowPlaying
			},
			{
				path: 'comingsoon',
				name: 'ComingSoon',
				component: ComingSoon
			}
		],
		meta: {
			title: '电影'
		}
	},
	{
		path: '/center',
		name: 'Center',
		component: Center,
		meta: {
			title: '个人中心'
		}
	},
	{
		path: '/news',
		name: 'News',
		component: News,
		meta: {
			title: '最新影讯'
		}
	},
	{
		path: '/about',
		name: 'About',
		component: About,
		meta: {
			title: '关于我们'
		}
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Admin,
		children: [
			{
				path: 'select01',
				name: 'Select01',
				component: Select01
			},
			{
				path: 'filmcontroller',
				name: 'FilmControlller',
				component: FilmControlller
			},
			{
				path: 'newscontroller',
				name: 'NewsController',
				component: NewsController
			},
			{
				path: 'usercontroller',
				name: 'UserController',
				component: UserController
			}
		],
		meta: {
			title: '管理员界面'
		}
	},
	{
		path: '/search',
		name: 'Search',
		component: Search,
		meta: {
			title: '电影搜索'
		}
	},
	{
		path: '/detail',
		name: 'Detail',
		component: Detail,
		meta: {
			title: '详细信息'
		}
	}

]

const router = new VueRouter({
	// mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
	// console.log(store.state.isLogin)
	// console.log(router.app.$options.components.App.store.state.isLogin)
	
	if(to.meta.title){
		document.title=to.meta.title
		next();
	}
	
	if(to.path==='/index'){
		console.log("盘查")
		if(store.state.isLogin)
		{
			next();
		}
		else {
			next("/login")
		}
	}
	else {
		next();
	}
	
	if(to.path==='/admin'||to.path==='/admin/filmcontroller'||to.path==='/admin/newscontroller'||to.path==='/admin/usercontroller'){
		console.log("盘查")
		if(store.state.isAdmin===true&&to.path!=='/admin')
		{
			next()
		}
		else if(store.state.isAdmin===true&&to.path==='/admin')
		{
			console.log("转到")
			next("/admin/filmcontroller")
		}
		else 
		{
			next("/index")
		}
	}
	
	if(to.path==='/film'){
		console.log("转到")
		document.title=to.meta.title
		next("/film/nowplaying")
	}
	
	
})

export default router
