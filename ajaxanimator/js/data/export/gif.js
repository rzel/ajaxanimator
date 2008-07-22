/**
 * @author antimatter15
 * 
 * Why not? Its good to bridge Vector and Raster tech.
 */

 
 Ax.ex.gif = function(){
 	return false;
 }
 
 Ax.ex.gif.save = function(){
	Ext.MessageBox.alert("Notes on exporting to Animated GIF","Export to Animated GIF is not complete, data such as images, paths, polygons, and rotation will not be exported. Press OK to continue.", function(a){
	   Ax.ex.gif.check(); //start the process
	})
 }

 
 Ax.ex.gif.check = function(){
 	 	Ext.Ajax.request({
		url: Ax.files.export_gif,
		params: {
			"action": "test"
		},
		success: function(e){
			if(e.responseText != "working"){
				 Ax.ex.gif.connect_fail()
			}else{
				//woot it passed preliminary tests!
				Ax.ex.gif.upload();
			}
		},
		failure: function(){
			Ax.ex.gif.connect_fail()
		}
		
	})
 }
 
 Ax.ex.gif.upload = function(){
 	Ext.Ajax.request({
		url: Ax.files.export_gif,
		params: {
			"action": "work",
			"animation": Ext.util.JSON.encode(Ax.ex.array())
		},
		success: function(e){
			Ax.save.computer(e.responseText, Ax.animation.name+".gif", true);
		},
		failure: function(){
			Ax.ex.gif.connect_fail()
		}
	})
 }
 
 Ax.ex.gif.connect_fail = function(){
 	Ax.toastMsg("Error!","Connection to GIF compilier failed!")
 }
