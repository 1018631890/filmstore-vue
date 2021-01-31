<template>
	<div>
		<navbar></navbar>
		<el-row gutter="20" style="margin-top: 10px;" >
			
			<!-- 左侧导航栏部分 -->
			
			<el-col :span="4">
				<!-- @open="handleOpen"
			@close="handleClose" -->
			<el-menu
			router 
			:default-active="$route.path"
			class="el-menu-vertical-demo"
			background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b">
				<el-menu-item index="/admin/filmcontroller">
					<i class="el-icon-menu"></i>
					<span slot="title">电影管理</span>
				</el-menu-item>
				<el-menu-item index="/admin/newscontroller">
					<i class="el-icon-document"></i>
					<span slot="title">新闻管理</span>
				</el-menu-item>
				<el-menu-item index="/admin/usercontroller">
					<i class="el-icon-setting"></i>
					<span slot="title">用户管理</span>
				</el-menu-item>
				<el-submenu index="/admin/">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>更多功能</span>
				</template>
				<el-menu-item-group>
				<template slot="title">分组一</template>
					<el-menu-item index="/admin/select01">选项1</el-menu-item>
					<el-menu-item index="/admin/">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="/admin/">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">选项4</template>
						<el-menu-item index="/admin/">选项1</el-menu-item>
				</el-submenu>
				</el-submenu>
				</el-menu>
			</el-col>
			
			<!-- 右侧显示部分 -->
			
			<el-col :span="18">
				<toolbar style="margin-top: 10px;margin-left: 50px;"></toolbar>
				<router-view :key="count"></router-view>
				<!--  -->
			</el-col>
		</el-row>
		
		<el-dialog :visible.sync="dialogFilmVisible" :title="filmtitle" style="margin-left: 800px;width: 1000px;" top="0px">
			<div style="height: 1000px;">
				<el-form :model="filmform" ref="filmform">
					<el-form-item label="电影名称">
						<el-input v-model="filmform.name"></el-input>
					</el-form-item>
					<el-form-item label="上映时间">
						<el-input v-model="filmform.time"></el-input>
					</el-form-item>
					<el-form-item label="参演演员">
						<el-input v-model="filmform.actors"></el-input>
					</el-form-item>
					<el-form-item label="电影状态">
						<el-select v-model="filmform.will" placeholder="请选择">
							<el-option
							v-for="item in filmstate"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="电影简介">
						<el-input v-model="filmform.abstract" type="textarea" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
					</el-form-item>
					<el-form-item label="//图片上传(未实现)"></el-form-item>
					<el-form-item>
						<el-button type="info" plain size="small" @click="dialogFilmVisible=false">取消</el-button>
						<el-button type="primary" plain size="small" @click="controller($route.path.split('/')[2],type,filmform)">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="dialogNewsVisible" :title="newstitle"  style="margin-left: 800px;width: 1000px;" top="0px">
			<div  style="height: 1000px;">
				<el-form :model="newsform" ref="newsform">
					<el-form-item label="新闻类型">
						<el-input v-model="newsform.news_type"></el-input>
					</el-form-item>
					<el-form-item label="新闻标题">
						<el-input v-model="newsform.news_title"></el-input>
					</el-form-item>
					<el-form-item label="简介">
						<el-input v-model="newsform.summary"></el-input>
					</el-form-item>
					<el-form-item label="发布时间">
						<el-input v-model="newsform.news_time"></el-input>
					</el-form-item>
					<el-form-item label="正文">
						<el-input v-model="newsform.news_text" type="textarea" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="info" plain size="small" @click="dialogNewsVisible=false">取消</el-button>
						<el-button type="primary" plain size="small" @click="controller($route.path.split('/')[2],type,newsform)">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		
		<el-dialog :visible.sync="dialogxxVisible" title="提示信息">
			<span>{{message}}</span>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogxxVisible=false">取消</el-button>
				<el-button @click="controller($route.path.split('/')[2],'del',id)">确定</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>
	import navbar from '@/components/NavBar.vue'
	import toolbar from '../components/ToolBar.vue'
	import axios from 'axios'
	
	export default {
		data () {
			return {
				// 删除提示框的信息存储
				message: '',
				count: '0',
				// 电影界面标题
				filmtitle: '',
				// 新闻界面标题
				newstitle: '',
				type: '',
				dialogFilmVisible: false,
				dialogNewsVisible: false,
				dialogxxVisible: false,
				// 删除时所需id的转存
				id: '',
				// 电影部分信息
				filmform: {
					id: '',
					abstract: '',
					name: '',
					will: '',
					actors: '',
					time: '',
					evaluate: '',
					pic: ''
				},
				// 新闻信息部分
				newsform: {
					news_id: '',
					news_type: '',
					news_title: '',
					news_time: '',
					news_text: '',
					summary: ''
				},
				filmstate: [
					{
						value: '-1',
						label: '已上映'
					},
					{
						value: '0',
						label: '正在上映'
					},
					{
						value: '1',
						label: '即将上映'
					}
				],

			}
		},
		
		created() {
			
		},
		
		components: {
			navbar,
			toolbar
		},
		
		methods: {
						
			// esc()
			// {
			// 	this.$refs['filmform'].resetFields()
			// 	this.dialogFilmVisible=false
			// },
			
			view(page,type,data) 
			{
				// 电影界面的新增视图
				if(page==='filmcontroller'&&type=='add')
				{
					this.dialogFilmVisible=true
					this.filmtitle= '新增电影'
					this.type = type
					this.filmform.name=''
					this.filmform.abstract=''
					this.filmform.will = ''
					this.filmform.actors = ''
					this.filmform.time = ''
					// console.log(this.$route.path.split('/')[2])	
				}
				
				// 电影界面的删除提示
				else if(page==='filmcontroller'&&type=='del')
				{
					this.message = '确定要删除该电影的所有信息么？'
					this.dialogxxVisible=true
					// 保存找到删除所需的id
					this.id = data
				}
				
				// 电影界面的编辑视图
				else if(page==='filmcontroller'&&type=='edit')
				{
					this.filmtitle= '修改电影信息'
					this.type = type
					this.dialogFilmVisible=true
					this.filmform.id=data.film_id
					this.filmform.name=data.film_name
					this.filmform.abstract=data.film_abstract
					this.filmform.will = data.film_will
					this.filmform.actors = data.film_actors
					this.filmform.time = data.film_time
					this.filmform.evaluate = data.film_evaluate
					this.filmform.pic = data.film_pic
				}
				
				// 新闻界面的新增视图
				else if(page==='newscontroller'&&type=='add')
				{
					this.dialogNewsVisible =true
					this.newstitle = '新增新闻信息'
					this.type = type
					this.newsform.news_type = ''
					this.newsform.news_text = ''
					this.newsform.news_time = ''
					this.newsform.news_title = ''
					this.newsform.summary = ''
					
				}
				
				// 新闻界面的编辑视图
				else if(page==='newscontroller'&&type=='edit')
				{
					this.newstitle='修改新闻信息'
					this.type = type
					this.dialogNewsVisible =true
					this.newsform.news_id = data.news_id
					this.newsform.news_type = data.news_type
					this.newsform.news_title = data.news_title
					this.newsform.news_text = data.news_text
					this.newsform.news_time = data.news_time
					this.newsform.summary = data.summary
				}
				
				// 新闻界面的删除视图
				else if(page==='newscontroller'&&type=='del')
				{
					this.message = '确定要删除该新闻么？'
					this.dialogxxVisible=true
					// 保存找到删除所需的id
					this.id = data
				}
			},
			

			controller(page,type,data)
			{
				// 电影界面的新增操作
				if(page==='filmcontroller'&&type=='add')
				{
					if(data.actors!==''&&data.name!==''&&data.time!==''&&data.will!==''&&data.abstract!=='')
					{
						axios.get('/api/film/insert',{params: {film_name: data.name,film_time: data.time,film_abstract: data.abstract,film_will: data.will,film_actors: data.actors,film_evaluate: '0'}}).then((res)=>{
							if(res.data === 1)
							{
								alert('新增电影成功')
								this.dialogFilmVisible=false
								this.$refs['filmform'].resetFields()
								// key值增加刷新子组件
								this.count++
								// 刷新film列表
								this.$store.dispatch("getallfilm")
								// this.reload()
							}else{
								alert('新增电影失败')
							}
						})
					}
				}
				
				// 电影界面的删除操作
				else if(page==='filmcontroller'&&type==='del')
				{
					if(data!=='')
					{
						axios.get('/api/film/delete',{params:{id: data}}).then((res)=>{
							if(res.data === 1)
							{
								alert('删除电影成功')
								this.dialogxxVisible=false
								// key值增加刷新子组件
								this.count++
								// 刷新film列表
								this.$store.dispatch("getallfilm")
							}else{
								alert('删除电影失败')
								this.dialogxxVisible=false
							}
						})
					}
				}
			
				// 电影界面的编辑操作
				else if(page==='filmcontroller'&&type==='edit')
				{
					axios.get('/api/film/update',{params: {film_name: data.name,film_time: data.time,film_abstract: data.abstract,film_will: data.will,film_actors: data.actors,film_id: data.id,film_evaluate: data.evaluate,film_pic: data.pic}}).then(res=>{
						if(res.data === 1){
							alert('修改电影成功')
							this.dialogFilmVisible=false
							this.$refs['filmform'].resetFields()
							// key值增加刷新子组件
							this.count++
							// 刷新film列表
							this.$store.dispatch("getallfilm")
							// this.reload()
						}else{
								alert('修改电影失败')
						}
					})
				}
						
				// 用户界面的新增操作
				else if(page==='usercontroller'&&type==='add')
				{
					console.log("1")
				}
				
				// 用户界面的删除操作
				else if(page==='usercontroller'&&type==='del')
				{
					console.log("1")
				}
				
				// 用户界面的修改操作
				else if(page==='usercontroller'&&type==='edit')
				{
					console.log("1")
				}
				
				// 新闻界面的新增操作
				else if(page==='newscontroller'&&type==='add')
				{
					if(data.news_text!==''&&data.news_type!==''&&data.news_title!==''&&data.news_time!==''&&data.summary!=='')
					{
						axios.get('/api/news/insert',{params:{news_title: data.news_title,news_type: data.news_type,news_time: data.news_time,news_text: data.news_text,summary: data.summary}}).then(res=>{
							if(res.data===1)
							{
								alert('新增新闻成功')
								this.dialogNewsVisible=false
								this.$store.dispatch("getnews")
								this.count++
							}else {
								alert('新增新闻失败')
							}
						})
					}
				}
				
				// 新闻界面的删除操作
				else if(page==='newscontroller'&&type==='del')
				{
					if(data!=='')
					{
						axios.get('api/news/delete',{params:{id: data}}).then(res=>{
							if(res.data===1)
							{
								alert('删除新闻成功')
								this.dialogxxVisible=false
								this.$store.dispatch("getnews")
								this.count++
							}else {
								alert('删除新闻失败')
							}
						})
					}
				}
				
				// 新闻界面的编辑操作
				else if(page==='newscontroller'&&type==='edit')
				{
					axios.get('/api/news/update',{params:{news_title: data.news_title,news_type: data.news_type,news_time: data.news_time,news_text: data.news_text,summary: data.summary,news_id: data.news_id}}).then(res=>{
						if(res.data===1)
						{
							alert('修改新闻成功')
							this.dialogNewsVisible=false
							this.$store.dispatch("getnews")
							this.count++
						}else {
							alert('修改新闻失败')
						}
					})
				}
			}
						
		}
	}
</script>

<style>
	
</style>