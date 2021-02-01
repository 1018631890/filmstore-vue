<template>
<div>
	<navbar></navbar>
	<el-page-header @back="goBack" style="margin-left: 5px;margin-top: 10px;">
	</el-page-header>
	<el-row type="flex" justify="center" style="margin-top: 50px;">
		<el-col :span="10">
			<el-input placeholder="请输入内容" v-model="input" class="input-with-select">
			<el-select v-model="select" slot="prepend" placeholder="类型" style="width: 120px;">
				<el-option label="正在热映" value="0"></el-option>
				<el-option label="即将上映" value="1"></el-option>
				<el-option label="所有电影" value="2"></el-option>
				</el-select>
			<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
			</el-input>
		</el-col>
	</el-row>
	
	
	<!-- 搜索列表 -->
	<div style="margin-top: 50px;">
		<el-row>
			<el-col :span="12" :offset="6" style="background-color: #eee;margin-top: 5px;" v-for="item in data" :key="item.film_id" @click.native="goDetail(item)">
				<el-row>
					<el-col :span="8">
						<el-image :src="item.film_pic" style="width: 60%;"></el-image>
					</el-col>
					<el-col :span="16" style="padding-top: 20px;">
						<el-row>
							<el-col :span="16">
								<span class="film-name">{{item.film_name}}</span>
								<br /><br />
								<span class="film-type">动漫，友情</span>
								<br /><br />
								<span class="film-actors">主演：{{item.film_actors}}</span>
								<br /><br />
								<span class="film-time">{{item.film_time}} 上映</span>
							</el-col>
							<el-col :span="4" :offset="4">
								<span class="film-mark" style="color:coral">{{item.film_evaluate}}分</span>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
	
	
	
	
</div>
</template>

<script>
	import axios from 'axios'
	import navbar from '../components/NavBar.vue'
	export default {
		components: {
			navbar
		},
		data () {
			return {
				input: '',
				select: '2',
				data: []
			}
		},
		methods: {
			goBack () {
				this.$router.push('/film')
			},
			search () {
				axios.get('/api/film/search',{params:{will: this.select,s: this.input}}).then(res=>{
					this.data = res.data
				})
			},
			goDetail (item) {
				console.log(item)
			}
		},
		created() {
			
		}
	}
</script>

<style>
	.input-with-select .el-input-group__prepend {
		background-color: white;
	}
	.film-name {
		font-size: large;
		font-weight: 900;
	}
</style>
