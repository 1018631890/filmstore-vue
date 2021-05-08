<template>
	<div>
		<el-menu router :default-active="'/'+$route.path.split('/')[1]" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
				<el-menu-item><i class="el-icon-eleme"></i><span>Film</span></el-menu-item>
				<el-menu-item index="/index">{{$t('common.Home')}}</el-menu-item>
				<el-menu-item index="/film">{{$t('common.Film')}}</el-menu-item>
				<el-submenu index="3">
				<template slot="title">{{$t('common.More')}}</template>
				<el-menu-item index="/center">{{$t('common.PersonalCenter')}}</el-menu-item>
				<el-menu-item index="/news">{{$t('common.News')}}</el-menu-item>
				<el-menu-item index="/about">{{$t('common.About')}}</el-menu-item>
				<el-menu-item @click.native="logout">{{$t('common.Logout')}}</el-menu-item>
				</el-submenu>
				<el-menu-item index="/admin" v-show="isAdmin">{{$t('common.Control')}}</el-menu-item>
				<!-- <el-menu-item @click.native="change">修改</el-menu-item> -->
		</el-menu>
		
		<div class="line">
			
		</div>
		
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
		return {
			activeIndex: '1',
			isAdmin: this.$store.state.isAdmin
			};
		},
		methods: {
			handleSelect(key, keyPath) {
			console.log(key, keyPath);
			},
			
			logout () {
				this.$store.dispatch("logout")
			},
			
			
			
			
		},
		mounted () {
		},
		
	}
</script>

<style>
</style>
