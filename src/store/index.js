import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {       //存储状态
	
	isLogin: false,
	account: null,
	isAdmin: false,
	NowPlayingFilm: [],
	ComingSoonFilm: [],
	Ticket: [],
	News: [],
	Film: [],
	UserList: []

  },
  mutations: {   //同步更改状态的方法

	Loginchange(state,data){
		// console.log(data.account_name)
		// console.log(state.isAdmin)
		state.isLogin = true
		state.account = data
		if(data.type=='admin')
		{
			state.isAdmin = true
		}
	},
	
	Logoutchange(state){
		state.isLogin = false
		state.account = null
		state.isAdmin= false
	},
	
	CacheNow(state,data){
		state.NowPlayingFilm = data
	},
	
	CacheWill(state,data){
		state.ComingSoonFilm = data
	},
	UpdateInformation(state,data){
		state.acount = data
	},
	CacheTicket(state,data){
		state.Ticket = data
	},
	CacheNews(state,data){
		state.News = data
	},
	CacheFilm(state,data){
		state.Film = data
	},
	CacheUserList(state,data){
		state.UserList = data
	}

  },
  actions: {	//异步处理
	
	//登录请求后端操作
	login (store,LoginForm) {
		// console.log(LoginForm.username,LoginForm.password)
		axios.get('/api/account/getbyname/',{params:{name: LoginForm.username}}).then((response) =>{
		if(response.data.account_password===LoginForm.password)
		{
			// alert("登录成功")
			Message.success("登录成功")
			console.log("response",response)
			store.commit("Loginchange",response.data)
			router.push('/index')
		}
		else
		{
			// alert("登录失败")
			Message.error("登录失败,账号或密码错误")
		}
		})
	},
	
	//注销
	logout(store){
		store.commit("Logoutchange")
		router.push('/login')
	},
	
	//注册
	// resgister(store,RegisterForm){
		
	// }
	
	// 获取部分电影
	getfilmbynow(store,e){                    //获取部分电影
		axios.get('/api/film/getbywill/',{params:{will: e}}).then((res) =>{
			if(res.data!==null)
			{
				console.log("film",res)
				if(e==='0')
				{
					store.commit("CacheNow",res.data)
				}
				else if(e==='1')
				{
					store.commit("CacheWill",res.data)
				}
				else {alert("参数错误")}
			}else {
				alert("电影获取失败")
			}
		})
	},
	
	// 更新账户信息
	account_upadte(store,data) {
		axios.get('/api/account/update',{params:{account_id:data.id ,account_name: data.username,email: data.email,account_password: data.password}}).then((res) =>{
			if(res.data !== null)
			{
				alert('信息修改成功')
				store.commit("UpdateInformation",res.data)
			}else {
				alert('信息修改失败')
			}
		})
	},
	
	// 请求票据列表
	getticket(store,x) {
		axios.get('/api/ticket/getbyaccount/',{params:{id: x}}).then((res) =>{
			if(res.data !== null)
			{
				console.log("ticket",res)
				store.commit("CacheTicket",res.data)
			}else {
				alert('获取票据信息失败')
			}
		})
	},
	
	// 请求新闻列表
	getnews(store)
	{
		axios.get('/api/news/getall').then((res)=>{
			if(res.data !== null)
			{
				console.log("news",res)
				store.commit("CacheNews",res.data)
			}else {
				alert('获取最新消息失败')
			}
		})
	},
	
	// 请求电影列表
	getallfilm(store)
	{
		axios.get('/api/film/getall').then((res)=>{
			if(res.data !== null)
			{
				console.log("film",res)
				store.commit("CacheFilm",res.data)
			}else {
				alert('获取电影信息失败')
			}
		})
	},
	
	// 请求用户列表
	getuserlist(store)
	{
		axios.get('/api/account/getall').then((res)=>{
			if(res.data !== null)
			{
				console.log("userlist",res)
				store.commit("CacheUserList",res.data)
			}else {
				alert('获取用户列表失败')
			}
		})
	},
	
	// // 新增电影
	// InsertFilm(store,data){
		
	// },
	
	// //删除电影
	// DeleteFilm(store,data){
		
	// }
	
  }
  
})

export default store