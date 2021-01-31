<template>
	<div>
		<navbar></navbar>
		<div style="background: seagreen;height: 300px;">
			<h1 align="center" style="padding-top: 100px;color: white;">{{$t('common.News')}}</h1>
		</div>
		<el-row type="flex" justify="center" style="margin-top: 20px;">
			<el-col :span="18">
				<el-card>
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
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import navbar from '@/components/NavBar.vue'
	
	export default {
		data () {
			return {
				
			}
		},
		components: {
			navbar
		},
		methods: {
			
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
