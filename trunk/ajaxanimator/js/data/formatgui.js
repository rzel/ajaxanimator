/*
 * all the remarkably interesting code that displays that box to show you the markup
 * that magical dialog that asks if it wants to steal all your private files on your drive
 * that cool box requesting to steal items on your clipboard
 * that field that attempts to steal your favorite sites
 * that stuff that goes on that tries to carpetbomb your desktop with random aliens :P
 * yep, all that magic takes place..... here.
 */




Ax.autoimport = function(markup){
    var jsonmarkup = Ax.test_animation_markup(markup);
    if (jsonmarkup != false) {
        if (jsonmarkup.revision) {
            if (Math.round(jsonmarkup.revision) > Ax.format.support.max) {
                Ax.msg("Warning! Proof of time travel", "It seems that the animation you are attempting to load was created with a future version of the ajax animator. It may contain data that can not be loaded properly in this version, or may load perfectly fine.")
            }
            if (Math.round(jsonmarkup.revision) < Ax.format.support.min) {
                Ax.msg("Warning!", "The animation you are attempting to load seems to be created by an older, unsupported version. It is more than likely some information here will not load properly.")
            }
        }
        Ax.import_animation(markup);
    }
    else {
        if (markup.indexOf(";;") != -1) {
            Ax.msg("Unable to load animation!", "The animation looks like data from the AXML format used by Ajax Animator 0.14.7 and below. It is not supported natively in this release due to the usage of a new format in 0.20+.")
        }
        else {
            Ax.msg("Unable to load animation!", "The animation could not be loaded because it is malformed. Check the data for corruption, or from an unsupported source.")
        }
    }
}


Ax.animationinfo = function(){
    //graphically displays metadata in animation, also some statistics, etc.
    
    
    (new Ext.Window({
        title: "Animation Info - " + Ax.animation.name,
        iconCls: "tb_about",
        width: 300,
        height: 200,
        html: "<b>" + Ax.animation.name + ":</b><br />Generator: " + Ext.util.JSON.encode(Ax.animation.markup.generator) +
        "<br />Creation Date: " +
        ((Ax.animation.markup.creation) ? Ax.animation.markup.creation : "Unknown") +
        "<br />Last Modified Date: " +
        ((Ax.animation.markup.modified) ? Ax.animation.markup.modified : "Unknown") +
        "<br />Contributors: " +
        ((Ax.animation.markup.contrib) ? Ax.animation.markup.contrib : ['Unknown']).join(",") +
        "<br />Size: " +
        Ax.export_animation(Ax.animation.markup, "json").length + 
		"<br />Layers: " + Ax.tstat.layers + 
		"<br />Frames: " + Ax.count_frames()
    
    })).show(document.body)
}
