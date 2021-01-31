<template>
  <div>
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex;justify-content: center;margin-top: 200px">
	<el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span al>登录</span>
        </div>
		<el-form status-icon label-position="left" label-width="0px" v-model="LoginForm">
		<el-form-item prop="username">
			<el-input v-model="LoginForm.username" type="text" auto-complete="off" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input v-model="LoginForm.password" type="password" auto-complete="off" placeholder="密码"></el-input>
		</el-form-item>
		<el-form-item prop="remember"><el-checkbox class="rememberme">记住密码</el-checkbox></el-form-item>
		<el-row :gutter="20">
			
			<el-col :span="12">
				<el-form-item style="width:100%;" prop="register">
					<el-button type="warning" style="width:100%;" @click="dialogFormVisible=true">注册</el-button>
				</el-form-item>
			</el-col>
			
			<el-col :span="12">
				<el-form-item style="width:100%;" prop="login">
					<el-button type="primary" style="width:100%;" @click.native="login">登录</el-button>
				</el-form-item>
			</el-col>
		</el-row>
		</el-form>
	</el-card>
	</div>
	
	
	<!-- 注册弹出框 -->
	<el-dialog :visible.sync="dialogFormVisible" title="用户注册" >
		<el-form :model="RegisterForm" label-position="left" status-icon :rules="rules" ref="RegisterForm">
			<el-form-item label="用户名称" prop="username" >
				<el-input v-model="RegisterForm.name" autocomplete="off" style="width: 80%;"></el-input>
			</el-form-item>
			<el-form-item label="邮箱地址" prop="email" :rules="[
{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
				<el-input type="email" v-model="RegisterForm.email" autocomplete="off" style="width: 80%;"></el-input>
			</el-form-item>
			<el-form-item label="用户密码" prop="userpassword">
				<el-input type="password" v-model="RegisterForm.password" autocomplete="off" style="width: 80%;"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="passwordcheck">
				<el-input type="password" v-model="RegisterForm.passwordcheck" autocomplete="off" style="width: 80%;"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<!-- 需要resetField将表格重置 -->
		<el-button @click="esc">取 消</el-button>
			<!-- 需要提交到后端，并返回是否成功，若成功，则直接进入index -->
		<el-button type="primary" @click="sure">确 定</el-button>
		</div>
	</el-dialog>
	
  </div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	
export default {
	data () {
		//密码检查
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.RegisterForm.passwordcheck !== '') {
					this.$refs.RegisterForm.validateField('checkPass');
				}
				callback();
			}
		};
		
		//确认密码检测
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.RegisterForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		
		
		
		return {
			LoginForm: {
				username: '',
				password: ''
			},
			
			dialogFormVisible: false,
				RegisterForm: {
					name: '',
					password: '',
					passwordcheck: '',
					email: ''
				},
			formLabelWidth: '100px',
			
			rules: {
				
				userpassword: [
					{ validator: validatePass, trigger: ['blur', 'change'] },
				],
				passwordcheck: [
					{ validator: validatePass2, trigger: 'blur' },
				],
				
			},
			
		};
	},
	methods: {
		login () {
			console.log(this.LoginForm.username,this.LoginForm.password)
			this.$store.dispatch("login",this.LoginForm)
		},
		
		//弹窗取消按钮
		esc () {
			this.RegisterForm.name= '',
			this.RegisterForm.email= '',
			this.RegisterForm.password= '',
			this.RegisterForm.passwordagain= '',
			this.$refs['RegisterForm'].resetFields();
			this.dialogFormVisible = false
		},
		
		
		//弹窗确定按钮
		sure () {
			
			if(this.RegisterForm.name==='' ||this.RegisterForm.email==='' ||this.RegisterForm.password==='' ||this.RegisterForm.passwordagain==='')
			{
				alert("请输入完整信息")
			
			}else {	
				axios.get('/api/account/getbyname/',{params:{name: this.RegisterForm.name}}).then((response) =>{
					// console.log(response)
					if(response.data !== '')
					{
						alert("用户名已存在,请重新输入")
					}
					else {
						axios.get('/api/account/insert',{params:{account_name: this.RegisterForm.name, account_password: this.RegisterForm.password, type: 'user', email: this.RegisterForm.email}}).then((response) =>{
							if(response.data=== 1)
							{
								alert("注册成功")
								this.dialogFormVisible = false
							}
							else {
								alert("注册失败")
							}
						})
						
					}
				})
			}
			
	
		}
		
	}
}

</script>