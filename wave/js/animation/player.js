
Ax.player_increment = function(){
    var start = (new Date()).getTime();
    Ax.player_frame = Ax.viewer_load_frame( //load the next frame
	((Ax.player_frame) ? Ax.player_frame : 1), //if no current frame, load from the current editor frame
 	Ax.player_markup.layers, //the la magickal poop!
 	Ax.player //the canvas
	) +
    1;
    
    Ax.player_timeout = setTimeout(function(){
        Ax.player_increment()
    }, 1000 / ((Ax.player_markup.framerate) ? Ax.player_markup.framerate : 12));
}

Ax.player_play = function(){
    Ax.player_increment();
}
Ax.player_pause = function(){
    clearTimeout(Ax.player_timeout);
}

Ax.init_player = function(markup){
    //if (Ext.isIE == true) { //yes. i know. browser sniffing is bad
    //    $("playercanvas").style.position = "absolute";
    //    $("playercanvas").style.left = "5%";
    //}
    if (typeof markup == typeof "insanelygreat") {
        markup = Ext.util.JSON.decode(markup)
    }
    $("playercanvas").innerHTML = "";
    Ax.player = Ax.init_view($("playercanvas"), markup.width, markup.height);
    Ax.player_markup = markup;
    Ax.player_frame = null;
}

Ax.player_import = function(){
    Ax.viewport.findById("maintabpanel").activate(0)
    Ax.import_animation(Ax.player_markup);
}
