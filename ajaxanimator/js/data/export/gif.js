/**
 * @author antimatter15
 *
 * Why not? Its good to bridge Vector and Raster tech.
 * 
 * GIF is awesome, APNG is better, but nothing supports it
 * so whatever. GIF is here to stay, and its partly to blame
 * on IE 6.0 which sucks at transparent PNGs. darn you MSFT!
 */
Ax.ex.gif = function(){
    return false;//it turns out that the SWF generator was a copy+paste of this one.
    //but i decided to comment that one and ..... abandon this one. :(
}

Ax.ex.gif.save = function(){
    Ax.msg("Notes on exporting to Animated GIF", "Export to Animated GIF is not complete, data such as images and rotation will not be exported.")
    Ax.ex.gif.check(); //start the process
}


Ax.ex.gif.check = function(){
    Ext.Ajax.request({
        url: Ax.files.export_gif,
        params: {
            "action": "test"
        },
        success: function(e){
            if (e.responseText != "working") {
                Ax.ex.gif.connect_fail()
            }
            else {
                //woot it passed preliminary tests!
                Ax.ex.gif.upload();
            }
        },
        failure: function(){
            Ax.ex.gif.connect_fail(); //you know what would be really hardcore? making a rant and posting it here.
            /*
             * The folllowing space is reserved for a random rant.
             */
        }
        
    })
}

Ax.ex.gif.upload = function(){
    Ext.Ajax.request({
        url: Ax.files.export_gif,
        params: {
            "action": "work",
            "width": Ax.canvasWidth,
            "height": Ax.canvasHeight,
            "animation": Ax.ex.array("json")
        },
        success: function(e){
            Ax.save.computer(e.responseText, Ax.animation.name + ".gif", true);
        },
        failure: function(){
            Ax.ex.gif.connect_fail()
        }
    })
}

Ax.ex.gif.connect_fail = function(){
    Ax.toastMsg("Error!", "Connection to GIF compilier failed!")
}

