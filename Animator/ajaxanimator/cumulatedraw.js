var c;
var _utils;
var currentColorMode="__textColor";
var saveBox;
var uploadBox;
var previousPaletteID="basic";
var prevShapeID="";
var toolbar_MENUBAR_1;
var toolbar_MENUBAR_2;
var toolbar_FILL_COLOR_ID=13;
var toolbar_FILL_COLOR_INDICATOR_ID=131;
var toolbar_LINE_COLOR_ID=17;
var toolbar_LINE_COLOR_INDICATOR_ID=171;
var toolbar_TEXT_COLOR_ID=2009;
var toolbar_TEXT_COLOR_INDICATOR_ID=20091;
var toolbar_LINE_WIDTH_ID=15;
var toolbar_LINE_STYLE=16;
var toolbar_OPACITY_ID=18;
var toolbar_GRADIENT_ID=19;
var toolbar_SHADOW_ID=21;
var toolbar_FONT_ID=2001;
var toolbar_FONT_SIZE_ID=2002;
var toolbar_BOLD_ID=2004;
var toolbar_ITALIC_ID=2005;
var toolbar_LEFT_ALIGN_ID=2006;
var toolbar_CENTER_ALIGN_ID=2007;
var toolbar_RIGHT_ALIGN_ID=2008;
var toolbar_TEXT_MODE_ID=200100;
var toolbar_LINE_MODE_ID=200101;
var toolbar_ORTHO_MODE_ID=200102;
var toolbar_CURVE_MODE_ID=200103;
var toolbar_SELECT_MODE_ID=200104;
var toolbar_ZOOM_TEXT_ID=200108;
var toolbar_DRAG_STARTED=false;
toolbar_DRAG_OVER=false;
var onMouseOverListener=null;
var dragDropObj=null;
toolbar_DRAG_CLONE_ID=null;
function createNew(){
var _1=confirm("Would you like to save your current work before starting a new drawing?\nClick Cancel to procced without saving");
if(_1==false){
c.reset();
}}
function upload(){

if(!uploadBox){
uploadBox=$("_uploadBox");
}uploadBox.style.position="absolute";
var _2=Element.getDimensions($("_body"));
uploadBox.style.marginLeft=(_2.width/2)-250;
uploadBox.style.marginTop="100";
uploadBox.style.visibility="visible";
uploadBox.style.zIndex=c.renderer.maxIndex+50;
$("__fileUploadId").value=createUUID();
cancelSave();
}
function startUpload(_3){
uploadBox.style.visibility="hidden";
var _4="UploadStatusProvider";
var id=$("__fileUploadId").value;
var _6="ID="+id;
var _7=new Ajax.Request(_4,{
method:"post",parameters:_6,onComplete:uploadComplete});
}
function uploadComplete(_8){
var _9=_8.responseText;
if(_9&&_9.indexOf("UPLOAD_COMPLETE:")>=0){
var _a=_9.split("<beginDrawObject>")[1];
var _b=c.getValidDocumentFromResponse(_a);
c.open(_b);
}else{
alert("Unable to process file due to server error"+_8.responseText);
}}
function cancelOpen(){
uploadBox=$("_uploadBox");
uploadBox.style.visibility="hidden";
}
function startSave(){
setHelp("Select the format and size for your save");
if(!saveBox){
saveBox=$("_saveBox");
}saveBox.style.position="absolute";
var _c=Element.getDimensions($("_body"));
saveBox.style.marginLeft=(_c.width/2)-250;
saveBox.style.marginTop="100";
saveBox.style.visibility="visible";
saveBox.style.zIndex=c.renderer.maxIndex+50;
cancelOpen();
}
function saveAs(){
setHelp("<font color='red'>Processing...Please Wait</font>");
var _d="";
if($("_JPEG").checked){
_d="JPG";
}else{
if($("_PNG").checked){
_d="PNG";
}else{
if($("_SVG").checked){
_d="SVG";
}else{
if($("_PDF").checked){
_d="PDF";
}else{
if($("_MMD").checked){
_d=c.renderer.EXTENSION;
}else{
alert("please select a download format");
return;
}}}}}var _e=c.getPageSize();
_e=_e.width+"x"+_e.height;
saveBox.style.visibility="hidden";
var _f="ImageProcessor";
var _10=screen.logicalXDPI/72;
var _11=getAllData(_d);
var _12=(_11.innerHTML)?_11.innerHTML:_11.xml;
var _13="DATA="+encodeURIComponent(_12)+"&SIZE="+_e+"&FORMAT="+_d+"&XDPI="+_10+"&TYPE="+c.renderer.TYPE;
var _14=new Ajax.Request(_f,{
method:"post",parameters:_13,onComplete:beginDownload});
var _15=(_12)?_12.length:0;
_15=_15/1024;
_15=Math.round(_15);
setHelp("<font color='red'><b>Sending "+_15+"KB to server, this may take a few seconds...</b></font>");
}
function getAllData(_16){
c.clearSystemShapes();
var _17=c.getZoom();
var _18=null;
if(c.renderer.TYPE!="SVG"){
c.setZoom((1/_17));
Try.these(c.renderer.savePolyLinePaths());
_18=c.getRealData();
}else{
_18=c.getRealData();
var _19=(_17*(1/_17)).toFixed(2);
c.setShapeZoom(_18,1,_17);
}if(c.renderer.TYPE!="SVG"){
c.setZoom(_17);
}var _1a=_18.getElementsByTagName("TEXTAREA")[0];
c.renderer.remove(_1a);
var _1b=_18.getElementsByTagName("div")[0];
c.renderer.remove(_1b);
var _1c=c.renderer.createElement("zoom-factor");
_1c.setAttribute("factor",_17);
c.appendPageAttribute(_18,_1c);
var _1d=c.getPageSize();
var _1e=c.renderer.createElement("page-size");
_1e.setAttribute("width",_1d.width);
_1e.setAttribute("height",_1d.height);
c.appendPageAttribute(_18,_1e);
return _18;
}
function cancelSave(){
saveBox=$("_saveBox");
saveBox.style.visibility="hidden";
}
function beginDownload(_1f){
saveBox.style.visibility="hidden";
var _20=_1f.responseText;
if(_20&&_20.indexOf("SUCCESS:")>=0){
setHelp("<font color='red'><b>Request Complete, starting download</font></b>");
var id=_20.split("SUCCESS:")[1];
var _22=$("__download");
var _23=$("_DOCUMENT_NAME").value;
if(_23&&_23.length>0){
_23="&DOCUMENT_NAME="+_23;
}else{
_23="";
}_22.src="ImageProvider"+"?ID="+id+_23;
}else{
alert("Unable to process file due to server error"+_1f.responseText);
}}
function buildPicker(){
var _24=Array("#FFFFFF","#EDEDED","#E4E4E4","#DADADA","#D1D1D1","#C7C7C7","#BDBDBD","#B3B3B3","#A8A8A8","#9E9E9E","#FF0010","#FFFE38","#76FF36","#00FFFF","#002CFD","#EF00FD","#FB0034","#FFF125","#00AE5F","#00B8EF","#00429A","#F30094","#939393","#878787","#7B7B7B","#6E6E6E","#626262","#535353","#444444","#343434","#202020","#000000","#FF9C86","#FFB18D","#FFC997","#FFF7A4","#D8E2A6","#B5D8A6","#91CFA6","#78D3CD","#08D6F7","#63AFDA","#709DCE","#7D8CC2","#9D90C2","#F8A1C6","#FE9EA5","#FF715C","#FF9363","#FFB26A","#FFF478","#C3D680","#96C981","#55BF84","#00C3BB","#00C7F3","#0097CE","#0080BC","#416AAD","#7E6BAF","#A66EAF","#F475AF","#FB7388","#FB0034","#FF6A35","#FF9936","#FFF125","#ADCB52","#62BC5B","#00AE5F","#00B2A6","#00B8EF","#0080C1","#0063AB","#00429A","#593C99","#923397","#F30094","#F90066","#AD001F","#B34A20","#B76B21","#C4A621","#748F3B","#408641","#007E46","#008076","#0083AB","#005A89","#00437B","#00256E","#421E6C","#68006B","#A90068","#AC0047","#8A0000","#8D3A00","#905400","#998402","#58712A","#2E6B31","#006535","#00665E","#006988","#00456D","#003162","#000258","#2F0056","#540054","#870052","#8A0035","#D3B7A1","#A88E80","#816E64","#625550","#463D3B","#D6A279","#B8855E","#9E6D49","#875735","#744524");
var Obj=document.getElementById("cpicker");
for(var i=0;
i<_24.length;
i++){
var _27=document.createElement("div");
_27.style.background=_24[i];
_27.onclick=selectColour;
_27.style.border="1px black";
Obj.appendChild(_27);
}}
function selectColour(){
$("cpicker").style.visibility="hidden";
if(currentColorMode==toolbar_TEXT_COLOR_ID){
setFontColor(this.style.backgroundColor);
}else{
if(currentColorMode==toolbar_FILL_COLOR_ID){
setFillColor(this.style.backgroundColor);
}else{
if(currentColorMode==toolbar_LINE_COLOR_ID){
setLineColor(this.style.backgroundColor);
}}}}
function displayShapeProperties(){
var _28=Position.cumulativeOffset($("_surround"));
var _29=Element.getDimensions($("_surround")).width;
var x=_28[0]-120+(_29*1);
var y=_28[1];
displayFloatingDiv("shapeProperties","<center><font size='2px'>Properties</font></center>",110,220,x,y);
}
function updatePageSize(){
var _2c=$("_pageWidth").value;
var _2d=$("_pageHeight").value;
c.setPageSize(_2c,_2d);
}
function initializeEditor(){
_utils=new CLUtilities();
var _2e;
ie=navigator.appVersion.match(/MSIE (\d\.\d)/);
opera=(navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
if((!ie)||(opera)){
_2e=new SVGRenderer();
}else{
_2e=new VMLRenderer();
$("_surround").style.width="100%";
$("_surround").style.height="86%";
}createMenubar();
var _2f=new Spry.Widget.Accordion("sampleAccordion");
displayShapeProperties();
c=new CDEditor(document.getElementById("CDEditor"),_2e);
c.onselect=onSelect;
c.onunselect=onUnselect;
c.editCommand("fillcolor","white");
c.editCommand("linecolor","black");
c.editCommand("linewidth","1px");
setZoom(0.8);
c.setMode("select");
buildPicker();
loadPalette("basic");
loadRefreshData();
c.updateShapeInfo();
dragDropObj=new DHTMLgoodies_dragDrop();
dragDropObj.addSource("dragTarget",true,true,true,null,"beginShapeDrag");
dragDropObj.addTarget("CDEditor","dropItems");
dragDropObj.setSlide(false);
dragDropObj.init();
dragDropObj.setSlide(false);
}
function createMenubar(){
var _30=new DHTMLSuite.menuModel();
_30.addItemsFromMarkup("menuModel");
_30.init();
toolbar_MENUBAR_1=new DHTMLSuite.menuBar();
toolbar_MENUBAR_1.addMenuItems(_30);
toolbar_MENUBAR_1.setTarget("toolbar");
toolbar_MENUBAR_1.init();
toolbar_MENUBAR_1.setMenuItemState(toolbar_FILL_COLOR_INDICATOR_ID,"disabled");
toolbar_MENUBAR_1.setMenuItemState(toolbar_LINE_COLOR_INDICATOR_ID,"disabled");
setMenuItemWidth(toolbar_FILL_COLOR_INDICATOR_ID,5);
setMenuItemWidth(toolbar_LINE_COLOR_INDICATOR_ID,5);
var _31=new DHTMLSuite.menuModel();
_31.addItemsFromMarkup("menuModel2");
_31.init();
toolbar_MENUBAR_2=new DHTMLSuite.menuBar();
toolbar_MENUBAR_2.addMenuItems(_31);
toolbar_MENUBAR_2.setTarget("toolbar2");
toolbar_MENUBAR_2.init();
toolbar_MENUBAR_2.setMenuItemState(toolbar_ZOOM_TEXT_ID,"disabled");
toolbar_MENUBAR_2.setMenuItemState(toolbar_TEXT_COLOR_INDICATOR_ID,"disabled");
setMenuItemWidth(toolbar_TEXT_COLOR_INDICATOR_ID,5);
}
function showSplashScreen(_32){
if(_32){
var _33=$("_splashScreen");
var dim=Element.getDimensions($("_body"));
_33.style.marginLeft=(dim.width/2)-300;
_33.style.marginTop="200";
_33.style.visibility="visible";
_33.style.position="absolute";
_33.style.zIndex=400;
}else{
$("_splashScreen").style.zIndex=0;
$("_splashScreen").style.visibility="hidden";
}}document.onselectstart=function(_35){
if(c&&c.isTextEditMode()){
return true;
}return false;
};
function setSplashScreenMessage(_36){
$("_splashMessage").innerHTML=_36;
}
function loadRefreshData(){
setSplashScreenMessage("Checking data on server");
var url="ImageProcessor";
var _38="REQUEST_TYPE=PAGE_LOAD";
var _39=new Ajax.Request(url,{
method:"post",parameters:_38,onComplete:loadRefreshComplete});
}
function loadRefreshComplete(_3a){
setSplashScreenMessage("Recieved server response");
var _3b=_3a.responseText;
if(_3b){
var _3c=_3b;
var div=c.getValidDocumentFromResponse(_3c);
c.open(div);
}setSplashScreenMessage("Finished Processing server response");
}
function storeData(){
var url="ImageProcessor";
var _3f=getAllData(c.renderer.EXTENSION);
var _40=(_3f.innerHTML)?_3f.innerHTML:_3f.xml;
var _41="DATA="+encodeURIComponent(_40)+"&REQUEST_TYPE=PAGE_UNLOAD";
var _42=new Ajax.Request(url,{
method:"post",parameters:_41});
}
function setShapeMode(_43,_44){
_43=getModeFromItem(_43);
if(_43=="line"||_43=="ortho-line"||_43=="curve-line"){
setHelp("<font color='red'>Connector Mode:</font>To Draw the connector, move your mouse over to the drawing area, click and drag");
}else{
if(_43=="text"){
setHelp("<font color='red'>Text Mode:</font>To Draw the Text shape, move your mouse over to the drawing area, click and drag");
}else{
if(_43=="select"){
setHelp("<font color='red'>Select Mode</font>");
}else{
setHelp("To Draw this shape, move your mouse over to the drawing area, click and drag");
}}}setMode(_43,_44);
}
function zoomIn(){
setZoom(1.25);
}
function zoomOut(){
setZoom(0.8);
}
function setZoom(_45){
c.editCommand("zoom",_45);
toolbar_MENUBAR_2.setText(toolbar_ZOOM_TEXT_ID,(c.getZoom()*100).toFixed(0)+"%");
}
function getModeFromItem(_46){
if(!_46.modelItemRef){
return _46;
}var id=_46.modelItemRef.id;
if(id==toolbar_LINE_MODE_ID){
return "line";
}else{
if(id==toolbar_ORTHO_MODE_ID){
return "ortho-line";
}else{
if(id==toolbar_CURVE_MODE_ID){
return "curve-line";
}else{
if(id==toolbar_TEXT_MODE_ID){
return "text";
}else{
if(id==toolbar_SELECT_MODE_ID){
return "select";
}}}}}}
function setMode(_48,_49){
c.editCommand("mode",_48);
if(_48=="line"){
setMenuItemSelected(toolbar_LINE_MODE_ID,true);
setMenuItemSelected(toolbar_TEXT_MODE_ID,false);
setMenuItemSelected(toolbar_ORTHO_MODE_ID,false);
setMenuItemSelected(toolbar_CURVE_MODE_ID,false);
setMenuItemSelected(toolbar_SELECT_MODE_ID,false);
return;
}else{
if(_48=="ortho-line"){
setMenuItemSelected(toolbar_LINE_MODE_ID,false);
setMenuItemSelected(toolbar_TEXT_MODE_ID,false);
setMenuItemSelected(toolbar_ORTHO_MODE_ID,true);
setMenuItemSelected(toolbar_CURVE_MODE_ID,false);
setMenuItemSelected(toolbar_SELECT_MODE_ID,false);
return;
}else{
if(_48=="text"){
setMenuItemSelected(toolbar_LINE_MODE_ID,false);
setMenuItemSelected(toolbar_TEXT_MODE_ID,true);
setMenuItemSelected(toolbar_ORTHO_MODE_ID,false);
setMenuItemSelected(toolbar_CURVE_MODE_ID,false);
setMenuItemSelected(toolbar_SELECT_MODE_ID,false);
return;
return;
}else{
if(_48=="curve-line"){
setMenuItemSelected(toolbar_LINE_MODE_ID,false);
setMenuItemSelected(toolbar_TEXT_MODE_ID,false);
setMenuItemSelected(toolbar_ORTHO_MODE_ID,false);
setMenuItemSelected(toolbar_CURVE_MODE_ID,true);
setMenuItemSelected(toolbar_SELECT_MODE_ID,false);
return;
return;
}else{
if(_48=="select"){
setMenuItemSelected(toolbar_LINE_MODE_ID,false);
setMenuItemSelected(toolbar_TEXT_MODE_ID,false);
setMenuItemSelected(toolbar_ORTHO_MODE_ID,false);
setMenuItemSelected(toolbar_CURVE_MODE_ID,false);
setMenuItemSelected(toolbar_SELECT_MODE_ID,true);
return;
}else{
setMenuItemSelected(toolbar_LINE_MODE_ID,false);
setMenuItemSelected(toolbar_TEXT_MODE_ID,false);
setMenuItemSelected(toolbar_ORTHO_MODE_ID,false);
setMenuItemSelected(toolbar_CURVE_MODE_ID,false);
setMenuItemSelected(toolbar_SELECT_MODE_ID,true);
var _4a=$(prevShapeID);
if(_4a){
_4a.style.border="0";
}$(_48).style.bordercolor="#0000ff";
$(_48).style.border="2px solid";
prevShapeID=_48;
}}}}}}
function setMenuItemSelected(id,_4c){
if(_4c){
$("menuItemIcon"+id).style.backgroundColor="#FFEEC2";
$("menuItemIcon"+id).name="on";
}else{
$("menuItemIcon"+id).style.backgroundColor="";
$("menuItemIcon"+id).name="off";
}}
function isMenuItemSelected(id){
var _4e=$("menuItemIcon"+id).name;
if(_4e&&_4e=="on"){
return true;
}}
function setIndicatorColor(id,_50){
if(id&&_50){
$("DHTMLSuite_menuItem"+id).style.backgroundColor=_50;
}}
function setMenuItemWidth(id,_52){
if(id&&_52){
$("DHTMLSuite_menuItem"+id).style.padding="0";
$("DHTMLSuite_menuItem"+id).style.width=_52;
}}
function setGrid(_53){
var _54=_53.options[_53.selectedIndex].value;
var _55=$("_page");
if(_54=="Grid"){
$("_page").style.backgroundImage="url(images/grid.jpg)";
}else{
$("_page").style.backgroundImage="";
}}
function deleteShape(){
setHelp("You can also use the delete key on the keyboard");
c.deleteSelection();
}
function cutShape(){
setHelp("To cut, you can also use <b>CTRL+X</b>");
c.cut();
}
function copyShape(){
setHelp("To copy, you can also use <b>CTRL+C</b>");
c.copy();
}
function pasteShape(){
setHelp("To paste, you can also use <b>CTRL+V</b>");
c.paste();
}
function setFillColor(_56){
c.editCommand("fillcolor",_56);
setIndicatorColor(toolbar_FILL_COLOR_INDICATOR_ID,_56);
}
function setLineColor(_57){
c.editCommand("linecolor",_57);
setIndicatorColor(toolbar_LINE_COLOR_INDICATOR_ID,_57);
}
function setLineWidth(_58){
c.editCommand("linewidth",_58);
toolbar_MENUBAR_1.setText(toolbar_LINE_WIDTH_ID,_58);
}
function setLineDashStyle(_59){
c.editCommand("linedashstyle",_59);
}
function setOpacity(_5a){
c.editCommand("opacity",_5a);
toolbar_MENUBAR_1.setText(toolbar_OPACITY_ID,"Opacity: "+_5a);
}
function setShadow(_5b){
c.editCommand("shadow",_5b);
if(_5b=="true"){
_5b="On";
}else{
_5b="Off";
}toolbar_MENUBAR_1.setText(toolbar_SHADOW_ID,"Shadow: "+_5b);
}
function setGradient(_5c){
c.editCommand("gradient",_5c);
toolbar_MENUBAR_1.setText(toolbar_GRADIENT_ID,"Gradient: "+_5c);
}
function formatFontFamilyForDisplay(_5d){
if(!_5d||_5d.length==0){
return "Font";
}_5d=_5d.replace(/'/,"");
_5d=_5d.replace(/'/,"");
return "<font face='"+_5d+"'>"+_5d+"</font>";
}
function setFontFamily(_5e){
c.editCommand("fontFamily",_5e);
_5e=formatFontFamilyForDisplay(_5e);
toolbar_MENUBAR_2.setText(toolbar_FONT_ID,_5e);
}
function setFontSize(_5f){
c.editCommand("fontSize",_5f);
toolbar_MENUBAR_2.setText(toolbar_FONT_SIZE_ID,"Size: "+_5f+"px");
}
function setFontColor(_60){
c.editCommand("fontColor",_60);
setIndicatorColor(toolbar_TEXT_COLOR_INDICATOR_ID,_60);
}
function flipBold(){
c.editCommand("bold",null);
var _61=isMenuItemSelected(toolbar_BOLD_ID);
setMenuItemSelected(toolbar_BOLD_ID,!_61);
}
function flipItalics(){
c.editCommand("italic",null);
var _62=isMenuItemSelected(toolbar_ITALIC_ID);
setMenuItemSelected(toolbar_ITALIC_ID,!_62);
}
function setAlign(_63){
c.editCommand("align",_63);
if(_63=="left"){
setMenuItemSelected(toolbar_LEFT_ALIGN_ID,true);
}else{
setMenuItemSelected(toolbar_LEFT_ALIGN_ID,false);
}if(_63=="center"){
setMenuItemSelected(toolbar_CENTER_ALIGN_ID,true);
}else{
setMenuItemSelected(toolbar_CENTER_ALIGN_ID,false);
}if(_63=="right"){
setMenuItemSelected(toolbar_RIGHT_ALIGN_ID,true);
}else{
setMenuItemSelected(toolbar_RIGHT_ALIGN_ID,false);
}}
function sendToBack(){
c.sendToBack();
}
function bringToFront(){
c.bringToFront();
}
function getOptionByValue(_64,_65){
if(!_64){
return;
}for(var i=0;
i<_64.length;
i++){
if(_64.options[i].value==_65){
return i;
}}return -1;
}
function showColorPalette(img){
var _68=$("cpicker");
var _69=Position.cumulativeOffset(img.divElement);
_68.style.visibility="visible";
_68.style.position="absolute";
_68.style.overflow="visible";
_68.style.left=_69[0];
_68.style.top=_69[1];
_68.style.zIndex=100;
currentColorMode=img.modelItemRef.id;
}
function formatLineWidthForDisplay(_6a){
var _6b="";
if(!_6a||_6a.length==0){
return _6b;
}if(_6a.indexOf("px")<1){
return _6b;
}var num=_6a.split("px")[0];
num=Math.round(num);
_6b=_6b+num+"px";
return _6b;
}
function onSelect(){
toolbar_MENUBAR_1.setText(toolbar_LINE_WIDTH_ID,formatLineWidthForDisplay(c.queryCommand("linewidth")));
toolbar_MENUBAR_1.setText(toolbar_OPACITY_ID,"Opacity: "+c.queryCommand("opacity"));
toolbar_MENUBAR_1.setText(toolbar_GRADIENT_ID,"Gradient: "+c.queryCommand("gradient"));
var _6d=c.queryCommand("shadow");
var _6e=c.queryCommand("fillcolor");
setIndicatorColor(toolbar_FILL_COLOR_INDICATOR_ID,_6e);
var _6f=c.queryCommand("linecolor");
setIndicatorColor(toolbar_LINE_COLOR_INDICATOR_ID,_6f);
if(_6d=="true"){
_6d="On";
}else{
_6d="Off";
}toolbar_MENUBAR_1.setText(toolbar_SHADOW_ID,"Shadow: "+_6d);
var _70=c.queryCommand("font");
toolbar_MENUBAR_2.setText(toolbar_FONT_ID,formatFontFamilyForDisplay(_70.family));
var _71="";
if(_70.size&&_70.size.length>0){
_71=_70.size+"px";
}toolbar_MENUBAR_2.setText(toolbar_FONT_SIZE_ID,"Size: "+_71);
if(_70.bold=="bold"){
setMenuItemSelected(toolbar_BOLD_ID,true);
}else{
setMenuItemSelected(toolbar_BOLD_ID,false);
}if(_70.italics=="italic"){
setMenuItemSelected(toolbar_ITALIC_ID,true);
}else{
setMenuItemSelected(toolbar_ITALIC_ID,false);
}if(_70.align=="left"){
setMenuItemSelected(toolbar_LEFT_ALIGN_ID,true);
}else{
setMenuItemSelected(toolbar_LEFT_ALIGN_ID,false);
}if(_70.align=="center"){
setMenuItemSelected(toolbar_CENTER_ALIGN_ID,true);
}else{
setMenuItemSelected(toolbar_CENTER_ALIGN_ID,false);
}if(_70.align=="right"){
setMenuItemSelected(toolbar_RIGHT_ALIGN_ID,true);
}else{
setMenuItemSelected(toolbar_RIGHT_ALIGN_ID,false);
}setIndicatorColor(toolbar_TEXT_COLOR_INDICATOR_ID,_70.color);
}
function onUnselect(){
onSelect();
}
function setLineStyle(_72){
c.editCommand("linestyle",_72);
}
function setHelp(_73){
$("help").innerHTML=_73;
}
function loadPalette(id){
if(!$(id)){
return;
}var _75=$(previousPaletteID);
if(_75){
var _76=_75.firstChild;
if(_76){
c.renderer.remove(_76);
}_75.innerHTML="Loading, Please Wait";
hideDragTarget();
}var div=$(id);
var _78=div.getElementsByTagName("div");
if(_78.length==0){
var _79=c.loadPalette(id);
div.innerHTML=_79.xml;
previousPaletteID=id;
}}
function updateShapeProperties(){
var _7a=$("_width").value;
var _7b=$("_height").value;
var x=$("_x").value;
var y=$("_y").value;
var _7e=$("_rotation").value;
c.updateShape(_7a,_7b,x,y,_7e);
}
function isNumberKey(evt){
var _80=(evt.which)?evt.which:event.keyCode;
if(_80>31&&(_80<48||_80>57)){
return false;
}return true;
}
function openWindow(url,_82,_83){
window.open(url,"_help","height="+_82+",width="+_83+",left=100,top=100,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,status=no");
}
function saveToDelicious(){
window.open("http://del.icio.us/post?v=4&noui&jump=close&url="+encodeURIComponent("http://www.cumulatelabs.com")+"&title="+encodeURIComponent("Cumulate Draw"),"delicious","toolbar=no,width=700,height=400");
}
function showDragTarget(img){
setMode("select");
var _85=$("dragTarget");
var _86=Position.cumulativeOffset(img);
var _87=Position.realOffset(_85);
var _88=Position.realOffset(img);
_85.style.left=_86[0]-_88[0]+_87[0]+5;
_85.style.top=_86[1]-_88[1]+_87[1]+5;
var _89=_85.getElementsByTagName("img")[0];
var src=img.getAttribute("src");
_89.setAttribute("src",src);
$("dragImage").setAttribute("src",src);
_85.style.visibility="visible";
_85.setAttribute("srcId",img.id);
setHelp("To draw this shape, drag it to the drawing area");
}
function hideDragTarget(){
var _8b=$("dragTarget");
_8b.style.visibility="hidden";
}
function beginShapeDrag(_8c){
toolbar_DRAG_STARTED=true;
toolbar_DRAG_CLONE_ID=_8c;
if(!onMouseOverListener){
onMouseOverListener=createNewShape.bindAsEventListener(this);
}Event.observe(c.container,"mouseover",onMouseOverListener);
}
function dropItems(_8d,_8e,x,y){
if(toolbar_DRAG_STARTED){
createNewShape(null,x,y);
}c.endCreateNewShape();
}
function createNewShape(_91,x,y){
if(toolbar_DRAG_STARTED){
toolbar_DRAG_STARTED=false;
Event.stopObserving(c.container,"mouseover",onMouseOverListener);
var id=$("dragTarget").getAttribute("srcId");
var _95=$(toolbar_DRAG_CLONE_ID);
_95.style.visibility="hidden";
var _96;
var _97;
if(_91){
_96=Event.pointerX(_91);
_97=Event.pointerY(_91);
}else{
_96=x;
_97=y;
}var _98=$(id);
var _99=_98.getAttribute("render-width");
var _9a=_98.getAttribute("render-height");
var _9b=_98.getAttribute("render-shadow");
if(!_99){
_99=100;
}if(!_9a){
_9a=100;
}if(_9b&&_9b=="off"){
_9b=false;
}else{
_9b=true;
}dragDropObj.__stop_dragDropElement(toolbar_DRAG_CLONE_ID);
c.createNewShape(id,_96,_97,_99*c.zoom,_9a*c.zoom,true,_9b);
}}
function cancelDragShape(){
toolbar_DRAG_STARTED=false;
Event.stopObserving(c.container,"mouseover",onMouseOverListener);
}
function startImageWizard(){
setHelp("Insert image");
var _9c=$("__imageURLWizard");
_9c.style.position="absolute";
var dim=Element.getDimensions($("_body"));
_9c.style.marginLeft=(dim.width/2)-300;
_9c.style.marginTop="100";
_9c.style.visibility="visible";
_9c.style.zIndex=c.renderer.maxIndex+50;
$("__imageURLMessage").innerHTML=" ";
var _9e=$("__imageURL");
_9e.focus="true";
if(_9e.value==null||_9e.value.length==0){
$("__imageURL").value="http://www.cumulatelabs.com/cumulatedraw/images/logo-small.gif";
}}
function cancelImageInsert(){
var _9f=$("__imageURLWizard");
_9f.style.visibility="hidden";
}
function insertImage(){
var url=$("__imageURL").value;
if(!url||url.length==0){
$("__imageURLMessage").innerHTML="Please provide a valid image URL ";
}else{
var _a1=150+c.container.parentNode.scrollLeft;
var top=150+c.container.parentNode.scrollTop;
c.createNewImage(url,_a1,top,150,150);
cancelImageInsert();
}}
function alignLeft(){
c.align("LEFT");
}
function alignTop(){
c.align("TOP");
}
function alignRight(){
c.align("RIGHT");
}
function alignBottom(){
c.align("BOTTOM");
}
function alignHorizontalCenter(){
c.align("HORIZONTAL_CENTER");
}
function alignVerticalCenter(){
c.align("VERTICAL_CENTER");
}
function AbstractRenderer(){
this.VML_SVG_NAMESPACE="VML_SVG";
this.SVG_ROOT_ID="SVG_ROOT";
this.TRACKER_COLOR="rgb(99,175,218)";
this.multipleSelector=null;
this.MULTIPLE_SELECTOR_TRACKER_ID="multiple-select-tracker";
this.MULTIPLE_SELECTOR_TRACKER_SHAPE_ID="multiple-select-tracker-shape";
this.MULTIPLE_SELECTOR_DUMMY_ID="multiple-select-dummy";
this.MULTIPLE_SELECTOR_DUMMY_SHAPE_ID="multiple-select-dummy-shape";
this.TEXT_TEMPLATE_PREFIX="text:template";
this.IMAGE_TEMPLATE="image";
}AbstractRenderer.prototype.init=function(_a3){
};
AbstractRenderer.prototype.bounds=function(_a4){
return {
x:0,y:0,width:0,height:0};
};
AbstractRenderer.prototype.create=function(_a5,_a6,_a7,_a8,_a9,top,_ab,_ac,_ad,_ae){
};
AbstractRenderer.prototype.createImage=function(_af,_b0,top,_b2,_b3){
};
AbstractRenderer.prototype.remove=function(_b4){
};
AbstractRenderer.prototype.move=function(_b5,_b6,top){
};
AbstractRenderer.prototype.fineMove=function(_b8,_b9,_ba){
};
AbstractRenderer.prototype.getShapeFromEventSource=function(_bb){
};
AbstractRenderer.prototype.getConnectorFromX=function(_bc){
};
AbstractRenderer.prototype.getConnectorFromY=function(_bd){
};
AbstractRenderer.prototype.getConnectorToX=function(_be){
};
AbstractRenderer.prototype.getConnectorToY=function(_bf){
};
AbstractRenderer.prototype.setWidth=function(_c0,_c1){
};
AbstractRenderer.prototype.setHeight=function(_c2,_c3){
};
AbstractRenderer.prototype.setX=function(_c4,_c5){
};
AbstractRenderer.prototype.setY=function(_c6,top){
};
AbstractRenderer.prototype.getAllShapes=function(doc){
};
AbstractRenderer.prototype.getAllConnectors=function(doc){
};
AbstractRenderer.prototype.resize=function(_ca,_cb,_cc,toX,toY){
};
AbstractRenderer.prototype.editCommand=function(_cf,cmd,_d1){
};
AbstractRenderer.prototype.queryCommand=function(_d2,cmd){
};
AbstractRenderer.prototype.showTracker=function(_d4){
};
AbstractRenderer.prototype.updateTracker=function(_d5){
};
AbstractRenderer.prototype.getMarkup=function(){
return null;
};
AbstractRenderer.prototype.fineRotateSelection=function(_d6,_d7){
};
AbstractRenderer.prototype.rotate=function(_d8,_d9){
};
AbstractRenderer.prototype.setCursor=function(_da,_db){
};
AbstractRenderer.prototype.setFillColor=function(_dc,_dd){
};
AbstractRenderer.prototype.setShapeText=function(_de,_df,_e0,_e1,_e2){
};
AbstractRenderer.prototype.getShapeText=function(_e3){
};
AbstractRenderer.prototype.clearShapeText=function(_e4){
};
AbstractRenderer.prototype.sendToBack=function(_e5){
};
AbstractRenderer.prototype.bringToFront=function(_e6){
};
AbstractRenderer.prototype.updateZIndex=function(_e7){
};
AbstractRenderer.prototype.setLineStyle=function(_e8,_e9){
};
AbstractRenderer.prototype.getLineStyle=function(_ea){
};
AbstractRenderer.prototype.setStrokeWidth=function(_eb,_ec){
};
AbstractRenderer.prototype.getStrokeWidth=function(_ed){
};
AbstractRenderer.prototype.isConnector=function(_ee){
};
AbstractRenderer.prototype.createLine=function(_ef,_f0,_f1,_f2,top,_f4,_f5){
};
AbstractRenderer.prototype.moveLine=function(_f6,toX,toY,_f9){
};
AbstractRenderer.prototype.moveLinePoint=function(_fa,toX,toY,_fd){
};
AbstractRenderer.prototype.moveLineWithShape=function(_fe){
};
AbstractRenderer.prototype.showConnectionPoints=function(_ff){
};
AbstractRenderer.prototype.connectLine=function(_100,line,_102){
};
AbstractRenderer.prototype.savePolyLinePaths=function(){
};
AbstractRenderer.prototype.appendPageAttribute=function(div,att){
};
AbstractRenderer.prototype.getRealData=function(){
};
AbstractRenderer.prototype.updateRotation=function(_105){
};
AbstractRenderer.prototype.getAllSubShapes=function(_106){
};
AbstractRenderer.prototype.getShapeSubject=function(_107){
};
AbstractRenderer.prototype.appendChild=function(_108,_109){
_108.appendChild(_109);
return _109;
};
AbstractRenderer.prototype.getMultipleSelector=function(){
this.multipleSelector=$(this.MULTIPLE_SELECTOR_TRACKER_ID);
if(this.multipleSelector==null){
this.multipleSelector=this.createMultipleSelector();
}this.bringToFront(this.multipleSelector);
this.multipleSelector=$(this.MULTIPLE_SELECTOR_TRACKER_ID);
return this.multipleSelector;
};
AbstractRenderer.prototype.hideMultipleSelector=function(){
var _10a=this.getMultipleSelector();
this.setX(_10a,0);
this.setY(_10a,0);
this.setWidth(_10a,0);
this.setHeight(_10a,0);
};
AbstractRenderer.prototype.getBoundingBox=function(_10b){
if(!_10b){
return;
}var rect=new Object();
if(this.isConnector(_10b)){
var _10d=this.bounds(_10b);
rect["x"]=Math.min(_10d.x,_10d.x2);
rect["y"]=Math.min(_10d.y,_10d.y2);
rect["width"]=Math.abs(_10d.x-_10d.x2);
rect["height"]=Math.abs(_10d.y-_10d.y2);
}else{
rect=this.bounds(_10b);
if(rect.rotation==0){
rect.x=parseInt(rect.x);
rect.y=parseInt(rect.y);
rect.width=parseInt(rect.width);
rect.height=parseInt(rect.height);
}else{
var left=this.getRotatedPoint(rect.x,rect.y,rect);
var _10f=this.getRotatedPoint(rect.x,(rect.y*1)+(rect.height*1),rect);
var _110=this.getRotatedPoint((rect.x*1)+(rect.width*1),(rect.y*1),rect);
var _111=this.getRotatedPoint((rect.x*1)+(rect.width*1),(rect.y*1)+(rect.height*1),rect);
var x=Math.min(Math.min(left.x,_10f.x),Math.min(_110.x,_111.x));
var y=Math.min(Math.min(left.y,_10f.y),Math.min(_110.y,_111.y));
var xMax=Math.max(Math.max(left.x,_10f.x),Math.max(_110.x,_111.x));
var yMax=Math.max(Math.max(left.y,_10f.y),Math.max(_110.y,_111.y));
rect.x=x;
rect.y=y;
rect.width=xMax-x;
rect.height=yMax-y;
}}return rect;
};
AbstractRenderer.prototype.getMultipleSelectorDummyShape=function(){
this.multipleSelectorDummyShape=$(this.MULTIPLE_SELECTOR_DUMMY_ID);
if(this.multipleSelectorDummyShape==null){
this.multipleSelectorDummyShape=this.createMultipleSelectorDummyShape();
}this.multipleSelectorDummyShape=$(this.MULTIPLE_SELECTOR_DUMMY_ID);
return this.multipleSelectorDummyShape;
};
AbstractRenderer.prototype.hideMultipleSelectorDummyShape=function(){
var _116=this.getMultipleSelectorDummyShape();
this.setX(_116,0);
this.setY(_116,0);
this.setWidth(_116,0);
this.setHeight(_116,0);
};
AbstractRenderer.prototype.isMultipleSelect=function(_117){
return (_117&&_117.id==this.MULTIPLE_SELECTOR_DUMMY_ID);
};
AbstractRenderer.prototype.resizeWidth=function(_118,_119,_11a,_11b,_11c,_11d,_11e){
var _11f=((_119-_11b)*(_119-_11b))+((_11a-_11c)*(_11a-_11c));
_11f=Math.sqrt(_11f);
var _120=this.bounds(_118);
var _121=_120.rotation;
if(!_121||_121=="undefined"){
_121=0;
}_121=_121%360;
var snpX=(_119*Math.cos((Math.PI/180)*(-_121)))-(_11a*Math.sin((Math.PI/180)*(-_121)));
var _123=(_11b*Math.cos((Math.PI/180)*(-_121)))-(_11c*Math.sin((Math.PI/180)*(-_121)));
if(snpX<_123&&(_11e)){
_11f=-_11f;
}else{
if(snpX>_123&&(!_11e)){
_11f=-_11f;
}}var _124=_11d;
_124=(_124*1)+_11f;
if(_124<1){
return false;
}var obj=null;
if(_11e){
obj=this.getRotatedPoint(_120.x,_120.y,_120);
}else{
obj=this.getRotatedPoint((_120.x*1)+(_120.width*1),(_120.y*1)+(_120.height*1),_120);
}this.setWidth(_118,_124);
var _126=this.bounds(_118);
var _127=null;
if(_11e){
_127=this.getRotatedPoint(_126.x,_126.y,_126);
}else{
_127=this.getRotatedPoint((_126.x*1)+(_126.width*1),(_126.y*1)+(_126.height*1),_126);
}var _128=Math.round(obj.x)-Math.round(_127.x);
var _129=Math.round(obj.y)-Math.round(_127.y);
this.setX(_118,(_126.x*1)+_128);
this.setY(_118,(_126.y*1)+_129);
this.updateRotation(_118);
};
AbstractRenderer.prototype.resizeHeight=function(_12a,_12b,_12c,_12d,_12e,_12f,_130){
var _131=((_12c-_12e)*(_12c-_12e))+((_12b-_12d)*(_12b-_12d));
_131=Math.sqrt(_131);
var _132=this.bounds(_12a);
var _133=_132.rotation;
if(!_133||_133=="undefined"){
_133=0;
}_133=_133%360;
var snpY=(_12c*Math.cos((Math.PI/180)*(-_133)))+(_12b*Math.sin((Math.PI/180)*(-_133)));
var _135=(_12e*Math.cos((Math.PI/180)*(-_133)))+(_12d*Math.sin((Math.PI/180)*(-_133)));
if(snpY<_135&&_130){
_131=-_131;
}else{
if(snpY>_135&&(!_130)){
_131=-_131;
}}var _136=_12f;
_136=(_136*1)+_131;
if(_136<1){
return false;
}var obj=null;
if(_130){
obj=this.getRotatedPoint(_132.x,_132.y,_132);
}else{
obj=this.getRotatedPoint((_132.x*1)+(_132.width*1),(_132.y*1)+(_132.height*1),_132);
}this.setHeight(_12a,_136);
var _138=this.bounds(_12a);
var _139=null;
if(_130){
_139=this.getRotatedPoint(_138.x,_138.y,_138);
}else{
_139=this.getRotatedPoint((_138.x*1)+(_138.width*1),(_138.y*1)+(_138.height*1),_138);
}var _13a=Math.round(obj.x)-Math.round(_139.x);
var _13b=Math.round(obj.y)-Math.round(_139.y);
this.setX(_12a,(_138.x*1)+_13a);
this.setY(_12a,(_138.y*1)+_13b);
this.updateRotation(_12a);
};
AbstractRenderer.prototype.moveCompleteLine=function(_13c,_13d,_13e,_13f){
if(!this.isConnector(_13c)){
return;
}var type=_13d.type;
var _141=(_13d.x*1)+_13e;
var _142=(_13d.y*1)+_13f;
var toX=(_13d.x2*1)+_13e;
var toY=(_13d.y2*1)+_13f;
this.moveLine(_13c,_141,_142,true);
this.moveLine(_13c,toX,toY,false);
if(type=="curve-line"){
var _145=(_13d.controlX*1)+_13e;
var _146=(_13d.controlY*1)+_13f;
var _147=(_13d.controlX2*1)+_13e;
var _148=(_13d.controlY2*1)+_13f;
this.setControl1(_13c,_145,_146);
this.setControl2(_13c,_147,_148);
}};
AbstractRenderer.prototype.getConnectorCenterPoint=function(_149){
var _14a=this.bounds(_149);
var type=this.getConnectorType(_149);
var obj=new Object();
if(type=="line"){
obj.x=((_14a.x*1)+(_14a.x2*1))/2;
obj.y=((_14a.y*1)+(_14a.y2*1))/2;
}else{
if(type=="curve-line"){
var _14d=((_14a.controlX*1)+(_14a.controlX2*1))/2;
var _14e=((_14a.controlY*1)+(_14a.controlY2*1))/2;
var _14f=((_14a.x*1)+(_14a.x2*1))/2;
var _150=((_14a.y*1)+(_14a.y2*1))/2;
obj.x=((_14d*1)+(_14f))/2;
obj.y=((_14e*1)+(_150))/2;
}else{
if(type=="ortho-line"){
var _14a=this.getOrthoLineCenterSegment(_149);
obj.x=((_14a.x*1)+(_14a.x2*1))/2;
obj.y=((_14a.y*1)+(_14a.y2*1))/2;
}}}return obj;
};
AbstractRenderer.prototype.getConnectorTextSize=function(_151,_152,zoom,_154){
var text=null;
var font=_154;
if(_152){
text=_152;
}else{
text=this.getShapeText(_151);
}if(font==null){
font=this.getFont(_151);
}if(font.size.length==0){
this.fillUpFont(font);
font.size=font.size*zoom;
}var _157=1;
var last=0;
while(true){
last=text.indexOf("\n",last+1);
if(last==-1){
break;
}_157++;
}var _159=_157*font.size*1.5;
var _15a=text.split("\n");
var _15b=50;
for(var i=0;
i<_15a.length;
i++){
if(_15a[i].length*font.size/2>_15b){
_15b=_15a[i].length*font.size/2;
}}_15b=(_15b*1)+10;
var obj=new Object();
obj.width=_15b;
obj.height=_159;
return obj;
};
AbstractRenderer.prototype.calculateOrthoLinePath=function(_15e,_15f,_160,toX,toY){
var _163=this.getClearancePoints(_15e,_15f,_160,toX,toY,true);
var _164=this.getClearancePoints(_15e,toX,toY,_163[_163.length-1].x,_163[_163.length-1].y,false);
var x1=_163[_163.length-1].x;
var y1=_163[_163.length-1].y;
var x2=_164[_164.length-1].x;
var y2=_164[_164.length-1].y;
var obj=new Object();
obj.x=x1;
obj.y=y2;
_163[_163.length]=obj;
for(var i=_164.length-1;
i>=0;
i--){
_163[_163.length]=_164[i];
}var path="";
for(var i=0;
i<_163.length;
i++){
path+=_163[i].x+",";
path+=_163[i].y+",";
}return path;
};
AbstractRenderer.prototype.getClearancePoints=function(line,_16d,_16e,toX,toY,_171){
var TOP=0;
var _173=1;
var _174=2;
var LEFT=3;
var _176=12;
var _177=new Array();
var obj=new Object();
obj.x=_16d;
obj.y=_16e;
_177[_177.length]=obj;
var _179=this.getConnectionShape(line,_171);
if(!$(_179.shapeid)){
return _177;
}var _17a=$(_179.shapeid);
var _17b=this.bounds(_17a);
var loc=this.getConnectionPointLocation(_17a,_179.shapepoint,_17b);
var _17d=this.getRotatedClearancePoints(_17b,loc,_176);
var _17e=(parseInt((_17b.rotation)/90)+(loc*1))%4;
obj=new Object();
if(_17e==TOP){
var _17f=Math.abs(_16e-toY)/2;
if(_17f<_176){
_17f=_176;
}obj.y=_177[_177.length-1].y-_176;
obj.x=_177[_177.length-1].x;
}else{
if(_17e==_174){
var _17f=Math.abs(_16e-toY)/2;
if(_17f<_176){
_17f=_176;
}obj.y=_177[_177.length-1].y+_176;
obj.x=_177[_177.length-1].x;
}else{
if(_17e==_173){
var _17f=Math.abs(_16d-toX)/2;
if(_17f<_176){
_17f=_176;
}obj.x=_177[_177.length-1].x+_176;
obj.y=_177[_177.length-1].y;
}else{
if(_17e==LEFT){
var _17f=Math.abs(_16d-toX)/2;
if(_17f<_176){
_17f=_176;
}obj.x=_177[_177.length-1].x-_176;
obj.y=_177[_177.length-1].y;
}}}}_177[_177.length]=obj;
if(_17e==TOP&&obj.y<toY){
var _180=new Object();
if(toX<_16d){
_180.x=toX>((_17d[0].x*1)-_176)?toX:((_17d[0].x*1)-_176);
}else{
_180.x=toX<((_17d[1].x*1)+(_176*1))?toX:((_17d[1].x*1)+(_176*1));
}_180.y=obj.y;
_177[_177.length]=_180;
}else{
if(_17e==_174&&obj.y>toY){
var _180=new Object();
if(toX<_16d){
_180.x=toX>((_17d[1].x*1)-(_176*1))?toX:((_17d[1].x*1)-(_176*1));
}else{
_180.x=toX<((_17d[0].x*1)+(_176*1))?toX:((_17d[0].x*1)+(_176*1));
}_180.y=obj.y;
_177[_177.length]=_180;
}else{
if(_17e==_173&&obj.x>toX){
var _180=new Object();
if(toY<_16e){
_180.y=toY>((_17d[0].y*1)-_176)?toY:((_17d[0].y*1)-_176);
}else{
_180.y=toY<((_17d[1].y*1)+(_176*1))?toY:((_17d[1].y*1)+(_176*1));
}_180.x=obj.x;
_177[_177.length]=_180;
}else{
if(_17e==LEFT&&obj.x<toX){
var _180=new Object();
if(toY<_16e){
_180.y=toY>((_17d[1].y*1)-_176)?toY:((_17d[1].y*1)-_176);
}else{
_180.y=toY<((_17d[0].y*1)+(_176*1))?toY:((_17d[0].y*1)+(_176*1));
}_180.x=obj.x;
_177[_177.length]=_180;
}}}}return _177;
};
AbstractRenderer.prototype.getConnectionPointLocation=function(_181,_182,_183){
var TOP=0;
var _185=1;
var _186=2;
var LEFT=3;
var _188=this.getNamespacedElement(_181,"c","connection-point")[_182];
var x=this.getAttribute(_188,"x");
var y=this.getAttribute(_188,"y");
x=(_183.x*1)+(_183.width*(x/this.COORD_X));
y=(_183.y*1)+(_183.height*(y/this.COORD_Y));
if(x<(_183.x*1+_183.width/2)){
return LEFT;
}else{
if(x>(_183.x*1)+(_183.width/2)){
return _185;
}else{
if(y<=_183.y){
return TOP;
}else{
return _186;
}}}};
AbstractRenderer.prototype.getRotatedClearancePoints=function(_18b,loc,_18d){
var TOP=0;
var _18f=1;
var _190=2;
var LEFT=3;
var _192=new Array();
_192[_192.length]=new Object();
_192[_192.length]=new Object();
if(loc==TOP){
_192[0].x=_18b.x;
_192[0].y=_18b.y;
_192[1].x=(_18b.x*1)+(_18b.width*1);
_192[1].y=_18b.y;
}else{
if(loc==_18f){
_192[0].x=(_18b.x*1)+(_18b.width*1);
_192[0].y=_18b.y;
_192[1].x=(_18b.x*1)+(_18b.width*1);
_192[1].y=(_18b.y*1)+(_18b.height*1);
}else{
if(loc==_190){
_192[0].x=(_18b.x*1)+(_18b.width*1);
_192[0].y=(_18b.y*1)+(_18b.height*1);
_192[1].x=(_18b.x*1);
_192[1].y=(_18b.y*1)+(_18b.height*1);
}else{
_192[0].x=(_18b.x*1);
_192[0].y=(_18b.y*1)+(_18b.height*1);
_192[1].x=(_18b.x*1);
_192[1].y=(_18b.y*1);
}}}return _192;
};
AbstractRenderer.prototype.getConnectionShape=function(line,_194){
var _195=this.getNamespacedElement(line,"c","connection");
var _196="";
var _197="";
for(var i=0;
i<_195.length;
i++){
var type=this.getAttribute(_195[i],"type");
if(_194&&type=="from"){
_196=this.getAttribute(_195[i],"shapeid");
_197=this.getAttribute(_195[i],"shapepoint");
}else{
if(!_194&&type=="to"){
_196=this.getAttribute(_195[i],"shapeid");
_197=this.getAttribute(_195[i],"shapepoint");
}}}var obj=new Object();
obj.shapeid=_196;
obj.shapepoint=_197;
return obj;
};
AbstractRenderer.prototype.moveLineWithShape=function(_19b){
if(!_19b){
return;
}var rect=this.bounds(_19b);
var left=rect["x"];
var top=rect["y"];
var _19f=rect["width"];
var _1a0=rect["height"];
var _1a1=parseInt(left*1)+parseInt(_19f/2);
var _1a2=parseInt(top*1)+parseInt(_1a0/2);
var _1a3=rect["rotation"];
if(!_1a3){
_1a3=0;
}coordX=1000;
coordY=1000;
var _1a4=this.getNamespacedElement(_19b,"c","connection");
for(var i=0;
i<_1a4.length;
i++){
var _1a6=_1a4.item(i);
var _1a7=_1a6.parentNode;
var _1a8=_1a6.getAttribute("lineid");
var _1a9=_1a6.getAttribute("type");
var conX=(left*1)+((_1a7.getAttribute("x")/this.COORD_X)*_19f);
var conY=(top*1)+((_1a7.getAttribute("y")/this.COORD_Y)*_1a0);
conX=conX-_1a1;
conY=conY-_1a2;
var _1ac=((conX*Math.cos((Math.PI/180)*(_1a3)))-(conY*Math.sin((Math.PI/180)*(_1a3)))*1)+(_1a1*1);
var _1ad=((conX*Math.sin((Math.PI/180)*(_1a3)))+(conY*Math.cos((Math.PI/180)*(_1a3)))*1)+(_1a2*1);
if(_1a9=="to"){
this.moveLine($(_1a8),_1ac,_1ad,false);
}else{
this.moveLine($(_1a8),_1ac,_1ad,true);
}}};
AbstractRenderer.prototype.getAllConnectorsForShape=function(_1ae){
if(!_1ae){
return;
}var _1af=this.getNamespacedElement(_1ae,"c","connection");
var _1b0=new Array();
for(var i=0;
i<_1af.length;
i++){
var _1b2=_1af.item(i);
var _1b3=_1b2.parentNode;
var _1b4=_1b2.getAttribute("lineid");
if($(_1b4)){
_1b0[_1b0.length]=$(_1b4);
}}return _1b0;
};
AbstractRenderer.prototype.connectLineToShapeByPointIndex=function(_1b5,line,_1b7,_1b8){
var _1b9=this.getNamespacedElement(_1b5,"c","connection-point");
_1b9=_1b9[parseInt(_1b8)];
this.connectLineToShape(_1b5,line,_1b7,_1b9,_1b8);
};
AbstractRenderer.prototype.connectLineToShape=function(_1ba,line,_1bc,_1bd,_1be){
if(!_1ba||!line||(_1be<0)){
return;
}var _1bf=this.getNamespacedElement(line,"c","connection");
for(var i=0;
i<_1bf.length;
i++){
var node=_1bf.item(i);
var type=node.getAttribute("type");
if(type==_1bc){
node.setAttribute("shapeid",_1ba.id);
node.setAttribute("shapepoint",_1be);
var doc=this.container.ownerDocument;
var _1c4=this.createElement("c:connection","CUMULATE_LABS");
_1c4.setAttribute("lineid",line.id);
_1c4.setAttribute("type",_1bc);
_1bd.appendChild(_1c4);
}}};
AbstractRenderer.prototype.disconnectLineFromShape=function(line,_1c6){
if(!line){
return;
}var _1c7=this.getNamespacedElement(line,"c","connection");
for(var i=0;
i<_1c7.length;
i++){
var node=_1c7.item(i);
var type=node.getAttribute("type");
if(type==_1c6){
var _1cb=node.getAttribute("shapeid");
var _1cc=node.getAttribute("shapepoint");
if(_1cb&&_1cb.length>0){
var _1cd=$(_1cb);
if(_1cd){
setHelp("Disconnected line from shape");
var _1ce=this.getNamespacedElement(_1cd,"c","connection-point").item(_1cc*1);
var _1cf=this.getNamespacedElement(_1ce,"c","connection");
for(var i=0;
i<_1cf.length;
i++){
var _1d0=_1cf.item(i);
if((_1d0.getAttribute("lineid")==line.id)&&(_1d0.getAttribute("type")==type)){
this.remove(_1d0);
break;
}}}node.setAttribute("shapeid","xx");
node.setAttribute("shapepoint","-1");
}}}};
AbstractRenderer.prototype.getCenterPoint=function(_1d1){
if(_1d1){
var left=_1d1.x;
var top=_1d1.y;
var _1d4=_1d1.width;
var _1d5=_1d1.height;
var obj=new Object();
obj.centerX=(left*1)+(_1d4/2);
obj.centerY=(top*1)+(_1d5/2);
return obj;
}};
AbstractRenderer.prototype.getRotatedPoint=function(conX,conY,_1d9){
var _1da=_1d9.rotation;
var _1db=this.getCenterPoint(_1d9);
var _1dc=_1db.centerX;
var _1dd=_1db.centerY;
conX=conX-_1dc;
conY=conY-_1dd;
var obj=new Object();
obj.x=((conX*Math.cos((Math.PI/180)*(_1da)))-(conY*Math.sin((Math.PI/180)*(_1da)))*1)+(_1dc*1);
obj.y=((conX*Math.sin((Math.PI/180)*(_1da)))+(conY*Math.cos((Math.PI/180)*(_1da)))*1)+(_1dd*1);
return obj;
};
AbstractRenderer.prototype.setShapeText=function(_1df,text,font,_1e2,_1e3,_1e4){
var _1e5=_1e3;
if(!_1e5){
_1e5=this.getFont(_1df);
}if(_1e5.size==""||_1e2){
_1e5.size=font.size;
}if(_1e5.color==""){
_1e5.color=font.color;
}if(_1e5.family==""){
_1e5.family=font.family;
}if(_1e5.align==""){
_1e5.align=font.align;
}if(_1e5.bold==""){
_1e5.bold=font.bold;
}if(_1e5.italics==""){
_1e5.italics=font.italics;
}var _1e6=_1e5.size;
var _1e7=_1e5.size*_1e4;
_1e5.size=_1e7;
var rect=this.getTextBounds(_1df,text,_1e4,_1e5);
var _1e9=rect["width"];
var _1ea=rect["height"];
var x=rect["x"];
var y=rect["y"];
if(_1e9<25){
_1e9=25;
}if(_1ea==0){
_1ea=1;
}var cpl=((_1e9/_1e7))*2;
cpl=Math.ceil(cpl);
var _1ee=text.wordWrap(cpl,this.LINE_DELIMITER,false);
var _1ef=this.createTextSet(_1ee);
if(_1ef.length==0){
return false;
}var _1f0=this.createLines(_1ef,cpl);
var _1f1=Math.ceil(_1f0.length/2);
var _1f2=null;
if(this.isConnector(_1df)){
_1f2=this.handleConnectorTextLinePositioning(_1ea,_1e9,x,y,_1f1,_1e7,_1f0,_1e5,_1df);
}else{
_1f2=this.handleTextLinePositioning(_1ea,_1e9,x,y,_1f1,_1e7,_1f0,_1e5,_1df);
}var _1f3=new Object();
_1f3.type=_1df.id;
_1f3.text="";
_1e5.size=_1e6;
_1f2[_1f2.length]=this.createTextShape(_1f3,false,x,y,x,y,_1e5,_1df);
if(this.isConnector(_1df)){
this.handleConnectorTextBackgroundPositioning(_1df,rect,text);
}for(var i=0;
i<_1f2.length;
i++){
_1f2[i]=this.appendChild(_1df,_1f2[i]);
}var _1f5=this.setTextData(_1df,text);
};
AbstractRenderer.prototype.getConnectorBackgroundShape=function(_1f6){
var _1f7=null;
if(_1f6.getElementsByTagName("rect").length>0){
_1f7=_1f6.getElementsByTagName("rect")[0];
}else{
_1f7=this.createElement("rect",this.VML_SVG_NAMESPACE);
_1f7.style.position="absolute";
this.setFillColor(_1f6,"white");
this.setOpacity(_1f6,"1.0");
var _1f8=this.getShapeSubject(_1f6);
_1f7.style.zIndex=_1f8.style.zIndex;
this.setStrokeWidth(_1f7,"0px");
}return _1f7;
};
AbstractRenderer.prototype.setTextData=function(_1f9,text){
if(!text){
text="";
}var _1fb=this.getNamespacedElement(_1f9,"c","textData");
var _1fc=$A(_1fb);
for(var i=0;
i<_1fc.length;
i++){
var node=_1fc[i];
this.remove(node);
}var _1ff=this.createElement("c:textData","CUMULATE_LABS");
var _200=this.container.ownerDocument.createComment(_utils.encodeHTML(text));
_1ff.appendChild(_200);
_1ff.setAttribute("version","0.3.7");
_1ff=this.appendChild(_1f9,_1ff);
};
AbstractRenderer.prototype.getShapeText=function(_201,_202){
if(!_201){
return;
}var _203=document.getElementById("text:dummy"+_201.id);
if(_203){
return this.getShapeTextDeprecated(_201,_202);
}var _204=this.getNamespacedElement(_201,"c","textData");
var _205=null;
if(_204.length>0){
_205=_204[0].getAttribute("version");
}if(_204.length==0||_205==null||_205==""){
return this.getShapeTextDeprecated(_201,_202);
}else{
var _206=_204[0].firstChild;
if(_206==null){
return "";
}var text=_206.nodeValue;
if(_205=="0.3.6"){
text=unescape(text);
}else{
text=_utils.decodeHTML(text);
}return text;
}};
AbstractRenderer.prototype.getShapeTextDeprecated=function(_208,_209){
if(!_208){
return null;
}var _20a=document.getElementById("text:dummy"+_208.id);
if(_20a){
return _20a.string;
}else{
var _20b="";
var _20c=this.getNamespacedElement(_208,"c","textData");
for(var i=0;
i<_20c.length;
i++){
_20b+=_20c[i].getAttribute("string");
}return _20b;
}};
AbstractRenderer.prototype.createLines=function(_20e,_20f){
var _210=new Array();
for(var i=0;
i<_20e.length;
i++){
var _212=_20e[i];
if(_212.length<_20f){
var _213=new Object();
_213.text=_212;
_213.type="normal";
_210[_210.length]=_213;
}else{
var _214=Math.floor((_212.length/_20f));
var _215=_212.length%_20f;
var j=0;
for(j=0;
j<_214;
j++){
var line=_212.substr((j*_20f),_20f);
var _213=new Object();
_213.text=line;
if(j==0){
_213.type="newline";
}else{
_213.type="normal";
}_210[_210.length]=_213;
}if(_215>0){
var line=_212.substr((j*_20f),_215);
var _213=new Object();
_213.text=line;
if(_214==0){
_213.type="newline";
}else{
_213.type="normal";
}_210[_210.length]=_213;
}}}return _210;
};
AbstractRenderer.prototype.getTextBounds=function(_218,_219,_21a,font){
if(this.isConnector(_218)){
var _21c=this.getConnectorCenterPoint(_218);
var _21d=this.getConnectorTextSize(_218,_219,_21a,font);
var _21e=new Object();
_21e.width=_21d.width;
_21e.height=_21d.height;
_21e.x=(_21c.x-_21e.width/2);
_21e.y=(_21c.y-_21e.height/2);
return _21e;
}else{
var rect=this.bounds(_218);
var _220=this.getNamespacedElement(_218,"c","text-bound");
if(_220.length==0){
return rect;
}else{
var _21e=rect;
var _221=_220[0];
var x=this.getAttribute(_221,"fromX");
var y=this.getAttribute(_221,"fromY");
var x2=this.getAttribute(_221,"toX");
var y2=this.getAttribute(_221,"toY");
var newX=(x*_21e.width/1000)+(_21e.x*1);
var newY=(y*_21e.height/1000)+(_21e.y*1);
var _228=(x2-x)*(_21e.width/1000);
var _229=(y2-y)*(_21e.height/1000);
_21e.x=_21e.left=newX;
_21e.y=_21e.top=newY;
var _21d=this.getConnectorTextSize(_218,_219,_21a,font);
_21e.width=_21d.width;
_21e.height=_21d.height;
return _21e;
}}};
AbstractRenderer.prototype.createTextSet=function(text){
var _22b=new Array();
if(!text||text.length==0){
return _22b;
}else{
_22b=text.split(this.LINE_DELIMITER);
return _22b;
}};
AbstractRenderer.prototype.fillUpFont=function(font){
if(font.size==""){
font.size=16;
}if(font.family==""){
font.family="'arial'";
}if(font.italics==""){
font.italics="normal";
}if(font.bold==""){
font.bold="normal";
}if(font.align==""){
font.align="center";
}if(font.color==""){
font.color="black";
}};
AbstractRenderer.prototype.remove=function(_22d){
if(_22d){
Element.remove(_22d);
}};
AbstractRenderer.prototype.getHandles=function(_22e){
var _22f=new Array();
if(!_22e){
return _22f;
}var _230=this.getNamespacedElement(_22e,"c","handle");
if(_230.length==0){
return _22f;
}var box=this.bounds(_22e);
for(var i=0;
i<_230.length;
i++){
var _233=this.createElement("rect",this.VML_SVG_NAMESPACE);
var _234=_230[i].getAttribute("x");
var _235=_230[i].getAttribute("y");
this.setHandleAttributes(_234,_235,_233,box);
_22f[_22f.length]=_233;
}return _22f;
};
AbstractRenderer.prototype.getShapeHandleLocation=function(_236,_237){
if(!_236){
return;
}var obj=new Object();
var _239=this.getNamespacedElement(_236,"c","handle")[_237];
obj.x=_239.getAttribute("x");
obj.y=_239.getAttribute("y");
return obj;
};
AbstractRenderer.prototype.updateShapeHandle=function(_23a,_23b,_23c,_23d,_23e,_23f,_240,_241){
if(!_23a){
return;
}var _242=this.bounds(_23a);
var _243=_242.rotation;
var sX=(_240*Math.cos((Math.PI/180)*(-_243)))-(_241*Math.sin((Math.PI/180)*(-_243)));
var mX=(_23e*Math.cos((Math.PI/180)*(-_243)))-(_23f*Math.sin((Math.PI/180)*(-_243)));
var sY=(_241*Math.cos((Math.PI/180)*(-_243)))+(_240*Math.sin((Math.PI/180)*(-_243)));
var mY=(_23f*Math.cos((Math.PI/180)*(-_243)))+(_23e*Math.sin((Math.PI/180)*(-_243)));
var _248=sX-mX;
var _249=sY-mY;
var _24a=this.getNamespacedElement(_23a,"c","handle")[_23b];
var x=(_23c*1)+(_248*Math.round(1000/_242.width));
var y=(_23d*1)+(_249*Math.round(1000/_242.height));
var xMin=_24a.getAttribute("xrange").split(",")[0];
var xMax=_24a.getAttribute("xrange").split(",")[1];
var yMin=_24a.getAttribute("yrange").split(",")[0];
var yMax=_24a.getAttribute("yrange").split(",")[1];
var _23c=_24a.getAttribute("x");
var _23d=_24a.getAttribute("y");
if(x>xMin&&x<xMax){
_24a.setAttribute("x",x);
}if(y>yMin&&y<yMax){
_24a.setAttribute("y",y);
}this.updateHandleTracker(_23a,_24a,_23b,_242);
var dx=Math.round(_24a.getAttribute("x")-_23c);
var dy=Math.round(_24a.getAttribute("y")-_23d);
this.updateShapeSegments(_23a,_24a,dx,dy);
};
AbstractRenderer.prototype.updateShapeSegments=function(_253,_254,dx,dy){
var _257=this.getNamespacedElement(_254,"c","adjust");
for(var _258=0;
_258<_257.length;
_258++){
var _259=_257[_258];
var vals=_259.getAttribute("val");
var _25b=_259.getAttribute("shapenum");
vals=vals.split(",");
var _25c=_259.getAttribute("templateNum");
if(_25c==null||_25c==""){
_25c=0;
}var _25d=this.getNamespacedElement(_253,"c","handle-template")[_25c];
var _25e=_25d.getAttribute("pathTemplate");
for(var i=0;
i<vals.length;
i++){
var _260=vals[i];
var id=_260.split(":")[0];
var _262=_260.split(":")[1];
var _263=new RegExp(id+":[-]*[0-9]*","g");
var _264=_25e.match(_263);
_264=_264[0];
var _265=_264.split(":")[1];
if(_262=="dx"){
_265=(_265*1)+(dx*1);
}else{
if(_262=="dy"){
_265=(_265*1)+(dy*1);
}else{
if(_262=="-dx"){
_265=(_265*1)-(dx*1);
}else{
if(_262=="-dy"){
_265=(_265*1)-(dy*1);
}}}}_25e=_25e.replace(_263,id+":"+_265);
}_25d.setAttribute("pathTemplate",_25e);
var _266=_25e.replace(/[0-9]*@[0-9]*:/g,"");
this.updateShapePath(_253,_266,_25b);
}};
function SelectedShapes(){
}SelectedShapes.prototype.init=function(_267){
this.bbox=new Object();
this.selectedShapeMap=new Object();
this.selectedShapeBounds=new Object();
this.renderer=_267;
this.mouseDownX=0;
this.mouseDownY=0;
this.idHighest=null;
this.idLowest=null;
};
SelectedShapes.prototype.recalculateBounds=function(){
this.setSelectedShapes(this.getShapes());
};
SelectedShapes.prototype.reset=function(){
this.bbox.x=null;
this.bbox.y=null;
this.bbox.width=null;
this.bbox.height=null;
this.bbox.right=null;
this.bbox.bottom=null;
this.selectedShapeMap=new Object();
this.selectedShapeBounds=new Object();
this.idLowest=null;
this.idHighest=null;
};
SelectedShapes.prototype.setSelectedShapes=function(_268){
this.reset();
for(var i=0;
i<_268.length;
i++){
this.addShape(_268[i],this.renderer.getBoundingBox(_268[i]));
}};
SelectedShapes.prototype.addShape=function(_26a,bbox){
if(!_26a||_26a.id==null){
return;
}var _26c=this.bbox.x;
var _26d=this.bbox.y;
if(!this.selectedShapeMap[_26a.id]){
this.selectedShapeMap[_26a.id]=_26a;
}if(this.bbox.x==null||(bbox.x<this.bbox.x)){
this.bbox.x=bbox.x;
this.idLowest=_26a.id;
}if(this.bbox.y==null||bbox.y<this.bbox.y){
this.bbox.y=bbox.y;
this.idLowest=_26a.id;
}if(this.bbox.width==null||(parseInt(bbox.x)+parseInt(bbox.width))>(parseInt(_26c)+parseInt(this.bbox.width))){
this.bbox.right=parseInt(bbox.x)+parseInt(bbox.width);
this.idHighest=_26a.id;
}if(this.bbox.height==null||(parseInt(bbox.y)+parseInt(bbox.height))>(parseInt(_26d)+parseInt(this.bbox.height))){
this.bbox.bottom=parseInt(bbox.y)+parseInt(bbox.height);
this.idHighest=_26a.id;
}this.bbox.width=this.bbox.right-this.bbox.x;
this.bbox.height=this.bbox.bottom-this.bbox.y;
this.selectedShapeBounds[_26a.id]=this.renderer.bounds(_26a);
};
SelectedShapes.prototype.sizeMultipleSelectDummy=function(_26e){
this.renderer.setX(_26e,this.bbox.x);
this.renderer.setY(_26e,this.bbox.y);
this.renderer.setWidth(_26e,this.bbox.width);
this.renderer.setHeight(_26e,this.bbox.height);
};
SelectedShapes.prototype.removeShape=function(_26f){
this.selectedShapeMap[_26f.id]=null;
if(_26f.id==this.idLowest||_26f.id==this.idHighest){
this.recalculateBounds();
return true;
}return false;
};
SelectedShapes.prototype.contains=function(_270){
return (_270&&this.selectedShapeMap[_270.id]!=null);
};
SelectedShapes.prototype.containsById=function(_271){
return (_271&&this.selectedShapeMap[_271]!=null);
};
SelectedShapes.prototype.getShapes=function(){
return Object.values(this.selectedShapeMap);
};
SelectedShapes.prototype.updateShapeBounds=function(){
var keys=Object.keys(this.selectedShapeMap);
for(var i=0;
i<keys.length;
i++){
this.selectedShapeBounds[keys[i]]=this.renderer.bounds(this.selectedShapeMap[keys[i]]);
this.setSelectedShapes(Object.values(this.selectedShapeMap));
}};
SelectedShapes.prototype.getSelectedBounds=function(id){
return this.selectedShapeBounds[id];
};
SelectedShapes.prototype.getPropotionalBoundsWidth=function(_275,id,_277,_278){
var _279=this.selectedShapeBounds[id];
var rect=new Object();
rect.width=(_275.width/_277)*_279.width;
if(_278){
if((_279.x-this.bbox.x==0)){
rect.x=_275.x;
}else{
rect.x=(_275.x*1)+(_275.width*((_279.x-this.bbox.x)/_277));
}}else{
rect.x=(_279.x*1)+((_275.width-_277)*((_279.x-this.bbox.x)/_277));
}return rect;
};
SelectedShapes.prototype.getPropotionalBoundsHeight=function(_27b,id,_27d,_27e){
var _27f=this.selectedShapeBounds[id];
var rect=new Object();
rect.height=(_27b.height/_27d)*_27f.height;
if(_27e){
if((_27f.y-this.bbox.y==0)){
rect.y=_27b.y;
}else{
rect.y=(_27b.y*1)+(_27b.height*((_27f.y-this.bbox.y)/_27d));
}}else{
rect.y=(_27f.y*1)+((_27b.height-_27d)*((_27f.y-this.bbox.y)/_27d));
}return rect;
};
SelectedShapes.prototype.getPropotionalBoundsRotation=function(_281,id,_283){
var _284=this.selectedShapeBounds[id];
var obj=new Object();
_281.rotation=_283;
var _286=_284.rotation;
_284.rotation=_283;
var _287=this.renderer.getRotatedPoint(_284.x,_284.y,_284);
var _288=this.renderer.getRotatedPoint(_284.x,_284.y,_281);
obj.x=(_284.x*1)+(_288.x-_287.x);
obj.y=(_284.y*1)+(_288.y-_287.y);
_284.rotation=_286;
return obj;
};
function CDEditor(elem,_28a){
this.container=elem;
this.PAGE_ID="_page";
this.page=$(this.PAGE_ID);
this.width=900;
this.height=900;
this.DEFAULT_PAGE_WIDTH=900;
this.DEFAULT_PAGE_HEIGHT=900;
this.MAX_WIDTH=2000;
this.MAX_HEIGHT=2000;
this.gridX=1;
this.gridY=1;
this.mouseDownX=0;
this.mouseDownY=0;
this.handleIndex=0;
this.prevHandleX=0;
this.prevHandleY=0;
this.prevZoom=1;
this.zoom=1;
this.prevWidth=0;
this.prevHeight=0;
this.prevMode="";
this.mode="select";
this.resizeMode="";
this.fillColor="";
this.lineColor="";
this.lineWidth="";
this.lineStyle="none";
this.opacity="1.0";
this.gradient="solid";
this.shadowOn="false";
this.SHIFT_MODE=false;
this.selected=null;
this.lineActiveShape=null;
this.dragStarted=false;
this.textEditMode=false;
this.textToolBeginNew=true;
this.resizeCounter=0;
this.dragCounter=0;
var font=new Object();
font.size="";
font.family="";
font.color="";
font.align="";
font.italics="";
font.bold="";
this.fillUpFont(font);
this.font=font;
this.shapeProps=new Array();
this.shapeProps["table"]=$("_shapeTable");
this.shapeProps["x"]=$("_x");
this.shapeProps["y"]=$("_y");
this.shapeProps["width"]=$("_width");
this.shapeProps["height"]=$("_height");
this.shapeProps["rotation"]=$("_rotation");
this.lineProps=new Array();
this.lineProps["table"]=$("_connectorTable");
this.lineProps["x1"]=$("_x1");
this.lineProps["x2"]=$("_x2");
this.lineProps["y1"]=$("_y1");
this.lineProps["y2"]=$("_y2");
this.lineProps["type"]=$("_lineType");
this.pageProps=new Array();
this.pageProps["table"]=$("_pageTable");
this.pageProps["x"]=$("_pageX");
this.pageProps["y"]=$("_pageY");
this.pageProps["width"]=$("_pageWidth");
this.pageProps["height"]=$("_pageHeight");
this.clipboard=null;
this.selectedBounds={
x:0,y:0,width:0,height:0};
this.multipleSelectShapes=new SelectedShapes();
this.multipleSelectShapes.init(_28a);
this.onselect=function(){
};
this.onunselect=function(){
};
this.renderer=_28a;
this.renderer.init(this.container);
this.onMouseDownListener=this.onMouseDown.bindAsEventListener(this);
this.onMouseUpListener=this.onMouseUp.bindAsEventListener(this);
this.onDragListener=this.onDrag.bindAsEventListener(this);
this.onDrawListener=this.onDraw.bindAsEventListener(this);
this.onPageDragListener=this.onPageDrag.bindAsEventListener(this);
this.onHitListener=this.onHit.bindAsEventListener(this);
this.onSelectStartListener=this.onSelectStart.bindAsEventListener(this);
this.onMouseOverListener=this.onMouseOver.bindAsEventListener(this);
this.onMouseOutListener=this.onMouseOut.bindAsEventListener(this);
this.onShapeMouseOutListener=this.onShapeMouseOut.bindAsEventListener(this);
this.onShapeMouseEnterListener=this.onShapeMouseEnter.bindAsEventListener(this);
this.onKeyPressListener=this.onKeyPress.bindAsEventListener(this);
this.onKeyDownListener=this.onKeyDown.bindAsEventListener(this);
this.onKeyUpListener=this.onKeyUp.bindAsEventListener(this);
this.onDblClickListener=this.onDblClick.bindAsEventListener(this);
this.onTextEditEndListener=this.onTextEditEnd.bindAsEventListener(this);
Event.observe(this.container,"mousedown",this.onMouseDownListener);
Event.observe(this.container,"mouseup",this.onMouseUpListener);
Event.observe(this.container,"mouseout",this.onMouseOutListener);
Event.observe(this.container,"selectstart",this.onSelectStartListener);
Event.observe(this.container.ownerDocument,"keypress",this.onKeyPressListener);
Event.observe(this.container.ownerDocument,"keyup",this.onKeyUpListener);
Event.observe(this.container.ownerDocument,"keydown",this.onKeyDownListener);
}CDEditor.prototype.fillUpFont=function(font){
if(font.size==""){
font.size=16;
}if(font.family==""){
font.family="'Arial'";
}if(font.italics==""){
font.italics="normal";
}if(font.bold==""){
font.bold="normal";
}if(font.align==""){
font.align="center";
}if(font.color==""){
font.color="black";
}};
CDEditor.prototype.deleteSelection=function(){
if(this.selected){
if($("tracker-group")){
Event.stopObserving($("tracker-group"),"mouseover",this.onMouseOverListener);
}Event.stopObserving(this.selected,"dblclick",this.onDblClickListener);
this.renderer.remove($("tracker-group"));
if(this.renderer.isMultipleSelect(this.selected)){
var _28d=this.multipleSelectShapes.getShapes();
for(var i=0;
i<_28d.length;
i++){
this.renderer.remove(_28d[i]);
}this.multipleSelectShapes.reset();
}this.renderer.remove(this.selected);
this.selected=null;
}else{
setHelp("Select a shape to delete");
}};
CDEditor.prototype.cut=function(){
if(this.selected){
this.copy();
this.deleteSelection();
this.unselect();
}else{
setHelp("Nothing to cut,Please select a shape first");
}};
CDEditor.prototype.copy=function(){
if(this.selected){
this.clipboard=new Array();
var _28f=this.multipleSelectShapes.getShapes();
if(!this.renderer.isMultipleSelect(this.selected)){
_28f[_28f.length]=this.selected;
}for(var i=0;
i<_28f.length;
i++){
this.clipboard[this.clipboard.length]=this.renderer.copy(_28f[i]);
}}else{
setHelp("Nothing to copy,Please select a shape first");
}};
CDEditor.prototype.paste=function(){
if(this.clipboard!=null&&this.clipboard.length>0){
var _291=new Object();
var _292=new Object();
var _293=new Object();
for(var i=0;
i<this.clipboard.length;
i++){
var _295=this.clipboard[i];
if(this.renderer.isConnector(_295)){
_291[_295.id]=_295;
}else{
_292[_295.id]=_295;
}}var _296=Object.values(_291);
for(var i=0;
i<_296.length;
i++){
var _295=_296[i];
var _297=this.renderer.paste(_295);
_293[_295.id]=_297;
this.addNewShapeListeners(_297);
var _298=this.renderer.getConnectionShape(_295,true);
var _299=this.renderer.getConnectionShape(_295,false);
if(_292[_298.shapeid]!=null){
var _29a=_293[_298.shapeid];
if(_29a==null){
_29a=this.renderer.paste(_292[_298.shapeid]);
this.addNewShapeListeners(_29a);
_293[_298.shapeid]=_29a;
}this.renderer.connectLineToShapeByPointIndex(_29a,_297,"from",_298.shapepoint);
}if(_292[_299.shapeid]!=null){
var _29a=_293[_299.shapeid];
if(_29a==null){
_29a=this.renderer.paste(_292[_299.shapeid]);
_293[_299.shapeid]=_29a;
this.addNewShapeListeners(_29a);
}this.renderer.connectLineToShapeByPointIndex(_29a,_297,"to",_299.shapepoint);
}}var _29b=Object.values(_292);
for(var i=0;
i<_29b.length;
i++){
var _295=_29b[i];
var _29a=_293[_295.id];
if(_29a==null){
_29a=this.renderer.paste(_292[_295.id]);
this.addNewShapeListeners(_29a);
_293[_295.id]=_29a;
}}this.multipleSelectShapes.reset();
var _29c=Object.values(_293);
if(_29c.length>1){
this.multipleSelectShapes.setSelectedShapes(_29c);
this.resetMultipleSelectorDummy();
this.renderer.updateTracker(this.selected);
}else{
if(_29c.length==1){
this.unselect();
this.select(_29c[0]);
this.renderer.updateTracker(this.selected);
}}this.copy();
this.clearShapeText();
this.resetShapeText();
}else{
setHelp("Nothing to paste,Use copy or cut on selected shape");
}};
CDEditor.prototype.addNewShapeListeners=function(_29d){
if(!_29d){
return;
}
Event.observe(_29d,"mousedown",this.onHitListener);
Event.observe(_29d,"mouseover",this.onShapeMouseEnterListener);
Event.observe(_29d,"mouseout",this.onShapeMouseOutListener);
};

CDEditor.prototype.bringToFront=function(_29e){
var _29f=(_29e)?_29e:this.selected;
var _2a0=new Array();
var _2a1=this.renderer.isMultipleSelect(_29f);
if(_2a1){
_2a0=this.multipleSelectShapes.getShapes();
}else{
_2a0[0]=_29f;
}for(var i=0;
i<_2a0.length;
i++){
_29f=this.renderer.bringToFront(_2a0[i]);
if(_29f){
this.addNewShapeListeners(_29f);
if(!_2a1){
this.select(_29f);
}}}};
CDEditor.prototype.sendToBack=function(_2a3){
var _2a4=(_2a3)?_2a3:this.selected;
var _2a5=new Array();
var _2a6=this.renderer.isMultipleSelect(_2a4);
if(_2a6){
_2a5=this.multipleSelectShapes.getShapes();
}else{
_2a5[0]=_2a4;
}for(var i=0;
i<_2a5.length;
i++){
_2a4=this.renderer.sendToBack(_2a5[i]);
if(_2a4){
this.addNewShapeListeners(_2a4);
if(!_2a6){
this.select(_2a4);
}}}};
CDEditor.prototype.select=function(elem){
if(elem==this.selected){
return;
}this.selected=elem;
var _2a9=this.renderer.showTracker(this.selected);
Event.observe(_2a9,"mouseover",this.onMouseOverListener);
Event.observe(this.selected,"dblclick",this.onDblClickListener);
setHelp("To move the shape, drag it. To resize,use resize boxes.For finer moves use arrow keys.<b>To Set Text, double click</b>");
this.onselect(this);
this.updateShapeInfo(this.selected);
};
CDEditor.prototype.unselect=function(){
if(this.selected!=null){
if(this.textEditMode){
this.finishTextEdit();
this.textEditMode=false;
}if(this.mode!="text"){
this.textModeBeginNew=false;
}Event.stopObserving(this.selected,"dblclick",this.onDblClickListener);
this.selected=null;
this.onunselect(this);
Event.stopObserving(this.container,"mouseover",this.onMouseOverListener);
this.updateShapeInfo(null);
if($("tracker-group")!=null){
this.renderer.remove($("tracker-group"));
}var _2aa=$("active-shape-tracker");
if(_2aa){
this.renderer.remove(_2aa);
}}var _2ab=$("line-tracker");
if(_2ab){
this.renderer.remove(_2ab);
}};
CDEditor.prototype.onDblClick=function(_2ac){
if(!this.selected){
return false;
}else{
if(!this.renderer.isMultipleSelect(this.selected)){
this.startTextEdit(this.selected);
}else{
setHelp("<font color='red'>Text editing is not allowed in multiple select mode</font>");
}}};
CDEditor.prototype.startTextEdit=function(_2ad){
setHelp("Enter your text and then click anywhere outside the text area");
var text=$("__shapeText");
var _2af=this.renderer.getShapeText(_2ad);
if(_2af){
text.value=_2af;
}else{
text.value="";
}text.style.visibility="visible";
var _2b0=this.renderer.getTextBounds(_2ad,"",this.zoom);
text.style.marginLeft=_2b0.x>3?(_2b0.x-3):0;
text.style.marginTop=_2b0.y>3?(_2b0.y-3):0;
if(_2b0.width>=35){
text.style.width=parseInt(_2b0.width)+6;
}else{
text.style.width=35;
}if(_2b0.height>=35){
text.style.height=parseInt(_2b0.height)+6;
}else{
text.style.height=35;
}this.setTextAreaFont(text);
this.renderer.remove(text);
this.container.appendChild(text);
text.focus();
text.style.zIndex=this.renderer.maxIndex;
Event.stopObserving(this.container,"mousedown",this.onMouseDownListener);
Event.stopObserving(this.container,"mouseup",this.onMouseUpListener);
Event.stopObserving(this.container,"selectstart",this.onSelectStartListener);
Event.stopObserving(this.container,"keypress",this.onKeyPressListener);
Event.stopObserving(this.container,"keyup",this.onKeyUpListener);
Event.stopObserving(this.container,"mousemove",this.onDragListener);
Event.observe(this.container,"mousedown",this.onTextEditEndListener);
setTimeout("c.manageTextSize()",100);
this.textEditMode=true;
};
CDEditor.prototype.manageTextSize=function(){
if(!this.selected||(!this.renderer.isConnector(this.selected)&&(!this.selected.getElementsByTagName("text-bound")>0))){
return;
}var text=$("__shapeText");
if(!text.style.visibility=="visible"){
return;
}var _2b2=this.renderer.getTextBounds(this.selected,text.value,this.zoom);
text.style.marginLeft=_2b2.x>3?(_2b2.x-3):0;
text.style.marginTop=_2b2.y>3?(_2b2.y-3):0;
if(_2b2.width>=35){
text.style.width=parseInt(_2b2.width)+6;
}else{
text.style.width=35;
}if(_2b2.height>=35){
text.style.height=parseInt(_2b2.height)+6;
}else{
text.style.height=35;
}setTimeout("c.manageTextSize()",100);
};
CDEditor.prototype.setTextAreaFont=function(text){
var _2b4=this.renderer.getFont(this.selected);
if(_2b4.size!=""){
text.style.fontSize=(_2b4.size*this.zoom);
}else{
text.style.fontSize=(this.font.size*this.zoom);
}if(_2b4.color!=""){
text.style.strokecolor=_2b4.color;
text.style.color=_2b4.color;
}else{
text.style.strokecolor=this.font.color;
text.style.color=this.font.color;
}if(_2b4.family!=""){
text.style.fontFamily=_2b4.family;
}else{
text.style.fontFamily=this.font.family;
}if(_2b4.bold!=""){
text.style.fontWeight=_2b4.bold;
}else{
text.style.fontWeight=this.font.bold;
}if(_2b4.italics!=""){
text.style.fontStyle=_2b4.italics;
}else{
text.style.fontStyle=this.font.italics;
}};
CDEditor.prototype.onTextEditEnd=function(_2b5){
if(!this.selected||!this.textEditMode||!_2b5){
return;
}else{
var _2b6=Event.element(_2b5);
if(_2b5&&_2b6&&_2b6.id=="__shapeText"){
return;
}this.finishTextEdit();
this.unselect();
}};
CDEditor.prototype.finishTextEdit=function(){
setHelp("Finished editing text");
var _2b7=$("__shapeText");
var text=_2b7.value;
if(!text||text.length==0){
text=" ";
}this.clearShapeText();
var _2b9=this.renderer.getFont(this.selected);
this.renderer.setShapeText(this.selected,text,this.font,false,_2b9,this.zoom);
if(!this.renderer.isConnector(this.selected)){
this.resetTextForAttachedConnectors(this.selected);
}_2b7.style.visibility="hidden";
this.textEditMode=false;
Event.observe(this.container,"mousedown",this.onMouseDownListener);
Event.observe(this.container,"mouseup",this.onMouseUpListener);
Event.observe(this.container,"selectstart",this.onSelectStartListener);
Event.observe(this.container,"keypress",this.onKeyPressListener);
Event.observe(this.container,"keyup",this.onKeyUpListener);
Event.stopObserving(this.container,"mousedown",this.onTextEditEndListener);
};
CDEditor.prototype.clearShapeText=function(_2ba){
var _2bb=null;
if(!_2ba&&!this.selected){
return;
}if(!_2ba){
_2bb=this.multipleSelectShapes.getShapes();
if(!this.renderer.isMultipleSelect(this.selected)){
_2bb[_2bb.length]=this.selected;
}}else{
_2bb=new Array();
_2bb[_2bb.length]=_2ba;
}for(var i=0;
i<_2bb.length;
i++){
var _2bd=_2bb[i];
this.renderer.clearShapeText(_2bd);
if(!this.renderer.isConnector(_2bd)){
this.clearTextForAttachedConnectors(_2bd);
}}};
CDEditor.prototype.resetShapeText=function(_2be){
if(!_2be&&!this.selected){
return;
}var _2bf=null;
if(!_2be){
_2bf=this.multipleSelectShapes.getShapes();
if(!this.renderer.isMultipleSelect(this.selected)){
_2bf[_2bf.length]=this.selected;
}}else{
_2bf=new Array();
_2bf[_2bf.length]=_2be;
}for(var i=0;
i<_2bf.length;
i++){
var _2c1=_2bf[i];
var text=this.renderer.getShapeText(_2c1);
var _2c3=this.renderer.getFont(_2c1);
if(text){
this.renderer.setShapeText(_2c1,text,this.font,false,_2c3,this.zoom);
}if(!this.renderer.isConnector(_2c1)){
this.resetTextForAttachedConnectors(_2c1);
}}};
CDEditor.prototype.clearTextForAttachedConnectors=function(_2c4){
var _2c5=_2c4;
if(!_2c5){
_2c5=this.selected;
}var _2c6=this.renderer.getAllConnectorsForShape(_2c5);
for(var i=0;
i<_2c6.length;
i++){
if(_2c6[i]){
this.clearShapeText(_2c6[i]);
}}};
CDEditor.prototype.resetTextForAttachedConnectors=function(_2c8){
var _2c9=_2c8;
if(!_2c9){
_2c9=this.selected;
}var _2ca=this.renderer.getAllConnectorsForShape(_2c8);
for(var i=0;
i<_2ca.length;
i++){
if(_2ca[i]){
this.resetShapeText(_2ca[i]);
}}};
CDEditor.prototype.getSelectedElement=function(){
return this.selected;
};
CDEditor.prototype.setGrid=function(_2cc,_2cd){
this.gridX=_2cc;
this.gridY=_2cd;
};


CDEditor.prototype.open=function(div){
this.removeAll();
this.setZoom((1/this.zoom));
this.renderer.open(div);
var _2cf=this.renderer.getAllShapes(this.container.ownerDocument);
var _2d0=$A(_2cf);
_2cf=this.renderer.getAllConnectors(this.container.ownerDocument);
for(var i=0;i<_2cf.length;i++){
_2d0[_2d0.length]=_2cf[i];
}
for(var i=0;i<_2d0.length;i++){
var node=_2d0[i];
this.addNewShapeListeners(node);
}
var _2d3=div.getElementsByTagName("page-size");
var _2d4=this.DEFAULT_PAGE_WIDTH;
var _2d5=this.DEFAULT_PAGE_HEIGHT;
if(_2d3&&_2d3.length>0){
_2d4=_2d3.item(0).getAttribute("width");
_2d5=_2d3.item(0).getAttribute("height");
}
this.setPageSize(_2d4,_2d5);
var _2d6=div.getElementsByTagName("zoom-factor");
var _2d7=0.8;
if(_2d6&&_2d6.length>0){
_2d7=_2d6.item(0).getAttribute("factor");
}this.setZoom(_2d7);
};


CDEditor.prototype.reset=function(){
this.removeAll();
this.setPageSize(this.DEFAULT_PAGE_WIDTH,this.DEFAULT_PAGE_HEIGHT);
};
CDEditor.prototype.removeAll=function(){
this.unselect();
var _2d8=this.renderer.getAllShapes(this.container.ownerDocument);
var _2d9=$A(_2d8);
_2d8=this.renderer.getAllConnectors(this.container.ownerDocument);
for(var i=0;
i<_2d8.length;
i++){
_2d9[_2d9.length]=_2d8[i];
}for(var i=0;
i<_2d9.length;
i++){
var node=_2d9[i];
this.renderer.remove(node);
}};
CDEditor.prototype.setMode=function(_2dc){
this.mode=_2dc;
if(_2dc=="line"){
this.renderer.setCursor(this.container,"./cursors/line-draw.cur");
}else{
if(_2dc=="ortho-line"){
this.renderer.setCursor(this.container,"./cursors/orth-draw.cur");
}else{
if(_2dc=="curve-line"){
this.renderer.setCursor(this.container,"./cursors/curve-draw.cur");
}else{
if(_2dc=="text"){
this.renderer.setCursor(this.container,"./cursors/text.cur");
}else{
this.renderer.setCursor(this.container,"default");
}}}}};
CDEditor.prototype.editCommand=function(cmd,_2de){
if(cmd=="mode"){
this.setMode(_2de);
}if(cmd=="zoom"){
this.setZoom(_2de);
}else{
if(this.selected==null){
if(cmd=="fillcolor"){
this.fillColor=_2de;
}else{
if(cmd=="linecolor"){
this.lineColor=_2de;
}else{
if(cmd=="linewidth"){
this.lineWidth=parseInt(_2de)+"px";
}else{
if(cmd=="opacity"){
this.opacity=_2de;
}else{
if(cmd=="gradient"){
this.gradient=_2de;
}else{
if(cmd=="shadow"){
this.shadowOn=_2de;
}else{
if(cmd=="linestyle"){
this.lineStyle=_2de;
}else{
if(cmd=="fontSize"){
this.font.size=_2de;
}else{
if(cmd=="fontFamily"){
this.font.family=_2de;
}else{
if(cmd=="bold"){
if(this.font.bold=="bold"){
this.font.bold="normal";
}else{
this.font.bold="bold";
}}else{
if(cmd=="italic"){
if(this.font.italics=="italic"){
this.font.italics="normal";
}else{
this.font.italics="italic";
}}else{
if(cmd=="fontColor"){
this.font.color=_2de;
}else{
if(cmd=="align"){
this.font.align=_2de;
}}}}}}}}}}}}}}else{
var _2df=this.multipleSelectShapes.getShapes();
if(_2df.length==0){
_2df[_2df.length]=this.selected;
}for(var i=0;
i<_2df.length;
i++){
this.renderer.editCommand(_2df[i],cmd,_2de,this.zoom);
}if(this.textEditMode==true){
if(cmd=="fontColor"||cmd=="align"||cmd=="italic"||cmd=="bold"||cmd=="fontFamily"||cmd=="fontSize"){
this.setTextAreaFont($("__shapeText"));
}}}}};
CDEditor.prototype.isTextEditMode=function(){
return this.textEditMode;
};
CDEditor.prototype.setPageSize=function(_2e1,_2e2){
if(_2e1>this.MAX_WIDTH){
setHelp("<font color='red'>Maximum width allowed is:"+this.MAX_WIDTH+"</font>");
}else{
if(_2e2>this.MAX_HEIGHT){
setHelp("<font color='red'>Maximum height allowed is:"+this.MAX_HEIGHT+"</font>");
}else{
this.width=_2e1;
this.height=_2e2;
this.page.style.width=(this.width*this.zoom)+"px";
this.page.style.height=(this.height*this.zoom)+"px";
}}this.updateShapeInfo(null);
};
CDEditor.prototype.getPageSize=function(){
var size=new Array();
size["width"]=this.width;
size["height"]=this.height;
return size;
};
CDEditor.prototype.setZoom=function(_2e4){
_2e4=(this.zoom*_2e4).toFixed(2);
if(_2e4<0.15||_2e4>4){
return;
}this.prevZoom=this.zoom;
this.zoom=_2e4;
var _2e5=this.page.style.width.split("px")[0];
var _2e6=this.page.style.height.split("px")[0];
_2e5=Math.round(_2e5*(_2e4/this.prevZoom));
_2e6=Math.round(_2e6*(_2e4/this.prevZoom));
this.page.style.width=_2e5+"px";
this.page.style.height=_2e6+"px";
this.setShapeZoom(this.container,_2e4,this.prevZoom);
};
CDEditor.prototype.setShapeZoom=function(doc,_2e8,_2e9){
this.renderer.remove($("tracker-group"));
this.renderer.remove($("active-shape-tracker"));
var _2ea=this.renderer.getAllShapes(doc);
var _2eb=_2ea.length;
for(var i=0;
i<_2ea.length;
i++){
var _2ed=_2ea[i];
var rect=this.renderer.bounds(_2ed);
this.renderer.setWidth(_2ed,Math.round(parseFloat(rect["width"])*(_2e8/_2e9)));
this.renderer.setHeight(_2ed,Math.round(parseFloat(rect["height"])*(_2e8/_2e9)));
this.renderer.setY(_2ed,Math.round(parseFloat(rect["y"])*(_2e8/_2e9)));
this.renderer.setX(_2ed,Math.round(parseFloat(rect["x"])*(_2e8/_2e9)));
this.renderer.updateRotation(_2ed);
var text=this.renderer.getShapeText(_2ed,doc);
var font=this.renderer.getFont(_2ed);
this.renderer.clearShapeText(_2ed);
if(text){
this.renderer.setShapeText(_2ed,text,this.font,false,font,_2e8);
}}this.setLineZoom(doc,_2e8,_2e9);
this.renderer.updateTracker(this.selected);
};
CDEditor.prototype.setLineZoom=function(doc,_2f2,_2f3){
var _2f4=this.renderer.getAllConnectors(doc);
var _2f5=_2f4.length;
for(var i=0;
i<_2f4.length;
i++){
var _2f7=_2f4[i];
var _2f8=this.renderer.getConnectorFromX(_2f7)*(_2f2/_2f3);
var _2f9=this.renderer.getConnectorFromY(_2f7)*(_2f2/_2f3);
var toX=this.renderer.getConnectorToX(_2f7)*(_2f2/_2f3);
var toY=this.renderer.getConnectorToY(_2f7)*(_2f2/_2f3);
this.renderer.moveLinePoint(_2f7,_2f8,_2f9,true);
this.renderer.moveLinePoint(_2f7,toX,toY,false);
if(this.renderer.getConnectorType(_2f7)=="curve-line"){
var _2fc=this.renderer.getControl1(_2f7);
var cx1=_2fc.x*(_2f2/_2f3);
var cy1=_2fc.y*(_2f2/_2f3);
this.renderer.setControl1(_2f7,cx1,cy1);
var _2ff=this.renderer.getControl2(_2f7);
var cx2=_2ff.x*(_2f2/_2f3);
var cy2=_2ff.y*(_2f2/_2f3);
this.renderer.setControl2(_2f7,cx2,cy2);
}var text=this.renderer.getShapeText(_2f7,doc);
var font=this.renderer.getFont(_2f7);
this.renderer.clearShapeText(_2f7);
if(text){
this.renderer.setShapeText(_2f7,text,this.font,false,font,_2f2,doc);
}}};
CDEditor.prototype.getZoom=function(){
return this.zoom;
};
CDEditor.prototype.queryCommand=function(cmd){
if(cmd=="mode"){
return this.mode;
}else{
if(this.selected==null){
if(cmd=="fillcolor"){
return this.fillColor;
}else{
if(cmd=="linecolor"){
return this.lineColor;
}else{
if(cmd=="linewidth"){
return this.lineWidth;
}else{
if(cmd=="opacity"){
return this.opacity;
}else{
if(cmd=="gradient"){
return this.gradient;
}else{
if(cmd=="shadow"){
return this.shadowOn;
}else{
if(cmd=="fontSize"){
return this.font.size;
}else{
if(cmd=="fontFamily"){
return this.font.family;
}else{
if(cmd=="bold"){
return this.font.bold;
}else{
if(cmd=="italics"){
return this.font.italics;
}else{
if(cmd=="fontColor"){
return this.font.color;
}else{
if(cmd=="align"){
return this.font.align;
}else{
if(cmd=="font"){
return this.font;
}else{
if(cmd=="linestyle"){
return this.lineStyle;
}}}}}}}}}}}}}}}else{
return this.renderer.queryCommand(this.selected,cmd);
}}};
CDEditor.prototype.onSelectStart=function(_305){
return false;
};
CDEditor.prototype.onKeyUp=function(_306){
this.SHIFT_MODE=_306.shiftKey;
var code=_306.keyCode;
if((code==46||code==37||code==38||code==39||code==40)&&this.textEditMode==true){
return true;
}if(code==37||code==38||code==39||code==40||code==82||code==76){
var _308=Event.element(_306);
if(_308&&(_308.id=="_file"||_308.id=="_DOCUMENT_NAME"||_308.id=="__imageURL")){
return;
}this.clearShapeText();
this.resetShapeText();
this.selectedBounds=this.renderer.bounds(this.selected);
this.multipleSelectShapes.updateShapeBounds();
}};
CDEditor.prototype.onKeyDown=function(_309){
this.SHIFT_MODE=_309.shiftKey;
};
CDEditor.prototype.onKeyPress=function(_30a){
if($("_saveBox").style.visibility=="visible"){
return true;
}if($("__imageURLWizard").style.visibility=="visible"){
return true;
}var code=_30a.keyCode;
var stop=false;
var _30d=_30a.charCode?_30a.charCode:_30a.keyCode;
var _30e=String.fromCharCode(_30d);
_30e=_30e.toLowerCase();
this.SHIFT_MODE=_30a.shiftKey;
if((code==46||code==37||code==38||code==39||code==40)&&this.textEditMode==true){
return;
}if(46==code&&!this.textEditMode){
this.deleteSelection();
stop=true;
}else{
if(37==code&&!this.textEditMode){
this.clearShapeText();
this.fineMove(1,0,0,0);
stop=true;
}else{
if(38==code&&!this.textEditMode){
this.clearShapeText();
this.fineMove(0,0,1,0);
stop=true;
}else{
if(39==code&&!this.textEditMode){
this.clearShapeText();
this.fineMove(0,1,0,0);
stop=true;
}else{
if(40==code&&!this.textEditMode){
this.clearShapeText();
this.fineMove(0,0,0,1);
stop=true;
}else{
if("r"==_30e){
if(_30a.shiftKey&&!this.textEditMode){
this.clearShapeText();
this.fineRotateSelection(1);
stop=true;
}}else{
if("l"==_30e){
if(_30a.shiftKey&&!this.textEditMode){
this.clearShapeText();
this.fineRotateSelection(-1);
stop=true;
}}else{
if("x"==_30e){
if(_30a.ctrlKey&&!this.textEditMode){
this.cut();
}stop=true;
}else{
if("c"==_30e){
if(_30a.ctrlKey&&!this.textEditMode){
this.copy();
}stop=true;
}else{
if("v"==_30e){
if(_30a.ctrlKey&&!this.textEditMode){
this.paste();
}stop=true;
}else{
if("b"==_30e){
if(_30a.ctrlKey){
this.editCommand("bold");
stop=true;
}}else{
if("i"==_30e){
if(_30a.ctrlKey){
this.editCommand("italic");
stop=true;
}}else{
stop=false;
}}}}}}}}}}}}if(stop&&!this.textEditMode){
Event.stop(_30a);
return false;
}else{
return true;
}};
CDEditor.prototype.onMouseOver=function(_30f){
var _310=Event.element(_30f);
if(!_310||!_310.id){
return;
}if(_310.id=="resize-bottom"||_310.id=="resize-right"||_310.id=="tracker-rotate"||_310.id=="resize-left"||_310.id=="resize-top"){
var _311=this.renderer.bounds(this.selected)["rotation"];
_311=_311%360;
if(_310.id=="resize-bottom"){
_310.style.cursor="s-resize";
if(_311!=null&&((_311>=45&&_311<=135)||(_311>=225&&_311<=315))){
_310.style.cursor="e-resize";
}else{
_310.style.cursor="s-resize";
}}else{
if(_310.id=="resize-top"){
_310.style.cursor="s-resize";
if(_311!=null&&((_311>=45&&_311<=135)||(_311>=225&&_311<=315))){
_310.style.cursor="e-resize";
}else{
_310.style.cursor="s-resize";
}}else{
if(_310.id=="resize-right"){
_310.style.cursor="e-resize";
if(_311!=null&&((_311>=45&&_311<=135)||(_311>=225&&_311<=315))){
_310.style.cursor="s-resize";
}else{
_310.style.cursor="e-resize";
}}else{
if(_310.id=="resize-left"){
_310.style.cursor="e-resize";
if(_311!=null&&((_311>=45&&_311<=135)||(_311>=225&&_311<=315))){
_310.style.cursor="s-resize";
}else{
_310.style.cursor="e-resize";
}}else{
if(_310.id=="tracker-rotate"){
_310.style.cursor="move";
this.resizeMode="rotate";
}}}}}}return false;
};
CDEditor.prototype.onMouseDown=function(_312){
var _313=Position.cumulativeOffset(this.container);
var _314=Math.round((Event.pointerX(_312)-_313[0])/this.gridX)*this.gridX;
var _315=Math.round((Event.pointerY(_312)-_313[1])/this.gridY)*this.gridY;
var _316=Event.element(_312);
if(_316.id=="resize-bottom"||_316.id=="resize-right"||_316.id=="tracker-rotate"||_316.id=="resize-left"||_316.id=="resize-top"||_316.id=="resize-from"||_316.id=="resize-to"||_316.id=="control1"||_316.id=="control2"||_316.id.indexOf("tracker-handle:")>=0){
this.prevMode=this.mode;
this.setMode("resize");
if(this.selected){
this.mouseDownX=_314;
this.mouseDownY=_315;
var rect=this.renderer.bounds(this.selected);
this.prevWidth=rect["width"];
this.prevHeight=rect["height"];
this.prevX=rect["x"];
this.prevY=rect["y"];
this.prevRotation=rect["rotation"];
this.multipleSelectShapes.updateShapeBounds();
if(_316&&_316.id){
if(_316.id=="resize-from"){
this.resizeMode="line-from";
}else{
if(_316.id=="resize-to"){
this.resizeMode="line-to";
}else{
if(_316.id=="control1"){
this.resizeMode="control1";
}else{
if(_316.id=="control2"){
this.resizeMode="control2";
}else{
if(_316.id=="resize-bottom"){
this.resizeMode="bottom-stretch";
}else{
if(_316.id=="resize-top"){
this.resizeMode="top-stretch";
}else{
if(_316.id=="resize-right"){
this.resizeMode="right-stretch";
}else{
if(_316.id=="resize-left"){
this.resizeMode="left-stretch";
}else{
if(_316.id=="tracker-rotate"){
this.resizeMode="rotate";
}else{
if(_316.id.indexOf("tracker-handle:")>=0){
this.resizeMode="move-handle";
this.handleIndex=_316.id.split("tracker-handle:")[1];
var _318=this.renderer.getShapeHandleLocation(this.selected,this.handleIndex);
this.prevHandleX=_318.x;
this.prevHandleY=_318.y;
}}}}}}}}}}if(this.resizeMode!="handle"){
this.clearShapeText();
}}}if(this.resizeMode=="rotate"){
if(this.renderer.isMultipleSelect(this.selected)){
setHelp("Drag your mouse to rotate this selection");
}else{
setHelp("Drag your mouse to rotate selected shape, For Fine rotation use <B>Shift+R</B> and <B>Shift+L</B>");
}}Event.observe(this.container,"mousemove",this.onDrawListener);
}else{
if(this.mode!="select"&&this.mode!="resize"&&this.mode!="PAGE_DRAG"){
this.unselect();
setHelp("Drag your mouse to size the selected shape");
this.mouseDownX=_314;
this.mouseDownY=_315;
if(this.mode!="line"&&this.mode!="ortho-line"&&this.mode!="curve-line"){
var _319=(this.mouseDownX*1)+this.container.parentNode.scrollLeft;
var _31a=(this.mouseDownY*1)+this.container.parentNode.scrollTop;
this.selected=this.renderer.create(this.mode,this.fillColor,this.lineColor,this.lineWidth,_319,_31a,1,1,this.opacity,this.gradient,this.shadowOn);
this.selected.setAttribute("id","shape:"+createUUID());
this.addNewShapeListeners(this.selected);
if(this.mode=="text"){
this.textToolBeginNew=true;
}}else{
var _319=(this.mouseDownX*1)+this.container.parentNode.scrollLeft;
var _31a=(this.mouseDownY*1)+this.container.parentNode.scrollTop;
this.unselect();
this.selected=this.renderer.createLine(this.mode,this.lineColor,this.lineWidth,_319,_31a,this.lineStyle);
this.select(this.selected);
this.selected.setAttribute("id","connector:"+createUUID());
this.addNewShapeListeners(this.selected);
}Event.observe(this.container,"mousemove",this.onDrawListener);
this.renderer.setCursor(this.container,"crosshair");
}else{
if(this.mouseDownX!=_314||this.mouseDownY!=_315){
this.unselect();
}if(_316.id==this.container.id||_316.id==this.PAGE_ID||_316.id==this.renderer.SVG_ROOT_ID){
var _31b=this.renderer.getMultipleSelector();
var sx=(_314*1)+this.container.parentNode.scrollLeft;
var sy=(_315*1)+this.container.parentNode.scrollTop;
this.renderer.setX(_31b,sx);
this.renderer.setY(_31b,sy);
this.renderer.setWidth(_31b,0);
this.renderer.setHeight(_31b,0);
this.mouseDownX=_314;
this.mouseDownY=_315;
Event.observe(this.container,"mousemove",this.onPageDragListener);
this.mode="PAGE_DRAG";
}}}return false;
};
CDEditor.prototype.isLineDrawMode=function(){
return (this.mode=="line"||this.resizeMode=="line-from"||this.resizeMode=="line-to"||this.mode=="ortho-line"||this.mode=="curve-line");
};
CDEditor.prototype.onShapeMouseEnter=function(_31e){
var _31f=Event.element(_31e);
var _320=this.renderer.getShapeFromEventSource(_31f);
if(!this.renderer.isConnector(_320)&&!this.renderer.isMultipleSelect(_320)&&this.isLineDrawMode()){
var _321=_320;
if((this.lineActiveShape&&_321&&this.lineActiveShape.id==_321.id)&&_321.id){
return;
}else{
if(this.isLineDrawMode()){
this.renderer.remove($("active-shape-tracker"));
this.lineActiveShape=_321;
this.renderer.showConnectionPoints(this.lineActiveShape);
}}}if(!this.isLineDrawMode()&&this.mode!="text"){
this.renderer.setCursor(this.container,"move");
}};
CDEditor.prototype.onShapeMouseOut=function(_322){
if(!this.isLineDrawMode()&&this.mode!="text"){
this.renderer.setCursor(this.container,"default");
}};
CDEditor.prototype.onMouseOut=function(_323){
if(_323.toElement&&(_323.toElement.id=="_body"||_323.toElement.id=="_surround"||_323.toElement.id=="palette")){
Event.stopObserving(this.container,"mousemove",this.onDrawListener);
Event.stopObserving(this.container,"mousemove",this.onDragListener);
this.renderer.hideMultipleSelector();
Event.stopObserving(this.container,"mousemove",this.onPageDragListener);
}};
CDEditor.prototype.getContainedShapeList=function(_324){
var _325=this.renderer.getAllShapes(this.container);
var _326=this.renderer.getAllConnectors(this.container);
var list=new Array();
for(var i=0;
i<_325.length;
i++){
if(_325[i].id==this.renderer.MULTIPLE_SELECTOR_DUMMY_ID||_325[i].id==this.renderer.MULTIPLE_SELECTOR_TRACKER_ID){
continue;
}var bbox=this.renderer.getBoundingBox(_325[i]);
if(parseInt(bbox.x)>parseInt(_324.x)&&parseInt(bbox.y)>parseInt(_324.y)&&(parseInt(bbox.x)+parseInt(bbox.width))<(parseInt(_324.x)+parseInt(_324.width))&&(parseInt(bbox.y)+parseInt(bbox.height))<(parseInt(_324.y)+parseInt(_324.height))){
list[list.length]=_325[i];
}}for(var i=0;
i<_326.length;
i++){
var bbox=this.renderer.getBoundingBox(_326[i]);
if(bbox.x>_324.x&&bbox.y>_324.y&&(parseInt(bbox.x)+parseInt(bbox.width))<(parseInt(_324.x)+parseInt(_324.width))&&(parseInt(bbox.y)+parseInt(bbox.height))<(parseInt(_324.y)+parseInt(_324.height))){
list[list.length]=_326[i];
}}return list;
};
CDEditor.prototype.resetMultipleSelectorDummy=function(){
var _32a=this.renderer.getMultipleSelectorDummyShape();
this.renderer.sendToBack(_32a);
_32a=this.renderer.getMultipleSelectorDummyShape();
this.selected=_32a;
this.renderer.setRotation(this.selected,0);
this.multipleSelectShapes.sizeMultipleSelectDummy(this.selected);
Event.stopObserving(this.selected,"mousedown",this.onHitListener);
this.addNewShapeListeners(this.selected);
};
CDEditor.prototype.onMouseUp=function(_32b){
if(this.mode!="select"&&this.mode!="resize"&&this.mode!="line"&&this.mode!="ortho-line"){
setHelp("Click on the shape to select it");
}Event.stopObserving(this.container,"mousemove",this.onDrawListener);
Event.stopObserving(this.container,"mousemove",this.onDragListener);
Event.stopObserving(this.container,"mousemove",this.onPageDragListener);
if(this.dragStarted){
Event.stopObserving(this.container,"mousemove",this.onDragListener);
this.resetShapeText();
this.dragStarted=false;
}if(this.mode=="PAGE_DRAG"){
this.mode="select";
var list=this.getContainedShapeList(this.renderer.bounds(this.renderer.getMultipleSelector()));
if(list.length>1){
this.multipleSelectShapes.setSelectedShapes(list);
this.resetMultipleSelectorDummy();
}else{
if(list.length==1){
this.selected=list[0];
this.renderer.hideMultipleSelectorDummyShape();
}else{
this.renderer.hideMultipleSelectorDummyShape();
this.multipleSelectShapes.reset();
}}this.renderer.hideMultipleSelector();
this.renderer.updateTracker(this.selected);
}else{
this.renderer.hideMultipleSelector();
if(!this.renderer.isMultipleSelect(this.selected)){
this.renderer.hideMultipleSelectorDummyShape();
this.multipleSelectShapes.reset();
}}if(this.mode=="line"||this.mode=="curve-line"||this.resizeMode=="line-from"||this.resizeMode=="line-to"||this.mode=="ortho-line"){
if(this.resizeMode=="line-from"){
this.renderer.connectLine(this.lineActiveShape,this.selected,"from");
}else{
if(this.resizeMode=="line-to"||this.mode=="line"||this.mode=="ortho-line"||this.mode=="curve-line"){
this.renderer.connectLine(this.lineActiveShape,this.selected,"to");
}}this.renderer.remove($("active-shape-tracker"));
this.lineActiveShape=null;
this.clearShapeText();
this.resetShapeText();
}if(this.mode=="text"&&this.textToolBeginNew){
this.beginTextToolEdit(this.selected);
this.textToolBeginNew=false;
}else{
if(this.mode=="text"&&!this.textToolBeginNew){
setHelp("<font color='red'>Text Mode:</font>Click again to draw another text shape");
}}if(this.mode=="resize"){
this.clearShapeText();
this.resetShapeText();
this.setMode(this.prevMode);
this.resizeMode="";
}if(this.mode!="select"&&this.mode!="line"&&this.mode!="ortho-line"&&this.mode!="text"&&this.mode!="curve-line"){
this.setMode("select");
}else{
this.setMode(this.mode);
}};
CDEditor.prototype.beginTextToolEdit=function(_32d){
this.renderer.setStrokeWidth(_32d,"0px");
this.renderer.setOpacity(_32d,"0.0");
this.startTextEdit(_32d);
};
CDEditor.prototype.onDrag=function(_32e){
if(!this.selected){
Event.stopObserving(this.container,"mousemove",this.onDragListener);
}var _32f=Position.cumulativeOffset(this.container);
var _330=Event.pointerX(_32e)-_32f[0];
var _331=Event.pointerY(_32e)-_32f[1];
var _332=Math.round((_330)/(this.gridX))*(this.gridX);
var _333=Math.round((_331)/(this.gridY))*(this.gridY);
var _334=_332-this.mouseDownX;
var _335=_333-this.mouseDownY;
if(_334==0&&_335==0){
return;
}var _336=this.multipleSelectShapes.getShapes();
_336[_336.length]=this.selected;
var _337=this.renderer.isMultipleSelect(this.selected);
if(!this.dragStarted==true){
this.dragStarted=true;
this.clearShapeText();
}for(var i=0;
i<_336.length;
i++){
var _339=null;
if(!_337||_336[i].id==this.renderer.MULTIPLE_SELECTOR_DUMMY_ID){
_339=this.selectedBounds;
}else{
_339=this.multipleSelectShapes.getSelectedBounds(_336[i].id);
}if(this.renderer.isConnector(_336[i])){
if(!_337){
this.renderer.disconnectLineFromShape(_336[i],"to");
this.renderer.disconnectLineFromShape(_336[i],"from");
}else{
var _33a=this.renderer.getConnectionShape(_336[i],true);
var _33b=this.renderer.getConnectionShape(_336[i],false);
if(!this.multipleSelectShapes.containsById(_33a.shapeid)){
this.renderer.disconnectLineFromShape(_336[i],"from");
}if(!this.multipleSelectShapes.containsById(_33b.shapeid)){
this.renderer.disconnectLineFromShape(_336[i],"to");
}}this.renderer.moveCompleteLine(_336[i],_339,_334,_335);
}else{
this.renderer.move(_336[i],(_339.x*1)+_334,(_339.y*1)+_335);
this.renderer.moveLineWithShape(_336[i]);
}}this.renderer.updateTracker(this.selected);
this.updateShapeInfo(this.selected);
};
CDEditor.prototype.fineMove=function(left,_33d,up,down){
if(this.selected){
var _340=this.multipleSelectShapes.getShapes();
_340[_340.length]=this.selected;
for(var i=0;
i<_340.length;
i++){
var _342=_33d-left;
var _343=down-up;
if(this.renderer.isConnector(_340[i])){
if(!this.renderer.isMultipleSelect(this.selected)){
this.renderer.disconnectLineFromShape(_340[i],"to");
this.renderer.disconnectLineFromShape(_340[i],"from");
}else{
var _344=this.renderer.getConnectionShape(_340[i],true);
var _345=this.renderer.getConnectionShape(_340[i],false);
if(!this.multipleSelectShapes.containsById(_344.shapeid)){
this.renderer.disconnectLineFromShape(_340[i],"from");
}if(!this.multipleSelectShapes.containsById(_345.shapeid)){
this.renderer.disconnectLineFromShape(_340[i],"to");
}}var _346=this.renderer.bounds(_340[i]);
this.renderer.moveCompleteLine(_340[i],_346,_342,_343);
}else{
if(_343==0){
this.renderer.fineMove(_340[i],_342,true);
}else{
this.renderer.fineMove(_340[i],_343,false);
}this.renderer.moveLineWithShape(_340[i]);
}}this.renderer.updateTracker(this.selected);
}else{
setHelp("Select a shape for Fine move");
}};
CDEditor.prototype.onDraw=function(_347){
if(this.selected==null){
return;
}var _348=Position.cumulativeOffset(this.container);
var _349=Event.pointerX(_347)-_348[0];
var _34a=Event.pointerY(_347)-_348[1];
var _34b=Math.round((_349)/(this.gridX))*(this.gridX);
var _34c=Math.round((_34a)/(this.gridY))*(this.gridY);
if(this.mode!="resize"&&this.mode!="select"){
return this.resizeNewShape(_34b,_34c,_349,_34a);
}if(this.mode=="resize"||this.mode=="select"){
this.resizeCounter++;
if(this.resizeCounter!=1){
return;
}this.resizeCounter=0;
var _34d=this.multipleSelectShapes.getShapes();
_34d[_34d.length]=this.selected;
var _34e=this.renderer.isMultipleSelect(this.selected);
for(var i=0;
i<_34d.length;
i++){
var _350=_34d[i];
var _351=0;
var _352=0;
if(!_34e||this.renderer.isMultipleSelect(_34d[i])){
_352=this.prevWidth;
_351=this.prevHeight;
}else{
var _353=this.multipleSelectShapes.getSelectedBounds(_350.id);
_352=_353.width;
_351=_353.height;
}if(this.resizeMode=="move-handle"){
var sx=(_34b*1)+this.container.parentNode.scrollLeft;
var sy=(_34c*1)+this.container.parentNode.scrollTop;
this.renderer.updateShapeHandle(_350,this.handleIndex,this.prevHandleX,this.prevHandleY,this.mouseDownX,this.mouseDownY,_34b,_34c);
this.renderer.moveLine(_350,sx,sy,true);
}if(this.resizeMode=="line-from"){
var sx=(_349*1)+this.container.parentNode.scrollLeft;
var sy=(_34a*1)+this.container.parentNode.scrollTop;
this.renderer.disconnectLineFromShape(this.selected,"from");
this.renderer.moveLine(_350,sx,sy,true);
}else{
if(this.resizeMode=="line-to"){
var sx=(_349*1)+this.container.parentNode.scrollLeft;
var sy=(_34a*1)+this.container.parentNode.scrollTop;
this.renderer.disconnectLineFromShape(_350,"to");
this.renderer.moveLine(_350,sx,sy,false);
}else{
if(this.resizeMode=="control1"){
var sx=(_349*1)+this.container.parentNode.scrollLeft;
var sy=(_34a*1)+this.container.parentNode.scrollTop;
this.renderer.setControl1(_350,sx,sy);
}else{
if(this.resizeMode=="control2"){
var sx=(_349*1)+this.container.parentNode.scrollLeft;
var sy=(_34a*1)+this.container.parentNode.scrollTop;
this.renderer.setControl2(_350,sx,sy);
}else{
if(this.renderer.isConnector(_350)){
continue;
}else{
if(this.resizeMode=="right-stretch"){
if(_34e&&!this.renderer.isMultipleSelect(_350)){
var _356=this.renderer.bounds(this.selected);
if(_356.width>1){
var _357=this.multipleSelectShapes.getPropotionalBoundsWidth(_356,_350.id,this.prevWidth,false);
if(_357.width>1){
this.renderer.setWidth(_350,_357.width);
}this.renderer.setX(_350,_357.x);
this.renderer.updateRotation(_350);
}}else{
this.renderer.resizeWidth(_350,_34b,_34c,this.mouseDownX,this.mouseDownY,_352,true);
}this.renderer.moveLineWithShape(_350);
}else{
if(this.resizeMode=="left-stretch"){
if(_34e&&!this.renderer.isMultipleSelect(_350)){
var _356=this.renderer.bounds(this.selected);
if(_356.width>1){
var _357=this.multipleSelectShapes.getPropotionalBoundsWidth(_356,_350.id,this.prevWidth,true);
this.renderer.setX(_350,_357.x);
if(_357.width>1){
this.renderer.setWidth(_350,_357.width);
}this.renderer.updateRotation(_350);
}}else{
this.renderer.resizeWidth(_350,_34b,_34c,this.mouseDownX,this.mouseDownY,_352,false);
}this.renderer.moveLineWithShape(_350);
}else{
if(this.resizeMode=="bottom-stretch"){
if(_34e&&!this.renderer.isMultipleSelect(_350)){
var _356=this.renderer.bounds(this.selected);
if(_356.height>1){
var _357=this.multipleSelectShapes.getPropotionalBoundsHeight(_356,_350.id,this.prevHeight,false);
if(_357.height>1){
this.renderer.setHeight(_350,_357.height);
}this.renderer.setY(_350,_357.y);
this.renderer.updateRotation(_350);
}}else{
this.renderer.resizeHeight(_350,_34b,_34c,this.mouseDownX,this.mouseDownY,_351,true);
}this.renderer.moveLineWithShape(_350);
}else{
if(this.resizeMode=="top-stretch"){
if(_34e&&!this.renderer.isMultipleSelect(_350)){
var _356=this.renderer.bounds(this.selected);
if(_356.height>1){
var _357=this.multipleSelectShapes.getPropotionalBoundsHeight(_356,_350.id,this.prevHeight,true);
if(_357.height>1){
this.renderer.setHeight(_350,_357.height);
}this.renderer.setY(_350,_357.y);
this.renderer.updateRotation(_350);
}}else{
this.renderer.resizeHeight(_350,_34b,_34c,this.mouseDownX,this.mouseDownY,_351,false);
}this.renderer.moveLineWithShape(_350);
}else{
if(this.resizeMode=="rotate"){
var _358=(this.mouseDownX*1)+this.container.parentNode.scrollLeft;
var _359=(this.mouseDownY*1)+this.container.parentNode.scrollTop;
var sx=(_349*1)+this.container.parentNode.scrollLeft;
var sy=(_34a*1)+this.container.parentNode.scrollTop;
if(_34e&&!this.renderer.isMultipleSelect(_350)){
var _356=this.renderer.bounds(this.selected);
var _35a=this.getRotationAngle(this.selected,sx,sy,_358,_359);
_35a=_35a-this.prevRotation;
var _35b=this.multipleSelectShapes.getPropotionalBoundsRotation(_356,_350.id,_35a);
var _353=this.multipleSelectShapes.getSelectedBounds(_350.id);
this.renderer.rotate(_350,(_353.rotation*1)+Math.round(_35a));
this.renderer.setX(_350,_35b.x);
this.renderer.setY(_350,_35b.y);
this.renderer.updateRotation(_350);
}else{
this.processRotate(_350,sx,sy,_358,_359);
}this.renderer.moveLineWithShape(_350);
}}}}}}}}}}}this.renderer.updateTracker(this.selected);
this.updateShapeInfo(this.selected);
}return false;
};
CDEditor.prototype.resizeNewShape=function(_35c,_35d,_35e,_35f){
var _360=(this.mouseDownX*1)+this.container.parentNode.scrollLeft;
var _361=(this.mouseDownY*1)+this.container.parentNode.scrollTop;
if(this.renderer.isConnector(this.selected)){
_35c=_35e;
_35d=_35f;
}var sx=(_35c*1)+this.container.parentNode.scrollLeft;
var sy=(_35d*1)+this.container.parentNode.scrollTop;
this.renderer.resize(this.selected,_360,_361,sx,sy);
this.updateShapeInfo(this.selected);
if(this.renderer.isConnector(this.selected)){
this.renderer.updateTracker(this.selected);
}return;
};
CDEditor.prototype.onPageDrag=function(_364){
if(this.mode!="PAGE_DRAG"){
return;
}var _365=Position.cumulativeOffset(this.container);
var _366=Math.round((Event.pointerX(_364)-_365[0])/this.gridX)*this.gridX;
var _367=Math.round((Event.pointerY(_364)-_365[1])/this.gridY)*this.gridY;
var _368=(this.mouseDownX*1)+this.container.parentNode.scrollLeft;
var _369=(this.mouseDownY*1)+this.container.parentNode.scrollTop;
var sx=(_366*1)+this.container.parentNode.scrollLeft;
var sy=(_367*1)+this.container.parentNode.scrollTop;
var _36c=this.renderer.getMultipleSelector();
this.renderer.resize(_36c,_368,_369,sx,sy);
};
CDEditor.prototype.fineRotateSelection=function(_36d){
if(this.selected==null){
setHelp("Please select a shape to rotate");
return false;
}if(this.renderer.isMultipleSelect(this.selected)){
return;
}var _36e=this.selected;
this.renderer.fineRotateSelection(_36e,_36d);
this.renderer.moveLineWithShape(_36e);
this.renderer.updateTracker(this.selected);
this.selectedBounds=this.renderer.bounds(this.selected);
};
CDEditor.prototype.processRotate=function(_36f,_370,_371,_372,_373){
var _374=this.getRotationAngle(_36f,_370,_371,_372,_373);
this.renderer.rotate(_36f,Math.round(_374));
};
CDEditor.prototype.getRotationAngle=function(_375,_376,_377,_378,_379){
var rect=this.renderer.bounds(_375);
var _37b=(rect["x"]*1)+(rect["width"]/2);
var _37c=(rect["y"]*1)+(rect["height"]/2);
var _37d=_376-_37b;
var _37e=_377-_37c;
var _37f=(_37d*0)+(_37e*(-10));
var _380=(10)*Math.sqrt((_37d*_37d)+(_37e*_37e));
var _381=_37f/_380;
_381=Math.acos(_381);
_381=rad2Deg(_381);
if(_37d<=0){
_381=360-_381;
}return _381;
};
CDEditor.prototype.onHit=function(_382){
if(this.textEditMode){
return;
}if(this.mode=="select"){
if(!this.SHIFT_MODE&&!this.renderer.isMultipleSelect(this.selected)){
this.unselect();
}var _383=Event.element(_382);
var _384=this.renderer.getShapeFromEventSource(_383);
if(!this.selected){
this.select(_384);
this.renderer.updateTracker(this.selected);
this.multipleSelectShapes.reset();
this.renderer.hideMultipleSelectorDummyShape();
}else{
if(!this.renderer.isMultipleSelect(_384)&&this.SHIFT_MODE){
if(this.renderer.isMultipleSelect(this.selected)){
if(this.multipleSelectShapes.contains(_384)){
this.multipleSelectShapes.removeShape(_384);
setHelp("<font color='red'>Shape removed from multiple selector</font>");
}else{
this.multipleSelectShapes.addShape(_384,this.renderer.getBoundingBox(_384));
setHelp("<font color='red'>New Shape added to multiple selector</font>");
}}else{
this.multipleSelectShapes.addShape(this.selected,this.renderer.getBoundingBox(this.selected));
this.multipleSelectShapes.addShape(_384,this.renderer.getBoundingBox(_384));
setHelp("<font color='red'>New Shape added to multiple selector</font>");
}var _385=this.multipleSelectShapes.getShapes();
if(_385.length>1){
this.multipleSelectShapes.reset();
this.multipleSelectShapes.setSelectedShapes(_385);
this.resetMultipleSelectorDummy();
}else{
if(_385.length==1){
this.select(_385[0]);
this.multipleSelectShapes.reset();
this.renderer.hideMultipleSelectorDummyShape();
}}this.select(this.selected);
this.renderer.updateTracker(this.selected);
}}this.selectedBounds=this.renderer.bounds(this.selected);
if(this.renderer.isMultipleSelect(this.selected)){
this.multipleSelectShapes.updateShapeBounds();
}var _386=Position.cumulativeOffset(this.container);
this.mouseDownX=Math.round((Event.pointerX(_382)-_386[0])/this.gridX)*this.gridX;
this.mouseDownY=Math.round((Event.pointerY(_382)-_386[1])/this.gridY)*this.gridY;
Event.observe(this.container,"mousemove",this.onDragListener);
}};
CDEditor.prototype.createNewImage=function(url,x,y,_38a,_38b){
var _38c=this.renderer.createImage(url,x,y,_38a,_38b);
_38c.setAttribute("id","shape:"+createUUID());
this.addNewShapeListeners(_38c);
this.select(_38c);
this.selectedBounds=this.renderer.bounds(_38c);
Event.stopObserving(this.container,"mousemove",this.onDragListener);
};
CDEditor.prototype.createNewShape=function(id,x,y,_390,_391,_392,_393){
this.unselect();
this.multipleSelectShapes.reset();
this.renderer.hideMultipleSelectorDummyShape();
var _394=Position.cumulativeOffset(this.container);
var _395=Math.round((x-_394[0])/this.gridX)*this.gridX;
var _396=Math.round((y-_394[1])/this.gridY)*this.gridY;
var _397=_395+this.container.parentNode.scrollLeft;
var _398=_396+this.container.parentNode.scrollTop;
var _399=this.renderer.create(id,0,0,0,_397-_390/2,_398-_391/2,_390,_391,1,true,_393);
_399.setAttribute("id","shape:"+createUUID());
this.addNewShapeListeners(_399);
this.select(_399);
this.selectedBounds=this.renderer.bounds(_399);
if(_392){
this.mouseDownX=_395;
this.mouseDownY=_396;
Event.stopObserving(this.container,"mousemove",this.onDragListener);
Event.observe(this.container,"mousemove",this.onDragListener);
}};
CDEditor.prototype.endCreateNewShape=function(){
Event.stopObserving(this.container,"mousemove",this.onDragListener);
};
CDEditor.prototype.updateShapeInfo=function(_39a){
var rect=new Object();
if(_39a==null){
rect["width"]=this.width;
rect["height"]=this.height;
this.pageProps.width.value=rect["width"];
this.pageProps.height.value=rect["height"];
this.shapeProps.table.style.visibility="hidden";
this.pageProps.table.style.visibility="visible";
this.lineProps.table.style.visibility="hidden";
}else{
rect=this.renderer.bounds(_39a);
if(!this.renderer.isConnector(_39a)){
rect["x"]=(rect["x"]*(1/this.zoom)).toFixed(0);
rect["y"]=(rect["y"]*(1/this.zoom)).toFixed(0);
rect["width"]=(rect["width"]*(1/this.zoom)).toFixed(0);
rect["height"]=(rect["height"]*(1/this.zoom)).toFixed(0);
this.shapeProps.width.value=rect["width"];
this.shapeProps.height.value=rect["height"];
this.shapeProps.x.value=rect["x"];
this.shapeProps.y.value=rect["y"];
this.shapeProps.rotation.value=rect["rotation"];
this.shapeProps.table.style.visibility="visible";
this.lineProps.table.style.visibility="hidden";
this.pageProps.table.style.visibility="hidden";
}else{
rect["x"]=(rect["x"]*(1/this.zoom)).toFixed(0);
rect["y"]=(rect["y"]*(1/this.zoom)).toFixed(0);
rect["x2"]=(rect["x2"]*(1/this.zoom)).toFixed(0);
rect["y2"]=(rect["y2"]*(1/this.zoom)).toFixed(0);
this.lineProps.x1.innerHTML=rect["x"];
this.lineProps.x2.innerHTML=rect["x2"];
this.lineProps.y1.innerHTML=rect["y"];
this.lineProps.y2.innerHTML=rect["y2"];
this.lineProps.type.innerHTML=rect["type"];
this.shapeProps.table.style.visibility="hidden";
this.lineProps.table.style.visibility="visible";
this.pageProps.table.style.visibility="hidden";
}}};
CDEditor.prototype.appendPageAttribute=function(div,_39d){
this.renderer.appendPageAttribute(div,_39d);
};
CDEditor.prototype.getRealData=function(){
return this.renderer.getRealData();
};
CDEditor.prototype.getValidDocumentFromResponse=function(_39e){
return this.renderer.getValidDocumentFromResponse(_39e);
};
CDEditor.prototype.loadPalette=function(id){
var _3a0=this.renderer.loadXML("shapes/palettes/"+id+".xml");
return _3a0.getElementsByTagName("palette")[0];
};
CDEditor.prototype.updateShape=function(_3a1,_3a2,x,y,_3a5){
if(this.selected&&!this.renderer.isMultipleSelect(this.selected)){
var rect=this.selected;
_3a1=(_3a1*(this.zoom/1)).toFixed(0);
_3a2=(_3a2*(this.zoom/1)).toFixed(0);
x=(x*(this.zoom/1)).toFixed(0);
y=(y*(this.zoom/1)).toFixed(0);
this.renderer.setWidth(this.selected,_3a1);
this.renderer.setHeight(this.selected,_3a2);
this.renderer.setX(this.selected,x);
this.renderer.setY(this.selected,y);
this.renderer.setRotation(this.selected,_3a5);
this.renderer.updateTracker(this.selected);
this.renderer.moveLineWithShape(this.selected);
this.clearShapeText(this.selected);
this.resetShapeText(this.selected);
}else{
setHelp("Please select a single shape to update");
}};
CDEditor.prototype.align=function(_3a7){
if(!this.renderer.isMultipleSelect(this.selected)){
setHelp("Please select multiple shapes to align");
return;
}var _3a8=this.multipleSelectShapes.getShapes();
var _3a9=_3a8[0];
var _3aa=this.renderer.getBoundingBox(_3a9);
for(var i=1;
i<_3a8.length;
i++){
if(this.renderer.isConnector(_3a8[i])){
continue;
}var _3ac=this.renderer.getBoundingBox(_3a8[i]);
if(_3a7=="LEFT"){
this.alignLeft(_3a8[i],_3ac,_3aa);
}else{
if(_3a7=="TOP"){
this.alignTop(_3a8[i],_3ac,_3aa);
}else{
if(_3a7=="RIGHT"){
this.alignRight(_3a8[i],_3ac,_3aa);
}else{
if(_3a7=="BOTTOM"){
this.alignBottom(_3a8[i],_3ac,_3aa);
}else{
if(_3a7=="HORIZONTAL_CENTER"){
this.alignHorizontalCenter(_3a8[i],_3ac,_3aa);
}else{
if(_3a7=="VERTICAL_CENTER"){
this.alignVerticalCenter(_3a8[i],_3ac,_3aa);
}}}}}}this.renderer.updateRotation(_3a8[i]);
this.renderer.moveLineWithShape(_3a8[i]);
this.clearShapeText(_3a8[i]);
this.resetShapeText(_3a8[i]);
}this.renderer.updateTracker(this.selected);
this.updateShapeInfo(this.selected);
};
CDEditor.prototype.alignLeft=function(_3ad,_3ae,_3af){
var _3b0=(_3ae.x*1)+(_3af.x-_3ae.x);
this.renderer.setX(_3ad,_3b0);
};
CDEditor.prototype.alignTop=function(_3b1,_3b2,_3b3){
var _3b4=(_3b2.y*1)+(_3b3.y-_3b2.y);
this.renderer.setY(_3b1,_3b4);
};
CDEditor.prototype.alignRight=function(_3b5,_3b6,_3b7){
var _3b8=(_3b6.x*1)+((_3b7.x*1)+(_3b7.width*1)-(_3b6.x*1)-(_3b6.width*1));
this.renderer.setX(_3b5,_3b8);
};
CDEditor.prototype.alignBottom=function(_3b9,_3ba,_3bb){
var _3bc=(_3ba.y*1)+((_3bb.y*1)+(_3bb.height*1)-(_3ba.y*1)-(_3ba.height*1));
this.renderer.setY(_3b9,_3bc);
};
CDEditor.prototype.alignVerticalCenter=function(_3bd,_3be,_3bf){
var _3c0=(_3be.y*1)+((_3bf.y*1)+(_3bf.height/2)-(_3be.y*1)-(_3be.height/2));
this.renderer.setY(_3bd,_3c0);
};
CDEditor.prototype.alignHorizontalCenter=function(_3c1,_3c2,_3c3){
var _3c4=(_3c2.x*1)+((_3c3.x*1)+(_3c3.width/2)-(_3c2.x*1)-(_3c2.width/2));
this.renderer.setX(_3c1,_3c4);
};
CDEditor.prototype.clearSystemShapes=function(){
this.unselect();
var _3c5=$("active-shape-tracker");
if(_3c5){
this.renderer.remove(_3c5);
}var _3c6=$(this.renderer.MULTIPLE_SELECTOR_DUMMY_ID);
this.renderer.remove(_3c6);
var _3c7=$(this.renderer.MULTIPLE_SELECTOR_TRACKER_ID);
this.renderer.remove(_3c7);
};
function rad2Deg(_3c8){
return _3c8*(180/Math.PI);
}
function createUUID(){
return [4,2,2,2,6].map(function(_3c9){
var _3ca="";
for(var i=0;
i<_3c9;
i++){
var _3cc=parseInt((Math.random()*256)).toString(16);
if(_3cc.length==1){
_3cc="0"+_3cc;
}_3ca+=_3cc;
}return _3ca;
}).join("-");
}
function SVGRenderer(){
this.base=AbstractRenderer;
this.svgRoot=null;
}SVGRenderer.prototype=new AbstractRenderer;
SVGRenderer.prototype.init=function(elem){
Node.prototype.__defineGetter__("xml",_getXML);
this.MAX_HEIGHT=2000;
this.MAX_WIDTH=2000;
this.COORD_X=1000;
this.COORD_Y=1000;
this.CONNECTOR_TAG="svg:connector";
this.LINE_DELIMITER="\n";
this.GRADIENT_PREFIX="GRADIENT";
this.MARKER_BEGIN_PREFIX="MARKER_START";
this.MARKER_END_PREFIX="MARKER_END";
this.EXTENSION="fmd";
this.TYPE="SVG";
this.container=elem;
this.svgNamespace="http://www.w3.org/2000/svg";
this.cumulateNamespace="urn:schemas-cumulatelabs-com:svg";
this.xmlNamespace="http://www.w3.org/2001/xml";
this.svgRoot=this.container.ownerDocument.createElementNS(this.svgNamespace,"svg");
this.svgRoot.setAttribute("xml:space","preserve");
this.LONG_DASH="7,3";
this.SHORT_DASH="4,3";
var _3ce=this.loadShape("shadow","defs");
this.svgRoot.id=this.SVG_ROOT_ID;
this.svgRoot.style.position="absolute";
this.svgRoot.style.zIndex=10;
this.svgRoot.setAttributeNS(null,"x","0px");
this.svgRoot.setAttributeNS(null,"y","0px");
this.svgRoot.setAttributeNS(null,"width",this.MAX_WIDTH+"px");
this.svgRoot.setAttributeNS(null,"height",this.MAX_HEIGHT+"px");
this.svgRoot.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
var _3cf=this.container.firstChild;
this.svgRoot.style.MozUserSelect="none";
this.minIndex=200;
this.maxIndex=200;
this.container.insertBefore(this.svgRoot,_3cf);
this.importAndAppendChild(this.svgRoot,_3ce);
};
SVGRenderer.prototype.importAndAppendChild=function(_3d0,_3d1){
if(_3d0&&_3d1){
var _3d2=_3d0.ownerDocument.importNode(_3d1,true);
_3d0.appendChild(_3d2);
return _3d2;
}};
SVGRenderer.prototype.getNamespacedElement=function(node,_3d4,_3d5){
var _3d6=node.getElementsByTagName(_3d4+":"+_3d5);
if(_3d6==null||_3d6.length==0){
_3d6=node.getElementsByTagName(_3d5);
}return _3d6;
};
SVGRenderer.prototype.bounds=function(_3d7){
if(!_3d7){
return;
}var rect={
x:0,y:0,width:0,height:0,rotation:0,x2:0,y2:0,id:0,type:"",controlX:0,controlY:0,controlX2:0,controlY2:0};
rect["id"]=_3d7.getAttributeNS(null,"id");
if(this.isConnector(_3d7)){
rect["x"]=this.getConnectorFromX(_3d7);
rect["y"]=this.getConnectorFromY(_3d7);
rect["x2"]=this.getConnectorToX(_3d7);
rect["y2"]=this.getConnectorToY(_3d7);
rect["type"]=this.getConnectorType(_3d7);
if(rect.type=="curve-line"){
var obj1=this.getControl1(_3d7);
var obj2=this.getControl2(_3d7);
rect["controlX"]=obj1.x;
rect["controlY"]=obj1.y;
rect["controlX2"]=obj2.x;
rect["controlY2"]=obj2.y;
}}else{
rect["rotation"]=this.getRotation(_3d7);
if(!rect["rotation"]){
rect["rotation"]=0;
}rect["x"]=this.getX(_3d7);
rect["y"]=this.getY(_3d7);
rect["width"]=this.getWidth(_3d7);
rect["height"]=this.getHeight(_3d7);
}return rect;
};
SVGRenderer.prototype.loadShape=function(_3db,_3dc){
objValidXMLFile=this.loadXML("shapes/svg/"+_3db+".xml");
var _3dd=objValidXMLFile.getElementsByTagName(_3dc);
if(_3dc){
var node=_3dd[0];
return node;
}};
SVGRenderer.prototype.loadXML=function(path){
var url=path;
var ajax=new XMLHttpRequest();
ajax.open("POST",url,false);
ajax.send("shaperequest");
return ajax.responseXML;
};
SVGRenderer.prototype.createLine=function(_3e2,_3e3,_3e4,left,top,_3e7){
var svg=this.loadShape(_3e2,"g");
svg=this.importAndAppendChild(this.svgRoot,svg);
if(_3e2=="line"||_3e2=="curve-line"){
this.setLineFrom(svg,left,top);
this.setLineTo(svg,left,top);
}if(_3e2=="curve-line"){
this.setControl1(svg,left,top);
this.setControl2(svg,left,top);
}var _3e9=this.getMarkers(svg);
_3e9[0].id=this.MARKER_BEGIN_PREFIX+createUUID();
_3e9[1].id=this.MARKER_END_PREFIX+createUUID();
this.setZIndex(svg,this.maxIndex++);
return svg;
};
SVGRenderer.prototype.create=function(_3ea,_3eb,_3ec,_3ed,left,top,_3f0,_3f1){
var svg=this.loadShape(_3ea,"g");
svg=this.importAndAppendChild(this.svgRoot,svg);
this.setX(svg,left);
this.setY(svg,top);
this.setWidth(svg,_3f0);
this.setHeight(svg,_3f1);
this.setZIndex(svg,this.maxIndex++);
this.fixLinearGradientID(svg);
return svg;
};
SVGRenderer.prototype.createImage=function(_3f3,left,top,_3f6,_3f7){
var svg=this.create(this.IMAGE_TEMPLATE,null,null,null,left,top,_3f6,_3f7);
var _3f9=this.getShapeSubject(svg);
_3f9.setAttribute("xlink:href",_3f3);
return svg;
};
SVGRenderer.prototype.createElement=function(_3fa,_3fb){
if(_3fb=="CUMULATE_LABS"){
return this.container.ownerDocument.createElementNS(this.cumulateNamespace,_3fa);
}else{
return this.container.ownerDocument.createElementNS(this.svgNamespace,_3fa);
}};
SVGRenderer.prototype.getAttribute=function(_3fc,_3fd){
return _3fc.getAttributeNS(null,_3fd);
};
SVGRenderer.prototype.copy=function(_3fe){
if(!_3fe){
return null;
}
return _3fe.cloneNode(true);
};
SVGRenderer.prototype.paste=function(_3ff){
if(!_3ff){
return;
}var node=_3ff.cloneNode(true);
node.id="shape:"+createUUID();
var svg=node.getElementsByTagName("svg");
if(svg.length>0){
svg.item(0).id="shape:"+createUUID();
}var text=node.getElementsByTagName("text");
for(var i=0;
i<text.length;
i++){
var _404=text.item(i);
if(_404.id.indexOf(this.TEXT_TEMPLATE_PREFIX)>=0){
_404.id=this.TEXT_TEMPLATE_PREFIX+node.id;
}}if(!this.isConnector(node)){
var x=this.getX(node);
var y=this.getY(node);
var _407=this.getRotation(node);
this.setX(node,(x*1)+10);
this.setY(node,(y*1)+10);
this.updateRotation(node);
this.fixLinearGradientID(node);
}if(this.isConnector(node)){
var _408=this.getMarkers(node);
_408[0].id=this.MARKER_BEGIN_PREFIX+createUUID();
_408[1].id=this.MARKER_END_PREFIX+createUUID();
var _409=this.getLineStyle(node);
this.setLineStyle(node,_409);
this.moveCompleteLine(node,this.bounds(node),10,10);
}var _40a=this.getNamespacedElement(node,"c","connection");
var _40b=new Array();
for(var i=0;
i<_40a.length;
i++){
if(this.isConnector(node)){
_40a.item(i).setAttribute("shapeid","xx");
_40a.item(i).setAttribute("shapepoint","-1");
}else{
_40b[i]=_40a.item(i);
}}for(var i=0;
i<_40b.length;
i++){
this.remove(_40b[i]);
}this.svgRoot.appendChild(node);
return node;
};
AbstractRenderer.prototype.isImage=function(_40c){
if(!_40c){
return false;
}var _40d=_40c.getElementsByTagName("image").length;
if(_40d>0){
return true;
}else{
return false;
}};
SVGRenderer.prototype.isConnector=function(_40e){
if(_40e){
return (this.getNamespacedElement(_40e,"c","connector").length>0);
}else{
return false;
}};
SVGRenderer.prototype.setZIndex=function(_40f,_410){
if(_40f){
_40f.setAttributeNS(null,"z-index",_410);
}};
SVGRenderer.prototype.getZIndex=function(_411){
if(_411){
return _411.getAttributeNS(null,"z-index");
}};
SVGRenderer.prototype.sendToBack=function(_412){
if(_412){
var node=_412.cloneNode(true);
this.remove(_412);
var _414=this.svgRoot.getElementsByTagName("g");
if(_414.length>0){
this.svgRoot.insertBefore(node,_414[0]);
}else{
this.svgRoot.appendChild(node);
}this.setZIndex(node,this.minIndex--);
return node;
}};
SVGRenderer.prototype.bringToFront=function(_415){
if(_415){
var node=_415.cloneNode(true);
this.remove(_415);
node=this.importAndAppendChild(this.svgRoot,node);
this.setZIndex(node,this.maxIndex++);
return node;
}};
SVGRenderer.prototype.setLineFrom=function(_417,_418,_419){
var _41a=this.getShapeSubject(_417);
var type=this.getConnectorType(_417);
if(type=="line"){
_41a.setAttributeNS(null,"x1",_418);
_41a.setAttributeNS(null,"y1",_419);
}else{
if(type=="curve-line"){
var path=_41a.pathSegList;
var _41d=path.getItem(0);
_41d.x=_418;
_41d.y=_419;
}}};
SVGRenderer.prototype.setLineTo=function(_41e,toX,toY){
var _421=this.getShapeSubject(_41e);
var type=this.getConnectorType(_41e);
if(type=="line"){
_421.setAttributeNS(null,"x2",toX);
_421.setAttributeNS(null,"y2",toY);
}else{
if(type=="curve-line"){
var path=_421.pathSegList;
var _424=path.getItem(1);
_424.x=toX;
_424.y=toY;
}}};
SVGRenderer.prototype.setControl1=function(_425,toX,toY){
var _428=this.getShapeSubject(_425);
var path=_428.pathSegList;
var _42a=path.getItem(1);
_42a.x1=toX;
_42a.y1=toY;
};
SVGRenderer.prototype.getControl1=function(_42b){
var _42c=this.getShapeSubject(_42b);
var path=_42c.pathSegList;
var _42e=path.getItem(1);
var obj=new Object();
obj.x=_42e.x1;
obj.y=_42e.y1;
return obj;
};
SVGRenderer.prototype.setControl2=function(_430,toX,toY){
var _433=this.getShapeSubject(_430);
var path=_433.pathSegList;
var _435=path.getItem(1);
_435.x2=toX;
_435.y2=toY;
};
SVGRenderer.prototype.getControl2=function(_436){
var _437=this.getShapeSubject(_436);
var path=_437.pathSegList;
var _439=path.getItem(1);
var obj=new Object();
obj.x=_439.x2;
obj.y=_439.y2;
return obj;
};
SVGRenderer.prototype.moveLinePoint=function(_43b,toX,toY,_43e){
this.moveLine(_43b,toX,toY,_43e);
};
SVGRenderer.prototype.moveLine=function(_43f,toX,toY,_442){
if(!_43f||!this.isConnector(_43f)){
return;
}var type=this.getConnectorType(_43f);
if(type=="line"||type=="curve-line"){
if(_442){
this.setLineFrom(_43f,toX,toY);
}else{
this.setLineTo(_43f,toX,toY);
}}else{
var _444=_43f.getElementsByTagName("polyline")[0];
var _445=_444.points;
var _446=_445.numberOfItems;
if(_442){
var x=_445.getItem(_446-1).x;
var y=_445.getItem(_446-1).y;
this.drawOrthoLine(_43f,toX,toY,x,y);
}else{
var x=_445.getItem(0).x;
var y=_445.getItem(0).y;
this.drawOrthoLine(_43f,x,y,toX,toY);
}}};
SVGRenderer.prototype.getOrthoLineCenterSegment=function(_449){
var obj=new Object();
var _44b=this.getShapeSubject(_449).points;
var _44c=Math.round(_44b.numberOfItems/2-1);
var _44d=_44b.getItem(_44c);
var _44e=_44b.getItem(_44c-1);
var _44f=_44b.getItem(_44c+1);
var _450=((_44d.y-_44e.y)*(_44d.y-_44e.y))+((_44d.x-_44e.x)*(_44d.x-_44e.x));
var _451=((_44d.y-_44f.y)*(_44d.y-_44f.y))+((_44d.x-_44f.x)*(_44d.x-_44f.x));
var _452=_450>_451?_44e:_44f;
obj.x=_452.x;
obj.y=_452.y;
obj.x2=_44d.x;
obj.y2=_44d.y;
return obj;
};
SVGRenderer.prototype.drawOrthoLine=function(_453,_454,_455,toX,toY){
var path=this.calculateOrthoLinePath(_453,_454,_455,toX,toY);
var _459=this.getShapeSubject(_453);
_459.setAttributeNS(null,"points",path);
};
SVGRenderer.prototype.showConnectionPoints=function(_45a){
if(!_45a){
return;
}var rect=this.bounds(_45a);
var _45c=rect["rotation"];
if(!_45c){
_45c=0;
}this.remove($("active-shape-tracker"));
var doc=this.container.ownerDocument;
var _45e=doc.createElementNS(this.svgNamespace,"g");
var svg=doc.createElementNS(this.svgNamespace,"svg");
_45e.appendChild(svg);
_45e.style.position="ABSOLUTE";
_45e.style.zIndex=this.maxIndex+1;
var _460=parseInt(rect["x"])+parseInt(rect["width"]/2);
var _461=parseInt(rect["y"])+parseInt(rect["height"]/2);
_45e.setAttributeNS(null,"transform","rotate("+_45c+","+_460+","+_461+")");
_45e.style.zIndex=(_45a.style.zIndex*1)+1;
_45e.id="active-shape-tracker";
var _462=rect["width"];
var _463=rect["height"];
var _464=this.getNamespacedElement(_45a,"c","connection-point");
for(var i=0;
i<_464.length;
i++){
var node=_464.item(i);
var oval=doc.createElementNS(this.svgNamespace,"circle");
var x=parseInt(rect["x"])+(node.getAttribute("x")*_462/this.COORD_X);
var y=parseInt(rect["y"])+(node.getAttribute("y")*_463/this.COORD_Y);
oval.setAttributeNS(null,"fill","red");
oval.setAttributeNS(null,"stroke","black");
oval.style.position="ABSOLUTE";
oval.setAttributeNS(null,"cx",x);
oval.setAttributeNS(null,"cy",y);
oval.setAttributeNS(null,"r","3");
svg.appendChild(oval);
}this.svgRoot.appendChild(_45e);
};
SVGRenderer.prototype.connectLine=function(_46a,_46b,_46c){
if(!_46b){
return;
}this.disconnectLineFromShape(_46b,_46c);
if(!_46a){
return;
}var _46d=screen.logicalXDPI/72;
var x=0;
var y=0;
var type=this.getConnectorType(_46b);
if(type=="line"||type=="curve-line"){
var line=this.getShapeSubject(_46b);
if(_46c=="from"){
x=this.getConnectorFromX(_46b);
y=this.getConnectorFromY(_46b);
}else{
x=this.getConnectorToX(_46b);
y=this.getConnectorToY(_46b);
}}else{
if(_46c=="from"){
x=this.getShapeSubject(_46b).points.getItem(0).x;
y=this.getShapeSubject(_46b).points.getItem(0).y;
}else{
var _472=this.getShapeSubject(_46b).points.numberOfItems;
if(_472==0){
return;
}x=this.getShapeSubject(_46b).points.getItem(_472-1).x;
y=this.getShapeSubject(_46b).points.getItem(_472-1).y;
}}var rect=this.bounds(_46a);
var _474=parseInt(rect["x"]*1)+parseInt(rect["width"]/2);
var _475=parseInt(rect["y"]*1)+(rect["height"]/2);
var _476=rect["rotation"];
if(!_476){
_476=0;
}var _477=this.getNamespacedElement(_46a,"c","connection-point");
for(var i=0;
i<_477.length;
i++){
var node=_477.item(i);
var conX=(rect["x"]*1)+((node.getAttributeNS(null,"x")/this.COORD_X)*rect["width"]);
var conY=(rect["y"]*1)+((node.getAttributeNS(null,"y")/this.COORD_Y)*rect["height"]);
conX=conX-_474;
conY=conY-_475;
var _47c=((conX*Math.cos((Math.PI/180)*(_476)))-(conY*Math.sin((Math.PI/180)*(_476)))*1)+(_474*1);
var _47d=((conX*Math.sin((Math.PI/180)*(_476)))+(conY*Math.cos((Math.PI/180)*(_476)))*1)+(_475*1);
if(x>(_47c-4)&&x<((_47c*1)+4)&&y>(_47d-4)&&y<((_47d*1)+4)){
this.connectLineToShape(_46a,_46b,_46c,node,i);
var _47e=(_46c=="from")?true:false;
this.moveLine(_46b,_47c,_47d,_47e);
$("help").innerHTML="Connected line to shape";
return;
}}};
SVGRenderer.prototype.getConnectorType=function(_47f){
return _47f.getAttributeNS(null,"type");
};
SVGRenderer.prototype.getConnectorFromX=function(_480){
var x1=null;
var type=this.getConnectorType(_480);
if(type=="line"){
x1=this.getShapeSubject(_480).getAttributeNS(null,"x1");
}else{
if(type=="curve-line"){
var _483=this.getShapeSubject(_480);
var path=_483.pathSegList;
x1=path.getItem(0).x;
}else{
var _485=this.getShapeSubject(_480);
var _486=_485.points;
if(_486.numberOfItems>0){
x1=_486.getItem(0).x;
}}}return x1;
};
SVGRenderer.prototype.getConnectorFromY=function(_487){
var y1=null;
var type=this.getConnectorType(_487);
if(type=="line"){
y1=this.getShapeSubject(_487).getAttributeNS(null,"y1");
}else{
if(type=="curve-line"){
var _48a=this.getShapeSubject(_487);
var path=_48a.pathSegList;
y1=path.getItem(0).y;
}else{
var _48c=this.getShapeSubject(_487);
var _48d=_48c.points;
if(_48d.numberOfItems>0){
y1=_48d.getItem(0).y;
}}}return y1;
};
SVGRenderer.prototype.getConnectorToX=function(_48e){
var x2=null;
var type=this.getConnectorType(_48e);
if(type=="line"){
x2=this.getShapeSubject(_48e).getAttributeNS(null,"x2");
}else{
if(type=="curve-line"){
var _491=this.getShapeSubject(_48e);
var path=_491.pathSegList;
x2=path.getItem(1).x;
}else{
var _493=this.getShapeSubject(_48e);
var _494=_493.points;
var _495=_494.numberOfItems;
if(_495==0){
return null;
}x2=_494.getItem(_495-1).x;
}}return x2;
};
SVGRenderer.prototype.getConnectorToY=function(_496){
var y2;
var type=this.getConnectorType(_496);
if(type=="line"){
y2=this.getShapeSubject(_496).getAttributeNS(null,"y2");
}else{
if(type=="curve-line"){
var _499=this.getShapeSubject(_496);
var path=_499.pathSegList;
y2=path.getItem(1).y;
}else{
var _49b=this.getShapeSubject(_496);
var _49c=_49b.points;
var _49d=_49c.numberOfItems;
if(_49d==0){
return;
}y2=_49c.getItem(_49d-1).y;
}}return y2;
};
SVGRenderer.prototype.getAllShapes=function(doc){
var _49f=doc.getElementsByTagName("g");
var _4a0=new Array();
for(var i=0;
i<_49f.length;
i++){
if(!this.isConnector(_49f[i])){
_4a0[_4a0.length]=_49f[i];
}}return _4a0;
};
SVGRenderer.prototype.getAllConnectors=function(doc){
var _4a3=doc.getElementsByTagName("g");
var _4a4=new Array();
for(var i=0;
i<_4a3.length;
i++){
if(this.isConnector(_4a3[i])){
_4a4[_4a4.length]=_4a3[i];
}}return _4a4;
};
SVGRenderer.prototype.getStrokeWidth=function(_4a6){
if(!_4a6){
return null;
}return this.getShapeSubject(_4a6).getAttributeNS(null,"stroke-width");
};
SVGRenderer.prototype.setStrokeWidth=function(_4a7,_4a8){
this.getShapeSubject(_4a7).setAttributeNS(null,"stroke-width",_4a8);
};
SVGRenderer.prototype.getLineColor=function(_4a9){
return this.getShapeSubject(_4a9).getAttributeNS(null,"stroke");
};
SVGRenderer.prototype.setLineColor=function(_4aa,_4ab){
if(_4ab==""){
_4ab="none";
}this.getShapeSubject(_4aa).setAttributeNS(null,"stroke",_4ab);
if(this.isConnector(_4aa)){
var _4ac=this.getMarkers(_4aa);
_4ac[0].setAttributeNS(null,"stroke",_4ab);
_4ac[0].setAttributeNS(null,"fill",_4ab);
_4ac[1].setAttributeNS(null,"stroke",_4ab);
_4ac[1].setAttributeNS(null,"fill",_4ab);
}};
SVGRenderer.prototype.getOpacity=function(_4ad){
if(this.isImage(_4ad)){
return this.getShapeSubject(_4ad).getAttributeNS(null,"opacity");
}return this.getShapeSubject(_4ad).getAttributeNS(null,"fill-opacity");
};
SVGRenderer.prototype.setOpacity=function(_4ae,_4af){
if(_4af!=""){
var _4b0=_4ae.getElementsByTagName("image").length;
if(_4b0>0){
this.getShapeSubject(_4ae).setAttributeNS(null,"opacity",_4af);
}else{
this.getShapeSubject(_4ae).setAttributeNS(null,"fill-opacity",_4af);
}}};
SVGRenderer.prototype.getFillColor=function(_4b1){
if(!this.isConnector(_4b1)){
if(!this.getLinearGradient(_4b1)){
return this.getShapeSubject(_4b1).getAttributeNS(null,"fill");
}else{
var _4b2=this.getLinearGradientElement(_4b1);
var stop=_4b2.getElementsByTagName("stop")[0];
return stop.getAttributeNS(null,"stop-color");
}}};
SVGRenderer.prototype.setFillColor=function(_4b4,_4b5){
if(_4b5==""){
return;
}if(this.isConnector(_4b4)){
return;
}var _4b6=this.getLinearGradient(_4b4);
var _4b7=this.getNamespacedElement(_4b4,"c","attributes");
var _4b8=false;
var _4b9=this.getLinearGradientElement(_4b4);
var stop=_4b9.getElementsByTagName("stop")[0];
stop.setAttributeNS(null,"stop-color",_4b5);
if(!_4b6&&!_4b8){
var _4bb=this.getAllSubShapes(_4b4);
if(_4b7.length==0||_4b7[0].getAttribute("fill")!="complete"){
var _4bc=this.getShapeSubject(_4b4);
this.getShapeSubject(_4b4).setAttributeNS(null,"fill",_4b5);
}else{
for(var i=0;
i<_4bb.length;
i++){
_4bb[i].setAttributeNS(null,"fill",_4b5);
}}}if(_4b7.length>0&&_4b7[0].getAttribute("color-filter")!=null){
_4b8=true;
var _4bb=this.getAllSubShapes(_4b4);
var _4be=_utils;
var _4bf=_utils.parseColorFilter(_4b7[0].getAttribute("color-filter"));
if(_4bf.length>0){
var rgb=_utils.decodeColor(_4b5);
for(var i=0;
i<_4bf.length;
i++){
var r=Math.round(_4bf[i].r*rgb.r);
var g=Math.round(_4bf[i].g*rgb.g);
var b=Math.round(_4bf[i].b*rgb.b);
_4bb[(_4bf[i].index)*2].setAttributeNS(null,"fill","rgb("+r+","+g+","+b+")");
}}}};
SVGRenderer.prototype.setShadow=function(_4c4,_4c5){
if(_4c5!="false"){
this.getShapeSubject(_4c4).setAttributeNS(null,"filter","url(#shadow_filter)");
}else{
this.getShapeSubject(_4c4).setAttributeNS(null,"filter","");
}};
SVGRenderer.prototype.getShadow=function(_4c6){
if(!_4c6){
return false;
}var _4c7=this.getShapeSubject(_4c6).getAttributeNS(null,"filter");
return (_4c7=="url(#shadow_filter)");
};
SVGRenderer.prototype.getLinearGradientElement=function(_4c8){
var _4c9=_4c8.getElementsByTagName("linearGradient");
if(_4c9.length>0){
return _4c9[0];
}else{
return null;
}};
SVGRenderer.prototype.setLinearGradient=function(_4ca,_4cb){
if(this.isConnector(_4ca)){
return;
}var _4cc=this.getShapeSubject(_4ca);
var _4cd=this.getLinearGradientElement(_4ca);
if(_4cb){
var _4ce="url(#"+_4cd.id+")";
_4cc.setAttributeNS(null,"fill",_4ce);
}else{
var stop=_4cd.getElementsByTagName("stop")[0];
var _4d0=stop.getAttributeNS(null,"stop-color");
_4cc.setAttributeNS(null,"fill",_4d0);
}};
SVGRenderer.prototype.getLinearGradient=function(_4d1){
var _4d2=this.getShapeSubject(_4d1);
var _4d3=_4d2.getAttributeNS(null,"fill");
return (_4d3.indexOf("url")>=0);
};
SVGRenderer.prototype.fixLinearGradientID=function(_4d4){
var _4d5=_4d4.getElementsByTagName("linearGradient");
var _4d6=this.getAllSubShapes(_4d4);
for(var i=0;
i<_4d5.length;
i++){
var _4d8=_4d5.item(i);
var _4d9=_4d8.id;
var _4da="Gradient0"+(i+1)+createUUID();
_4d8.id=_4da;
for(var j=0;
j<_4d6.length;
j++){
var _4dc=_4d6.item(j);
if("url(#"+_4d9+")"==_4dc.getAttributeNS(null,"fill")||"url("+_4d9+")"==_4dc.getAttributeNS(null,"fill")){
_4dc.setAttributeNS(null,"fill","url(#"+_4da+")");
}}}};
SVGRenderer.prototype.getMarkers=function(_4dd){
return _4dd.getElementsByTagName("marker");
};
SVGRenderer.prototype.setLineStyle=function(_4de,_4df){
if(!this.isConnector(_4de)){
return;
}var _4e0=this.getMarkers(_4de);
var _4e1="";
var _4e2="";
if(_4df=="arrow-from"||_4df=="arrow-both"){
_4e1=_4e0[1].id;
}if(_4df=="arrow-to"||_4df=="arrow-both"){
_4e2=_4e0[0].id;
}if(_4e1.length>0){
_4e1="url(#"+_4e1+")";
}if(_4e2.length>0){
_4e2="url(#"+_4e2+")";
}var _4e3=this.getShapeSubject(_4de);
_4e3.setAttributeNS(null,"marker-start",_4e1);
_4e3.setAttributeNS(null,"marker-end",_4e2);
};
SVGRenderer.prototype.getLineStyle=function(_4e4){
if(!this.isConnector(_4e4)){
return "";
}var _4e5=this.getShapeSubject(_4e4);
var _4e6=_4e5.getAttributeNS(null,"marker-end");
var _4e7=_4e5.getAttributeNS(null,"marker-start");
if(_4e6.length>0&&_4e7.length>0){
return "arrow-both";
}else{
if(_4e6.length==0&&_4e7.length>0){
return "arrow-from";
}else{
if(_4e6.length>0&&_4e7.length==0){
return "arrow-to";
}else{
return "none";
}}}};
SVGRenderer.prototype.getLineDashStyle=function(_4e8){
var _4e9=this.getShapeSubject(_4e8);
var _4ea=_4e9.getAttributeNS(null,"stroke-dasharray");
if(!_4ea||_4ea==""){
return "solid";
}else{
if(_4ea==this.LONG_DASH){
return "long-dash";
}else{
return "short-dash";
}}};
SVGRenderer.prototype.setLineDashStyle=function(_4eb,_4ec){
if(_4ec=="long-dash"){
_4ec=this.LONG_DASH;
}else{
if(_4ec=="short-dash"){
_4ec=this.SHORT_DASH;
}else{
_4ec="";
}}if(this.isConnector(_4eb)){
var _4ed=this.getShapeSubject(_4eb);
_4ed.setAttributeNS(null,"stroke-dasharray",_4ec);
}else{
var _4ee=this.getAllSubShapes(_4eb);
for(var i=0;
i<_4ee.length;
i++){
_4ee[i].setAttributeNS(null,"stroke-dasharray",_4ec);
}}};
SVGRenderer.prototype.getShapeSubject=function(_4f0){
if(!_4f0){
return null;
}if(this.isConnector(_4f0)){
var type=this.getConnectorType(_4f0);
if(type=="line"){
return _4f0.getElementsByTagName("line")[0];
}else{
if(type=="ortho-line"){
return _4f0.getElementsByTagName("polyline")[0];
}else{
if(type=="curve-line"){
return _4f0.getElementsByTagName("path")[0];
}}}}else{
if(_4f0.getElementsByTagName("image").length>0){
return _4f0.getElementsByTagName("image")[0];
}else{
if(_4f0.getElementsByTagName("path").length>0){
var _4f2=this.getNamespacedElement(_4f0,"c","attributes");
if(!_4f2||_4f2.length==0||_4f2[0].getAttribute("shape-subject")==""){
return _4f0.getElementsByTagName("path")[0];
}else{
var _4f3=(_4f2[0].getAttribute("shape-subject")*2);
return _4f0.getElementsByTagName("path")[_4f3];
}}else{
return _4f0;
}}}};
SVGRenderer.prototype.getAllSubShapes=function(_4f4){
if(!_4f4){
return null;
}else{
return _4f4.getElementsByTagName("path");
}};
SVGRenderer.prototype.setX=function(_4f5,x){
if(_4f5){
var svg=_4f5.getElementsByTagName("svg")[0];
if(svg){
svg.setAttributeNS(null,"x",x+"px");
}}};
SVGRenderer.prototype.getX=function(_4f8,x){
if(_4f8){
var svg=_4f8.getElementsByTagName("svg")[0];
if(svg){
var x=svg.getAttributeNS(null,"x");
return x.split("px")[0];
}}};
SVGRenderer.prototype.getY=function(_4fb,x){
if(_4fb){
var svg=_4fb.getElementsByTagName("svg")[0];
if(svg){
var y=svg.getAttributeNS(null,"y");
return y.split("px")[0];
}}};
SVGRenderer.prototype.setY=function(_4ff,y){
if(_4ff){
var svg=_4ff.getElementsByTagName("svg")[0];
if(svg){
svg.setAttributeNS(null,"y",y+"px");
}}};
SVGRenderer.prototype.setWidth=function(_502,_503){
if(_502){
_502.getElementsByTagName("svg")[0].setAttributeNS(null,"width",_503);
var _504=_502.getElementsByTagName("path");
for(var i=0;
i<(_504.length/2);
i++){
var _506=i*2;
this.setPathWidth(_504[_506],_504[(_506*1)+1],_503);
}if(this.isImage(_502)){
var _507=this.getShapeSubject(_502);
_507.setAttributeNS(null,"width",_503);
}}};
SVGRenderer.prototype.setPathWidth=function(path,_509,_50a){
var _50b=path.pathSegList;
var _50c=_509.pathSegList;
for(var i=0;
i<_50b.numberOfItems;
i++){
var _50e=_50b.getItem(i);
var _50f=_50e.pathSegTypeAsLetter;
var _510=_50c.getItem(i);
_50e.x=(_50a)*(_510.x/this.COORD_X);
if(_50f=="M"||_50f=="L"){
continue;
}if(_50f=="A"){
_50e.r1=(_50a)*(_510.r1/this.COORD_X);
continue;
}if(_50f=="C"){
_50e.x1=(_50a)*(_510.x1/this.COORD_X);
_50e.x2=(_50a)*(_510.x2/this.COORD_X);
continue;
}}};
SVGRenderer.prototype.getWidth=function(_511,_512){
if(_511){
return _511.getElementsByTagName("svg")[0].getAttributeNS(null,"width");
}};
SVGRenderer.prototype.setHeight=function(_513,_514){
if(_513){
_513.getElementsByTagName("svg")[0].setAttributeNS(null,"height",_514);
var _515=_513.getElementsByTagName("path");
for(var i=0;
i<(_515.length/2);
i++){
var _517=i*2;
this.setPathHeight(_515[_517],_515[(_517*1)+1],_514);
}if(this.isImage(_513)){
var _518=this.getShapeSubject(_513);
_518.setAttributeNS(null,"height",_514);
}}};
SVGRenderer.prototype.setPathHeight=function(path,_51a,_51b){
var _51c=path.pathSegList;
var _51d=_51a.pathSegList;
for(var i=0;
i<_51c.numberOfItems;
i++){
var _51f=_51c.getItem(i);
var _520=_51d.getItem(i);
var _521=_51f.pathSegTypeAsLetter;
_51f.y=(_51b)*(_520.y/this.COORD_Y);
if(_521=="M"||_521=="L"){
continue;
}if(_521=="A"){
_51f.r2=(_51b)*(_520.r2/this.COORD_Y);
continue;
}if(_521=="C"){
_51f.y1=(_51b)*(_520.y1/this.COORD_Y);
_51f.y2=(_51b)*(_520.y2/this.COORD_Y);
continue;
}}};
SVGRenderer.prototype.getHeight=function(_522,_523){
if(_522){
return _522.getElementsByTagName("svg")[0].getAttributeNS(null,"height");
}};
SVGRenderer.prototype.getRotation=function(_524){
if(!_524||_524.id=="tracker-group"){
return null;
}try{
var item=_524.transform.baseVal.getItem(0);
}catch(e){
return null;
}return item.angle;
};
SVGRenderer.prototype.getCenterX=function(_526){
var box=this.bounds(_526);
return (box.x*1)+((box.width*1)/2);
};
SVGRenderer.prototype.getCenterY=function(_528){
var box=this.bounds(_528);
return (box.y*1)+((box.height*1)/2);
};
SVGRenderer.prototype.setRotation=function(_52a,_52b){
if(!_52a){
return null;
}var box=this.bounds(_52a);
var _52d=(box.x*1)+((box.width/2)*1);
var _52e=(box.y*1)+((box.height/2)*1);
var _52f="rotate("+_52b+","+_52d+","+_52e+")";
_52a.setAttributeNS(null,"transform",_52f);
var item=_52a.transform.baseVal.getItem(0);
item.matrix.rotate(_52b);
};
SVGRenderer.prototype.updateRotation=function(_531){
var _532=this.getRotation(_531);
this.setRotation(_531,_532);
};
SVGRenderer.prototype.setCursor=function(_533,_534){
if(_534=="move"||_534=="resize"||_534=="crosshair"||_534=="wait"||_534=="default"){
_533.style.cursor=_534;
}else{
_533.style.cursor="URL("+_534+"),auto";
}};
SVGRenderer.prototype.rotate=function(_535,_536){
if(!_536){
_536=0;
}_536=_536%360;
if(_536<0){
_536=360+_536;
}this.setRotation(_535,_536);
};
SVGRenderer.prototype.fineMove=function(_537,move,_539){
if(!_537||this.isConnector(_537)){
return;
}if(_539){
var left=this.getX(_537);
left=(left*1)+move;
this.setX(_537,left);
}else{
var top=this.getY(_537);
top=(top*1)+move;
this.setY(_537,top);
}this.updateRotation(_537);
};
SVGRenderer.prototype.fineRotateSelection=function(_53c,_53d){
if(this.isConnector(_53c)){
return;
}var _53e=this.getRotation(_53c);
if(!_53e){
_53e=0;
}var _53e=_53e+_53d;
_53e=_53e%360;
if(_53e<0){
_53e=360+_53e;
}this.setRotation(_53c,_53e);
};
AbstractRenderer.prototype.remove=function(_53f){
if(_53f){
Element.remove(_53f);
}};
SVGRenderer.prototype.move=function(_540,left,top){
this.setX(_540,left);
this.setY(_540,top);
this.updateRotation(_540);
};
SVGRenderer.prototype.resize=function(_543,_544,_545,toX,toY){
var _548=toX-_544;
var _549=toY-_545;
if(this.isConnector(_543)){
var type=this.getConnectorType(_543);
if(type=="line"){
this.setLineTo(_543,toX,toY);
return;
}else{
if(type=="ortho-line"){
this.drawOrthoLine(_543,_544,_545,toX,toY);
return;
}else{
if(type=="curve-line"){
this.drawCurveLine(_543,_544,_545,toX,toY,false);
return;
}}}}if(_548<0){
this.setX(_543,toX);
this.setWidth(_543,-_548);
}else{
this.setWidth(_543,_548);
}if(_549<0){
this.setY(_543,toY);
this.setHeight(_543,-_549);
}else{
this.setHeight(_543,_549);
}this.updateRotation(_543);
};
SVGRenderer.prototype.drawCurveLine=function(_54b,_54c,_54d,toX,toY,_550){
var _551=this.getShapeSubject(_54b);
this.setLineFrom(_54b,_54c,_54d);
this.setLineTo(_54b,toX,toY);
if(!_550){
var x1=Math.abs(_54c-toX);
var y1=Math.abs(_54d-toY);
var cx1=(_54c<toX)?(_54c*1)+(x1*(1/4)):(_54c*1)-(x1*(1/4));
var cx2=(_54c<toX)?(toX*1)-(x1*(1/4)):(toX*1)+(x1*(1/4));
var cy1=(_54d<toY)?(_54d*1)+(y1*(1/4)):(_54d*1)-(y1*(1/4));
var cy2=(_54d<toY)?(toY*1)-(y1*(1/4)):(toY*1)+(y1*(1/4));
this.setControl1(_54b,cx1,cy1);
this.setControl2(_54b,cx2,cy2);
}};
SVGRenderer.prototype.editCommand=function(_558,cmd,_55a,zoom){
if(_558!=null){
if(cmd=="sendBack"){
this.sendToBack(_558);
}else{
if(cmd=="bringFront"){
this.bringToFront(_558);
}else{
if(cmd=="fillcolor"){
this.setFillColor(_558,_55a);
}else{
if(cmd=="linecolor"){
this.setLineColor(_558,_55a);
}else{
if(cmd=="linewidth"){
this.setStrokeWidth(_558,parseInt(_55a));
}else{
if(cmd=="opacity"){
this.setOpacity(_558,_55a);
}else{
if(cmd=="shadow"){
this.setShadow(_558,_55a);
}else{
if(cmd=="gradient"){
_55a=(_55a=="solid")?false:true;
this.setLinearGradient(_558,_55a);
}else{
if(cmd=="linestyle"){
this.setLineStyle(_558,_55a);
}else{
if(cmd=="linedashstyle"){
this.setLineDashStyle(_558,_55a);
}else{
if(cmd=="fontSize"||cmd=="fontFamily"||cmd=="bold"||cmd=="italic"||cmd=="fontColor"||cmd=="align"){
var font=new Object();
font.size="";
font.family="";
font.color="";
font.align="";
font.italics="";
font.bold="";
if(cmd=="fontSize"){
font.size=_55a;
this.setFont(_558,font,zoom);
}else{
if(cmd=="fontFamily"){
font.family=_55a;
this.setFont(_558,font,zoom);
}else{
if(cmd=="bold"){
var _55d=this.getFont(_558);
if(_55d.bold=="bold"){
font.bold="normal";
}else{
font.bold="bold";
}this.setFont(_558,font);
}else{
if(cmd=="italic"){
var _55d=this.getFont(_558);
if(_55d.italics=="italic"){
font.italics="normal";
}else{
font.italics="italic";
}this.setFont(_558,font);
}else{
if(cmd=="fontColor"){
font.color=_55a;
this.setFont(_558,font);
}else{
if(cmd=="align"){
font.align=_55a;
this.setFont(_558,font);
}}}}}}}}}}}}}}}}}}};
SVGRenderer.prototype.queryCommand=function(_55e,cmd){
var _560="";
if(_55e!=null){
if(cmd=="fillcolor"){
return this.getFillColor(_55e);
}else{
if(cmd=="linecolor"){
return this.getLineColor(_55e);
}else{
if(cmd=="linewidth"){
var _561=this.getStrokeWidth(_55e);
if(_561&&!_561.indexOf("px")>=0){
_561=_561+"px";
}return _561;
}else{
if(cmd=="font"){
return this.getFont(_55e);
}else{
if(cmd=="linestyle"){
return this.getLineStyle(_55e);
}else{
if(cmd=="linedashstyle"){
return this.getLineDashStyle(_55e);
}else{
if(cmd=="opacity"){
return this.getOpacity(_55e);
}else{
if(cmd=="gradient"){
if(this.getLinearGradient(_55e)){
return "gradient";
}else{
return "solid";
}}else{
if(cmd=="shadow"){
return ""+this.getShadow(_55e);
}}}}}}}}}}return _560;
};
var counter=0;
var creatingTracker=false;
SVGRenderer.prototype.showLineTracker=function(_562){
if(creatingTracker){
return;
}var _563=$("tracker-group");
if(_563){
this.remove(_563);
}creatingTracker=true;
var _564=this.loadShape("tracker","g");
if(!_563){
_564=this.importAndAppendChild(this.svgRoot,_564);
}while(!$("tracker-group")){
}creatingTracker=false;
this.updateLineTracker(_562,_564);
return _564;
};
SVGRenderer.prototype.updateLineTracker=function(_565,_566){
var oval=_566.getElementsByTagName("circle")[0];
var type=this.getConnectorType(_565);
if(type=="line"||type=="curve-line"){
var x1=this.getConnectorFromX(_565);
var y1=this.getConnectorFromY(_565);
oval.setAttributeNS(null,"cx",x1);
oval.setAttributeNS(null,"cy",y1);
if(type=="curve-line"){
var line=_566.getElementsByTagName("line")[0];
line.setAttributeNS(null,"x1",x1);
line.setAttributeNS(null,"y1",y1);
}}else{
if(type=="ortho-line"){
var _56c=this.getShapeSubject(_565);
var _56d=_56c.points;
var x1=_56d.getItem(0).x;
var y1=_56d.getItem(0).y;
oval.setAttributeNS(null,"cx",x1);
oval.setAttributeNS(null,"cy",y1);
}}oval.style.zIndex=this.maxIndex+1;
oval=_566.getElementsByTagName("circle")[1];
if(type=="line"||type=="curve-line"){
var x2=this.getConnectorToX(_565);
var y2=this.getConnectorToY(_565);
oval.setAttributeNS(null,"cx",x2);
oval.setAttributeNS(null,"cy",y2);
if(type=="curve-line"){
var line=_566.getElementsByTagName("line")[1];
line.setAttributeNS(null,"x1",x2);
line.setAttributeNS(null,"y1",y2);
}}else{
if(type=="ortho-line"){
var _56c=this.getShapeSubject(_565);
var _56d=_56c.points;
var _570=_56d.numberOfItems;
if(_570==0){
return;
}var x2=_56d.getItem(_570-1).x;
var y2=_56d.getItem(_570-1).y;
oval.setAttributeNS(null,"cx",x2);
oval.setAttributeNS(null,"cy",y2);
}}if(type=="curve-line"){
var _571=this.getControl1(_565);
oval=_566.getElementsByTagName("circle")[2];
oval.setAttributeNS(null,"cx",_571.x);
oval.setAttributeNS(null,"cy",_571.y);
oval.style.visibility="visible";
var line=_566.getElementsByTagName("line")[0];
line.setAttributeNS(null,"x2",_571.x);
line.setAttributeNS(null,"y2",_571.y);
var _572=this.getControl2(_565);
oval=_566.getElementsByTagName("circle")[3];
oval.setAttributeNS(null,"cx",_572.x);
oval.setAttributeNS(null,"cy",_572.y);
oval.style.visibility="visible";
line=_566.getElementsByTagName("line")[1];
line.setAttributeNS(null,"x2",_572.x);
line.setAttributeNS(null,"y2",_572.y);
}oval.style.zIndex=this.maxIndex+1;
};
SVGRenderer.prototype.showTracker=function(_573){
if(!_573){
return;
}var _574=this.container.ownerDocument.getElementById("tracker-group");
if(_574){
while($("tracker-group")){
this.remove($("tracker-group"));
}}if(this.isConnector(_573)){
return this.showLineTracker(_573);
}_574=this.loadShape("tracker-group","g");
_574=this.importAndAppendChild(this.svgRoot,_574);
this.updateTracker(_573);
var _575=this.getHandles(_573);
var svg=_574.getElementsByTagName("svg")[0];
for(var i=0;
i<_575.length;
i++){
_575[i].id="tracker-handle:"+i;
svg.appendChild(_575[i]);
}return _574;
};
SVGRenderer.prototype.updateTracker=function(_578){
if(!_578){
return;
}var _579=$("tracker-group");
if(_579){
if(this.isConnector(_578)){
return this.updateLineTracker(_578,_579);
}}if(!$("tracker-group")){
return this.showTracker(_578);
}var box=this.bounds(_578);
var _57b=$("tracker-group");
var _579=$("tracker");
var _57c=(parseInt(box.width)+10);
var _57d=(parseInt(box.height)+10);
var x=(parseInt(box.x)-5);
var y=(parseInt(box.y)-5);
var _580=(x*1)+(_57c/2);
var _581=(y*1)+(_57d/2);
var _582="rotate("+box.rotation+","+_580+","+_581+")";
_57b.setAttributeNS(null,"transform",_582);
_579.setAttributeNS(null,"width",_57c+"px");
_579.setAttributeNS(null,"height",_57d+"px");
_579.parentNode.setAttributeNS(null,"x",x+"px");
_579.parentNode.setAttributeNS(null,"y",y+"px");
$("resize-left").setAttributeNS(null,"y",(box.height/2)+"px");
$("resize-top").setAttributeNS(null,"x",(box.width/2)+"px");
var _583=$("resize-bottom");
_583.setAttributeNS(null,"x",(box.width/2)+"px");
_583.setAttributeNS(null,"y",(parseInt(box.height)+5)+"px");
var _584=$("resize-right");
_584.setAttributeNS(null,"x",(parseInt(box.width)+5)+"px");
_584.setAttributeNS(null,"y",(box.height/2)+"px");
$("tracker-rotate").setAttributeNS(null,"cx",((box.width/2)+5)+"px");
var _585=$A(_57b.getElementsByTagName("rect"));
var _586=false;
_586=this.isMultipleSelect(_578);
var _587=this.getNamespacedElement(_578,"c","handle");
if(_585.length>4){
for(var i=4;
i<_585.length;
i++){
if(_586==true){
if(_585[i].id.indexOf("tracker-handle")>=0){
this.remove(_585[i]);
}}else{
this.updateHandleTracker(_578,_587[i-4],i-4,box);
}}}};
SVGRenderer.prototype.setHandleAttributes=function(_589,_58a,_58b,rect){
_58b.setAttributeNS(null,"width","10px");
_58b.setAttributeNS(null,"height","10px");
this.setCursor(_58b,"move");
_58b.setAttributeNS(null,"fill","yellow");
_58b.setAttributeNS(null,"stroke","#000000");
_58b.setAttributeNS(null,"stroke-width","1px");
var x=(_589*(parseInt(rect["width"])+5)/this.COORD_X);
var y=(_58a*(parseInt(rect["height"])+5)/this.COORD_Y);
_58b.setAttributeNS(null,"x",x);
_58b.setAttributeNS(null,"y",y);
};
SVGRenderer.prototype.updateHandleTracker=function(_58f,_590,_591,rect){
var _593=$("tracker-handle:"+_591);
if(!_593){
return;
}var _594=_590.getAttribute("x");
var _595=_590.getAttribute("y");
var x=(_594*(parseInt(rect["width"])+5)/this.COORD_X);
var y=(_595*(parseInt(rect["height"])+5)/this.COORD_Y);
_593.setAttributeNS(null,"x",x);
_593.setAttributeNS(null,"y",y);
};
SVGRenderer.prototype.updateShapePath=function(_598,_599,_59a){
if(!_59a){
_59a=0;
}var _59b=this.getAllSubShapes(_598);
_599=_599.replace(/e/g," ");
_59b[(_59a*2)+1].setAttributeNS(null,"d",_599);
this.setWidth(_598,this.getWidth(_598));
this.setHeight(_598,this.getHeight(_598));
};
SVGRenderer.prototype.createMultipleSelector=function(){
var _59c=this.loadShape("multiple-select-tracker","g");
_59c.id=this.MULTIPLE_SELECTOR_TRACKER_ID;
_59c=this.importAndAppendChild(this.svgRoot,_59c);
return _59c;
};
SVGRenderer.prototype.createMultipleSelectorDummyShape=function(){
var _59d=this.loadShape("multiple-select-dummy","g");
_59d.id=this.MULTIPLE_SELECTOR_DUMMY_ID;
_59d=this.importAndAppendChild(this.svgRoot,_59d);
this.setCursor(this.getShapeSubject(_59d),"resize");
return _59d;
};
SVGRenderer.prototype.clearShapeText=function(_59e){
if(!_59e){
return;
}var _59f=_59e.getElementsByTagName("text");
var _5a0=$A(_59f);
for(var i=0;
i<_5a0.length;
i++){
var node=_5a0[i];
if(node.id=="text:normal"||node.id=="text:newline"){
this.remove(node);
}}if(this.isConnector(_59e)){
var _5a3=_59e.getElementsByTagName("rect");
if(_5a3.length>0){
this.hideConnectorBackground(_5a3[0]);
}}};
SVGRenderer.prototype.handleConnectorTextLinePositioning=function(_5a4,_5a5,x,y,_5a8,_5a9,_5aa,_5ab,_5ac){
return this.handleTextLinePositioning(_5a4,_5a5,x,y,_5a8,_5a9,_5aa,_5ab,_5ac);
};
SVGRenderer.prototype.handleTextLinePositioning=function(_5ad,_5ae,x,y,_5b1,_5b2,_5b3,_5b4,_5b5){
var _5b6=(y*1)+(_5ad*1)/2;
var _5b7;
if(_5b4.align=="center"){
_5b7=(x*1)+(_5ae/2);
}else{
if(_5b4.align=="left"){
_5b7=(x*1)+(10*1);
}else{
_5b7=(x*1)+(_5ae-10);
}}var _5b8=new Array();
for(var i=_5b1;
i>0;
i--){
var _5ba=(_5b6)+((_5b2*1.1)*(i-_5b1));
_5ba=(_5ba*1)+((_5b2)/4);
_5b8[_5b8.length]=this.createTextShape(_5b3[i-1],true,_5ba,null,_5b7,null,_5b4,_5b5);
}for(var i=_5b1;
i<_5b3.length;
i++){
var _5ba=(_5b6)+((_5b2*1.1)*(i+1-_5b1));
_5ba=(_5ba*1)+((_5b2)/4);
_5b8[_5b8.length]=this.createTextShape(_5b3[i],true,_5ba,null,_5b7,null,_5b4,_5b5);
}return _5b8;
};
SVGRenderer.prototype.handleConnectorTextBackgroundPositioning=function(_5bb,rect,text){
var _5be=this.getConnectorBackgroundShape(_5bb);
_5bb.getElementsByTagName("svg")[0].appendChild(_5be);
if(text&&_utils.trim(text).length>0){
_5be.setAttributeNS(null,"fill","white");
_5be.setAttributeNS(null,"x",rect.x);
_5be.setAttributeNS(null,"y",rect.y);
_5be.setAttributeNS(null,"width",rect.width);
_5be.setAttributeNS(null,"height",rect.height);
}else{
this.hideConnectorBackground(_5be);
}};
SVGRenderer.prototype.hideConnectorBackground=function(_5bf){
if(_5bf){
_5bf.setAttributeNS(null,"x",0);
_5bf.setAttributeNS(null,"y",0);
_5bf.setAttributeNS(null,"width",0);
_5bf.setAttributeNS(null,"height",0);
}};
SVGRenderer.prototype.createTextShape=function(line,_5c1,_5c2,_5c3,_5c4,end,_5c6,_5c7){
var _5c8=null;
if(!_5c1){
_5c8=_5c7.ownerDocument.getElementById("text:template"+line.type);
}if(_5c1||!_5c8){
_5c8=this.createElement("text",this.svgNamespace);
if(_5c1){
_5c8.id="text:"+line.type;
}else{
_5c8.id="text:template"+line.type;
}}_5c8.setAttributeNS(null,"x",_5c4);
_5c8.setAttributeNS(null,"y",_5c2);
_5c8.style.position="absolute";
_5c8.setAttributeNS(null,"fill",_5c6.color);
_5c8.setAttributeNS(null,"font-size",_5c6.size);
_5c8.setAttributeNS(null,"font-weight",_5c6.bold);
_5c8.setAttributeNS(null,"font-family",_5c6.family);
_5c8.setAttributeNS(null,"font-style",_5c6.italics);
_5c8.setAttribute("xml:space","preserve");
var _5c9="middle";
if(_5c6.align=="left"){
_5c9="start";
}else{
if(_5c6.align=="right"){
_5c9="end";
}}_5c8.setAttributeNS(null,"text-anchor",_5c9);
_5c8.textContent=line.text;
return _5c8;
};
SVGRenderer.prototype.setFont=function(_5ca,font,zoom){
var _5cd=this.getShapeText(_5ca);
if(!_5cd){
this.fillUpFont(font);
this.setShapeText(_5ca," ",font,true,null,zoom);
return;
}var _5ce=_5ca.getElementsByTagName("text");
var _5cf=this.getFont(_5ca);
if(font.size!=""&&(font.size!=_5cf.size)){
this.clearShapeText(_5ca);
this.setShapeText(_5ca,_5cd,font,true,_5cf,zoom);
}if(font.color!=""){
for(var i=0;
i<_5ce.length;
i++){
_5ce[i].setAttributeNS(null,"fill",font.color);
}}if(font.family!=""){
for(var i=0;
i<_5ce.length;
i++){
_5ce[i].setAttributeNS(null,"font-family",font.family);
}}if(font.bold!=""){
for(var i=0;
i<_5ce.length;
i++){
_5ce[i].setAttributeNS(null,"font-weight",font.bold);
}}if(font.italics!=""){
for(var i=0;
i<_5ce.length;
i++){
_5ce[i].setAttributeNS(null,"font-style",font.italics);
}}if(font.align!=""){
var _5d1;
var rect=this.getTextBounds(_5ca,_5cd,zoom);
var x=rect["x"];
var _5d4=rect["width"];
if(font.align=="center"){
_5d1=(x*1)+(_5d4/2);
}else{
if(font.align=="left"){
_5d1=(x*1)+(10*1);
}else{
_5d1=(x*1)+(_5d4-10);
}}var _5d5="middle";
if(font.align=="left"){
_5d5="start";
}else{
if(font.align=="right"){
_5d5="end";
}}for(var i=0;
i<_5ce.length;
i++){
_5ce[i].setAttributeNS(null,"x",_5d1);
_5ce[i].setAttributeNS(null,"text-anchor",_5d5);
}}};
SVGRenderer.prototype.getFont=function(_5d6){
var font=new Object();
font.size="";
font.family="";
font.color="";
font.align="";
font.italics="";
font.bold="";
var _5d8=document.getElementById("text:dummy"+_5d6.id);
if(!_5d8){
_5d8=document.getElementById("text:template"+_5d6.id);
}if(!_5d8){
return font;
}else{
font.color=_5d8.getAttributeNS(null,"fill");
font.family=_5d8.getAttributeNS(null,"font-family");
font.size=_5d8.getAttributeNS(null,"font-size");
font.bold=_5d8.getAttributeNS(null,"font-weight");
font.italics=_5d8.getAttributeNS(null,"font-style");
var _5d9=_5d8.getAttributeNS(null,"text-anchor");
if(_5d9=="middle"){
_5d9="center";
}else{
if(_5d9=="end"){
_5d9="right";
}else{
_5d9="left";
}}font.align=_5d9;
}return font;
};
SVGRenderer.prototype.getMarkup=function(){
return this.container.innerHTML;
};
SVGRenderer.prototype.getShapeFromEventSource=function(_5da){
if(_5da){
if(_5da.tagName=="text"){
return _5da.parentNode;
}else{
return _5da.parentNode.parentNode;
}}};
SVGRenderer.prototype.appendPageAttribute=function(div,_5dc){
if(div){
var svg=div.getElementsByTagName("svg")[0];
this.importAndAppendChild(svg,_5dc);
}};
SVGRenderer.prototype.getRealData=function(){
var xml=this.svgRoot.xml;
var _5df=new DOMParser();
_5df.preserveWhiteSpace=true;
return _5df.parseFromString(xml,"application/xml");
};
SVGRenderer.prototype.getValidDocumentFromResponse=function(_5e0){
var _5e1=new DOMParser();
_5e1.preserveWhiteSpace=true;
var dom=_5e1.parseFromString(_5e0,"application/xml");
return dom;
};
SVGRenderer.prototype.open=function(div){
var _5e4=div.getElementsByTagName("g");
_5e4=$A(_5e4);
for(var i=0;
i<_5e4.length;
i++){
_5e4[i]=this.importAndAppendChild(this.svgRoot,_5e4[i]);
if(this.isImage(_5e4[i])){
var img=this.getShapeSubject(_5e4[i]);
var _5e7=img.getAttributeNS("http://www.w3.org/1999/xlink","href");
var _5e8=img.getAttribute("href");
try{
img.setAttributeNS("http://www.w3.org/1999/xlink","href",_5e7);
}catch(e){
}}}};
SVGRenderer.prototype.appendChild=function(_5e9,_5ea){
return this.importAndAppendChild(_5e9,_5ea);
};
function _getXML(){
var _5eb=new XMLSerializer;
var _5ec=_5eb.serializeToString(this);
return _5ec;
}
function VMLRenderer(){
this.base=AbstractRenderer;
}VMLRenderer.prototype=new AbstractRenderer;
VMLRenderer.prototype.init=function(elem){
this.container=elem;
elem.unselectable="on";
this.container.style.overflow="hidden";
this.screenXDPI=screen.logicalXDPI/72;
this.COORD_X=1000;
this.COORD_Y=1000;
elem.ownerDocument.namespaces.add("v","urn:schemas-microsoft-com:vml");
elem.ownerDocument.namespaces.add("c","urn:schemas-cumulatelabs-com:draw");
var _5ee=elem.ownerDocument.createStyleSheet();
_5ee.addRule("v\\:*","behavior: url(#default#VML);
");
this.minIndex=200;
this.maxIndex=200;
this.CONNECTOR_TAG="connector";
this.LINE_DELIMITER="\r\n";
this.EXTENSION="mmd";
this.TYPE="VML";
this.LONG_DASH="longdash";
this.SHORT_DASH="dash";
this.SOLID_DASH="solid";
this.TEXT_TEMPLATE_LINE_PREFIX="text:";
};
VMLRenderer.prototype.getNamespacedElement=function(node,_5f0,_5f1){
return node.getElementsByTagName(_5f1);
};
VMLRenderer.prototype.bounds=function(_5f2){
if(!_5f2){
return;
}var rect={
x:0,y:0,width:0,height:0,rotation:0,x2:0,y2:0,id:0,type:"",controlX:0,controlY:0,controlX2:0,controlY2:0};
rect["id"]=_5f2.getAttribute("id");
if(this.isConnector(_5f2)){
rect["x"]=this.pointToPixel(this.getConnectorFromX(_5f2));
rect["y"]=this.pointToPixel(this.getConnectorFromY(_5f2));
rect["x2"]=this.pointToPixel(this.getConnectorToX(_5f2));
rect["y2"]=this.pointToPixel(this.getConnectorToY(_5f2));
rect["type"]=this.getConnectorType(_5f2);
if(rect.type=="curve-line"){
var obj1=this.getControl1(_5f2);
var obj2=this.getControl2(_5f2);
rect["controlX"]=obj1.x;
rect["controlY"]=obj1.y;
rect["controlX2"]=obj2.x;
rect["controlY2"]=obj2.y;
}}else{
var _5f6=_5f2.style.rotation;
rect["rotation"]=_5f2.style.rotation;
if(!rect["rotation"]){
rect["rotation"]=0;
}_5f2.style.rotation=0;
rect["x"]=_5f2.style.left.split("px")[0];
rect["y"]=_5f2.style.top.split("px")[0];
rect["width"]=(_5f2.style.width.split("px")[0]*1);
rect["height"]=(_5f2.style.height.split("px")[0]*1);
rect["left"]=_5f2.offsetLeft;
rect["top"]=_5f2.offsetTop;
_5f2.style.rotation=_5f6;
}return rect;
};
VMLRenderer.prototype.pointToPixel=function(_5f7){
if(!_5f7||_5f7.length==0){
return 0;
}return (_5f7*1)*this.screenXDPI;
};
VMLRenderer.prototype.getAttribute=function(_5f8,_5f9){
return _5f8.getAttribute(_5f9);
};
VMLRenderer.prototype.loadShape=function(_5fa,_5fb){
var _5fc=this.loadXML("shapes/vml/"+_5fa+".xml");
var _5fd=_5fc.getElementsByTagName(_5fb);
if(_5fb){
var node=_5fd[0];
return node;
}};
VMLRenderer.prototype.loadXML=function(path){
objValidXMLFile=new ActiveXObject("Microsoft.XMLDOM");
objValidXMLFile.async=false;
objValidXMLFile.load(path);
return objValidXMLFile;
};
VMLRenderer.prototype.createLine=function(_600,_601,_602,left,top,_605){
doc=this.container.ownerDocument;
var vml=null;
var load=this.loadShape(_600,"c:connector");
var _608=doc.createElement("div");
_608.insertAdjacentHTML("AfterBegin",load.xml);
var _609=_608.firstChild;
vml=this.getShapeSubject(_609);
if(_600=="line"){
vml.setAttribute("from",left+"px,"+top+"px");
vml.setAttribute("to",left+"px,"+top+"px");
}else{
if(_600=="ortho-line"){
vml.points.value="0,0";
}else{
vml.from="0,0";
vml.to="0,0";
vml.control1="1,1";
vml.control2="1,1";
}}vml.strokeweight=_602;
vml.strokecolor=_601;
this.container.appendChild(_609);
vml.style.zIndex=this.maxIndex++;
this.setLineStyle(_609,_605);
return _609;
};
VMLRenderer.prototype.createImage=function(_60a,left,top,_60d,_60e){
var vml=this.create(this.IMAGE_TEMPLATE,null,null,null,left,top,_60d,_60e);
var _610=this.getShapeSubject(vml);
_610.setAttribute("src",_60a);
this.setShadow(vml,"false");
return vml;
};
VMLRenderer.prototype.isConnector=function(_611){
if(_611){
return (_611.tagName==this.CONNECTOR_TAG);
}else{
return false;
}};
VMLRenderer.prototype.create=function(_612,_613,_614,_615,left,top,_618,_619,_61a,_61b,_61c){
var rect;
doc=this.container.ownerDocument;
var vml=null;
var load=this.loadShape(_612,"v:group");
var _620=doc.createElement("div");
_620.insertAdjacentHTML("AfterBegin",load.xml);
vml=_620.firstChild;
vml.style.zIndex=this.maxIndex++;
vml.style.rotation=0;
if(_612!="line"){
vml.style.position="absolute";
vml.style.left=left;
vml.style.top=top;
vml.style.width=_618;
vml.style.height=_619;
}if(_61c!=""){
this.setShadow(vml,_61c);
}this.container.appendChild(vml);
this.setAllUnselectable(vml);
return vml;
};
VMLRenderer.prototype.setAllUnselectable=function(_621){
if(!_621){
return;
}var _622=this.getAllSubShapes(_621);
for(var i=0;
i<_622.length;
i++){
_622[i].setAttribute("UNSELECTABLE","ON");
}};
VMLRenderer.prototype.copy=function(_624){
if(!_624){
return null;
}if(this.isConnector(_624)){
type=this.getConnectorType(_624);
if(type!="line"&&type!="curve-line"){
this.savePolyLinePath(_624);
}}var _625=this.container.ownerDocument.createElement("div");
_625.insertAdjacentHTML("AfterBegin",_624.outerHTML);
var node=_625.firstChild;
return node;
};
VMLRenderer.prototype.paste=function(_627){
if(!_627){
return;
}var _628=this.container.ownerDocument.createElement("div");
_628.insertAdjacentHTML("AfterBegin",_627.outerHTML);
var node=_628.firstChild;
var _62a=node.id;
node.id="shape:"+createUUID();
if(!this.isConnector(node)){
node.style.top=(node.style.top.split("px")[0]*1+10)+"px";
node.style.left=(node.style.left.split("px")[0]*1+10)+"px";
}var _62b=node.getElementsByTagName("connection");
var _62c=new Array();
for(var i=0;
i<_62b.length;
i++){
if(node.tagName=="connector"){
_62b.item(i).setAttribute("shapeid","xx");
_62b.item(i).setAttribute("shapepoint","-1");
}else{
_62c[i]=_62b.item(i);
}}for(var i=0;
i<_62c.length;
i++){
this.remove(_62c[i]);
}if(this.isConnector(node)){
var type=this.getConnectorType(node);
var _62f=this.getShapeSubject(node);
if(type=="line"||type=="curve-line"){
_62f.style.zIndex=0;
}else{
node.getElementsByTagName("polyline")[0].style.zIndex=0;
node.getElementsByTagName("polyline")[0].points="0,0";
}}this.container.appendChild(node);
if(this.isConnector(node)&&type=="ortho-line"){
var _630=node.getAttribute("polyline-path");
node.getElementsByTagName("polyline")[0].points.value=_630;
}if(this.isConnector(node)){
this.moveCompleteLine(node,this.bounds(node),10,10);
}this.bringToFront(node);
var _631=node.getElementsByTagName("line");
var _632=this.TEXT_TEMPLATE_LINE_PREFIX+_62a;
for(var i=0;
i<_631.length;
i++){
var line=_631[i];
if(line.id==_632){
line.id=this.TEXT_TEMPLATE_LINE_PREFIX+node.id;
var _634=line.getElementsByTagName("textpath");
if(_634.length>0){
_634[0].id=this.TEXT_TEMPLATE_PREFIX+node.id;
}}}return node;
};
VMLRenderer.prototype.savePolyLinePath=function(_635){
var _636=_635.getElementsByTagName("polyline")[0];
var path="";
for(var i=0;
i<_636.points.length;
i++){
path+=_636.points.item(i).value+",";
}_635.setAttribute("polyline-path",path);
};
VMLRenderer.prototype.savePolyLinePaths=function(){
var _639=this.getAllConnectors(this.container);
for(var i=0;
i<_639.length;
i++){
if(_639[i].getAttribute("type")=="ortho-line"){
this.savePolyLinePath(_639[i]);
}}};
VMLRenderer.prototype.getShapeSubject=function(_63b){
if(!_63b){
return null;
}if(this.isConnector(_63b)){
var type=this.getConnectorType(_63b);
if(type=="line"){
return _63b.getElementsByTagName("line")[0];
}else{
if(type=="ortho-line"){
return _63b.getElementsByTagName("polyline")[0];
}else{
return _63b.getElementsByTagName("curve")[0];
}}}else{
if(_63b.getElementsByTagName("image").length>0){
return _63b.getElementsByTagName("image")[0];
}else{
var _63d=_63b.getElementsByTagName("shape");
if(_63d.length>0){
var _63e=this.getNamespacedElement(_63b,"c","attributes");
if(!_63e||_63e.length==0||_63e[0].getAttribute("shape-subject")==""){
return _63d[0];
}else{
var _63f=(_63e[0].getAttribute("shape-subject")*1);
return _63d[_63f];
}}else{
if(_63b.getElementsByTagName("roundrect").length>0){
var _63d=_63b.getElementsByTagName("roundrect");
if(_63d.length>0){
return _63d[0];
}}else{
if(_63b.getElementsByTagName("rect").length>0){
var _63d=_63b.getElementsByTagName("rect");
if(_63d.length>0){
return _63d[0];
}}else{
if(_63b.getElementsByTagName("oval").length>0){
var _63d=_63b.getElementsByTagName("oval");
if(_63d.length>0){
return _63d[0];
}}}}}}}};
VMLRenderer.prototype.getAllSubShapes=function(_640){
if(!_640){
return null;
}return _640.getElementsByTagName("shape");
};
VMLRenderer.prototype.getConnectorType=function(_641){
return _641.getAttribute("type");
};
VMLRenderer.prototype.getConnectorFromX=function(_642){
var _643=null;
var type=this.getConnectorType(_642);
if(type=="line"){
_643=_642.getElementsByTagName("line")[0].from.x;
}else{
if(type=="ortho-line"){
var _645=_642.getElementsByTagName("polyline")[0].points.length;
if(_645==0){
return null;
}_643=_642.getElementsByTagName("polyline")[0].points.item(0).x;
}else{
if(type=="curve-line"){
_643=this.getShapeSubject(_642).from.x;
}}}return _643;
};
VMLRenderer.prototype.getConnectorFromY=function(_646){
var _647=null;
var type=this.getConnectorType(_646);
if(type=="line"){
_647=_646.getElementsByTagName("line")[0].from.y;
}else{
if(type=="ortho-line"){
var _649=_646.getElementsByTagName("polyline")[0].points.length;
if(_649==0){
return null;
}_647=_646.getElementsByTagName("polyline")[0].points.item(0).y;
}else{
if(type=="curve-line"){
_647=this.getShapeSubject(_646).from.y;
}}}return _647;
};
VMLRenderer.prototype.getConnectorToX=function(_64a){
var toX=null;
var type=this.getConnectorType(_64a);
if(type=="line"){
toX=_64a.getElementsByTagName("line")[0].to.x;
}else{
if(type=="ortho-line"){
var _64d=_64a.getElementsByTagName("polyline")[0].points.length;
if(_64d==0){
return null;
}toX=_64a.getElementsByTagName("polyline")[0].points.item(_64d-1).x;
}else{
if(type=="curve-line"){
toX=this.getShapeSubject(_64a).to.x;
}}}return toX;
};
VMLRenderer.prototype.getConnectorToY=function(_64e){
var toY=null;
var type=this.getConnectorType(_64e);
if(type=="line"){
toY=_64e.getElementsByTagName("line")[0].to.y;
}else{
if(type=="ortho-line"){
var _651=_64e.getElementsByTagName("polyline")[0].points.length;
if(_651==0){
return null;
}toY=_64e.getElementsByTagName("polyline")[0].points.item(_651-1).y;
}else{
if(type=="curve-line"){
toY=this.getShapeSubject(_64e).to.y;
}}}return toY;
};
VMLRenderer.prototype.setWidth=function(_652,_653){
if(_652){
_652.style.width=_653+"px";
}};
VMLRenderer.prototype.setHeight=function(_654,_655){
if(_654){
_654.style.height=_655+"px";
}};
VMLRenderer.prototype.setX=function(_656,left){
if(_656){
_656.style.left=left+"px";
}};
VMLRenderer.prototype.setY=function(_658,top){
if(_658){
_658.style.top=top+"px";
}};
VMLRenderer.prototype.setRotation=function(_65a,_65b){
_65b=_65b%360;
_65a.style.rotation=_65b;
};
VMLRenderer.prototype.getAllShapes=function(doc){
var _65d=doc.getElementsByTagName("group");
var _65e=$A(_65d);
return _65e;
};
VMLRenderer.prototype.getAllConnectors=function(doc){
var _660=doc.getElementsByTagName(this.CONNECTOR_TAG);
var _661=$A(_660);
return _661;
};
VMLRenderer.prototype.updateZIndex=function(_662){
if(!_662){
return;
}if(this.isConnector(_662)){
_662=this.getShapeSubject(_662);
}if(_662.style.zIndex<=this.minIndex){
this.minIndex=_662.style.zIndex;
this.minIndex--;
}if(_662.style.zIndex>=this.maxIndex){
this.maxIndex=_662.style.zIndex;
this.maxIndex++;
}};
VMLRenderer.prototype.sendToBack=function(_663){
if(!_663){
return;
}else{
this.setShapeZIndex(_663,this.minIndex--);
}};
VMLRenderer.prototype.bringToFront=function(_664){
if(!_664){
return;
}else{
this.setShapeZIndex(_664,this.maxIndex++);
}};
VMLRenderer.prototype.setShapeZIndex=function(_665,_666){
var _667=_665;
if(this.isConnector(_665)){
_667=this.getShapeSubject(_665);
}_667.style.zIndex=_666;
var _668=document.getElementById("tracker-group");
if(_668){
_668.style.zIndex=_666;
}this.adjustConnectorTextZIndex(_665,_666);
};
VMLRenderer.prototype.adjustConnectorTextZIndex=function(_669,_66a){
if(this.isConnector(_669)){
var text=_669.getElementsByTagName("line");
for(var i=0;
i<text.length;
i++){
text[i].style.zIndex=_66a;
}var _66d=_669.getElementsByTagName("rect");
if(_66d.length>0){
_66d[0].style.zIndex=_66a;
}}};
VMLRenderer.prototype.setCursor=function(_66e,_66f){
_66e.style.cursor=_66f;
};
VMLRenderer.prototype.move=function(_670,left,top){
if(!_670){
return;
}if(_670.tagName=="line"){
_670.style.marginLeft=left;
_670.style.marginTop=top;
}else{
_670.style.left=left;
_670.style.top=top;
}};
VMLRenderer.prototype.fineMove=function(_673,move,_675){
if(!_673){
return;
}if(_673.tagName=="line"){
_673.style.marginLeft=left;
_673.style.marginTop=top;
}else{
if(_675){
var left=_673.style.left.split("px")[0];
left=(left*1)+move;
_673.style.left=left+"px";
}else{
var top=_673.style.top.split("px")[0];
top=(top*1)+move;
_673.style.top=top+"px";
}}};
VMLRenderer.prototype.fineRotateSelection=function(_678,_679){
var _67a=_678.style.rotation;
if(!_67a){
_67a=0;
}var _67a=_67a+_679;
_67a=_67a%360;
if(_67a<0){
_67a=360+_67a;
}_678.style.rotation=_67a;
};
VMLRenderer.prototype.rotate=function(_67b,_67c){
if(!_67c){
_67c=0;
}_67c=_67c%360;
if(_67c<0){
_67c=360+_67c;
}_67b.style.rotation=_67c;
};
VMLRenderer.prototype.setOpacity=function(_67d,_67e){
var node=this.getShapeSubject(_67d);
this.setFillAttribute(node,"opacity",_67e);
};
VMLRenderer.prototype.getOpacity=function(_680){
var node=this.getShapeSubject(_680);
if(node){
var _682=this.getFillAttribute(node,"opacity");
_682=(_682==null)?1:Math.round(_682*10);
_682=(_682/10).toFixed(1);
return _682;
}else{
return null;
}};
VMLRenderer.prototype.getGradient=function(_683){
var node=this.getShapeSubject(_683);
if(node){
var _685=this.getFillAttribute(node,"type");
_685=(_685==null)?"solid":_685;
return _685;
}else{
return null;
}};
VMLRenderer.prototype.setFillColor=function(_686,_687){
var _688=_686.getElementsByTagName("attributes");
if(_688.length==0||_688[0].getAttribute("fill")!="complete"){
var _689=this.getShapeSubject(_686);
_689.setAttribute("fillcolor",_687);
}else{
var _68a=this.getAllSubShapes(_686);
for(var i=0;
i<_68a.length;
i++){
_68a[i].setAttribute("fillcolor",_687);
}}if(_688.length>0&&_688[0].getAttribute("color-filter")!=null){
isColorFilter=true;
var _68a=this.getAllSubShapes(_686);
var _68c=_utils;
var _68d=_utils.parseColorFilter(_688[0].getAttribute("color-filter"));
if(_68d.length>0){
var rgb=_utils.decodeColor(_687);
for(var i=0;
i<_68d.length;
i++){
var r=Math.round(_68d[i].r*rgb.r);
var g=Math.round(_68d[i].g*rgb.g);
var b=Math.round(_68d[i].b*rgb.b);
_68a[(_68d[i].index)].setAttribute("fillcolor","rgb("+r+","+g+","+b+")");
}}}};
VMLRenderer.prototype.getFillColor=function(_692){
var node=this.getShapeSubject(_692);
if(node){
var _694=node.getAttribute("fillcolor");
if(_694){
return _694.value;
}else{
return "#ffffff";
}}else{
return "#ffffff";
}};
VMLRenderer.prototype.getLineColor=function(_695){
var node=this.getShapeSubject(_695);
if(node){
var _697=node.getAttribute("strokecolor");
if(_697){
return _697.value;
}else{
return "#ffffff";
}}else{
return "#ffffff";
}};
VMLRenderer.prototype.getLineDashStyle=function(_698){
var _699=this.getShapeSubject(_698);
var _69a=_699.getElementsByTagName("stroke");
if(_69a.length==0){
return "solid";
}var _69b=_69a[0].getAttribute("dashstyle");
if(!_69b||_69b.value==""||_69b.value==this.SOLID_DASH){
return "solid";
}else{
if(_69b.value.toLowerCase()==this.LONG_DASH){
return "long-dash";
}else{
return "short-dash";
}}};
VMLRenderer.prototype.setLineDashStyle=function(_69c,_69d){
if(_69d=="long-dash"){
_69d=this.LONG_DASH;
}else{
if(_69d=="short-dash"){
_69d=this.SHORT_DASH;
}else{
_69d=this.SOLID_DASH;
}}if(this.isConnector(_69c)){
var _69e=this.getShapeSubject(_69c);
var _69f=_69e.getElementsByTagName("stroke");
_69f[0].setAttribute("dashstyle",_69d);
}else{
var _6a0=this.getAllSubShapes(_69c);
for(var i=0;
i<_6a0.length;
i++){
var _69f=_6a0[i].getElementsByTagName("stroke");
if(!_69f||_69f.length==0){
_69f=this.createElement("stroke",this.VML_SVG_NAMESPACE);
_6a0[i].appendChild(_69f);
}else{
_69f=_69f[0];
}_69f.setAttribute("dashstyle",_69d);
}}};
VMLRenderer.prototype.getStrokeWidth=function(_6a2){
var node=this.getShapeSubject(_6a2);
if(node.getAttribute("strokeweight")!="undefined"){
return (parseFloat(node.strokeweight)*(screen.logicalXDPI/72))+"px";
}else{
return 0;
}};
VMLRenderer.prototype.setStrokeWidth=function(_6a4,_6a5){
if(_6a5!="0px"){
_6a4.strokeweight=parseInt(_6a5)+"px";
attList=new Array("stroked","strokeweight");
attValues=new Array("true",parseInt(_6a5)+"px");
this.setShapeAttributes(_6a4,attList,attValues);
}else{
_6a4.stroked="false";
_6a4.strokeweight=0+"px";
attList=new Array("stroked","strokeweight");
attValues=new Array("false",0+"px");
this.setShapeAttributes(_6a4,attList,attValues);
}};
VMLRenderer.prototype.setGradient=function(_6a6,_6a7){
var node=this.getShapeSubject(_6a6);
this.setFillAttribute(node,"type",_6a7);
};
VMLRenderer.prototype.setShadow=function(_6a9,_6aa){
var node=this.getShapeSubject(_6a9);
var _6ac=node.getElementsByTagName("shadow");
var _6ad=null;
if(!_6ac||_6ac.length==0){
_6ad=this.container.ownerDocument.createElement("v:shadow");
node.appendChild(_6ad);
}else{
_6ad=_6ac[0];
}_6ad.on=_6aa;
};
VMLRenderer.prototype.getShadow=function(_6ae){
var node=this.getShapeSubject(_6ae);
var _6b0=node.getElementsByTagName("shadow");
if(!_6b0||_6b0.length==0){
return false;
}return _6b0[0].on;
};
VMLRenderer.prototype.setFillAttribute=function(node,att,_6b3){
var _6b4=node.getElementsByTagName("fill");
var fill=null;
if(!_6b4||_6b4.length==0){
fill=this.container.ownerDocument.createElement("v:fill");
node.appendChild(fill);
}else{
fill=_6b4[0];
}var _6b6=fill.type;
if(!_6b6){
_6b6="solid";
}var atts=new Array("type",att);
var _6b8=new Array(_6b6,_6b3);
setAttributes(fill,atts,_6b8);
};
VMLRenderer.prototype.getFillAttribute=function(node,att){
var _6bb=node.getElementsByTagName("fill");
var fill=null;
if(!_6bb||_6bb.length==0){
return null;
}else{
return _6bb[0].getAttribute(att);
}};
VMLRenderer.prototype.resize=function(_6bd,_6be,_6bf,toX,toY){
var _6c2=toX-_6be;
var _6c3=toY-_6bf;
if(this.isConnector(_6bd)){
var type=this.getConnectorType(_6bd);
if(type=="line"){
var vml=_6bd.getElementsByTagName("line")[0];
vml.setAttribute("to",toX+"px,"+toY+"px");
}else{
if(type=="ortho-line"){
this.drawOrthoLine(_6bd,_6be,_6bf,toX,toY);
}else{
if(type=="curve-line"){
this.drawCurveLine(_6bd,_6be,_6bf,toX,toY,false);
}}}}else{
if(_6c2<0){
_6bd.style.left=toX+"px";
_6bd.style.width=-_6c2+"px";
}else{
var _6c6=0;
var _6c7=(_6c6*1)+_6c2;
_6bd.style.width=(_6c7)+"px";
}if(_6c3<0){
_6bd.style.top=toY+"px";
_6bd.style.height=-_6c3+"px";
}else{
var _6c8=0;
var _6c9=(_6c8*1)+_6c3;
_6bd.style.height=_6c9+"px";
}}};
VMLRenderer.prototype.setShapeAttributes=function(_6ca,_6cb,_6cc){
var _6cd=this.getShapeSubject(_6ca);
if(_6cd){
setAttributes(_6cd,_6cb,_6cc);
}};
function setAttributes(_6ce,_6cf,_6d0){
for(var i=0;
i<_6cf.length;
i++){
_6ce.setAttribute(_6cf[i],_6d0[i]);
}}VMLRenderer.prototype.editCommand=function(_6d2,cmd,_6d4,zoom){
if(_6d2!=null){
if(cmd=="sendBack"){
this.sendToBack(_6d2);
}else{
if(cmd=="bringFront"){
this.bringToFront(_6d2);
}else{
if(cmd=="opacity"){
this.setOpacity(_6d2,_6d4);
}else{
if(cmd=="gradient"){
this.setGradient(_6d2,_6d4);
}else{
if(cmd=="shadow"){
this.setShadow(_6d2,_6d4);
}else{
if(cmd=="linestyle"){
this.setLineStyle(_6d2,_6d4);
}else{
if(cmd=="fillcolor"){
if(this.isConnector(_6d2)){
return;
}else{
if(_6d4!=""){
_6d2.filled="true";
this.setFillColor(_6d2,_6d4);
}else{
_6d2.filled="false";
}}this.setFillColor(_6d2,_6d4);
}else{
if(cmd=="linecolor"){
if(_6d4!=""){
_6d2.stroked="true";
_6d2.strokecolor=_6d4;
attList=new Array("stroked","strokecolor");
attValues=new Array("true",_6d4);
this.setShapeAttributes(_6d2,attList,attValues);
}else{
_6d2.stroked="false";
_6d2.strokecolor="";
attList=new Array("stroked","strokecolor");
attValues=new Array("false","");
this.setShapeAttributes(_6d2,attList,attValues);
}}else{
if(cmd=="linewidth"){
this.setStrokeWidth(_6d2,_6d4);
}else{
if(cmd=="linedashstyle"){
this.setLineDashStyle(_6d2,_6d4);
}else{
if(cmd=="fontSize"||cmd=="fontFamily"||cmd=="bold"||cmd=="italic"||cmd=="fontColor"||cmd=="align"){
var font=new Object();
font.size="";
font.family="";
font.color="";
font.align="";
font.italics="";
font.bold="";
if(cmd=="fontSize"){
font.size=_6d4;
this.setFont(_6d2,font,zoom);
}else{
if(cmd=="fontFamily"){
font.family=_6d4;
this.setFont(_6d2,font,zoom);
}else{
if(cmd=="bold"){
var _6d7=this.getFont(_6d2);
if(_6d7.bold=="bold"){
font.bold="normal";
}else{
font.bold="bold";
}this.setFont(_6d2,font);
}else{
if(cmd=="italic"){
var _6d7=this.getFont(_6d2);
if(_6d7.italics=="italic"){
font.italics="normal";
}else{
font.italics="italic";
}this.setFont(_6d2,font);
}else{
if(cmd=="fontColor"){
font.color=_6d4;
this.setFont(_6d2,font);
}else{
if(cmd=="align"){
font.align=_6d4;
this.setFont(_6d2,font);
}}}}}}}}}}}}}}}}}}};
VMLRenderer.prototype.queryCommand=function(_6d8,cmd){
if(_6d8!=null){
if(cmd=="fillcolor"){
return this.getFillColor(_6d8);
}else{
if(cmd=="linecolor"){
return this.getLineColor(_6d8);
}else{
if(cmd=="linewidth"){
if(_6d8.stroked=="false"){
return "";
}else{
return this.getStrokeWidth(_6d8);
}}else{
if(cmd=="font"){
return this.getFont(_6d8);
}else{
if(cmd=="linestyle"){
return this.getLineStyle(_6d8);
}else{
if(cmd=="opacity"){
return this.getOpacity(_6d8);
}else{
if(cmd=="gradient"){
return this.getGradient(_6d8);
}else{
if(cmd=="shadow"){
return ""+this.getShadow(_6d8);
}else{
if(cmd=="linedashstyle"){
return this.getLineDashStyle(_6d8);
}}}}}}}}}}};
VMLRenderer.prototype.moveLine=function(_6da,toX,toY,_6dd){
if(!this.isConnector(_6da)){
return;
}var type=this.getConnectorType(_6da);
var vml=this.getShapeSubject(_6da);
if(type=="line"||type=="curve-line"){
if(_6dd){
vml.setAttribute("from",toX+"px,"+toY+"px");
vml.from.x=toX/this.screenXDPI;
vml.from.y=toY/this.screenXDPI;
}else{
vml.setAttribute("to",toX+"px,"+toY+"px");
vml.to.x=toX/this.screenXDPI;
vml.to.y=toY/this.screenXDPI;
}}else{
if(_6dd){
var _6e0=vml.points.length;
var x=vml.points.item(_6e0-1).x*this.screenXDPI;
var y=vml.points.item(_6e0-1).y*this.screenXDPI;
this.drawOrthoLine(_6da,toX,toY,x,y);
}else{
var x=vml.points.item(0).x*this.screenXDPI;
var y=vml.points.item(0).y*this.screenXDPI;
this.drawOrthoLine(_6da,x,y,toX,toY);
}}};
VMLRenderer.prototype.moveLinePoint=function(_6e3,toX,toY,_6e6){
if(!this.isConnector(_6e3)){
return;
}var type=this.getConnectorType(_6e3);
var vml=this.getShapeSubject(_6e3);
if(type=="line"||type=="curve-line"){
if(_6e6){
vml.setAttribute("from",toX+"pt,"+toY+"pt");
vml.from.x=toX;
vml.from.y=toY;
}else{
vml.setAttribute("to",toX+"pt,"+toY+"pt");
vml.to.x=toX;
vml.to.y=toY;
}}else{
toX=toX*this.screenXDPI;
toY=toY*this.screenXDPI;
if(_6e6){
var _6e9=vml.points.length;
var x=vml.points.item(_6e9-1).x*this.screenXDPI;
var y=vml.points.item(_6e9-1).y*this.screenXDPI;
this.drawOrthoLine(_6e3,toX,toY,x,y);
}else{
var x=vml.points.item(0).x*this.screenXDPI;
var y=vml.points.item(0).y*this.screenXDPI;
this.drawOrthoLine(_6e3,x,y,toX,toY);
}}};
VMLRenderer.prototype.drawCurveLine=function(_6ec,_6ed,_6ee,toX,toY,_6f1){
var _6f2=this.getShapeSubject(_6ec);
_6f2.from=_6ed+","+_6ee;
_6f2.from.x=_6ed/this.screenXDPI;
_6f2.from.y=_6ee/this.screenXDPI;
_6f2.to=toX+","+toY;
_6f2.to.x=toX/this.screenXDPI;
_6f2.to.y=toY/this.screenXDPI;
if(!_6f1){
var x1=Math.abs(_6ed-toX);
var y1=Math.abs(_6ee-toY);
var cx1=(_6ed<toX)?(_6ed*1)+(x1*(1/4)):(_6ed*1)-(x1*(1/4));
var cx2=(_6ed<toX)?(toX*1)-(x1*(1/4)):(toX*1)+(x1*(1/4));
var cy1=(_6ee<toY)?(_6ee*1)+(y1*(1/4)):(_6ee*1)-(y1*(1/4));
var cy2=(_6ee<toY)?(toY*1)-(y1*(1/4)):(toY*1)+(y1*(1/4));
this.setControl1(_6ec,cx1,cy1);
this.setControl2(_6ec,cx2,cy2);
}};
VMLRenderer.prototype.getControl1=function(_6f9){
var _6fa=this.getShapeSubject(_6f9);
var obj=new Object();
obj.x=_6fa.control1.x*this.screenXDPI;
obj.y=_6fa.control1.y*this.screenXDPI;
return obj;
};
VMLRenderer.prototype.setControl1=function(_6fc,cx1,cy1){
var _6ff=this.getShapeSubject(_6fc);
_6ff.control1=cx1+","+cy1;
_6ff.control1.x=cx1/this.screenXDPI;
_6ff.control1.y=cy1/this.screenXDPI;
};
VMLRenderer.prototype.getControl2=function(_700){
var _701=this.getShapeSubject(_700);
var obj=new Object();
obj.x=_701.control2.x*this.screenXDPI;
obj.y=_701.control2.y*this.screenXDPI;
return obj;
};
VMLRenderer.prototype.setControl2=function(_703,cx1,cy1){
var _706=this.getShapeSubject(_703);
_706.control2=cx1+","+cy1;
_706.control2.x=cx1/this.screenXDPI;
_706.control2.y=cy1/this.screenXDPI;
};
VMLRenderer.prototype.getOrthoLineCenterSegment=function(_707){
var obj=new Object();
var _709=this.getShapeSubject(_707).points;
var _70a=Math.round(_709.length/2)-1;
var _70b=_709.item(_70a);
var _70c=_709.item(_70a-1);
var _70d=_709.item(_70a+1);
var _70e=((_70b.y-_70c.y)*(_70b.y-_70c.y))+((_70b.x-_70c.x)*(_70b.x-_70c.x));
var _70f=((_70b.y-_70d.y)*(_70b.y-_70d.y))+((_70b.x-_70d.x)*(_70b.x-_70d.x));
var _710=_70e>_70f?_70c:_70d;
if(_70e>_70f){
obj.x=this.pointToPixel(_710.x);
obj.y=this.pointToPixel(_710.y);
obj.x2=this.pointToPixel(_70b.x);
obj.y2=this.pointToPixel(_70b.y);
}else{
obj.x2=this.pointToPixel(_710.x);
obj.y2=this.pointToPixel(_710.y);
obj.x=this.pointToPixel(_70b.x);
obj.y=this.pointToPixel(_70b.y);
}return obj;
};
VMLRenderer.prototype.drawOrthoLine=function(_711,_712,_713,toX,toY,_716){
var path=this.calculateOrthoLinePath(_711,_712,_713,toX,toY);
this.getShapeSubject(_711).points.value=path;
};
VMLRenderer.prototype.getLineStyle=function(_718){
if(!this.isConnector(_718)){
return "";
}var type=this.getConnectorType(_718);
var line=this.getShapeSubject(_718);
var _71b=line.getElementsByTagName("stroke")[0];
if(_71b.startarrow=="classic"&&_71b.endArrow=="classic"){
return "arrow-both";
}else{
if(_71b.startarrow=="classic"){
return "arrow-from";
}}if(_71b.endArrow=="classic"){
return "arrow-to";
}else{
return "none";
}};
VMLRenderer.prototype.setLineStyle=function(_71c,_71d){
if(!this.isConnector(_71c)){
return;
}var line=this.getShapeSubject(_71c);
var _71f=line.getElementsByTagName("stroke")[0];
if(_71d=="arrow-from"||_71d=="arrow-both"){
_71f.startarrow="classic";
}else{
_71f.startarrow="none";
}if(_71d=="arrow-to"||_71d=="arrow-both"){
_71f.endarrow="classic";
}else{
_71f.endarrow="none";
}};
VMLRenderer.prototype.showConnectionPoints=function(_720){
if(!_720){
return;
}var rect=this.bounds(_720);
var _722=rect["rotation"];
if(!_722){
_722=0;
}this.remove($("active-shape-tracker"));
var doc=this.container.ownerDocument;
var _724=doc.createElement("v:group");
_724.style.left=_720.style.left;
_724.style.top=_720.style.top;
_724.style.width=_720.style.width;
_724.style.height=_720.style.height;
_724.style.position="ABSOLUTE";
_724.style.rotation=_722;
_724.style.zIndex=(_720.style.zIndex*1)+1;
_724.id="active-shape-tracker";
var _725=10*(1000/(rect["width"]+50));
var _726=10*(1000/(rect["height"]+50));
var _727=_720.getElementsByTagName("connection-point");
for(var i=0;
i<_727.length;
i++){
var node=_727.item(i);
var oval=doc.createElement("v:oval");
oval.filled="t";
oval.fillcolor="red";
oval.style.width="10px";
oval.style.height="10px";
oval.style.position="ABSOLUTE";
oval.style.width=_725;
oval.style.height=_726;
oval.style.left=(node.x-(_725/2))+"px";
oval.style.top=(node.y-(_726/2))+"px";
oval.coordsize="21600,21600";
_724.appendChild(oval);
}this.container.appendChild(_724);
};
VMLRenderer.prototype.createElement=function(_72b,_72c){
var _72d=null;
if(_72c==this.VML_SVG_NAMESPACE){
_72b="v:"+_72b;
}_72d=this.container.ownerDocument.createElement(_72b);
if(_72c=="CUMULATE_LABS"){
_72d.setAttribute("xmlns:c","urn:schemas-cumulatelabs-com:vml");
}return _72d;
};
VMLRenderer.prototype.connectLine=function(_72e,_72f,_730){
if(!_72f){
return;
}this.disconnectLineFromShape(_72f,_730);
if(!_72e){
return;
}var _731=screen.logicalXDPI/72;
var x=0;
var y=0;
var line=this.getShapeSubject(_72f);
var type=this.getConnectorType(_72f);
if(type=="line"||type=="curve-line"){
x=line.getAttribute(_730).x*this.screenXDPI;
y=line.getAttribute(_730).y*this.screenXDPI;
}else{
if(_730=="from"){
x=line.points.item(0).x*this.screenXDPI;
y=line.points.item(0).y*this.screenXDPI;
}else{
var _736=_72f.getElementsByTagName("polyline")[0].points.length;
if(_736==0){
return;
}x=line.points.item(_736-1).x*this.screenXDPI;
y=line.points.item(_736-1).y*this.screenXDPI;
}}var left=_72e.style.left.split("px")[0];
var top=_72e.style.top.split("px")[0];
var _739=_72e.style.width.split("px")[0];
var _73a=_72e.style.height.split("px")[0];
var _73b=(left*1)+(_739/2);
var _73c=(top*1)+(_73a/2);
var _73d=_72e.style.rotation;
if(!_73d){
_73d=0;
}coordX=1000;
coordY=1000;
var _73e=_72e.getElementsByTagName("connection-point");
for(var i=0;
i<_73e.length;
i++){
var node=_73e.item(i);
var conX=(left*1)+((node.x/coordX)*_739);
var conY=(top*1)+((node.y/coordY)*_73a);
conX=conX-_73b;
conY=conY-_73c;
finalX=((conX*Math.cos((Math.PI/180)*(_73d)))-(conY*Math.sin((Math.PI/180)*(_73d)))*1)+(_73b*1);
finalY=((conX*Math.sin((Math.PI/180)*(_73d)))+(conY*Math.cos((Math.PI/180)*(_73d)))*1)+(_73c*1);
if(x>(finalX-4)&&x<((finalX*1)+4)&&y>(finalY-4)&&y<((finalY*1)+4)){
this.connectLineToShape(_72e,_72f,_730,node,i);
var _743=(_730=="from")?true:false;
this.moveLineWithShape(_72e);
$("help").innerHTML="Connected line to shape";
return;
}}};
VMLRenderer.prototype.showLineTracker=function(_744){
var doc=this.container.ownerDocument;
var vml=null;
var load=this.loadShape("tracker","c:line-tracker");
var _748=doc.createElement("div");
_748.insertAdjacentHTML("AfterBegin",load.xml);
var _749=_748.firstChild;
_749.id="tracker-group";
this.updateLineTracker(_744,_749);
this.container.appendChild(_749);
return _749;
};
VMLRenderer.prototype.updateLineTracker=function(_74a,_74b){
var _74c=screen.logicalXDPI/72;
vml=_74b.getElementsByTagName("oval")[0];
var type=this.getConnectorType(_74a);
var line=this.getShapeSubject(_74a);
var _74f,_750=null;
if(type=="line"){
_74f=line.from.x;
_750=line.from.y;
}else{
if(type=="ortho-line"){
_74f=line.points.item(0).x;
_750=line.points.item(0).y;
}else{
if(type=="curve-line"){
_74f=line.from.x;
_750=line.from.y;
var _751=_74b.getElementsByTagName("line")[0];
_751.to=_74f+"pt,"+_750+"pt";
}}}vml.style.left=((parseFloat(_74f)*_74c)-3)+"px";
vml.style.top=((parseFloat(_750)*_74c)-3)+"px";
vml.style.zIndex=this.maxIndex+1;
vml=_74b.getElementsByTagName("oval")[1];
var toX,toY=null;
if(type=="line"){
toX=line.to.x;
toY=line.to.y;
}else{
if(type=="ortho-line"){
var _754=line.points.length;
if(_754==0){
return;
}var toX=line.points.item(_754-1).x;
var toY=line.points.item(_754-1).y;
}else{
if(type=="curve-line"){
toX=line.to.x;
toY=line.to.y;
var _751=_74b.getElementsByTagName("line")[1];
_751.to=toX+"pt,"+toY+"pt";
}}}vml.style.left=((parseFloat(toX)*_74c)-3)+"px";
vml.style.top=((parseFloat(toY)*_74c)-3)+"px";
vml.style.zIndex=this.maxIndex+1;
if(type=="curve-line"){
vml=_74b.getElementsByTagName("oval")[2];
toX=line.control1.x;
toY=line.control1.y;
vml.style.left=((parseFloat(toX)*_74c)-3)+"px";
vml.style.top=((parseFloat(toY)*_74c)-3)+"px";
vml.style.zIndex=this.maxIndex+1;
vml.style.visibility="visible";
var _751=_74b.getElementsByTagName("line")[0];
_751.from=toX+"pt,"+toY+"pt";
vml=_74b.getElementsByTagName("oval")[3];
toX=line.control2.x;
toY=line.control2.y;
vml.style.left=((parseFloat(toX)*_74c)-3)+"px";
vml.style.top=((parseFloat(toY)*_74c)-3)+"px";
var _751=_74b.getElementsByTagName("line")[1];
_751.from=toX+"pt,"+toY+"pt";
vml.style.zIndex=this.maxIndex+1;
vml.style.visibility="visible";
}};
VMLRenderer.prototype.setHandleAttributes=function(_755,_756,_757,box){
var _759=10*(1000/(box["width"]+50));
var _75a=10*(1000/(box["height"]+50));
_757.style.width=_759;
_757.style.height=_75a;
_757.style.position="absolute";
_757.style.cursor="move";
_757.setAttribute("filled","true");
_757.setAttribute("fillcolor","yellow");
_757.style.left=_755-20;
_757.style.top=_756-20;
};
VMLRenderer.prototype.showTracker=function(_75b){
if(!_75b){
return;
}if(_75b.tagName=="connector"){
return this.showLineTracker(_75b);
}var box=this.bounds(_75b);
var _75d=document.getElementById("tracker-group");
if(_75d){
this.remove(_75d);
}var _75e=this.container.ownerDocument.createElement("v:group");
_75e.id="tracker-group";
_75d=this.container.ownerDocument.createElement("v:shape");
_75d.id="tracker";
_75e.coordsize="1000,1000";
_75e.style.rotation=_75b.style.rotation;
_75d.style.width=1000;
_75d.style.height=1000;
_75d.left="0";
_75d.top="0";
_75d.coordsize="1000,1000";
_75d.style.position="absolute";
_75d.setAttribute("filled","false");
_75d.setAttribute("stroked","true");
_75d.setAttribute("strokecolor",this.TRACKER_COLOR);
_75d.setAttribute("strokeweight","1px");
_75d.setAttribute("path","m0,0 l 1000,0,1000,1000,0,1000,0,0 e");
var _75f=this.container.ownerDocument.createElement("v:stroke");
_75f.setAttribute("dashstyle","dash");
_75d.appendChild(_75f);
_75e.appendChild(_75d);
var _760=10*(1000/(box["width"]+50));
var _761=10*(1000/(box["height"]+50));
var _762=this.container.ownerDocument.createElement("v:rect");
_762.coordsize="21600,21600";
_762.style.position="absolute";
_762.id="resize-right";
_762.style.left=1000-(_760/2);
_762.style.width=_760;
_762.style.position="absolute";
_762.style.top=500-(_761/2);
_762.style.height=_761;
_762.setAttribute("filled","true");
_762.setAttribute("fillcolor",this.TRACKER_COLOR);
_75e.appendChild(_762);
var _763=this.container.ownerDocument.createElement("v:rect");
_763.coordsize="21600,21600";
_763.style.position="absolute";
_763.id="resize-left";
_763.style.left=-(_760/2);
_763.style.width=_760;
_763.style.position="absolute";
_763.style.top=500-(_761/2);
_763.style.height=_761;
_763.setAttribute("filled","true");
_763.setAttribute("fillcolor",this.TRACKER_COLOR);
_75e.appendChild(_763);
var _764=this.container.ownerDocument.createElement("v:rect");
_764.coordsize="21600,21600";
_764.style.position="absolute";
_764.id="resize-bottom";
_764.style.left=500-_760/2;
_764.style.width=_760;
_764.style.position="absolute";
_764.style.top=1000-_761/2;
_764.style.height=_761;
_764.setAttribute("filled","true");
_764.setAttribute("fillcolor",this.TRACKER_COLOR);
_75e.appendChild(_764);
var _765=this.container.ownerDocument.createElement("v:rect");
_765.coordsize="21600,21600";
_765.style.position="absolute";
_765.id="resize-top";
_765.style.left=500-_760/2;
_765.style.width=_760;
_765.style.position="absolute";
_765.style.top=-_761/2;
_765.style.height=_761;
_765.setAttribute("filled","true");
_765.setAttribute("fillcolor",this.TRACKER_COLOR);
_75e.appendChild(_765);
var _766=this.container.ownerDocument.createElement("v:oval");
_766.id="tracker-rotate";
_766.style.position="absolute";
_766.style.top=-40*(1000/(box["height"]+30));
var _767=10*(1000/(box["width"]+50));
_766.style.width=_767;
_766.style.left=500-(_767/2);
_766.style.height=10*(1000/(box["height"]+50));
_766.style.cursor="move";
_766.setAttribute("filled","true");
_766.setAttribute("fillcolor",this.TRACKER_COLOR);
_75e.appendChild(_766);
var _768=this.getHandles(_75b);
for(var i=0;
i<_768.length;
i++){
_768[i].id="tracker-handle:"+i;
_75e.appendChild(_768[i]);
}_75e.style.left=box.x-5;
_75e.style.top=box.y-5;
_75e.style.width=(box["width"]*1)+10;
_75e.style.height=(box["height"]*1)+10;
_75e.style.position="absolute";
_75e.style.zIndex=this.maxIndex+1;
_75e.style.zoom=_75b.style.zoom;
this.container.appendChild(_75e);
return _75e;
};
VMLRenderer.prototype.updateTracker=function(_76a){
var box=this.bounds(_76a);
var _76c=document.getElementById("tracker-group");
if(_76c){
if(_76a.tagName=="connector"){
return this.updateLineTracker(_76a,_76c);
}_76c.style.left=box.x-5;
_76c.style.top=box.y-5;
_76c.style.width=(box["width"]*1)+10;
_76c.style.height=(box["height"]*1)+10;
_76c.style.rotation=box.rotation;
_76c.style.zIndex=500;
var _76d=document.getElementById("tracker-rotate");
_76d.style.top=-40*(1000/(box["height"]+30));
var _76e=10*(1000/(box["width"]+50));
var _76f=10*(1000/(box["height"]+50));
_76d.style.width=_76e;
_76d.style.left=500-(_76e/2);
_76d.style.height=_76f;
var _770=document.getElementById("resize-left");
_770.style.left=-(_76e/2);
_770.style.width=_76e;
_770.style.top=500-(_76f/2);
_770.style.height=_76f;
var _771=document.getElementById("resize-right");
_771.style.left=1000-(_76e/2);
_771.style.width=_76e;
_771.style.top=500-(_76f/2);
_771.style.height=_76f;
var _772=document.getElementById("resize-top");
_772.style.left=500-_76e/2;
_772.style.width=_76e;
_772.style.top=-_76f/2;
_772.style.height=_76f;
var _773=document.getElementById("resize-bottom");
_773.style.left=500-_76e/2;
_773.style.width=_76e;
_773.style.position="absolute";
_773.style.top=1000-_76f/2;
_773.style.height=_76f;
var _774=$A(_76c.getElementsByTagName("rect"));
var _775=false;
_775=this.isMultipleSelect(_76a);
if(_774.length>4){
for(var i=4;
i<_774.length;
i++){
if(_775==true){
this.remove(_774[i]);
}else{
_774[i].style.width=_76e;
_774[i].style.height=_76f;
}}}}else{
this.showTracker(_76a);
}};
VMLRenderer.prototype.updateShapePath=function(_777,_778,_779){
if(!_779){
_779=0;
}var _77a=this.getAllSubShapes(_777);
_77a[_779].setAttribute("path",_778);
};
VMLRenderer.prototype.updateHandleTracker=function(_77b,_77c,_77d,_77e){
var _77f=$("tracker-handle:"+_77d);
if(!_77f){
return;
}_77f.style.left=Math.round(_77c.x);
_77f.style.top=Math.round(_77c.y);
};
VMLRenderer.prototype.createMultipleSelector=function(){
var _780=this.container.ownerDocument.createElement("v:group");
var _781=this.container.ownerDocument.createElement("v:shape");
_780.style.position="absolute";
_780.coordsize="1000,1000";
_781.style.width=1000;
_781.style.height=1000;
_781.left="0";
_781.top="0";
_781.coordsize="1000,1000";
_781.style.position="absolute";
_781.setAttribute("filled","true");
_781.setAttribute("fillcolor",this.TRACKER_COLOR);
_781.setAttribute("stroked","true");
_781.setAttribute("strokecolor",this.TRACKER_COLOR);
_781.setAttribute("strokeweight","0px");
_781.setAttribute("path","m0,0 l 1000,0,1000,1000,0,1000,0,0 e");
_780.appendChild(_781);
_780.id=this.MULTIPLE_SELECTOR_TRACKER_ID;
_781.id=this.MULTIPLE_SELECTOR_TRACKER_SHAPE_ID;
_780.style.zIndex=this.maxIndex;
_781.style.zIndex=this.maxIndex;
this.container.appendChild(_780);
this.setOpacity(_780,"0.3");
_781.style.zIndex=1000;
return _780;
};
VMLRenderer.prototype.createMultipleSelectorDummyShape=function(){
var _782=this.container.ownerDocument.createElement("v:group");
var _783=this.container.ownerDocument.createElement("v:shape");
_782.style.position="absolute";
_782.coordsize="1000,1000";
_783.style.width=1000;
_783.style.height=1000;
_783.left="0";
_783.top="0";
_783.coordsize="1000,1000";
_783.style.position="absolute";
_783.setAttribute("filled","true");
_783.setAttribute("fillcolor",this.TRACKER_COLOR);
_783.setAttribute("stroked","false");
_783.setAttribute("path","m0,0 l 1000,0,1000,1000,0,1000,0,0 e");
_782.appendChild(_783);
_782.id=this.MULTIPLE_SELECTOR_DUMMY_ID;
_783.id=this.MULTIPLE_SELECTOR_DUMMY_SHAPE_ID;
this.container.appendChild(_782);
this.setOpacity(_782,"0.3");
_782.style.zIndex=1;
_783.style.zIndex=1;
this.setCursor(_782,"move");
return _782;
};
VMLRenderer.prototype.getMarkup=function(){
return this.container.innerHTML;
};
VMLRenderer.prototype.getShapeFromEventSource=function(_784){
if(_784){
return _784.parentNode;
}};
VMLRenderer.prototype.handleConnectorTextBackgroundPositioning=function(_785,rect,text){
var _788=this.getConnectorBackgroundShape(_785);
_785.appendChild(_788);
if(text&&_utils.trim(text).length>0){
this.setX(_788,rect.x);
this.setY(_788,rect.y);
this.setWidth(_788,rect.width);
this.setHeight(_788,rect.height);
}else{
this.hideConnectorBackground(_788);
}};
VMLRenderer.prototype.hideConnectorBackground=function(_789){
if(_789){
this.setX(_789,0);
this.setY(_789,0);
this.setWidth(_789,0);
this.setHeight(_789,0);
}};
VMLRenderer.prototype.handleConnectorTextLinePositioning=function(_78a,_78b,x,y,_78e,_78f,_790,_791,_792){
var _793=(y*1)+(_78a*1)/2;
var _794=this.getShapeSubject(_792).style.zIndex;
var _795=new Array();
for(var i=_78e;
i>0;
i--){
var _797=(_793)+((_78f*1.1)*(i-_78e));
_795[_795.length]=this.createTextShape(_790[i-1],true,0,_797,(x*1),(x)+(_78b*1),_791,_794,_792);
}for(var i=_78e;
i<_790.length;
i++){
var _797=(_793)+((_78f*1.1)*(i+1-_78e));
_795[_795.length]=this.createTextShape(_790[i],true,0,_797,(x*1),(x)+(_78b*1),_791,_794,_792);
}return _795;
};
VMLRenderer.prototype.handleTextLinePositioning=function(_798,_799,x,y,_79c,_79d,_79e,_79f,_7a0){
var _7a1=_7a0.getElementsByTagName("text-bound");
var _7a2=500;
var _7a3=10;
var _7a4=1000;
if(_7a1.length>0){
_798=this.bounds(_7a0).height;
var _7a5=_7a1[0];
var x1=this.getAttribute(_7a5,"fromX");
_7a3=(_7a3*1)+(x1*1);
var x2=this.getAttribute(_7a5,"toX");
_7a4=x2-x1;
var y1=this.getAttribute(_7a5,"fromY");
var y2=this.getAttribute(_7a5,"toY");
_7a2=(y1*1)+((y2-y1)/2);
}var _7aa=100;
if(_798<=60&&_798>=25){
_7aa=((25/(_798)+1)*0.9)*(60+(10*(_79d-10)));
}else{
if(_798>60){
_7aa=((25/((_798)+1))*2.4)*(60+(10*(_79d-10)));
}else{
if(_798<=25){
_7aa=((25/(_798)+1)*1.3)*(60+(10*(_79d-10)));
}}}var _7ab=new Array();
for(var i=_79c;
i>0;
i--){
var _7ad=(_7a2)+((_7aa+10)*(i-_79c))+((_79d-10));
var _7ae=(i-_79c)*_7aa;
_7ab[_7ab.length]=this.createTextShape(_79e[i-1],true,_7ad,_7ae,_7a3,(_7a4-10),_79f,null,_7a0);
}for(var i=_79c;
i<_79e.length;
i++){
var _7ad=(_7a2)+((_7aa+10)*(i+1-_79c))+((_79d-10));
var _7ae=(i+1-_79c)*_7aa;
_7ab[_7ab.length]=this.createTextShape(_79e[i],true,_7ad,_7ae,_7a3,(_7a4-10),_79f,null,_7a0);
}return _7ab;
};
VMLRenderer.prototype.createTextShape=function(line,_7b0,_7b1,_7b2,_7b3,end,_7b5,_7b6,doc){
var doc=this.container.ownerDocument;
var _7b8=null;
var path=null;
var _7ba=null;
if(!_7b0){
_7ba=$("text:template"+line.type);
}if(_7b0||!_7ba){
_7b8=doc.createElement("v:line");
_7b8.setAttribute("UNSELECTABLE","ON");
_7b8.id="text:"+line.type;
_7b8.style.position="absolute";
_7b8.style.height=50+"px";
_7b8.style.top=_7b1+"px";
_7b8.from=_7b3+","+_7b2;
_7b8.to=end+","+_7b2;
_7b8.filled=_7b0;
_7b8.fillcolor=_7b5.color;
_7b8.stroked=false;
_7b8.strokecolor=_7b5.color;
if(_7b6){
_7b8.style.zIndex=_7b6;
}path=doc.createElement("v:path");
path.setAttribute("UNSELECTABLE","ON");
path.textpathok=_7b0;
_7b8.appendChild(path);
_7ba=doc.createElement("v:textpath");
_7ba.setAttribute("UNSELECTABLE","ON");
if(!_7b0){
_7ba.id="text:template"+line.type;
}_7b8.appendChild(_7ba);
}else{
_7b8=_7ba.parentElement;
path=_7b8.getElementsByTagName("path")[0];
}_7ba.on=_7b0;
_7ba.style.fontSize=_7b5.size;
_7ba.style.fontWeight=_7b5.bold;
_7ba.style.fontFamily=_7b5.family;
_7b8.style.fontFamily=_7b5.family;
path.style.fontFamily=_7b5.family;
_7ba.style.fontStyle=_7b5.italics;
_7ba.string=line.text;
_7ba.style.cssText=_7ba.style.cssText+";
v-text-align:"+_7b5.align+";
";
if(!_7b0){
_7b8.style.left=_7b3+"px";
_7b8.style.top=_7b1+"px";
_7b8.from=_7b3+","+_7b2;
_7b8.to=end+","+_7b2;
_7b8.style.zIndex=0;
}return _7b8;
};
VMLRenderer.prototype.clearShapeText=function(_7bb){
var _7bc=_7bb.getElementsByTagName("line");
if(_7bc.length==0){
return;
}var _7bd=$A(_7bc);
var i=0;
var _7bf=this.isConnector(_7bb);
if(_7bf&&this.getConnectorType(_7bb)=="line"){
i=1;
}for(i;
i<_7bd.length;
i++){
var node=_7bd[i];
if(node.id=="text:normal"||node.id=="text:newline"){
node.removeNode(true);
}}if(_7bf){
var _7c1=_7bb.getElementsByTagName("rect");
if(_7c1.length>0){
this.hideConnectorBackground(_7c1[0]);
}}};
String.prototype.wordWrap=function(m,b,c){
var i,j,l,s,r=this.split("\n");
if(m>0){
for(i in r){
for(s=r[i],r[i]="";
s.length>m;
j=c?m:(j=s.substr(0,m).match(/\S*$/)).input.length-j[0].length||m,r[i]+=s.substr(0,j)+((s=s.substr(j)).length?b:"")){
}r[i]+=s;
}}return r.join("\n");
};
VMLRenderer.prototype.setFont=function(_7ca,font,zoom){
var _7cd=this.getShapeText(_7ca);
if(!_7cd){
this.fillUpFont(font);
this.setShapeText(_7ca," ",font,true,null,zoom);
return;
}var _7ce=_7ca.getElementsByTagName("line");
var _7cf=new Array();
if(font.family!=""||font.bold!=""||font.align!=""||font.italics!=""){
for(var i=0;
i<_7ce.length;
i++){
var _7d1=_7ce[i].getElementsByTagName("textpath");
if(_7d1.length>0){
_7cf[_7cf.length]=_7d1[0];
}}}var _7d2=this.getFont(_7ca);
if(font.size!=""&&(font.size!=_7d2.size)){
this.clearShapeText(_7ca);
this.setShapeText(_7ca,_7cd,font,true,_7d2,zoom);
}if(font.color!=""){
for(var i=0;
i<_7ce.length;
i++){
if(_7ce[i].id.indexOf("text:")>=0){
_7ce[i].fillcolor=font.color;
_7ce[i].strokecolor=font.color;
}}}if(font.family!=""){
for(var i=0;
i<_7cf.length;
i++){
var _7d3=_7cf[i];
_7d3.style.fontFamily=font.family;
}}if(font.bold!=""){
for(var i=0;
i<_7cf.length;
i++){
_7cf[i].style.fontWeight=font.bold;
}}if(font.italics!=""){
for(var i=0;
i<_7cf.length;
i++){
_7cf[i].style.fontStyle=font.italics;
}}if(font.align!=""){
var re=new RegExp("\\bv-text-align:(\\s)*[a-z]+\\b","g");
for(var i=0;
i<_7cf.length;
i++){
var _7d3=_7cf[i];
_7d3.style.cssText=_7cf[i].style.cssText.replace(re,"v-text-align:"+font.align);
var _7d5=_7d3.parentElement;
_7d3.removeNode(true);
_7d5.appendChild(_7d3);
}}};
VMLRenderer.prototype.getFont=function(_7d6){
var font=new Object();
font.size="";
font.family="";
font.color="";
font.align="";
font.italics="";
font.bold="";
var _7d8=document.getElementById("text:dummy"+_7d6.id);
if(!_7d8){
_7d8=document.getElementById("text:template"+_7d6.id);
}if(!_7d8){
return font;
}else{
if(_7d8.parentElement.fillcolor){
font.color=_7d8.parentElement.fillcolor.value;
}if(_7d8.style.fontFamily){
font.family=_7d8.style.fontFamily;
}if(_7d8.style.fontSize){
font.size=_7d8.style.fontSize.split("px")[0];
}if(_7d8.style.fontWeight){
font.bold=_7d8.style.fontWeight;
}if(_7d8.style.fontStyle){
font.italics=_7d8.style.fontStyle;
}if(_7d8.style.cssText){
var _7d9=_7d8.style.cssText;
var _7da=_7d9.split("v-text-align:");
if(_7da.length>1){
var _7db=_7da[1].split(";
");
if(_7db.length>0){
font.align=_utils.trim(_7db[0]);
}}}}return font;
};
VMLRenderer.prototype.appendPageAttribute=function(div,_7dd){
if(div){
div.appendChild(_7dd);
}};
VMLRenderer.prototype.getRealData=function(){
var div=this.createElement("div");
div.insertAdjacentHTML("AfterBegin",this.container.innerHTML);
var _7df=div.getElementsByTagName("textpath");
for(var i=0;
i<_7df.length;
i++){
if(_7df[i].string){
var _7e1=_7df[i].string;
var node=this.container.ownerDocument.createTextNode(_7e1);
_7df[i].appendChild(node);
_7df[i].string=null;
}}return div;
};
VMLRenderer.prototype.getValidDocumentFromResponse=function(_7e3){
var div=this.createElement("div");
div.innerHTML=_7e3;
return div;
};
VMLRenderer.prototype.open=function(div){
var _7e6=this.getAllShapes(div);
var _7e7=$A(_7e6);
for(var i=0;
i<_7e7.length;
i++){
_7e7[i].setAttribute("UNSELECTABLE","ON");
this.container.appendChild(_7e7[i]);
this.updateZIndex(_7e7[i]);
}_7e6=this.getAllConnectors(div);
_7e7=$A(_7e6);
for(var i=0;
i<_7e7.length;
i++){
var from,to,c1,c2=null;
var _7ed=this.getShapeSubject(_7e7[i]);
_7ed.setAttribute("UNSELECTABLE","ON");
var type=this.getConnectorType(_7e7[i]);
var _7ef=(type=="line")?"line":"curve";
if(type=="ortho-line"){
_7ef="polyline";
_7e7[i].getElementsByTagName(_7ef)[0].points="0,0";
}if(type=="curve-line"){
from=_7ed.from;
to=_7ed.to;
c1=_7ed.control1;
c2=_7ed.control2;
_7ed.from="0,0";
_7ed.to="10,10";
_7ed.control1="1,1";
_7ed.control2="1,1";
}var _7f0=_7e7[i].getElementsByTagName(_7ef)[0].style.zIndex;
_7e7[i].getElementsByTagName(_7ef)[0].style.zIndex=0;
this.container.appendChild(_7e7[i]);
if(type=="ortho-line"){
var _7f1=_7e7[i].getAttribute("polyline-path");
_7e7[i].getElementsByTagName("polyline")[0].points.value=_7f1;
}if(type=="curve-line"){
_7ed.from=from;
_7ed.to=to;
_7ed.control1=c1;
_7ed.control2=c2;
}_7e7[i].getElementsByTagName(_7ef)[0].style.zIndex=_7f0;
this.updateZIndex(_7e7[i]);
}};
function CLUtilities(){
}CLUtilities.prototype.encode=function(text){
var _7f3=text;
var amp=/&/gi;
var gt=/>/gi;
var lt=/</gi;
var quot=/"/gi;
var apos=/'/gi;
var _7f9="&gt;
";
var _7fa="&lt;
";
var _7fb="&amp;
";
var _7fc="&quot;
";
var _7fd="&apos;
";
_7f3=_7f3.replace(amp,_7fb);
_7f3=_7f3.replace(quot,_7fc);
_7f3=_7f3.replace(lt,_7fa);
_7f3=_7f3.replace(gt,_7f9);
_7f3=_7f3.replace(apos,_7fd);
return _7f3;
};
CLUtilities.prototype.decode=function(text){
var _7ff=text;
var amp=/&amp;
/gi;
var gt=/&gt;
/gi;
var lt=/&lt;
/gi;
var quot=/&quot;
/gi;
var apos=/&apos;
/gi;
var nbsp=/&nbsp;
/gi;
var _806=">";
var _807="<";
var _808="&";
var _809="\"";
var _80a="'";
var _80b=" ";
_7ff=_7ff.replace(amp,_808);
_7ff=_7ff.replace(quot,_809);
_7ff=_7ff.replace(lt,_807);
_7ff=_7ff.replace(gt,_806);
_7ff=_7ff.replace(apos,_80a);
_7ff=_7ff.replace(nbsp,_80b);
return _7ff;
};
CLUtilities.prototype.encodeHTML=function(_80c){
var _80d="";
for(var i=0;
i<_80c.length;
i++){
var _80f=_80c.charCodeAt(i);
_80d+="&#"+_80f+";
";
}return _80d;
};
CLUtilities.prototype.decodeHTML=function(_810){
var _811="";
if(_810.indexOf("&")<0){
_811=_810;
}else{
for(var i=0;
i<_810.length;
i++){
var _813=_810.charAt(i);
var _814="";
if(_813=="&"){
var _815=_810.indexOf(";
",i+1);
if(_815>0){
var _816=_810.substring(i+1,_815);
if((_816.length>1)&&(_816.charAt(0)=="#")){
try{
if((_816.charAt(1)=="x")||(_816.charAt(1)=="X")){
_814=String.fromCharCode(_816.substring(2));
}else{
_814=String.fromCharCode(_816.substring(1));
}}catch(e){
i++;
}}}}_811+=_814;
}}return this.decode(_811);
};
CLUtilities.prototype.trim=function(_817){
if(_817.length<1){
return "";
}_817=this.RTrim(_817);
_817=this.LTrim(_817);
if(_817==""){
return "";
}else{
return _817;
}};
CLUtilities.prototype.RTrim=function(_818){
var _819=String.fromCharCode(32);
var _81a=_818.length;
var _81b="";
if(_81a<0){
return "";
}var _81c=_81a-1;
while(_81c>-1){
if(_818.charAt(_81c)==_819){
}else{
_81b=_818.substring(0,_81c+1);
break;
}_81c=_81c-1;
}return _81b;
};
CLUtilities.prototype.LTrim=function(_81d){
var _81e=String.fromCharCode(32);
if(_81f<1){
return "";
}var _81f=_81d.length;
var _820="";
var _821=0;
while(_821<_81f){
if(_81d.charAt(_821)==_81e){
}else{
_820=_81d.substring(_821,_81f);
break;
}_821=_821+1;
}return _820;
};
CLUtilities.prototype.parseColorFilter=function(_822){
var _823=new Array();
var list=_822.split("|");
for(var i=0;
i<list.length;
i++){
var str=list[i].match(/^(\d):(\d.\d\d),(\d.\d\d),(\d.\d\d)$/);
_823[_823.length]={
index:str[1],r:str[2],g:str[3],b:str[4]};
}return _823;
};
CLUtilities.prototype.decodeColor=function(str){
if(/^#?([\da-f]{
3}|[\da-f]{
6})$/i.test(str)){
function _(s,i){
return parseInt(s.substr(i,2),16);
}str=str.replace(/^#/,"").replace(/^([\da-f])([\da-f])([\da-f])$/i,"$1$1$2$2$3$3");
return {
r:_(str,0),g:_(str,2),b:_(str,4)};
}else{
if(/^rgb *\( *\d{
0,3} *, *\d{
0,3} *, *\d{
0,3} *\)$/i.test(str)){
str=str.match(/^rgb *\( *(\d{
0,3}) *, *(\d{
0,3}) *, *(\d{
0,3}) *\)$/i);
return {
r:parseInt(str[1]),g:parseInt(str[2]),b:parseInt(str[3])};
}}};
function x_aaa(){
}