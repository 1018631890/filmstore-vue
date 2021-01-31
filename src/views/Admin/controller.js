import store from '../../store/index.js'

export function controller(page,type,data){
	// 电影界面的新增操作
	if(page==='filmcontroller'&&type=='add'){
		if(data.actors!==''&&data.name!==''&&data.time!==''&&data.will!==''&&data.abstract!=='')
		{
			store.dispatch("InsertFilm",data)
		}
	}
	
	// 电影界面的删除操作
	else if(page==='filmcontroller'&&type==='del')
	{
		if(data!=='')
		{
			store.dispatch("DeleteFilm",data)
		}
	}
		
}

// controller(page,type){
			// 	// 电影界面的新增操作
			// 	if(page==='filmcontroller'&&type=='add'){
			// 		if(this.filmform.actors!==''&&this.filmform.name!==''&&this.filmform.time!==''&&this.filmform.will!==''&&this.filmform.abstract!=='')
			// 		{
			// 			this.$store.dispatch("InsertFilm",this.filmform)
			// 			this.type = ''
			// 			this.dialogFilmVisible=false
			// 			this.$store.dispatch("getallfilm")
			// 		}
			// 	}
			// 	// 电影界面的删除操作
			// 	else if(page==='filmcontroller'&&type=='del')
			// 	{
			// 		console.log("1")
			// 	}
			// }

export default {controller}