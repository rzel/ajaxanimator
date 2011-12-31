Ext.onReady(function(){
    setTimeout(function(){
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({
            remove: true
        });
        
        setTimeout(function(){
           /*
            * moved to center.js
            * */
            /*
             * moved over to center.js
             * */
            
            //Ax.selectFrame(1, "Layer 1")
            if(Ax.wavesetup){
              Ax.wavesetup()
            }
            
            if (Ax.urlprefs.load) {
              setTimeout(function(){
                if(!window.ds){
                  window.ds = new Datastore("ajaxanimator");
                }
                ds.first(Ax.urlprefs.load, function(data){
                   Ax.autoimport(data.data);
                   Ax.msg("Auto Loaded From URL","Animation "+Ax.urlprefs.load+" has been automatically loaded.")
                })
              },100);
            }
            
            //Main Timeline initialization stuff, create, add alyer, add frames, select first one..
            
            //Ax.selectFrame(1, "Layer 1")
            //new Ext.ux.ToastWindow({delay: 1000});
			
            setTimeout(function(){
            
                //Ax.showTips();
                if (!window.developer) {
					if (Ax.v.dev) {
						//Ax.gs(1);
						/*
						new Ext.ux.ToastWindow({
							title: 'Testing Release',
							
							html: 'You are running an unstable testing release. ' +
							'It is not intended for normal use. Please report bugs and post ' +
							'comments about this release (build ' +
							Ax.v.build +
							') frequently. Happy Testing!'
						}).show(document);
            */
					}
					else {
						/*
            new Ext.ux.ToastWindow({
							title: 'Beta Release',
							delay: 10000,
							html: "There's a reason it's beta, there may be <i>a lot</i> of bugs, some more annoying than others. "+
							"So please report bugs, post comments, and be a nice person."
						}).show(document);
            */
					}
					
					if (Ext.isIE) {//you know I miss the days of saying "Error: YOUR BROWSER SUCKS!"
						//Ext.MessageBox.alert("Notes on Microsoft Internet Explorer", 
            //"Currently, support for Microsoft Internet Explorer (6/7/8) are only experimental. Some features do not work properly such as animation and playback of some specific animations. The issues are being fixed, but in the mean time, you may try out another browser such as <a href='http://getfirefox.com'>Firefox</a>, <a href='http://opera.com'>Opera</a>, or <a href='http://apple.com/safari'>Safari</a>.")
					}
					else {
						//Ax.showTips();
					}
				}
                
            }, 100)
            /*
            setTimeout(function(){
               // Ax.testserver();
                //really, this does nothing, so it shouldn't be used.
            }, 500)
			*/
        }, 150);
        
        
        
    }, 250);
})
