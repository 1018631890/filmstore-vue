<template>
	<div>
		<el-row type="flex" justify="space-between">
			<el-col :span="12">
				<el-input placeholder="搜索" v-model="search">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
			</el-col>
			<el-col :span="3">
				<el-button type="primary" plain @click="event($route.path.split('/')[2],'add','')">新增</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				search: ''
			}
		},
		methods: {
			
			event (page,type,data)
			{
				this.$parent.$parent.$parent.view(page,type,data)
			}
					
		}
			
		
	}
</script>

<style lang="scss" scoped>

</style>
