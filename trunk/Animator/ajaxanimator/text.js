var fontLibrary = {}



function textgui(){
Ext.MessageBox.prompt("Text","Font Name (case sensitive: Original, FontSwif, DOTS or lwrc)",function(a4,b4){
Ext.MessageBox.prompt("Text","Font Size",function(a1,b1){
Ext.MessageBox.prompt("Text","Enter Text",function(a2,b2){
Ext.MessageBox.prompt("Text","Upper Starting Point (X,Y Format)",function(a3,b3){
addText(b2,parseInt(b1),parseInt(b3.split(",")[0]),parseInt(b3.split(",")[1]),b4)
})
})
})
})
}


  
  function loadFont(fontName,olf){
  //Fonts As Of December 23 2007
  //Original - By Antimatter15
  //DOTS - By RandomProductions
  //FontSwif - By RandomProductions
  //lwrc - By Antimatter15
  if(fontLibrary[fontName]){
  olf(fontLibrary[fontName])
  }else{
  Ext.Ajax.request({
  url: "../php/loadFont.php",
  params: {fontname: fontName},
  success: function(e){
  fontLibrary[fontName]=Ext.util.JSON.decode(e.responseText)
  
  //Hack Fonts, in case some dumb characters are missing
  if(!fontLibrary[fontName][" "]){fontLibrary[fontName][" "]=[]}
  
  olf(fontLibrary[fontName])
  }
  })
  }
  }
  
  
  function listInstalledFonts(){
  Ext.Ajax.request({
  url: "../php/loadFont.php",
  params: {opt: "list"},
  success: function(e){
  Ext.MessageBox.alert("Installed Fonts:",e.responseText);
  }
  })
  }
  
  function addText(str,size,startx,starty,font){
  
  loadFont(font,function(db){
  for(var i = 0; i < str.split("").length; i++){
  if(db[str.split("")[i]]){
  addLetter(db[str.split("")[i]],size,startx+(size*6*i),starty)
  }else{
  addLetter(db["?"],size,startx+(size*6*i),starty)
  }
  }
  
  frameCheckEdit()
  })
  
  }
  
  function addLetter(a,size,startx,starty){
  for(var i = 0; i < a.length; i ++){
  macro.addshape({
  shape: "rect",
  fill: "rgb(255,0,0)",
  stroke: "rgb(0,0,0)",
  strokewidth: 1,
  height: size,
  width: size,
  x: startx+size*a[i][0],
  y: starty+size*a[i][1]
  })
  }
  }
  
  