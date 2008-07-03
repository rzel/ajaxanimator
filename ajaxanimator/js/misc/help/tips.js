/*
 * those random helpful usage tips window(s) that pops up for no apparent reason. demonstrating common sense.
 * i donno, they're probably somewhat helpful. and guessing that nobody other than me really uses it as much
 * as me, or nobody really knows special tricks that I know..... whatever. anyway. this isn't really helpful
 * is it?
 *
 * I'll try to copy something *good* like krita or the gimp for the layout for this thing.
 * I'm debating whether I should make this appear when you start it. woudl that work?
 * I'm probably talking to my self right now. and hopefully nobody will read this. but you nver know.
 */


//.... yes i did..... i totally copied Kate :P

Ax.showTips = function(){
  (new Ext.Window({
    title: "Tip of the Day - Ajax Animator",
    iconCls: "tb_tip",
    layout: "border",
    width: 300,
    height: 250,
    items: [
            {region: "north", html: "<center><h1 class='tiptitle'>Did you know...?</h1></center><br>", border: false},
            {region: "center", html: "<center>woah, this stuffs are interestings</center>", border: false}
            ],
    buttons: [{text: "Previous", iconCls: "arrow_prev"},{text: "Next", iconCls: "arrow_next"},{text: "Close", iconCls: "close"}]
    })).show(document.body)
}
