<template>
	<div>
		<navbar></navbar>
		<el-page-header @back="goBack" content="详情页面" style="margin-left: 5px;margin-top: 10px;">
		</el-page-header>
		<el-row type="flex" gutter="200" style="height: 300px;margin-left: 200px;margin-top: 40px;">
			<el-col :span="4" >
				<el-image :src="data01.film_pic" class="image" style="width: 600%;"></el-image>
			</el-col>
			<el-col :span="18">
				<span>名称：{{data01.film_name}}<br/><br/>语言：<br/><br/>上映时间：{{data01.film_time}}<br/><br/>片长：<br/><br/>演员列表：{{data01.film_actors}}<br/><br/>类型：<br/><br/>简介：{{data01.film_abstract}}</span>
			</el-col>
		</el-row>
		<div style="margin-right: 200px;">
			<el-alert type="info" style="margin-top: 30px;"></el-alert>
		</div>
		<div style="margin-left: 200px;margin-top: 40px;">
			<el-row type="flex">
				<el-col :span="4">用户评分：</el-col>
				<el-col :span="4"><el-rate
				v-model="value"
				disabled
				show-score
				text-color="#ff9900"
				score-template="{value}">
				</el-rate>
				</el-col>
			</el-row>
			<el-alert type="info" style="margin-top: 30px;"></el-alert>
			<h3>用户评论</h3>
			<div style="background-color: aqua;height: 300px;margin-right: 300px;"></div>
		</div>
	</div>
</template>

<script>
	import navbar from '../components/NavBar.vue'
	export default {
		components: {
			navbar
		},
		data () {
			return {
				data01: this.$route.params.film,
				value: this.$route.params.film.film_evaluate
			}
		},
		methods: {
			goBack () {
				this.$router.push('/film')
			}
		}
	}
</script>

<style>
</style>
