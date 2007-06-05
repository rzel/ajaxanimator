seBuffer: Page Buffer
Description

This is a document buffer script that utilizes the IFRAME to import documents into a layer in a page.
Instructions

    * Link seBuffer.js into your document with a <script> tag.
    * Define the styles for the layer you are loading the content into in the <style> tag or your linked stylesheet. Ex:

<style type="text/css">
#loadTo
{
	width : 300px;
	height : 200px;
	overflow : auto;
	margin : 2px;
	padding : 2px;
	border : 1px solid;
	background : url(../../gfx/bg.jpg) fixed;
}
</style>

    * Place this somewhere in your document:
      <iframe src="" name="seBufferBox" id="seBufferBox" width="1" height="1" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" style="position:absolute;left:-1px;top:-1px;z-index:0"></iframe>
    * See demo and code for further instructions.
