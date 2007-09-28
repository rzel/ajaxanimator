/*  Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/


//Notice: This is a highly compressed version of prototype, to support the richdraw editor: part of the ajax animator source

function $A (iterable) {
	var nArray = [];
	for (var i = 0; i < iterable.length; i++) nArray.push(iterable[i]);
	return nArray;
};

function $() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;

	function get$(el){
		if (typeof el == 'string') el = document.getElementById(el);
		return el;
	}
};

Object.e = function(destination, source) {
	for (var property in source) destination[property] = source[property];
	return destination;
};


if (!window.Event) {
  var Event = new Object();
}

Object.e(Event, {

  element: function(event) {
    return $(event.target || event.srcElement);
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },
  observers: false,
  
  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },


  observe: function(element, name, observer, useCapture) {
    element = $(element);
    if (name == 'keypress' &&
      (Prototype.Browser.WebKit || element.attachEvent))
      name = 'keydown';

    Event._observeAndCache(element, name, observer, false);
  },

  stopObserving: function(element, name, observer, useCapture) {
    element = $(element);
    if (name == 'keypress' &&
        (Prototype.Browser.WebKit || element.attachEvent))
      name = 'keydown';

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, false);
    } else if (element.detachEvent) {
      try {
        element.detachEvent('on' + name, observer);
      } catch (e) {}
    }
  }
});

Function.prototype.bindAsEventListener = function(object) {
  var __method = this, args = $A(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [event || window.event].concat(args));
  }
}

var Position = {

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (navigator.userAgent.indexOf('AppleWebKit/') > -1) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
}