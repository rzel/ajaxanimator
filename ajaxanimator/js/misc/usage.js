//Usage statistics of the applicaiton

Ax.ustat = [];

Ax.gs = function(){
for(var i = 0; i < arguments.length; i++){
Ax.ustat.push(arguments[i])
}
}

//That's all folks!

//...okay... i lied, there's some more stat processing code...

Ax.ls = function(){
return Ax.ustat
}