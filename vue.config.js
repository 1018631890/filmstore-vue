module.exports = {

    devServer: {

        port: 8081,      //运行端口地址
		   
		proxy: {        //代理
            //也有可能是proxyTable 
			'api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/api': 'http://localhost:8080'
				}
			}
		}

    },
};