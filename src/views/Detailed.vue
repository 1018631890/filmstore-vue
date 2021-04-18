<template>
	<div>
		<navbar></navbar>
		<el-page-header @back="goBack" content="详情页面" style="margin-left: 5px;margin-top: 10px;">
		</el-page-header>
		<el-row type="flex" gutter="200" style="height: 300px;margin-left: 200px;margin-top: 40px;">
			<el-col :span="4">
				<el-image :src="data01.film_pic" class="image" style="width: 600%;"></el-image>
			</el-col>
			<el-col :span="18">
				<span>名称：{{data01.film_name}}<br /><br />上映时间：{{data01.film_time}}<br /><br />片长：{{data01.film_timelong}}分钟<br /><br />演员列表：{{data01.film_actors}}<br /><br />类型：{{data01.film_type}}<br /><br />简介：{{data01.film_abstract}}</span>
			</el-col>
		</el-row>
		<div style="margin-right: 200px;">
			<el-alert type="info" style="margin-top: 30px;"></el-alert>
		</div>
		<div style="margin-left: 200px;margin-top: 40px;">
			<el-row type="flex">
				<el-col :span="4">电影评分：</el-col>
				<el-col :span="4">
					<el-rate v-model="value" disabled show-score text-color="#ff9900" :score-template="rate" allow-half
						high-threshold>
					</el-rate>
				</el-col>
				<el-col :span="1" :offset="5">
					<el-input-number v-model="num" :min="1" :max="10"></el-input-number>
				</el-col>
				<el-col :span="4" :offset="3">
					<el-button type="primary" plain v-show="data01.film_will-0===0" @click="buy()">购票</el-button>
				</el-col>
			</el-row>
			<el-alert type="info" style="margin-top: 30px;"></el-alert>
			<el-row>
				<el-col :span="2">
					<h3>用户评论</h3>
				</el-col>
				<el-col :span="4" :offset="15">
					<el-button type="success" plain style="margin-top: 15px;" @click="buttonaction()">{{buttontext}}</el-button>
				</el-col>
			</el-row>
			
			<!-- 扫码弹出框 -->
			<el-dialog :visible.sync="dialogVisible" title="请使用小程序扫码" width="300px">
				<vue-qr :text="codetext" :size="200"></vue-qr>
			</el-dialog>
			
			<el-row>
				<el-col :span="16" :offset="2">
					
					
					
					<!-- v-for循环评论 -->
					<el-card style="background-color: #eee;margin-top: 10px;" shadow="never" :body-style="{ padding: '20px 20px 0px 20px' }" v-for="item in comment" :key="item.account_id" v-show="isShow">
						<el-row>
							<el-col :span="8">
								<el-row>
									<el-col :span="8">
										<span style="line-height: 3;">{{item.account_name}}</span>
									</el-col>
								</el-row>
								<el-row>
									<p style="font-size: 13px;color: #545c64;">评分: </p>
									<el-rate v-model="item.halfmark" disabled show-score text-color="#ff9900"
										:score-template="String(item.mark)" style="margin-top: 15px;">
									</el-rate>
								</el-row>
							</el-col>
							<el-col :span="15" :offset="1">
								<el-row tag="span">
									<span style="font-size: 18px;"><b>{{item.title}}</b></span>
									<el-divider></el-divider>
								</el-row>
								<el-row>
									<span style="font-size: 13px;color: #545c64;">发布于: {{item.time}}</span>
								</el-row>
								<el-row>
									<pre>{{item.comment}}</pre>
								</el-row>
								<el-divider></el-divider>
								<el-button type="text" icon="el-icon-check" size="mini" @click="messageV()" style="margin-left: 350px;">like
								</el-button>
								<el-button type="text" icon="el-icon-close" size="mini">unlike</el-button>
							</el-col>
						</el-row>
					</el-card>
					
					
					
					<!-- 写评论区域 -->
					<div v-show="!isShow">
					<div style="margin-top: 10px;" v-show="!isComment">
						<el-row>
							<el-col :span="2" style="margin-top: 8px;"><span style="font-size: medium;">评论标题</span></el-col>
							<el-col :span="8" :offset="1">
								<el-input placeholder="请输入评论标题" v-model="title"></el-input>
							</el-col>
							<el-col :span="2" style="margin-top: 8px;" :offset="1"><span>分数评价</span></el-col>
							<el-col :span="6" :offset="1">
								<el-select v-model="mark">
									<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</el-col>
						</el-row>
						<el-input type="textarea" :rows="10" placeholder="请输入品论内容" v-model="textarea" style="margin-top: 10px;"></el-input>
						<el-button style="margin-top: 10px;margin-left: 800px;" @click="submit">提交</el-button>
					</div>
					
					<div style="margin-top: 10px;" v-show="isComment">
					<el-card style="background-color: #eee;margin-top: 10px;" shadow="never" :body-style="{ padding: '20px 20px 0px 20px' }">
						<el-row>
							<el-col :span="8">
								<el-row>
									<el-col :span="8">
										<span style="line-height: 3;">我的评论</span>
									</el-col>
								</el-row>
								<el-row>
									<p style="font-size: 13px;color: #545c64;">评分: </p>
									<el-rate v-model="usercomment.halfmark" disabled show-score text-color="#ff9900"
										:score-template="String(usercomment.mark)" style="margin-top: 15px;">
									</el-rate>
								</el-row>
							</el-col>
							<el-col :span="15" :offset="1">
								<el-row tag="span">
									<span style="font-size: 18px;"><b>{{usercomment.title}}</b></span>
									<el-divider></el-divider>
								</el-row>
								<el-row>
									<span style="font-size: 13px;color: #545c64;">发布于: {{usercomment.time}}</span>
								</el-row>
								<el-row>
									<pre>{{usercomment.comment}}</pre>
								</el-row>
								<el-divider></el-divider>
								<el-button type="text" icon="el-icon-close" size="mini" style="margin-left: 450px;" @click="del()">删除评论</el-button>
							</el-col>
						</el-row>
					</el-card>
					</div>
					</div>
					
					
					
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import navbar from '../components/NavBar.vue'
	import axios from 'axios'
	import vueQr from 'vue-qr'
	export default {
		components: 
		{
			navbar,vueQr
		},
		data() 
		{
			return {
				flag: '',
				codetext: '',
				num: 1,
				dialogVisible: false,
				usercomment: '',
				data01: this.$route.params.film,
				value: this.$route.params.film.film_evaluate / 2,
				rate: this.$route.params.film.film_evaluate,
				comment: [],
				isShow: true,
				textarea: '',
				buttontext: '写评论',
				mark: '',
				title: '',
				isComment: false,
				options: [
					{
						label: '1星',
						value: '1'
					},
					{
						label: '2星',
						value: '2'
					},
					{
						label: '3星',
						value: '3'
					},
					{
						label: '4星',
						value: '4'
					},
					{
						label: '5星',
						value: '5'
					},
					{
						label: '6星',
						value: '6'
					},
					{
						label: '7星',
						value: '7'
					},
					{
						label: '8星',
						value: '8'
					},
					{
						label: '9星',
						value: '9'
					},
					{
						label: '10星',
						value: '10'
					},
				]
			}
		},
		methods: {
			goBack() 
			{
				this.$router.push('/film')
			},
			getcomment ()
			{
				axios.get('/api/comment/getbyfilm',{params:{film_id: this.data01.film_id}}).then(res=>{
					console.log(res.data)
					this.comment = res.data
				})
			},
			submit() 
			{
				var time = new Date()
				var time1 = time.getFullYear() + "." + (time.getMonth() + 1) + "." + time.getDate();
				// console.log("time",time1)
				// console.log(this.$store.state.account)
				axios.get('/api/comment/insert',{params:{account_id: this.$store.state.account.account_id,film_id: this.data01.film_id,comment: this.textarea,mark: this.mark,title: this.title,time: time1}}).then(res=>{
					if(res.data===true)
					{
						this.$message.success('评论成功')
						this.isComment=true
						this.getcomment()
						this.getusercomment()
						// 跳转到看评论界面
					}
					else
					{
						this.$message.error('操作失败')
					}
				})
			},
			buttonaction() 
			{
				this.isShow = !this.isShow
				if(this.isShow)
					this.buttontext = '写评论'
				if(!this.isShow)
					this.buttontext = '看评论'
			},
			getusercomment()
			{
				axios.get('/api/comment/iscomment',{params:{film_id: this.data01.film_id,account_id: this.$store.state.account.account_id}}).then(res=>{
					console.log(res.data)
					console.log(this.data01.film_id)
					console.log(this.$store.state.account.account_id)
					this.isComment = res.data
					if(res.data===true)
					{
						axios.get('/api/comment/getcomment',{params:{film_id: this.data01.film_id,account_id: this.$store.state.account.account_id}}).then(res1=>{
							console.log(res1.data)
							this.usercomment = res1.data
						})
					}
				})
			},
			del()
			{
				axios.get('/api/comment/delete',{params:  this.usercomment}).then(res=>{
					if(res.data===true)
					{
						this.$message.success('评论删除成功')
						this.isShow = true
						this.isComment = false
						this.buttontext = '写评论'
						this.getcomment()
						this.getusercomment()
						
					}
					else {
						this.$message.error('评论删除失败')
					}
				})
			},
			
			// 购票流程
			buy()
			{
				var time = new Date()
				var time1 = time.getFullYear() + "." + (time.getMonth() + 1) + "." + time.getDate();
				this.codetext = this.$store.state.account.account_id + '/' + this.data01.film_id + '/' + this.num + '/' + time1
				this.dialogVisible=true
				axios.get('/api/purchase/addlist',{params:{accountid: this.$store.state.account.account_id}}).then(res=>{
					console.log(res.data)
					this.buycheck()
				})
			},
			buycheck()
			{
				axios.get('/api/purchase/get',{params: {accountid: this.$store.state.account.account_id}}).then(res=>{
					console.log(res.data)
					this.flag = res.data
					// 后端返回false则继续轮询
					if(this.flag===false)		
					{
						setTimeout(()=>{
							this.buycheck()
						},2000)
					}
					// 后端返回true购票流程结束
					else {
						this.$message.success('购票成功')
						this.dialogVisible=false
					}
				})
			}

		},
		mounted() {
			this.getcomment()
			this.getusercomment()
		},
		computed: {
			half(value) 
			{
				return value/2;
			}
		}
	}
</script>

<style>
</style>
