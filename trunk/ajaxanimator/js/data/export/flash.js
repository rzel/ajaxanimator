/**
 * @author antimatter15
 * 
 * Wow! Flash! isn't it all about this these days? Oh wait. wrong version
 * Who cares? Flash is everwhere. It may suck in some ways (cross-platformness)
 * but its better than the competition (*cough* silverlight *cough*)
 */

 
 Ax.ex.swf = function(){
 	return false;
 }
 
 Ax.ex.swf.save = function(){
	Ext.MessageBox.alert("Notes on exporting to Flash","Expor to flash currently uses the limited freemovie library. Better flash export will be available later. Press OK to continue.", function(a){
	   Ax.ex.swf.check(); //start the process
	})
 }

 
 Ax.ex.swf.check = function(){
 	 	Ext.Ajax.request({
		url: Ax.files.export_swf,
		params: {
			"action": "test"
		},
		success: function(e){
			if(e.responseText != "working"){
				 Ax.ex.swf.connect_fail()
			}else{
				//woot it passed preliminary tests!
				Ax.ex.swf.upload();
			}
		},
		failure: function(){
			Ax.ex.swf.connect_fail()
		}
		
	})
 }
 
 Ax.ex.swf.upload = function(){
 	Ext.Ajax.request({
		url: Ax.files.export_swf,
		params: {
			"action": "work",
			"animation": Ext.util.JSON.encode(Ax.ex.array())
		},
		success: function(e){
			Ax.save.computer(e.responseText, Ax.animation.name+".swf", true);
		},
		failure: function(){
			Ax.ex.swf.connect_fail()
		}
	})
 }
 
 Ax.ex.swf.connect_fail = function(){
 	Ax.toastMsg("Error!","Connection to SWF (Flash) compilier failed!")
 }
