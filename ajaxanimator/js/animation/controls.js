Ax.controls = {
  play: function(){
    Ax.viewport.findById("maintabpanel").activate(1)
    Ax.preview_increment();
  },
  pause: function(){
    Ax.viewport.findById("maintabpanel").activate(1)
	clearTimeout(Ax.preview_timeout)
  },
  next: function(){
    Ax.selectFrame(Ax.tcurrent.frame+1,Ax.tcurrent.layer)
  },
  previous: function(){
    Ax.selectFrame(Ax.tcurrent.frame-1,Ax.tcurrent.layer)
  },
  last: function(){
    Ax.msg("No worky","this doesn't work yet.")
  },
  first: function(){
    Ax.selectFrame(1,Ax.tcurrent.layer)
  }
}