<template>
	<el-card>
		<el-table :data="tableData1" style="width: 100%" row-key="id" :tree-props="{children: 'children'}">
			<el-table-column prop="date" label="日期" width="180" align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="180" align="center">
			</el-table-column>
			<el-table-column prop="address" label="地址" align="center">
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	export default {
		data () {
			return {
				tableData1: [{
						id: 1,
						date: '2016-05-02',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1518 弄',
						children: []
					},
					{
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					children: [
					{
						id: 31,
						date: '2020-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄',
						children: [
						{
							id: 33,
							date: '2020-05-32',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						}
						]
					},
					{
						id: 32,
						date: '2020-05-32',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄',
						children: [
						{
							id: 34,
							date: '2020-05-32',
							name: '王小虎',
							address: '上海市普陀区金沙江路 1519 弄'
						}
						]
					}
					]
				},
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					hasChildren: true
				},
				{
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		}
	}
</script>

<style>
</style>
