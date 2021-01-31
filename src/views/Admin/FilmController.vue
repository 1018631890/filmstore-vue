<template>
	<div>
		<el-card style="margin-top: 20px;">
			<el-table :data="this.$store.state.Film">
				<el-table-column prop="film_name" label="电影名称" align="center"></el-table-column>
				<el-table-column prop="film_time" label="上映时间" align="center" sortable></el-table-column>
				<el-table-column prop="film_abstract" label="电影简介" align="center"></el-table-column>
				<el-table-column prop="film_actors" label="参演演员" align="center"></el-table-column>
				<el-table-column prop="film_evaluate" label="电影评分" align="center" sortable></el-table-column>
				<el-table-column prop="film_will" label="电影状态" :formatter="statechange" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="props">
						<el-button type="info" size="small" @click="event($route.path.split('/')[2],'edit',props.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="event($route.path.split('/')[2],'del',props.row.film_id)">删除</el-button>
					</template>
					
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
			statechange(row)
			{
				if(row.film_will==='-1')
				{
					return '已上映'
				}else if(row.film_will==='0'){
					return '正在上映'
				}else if(row.film_will==='1'){
					return '即将上映'
				}
			},
			
			event (page,type,data)
			{
				this.$parent.$parent.$parent.view(page,type,data)
				this.$forceUpdate()
			}
			
		},
		
		mounted () {
			if(this.$store.state.Film.length===0)
			{
				//请求store的函数axios请求
				this.$store.dispatch("getallfilm")
			}else {
				console.log("使用Film缓存")
			}
		}
	}
</script>

<style>
</style>
