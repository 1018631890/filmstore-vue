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
				select: '',
				data: []
			}
		},
		methods: {
			goBack () {
				this.$router.push('/film')
			},
			search () {
				axios.get('/api/film/search',{params:{will: this.select,s: this.input}}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	.input-with-select .el-input-group__prepend {
		background-color: white;
	}
</style>
