/**
 * I sorta wish I knew scriptdoc...
 * but anywho, this (for now) checks wheter the server works
 * @author Kevin
 */


//YAY! Ajax for Ajax Animator which doesn't actually really get used often
Ax.ajax = function(params){
  //btw this mirrors Ax.ajax
  function ajaxfail(){
        //console.log(err)
    //XSS TIME!
    //Ax.msg("Trying Alternate Communication","Ajax Failed. Trying Gadgets API")
    
    if(params.req_type == "checkproxy"){
      params.success({
          responseText: "working",
          alt_url: Ax.files.xsave
        })
      return;
    }
    
    if(window.gadgets && gadgets.io && gadgets.io.makeRequest){
      //woot!
      
      //Ax.msg("Gadget API found","Trying stuff")
      gadgets.io.makeRequest(Ax.files.xserv + params.url, function(e){
       //Ax.msg("Got Data",e.text)
       
       //FUCK THIS IS HACKY!
        params.success({
            responseText: e.text
          })
      }, {
          POST_DATA:  gadgets.io.encodeValues(params.params),
          METHOD: gadgets.io.MethodType.POST
        })
      
    }else{
      //oh noes!
      if(params.old_fail){
        params.old_fail()
      }
      //donno what to do now.
    }
  }
  try{
    params.old_fail = params.failure;
    params.failure = ajaxfail;
    Ext.Ajax["request"] (params)
  }catch(err){
    ajaxfail()
  }
}



Ax.testserver = function(reset){
	if(reset){
		Ax.server_working = null;
	}
    if (!Ax.server_working) {
        Ax.ajax({
            url: Ax.files.test+"?m=working",
			method: "get",
            success: function(e){
                if (e.responseText.indexOf("working") != -1) {
                    Ax.server_working = true;
                }
                else {
                    Ax.server_working = false;
                }
            },
            failure: function(){
                Ax.server_working = false;
            }
        })
    }
    return Ax.server_working;
}
