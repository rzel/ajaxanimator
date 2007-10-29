/*
function checkAnimationXML(axml){ // basic animationxml test
var dA = unescape(axml)
if(dA.indexOf("<") != -1 && dA.indexOf(">") != -1){
if(dA.indexOf("svg") != -1){
return "valid"
}
}
}
*/

function parseDiff(faXd,saXd){
	var sXd = saXd.cloneNode(true)
	var fXd = faXd.cloneNode(true)
	if(fXd.childNodes.length==sXd.childNodes.length){
		var lng = fXd.childNodes.length
		var plng = 0;
		for(var i = 0; i < fXd.childNodes.length; i++){
			var fcn = fXd.childNodes[i]
			var scn = sXd.childNodes[i]
			if(fcn.getAttribute("x")==scn.getAttribute("x")){
				if(fcn.getAttribute("y")==scn.getAttribute("y")){
					plng++
				}
			}
		}
		if(lng==plng){
			return "S1"
		}else{
			return "D2"
		}
	}else{
		return "D1"
	}
}