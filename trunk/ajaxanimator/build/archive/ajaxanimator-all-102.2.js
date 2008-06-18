
 //JS File: ../js/ext/ux/Ext.ux.Crypto.SHA1.js 
 Ext.namespace('Ext.ux', 'Ext.ux.Crypto');

Ext.ux.Crypto.SHA1 = function() {
  // function 'f' [ß4.1.1]
  var f = function(s, x, y, z) {
      switch (s) {
          case 0: return (x & y) ^ (~x & z);           // Ch()
          case 1: return x ^ y ^ z;                    // Parity()
          case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
          case 3: return x ^ y ^ z;                    // Parity()
      }
  };
  // rotate left (circular left shift) value x by n positions [ß3.2.5]
  var ROTL = function(x, n) {
      return (x<<n) | (x>>>(32-n));
  };
  return {
    hash : function(msg) {
      // constants [ß4.2.1]
      var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  
  
      // PREPROCESSING 
   
      msg += String.fromCharCode(0x80); // add trailing '1' bit to string [ß5.1.1]
  
      // convert string msg into 512-bit/16-integer blocks arrays of ints [ß5.2.1]
      var l = Math.ceil(msg.length/4) + 2;  // long enough to contain msg plus 2-word length
      var N = Math.ceil(l/16);              // in N 16-int blocks
      var M = new Array(N);
      for (var i=0; i<N; i++) {
          M[i] = new Array(16);
          for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
              M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
                        (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
          }
      }
      // add length (in bits) into final pair of 32-bit integers (big-endian) [5.1.1]
      // note: most significant word would be ((len-1)*8 >>> 32, but since JS converts
      // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
      M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
      M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
  
      // set initial hash value [ß5.3.1]
      var H0 = 0x67452301;
      var H1 = 0xefcdab89;
      var H2 = 0x98badcfe;
      var H3 = 0x10325476;
      var H4 = 0xc3d2e1f0;
  
      // HASH COMPUTATION [ß6.1.2]
  
      var W = new Array(80); var a, b, c, d, e;
      for (var i=0; i<N; i++) {
  
          // 1 - prepare message schedule 'W'
          for (var t=0;  t<16; t++) W[t] = M[i][t];
          for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
  
          // 2 - initialise five working variables a, b, c, d, e with previous hash value
          a = H0; b = H1; c = H2; d = H3; e = H4;
  
          // 3 - main loop
          for (var t=0; t<80; t++) {
              var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
              var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
              e = d;
              d = c;
              c = ROTL(b, 30);
              b = a;
              a = T;
          }
  
          // 4 - compute the new intermediate hash value
          H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
          H1 = (H1+b) & 0xffffffff; 
          H2 = (H2+c) & 0xffffffff; 
          H3 = (H3+d) & 0xffffffff; 
          H4 = (H4+e) & 0xffffffff;
      }
  
      return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
    }
  }
  
}();

/**
 * @class Number
 */
Ext.applyIf(Number.prototype, {
    /**
     * extend Number class with a tailored hex-string method (note toString(16) is implementation-dependant, and in IE returns signed numbers when used on full words)
     * @return {String} The number in Hexidecimal format.
     */
    toHexStr : function(){
        var s = '', v;
        for(var i = 7; i >= 0; i--) {
            v = (this >>> (i * 4)) & 0xf;
            s += v.toString(16);
        }
        return s;
    }
});

 //JS File: ../js/ext/ux/Ext.ux.ThemeMenu.js 
 /*
* Theme Selection Menu
*
* By Antimatter15 2008
* i donno. gpl v3 maybe.
*/

Ext.ux.ThemeMenu = function(config){
    Ext.ux.ThemeMenu.superclass.constructor.call(this, config);

    //this.plain = true;
	for(var theme = 0; theme < this.themeconfig.length; theme++){
	this.add(new Ext.menu.CheckItem({
    text: this.themeconfig[theme][1], //text title
	theme: theme,
	checked: (this.themeconfig[theme][2]==true),
    group: 'thememenu',
    checkHandler: function(item, checked) {
        if (checked){
		item.parentMenu.setTheme(item.theme)
		};
    }
}))
}

};

Ext.extend(Ext.ux.ThemeMenu, Ext.menu.Menu, {

cssPath: "../theme/css/", //mind the trailing slash
themeconfig:[ //array of stuff
 ['xtheme-default.css','Ext Blue Theme',true] //t3h default
,['xtheme-gray.css', 'Gray Theme']
,['xtheme-gray.css,xtheme-gray-extend.css', 'Extended Gray Theme'] //this is an "extend" theme, it is applied over another theme
,['xtheme-darkgray.css', 'Dark Gray Theme']
,['xtheme-black.css',  'Black Theme']
,['xtheme-olive.css', 'Olive Theme']
,['xtheme-purple.css', 'Purple Theme']
,['xtheme-slate.css', 'Slate Theme']
,['xtheme-peppermint.css',  'Peppermint Theme']
,['xtheme-chocolate.css', 'Chocolate Theme']
,['xtheme-slickness.css', 'SlicknesS Theme']
,['xtheme-pink.css', 'Pink Theme']
,['xtheme-midnight.css', "Midnight Theme"]
,['xtheme-green.css', "Green Theme"]
,['xtheme-indigo.css', "Indigo Theme"]
,['xtheme-silverCherry.css',"Silver Cherry Theme"]
,['xtheme-orange.css',"Orange Theme"]
],
setTheme: function(id){
//console.log(this)
var theme = this.themeconfig[id][0];
var themes = theme.split(",")
for(var i = 0; i < 4; i++){ //up to 4 themes on top of each other
if(themes[i]){
Ext.util.CSS.swapStyleSheet('csstheme'+i, this.cssPath + themes[i]);
}else{
Ext.util.CSS.removeStyleSheet('csstheme'+i);
}
}

}//end setTheme
});







 //JS File: ../js/ext/ux/Ext.ux.ToastWindow.js 
 Ext.ux.ToastWindowMgr = {
    positions: [] 
};

Ext.ux.ToastWindow = Ext.extend(Ext.Window, {
    initComponent: function(){
          Ext.apply(this, {
              iconCls: this.iconCls || 'information',
            width: 200,
            height: 100,
            autoScroll: true,
            autoDestroy: true,
            plain: false
          });
        this.task = new Ext.util.DelayedTask(this.hide, this);
        Ext.ux.ToastWindow.superclass.initComponent.call(this);
    },
    setMessage: function(msg){
        this.body.update(msg);
    },
    setTitle: function(title, iconCls){
        Ext.ux.ToastWindow.superclass.setTitle.call(this, title, iconCls||this.iconCls);
    },
    onRender:function(ct, position) {
        Ext.ux.ToastWindow.superclass.onRender.call(this, ct, position);
    },
    onDestroy: function(){
        Ext.ux.ToastWindowMgr.positions.remove(this.pos);
        Ext.ux.ToastWindow.superclass.onDestroy.call(this);
    },
    afterShow: function(){
        Ext.ux.ToastWindow.superclass.afterShow.call(this);
        this.on('move', function(){
               Ext.ux.ToastWindowMgr.positions.remove(this.pos);
            this.task.cancel();}
        , this);
        this.task.delay(4000);
    },
    animShow: function(){
        this.pos = 0;
        while(Ext.ux.ToastWindowMgr.positions.indexOf(this.pos)>-1)
            this.pos++;
        Ext.ux.ToastWindowMgr.positions.push(this.pos);
        this.setSize(200,100);
        this.el.alignTo(document, "br-br", [ -20, -20-((this.getSize().height+10)*this.pos) ]);
        this.el.slideIn('b', {
            duration: 1,
            callback: this.afterShow,
            scope: this
        });    
    },
    animHide: function(){
           Ext.ux.ToastWindowMgr.positions.remove(this.pos);
        this.el.ghost("b", {
            duration: 1,
            remove: true,
        scope: this,
        callback: this.destroy
        });    
    }
});  
 //JS File: ../js/ext/ux/Ext.ux.grid.CellActions.js 
 // vim: ts=4:sw=4:nu:fdc=4:nospell
/**
 * CellActions plugin for Ext grid
 *
 * Contains renderer for an icon and fires events when icon is clicked
 *
 * @author    Ing. Jozef Sak√°lo≈°
 * @date      22. March 2008
 * @version   $Id$
 *
 * @license Ext.ux.grid.CellActions is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/**
 * The following css is required:
 *
 * .ux-cell-value {
 * 	position:relative;
 * 	zoom:1;
 * }
 * .ux-cell-actions {
 * 	position:absolute;
 * 	right:0;
 * 	top:-2px;
 * }
 * .ux-cell-actions-left {
 * 	left:0;
 * 	top:-2px;
 * }
 * .ux-cell-action {
 * 	width:16px;
 * 	height:16px;
 * 	float:left;
 * 	cursor:pointer;
 * 	margin: 0 0 0 4px;
 * }
 * .ux-cell-actions-left .ux-cell-action {
 * 	margin: 0 4px 0 0;
 * }
 */

/*global Ext */

Ext.ns('Ext.ux.grid');

// constructor and cellActions documentation
// {{{
/**
 * @class Ext.ux.grid.CellActions
 * @extends Ext.util.Observable
 * @constructor
 *
 * CellActions plugin causes that column model recognizes the config property cellAcions
 * that is the array of configuration objects for that column. The documentationi follows.
 *
 * THE FOLLOWING CONFIG OPTIONS ARE FOR COLUMN MODEL COLUMN, NOT FOR CellActions ITSELF.
 *
 * @cfg {Array} cellActions Mandatory. Array of action configuration objects. The following
 * configuration options of action are recognized:
 *
 * - @cfg {Function} callback Optional. Function to call if the action icon is clicked.
 *   This function is called with same signature as action event and in its original scope.
 *   If you need to call it in different scope or with another signature use 
 *   createCallback or createDelegate functions. Works for statically defined actions. Use
 *   callbacks configuration options for store bound actions.
 *
 * - @cfg {Function} cb Shortcut for callback.
 *
 * - @cfg {String} iconIndex Optional, however either iconIndex or iconCls must be
 *   configured. Field name of the field of the grid store record that contains
 *   css class of the icon to show. If configured, shown icons can vary depending
 *   of the value of this field.
 *
 * - @cfg {String} iconCls. css class of the icon to show. It is ignored if iconIndex is
 *   configured. Use this if you want static icons that are not base on the values in the record.
 *
 * - @cfg {String} qtipIndex Optional. Field name of the field of the grid store record that 
 *   contains tooltip text. If configured, the tooltip texts are taken from the store.
 *
 * - @cfg {String} tooltip Optional. Tooltip text to use as icon tooltip. It is ignored if 
 *   qtipIndex is configured. Use this if you want static tooltips that are not taken from the store.
 *
 * - @cfg {String} qtip Synonym for tooltip
 *
 * - @cfg {String} style Optional. Style to apply to action icon container.
 */
Ext.ux.grid.CellActions = function(config) {
	Ext.apply(this, config);

	this.addEvents(
		/**
		 * @event action
		 * Fires when user clicks a cell action
		 * @param {Ext.grid.GridPanel} grid
		 * @param {Ext.data.Record} record Record containing data of clicked cell
		 * @param {String} action Action clicked (equals iconCls);
		 * @param {Mixed} value Value of the clicke cell
		 * @param {String} dataIndex as specified in column model
		 * @param {Number} rowIndex Index of row clicked
		 * @param {Number} colIndex Incex of col clicked
		 */
		'action'
		/**
		 * @event beforeaction
		 * Fires when user clicks a cell action but before action event is fired. Return false to cancel the action;
		 * @param {Ext.grid.GridPanel} grid
		 * @param {Ext.data.Record} record Record containing data of clicked cell
		 * @param {String} action Action clicked (equals iconCls);
		 * @param {Mixed} value Value of the clicke cell
		 * @param {String} dataIndex as specified in column model
		 * @param {Number} rowIndex Index of row clicked
		 * @param {Number} colIndex Incex of col clicked
		 */
		,'beforeaction'
	);
	// call parent
	Ext.ux.grid.CellActions.superclass.constructor.call(this);

}; // eo constructor
// }}}

Ext.extend(Ext.ux.grid.CellActions, Ext.util.Observable, {

	/**
	 * @cfg {String} actionEvnet Event to trigger actions, e.g. click, dblclick, mouseover (defaults to 'click')
	 */
	 actionEvent:'click'

	/**
	 * @cfg {Number} actionWidth Width of action icon in pixels. Has effect only if align:'left'
	 */
	,actionWidth:20

	/**
	 * @cfg {String} align Set to 'left' to put action icons before the cell text. (defaults to undefined, meaning right)
	 */

	/**
	 * @private
	 * @cfg {String} tpl Template for cell with actions
	 */
	,tpl:'<div class="ux-cell-value" style="padding-left:{padding}px">'
			+'<tpl if="\'left\'!==align">{value}</tpl>'
		 	+'<div class="ux-cell-actions<tpl if="\'left\'===align"> ux-cell-actions-left</tpl>" style="width:{width}px">'
				+'<tpl for="actions"><div class="ux-cell-action {cls}" qtip="{qtip}" style="{style}">&#160;</div></tpl>'
			+'</div>'
			+'<tpl if="\'left\'===align">{value}</tpl>'
		+'<div>'
		
	/**
	 * Called at the end of processActions. Override this if you need it.
	 * @param {Object} c Column model configuration object
	 * @param {Object} data See this.processActions method for details
	 */
	,userProcessing:Ext.emptyFn

	// {{{
	/**
	 * Init function
	 * @param {Ext.grid.GridPanel} grid Grid this plugin is in
	 */
	,init:function(grid) {
		this.grid = grid;
//		grid.on({scope:this, render:this.onRenderGrid});
		grid.afterRender = grid.afterRender.createSequence(this.onRenderGrid, this);

		var cm = this.grid.getColumnModel();
		Ext.each(cm.config, function(c, idx) {
			if('object' === typeof c.cellActions) {
				c.origRenderer = cm.getRenderer(idx);
				c.renderer = this.renderActions.createDelegate(this);
			}
		}, this);


	} // eo function init
	// }}}
	// {{{
	/**
	 * grid render event handler, install actionEvent handler on view.mainBody
	 * @private
	 */
	,onRenderGrid:function() {

		// install click event handler on view mainBody
		this.view = this.grid.getView();
		var cfg = {scope:this};
		cfg[this.actionEvent] = this.onClick;
		this.view.mainBody.on(cfg);

	} // eo function onRender
	// }}}
	// {{{
	/**
	 * Returns data to apply to template. Override this if needed
	 * @param {Mixed} value 
	 * @param {Object} cell object to set some attributes of the grid cell
	 * @param {Ext.data.Record} record from which the data is extracted
	 * @param {Number} row row index
	 * @param {Number} col col index
	 * @param {Ext.data.Store} store object from which the record is extracted
	 * @returns {Object} data to apply to template
	 */
	,getData:function(value, cell, record, row, col, store) {
		return record.data || {};
	}
	// }}}
	// {{{
	/**
	 * replaces (but calls) the original renderer from column model
	 * @private
	 * @param {Mixed} value 
	 * @param {Object} cell object to set some attributes of the grid cell
	 * @param {Ext.data.Record} record from which the data is extracted
	 * @param {Number} row row index
	 * @param {Number} col col index
	 * @param {Ext.data.Store} store object from which the record is extracted
	 * @returns {String} markup of cell content
	 */
	,renderActions:function(value, cell, record, row, col, store) {

		// get column config from column model
		var c = this.grid.getColumnModel().config[col];

		// get output of the original renderer
		var val = c.origRenderer(value, cell, record, row, col, store);

		// get actions template if we need but don't have one
		if(c.cellActions && !c.actionsTpl) {
			c.actionsTpl = this.processActions(c);
			c.actionsTpl.compile();
		}
		// return original renderer output if we don't have actions
		else if(!c.cellActions) {
			return val;
		}

		// get and return final markup
		var data = this.getData.apply(this, arguments);
		data.value = val;
		return c.actionsTpl.apply(data);

	} // eo function renderActions
	// }}}
	// {{{
	/**
	 * processes the actions configs from column model column, saves callbacks and creates template
	 * @param {Object} c column model config of one column
	 * @private
	 */
	,processActions:function(c) {

		// callbacks holder
		this.callbacks = this.callbacks || {};

		// data for intermediate template
		var data = {
			 align:this.align || 'right'
			,width:this.actionWidth * c.cellActions.length
			,padding:'left' === this.align ? this.actionWidth * c.cellActions.length : 0
			,value:'{value}'
			,actions:[]
		};

		// cellActions loop
		Ext.each(c.cellActions, function(a, i) {

			// save callback
			if(a.iconCls && 'function' === typeof (a.callback || a.cb)) {
				this.callbacks[a.iconCls] = a.callback || a.cb;
			}

			// data for intermediate xtemplate action
			var o = {
				 cls:a.iconIndex ? '{' + a.iconIndex + '}' : (a.iconCls ? a.iconCls : '')
				,qtip:a.qtipIndex ? '{' + a.qtipIndex + '}' : (a.tooltip || a.qtip ? a.tooltip || a.qtip : '')
				,style:a.style ? a.style : ''
			};
			data.actions.push(o);

		}, this); // eo cellActions loop

		this.userProcessing(c, data);

		// get and return final template
		var xt = new Ext.XTemplate(this.tpl);
		return new Ext.Template(xt.apply(data));

	} // eo function processActions
	// }}}
	// {{{
	/**
	 * Grid body actionEvent event handler
	 * @private
	 */
	,onClick:function(e, target) {

		// collect all variables for callback and/or events
		var t = e.getTarget('div.ux-cell-action');
		var row = e.getTarget('.x-grid3-row');
		var col = this.view.findCellIndex(target.parentNode.parentNode);
		var c = this.grid.getColumnModel().config[col];
		var record, dataIndex, value, action;
		if(t) {
			record = this.grid.store.getAt(row.rowIndex);
			dataIndex = c.dataIndex;
			value = record.get(dataIndex);
			action = t.className.replace(/ux-cell-action /, '');
		}

		// check if we've collected all necessary variables
		if(false !== row && false !== col && record && dataIndex && action) {

			// call callback if any
			if(this.callbacks && 'function' === typeof this.callbacks[action]) {
				this.callbacks[action](this.grid, record, action, value, row.rowIndex, col);
			}

			// fire events
			if(true !== this.eventsSuspended && false === this.fireEvent('beforeaction', this.grid, record, action, value, dataIndex, row.rowIndex, col)) {
				return;
			}
			else if(true !== this.eventsSuspended) {
				this.fireEvent('action', this.grid, record, action, value, dataIndex, row.rowIndex, col);
			}

		}
	} // eo function onClick
	// }}}

});

// register xtype
Ext.reg('cellactions', Ext.ux.grid.CellActions);

// eof

 //JS File: ../js/ext/ux/Ext.ux.SliderTip.js 
 /**
 * @class Ext.ux.SliderTip
* @extends Ext.Tip
 * Simple plugin for using an Ext.Tip with a slider to show the slider value
 * stolen from the Ext Slider Example http://extjs.com/deploy/dev/examples/slider/slider.html
 */
 
Ext.ux.SliderTip = Ext.extend(Ext.Tip, {
 minWidth: 10,
 offsets : [0, -10],
 init : function(slider){
 slider.on('dragstart', this.onSlide, this);
 slider.on('drag', this.onSlide, this);
 slider.on('dragend', this.hide, this);
 slider.on('destroy', this.destroy, this);
 },

 onSlide : function(slider){
 this.show();
 this.body.update(this.getText(slider));
 this.doAutoWidth();
 this.el.alignTo(slider.thumb, 'b-t?', this.offsets);
 },

 getText : function(slider){
 return slider.getValue();
 }
});
 //JS File: ../js/ext/ux/Ext.ux.ColorField.js 
 /**
 * @class Ext.ux.ColorField
 * @extends Ext.form.TriggerField
 * Provides a very simple color form field with a ColorMenu dropdown.
 * Values are stored as a six-character hex value without the '#'.
 * I.e. 'ffffff'
 * @constructor
 * Create a new ColorField
 * <br />Example:
 * <pre><code>
var cf = new Ext.ux.ColorField({
	fieldLabel: 'Color',
	hiddenName:'pref_sales',
	showHexValue:true
});
</code></pre>
 * @param {Object} config
 */
 
Ext.ux.ColorField = function(config){
    Ext.ux.ColorField.superclass.constructor.call(this, config);
	this.on('render', this.handleRender);
};

Ext.extend(Ext.ux.ColorField, Ext.form.TriggerField,  {
   initComponent: function(){
    this.addEvents({
      "select": true
    })
   },
    /**
     * @cfg {Boolean} showHexValue
     * True to display the HTML Hexidecimal Color Value in the field
     * so it is manually editable.
     */
    showHexValue : false,
	
	/**
     * @cfg {String} triggerClass
     * An additional CSS class used to style the trigger button.  The trigger will always get the
     * class 'x-form-trigger' and triggerClass will be <b>appended</b> if specified (defaults to 'x-form-color-trigger'
     * which displays a calendar icon).
     */
    triggerClass : 'x-form-color-trigger',
	
    /**
     * @cfg {String/Object} autoCreate
     * A DomHelper element spec, or true for a default element spec (defaults to
     * {tag: "input", type: "text", size: "10", autocomplete: "off"})
     */
    // private
    defaultAutoCreate : {tag: "input", type: "text", size: "10",
						 autocomplete: "off", maxlength:"6"},
	
	/**
	 * @cfg {String} lengthText
	 * A string to be displayed when the length of the input field is
	 * not 3 or 6, i.e. 'fff' or 'ffccff'.
	 */
	lengthText: "Color hex values must be either 3 or 6 characters.",
	
	//text to use if blank and allowBlank is false
	blankText: "Must have a hexidecimal value in the format ABCDEF.",
	
	/**
	 * @cfg {String} color
	 * A string hex value to be used as the default color.  Defaults
	 * to 'FFFFFF' (white).
	 */
	defaultColor: 'FFFFFF',
	
	maskRe: /[a-f0-9]/i,
	// These regexes limit input and validation to hex values
	regex: /[a-f0-9]/i,

	//private
	curColor: 'ffffff',
	
    // private
    validateValue : function(value){
		if(!this.showHexValue) {
			return true;
		}
		if(value.length<1) {
			this.el.setStyle({
				'background-color':'#' + this.defaultColor
			});
			if(!this.allowBlank) {
				this.markInvalid(String.format(this.blankText, value));
				return false
			}
			return true;
		}
		if(value.length!=3 && value.length!=6 ) {
			this.markInvalid(String.format(this.lengthText, value));
			return false;
		}
		this.setColor(value);
        return true;
    },

    // private
    validateBlur : function(){
        return !this.menu || !this.menu.isVisible();
    },
	
	// Manually apply the invalid line image since the background
	// was previously cleared so the color would show through.
	markInvalid : function( msg ) {
		Ext.ux.ColorField.superclass.markInvalid.call(this, msg);
		this.el.setStyle({
			'background-image': 'url(../theme/images/default/grid/invalid_line.gif)'
		});
	},

    /**
     * Returns the current color value of the color field
     * @return {String} value The hexidecimal color value
     */
    getValue : function(){
		return this.curValue || this.defaultValue || "FFFFFF";
    },

    /**
     * Sets the value of the color field.  Format as hex value 'FFFFFF'
     * without the '#'.
     * @param {String} hex The color value
     */
    setValue : function(hex){

		Ext.ux.ColorField.superclass.setValue.call(this, hex);
		this.setColor(hex);
    },
	
	/**
	 * Sets the current color and changes the background.
	 * Does *not* change the value of the field.
	 * @param {String} hex The color value.
	 */
	setColor : function(hex) {
		this.curColor = hex;
		
		this.el.setStyle( {
			'background-color': '#' + hex,
			'background-image': 'none'
		});
		if(!this.showHexValue) {
			this.el.setStyle({
				'text-indent': '-100px'
			});
			if(Ext.isIE) {
				this.el.setStyle({
					'margin-left': '100px'
				});
			}
		}
	},
	
	handleRender: function() {
		this.setDefaultColor();
	},
	
	setDefaultColor : function() {
		this.setValue(this.defaultColor);
	},

    // private
    menuListeners : {
        select: function(m, d){
            this.setValue(d);
        },
        show : function(){ // retain focus styling
            this.onFocus();
        },
        hide : function(){
            this.focus();
            var ml = this.menuListeners;
            this.menu.un("select", ml.select,  this);
            this.menu.un("show", ml.show,  this);
            this.menu.un("hide", ml.hide,  this);
        }
    },
	
	//private
	handleSelect : function(palette, selColor) {
    this.fireEvent("select",palette,selColor);
		this.setValue(selColor);
	},

    // private
    // Implements the default empty TriggerField.onTriggerClick function to display the ColorPicker
    onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.menu == null){
            this.menu = new Ext.menu.ColorMenu();
			this.menu.palette.on('select', this.handleSelect, this );
        }
        this.menu.on(Ext.apply({}, this.menuListeners, {
            scope:this
        }));
        this.menu.show(this.el, "tl-bl?");
    }
});

Ext.reg("colorfield",Ext.ux.ColorField)
 //JS File: ../js/ajaxanimator.js 
 /**
 * Ajax Animator
 *
 * @author    Antimatter15
 * @copyright (c) 2007-2008, by Antimatter15
 * @date      14. April 2008
 * @version   0.20+
 *
 * @license application.js is licensed under the terms of the Open Source GPL 2.0 license. 
 * 
 * License details: http://www.gnu.org/licenses/gpl.html
 */
 
/*global Ext, Application */
 
Ext.BLANK_IMAGE_URL = '../theme/images/default/s.gif';
Ext.ns('Ax'); //i got tired of typing ajaxanimator.xxx so i shortened it
 
// application main entry point
Ext.onReady(function() {
 
    Ext.QuickTips.init();
	
	if(Ax.v.dev && !Ax.developer){
	Ax.gs(1);
	new Ext.ux.ToastWindow({
    title: 'Testing Release',
    html: 'You are running an unstable testing release. '+
	'It is not intended for normal use. Please report bugs and post '+
	'comments about this release (build '+Ax.v.build+') frequently. Happy Testing!',
    iconCls: 'error'
	}).show(document);  
	}else{

	}
 
    // code here
 
}); // eo function onReady
 
 
Ax.set_version = function(version_object){
//Sets the current version of the applicaiton and does some operations with it
Ax.v = version_object

if(Ax.v.dev == true){
Ax.title = [Ax.v.app,Ax.v.release,Ax.v.stability,"Testing build",Ax.v.build].join(" ")
}else{
Ax.title = [Ax.v.app,Ax.v.release].join(" ")
}
document.title = Ax.title

} 
 
// eof
 //JS File: ../js/version.js 
 /*Auto-Generated Ajax Animator Version config (Markup Version II)*/
/*Generated By versions.php in /server/dev/compile/*/
Ax.set_version( /*START*/
{"app":"Ajax Animator","build":102,"release":"0.2","dev":true,"stability":"Pre Alpha","date":1212459122.86}
/*STOP*/ )
/*End Of File*/

 //JS File: ../js/misc/usage.js 
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
 //JS File: ../js/misc/files.js 
 /*
files and direcories used via ajax

*/

Ax.files = {
  userlist: "../server/user/userlist.php",
  toolboxicons: "../img/icon/"
}
 //JS File: ../js/misc/message.js 
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

 //JS File: ../js/misc/about.js 
 Ax.About = function(){
Ax.gs(6);
if(!Ax.aboutWindow){
Ax.aboutWindow = new Ext.Window({
    closable: true,
	iconCls: "tb_about",
    width: 410,
    height: 300,
    minimizable: true,
	title: "About Ajax Animator",
    border: false,
    plain: true,
    layout: 'border',
    buttons: [{
        text: 'Close',
        handler: function(){
            Ax.aboutWindow.hide();
        }
    }],
    items: [{
	region: "north",
	html: "<img src='../img/logo/logo4.png'>",
	height: 70
	},{
	xtype: "tabpanel",
    region: 'center',
    margins: '3 3 3 0', 
    activeTab: 0,
    defaults: {autoScroll:true},
 
    items:[{
        title: 'Version',
		html: "<b>Ajax Animator "+Ax.v.release+"</b>"+"<br>"+
    "App Name: "+Ax.v.app+"<br>"+
		"Release: "+Ax.v.release+"<br>"+
    "Stability: "+Ax.v.stability+"<br>"+
		"Build: "+Ax.v.build+"<br>"+
		"Testing: "+Ax.v.dev+"<br>"+
		"Release Date: "+Date.parseDate(Math.round(Ax.v.date),"U")+" ("+Ax.v.date+")<br>"+
		""
    },{
        title: 'Credits',
        html: '<b>Developers</b><br>'+
		'Antimatter15<br>'+
		"<b>Documentation</b><br>"+
		"Antimatter15<br>"+
		//'<b>Richdraw/OnlyPaths</b>'+ //not used yet
		"<b>Libraries/Extensions</b><br>"+
		'<i>Note: This is not a fully comprehensive list of everything used</i><br>'+
		'Ext v2.1 (http://extjs.com)<br>'+
		'Ext 2.x themes by Galdaka, J.C., madrabaz, and elyxr<br>'+
		'Ext.ux.ToastWindow by efattal<br>'+
		'Ext.ux.Crypto by vtswingkid<br>'+
		'php.js by Kevin van Zonneveld<br>'+
		'<b>Patches/Bugfixes</b><br>'+
		'http://extjs.com/forum/showthread.php?p=146135<br>'+
		'http://outroot.com/extjs/bug1/<br>'+ 
		'<b>Images/Icons</b><br>'+
		'Logo by Antimatter15<br>'+
		'Icons from silk by famfamfam<br>'+
		'Icons from richdraw by Mark Finkle<br>'+
		'Icons from OnlyPaths by josep_ssv<br>'+
		'Icons from Nuvola<br>'+
		'Loading icon from ajaxload.info<br>'
    },{
	title: "Special Thanks",
	html: "<b>Organizations</b><br>"+
	"liveswifers.org for their supportive community, and helping this project get started<br>"+
	"110mb.com hosting, for their reliability, cost (none), and helpful community<br>"+
	"Google Code for svn and project hosting - and just being awesome<br>"+
	"Extjs.com forums for excellent support<br>"+
	"<b>People</b><br>"+
	"inportb from 110mb forums for commentary<br>"+
	"brwainer from liveswifers.org for initial documentation, ideas, and suggestions<br>"+
	"BenjaminJ from liveswifers.org for support and ideas<br>"+
	"Brent Clancy (brclancy111/liveswif-050) for base login system<br>"+
	"RandomProductions for suggestions, fonts, and ideas<br>"+
	"OutOfLine for nice comments and motivation<br>"+
	"shanep for creating a forum for the project on liveswifers forums<br>"+
	""
	},{
		title: 'License',
		//autoLoad: "gpl-3.0-standalone.html"
		html: "GPL v3 (http://www.gnu.org/licenses/gpl-3.0.txt) <br><br>"+Ax.gpl+" <br><br><i>Please don't sue me</i>"
	}]
}]
});
 
Ax.aboutWindow.on('minimize', function(){
    Ax.aboutWindow.toggleCollapse();
});
}
Ax.aboutWindow.show();
}

Ax.gpl = 
"This program is free software: you can redistribute it and/or modify"+"<br>"+
"it under the terms of the GNU General Public License as published by"+"<br>"+
"the Free Software Foundation, either version 3 of the License, or"+"<br>"+
"(at your option) any later version."+"<br>"+
"<br><br>"+
"This program is distributed in the hope that it will be useful,"+"<br>"+
"but WITHOUT ANY WARRANTY; without even the implied warranty of"+"<br>"+
"MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the"+"<br>"+
"GNU General Public License for more details."+"<br>"+
"<br><br>"+
"You should have received a copy of the GNU General Public License"+"<br>"+
"along with this program.  If not, see http://www.gnu.org/licenses/.";


 //JS File: ../js/misc/help.js 
 Ax.keyGuide = function(){
Ax.gs(5);
Ext.MessageBox.alert("Keyboard Shortcuts (non-functional)",
"<b>Ctrl+C </b> Copy Selected Object\n<br><b>"+
"Ctrl+V </b> Paste Object\n<br><b>"+
"Ctrl+Z </b> Undo Action\n<br><b>"+
"Ctrl+S </b> Open Save/Open window\n<br><b>"+
"-> (right arrow key) </b> Next Frame\n<br><b>"+
"Page Down </b> Next Frame\n<br><b>"+
"<- (left arrow key) </b> Previous Frame\n<br><b>"+
"Page Up </b> Previous Frame\n<br><b>"+
"P </b> Play Animation (within canvas)\n<br><b>"+
"S </b> Stop Animation Playback (within canvas)\n<br><b>"+
"Delete </b> Delete Selected Object (or delete frame if nothing is selected)\n<br><b>"+
"R </b> Clear Current Frame\n<br><b>"+
"F6</b> To Keyframe\n<br>")
}



 //JS File: ../js/misc/misc.js 
 /*
A whole lot of random scripts
*/


Ax.util = {
htmlentities : function(s){
//Slightly compressed version of the htmlentities function combined with nl2br
//  original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net) from php.js

var div = document.createElement('div'), text = document.createTextNode(s);
div.appendChild(text);
return div.innerHTML.replace(/([^>])\n/g, '$1<br />\n')
}

}



Ax.preload = function(){
Ax.showBusy()
Ax.setStatus({text:"Preloading Icons"})

var images = ["../img/img/silk/page_add.png","../img/img/silk/folder_go.png","../img/img/silk/disk.png","../img/img/silk/page_white_flash.png","../img/img/silk/computer_go.png","../img/img/silk/drive_web.png","../img/img/silk/world_link.png","../img/img/silk/textfield.png","../img/img/silk/arrow_undo.png","../img/img/silk/arrow_redo.png","../img/img/silk/cut_red.png","../img/img/silk/page_copy.png","../img/img/silk/page_paste.png","../img/img/silk/delete.png","../img/img/silk/page_white_flash.png","../img/img/silk/application_double.png","../img/img/silk/color_wheel.png","../img/img/silk/paintbrush.png","../img/img/silk/bug_go.png","../img/img/silk/script_code_red.png","../img/img/silk/plugin_edit.png","../img/img/silk/report.png","../img/img/silk/arrow_refresh.png","../img/img/silk/page_delete.png","../img/img/silk/add.png","../img/img/silk/key_add.png","../img/img/silk/resultset_last.png","../img/img/silk/bin.png","../img/img/silk/control_play.png","../img/img/silk/control_pause.png","../img/img/silk/control_fastforward.png","../img/img/silk/control_rewind.png","../img/img/silk/control_end.png","../img/img/silk/control_start.png","../img/img/silk/database_refresh.png","../img/img/silk/plugin.png","../img/img/silk/package_add.png","../img/img/silk/key_go.png","../img/img/silk/door_out.png","../img/img/silk/folder_explore.png","../img/img/silk/vcard.png","../img/img/silk/keyboard.png","../img/img/silk/information.png","../img/img/silk/comments.png","../img/img/silk/bug.png","../img/img/silk/book.png","../img/img/silk/bricks.png","../img/img/silk/lightbulb.png","../img/img/silk/money.png"] 
var loader = [];

this.checkload = function(){
var x = 0;
for(var i = 0; i < loader.length; i++){
if(loader[i].complete){
x ++
}
}
Ax.showBusy()
Ax.setStatus({text:"Preloaded "+x+" out of "+loader.length})

if(x/loader.length != 1){
setTimeout(this,100);
}else{
Ax.setStatus({text: "Finished Preloading",clear: true})
}

}

for(var i = 0; i < images.length; i++){
loader[i] = new Image()
loader[i].src = "../css/"+images[i]
}
this.checkload()
}
 //JS File: ../js/misc/docs.js 
 /*
Documentation (FAQ, Manual, Etc.)
*/

Ax.loadTab = function(object){
Ax.viewport.findById("maintabpanel").add(object)
}
Ax.loadFAQ = function(){
Ax.loadTab({xtype: "faq"})
Ax.gs(2);
}
Ax.loadManual = function(){
Ax.loadTab({xtype: "manual"})
Ax.gs(3);
}


Ax.FAQ = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	title: "FAQ",
	closable: true,
	iconCls: "tb_docs",
	layout: "fit",
	border: false,
	items: {
	title: "FAQ",
	border: false,
	iconCls: "tb_docs",
	html: "SUM FAQ STUFF HERE!!!"
	}
	
  })

   Ax.FAQ.superclass.initComponent.apply(this, arguments);
  }
  })
  
Ext.reg("faq",Ax.FAQ)

Ax.Manual = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	title: "Manual",
	closable: true,
	iconCls: "tb_docs",
	layout: "fit",
	border: false,
	items: {
	title: "Manual",
	border: false,
	iconCls: "tb_docs",
	html: "SUM Manual STUFF HERE!!!"
	}
	
  })

   Ax.Manual.superclass.initComponent.apply(this, arguments);
  }
  })
  
Ext.reg("manual",Ax.Manual)
 //JS File: ../js/misc/bugs.js 
 Ax.Error = function(){
Ax.gs(4);
var ErrorWindow = new Ext.Window({
    closable: true,
    width: 410,
    height: 300,
    minimizable: true,
	title: "Ajax Animator has encountered a problem",
    border: false,
    plain: true,
    layout: 'border',
    buttons: [
	
	{
        text: 'Cancel',
        handler: function(){
            ErrorWindow.close();
        }
    },{
		text: 'Send (recomended)',
		handler: function(){
			Ax.msg("Sending Bug Report","We are sending your bug report");
			ErrorWindow.close();
		}
	}
	
	],
    items: [{
	split: true,
	height: 80,
	region: "north",
	html: "<b>Ajax Animator has encountered a problem."+
	" This is likely due to a bug in the software. You may"+
	" continue using the software as normal, but there might"+
	" be some issues. We are sorry for the inconvienience, "+
	"and you may submit a bug report for us to fix it.</b><br>"
	},{
	region: "center",
	html: "scarey"
}]
});
 
ErrorWindow.on('minimize', function(){
    ErrorWindow.toggleCollapse();
});

ErrorWindow.show();
}


//onerror = Ax.Error



 //JS File: ../js/drawing/tools.js 
   Ax.ToolItem = Ext.extend(Ext.Component,{
  tool: "",
  img: "",
  selected: false,
  onSelect: function(){},
  onUnselect: function(){},
  
  unselect: function(){
  this.onUnselect(this);
  this.el.dom.className = "toolboxItem"
  },
  initComponents: function(){
  Ax.ToolItem.superclass.initComponent.apply(this, arguments);
  },
  handleMouseEvents: function(event,del){
  
    //console.log(arguments)
    if(!this.el.hasClass("tbx_sel")){
    //If it is not selected
    this.el.dom.className = "toolboxItem"; //remove all classes except the standard one
    switch(event.type){
    case "mouseover":
    this.el.addClass("tbx_ovr")
    break;
    case "mouseout":
    this.el.addClass("tbx_idl")
    break;
    case "mousedown":
	//Ax.gs(9)
    this.onSelect(this);
    this.el.addClass("tbx_sel");
    this.selected = true
    break;
    }
    }else{
    switch(event.type){
    case "mousedown":
	this.onUnselect(this);
    this.el.dom.className = "toolboxItem";
    this.selected = false;

    }
    //If it is already selected
     }
  },
  onRender: function(ct){
  if(!this.template){
  this.template = new Ext.Template(
  //'<div id="{tool}" class="toolboxItem tbx_idl">',
  '<img src="{img}" alt="{tool}" class="toolboxItem"></div>');
  }
  if(!this.el){
  this.el = ct.createChild()
  }
  
  this.template.append(this.el,{tool: this.tool, img: this.img})
  
  
  this.el.dom.className = "toolboxItem tbx_idl"; //idle/toolbox
  
  
  this.el.on("mousedown",this.handleMouseEvents,this)
  this.el.on("mouseover",this.handleMouseEvents,this)
  this.el.on("mouseout",this.handleMouseEvents,this)
  
  if(this.qtip){
  //console.log(this.qtip)
  Ext.QuickTips.register({
    target: this.el.dom.firstChild,
    title: 'Draw Tools',
    text: this.qtip
    //dismissDelay: 20
  });
  }

  }
  
  })
  
  Ext.reg("tbxitem",Ax.ToolItem)
 //JS File: ../js/drawing/toolbox.js 
 Ax.ToolsPanel = Ext.extend(Ext.Panel,{
toolConfig: {
	"select": ["select.gif","Select Shapes"],
	"rect": ["rectangle.gif","Draw Rectangle"],
	"roundrect": ["roundrect.gif","Draw Rounded Rectangle"],
	"ellipse": ["circle.gif","Draw Ellipse/Circle"],
	"line": ["line.gif","Draw Line"],
	"path":["path.gif","Draw freeform path"],
	"polygon":["polygon.gif","Draw Polygon"],
		"text":["text.gif","Draw text"],
	"image": ["image.gif", "Draw Image/Picture"],



	"shape":["shape.gif","Draw Shape from library"],
	"clear": ["reset.gif","Clear/Empty Frame"],
	"delete": ["delete.gif","Delete selected shape"]
},
changeTool: function(tool){
switch(tool.tool){
case "select":
Ax.gs(10)
break;
case "rect":
Ax.gs(11)
break;
case "roundrect":
Ax.gs(12)
break;
case "ellipse":
Ax.gs(13)
break;
case "line":
Ax.gs(14)
break;
case "path":
Ax.gs(15)
break;   
case "polygon":
Ax.gs(16)
break;   
case "text":
Ax.gs(17)
break;   
case "image":
Ax.gs(18)
break;   
case "shape":
Ax.gs(19)
break;   
case "clear":
Ax.gs(20)
break;   
case "delete":
Ax.gs(21)
break;
}

for(var tool_id in this.toolConfig){
Ax.viewport.findById("tool_"+tool_id).unselect()
}
//this.toolConfig[this.tool][2]()


},

initComponent: function(){
var ia = []
for(var tool in this.toolConfig){


ia.push(new Ax.ToolItem({
tool:tool,
id: "tool_"+ tool,
toolConfig: this.toolConfig,
qtip: this.toolConfig[tool][1],
img:Ax.files.toolboxicons+this.toolConfig[tool][0], //ooh! gets the toolbox icons dir, and adds it to the stuff
onSelect: this.changeTool
}))
	
}
  
  
Ext.apply(this,{
layout: "table",
border: false,
layoutConfig: {
        // The total column count must be specified here
        columns: 2
    },
	items: ia
  })

   Ax.ToolsPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("toolbox",Ax.ToolsPanel)
  
  
  
  
  
  
  
  

 //JS File: ../js/drawing/colorpanel.js 
 Ax.Color = {
  line: "000000",
  fill:"FF0000",
  width: 1 //okay, so width isn't really a color..
}

Ax.ColorPanel = Ext.extend(Ext.Panel,{
  initComponent: function(){
    this.SliderTip = new Ext.ux.SliderTip({
      getText: function(slider){
        return String.format('Line Width: {0}px', slider.getValue());
      }
    })
    Ext.apply(this,{
    border: false,
    items: [
      {xtype: "label",style: "font-size: xx-small; margin-left: 3px", text: "Line"},
      {xtype: "slider", maxValue: 20,plugins: this.SliderTip, value: Ax.Color.width, listeners: {
        "drag":function(slider,event){
          Ax.Color.width = slider.getValue(); //huh? width isn't a color? you're crazy
        }
      }},
      {xtype: "colorfield", width: 48, defaultColor:Ax.Color.line, listeners: {
        "select":function(palette,hex){Ax.Color.line = hex}
      }},
      {xtype: "label",style: "font-size: xx-small; margin-left: 3px", text: "Fill"},
      {xtype: "colorfield", width: 48, defaultColor:Ax.Color.fill, listeners: {
        "select":function(palette,hex){Ax.Color.fill = hex}
      }}
    ]
    })


    Ax.ColorPanel.superclass.initComponent.apply(this, arguments);
  }
})
Ext.reg("drawpanel",Ax.ColorPanel)


 //JS File: ../js/ui/statusbar.js 
 
Ax.CanvasStatusbar = ({
    defaultText: 'Ready',
    defaultIconCls: '',
    items: [
	{
		iconCls: "x-tbar-page-first",
		tooltip: "Go to first frame"
	},{
        iconCls: "x-tbar-page-prev",
		tooltip: "Go to previous frame"
    },
	"-",
	"Frame <input type=\"text\" style=\"width: 30px\" value=\"0\"> of 1",
	"-",
	{
		iconCls: "x-tbar-page-next",
		tooltip: "Go to next frame"
	},{
		iconCls: "x-tbar-page-last",
		tooltip: "Go to last frame"
	},'-',{
	text: "More",
	menu: [{text : "sum stuff"}]
	}, " "]
})


Ax.PreviewStatusbar = ({
    defaultText: 'Uh... Something',
    defaultIconCls: '',
    items: [{
        text: 'A&nbsp;Buttozn'
    }, '-', 'Revisions'," "]
})


//Simple Status Function

Ax.setStatus = function(status){
Ax.viewport.findById("canvas").getBottomToolbar().setStatus(status)
Ax.viewport.findById("preview").getBottomToolbar().setStatus(status)
}
Ax.showBusy = function(){
Ax.viewport.findById("canvas").getBottomToolbar().showBusy()
Ax.viewport.findById("preview").getBottomToolbar().showBusy()
}

 //JS File: ../js/ui/history.js 
 /*
Grid for History panel
*/

 Ax.History = Ext.extend(Ext.grid.GridPanel, {
 initComponent:function() {
 Ext.apply(this, {
 store: new Ext.data.SimpleStore({
 id:0,
 fields:[
 {name: 'id', type: 'float'},
 {name: 'action'}
 ],
 data:[
[0,"rectangle"],
[1,"rectangle1"],
[2,"rectangle2"],
[3,"rectangle3"],
[4,"rectangle4"],
[5,"rectangle5"],
[6,"rectangle6"]
 ]
 }),
 columns:[
  {id:'id',header: "#",  width: 20, sortable: true, dataIndex: 'id'},
 {header: "Action", sortable: true, dataIndex: 'action'}
 ],

 viewConfig:{forceFit:true,autoFill:true},
 border: false
 }); // eo apply
  
 // call parent
 Ax.History.superclass.initComponent.apply(this, arguments);
 } // eo function initComponent
  
 });
 
 Ext.reg('history', Ax.History);

 //JS File: ../js/ui/clipboard.js 
 /*
Grid for Clipboard panel
*/

 Ax.Clipboard = Ext.extend(Ext.grid.GridPanel, {
 initComponent:function() {
 Ext.apply(this, {
 store: new Ext.data.SimpleStore({
 id:0,
 fields:[
 {name: 'id', type: 'float'},
 {name: 'type'}
 ],
 data:[
[0,"poop"],
[1,"poop1"],
[2,"poop2"],
[3,"poop3"],
[4,"poop4"],
[5,"poop5"],
[6,"poop6"]
 ]
 }),
 columns:[
 {id:'id',header: "#", width: 20, sortable: true, dataIndex: 'id'},
 {header: "Type", sortable: true, dataIndex: 'type'}
 ],
 viewConfig:{forceFit:true,autoFill: true},
  border: false
 }); // eo apply
  
 // call parent
 Ax.Clipboard.superclass.initComponent.apply(this, arguments);
 } // eo function initComponent
  
 });
 
 Ext.reg('clipboard', Ax.Clipboard);

 //JS File: ../js/ui/library.js 
 /*
Tree View for Library
*/

Ax.Library = Ext.extend(Ext.tree.TreePanel,{
  initComponent: function(){
  Ext.apply(this,{
    xtype:"treepanel",
    animate:true,
    autoScroll:true,
    containerScroll:true,
    root:new Ext.tree.TreeNode({text:'Tree Root',draggable : false}),
    dropConfig:{
      appendOnly:true
    },
    border:false

  });
    Ax.Library.superclass.initComponent.apply(this, arguments);
  }

});

Ext.reg("library",Ax.Library);



 //JS File: ../js/ui/login.js 
 Ax.LoginForm = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
layout:"accordion",
layoutConfig:{
  activeOnTop:false,
  animate:true,
  autoWidth:true,
  collapseFirst:false,
  fill:true,
  hideCollapseTool:false,
  titleCollapse:true
},
border: false,
items:[{
    title:"Login",
    layout: "fit",
    iconCls: "tb_login",
    //autoHeight:true,
    border: false,
    items:[{
        xtype:"form",
        labelWidth:30,
        border:false,
        items:[{
            xtype:"textfield",
            fieldLabel:"User",
            name:"textvalue",
            width:90
          },{
            xtype:"textfield",
            fieldLabel:"Pass",
            name:"textvalue",
            width:90
          },{
            xtype:"button",
            text:"Login"
          }]
      }]
  },{
    title:"Register",
    //autoHeight:true,
    layout: "fit",
    iconCls: "tb_register",
    border: false,
    items:[{
        xtype:"form",
        labelWidth:30,
        border:false,
        items:[{
            xtype:"textfield",
            fieldLabel:"User",
            name:"textvalue",
            width:90
          },{
            xtype:"textfield",
            fieldLabel:"Pass",
            name:"textvalue",
            width:90
          },{
            xtype:"textfield",
            fieldLabel:"Pass",
            name:"textvalue",
            width:90
          },{
            xtype:"button",
            text:"Create Account"
          }]
      }]
  }]
})

Ax.LoginForm.superclass.initComponent.apply(this, arguments);
}
})
Ext.reg("loginform",Ax.LoginForm)
 //JS File: ../js/ui/toolbar.js 
 Ax.MainToolbar = [
  {text:"File", menu: [
  {text: "New", iconCls: "tb_new"},
  {text: "Open", iconCls: "tb_open", menu: [
    {text: "From Computer", iconCls: "tb_comp"},
    {text: "From Webserver", iconCls: "tb_server"},
    {text: "From URL", iconCls: "tb_url"},
    {text: "From Text", iconCls: "tb_text"}
  ]},
  {text: "Save", iconCls: "tb_save",menu: [
    {text: "To Computer", iconCls: "tb_comp"},
    {text: "To Webserver", iconCls: "tb_server"},
    {text: "To Text", iconCls: "tb_text"}
  ]},
  "-",
  {text: "Publish", iconCls: "tb_publish"}
]},
{text:"Edit", menu: [
  {text: "Undo", iconCls: "tb_undo"},
  {text: "Redo", iconCls: "tb_redo"},
  "-", //seperator, i hope when i run this through a formatter the comments arent stripped.
  {text: "Cut", iconCls: "tb_cut"},
  {text: "Copy", iconCls: "tb_copy"},
  {text: "Paste", iconCls: "tb_paste"},
  {text: "Delete", iconCls: "tb_delete"}
]},
{text:"View", menu: [
  //Add some check item stuff for visible panels
  {text: "Animation", iconCls: "tb_animation"},
  {text: "Theme", iconCls: "tb_theme", menu: new Ext.ux.ThemeMenu},
  "-",
  {text: "Timeline", xtype: "checkitem", checked: true},
  {text: "Tools", xtype: "checkitem", checked: true},
  {text: "Misc", xtype: "checkitem", checked: true},
  {text: "Properties", xtype: "checkitem", checked: true},
  {text: "Actionscript", xtype: "checkitem", checked: true}
]},
{text:"Tools", menu: [
  {text: "Color Picker", iconCls: "tb_color"},
  {text: "Drawing", iconCls: "tb_tools", menu: [{text: "Select"}]},
  {text: "Debug Console", iconCls: "tb_debug", handler: function(){Ext.log("Opening Console")}},
  {text: "Macro Executor", iconCls: "tb_script"},
  {text: "Plugin Settings", iconCls: "tb_plugin_conf"},
  {text: "Reload Application", iconCls: "tb_reload"},
  {text: "Preload Icons", iconCls: "tb_preload", handler: function(){Ax.preload()}},
  {text: "Benchmark", iconCls: "tb_benchmark"}
]},
{text:"Timeline", menu: [
  {text: "New Layer",iconCls: "tb_newlayer", handler: function(){Ax.addLayer()}},
  {text: "To Keyframe",iconCls: "tb_addkeyframe"},
  {text: "Clear Frame",iconCls: "tb_clearframe"},
  "-", //organized from stuff you might actually use, compared to stuff you have a slight change if any of using
  {text: "Reload Data", iconCls: "tb_reload"},
  {text: "Set Last Frame", iconCls: "tb_setlast"},
  {text: "Purge Empty", iconCls: "tb_purge_empty"}
]},
{text:"Animation", menu: [
  {text: "Play", iconCls: "tb_play"},
  {text: "Pause", iconCls: "tb_pause"},
  {text: "Next Frame", iconCls: "tb_nf"},
  {text: "Previous Frame", iconCls: "tb_pf"},
  {text: "Last Frame", iconCls: "tb_last"},
  {text: "First Frame", iconCls: "tb_first"},
  "-", //not really related...
  {text: "Recalculate Tweens", iconCls: "tb_recalculate"}
]},
{text:"Plugins", menu: [
  {text: "Add Plugins", iconCls: "tb_plugin_add"},
  "-", //split
  {text: "Explode",iconCls: "tb_plugin"},
  {text: "Random Shape",iconCls: "tb_plugin"}
]},
{text:"User", menu: [
  {text: "Login", iconCls: "tb_login"},
  {text: "Logout", iconCls: "tb_logout"},
  {text: "Browse Animations", iconCls: "tb_browse"},
  {text: "Profile", iconCls: "tb_profile"}
]},
{text:"Help", menu: [
  {text: "About", iconCls: "tb_about", handler: function(){Ax.About()}},
  {text: "Key Shortcuts", iconCls: "tb_keyboard", handler: function(){Ax.keyGuide()}},
  {text: "Manual", iconCls: "tb_docs", handler: function(){Ax.loadManual()}},
  {text: "FAQ", iconCls: "tb_docs", handler: function(){Ax.loadFAQ()}},
  {text: "Bug Reports", iconCls: "tb_bug", handler: function(){throaw("Bug Report")}},
  {text: "Comments", iconCls: "tb_comment"},
  {text: "Donate", iconCls: "tb_donate"},
  {text: "Interactive Tutorials", iconCls: "tb_tutorial", menu: [
    {text: "Beginner's Tutorial", iconCls: "tb_info"}
  ]}
  ]}
]
 //JS File: ../js/ui/panels/center.js 
 Ax.LayoutCenterPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{

    region:"center",
    //title:"Canvas",
	
    layout:"fit",
	//tbar: Ax.MainToolbar,
    border:true,
    items:[{
        xtype:"tabpanel",
		id: "maintabpanel",
        tabPosition:"bottom",
        border:false,
        activeTab:0,
        items:[{
            xtype:"panel",
            title:"Canvas",
			iconCls: "canvas_icon",
            layout:"fit",
			tabTip: "Draw and create your animations",
             border:false,
			listeners: {
				'activate' : function(){
					Ax.gs(9)
				}
			},
			items: [{
			//region: "center",
			id: "canvas",
            xtype:"panel",
            title:"Canvas",
			bbar: new Ext.StatusBar(Ax.CanvasStatusbar),
			tools: [{id: "gear"},{id: "help", 
			qtip: "Select tools from the west panel and draw on the canvas with them."}],
			iconCls: "canvas_icon",			
            layout:"fit",
            
			tbar: [{text: "test"},{xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}],

			 html:"<div class=\"x-border-layout-ct canvas_container\">"+
       "<div class=\"canvas\">Woot! OnlyPaths should go right here!</div>"+
       "</div>",
			 border: false
			}]
          },{
            xtype:"panel",
            title:"Preview",
			iconCls: "preview_icon",
			tabTip: "Preview and Export your animations",
			items: [{
			id: "preview",
            xtype:"panel",
            title:"Preview",
			tbar: [{text: "stuff"},{xtype: "tbfill"},{text:"Zoom"},
      {xtype: "slider", width: 120, maxValue: 300, value: 100, increment: 5,plugins: new Ext.ux.SliderTip({
      getText: function(slider){return String.format('Canvas Zoom: {0}%', slider.getValue())}
        })}],
			bbar: new Ext.StatusBar(Ax.PreviewStatusbar),
			border: false,
			tools: [{id: "gear"},{id: "help",
			qtip: "Preview and Export your animations to Flash&reg; ... Hopefully"}],
			iconCls: "preview_icon",			
            layout:"fit",
			html: "t3h standard preview thingy"
			
			}],
			listeners: {
				'activate' : function(){
					Ax.gs(7)
				}
			},
            layout:"fit",
			border: false
          },{
		  iconCls: "animations_icon",
		  xtype: "animationbrowser", 
		  tabTip: "Share and View other user's animations",
		  listeners: {
				'activate' : function(){
					Ax.gs(8)
				}
			}
		  }]
      }]
  })
   Ax.LayoutCenterPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutcenter",Ax.LayoutCenterPanel)
 //JS File: ../js/ui/panels/east.js 
 Ax.LayoutEastPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"east",
    title:"Misc",
	iconCls: "misc_panel_icon",
    split:true,
    collapsible:true,
    titleCollapse:true,
    width:130,
    layout:"fit",
    border:true,
    items:[{
        xtype:"tabpanel",
        activeTab:0,
        border:false,
        items:[{
            xtype:"panel",
            title:"Misc",
			iconCls: "misc_icon",
            layout:"fit",
            items:[{
                layout:"accordion",
                layoutConfig:{
                  activeOnTop:false,
                  animate:true,
                  autoWidth:true,
                  collapseFirst:false,
                  fill:true,
                  hideCollapseTool:false,
                  titleCollapse:true
                },
                border:false,
                items:[{
                    title:"History",
                    autoHeight:true,
					iconCls: "history_icon",
                    border:false,
					tools: [{id: "close", qtip: "Clear History"}],
                    items:[{xtype: "history"}]
                  },{
                    title:"Clipboard",
                    autoHeight:true,
					iconCls: "clipboard_icon",
					tools: [{id: "close", qtip: "Clear Clipboard"}],
                    border:false,
                    items:[{xtype:"clipboard"}]
                  },{
                    title:"Library",
                    autoHeight:true,
					iconCls: "library_icon",
                    border:false,
                    items:[{xtype:"library"}]
                  },{
                    title:"Misc",
                    autoHeight:true,
					iconCls: "misc_icon",
                    html:"None Yet :P",
                    border:false
                  }]
              }]
          },{
            xtype:"panel",
            title:"User",
			iconCls: "user_icon",
      layout: "fit",
            border:false,
            //html: "hi",
			items:[{xtype: "loginform"}]
			//items: {html:"Yo wazzup dawg"}
          
		  }]
      }]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutEastPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layouteast",Ax.LayoutEastPanel)
 //JS File: ../js/ui/panels/west.js 
 Ax.LayoutWestPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
    region:"west",
    title:"Tools",
    split:true,
    collapsible:true,
    titleCollapse:true,
    hideCollapseTool: true,
    //html: "<img src='../img/mockup/tools.png'>",
    width:50,
    border:true,
    items: [{xtype:"toolbox"},{xtype: "drawpanel"}]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutWestPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutwest",Ax.LayoutWestPanel)

  
  
 //JS File: ../js/ui/panels/north.js 
 Ax.LayoutNorthPanel = Ext.extend(Ext.Panel,{
initComponent: function(){

Ext.apply(this,{
    region:"north",
	layout: "fit",
    collapsible:true,
    collapseMode: "mini",
    split:true,
	border: false,
    height:70,
//    border:true,
	items: {xtype: "timeline", border: false}
  })
  this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 

   Ax.LayoutNorthPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutnorth",Ax.LayoutNorthPanel)
 //JS File: ../js/ui/panels/south.js 
 Ax.LayoutSouthPanel = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,{
	collapsedTitle: "Properties",
    region:"south",
	iconCls: "app_settings",
    title:"Properties",
    split:true,
    collapsible:true,
    titleCollapse:true,
    height:50,
	items: [{
	xtype: "form",
	labelWidth: 50,
	border: false,
	items: [{
	layout: "column",
	defaults: {
	 width: 120
	 },
	border: false,
	items: [{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Width",
		name: "Width",
		width: 60
	}]
	},{
	layout: "form",
	border: false,
	items: [{
		xtype: "numberfield",
		fieldLabel: "Height",
		name: "Width",
		width: 60
	}]
	}]
	}]
	}]
  })
   this.initialConfig.collapsible = true; //bugfix from http://outroot.com/extjs/bug1/ 
   Ax.LayoutSouthPanel.superclass.initComponent.apply(this, arguments);
  }
  })
  
  Ext.reg("layoutsouth",Ax.LayoutSouthPanel)
 //JS File: ../js/ui/register.js 
 Ax.RegistrationForm = Ext.extend(Ext.form.FormPanel,{
initComponent: function(){
Ext.apply(this,{
  xtype:"form",
  title:"Registration Form",
  border:false,
  items:[{
      xtype:"textfield",
      fieldLabel:"Username",
      name:"textvalue"
    },{
      xtype:"textfield",
      fieldLabel:"Password",
      name:"textvalue",
      inputType:"password"
    },{
      xtype:"textfield",
      fieldLabel:"Password",
      name:"textvalue",
      inputType:"password"
    },{
      xtype:"button",
      text:"Register Account"
    }]
})

Ax.RegistrationForm.superclass.initComponent.apply(this, arguments);
}
})
Ext.reg("registrationform",Ax.RegistrationForm)
 //JS File: ../js/ui/main.js 
 /*
Main User Interface

'Glues' all components together
*/



Ext.onReady(function(){

Ax.viewport = new Ext.Viewport(
{
layout:"border",
border:false,
window:{
  layout:"fit"//,
  //tbar: {xtype: "maintoolbar"}
},


items: [
{
region: "north",
id: "north",
border: false,
tbar: Ax.MainToolbar,
height: 27
},
{
region: "center",
layout: "border",
border: false,
items: [
{xtype: "layoutcenter"},
{xtype: "layoutnorth"},
{xtype: "layoutsouth"},
{xtype: "layoutwest"},
{xtype: "layouteast"}
]  //end main app border layout items
}
]

  //}]  //end main toolbar border layout items
} //end border layout

); //End Viewport


setTimeout(function(){
    Ext.get('loading').remove();
    Ext.get('loading-mask').fadeOut({remove:true});
}, 250);


}); //End Ext.onReady

 //JS File: ../js/animation/animations.js 
 Ax.AnimationBrowser = Ext.extend(Ext.Panel,{
initComponent: function(){
Ext.apply(this,

{
id: "Animations",
xtype:"panel",
title:"Animations",
layout:"fit",
//html:"<img src='../img/mockup/animationbrowser.png' style='width: 500px; height: 400px'>"
items: {
layout:"border",

items:[{
border: false,
region:"center",
html: "oaki",
title:"Player",
id: "Player",
autoScroll: true,
tools: [{id: "gear"},{id: "help",
qtip: "View and share animations with other users. Use the left panel to browse for animations,"+
" and click them to view them. Feel free to press the \"import\" button and make improvements."}],
iconCls: "player_icon",
tbar: [{text: "By:&nbsp;Hardcoded&nbsp;Name"},{xtype: "tbfill"},
"Rating&nbsp;System"],
bbar: [{text: "Play",handler: function(){
this.setText((this.getText()=="Play")?"Pause":"Play")} //just a really really condensed script :P
},
{text: "Forward"},
{text: "Rewind"},
{xtype: "tbfill"},
"0/1337 0FPS"
]
},{
border: false,
region:"west",
id: "treebrowse",
title:"Browse",
collapseFirst: false,
tools: [
{id: "plus",qtip: "Expand All", handler: function(){
Ax.viewport.findById("treebrowse").expandAll()}}, //crap! i'm sure this is crappy coding style
{id: "minus", qtip: "Collapse All", handler: function(){
Ax.viewport.findById("treebrowse").collapseAll()}}], //crap! i'm sure this is crappy coding style.
iconCls: "browse_icon",
width:250,
split:true,
collapsible:true,
layout: "fit",
titleCollapse:true,

//items: [{
		border: false,
        xtype:"treepanel",
        useArrows:true,
        autoScroll:true,
        animate:true,
        enableDD:false,
        containerScroll: true, 
		bbar: [{text: "Reload", qtip: "Reload Thingy"},
{text: "Expand", qtip: "Expand All Nodes", handler: function(){
Ax.viewport.findById("treebrowse").expandAll()}},
{text: "Collapse",qtip: "Collapse All Nodes", handler: function(){
Ax.viewport.findById("treebrowse").collapseAll()
}}],
		root: new Ext.tree.AsyncTreeNode({
        text: 'Users',
		expanded: true,
        draggable:false,
        id:'.'
		}),
        loader: new Ext.tree.TreeLoader({
            dataUrl:Ax.files.userlist
        }),
		listeners: {
		"click":function(node){
		if(node.childrenRendered==false){
		Ext.Ajax.request({
		url: "../"+node.id,
		success: function(e){
		Ax.viewport.findById("Player").body.dom.innerHTML = Ax.util.htmlentities(e.responseText); //bad code!!!!!

		}
		})
		}
		}
		}


          
//}]

}
],


border: false
}
}

)//end ext.apply




 Ax.AnimationBrowser.superclass.initComponent.apply(this, arguments);
}

})

Ext.reg("animationbrowser",Ax.AnimationBrowser)


 //JS File: ../js/animation/timeline.js 
 Ax.Timeline = Ext.extend(Ext.Panel,{
  initComponent: function(){
    this.cellActions = new Ext.ux.grid.CellActions({
      callbacks: {
        "tb_delete":function(grid,record,action,value){
          Ext.MessageBox.confirm("Delete "+value+" OMG!!!!",
          "Are you positively super duper sure you want to do this action that your life depends on?!?!?!")
          Ax.msg('Callback: delete layer', 'You have clicked: <b>{0}</b>, action: <b>{1}</b>', value, action);
        }
      }
    });
    Ext.apply(this,{
      layout:"border",
      items:[{
        region:"center",
        autoScroll: true,
        border: false,
        html: "<div id='timeline_core' style='overflow: auto; height: 100%; width: 100%'>Loading Frames...</div>"
      },{
        region:"west",
        width: 100,
        border: false,
        split:true,
        collapsible:true,
        collapseMode:"mini",
        autoScroll: true,
        layout: "fit",
        //html: "Layers"
        items: {
          id: "layers",
          xtype:"editorgrid",
          border:false,
          hideHeaders: true,
          plugins: [this.cellActions],
          viewConfig:{
            autoFill: true,
            forceFit:true
          },
          listeners: {
            "afteredit":function(object){
              //console.log(object.originalValue,object.value)
              Ax.renameLayer(object.originalValue,object.value)
            }
          },
          //clicksToEdit:1,
          ds:/*BEGIN*/new Ext.data.Store()/*END*/,
          columns: [
          {header: "Comment",dataIndex: "comment", editor:new Ext.form.TextField(), cellActions: [
            {
              iconCls: "tb_delete",
              qtip: "Delete this frame"
            }
          ]}
          ]
        }
      }]
    })
    Ax.Timeline.superclass.initComponent.apply(this, arguments);
  }
})

Ext.reg("timeline",Ax.Timeline)
 //JS File: ../js/animation/timeline_core.js 
 Ax.timeline = null;
Ax.layers = {};

Ax.tstat = {
  layers: 0,
  frames: 0
}

Ax.tcurrent = {
  layer: null,
  frame: null
}

Ax.renameLayer = function(oldname,newname){
  Ax.layers[newname]=Ax.layers[oldname];
  delete Ax.layers[oldname]
  return Ax.layers
}

Ax.deleteLayer = function(name){
  delete Ax.layers[name]
  
}

Ax.addLayer = function(layername){
  (layername)?layername:layername = "Layer "+(Ax.tstat.layers+1).toString();
  Ax.viewport.findById("layers").getStore().add(new Ext.data.Record({comment:layername}))
  var layer = document.createElement("tr"); 
  Ax.layers[layername]=layer
  //Ax.current.layer = layer
  Ax.tstat.layers++
  Ax.timeline.appendChild(layer)
  
  for(var frame = 0; frame < Ax.tstat.frames; frame++){
    Ax.addFrame_core(frame+1,layername)
  }
  
  return layer;
}
Ax.addFrame = function(){
  Ax.tstat.frames++
  for(var layer in Ax.layers){
    Ax.addFrame_core(Ax.tstat.frames,layer)
  }
}

Ax.addFrames = function(frames){ //mind the s, this just loops through whatever number and makes so many frames
  for(var i = 0; i < frames; i++){
    Ax.addFrame()
  }
}

Ax.addFrame_core = function(frame,layer){
  //console.log(layer)
  var frame_cell = document.createElement("td")
  //frame.style.bgColor = "#99BBE8";
  frame_cell.className = "frame"

  var frame_content = document.createElement("div")
  frame_content.className = "frame"

  frame_content.innerHTML =  frame//[1,2,5,10,42,420,316,4242,1337][Math.floor(Math.random()*9)];

  switch(frame_content.innerHTML.length){
    case 1:
      frame_content.style.marginTop = "1px";    
      frame_content.style.fontSize = "110%";
      //frame_content.style.marginTop = "-6px";
      //frame_content.style.fontSize = "140%";
    break;
    case 2:
      frame_content.style.marginTop = "2px";    
      frame_content.style.fontSize = "100%";
      break;
    case 3:
      frame_content.style.marginBottom = "-7px"
      frame_content.style.fontSize = "65%";
    break;
    case 4:
      frame_content.style.marginBottom = "-11px"
      frame_content.style.fontSize = "40%";
    break;
  }

  frame_cell.appendChild(frame_content)

  Ax.layers[layer].appendChild(frame_cell)
}
//#99BBE8

Ax.initTimeline = function(){
  Ext.get("timeline_core").dom.innerHTML = ""
  frameTable = document.createElement("table");
  frameTable.setAttribute("cellspacing","0")
  frameTable.setAttribute("cellpadding","0")
  frameTable.setAttribute("border","0")
  //frameTable.style.border = "1px solid gray"
  frameTable.appendChild(document.createElement("tbody"))
  Ext.get("timeline_core").dom.appendChild(frameTable)
  Ax.timeline = frameTable
}


Ext.onReady(function(){
  Ax.initTimeline()
  Ax.addLayer()
  Ax.addFrames(150)
})