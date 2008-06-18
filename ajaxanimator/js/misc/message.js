/*awesome little grey boxes that fall from the sky... stolen from Ext docs */

Ax.createBox = function(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
}
   
Ax.msg = function(title, format){
    if(!Ax.msgCt){
        Ax.msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
    }
    Ax.msgCt.alignTo(document, 't-t');
    var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
    var m = Ext.DomHelper.append(Ax.msgCt, {html:Ax.createBox(title, s)}, true);
    m.slideIn('t').pause(10).ghost("t", {remove:true});
}
