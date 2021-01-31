<template>
	<div>
		<el-row style="margin-left: 150px;">
			<el-col :span="4" v-for="(item) in this.$store.state.ComingSoonFilm" :key="item.film_id" :offset="1" >
				<div style="margin-top:15px">        
				<el-card :body-style="{ padding: '0px'}" shadow="hover">
				<el-image :src="item.film_pic" class="image" @click="detail(item)" style="height: 350px;"></el-image>
				<div style="height: 50px;">
				<el-row type="flex" justify="center" style="margin-top: 10px;">
					<span>{{item.film_name}}</span>
				</el-row>
				</div>
				<el-row type="flex" justify="center">
					<!-- <el-col :span="18" style="margin-top: 20px;margin-bottom: 10px;">上映时间：{{item.film_time}}</el-col> -->
				</el-row>
				</el-card>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				// tabledata: [
				// 	{
				// 		Id: '1',
				// 		name: 'Film1',
				// 		Createtime: '2020.9.1'
				// 	},
				// 	{
				// 		Id: '2',
				// 		name: 'Film2',
				// 		Createtime: '2020.9.3'
				// 	},
				// 	{
				// 		Id: '3',
				// 		name: 'Film3',
				// 		Createtime: '2020.9.5'
				// 	},
				// 	{
				// 		Id: '4',
				// 		name: 'Film4',
				// 		Createtime: '2020.9.31'
				// 	},
				// 	{
				// 		Id: '5',
				// 		name: 'Film5',
				// 		Createtime: '2020.9.9'
				// 	},
				// ]
			}
		},
		methods: {
			
			detail (film) {
				this.$router.push({name: 'Detail',params:{film: film}})
			}
		},
		mounted () {
			if(this.$store.state.ComingSoonFilm.length===0)
			{
				console.log('使用ajax获取电影列表')
				this.$store.dispatch("getfilmbynow",'1')
			}else {
				console.log('使用电影列表缓存')
			}
		}
	}
</script>

<style>
</style>
