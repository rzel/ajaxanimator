//who would have known that prior, this file was actually pretty big. I mean.. look, this is barely 5 lines now!

function RichDrawViewer(elem, renderer) {
 this.container = elem;
 this.renderer = renderer;
 this.renderer.init(this.container);
 this.renderer.editor = this;
}