<template>
	<div>
		<navbar></navbar>
		<div style="background: gray;height: 300px;">
			<h1 align="center" style="padding-top: 100px;color: white;">{{$t('common.Film')}}</h1>
		</div>
		<el-row type="flex" justify="space-around" :gutter="20" style="margin-top: 10px;">
			<el-col :span="7">
				<el-button type="text" style="width:100%;color: gray;" @click="now">{{$t('film.NowPlaying')}}</el-button>
			</el-col>
			<el-col :span="7">
				<el-button type="text" style="width:100%;color: gray;" @click="will">{{$t('film.ComingSoon')}}</el-button>
			</el-col>
			<el-col :span="7">
				<el-button type="text" style="width:100%;color: gray;" @click="search">{{$t('film.MoreFilm')}}</el-button>
			</el-col>
		</el-row>
		<router-view></router-view>
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
			
			now () {
				this.$router.push('/film/nowplaying')
			},
			will () {
				this.$router.push('/film/comingsoon')
			},
			search () {
				this.$router.push('/search')
			}
			
		}
	}
</script>

<style>
</style>
