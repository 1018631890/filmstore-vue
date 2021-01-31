<template>
	<div>
		<el-card style="margin-top: 20px;">
				<el-table :data="this.$store.state.News" :default-sort = "{prop: 'news_time'}">
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" label-width="100px">
								<el-form-item label="标题:">
									{{props.row.news_title}}
								</el-form-item>
								<el-form-item label="发布时间:">
									{{props.row.news_time}}
								</el-form-item>
								<el-form-item label="正文:">
									{{props.row.news_text}}
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="news_type" label="信息类型"></el-table-column>
					<el-table-column align="center" prop="news_title" label="标题"></el-table-column>
					<el-table-column align="center" prop="summary" label="简介"></el-table-column>
					<el-table-column align="center" prop="news_time" label="发布时间" sortable></el-table-column>
					<el-table-column label="操作" align="center">
						<template slot-scope="props">
						<el-button type="info" size="small" @click="event($route.path.split('/')[2],'edit',props.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="event($route.path.split('/')[2],'del',props.row.news_id)">删除</el-button>
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
			event(page,type,data){
				this.$parent.$parent.$parent.view(page,type,data)
				this.$forceUpdate()
			}
			
		},
		mounted () {
			if(this.$store.state.News.length===0)
			{
				console.log('使用ajax获取news')
				this.$store.dispatch("getnews")
			}else {
				console.log("使用news缓存")
			}
		}
	}
</script>

<style>
</style>
