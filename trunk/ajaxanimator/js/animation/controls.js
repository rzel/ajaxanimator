Ax.controls = {
  play: function(){
    Ax.msg("No worky","this doesn't work yet.")
  },
  pause: function(){
    Ax.msg("No worky","this doesn't work yet.")
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