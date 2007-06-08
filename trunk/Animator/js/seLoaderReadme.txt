Stilleye Media Preloader
Description

This is the image preloading script used on version 1 of this site.
Directions

Edit the various styles for the load bar (comments in source). Create a new seLoader() object, set the images and various properties:

<script type="text/javascript">
// make loader object and set the directory (dir optional)
load = new seLoader('../../gfx/')
// run a script after loading (optional)
load.runAtEnd('alert("Done Loading Images")')
load.setImgs // set the images
(
	'orange.gif','logo.gif','scroller.gif','nav/news.gif'
)

function initLoader()
{
	load.load()
}
onload=initLoader
</script>
