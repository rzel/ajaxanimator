/*
  Port of Unobtrusive Flash Objects (UFO) v3.22 <http://www.bobbyvandersluis.com/ufo/>
  Original work Copyright 2005-2007 Bobby van der Sluis
  This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
Ext.namespace('Ext.ux');

Ext.ux.UFO = {
    parameters : {
        // required list of parameters
        required: ['movie', 'width', 'height', 'majorversion', 'build']
        // optional list of parameters
      , optional: ['play', 'loop', 'menu', 'quality', 'scale', 'salign', 'wmode', 'bgcolor', 'base', 'flashvars', 'devicefont', 'allowscriptaccess', 'seamlesstabbing', 'allowfullscreen', 'allownetworking']
    }
    // optional list of attributes.
    , attributes: ['id', 'name', 'align']
    , optExc: ['swliveconnect']
    , expressinstall: {
          enabled: false
        , movie: 'ufo.swf'
        , width: 215
        , height: 138
      }
    , useragent: navigator.userAgent.toLowerCase()
    , pluginType: ''
    , version: [0, 0]
    , config: []
    , 
    // base method for creating the whole UFO mess
    init: function(id, config) {
      if (!Ext.ux.UFO.useragentHas('w3cdom') || Ext.ux.UFO.useragentHas('ieMac')) return;
      Ext.ux.UFO.version = Ext.ux.UFO.getFlashVersion(false);
      
      var xienabled = (config.expressinstall != 'undefined' && (typeof config.expressinstall == 'object' || config.expressinstall == 'true' || config.expressinstall == true));
      if(typeof config.expressinstall != 'object') {
          config.expressinstall = Ext.ux.UFO.expressinstall;
      }
      config.expressinstall.enabled = xienabled;
      if(config.expressinstall.enabled) {
        config.expressinstall.movie = (typeof config.expressinstall.movie == 'undefined') ? Ext.ux.UFO.expressinstall.movie : config.expressinstall.movie;
        config.expressinstall.width = (typeof config.expressinstall.width == 'undefined') ? Ext.ux.UFO.expressinstall.width : parseInt(config.expressinstall.width, 10);
        config.expressinstall.height = (typeof config.expressinstall.height == 'undefined') ? Ext.ux.UFO.expressinstall.height : parseInt(config.expressinstall.height, 10);
      }
      config.written = false;
      config.majorversion = (config.majorversion) ? parseInt(config.majorversion, 10) : 0;
      config.build = (config.build) ? parseInt(config.build, 10) : 0;
      config.setcontainercss = (typeof config.setcontainercss != 'undefined' && (config.setcontainercss == 'true' || config.setcontainercss == true)) ? true : false;
      
      Ext.ux.UFO.config[id] = config;
  
      Ext.util.CSS.createStyleSheet('#' + id + ' { visibility: hidden; }');
      Ext.onReady(function() {
          var config = Ext.ux.UFO.config[id];
          if(config.written) {
              return;
          }
          Ext.ux.UFO.config[id].written = true;
          Ext.get(id).setStyle('visibility', 'hidden');
          var hasRequired = true;
          // method to ensure that the config has all the required parameters set
          Ext.each(Ext.ux.UFO.parameters.required, function(item, index, array) {
              if(typeof Ext.ux.UFO.config[id][item] == 'undefined') {
                  hasRequired = false;
              }
          });
          if(hasRequired) {
              if(Ext.ux.UFO.hasFlashVersion(config.majorversion, config.build)) {
                  if(config.setcontainercss) {
                      // manipulate CSS of the containing element for the movie
                      var unitsWidth = /%/.test(config.width) ? '' : 'px';
                      var unitsHeight = /%/.test(config.height) ? '' : 'px';
                      var styles = ['#' + id + ' { width: ' + (config.width + unitsWidth) + '; height: ' + (config.height + unitsHeight) + '; }' ];
                      if (config.width == '100%') {
                          styles.push('body { margin-left:0; margin-right:0; padding-left:0; padding-right:0; }');
                      }
                      if (config.height == '100%') {
                          styles.push('html{ height:100%; overflow:hidden; }');
                          styles.push('body { margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0; height:100%; }');
                      }
                      console.log(styles);
                      Ext.util.CSS.createStyleSheet(styles.join(''));
                  }
                  Ext.ux.UFO.writeSWF(id);
              }
              else if(config.expressinstall.enabled && Ext.ux.UFO.hasFlashVersion(6, 65)) {
                  // open the update/download dialog
                  var styles = [
                      'html { height: 100%; overflow: hidden; }'
                    , 'body { height: 100%; overflow: hidden; }'
                    , '#xi-con { position: absolute; left: 0; top: 0; z-index: 1000; width: 100%; height: 100%; background-color: #fff; filter: alpha(opacity:75); opacity: 0.75; }'
                    , '#xi-dia { position: absolute; left: 50%; top: 50%; margin-left: -' + Math.round(config.expressinstall.width / 2) + 'px; margin-top: -' + Math.round(config.expressinstall.height / 2) + 'px; width: ' + config.expressinstall.width + 'px; height: ' + config.expressinstall.height + 'px; }'
                  ]
                      console.log(styles);
                  Ext.util.CSS.createStyleSheet(styles.join(''));
                  Ext.getBody().createChild({
                      tag: 'div'
                    , id: 'xi-con'
                    , children: [{
                          tag: 'div'
                        , id: 'xi-dia'
                      }]
                  });
                  var _mmu = window.location;
                  if(Ext.ux.UFO.useragentHas('xml') && Ext.ux.UFO.useragentHas('safari')) {
                      var _mmd = document.getElementsByTagName('title')[0].firstChild.nodeValue = document.getElementsByTagName('title')[0].firstChild.nodeValue.slice(0, 47) + ' - Flash Player Installation';
                  } else {
                      var _mmd = document.title = document.title.slice(0, 47) + ' - Flash Player Installation';
                  }
                  var type = (Ext.ux.UFO.pluginType == 'ax') ? 'ActiveX' : 'PlugIn';
                  var _uc = (typeof config.expressinstall.cancelurl != 'undefined') ? '&xiUrlCancel=' + config.expressinstall.cancelurl : '';
                  var _uf = (typeof config.expressinstall.failedurl != 'undefined') ? '&xiUrlFailed=' + config.expressinstall.failedurl : '';

                  Ext.ux.UFO.config['xi-dia'] = {
                      movie: config.expressinstall.movie
                    , width: config.expressinstall.width
                    , height: config.expressinstall.height
                    , majorversion: 6
                    , build: 65
                    , flashvars: 'MMredirectURL=' + _mmu + '&MMplayerType=' + type + '&MMdoctitle=' + _mmd + _uc + _uf
                  };
                  Ext.ux.UFO.writeSWF('xi-dia');
              }
          }
          Ext.get(id).setStyle('visibility', 'visible');
      });
    },
  
    // detect various capabilities, user agents, etc.
    useragentHas: function(functionality) {
      var useragent = Ext.ux.UFO.useragent;
      switch(functionality) {
        case 'w3cdom':
          return (typeof document.getElementById != 'undefined' && typeof document.getElementsByTagName != 'undefined' && (typeof document.createElement != 'undefined' || typeof document.createElementNS != 'undefined'));
        case 'xml':
          var meta = Ext.select('meta');
          Ext.each(meta, function(item, index, array) {
              if(/content-type/i.test(item.httpEquiv) && /xml/i.test(item.content)) {
                  return true;
              }
          });
          return false;
        case 'ieMac':
          return Ext.isIE && Ext.isMac;
        case 'ieWin':
          return Ext.isIE && Ext.isWindows;
        case 'gecko':
          return Ext.isGecko;
        case 'opera':
          return Ext.isOpera;
        case 'safari':
          return Ext.isSafari;
        default:
          return false;
      }
    },
    
    // does what the method says
    getFlashVersion: function() {
        var returnValue = [null, null];
        var override = (arguments.length == 1) ? arguments[0] : true;
        if(Ext.ux.UFO.version[0] != 0 && !override) return;
        if(navigator.plugins && typeof navigator.plugins['Shockwave Flash'] == 'object') {
            Ext.ux.UFO.pluginType = 'npapi';
            var description = navigator.plugins['Shockwave Flash'].description;
            if (typeof description != 'undefined') {
                description = description.replace(/^.*\s+(\S+\s+\S+$)/, '$1');
                returnValue = [
                    parseInt(description.replace(/^(.*)\..*$/, '$1'), 10)
                  , /r/.test(description) ? parseInt(description.replace(/^.*r(.*)$/, '$1'), 10) : 0
                ];
            }
        }
        else if(window.ActiveXObject) {
            Ext.ux.UFO.pluginType = 'ax';
            try { // avoid fp 6 crashes
                var activeX = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
            }
            catch(e) {
                try { 
                    var activeX = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                    returnValue = [6, 0];
                    activeX.AllowScriptAccess = 'always'; // throws if fp < 6.47 
                }
                catch(e) {
                    if(returnValue[0] == 6) {
                        return;
                    }
                }
                try {
                    var activeX = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                }
                catch(e) {}
            }
            if (typeof activeX == 'object') {
                var description = activeX.GetVariable('$version'); // bugs in fp 6.21/6.23
                if (typeof description != 'undefined') {
                    description = description.replace(/^\S+\s+(.*)$/, '$1').split(',');
                    returnValue = [
                        parseInt(description[0], 10)
                      , parseInt(description[2], 10)
                    ];
                }
            }
        }
        return returnValue;
    },
    
    // determine if the current install of flash passes a particular major (and, optionally, minor) version test.
    hasFlashVersion: function(major, release) {
        return (Ext.ux.UFO.version[0] > major || (Ext.ux.UFO.version[0] == major && Ext.ux.UFO.version[1] >= release));
    },
  
    // final function that's called to write the flash object to the DOM.
    writeSWF: function(id) {
        var config = Ext.ux.UFO.config[id];
        var element = Ext.get(id);
        var objectConfig = null;
        switch(Ext.ux.UFO.pluginType)
        {
          case 'npapi':
          {
            if(Ext.ux.UFO.useragentHas('gecko') || Ext.ux.UFO.useragentHas('xml')) {
                objectConfig = {
                    tag: 'object'
                  , type: 'application/x-shockwave-flash'
                  , data: config.movie
                  , width: config.width
                  , height: config.height
                  , children: []
                };
                Ext.each(Ext.ux.UFO.attributes, function(item, index, array) {
                    if(typeof config[item] != 'undefined') {
                        objectConfig[item] = config[item];
                    }
                });
                
                var _o = Ext.ux.UFO.parameters.optional.concat(Ext.ux.UFO.optExc);
                Ext.each(_o, function(item, index, array) {
                    if(typeof config[item] != 'undefined') {
                        objectConfig.children.push({
                            tag: 'param'
                          , name: item
                          , value: config[item]
                        });
                    }
                });
            } else {
                objectConfig = {
                    tag: 'embed'
                  , type: 'application/x-shockwave-flash'
                  , src: config.movie
                  , width: config.width
                  , height: config.height
                  , pluginspage: 'http://www.macromedia.com/go/getflashplayer'
                };
                var _o = Ext.ux.UFO.parameters.optional.concat(Ext.ux.UFO.attributes).concat(Ext.ux.UFO.optExc);
                Ext.each(_o, function(item, index, array) {
                    if(typeof config[item] != 'undefined') {
                        embedConfig[item] = config[item];
                    }
                });
            }
            break;
          }
          case 'ax':
          {
            objectConfig = {
                tag: 'object'
              , classid: 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
              , data: config.movie
              , width: config.width
              , height: config.height
              , codebase: 'http' + ((Ext.isSecure) ? 's' : '') + '://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + config.majorversion + ',0,' + config.build + ',0'
              , children: [{
                    tag: 'param'
                  , name: 'movie'
                  , value: config.movie
                }]
            };
            Ext.each(Ext.ux.UFO.attributes, function(item, index, array) {
                if(typeof config[item] != 'undefined') {
                    objectConfig[item] = config[item];
                }
            });
            
            var _o = Ext.ux.UFO.parameters.optional.concat(Ext.ux.UFO.optExc);
            Ext.each(_o, function(item, index, array) {
                if(typeof config[item] != 'undefined') {
                    objectConfig.children.push({
                        tag: 'param'
                      , name: item
                      , value: config[item]
                    });
                }
            });
            break;
          }
        }
        
        if(objectConfig) {
            element.update('');
            element.createChild(objectConfig);
        }
    },
      
    // do something dandy when the install/update is complete
    expressInstallCallback: function() {
        Ext.get('xi-con').remove();
        Ext.util.CSS.createStyleSheet('html, body { height: auto; overflow: auto; }');
    },
  
    // again, does what the method says
    cleanupIELeaks: function() {
        Ext.each(Ext.query('object'), function(item, index) {
            item.style.display = 'none';
            for (var x in item) {
                if (typeof item[x] == 'function') {
                    item[x] = null;
                }
            }
        });
    },
    cleanupFP9IELeaks: function() {
        __flash_unloadHandler = function() {};
        __flash_savedUnloadHandler = function() {};
    }
};

// attaches a listener to do some auto garbage collection of events.  perhaps could be more appropriately handled with Ext.
if(Ext.isIE && Ext.isWindows) {
    window.attachEvent('onunload', Ext.ux.UFO.cleanupIELeaks);
    if(Ext.ux.UFO.getFlashVersion()[0] == 9) {
        window.attachEvent('onbeforeunload', Ext.ux.UFO.cleanupFP9IELeaks);
    }
}

// make the expressInstallCallback method available with the signature the SWF expects to be able to call
expressInstallCallback =  Ext.ux.UFO.expressInstallCallback;