<template>
	<div>
		<navbar></navbar>
		<div style="background: #409EFF;height: 300px;">
			<h1 align="center" style="padding-top: 100px;color: white;">{{$t('common.PersonalCenter')}}</h1>
		</div>
		
		<el-row style="margin-top: 30px;">
			<el-col :offset="2" :span="14">
				<el-card>
					<el-row>
						<el-col :span="6" :offset="2">
							<h2>{{this.$store.state.account.account_name}}</h2>
							<div style="height: 300px;background-color:black"></div>
						</el-col>
						<el-col :span="12" :offset="2">
							<br /><br /><br /><br /><br />
							<span>绑定邮箱：{{this.$store.state.account.email}}</span><br /><br /><br />
							<span>用户类型：{{this.$store.state.account.type}}</span><br /><br /><br />
							<span>用户信息(占位)</span><br /><br /><br />
							<span>用户信息(占位)</span><br /><br /><br />
						</el-col>
					</el-row>
				</el-card>
				<el-card>
					<el-row >
						<el-col :span="4" :offset="2">
							<el-button type="text" disabled="true"><i class="el-icon-menu">菜单</i></el-button>
						</el-col>
						<el-col :span="4">
							<el-button type="text" @click="ticketclick"><i class="el-icon-s-ticket">我的票据</i></el-button>
						</el-col>
						<el-col :span="4" >
							<el-button type="text" @click="editclick"><i class="el-icon-edit">信息修改</i></el-button>
						</el-col>
						<el-col :span="4" >
							<el-button type="text"><i class="el-icon-s-ticket">占位功能</i></el-button>
						</el-col>
						<el-col :span="4" >
							<el-button type="text"><i class="el-icon-s-ticket">占位功能</i></el-button>
						</el-col>
					</el-row>
				</el-card>
				<el-card>
					<el-table v-show="ticketShow" :data="this.$store.state.Ticket">
						<el-table-column label="电影" align="center" prop="film_id" :formatter="namechange"></el-table-column>
						<el-table-column label="数量" align="center" prop="ticket_num"></el-table-column>
						<el-table-column label="状态" align="center" prop="ticket_state"></el-table-column>
					</el-table>
					<el-form v-show="editShow" :model="updateForm" label-position="left" label-width="80px">
						<el-form-item label="用户名" prop="username">
							<el-input v-model="updateForm.username" style="width: 80%;"></el-input>
						</el-form-item>
						<el-form-item label="用户邮箱" prop="email" :rules="[
{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
							<el-input v-model="updateForm.email" style="width: 80%;"></el-input>
						</el-form-item>
						<el-form-item label="用户密码" prop="password">
							<el-input type="password" v-model="updateForm.password" style="width: 60%;" :disabled="true"></el-input>
							<el-button type="text" style="margin-left: 80px;" @click="changepassword">修改密码</el-button>
						</el-form-item>
						<el-form-item>
							<el-button @click="initial">取消</el-button>
							<el-button type="primary" @click="update">确定</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
			<el-col :offset="2" :span="4">
				<el-card style="height: 400px;">
					<h3>更多信息</h3><br /><br /><br />
					<span>还没有想好，用于填充</span>
				</el-card>
			</el-col>
		</el-row>
		<el-dialog :visible.sync="dialogeditVisible" title="修改密码" >
			<el-form status-icon label-position="left" label-width="80px" :model="changepwForm" ref="changepwForm" :rules="rules">
				<el-form-item label="原本密码" prop="originpw">
					<el-input type="password" v-model="changepwForm.originpw" style="width: 80%;"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newpw">
					<el-input type="password" v-model="changepwForm.newpw" style="width: 80%;"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="pwcheck">
					<el-input type="password" v-model="changepwForm.pwcheck" style="width: 80%;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="esc()">取消</el-button>
					<el-button type="primary" @click="sure()">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	import navbar from '@/components/NavBar.vue'
	
	export default {
		data () {
			
			//密码检查
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.changepwForm.pwcheck !== '') {
						this.$refs.changepwForm.validateField('checkPass');
					}
					callback();
				}
			};
			
			//确认密码检测
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.changepwForm.newpw) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			
			//检测原密码
			var validatePass3 = (rule, value, callback) => {
				if(value !== this.$store.state.account.account_password)
				{
					callback(new Error('与原密码不一致'));
				}else {
					callback();
				}
			};
			
			return {
				dialogeditVisible: false,
				ticketShow: true,
				editShow: false,
				updateForm: {
					username: this.$store.state.account.account_name,
					email: this.$store.state.account.email,
					password:this.$store.state.account.account_password,
					id:this.$store.state.account.account_id
				},
				changepwForm: {
					originpw: '',
					newpw: '',
					pwcheck: ''
				},
				
				rules: {
					newpw: [
						{validator: validatePass, trigger: ['blur', 'change'] },
					],
					pwcheck: [
						{validator: validatePass2, trigger: 'blur'},
					],
					originpw: [
						{validator: validatePass3, trigger: 'blur'},
					]
				}
			}
		},
		components: {
			navbar
		},
		methods: {
			ticketclick () {
				this.ticketShow = true
				this.editShow = false
			},
			editclick () {
				this.ticketShow = false
				this.editShow = true
			},
			changepassword () {
				this.dialogeditVisible=true
			},
			sure () {
				this.updateForm.password = this.changepwForm.newpw
				this.dialogeditVisible = false
			},
			esc () {
				this.$refs['changepwForm'].resetFields();
				this.dialogeditVisible = false
			},
			initial () {
				this.updateForm.username = this.$store.state.account.account_name
				this.updateForm.email = this.$store.state.account.email
				this.updateForm.password = this.$store.state.account.account_password
				alert('属性重新初始化')
			},
			update () {
				if(this.updateForm.username==='')
				{
					alert('用户名不能为空')
				}else {
					this.$store.dispatch("account_upadte",this.updateForm)
				}
			},
			namechange (row){
				for(let i in this.$store.state.Film)
				{
					// console.log(this.$store.state.NowPlayingFilm[i].film_name)
					if(this.$store.state.Film[i].film_id === row.film_id)
					{
						return this.$store.state.Film[i].film_name
					}
				}
			}
		},
		mounted () {
			if(this.$store.state.Ticket.length===0)
			{
				console.log('使用ajax获取票据信息')
				this.$store.dispatch("getticket",this.$store.state.account.account_id)
			}else {
				console.log("使用票据信息缓存")
			}
			
			if(this.$store.state.Film.length===0)
			{
				console.log('使用ajax获取电影列表')
				this.$store.dispatch("getallfilm")
			}else {
				console.log('使用电影列表缓存')
			}
			
		}
	}
</script>

<style>

</style>
