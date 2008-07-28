Ax.controls = {
    play: function(){
        Ax.viewport.findById("maintabpanel").activate(1)
        Ax.preview_increment();
    },
    pause: function(){
        Ax.viewport.findById("maintabpanel").activate(1)
        clearTimeout(Ax.preview_timeout);
        clearTimeout(Ax.preview_timeout);
        clearTimeout(Ax.preview_timeout);
    },
    next: function(){
        switch (Ax.viewport.findById("maintabpanel").getActiveTab().getId()) {
            case "canvas_tab":
                Ax.selectFrame(Ax.tcurrent.frame + 1, Ax.tcurrent.layer)
                break;
            case "preview_tab":
                Ax.preview_frame++;
                break;
        }
    },
    previous: function(){
        switch (Ax.viewport.findById("maintabpanel").getActiveTab().getId()) {
            case "canvas_tab":
                Ax.selectFrame(Ax.tcurrent.frame - 1, Ax.tcurrent.layer)
                break;
            case "preview_tab":
                Ax.preview_frame--;
                break;
        }
    },
    last: function(){
        //Ax.msg("No worky", "this doesn't work yet.")
        switch (Ax.viewport.findById("maintabpanel").getActiveTab().getId()) {
            case "canvas_tab":
                Ax.selectFrame(Ax.count_frames(), Ax.tcurrent.layer);
                break;
            case "preview_tab":
                Ax.preview_frame = Ax.count_frames();
                break;
        }
	},
    first: function(){
        switch (Ax.viewport.findById("maintabpanel").getActiveTab().getId()) {
            case "canvas_tab":
                Ax.selectFrame(1, Ax.tcurrent.layer);
                break;
            case "preview_tab":
                Ax.preview_frame = 1;
                break;
        }
    }
}
