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
		component: Index
	},
	{
		path: '/',
		redirect: '/login'
	},
    {
        path: '/login',
        name: 'Login',
        component: Login
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
		]
	},
	{
		path: '/center',
		name: 'Center',
		component: Center
	},
	{
		path: '/news',
		name: 'News',
		component: News
	},
	{
		path: '/about',
		name: 'About',
		component: About
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
		]
	},
	{
		path: '/search',
		name: 'Search',
		component: Search
	},
	{
		path: '/detail',
		name: 'Detail',
		component: Detail
	}

]

const router = new VueRouter({
	// mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
	// console.log(store.state.isLogin)
	// console.log(router.app.$options.components.App.store.state.isLogin)
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
	
	if(to.path==='/admin'||to.path==='/admin/'){
		console.log("盘查")
		if(store.state.isAdmin)
		{
			next();
		}else {
			next("/index")
		}
	}
	
	if(to.path==='/film'){
		console.log("转到")
		next("/film/nowplaying")
	}
	
	if(to.path==='/admin'){
		console.log("转到")
		next("/admin/filmcontroller")
	}
})

export default router
