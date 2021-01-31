<template>

<div class="block" >
<navbar></navbar>
  <el-row id="picture" type="flex" justify="center" style="margin-top: 10px;">
	<el-col :span="24">
		<el-carousel height="500px" type="card" :interval=6000 trigger="click" indicator-position="outside">
			<el-carousel-item>
				<img src="../assets/black.jpg" width="100%" height="100%" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/black.jpg" width="100%" height="100%" />
			</el-carousel-item>
			<el-carousel-item>
				<img src="../assets/black.jpg" width="100%" height="100%" />
			</el-carousel-item>
		</el-carousel>
	</el-col>
  </el-row>
  
	<el-row type="flex" justify="center" style="margin-top: 50px">
		<el-col :span="5">
			<i class="el-icon-platform-eleme">小心饿了么</i>
		</el-col>
		
		<el-col :span="5">
			<el-button type="text" @click="ZH">中文</el-button>
				|
			<el-button type="text" @click="EN">English</el-button>
		</el-col>
		
		<el-col :span="2">
			2020-2021 ®
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
			
			ZH () {
				this.$i18n.locale = 'zh'
			},
			EN () {
				this.$i18n.locale = 'en'
			}
			
		}
	}
</script>

<style>

</style>