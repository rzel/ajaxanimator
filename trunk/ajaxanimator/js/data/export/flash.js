/**
 * @author antimatter15
 *
 * Wow! Flash! isn't it all about this these days? Oh wait. wrong version
 * Who cares? Flash is everwhere. It may suck in some ways (cross-platformness)
 * but its better than the competition (*cough* silverlight *cough*)
 * 
 * This probably doesn't make much sense. I can't even make sense of this.
 * But IDK. this is just another comment on comments, which is now a commment on commments on comments
 * because meta-thinking is good, metacommenting should also be good.
 */
Ax.ex.swf = function(){ //normally this actually does something, but this is a rare occasion where nothign happens
    return false; //boo hoo
}

Ax.ex.swf.save = function(){ //savenessy
    Ax.msg("Notes on exporting to Flash", "Export to flash currently uses the limited freemovie library. Better flash export will be available later using another library such as Transform SWF. ");    
    Ax.ex.swf.check(); //start the magickal process
}


Ax.ex.swf.check = function(){
    Ext.Ajax.request({
        url: Ax.files.export_swf, //the magickal server
        params: {
            "action": "test" //I say magickal too much don't I?
        },
        success: function(e){ //when the magickalness happens
            if (e.responseText != "working") { //lets test if its working
                Ax.ex.swf.connect_fail(); //waaah! Its failing!
            } 
            else {
                //woot it passed preliminary tests!
                Ax.ex.swf.upload(); //awesome insane wootness!
            }
        },
        failure: function(){
            Ax.ex.swf.connect_fail(); //oh. sure. I don't believe you. If it fails then it fails? Nonsense
        }
        
    })
}

Ax.ex.swf.upload = function(){ //where the cool stuff happens
    Ext.Ajax.request({ //do Ajaxy stuffs
        url: Ax.files.export_swf, //uh, same file
        params: {
            "action": "work", //WORK!
            "width": Ax.canvasWidth,
            "height": Ax.canvasHeight,
            "animation": Ax.ex.array("json") //okay, so I did it, I made Ax.ex.array("json").
        },
        success: function(e){ //YESs!
            Ax.save.computer(e.responseText, Ax.animation.name + ".swf", true); //save to computer using magikalness
        },
        failure: function(){
            Ax.ex.swf.connect_fail(); //what? its not supposed to happen! I already did preliminary tests! or... did you cheat?
        }
    })
}

Ax.ex.swf.connect_fail = function(){
    Ax.toastMsg("Error!", "Connection to SWF (Flash) compilier failed!"); //YOU PHAIL!
}
