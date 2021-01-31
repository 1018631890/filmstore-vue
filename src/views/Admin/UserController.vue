<template>
	<div>
		<el-card style="margin-top: 20px;">
			<el-table :data="this.$store.state.UserList">
				<el-table-column prop="account_id" label="用户ID" align="center"></el-table-column>
				<el-table-column prop="account_name" label="用户名称" align="center"></el-table-column>
				<el-table-column prop="type" label="用户类型" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<el-button type="info" size="small">编辑</el-button>
					<el-button type="danger" size="small">删除</el-button>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>

	export default {
		components:{

		},
		data () {
			return {
				
			}
		},
		methods: {
			
		},
		mounted () {
			if(this.$store.state.UserList.length===0)
			{
				//请求store的函数axios请求
				this.$store.dispatch("getuserlist")
			}else {
				console.log("使用userlist缓存")
			}
		}
	}
</script>

<style>
</style>
