Ext.onReady(function(){
setTimeout(function(){
  Ext.get('loading').remove();
  Ext.get('loading-mask').fadeOut({remove:true});

  setTimeout(function(){
    Ax.initTimeline()
    Ax.addLayer()
    Ax.addFrames(99)
    if(Ax.urlprefs.draw != "false"){
      //Ax.preinit();
      Ax.drawinit();
    }
    //Main Timeline initialization stuff, create, add alyer, add frames, select first one..

    Ax.selectFrame(1,"Layer 1")
    
    setTimeout(function(){
      
      //Ax.showTips();
      
      if(Ax.v.dev && !window.developer){
      //Ax.gs(1);
      new Ext.ux.ToastWindow({
        title: 'Testing Release',
        html: 'You are running an unstable testing release. '+
              'It is not intended for normal use. Please report bugs and post '+
              'comments about this release (build '+Ax.v.build+') frequently. Happy Testing!',
        iconCls: 'error'
      }).show(document);  
      Ax.showTips();
	  }else{
      }
	 
    },100)
	
	setTimeout(function(){
		Ax.testserver();
	},500)
  },150);

}, 250);
})
