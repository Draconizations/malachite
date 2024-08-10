(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var lib$9 = {exports: {}};

	function _instanceof$c(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	var ArrayProto = Array.prototype;
	var ObjProto = Object.prototype;
	var escapeMap = {
	    '&': '&amp;',
	    '"': '&quot;',
	    '\'': '&#39;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '\\': '&#92;'
	};
	var escapeRegex = /[&"'<>\\]/g;
	var _exports$1 = lib$9.exports = {};
	function hasOwnProp(obj, k) {
	    return ObjProto.hasOwnProperty.call(obj, k);
	}
	_exports$1.hasOwnProp = hasOwnProp;
	function lookupEscape(ch) {
	    return escapeMap[ch];
	}
	function _prettifyError$1(path, withInternals, err) {
	    if (!err.Update) {
	        // not one of ours, cast it
	        err = new _exports$1.TemplateError(err);
	    }
	    err.Update(path);
	    // Unless they marked the dev flag, show them a trace from here
	    if (!withInternals) {
	        var old = err;
	        err = new Error(old.message);
	        err.name = old.name;
	    }
	    return err;
	}
	_exports$1._prettifyError = _prettifyError$1;
	function TemplateError$1(message, lineno, colno) {
	    var err;
	    var cause;
	    if (_instanceof$c(message, Error)) {
	        cause = message;
	        message = cause.name + ": " + cause.message;
	    }
	    if (Object.setPrototypeOf) {
	        err = new Error(message);
	        Object.setPrototypeOf(err, TemplateError$1.prototype);
	    } else {
	        err = this;
	        Object.defineProperty(err, 'message', {
	            enumerable: false,
	            writable: true,
	            value: message
	        });
	    }
	    Object.defineProperty(err, 'name', {
	        value: 'Template render error'
	    });
	    if (Error.captureStackTrace) {
	        Error.captureStackTrace(err, this.constructor);
	    }
	    var getStack;
	    if (cause) {
	        var stackDescriptor = Object.getOwnPropertyDescriptor(cause, 'stack');
	        getStack = stackDescriptor && (stackDescriptor.get || function() {
	            return stackDescriptor.value;
	        });
	        if (!getStack) {
	            getStack = function getStack() {
	                return cause.stack;
	            };
	        }
	    } else {
	        var stack = new Error(message).stack;
	        getStack = function getStack() {
	            return stack;
	        };
	    }
	    Object.defineProperty(err, 'stack', {
	        get: function get() {
	            return getStack.call(err);
	        }
	    });
	    Object.defineProperty(err, 'cause', {
	        value: cause
	    });
	    err.lineno = lineno;
	    err.colno = colno;
	    err.firstUpdate = true;
	    err.Update = function Update(path) {
	        var msg = '(' + (path || 'unknown path') + ')';
	        // only show lineno + colno next to path of template
	        // where error occurred
	        if (this.firstUpdate) {
	            if (this.lineno && this.colno) {
	                msg += " [Line " + this.lineno + ", Column " + this.colno + "]";
	            } else if (this.lineno) {
	                msg += " [Line " + this.lineno + "]";
	            }
	        }
	        msg += '\n ';
	        if (this.firstUpdate) {
	            msg += ' ';
	        }
	        this.message = msg + (this.message || '');
	        this.firstUpdate = false;
	        return this;
	    };
	    return err;
	}
	if (Object.setPrototypeOf) {
	    Object.setPrototypeOf(TemplateError$1.prototype, Error.prototype);
	} else {
	    TemplateError$1.prototype = Object.create(Error.prototype, {
	        constructor: {
	            value: TemplateError$1
	        }
	    });
	}
	_exports$1.TemplateError = TemplateError$1;
	function escape$2(val) {
	    return val.replace(escapeRegex, lookupEscape);
	}
	_exports$1.escape = escape$2;
	function isFunction$1(obj) {
	    return ObjProto.toString.call(obj) === '[object Function]';
	}
	_exports$1.isFunction = isFunction$1;
	function isArray(obj) {
	    return ObjProto.toString.call(obj) === '[object Array]';
	}
	_exports$1.isArray = isArray;
	function isString$2(obj) {
	    return ObjProto.toString.call(obj) === '[object String]';
	}
	_exports$1.isString = isString$2;
	function isObject$1(obj) {
	    return ObjProto.toString.call(obj) === '[object Object]';
	}
	_exports$1.isObject = isObject$1;
	/**
	 * @param {string|number} attr
	 * @returns {(string|number)[]}
	 * @private
	 */ function _prepareAttributeParts(attr) {
	    if (!attr) {
	        return [];
	    }
	    if (typeof attr === 'string') {
	        return attr.split('.');
	    }
	    return [
	        attr
	    ];
	}
	/**
	 * @param {string}   attribute      Attribute value. Dots allowed.
	 * @returns {function(Object): *}
	 */ function getAttrGetter(attribute) {
	    var parts = _prepareAttributeParts(attribute);
	    return function attrGetter(item) {
	        var _item = item;
	        for(var i = 0; i < parts.length; i++){
	            var part = parts[i];
	            // If item is not an object, and we still got parts to handle, it means
	            // that something goes wrong. Just roll out to undefined in that case.
	            if (hasOwnProp(_item, part)) {
	                _item = _item[part];
	            } else {
	                return undefined;
	            }
	        }
	        return _item;
	    };
	}
	_exports$1.getAttrGetter = getAttrGetter;
	function groupBy(obj, val, throwOnUndefined) {
	    var result = {};
	    var iterator = isFunction$1(val) ? val : getAttrGetter(val);
	    for(var i = 0; i < obj.length; i++){
	        var value = obj[i];
	        var key = iterator(value, i);
	        if (key === undefined && throwOnUndefined === true) {
	            throw new TypeError("groupby: attribute \"" + val + "\" resolved to undefined");
	        }
	        (result[key] || (result[key] = [])).push(value);
	    }
	    return result;
	}
	_exports$1.groupBy = groupBy;
	function toArray(obj) {
	    return Array.prototype.slice.call(obj);
	}
	_exports$1.toArray = toArray;
	function without(array) {
	    var result = [];
	    if (!array) {
	        return result;
	    }
	    var length = array.length;
	    var contains = toArray(arguments).slice(1);
	    var index = -1;
	    while(++index < length){
	        if (indexOf(contains, array[index]) === -1) {
	            result.push(array[index]);
	        }
	    }
	    return result;
	}
	_exports$1.without = without;
	function repeat(char_, n) {
	    var str = '';
	    for(var i = 0; i < n; i++){
	        str += char_;
	    }
	    return str;
	}
	_exports$1.repeat = repeat;
	function each(obj, func, context) {
	    if (obj == null) {
	        return;
	    }
	    if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
	        obj.forEach(func, context);
	    } else if (obj.length === +obj.length) {
	        for(var i = 0, l = obj.length; i < l; i++){
	            func.call(context, obj[i], i, obj);
	        }
	    }
	}
	_exports$1.each = each;
	function map$1(obj, func) {
	    var results = [];
	    if (obj == null) {
	        return results;
	    }
	    if (ArrayProto.map && obj.map === ArrayProto.map) {
	        return obj.map(func);
	    }
	    for(var i = 0; i < obj.length; i++){
	        results[results.length] = func(obj[i], i);
	    }
	    if (obj.length === +obj.length) {
	        results.length = obj.length;
	    }
	    return results;
	}
	_exports$1.map = map$1;
	function asyncIter(arr, iter, cb) {
	    var i = -1;
	    function next() {
	        i++;
	        if (i < arr.length) {
	            iter(arr[i], i, next, cb);
	        } else {
	            cb();
	        }
	    }
	    next();
	}
	_exports$1.asyncIter = asyncIter;
	function asyncFor(obj, iter, cb) {
	    var keys = keys_(obj || {});
	    var len = keys.length;
	    var i = -1;
	    function next() {
	        i++;
	        var k = keys[i];
	        if (i < len) {
	            iter(k, obj[k], i, len, next);
	        } else {
	            cb();
	        }
	    }
	    next();
	}
	_exports$1.asyncFor = asyncFor;
	function indexOf(arr, searchElement, fromIndex) {
	    return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
	}
	_exports$1.indexOf = indexOf;
	function keys_(obj) {
	    /* eslint-disable no-restricted-syntax */ var arr = [];
	    for(var k in obj){
	        if (hasOwnProp(obj, k)) {
	            arr.push(k);
	        }
	    }
	    return arr;
	}
	_exports$1.keys = keys_;
	function _entries(obj) {
	    return keys_(obj).map(function(k) {
	        return [
	            k,
	            obj[k]
	        ];
	    });
	}
	_exports$1._entries = _entries;
	function _values(obj) {
	    return keys_(obj).map(function(k) {
	        return obj[k];
	    });
	}
	_exports$1._values = _values;
	function extend(obj1, obj2) {
	    obj1 = obj1 || {};
	    keys_(obj2).forEach(function(k) {
	        obj1[k] = obj2[k];
	    });
	    return obj1;
	}
	_exports$1._assign = _exports$1.extend = extend;
	function inOperator(key, val) {
	    if (isArray(val) || isString$2(val)) {
	        return val.indexOf(key) !== -1;
	    } else if (isObject$1(val)) {
	        return key in val;
	    }
	    throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
	}
	_exports$1.inOperator = inOperator;
	var libExports = lib$9.exports;

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue$1 = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue$1 = currentQueue.concat(queue$1);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue$1.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue$1.length;
	    while(len) {
	        currentQueue = queue$1;
	        queue$1 = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue$1.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue$1.push(new Item(fun, args));
	    if (queue$1.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title$1 = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version$1 = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config$1 = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var browser$1 = {
	  nextTick: nextTick,
	  title: title$1,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version$1,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config$1,
	  uptime: uptime
	};

	var domain$1;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);

	function EventEmitter$1() {
	  EventEmitter$1.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter$1.EventEmitter = EventEmitter$1;

	EventEmitter$1.usingDomains = false;

	EventEmitter$1.prototype.domain = undefined;
	EventEmitter$1.prototype._events = undefined;
	EventEmitter$1.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter$1.defaultMaxListeners = 10;

	EventEmitter$1.init = function() {
	  this.domain = null;
	  if (EventEmitter$1.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain$1.active) ;
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter$1.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n))
	    throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter$1.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter$1.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn)
	    handler.call(self);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self);
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn)
	    handler.call(self, arg1);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1);
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn)
	    handler.call(self, arg1, arg2);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2);
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn)
	    handler.call(self, arg1, arg2, arg3);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn)
	    handler.apply(self, args);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].apply(self, args);
	  }
	}

	EventEmitter$1.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = (type === 'error');

	  events = this._events;
	  if (events)
	    doError = (doError && events.error == null);
	  else if (!doError)
	    return false;

	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er)
	        er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }
	    return false;
	  }

	  handler = events[type];

	  if (!handler)
	    return false;

	  var isFn = typeof handler === 'function';
	  len = arguments.length;
	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;
	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;
	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;
	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower
	    default:
	      args = new Array(len - 1);
	      for (i = 1; i < len; i++)
	        args[i - 1] = arguments[i];
	      emitMany(handler, isFn, this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');

	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] :
	                                          [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' +
	                            existing.length + ' ' + type + ' listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}
	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}
	EventEmitter$1.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;

	EventEmitter$1.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function _onceWrap(target, type, listener) {
	  var fired = false;
	  function g() {
	    target.removeListener(type, g);
	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }
	  g.listener = listener;
	  return g;
	}

	EventEmitter$1.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter$1.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter$1.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');

	      events = this._events;
	      if (!events)
	        return this;

	      list = events[type];
	      if (!list)
	        return this;

	      if (list === listener || (list.listener && list.listener === listener)) {
	        if (--this._eventsCount === 0)
	          this._events = new EventHandlers();
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length; i-- > 0;) {
	          if (list[i] === listener ||
	              (list[i].listener && list[i].listener === listener)) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (list.length === 1) {
	          list[0] = undefined;
	          if (--this._eventsCount === 0) {
	            this._events = new EventHandlers();
	            return this;
	          } else {
	            delete events[type];
	          }
	        } else {
	          spliceOne(list, position);
	        }

	        if (events.removeListener)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };
	    
	// Alias for removeListener added in NodeJS 10.0
	// https://nodejs.org/api/events.html#events_emitter_off_eventname_listener
	EventEmitter$1.prototype.off = function(type, listener){
	    return this.removeListener(type, listener);
	};

	EventEmitter$1.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events;

	      events = this._events;
	      if (!events)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (!events.removeListener) {
	        if (arguments.length === 0) {
	          this._events = new EventHandlers();
	          this._eventsCount = 0;
	        } else if (events[type]) {
	          if (--this._eventsCount === 0)
	            this._events = new EventHandlers();
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        for (var i = 0, key; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = new EventHandlers();
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners) {
	        // LIFO order
	        do {
	          this.removeListener(type, listeners[listeners.length - 1]);
	        } while (listeners[0]);
	      }

	      return this;
	    };

	EventEmitter$1.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;

	  if (!events)
	    ret = [];
	  else {
	    evlistener = events[type];
	    if (!evlistener)
	      ret = [];
	    else if (typeof evlistener === 'function')
	      ret = [evlistener.listener || evlistener];
	    else
	      ret = unwrapListeners(evlistener);
	  }

	  return ret;
	};

	EventEmitter$1.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter$1.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter$1.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
	    list[i] = list[k];
	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--)
	    copy[i] = arr[i];
	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	var _polyfillNode_events = /*#__PURE__*/Object.freeze({
		__proto__: null,
		EventEmitter: EventEmitter$1,
		default: EventEmitter$1
	});

	var inherits;
	if (typeof Object.create === 'function'){
	  inherits = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

	/*
	<!-- LICENSEFILE/ -->

	<h1>License</h1>

	Unless stated otherwise all works are:

	<ul><li>Copyright &copy; 2013+ <a href="http://bevry.me">Bevry Pty Ltd</a></li></ul>

	and licensed under:

	<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

	<h2>MIT License</h2>

	<pre>
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	</pre>

	<!-- /LICENSEFILE -->
	*/
	/*
	modified by Calvin Metcalf to adhere to how the node one works a little better
	*/
	inherits(Domain, EventEmitter$1);
	function createEmitError(d) {
	  return emitError;
	  function emitError(e) {
	    d.emit('error', e);
	  }
	}

	function Domain() {
	  EventEmitter$1.call(this);
	  this.__emitError = createEmitError(this);
	}
	Domain.prototype.add = function (emitter) {
	  emitter.on('error', this.__emitError);
	};
	Domain.prototype.remove = function(emitter) {
	  emitter.removeListener('error', this.__emitError);
	};
	Domain.prototype.bind = function(fn) {
	  var emitError = this.__emitError;
	  return function() {
	    var args = Array.prototype.slice.call(arguments);
	    try {
	      fn.apply(null, args);
	    } catch (err) {
	      emitError(err);
	    }
	  }
	};
	Domain.prototype.intercept = function(fn) {
	  var emitError = this.__emitError;
	  return function(err) {
	    if (err) {
	      emitError(err);
	    } else {
	      var args = Array.prototype.slice.call(arguments, 1);
	      try {
	        fn.apply(null, args);
	      } catch (err) {
	        emitError(err);
	      }
	    }
	  }
	};
	Domain.prototype.run = function(fn) {
	  var emitError = this.__emitError;
	  try {
	    fn();
	  } catch (err) {
	    emitError(err);
	  }
	  return this
	};
	Domain.prototype.dispose = function() {
	  this.removeAllListeners();
	  return this
	};
	Domain.prototype.enter = Domain.prototype.exit = function() {
	  return this
	};
	function createDomain() {
	  return new Domain();
	}
	var create = createDomain;

	var _polyfillNode_domain = {
	  Domain: Domain,
	  createDomain: createDomain,
	  create: create
	};

	var _polyfillNode_domain$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Domain: Domain,
		create: create,
		createDomain: createDomain,
		default: _polyfillNode_domain
	});

	var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_domain$1);

	var domain; // The domain module is executed on demand
	var hasSetImmediate = typeof setImmediate === "function";
	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including network IO events in Node.js.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	var raw = rawAsap$1;
	function rawAsap$1(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Avoids a function call
	    queue[queue.length] = task;
	}
	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory excaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;
	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while(index < queue.length){
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for(var scan = 0, newLength = queue.length - index; scan < newLength; scan++){
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}
	rawAsap$1.requestFlush = requestFlush;
	function requestFlush() {
	    // Ensure flushing is not bound to any domain.
	    // It is not sufficient to exit the domain, because domains exist on a stack.
	    // To execute code outside of any domain, the following dance is necessary.
	    var parentDomain = browser$1.domain;
	    if (parentDomain) {
	        if (!domain) {
	            // Lazy execute the domain module.
	            // Only employed if the user elects to use domains.
	            domain = require$$0$2;
	        }
	        domain.active = browser$1.domain = null;
	    }
	    // `setImmediate` is slower that `process.nextTick`, but `process.nextTick`
	    // cannot handle recursion.
	    // `requestFlush` will only be called recursively from `asap.js`, to resume
	    // flushing after an error is thrown into a domain.
	    // Conveniently, `setImmediate` was introduced in the same version
	    // `process.nextTick` started throwing recursion errors.
	    if (flushing && hasSetImmediate) {
	        setImmediate(flush);
	    } else {
	        browser$1.nextTick(flush);
	    }
	    if (parentDomain) {
	        domain.active = browser$1.domain = parentDomain;
	    }
	}

	var rawAsap = raw;
	var freeTasks = [];
	/**
	 * Calls a task as soon as possible after returning, in its own event, with
	 * priority over IO events. An exception thrown in a task can be handled by
	 * `process.on("uncaughtException") or `domain.on("error")`, but will otherwise
	 * crash the process. If the error is handled, all subsequent tasks will
	 * resume.
	 *
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */ var asap_1 = asap$1;
	function asap$1(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawTask.domain = browser$1.domain;
	    rawAsap(rawTask);
	}
	function RawTask() {
	    this.task = null;
	    this.domain = null;
	}
	RawTask.prototype.call = function() {
	    if (this.domain) {
	        this.domain.enter();
	    }
	    var threw = true;
	    try {
	        this.task.call();
	        threw = false;
	        // If the task throws an exception (presumably) Node.js restores the
	        // domain stack for the next event.
	        if (this.domain) {
	            this.domain.exit();
	        }
	    } finally{
	        // We use try/finally and a threw flag to avoid messing up stack traces
	        // when we catch and release errors.
	        if (threw) {
	            // In Node.js, uncaught exceptions are considered fatal errors.
	            // Re-throw them to interrupt flushing!
	            // Ensure that flushing continues if an uncaught exception is
	            // suppressed listening process.on("uncaughtException") or
	            // domain.on("error").
	            rawAsap.requestFlush();
	        }
	        // If the task threw an error, we do not want to exit the domain here.
	        // Exiting the domain would prevent the domain from catching the error.
	        this.task = null;
	        this.domain = null;
	        freeTasks.push(this);
	    }
	};

	var aSyncWaterfall = {exports: {}};

	(function(module) {
	    // MIT license (by Elan Shanker).
	    (function(globals) {
	        var executeSync = function executeSync() {
	            var args = Array.prototype.slice.call(arguments);
	            if (typeof args[0] === 'function') {
	                args[0].apply(null, args.splice(1));
	            }
	        };
	        var executeAsync = function executeAsync(fn) {
	            if (typeof setImmediate === 'function') {
	                setImmediate(fn);
	            } else if (typeof browser$1 !== 'undefined' && browser$1.nextTick) {
	                browser$1.nextTick(fn);
	            } else {
	                setTimeout(fn, 0);
	            }
	        };
	        var makeIterator = function makeIterator(tasks) {
	            var makeCallback = function makeCallback1(index) {
	                var fn = function fn1() {
	                    if (tasks.length) {
	                        tasks[index].apply(null, arguments);
	                    }
	                    return fn.next();
	                };
	                fn.next = function() {
	                    return index < tasks.length - 1 ? makeCallback(index + 1) : null;
	                };
	                return fn;
	            };
	            return makeCallback(0);
	        };
	        var _isArray = Array.isArray || function(maybeArray) {
	            return Object.prototype.toString.call(maybeArray) === '[object Array]';
	        };
	        var waterfall = function waterfall(tasks, callback, forceAsync) {
	            var nextTick = forceAsync ? executeAsync : executeSync;
	            callback = callback || function() {};
	            if (!_isArray(tasks)) {
	                var err = new Error('First argument to waterfall must be an array of functions');
	                return callback(err);
	            }
	            if (!tasks.length) {
	                return callback();
	            }
	            var wrapIterator = function wrapIterator1(iterator) {
	                return function(err) {
	                    if (err) {
	                        callback.apply(null, arguments);
	                        callback = function callback() {};
	                    } else {
	                        var args = Array.prototype.slice.call(arguments, 1);
	                        var next = iterator.next();
	                        if (next) {
	                            args.push(wrapIterator(next));
	                        } else {
	                            args.push(callback);
	                        }
	                        nextTick(function() {
	                            iterator.apply(null, args);
	                        });
	                    }
	                };
	            };
	            wrapIterator(makeIterator(tasks))();
	        };
	        if (module.exports) {
	            module.exports = waterfall; // CommonJS
	        } else {
	            globals.waterfall = waterfall; // <script>
	        }
	    })(commonjsGlobal);
	})(aSyncWaterfall);
	var aSyncWaterfallExports = aSyncWaterfall.exports;

	var lib$8 = libExports;
	var whitespaceChars = " \n\t\r\xA0";
	var delimChars = '()[]{}%*-+~/#,:|.<>=!';
	var intChars = '0123456789';
	var BLOCK_START = '{%';
	var BLOCK_END = '%}';
	var VARIABLE_START = '{{';
	var VARIABLE_END = '}}';
	var COMMENT_START = '{#';
	var COMMENT_END = '#}';
	var TOKEN_STRING = 'string';
	var TOKEN_WHITESPACE = 'whitespace';
	var TOKEN_DATA = 'data';
	var TOKEN_BLOCK_START = 'block-start';
	var TOKEN_BLOCK_END = 'block-end';
	var TOKEN_VARIABLE_START = 'variable-start';
	var TOKEN_VARIABLE_END = 'variable-end';
	var TOKEN_COMMENT = 'comment';
	var TOKEN_LEFT_PAREN = 'left-paren';
	var TOKEN_RIGHT_PAREN = 'right-paren';
	var TOKEN_LEFT_BRACKET = 'left-bracket';
	var TOKEN_RIGHT_BRACKET = 'right-bracket';
	var TOKEN_LEFT_CURLY = 'left-curly';
	var TOKEN_RIGHT_CURLY = 'right-curly';
	var TOKEN_OPERATOR = 'operator';
	var TOKEN_COMMA = 'comma';
	var TOKEN_COLON = 'colon';
	var TOKEN_TILDE = 'tilde';
	var TOKEN_PIPE = 'pipe';
	var TOKEN_INT = 'int';
	var TOKEN_FLOAT = 'float';
	var TOKEN_BOOLEAN = 'boolean';
	var TOKEN_NONE = 'none';
	var TOKEN_SYMBOL = 'symbol';
	var TOKEN_SPECIAL = 'special';
	var TOKEN_REGEX = 'regex';
	function token(type, value, lineno, colno) {
	    return {
	        type: type,
	        value: value,
	        lineno: lineno,
	        colno: colno
	    };
	}
	var Tokenizer = /*#__PURE__*/ function() {
	    function Tokenizer(str, opts) {
	        this.str = str;
	        this.index = 0;
	        this.len = str.length;
	        this.lineno = 0;
	        this.colno = 0;
	        this.in_code = false;
	        opts = opts || {};
	        var tags = opts.tags || {};
	        this.tags = {
	            BLOCK_START: tags.blockStart || BLOCK_START,
	            BLOCK_END: tags.blockEnd || BLOCK_END,
	            VARIABLE_START: tags.variableStart || VARIABLE_START,
	            VARIABLE_END: tags.variableEnd || VARIABLE_END,
	            COMMENT_START: tags.commentStart || COMMENT_START,
	            COMMENT_END: tags.commentEnd || COMMENT_END
	        };
	        this.trimBlocks = !!opts.trimBlocks;
	        this.lstripBlocks = !!opts.lstripBlocks;
	    }
	    var _proto = Tokenizer.prototype;
	    _proto.nextToken = function nextToken() {
	        var lineno = this.lineno;
	        var colno = this.colno;
	        var tok;
	        if (this.in_code) {
	            // Otherwise, if we are in a block parse it as code
	            var cur = this.current();
	            if (this.isFinished()) {
	                // We have nothing else to parse
	                return null;
	            } else if (cur === '"' || cur === '\'') {
	                // We've hit a string
	                return token(TOKEN_STRING, this._parseString(cur), lineno, colno);
	            } else if (tok = this._extract(whitespaceChars)) {
	                // We hit some whitespace
	                return token(TOKEN_WHITESPACE, tok, lineno, colno);
	            } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString('-' + this.tags.BLOCK_END))) {
	                // Special check for the block end tag
	                //
	                // It is a requirement that start and end tags are composed of
	                // delimiter characters (%{}[] etc), and our code always
	                // breaks on delimiters so we can assume the token parsing
	                // doesn't consume these elsewhere
	                this.in_code = false;
	                if (this.trimBlocks) {
	                    cur = this.current();
	                    if (cur === '\n') {
	                        // Skip newline
	                        this.forward();
	                    } else if (cur === '\r') {
	                        // Skip CRLF newline
	                        this.forward();
	                        cur = this.current();
	                        if (cur === '\n') {
	                            this.forward();
	                        } else {
	                            // Was not a CRLF, so go back
	                            this.back();
	                        }
	                    }
	                }
	                return token(TOKEN_BLOCK_END, tok, lineno, colno);
	            } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString('-' + this.tags.VARIABLE_END))) {
	                // Special check for variable end tag (see above)
	                this.in_code = false;
	                return token(TOKEN_VARIABLE_END, tok, lineno, colno);
	            } else if (cur === 'r' && this.str.charAt(this.index + 1) === '/') {
	                // Skip past 'r/'.
	                this.forwardN(2);
	                // Extract until the end of the regex -- / ends it, \/ does not.
	                var regexBody = '';
	                while(!this.isFinished()){
	                    if (this.current() === '/' && this.previous() !== '\\') {
	                        this.forward();
	                        break;
	                    } else {
	                        regexBody += this.current();
	                        this.forward();
	                    }
	                }
	                // Check for flags.
	                // The possible flags are according to https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
	                var POSSIBLE_FLAGS = [
	                    'g',
	                    'i',
	                    'm',
	                    'y'
	                ];
	                var regexFlags = '';
	                while(!this.isFinished()){
	                    var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;
	                    if (isCurrentAFlag) {
	                        regexFlags += this.current();
	                        this.forward();
	                    } else {
	                        break;
	                    }
	                }
	                return token(TOKEN_REGEX, {
	                    body: regexBody,
	                    flags: regexFlags
	                }, lineno, colno);
	            } else if (delimChars.indexOf(cur) !== -1) {
	                // We've hit a delimiter (a special char like a bracket)
	                this.forward();
	                var complexOps = [
	                    '==',
	                    '===',
	                    '!=',
	                    '!==',
	                    '<=',
	                    '>=',
	                    '//',
	                    '**'
	                ];
	                var curComplex = cur + this.current();
	                var type;
	                if (lib$8.indexOf(complexOps, curComplex) !== -1) {
	                    this.forward();
	                    cur = curComplex;
	                    // See if this is a strict equality/inequality comparator
	                    if (lib$8.indexOf(complexOps, curComplex + this.current()) !== -1) {
	                        cur = curComplex + this.current();
	                        this.forward();
	                    }
	                }
	                switch(cur){
	                    case '(':
	                        type = TOKEN_LEFT_PAREN;
	                        break;
	                    case ')':
	                        type = TOKEN_RIGHT_PAREN;
	                        break;
	                    case '[':
	                        type = TOKEN_LEFT_BRACKET;
	                        break;
	                    case ']':
	                        type = TOKEN_RIGHT_BRACKET;
	                        break;
	                    case '{':
	                        type = TOKEN_LEFT_CURLY;
	                        break;
	                    case '}':
	                        type = TOKEN_RIGHT_CURLY;
	                        break;
	                    case ',':
	                        type = TOKEN_COMMA;
	                        break;
	                    case ':':
	                        type = TOKEN_COLON;
	                        break;
	                    case '~':
	                        type = TOKEN_TILDE;
	                        break;
	                    case '|':
	                        type = TOKEN_PIPE;
	                        break;
	                    default:
	                        type = TOKEN_OPERATOR;
	                }
	                return token(type, cur, lineno, colno);
	            } else {
	                // We are not at whitespace or a delimiter, so extract the
	                // text and parse it
	                tok = this._extractUntil(whitespaceChars + delimChars);
	                if (tok.match(/^[-+]?[0-9]+$/)) {
	                    if (this.current() === '.') {
	                        this.forward();
	                        var dec = this._extract(intChars);
	                        return token(TOKEN_FLOAT, tok + '.' + dec, lineno, colno);
	                    } else {
	                        return token(TOKEN_INT, tok, lineno, colno);
	                    }
	                } else if (tok.match(/^(true|false)$/)) {
	                    return token(TOKEN_BOOLEAN, tok, lineno, colno);
	                } else if (tok === 'none') {
	                    return token(TOKEN_NONE, tok, lineno, colno);
	                /*
	           * Added to make the test `null is null` evaluate truthily.
	           * Otherwise, Nunjucks will look up null in the context and
	           * return `undefined`, which is not what we want. This *may* have
	           * consequences is someone is using null in their templates as a
	           * variable.
	           */ } else if (tok === 'null') {
	                    return token(TOKEN_NONE, tok, lineno, colno);
	                } else if (tok) {
	                    return token(TOKEN_SYMBOL, tok, lineno, colno);
	                } else {
	                    throw new Error('Unexpected value while parsing: ' + tok);
	                }
	            }
	        } else {
	            // Parse out the template text, breaking on tag
	            // delimiters because we need to look for block/variable start
	            // tags (don't use the full delimChars for optimization)
	            var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);
	            if (this.isFinished()) {
	                return null;
	            } else if ((tok = this._extractString(this.tags.BLOCK_START + '-')) || (tok = this._extractString(this.tags.BLOCK_START))) {
	                this.in_code = true;
	                return token(TOKEN_BLOCK_START, tok, lineno, colno);
	            } else if ((tok = this._extractString(this.tags.VARIABLE_START + '-')) || (tok = this._extractString(this.tags.VARIABLE_START))) {
	                this.in_code = true;
	                return token(TOKEN_VARIABLE_START, tok, lineno, colno);
	            } else {
	                tok = '';
	                var data;
	                var inComment = false;
	                if (this._matches(this.tags.COMMENT_START)) {
	                    inComment = true;
	                    tok = this._extractString(this.tags.COMMENT_START);
	                }
	                // Continually consume text, breaking on the tag delimiter
	                // characters and checking to see if it's a start tag.
	                //
	                // We could hit the end of the template in the middle of
	                // our looping, so check for the null return value from
	                // _extractUntil
	                while((data = this._extractUntil(beginChars)) !== null){
	                    tok += data;
	                    if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
	                        if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
	                            var lastLine = tok.slice(-this.colno);
	                            if (/^\s+$/.test(lastLine)) {
	                                // Remove block leading whitespace from beginning of the string
	                                tok = tok.slice(0, -this.colno);
	                                if (!tok.length) {
	                                    // All data removed, collapse to avoid unnecessary nodes
	                                    // by returning next token (block start)
	                                    return this.nextToken();
	                                }
	                            }
	                        }
	                        break;
	                    } else if (this._matches(this.tags.COMMENT_END)) {
	                        if (!inComment) {
	                            throw new Error('unexpected end of comment');
	                        }
	                        tok += this._extractString(this.tags.COMMENT_END);
	                        break;
	                    } else {
	                        // It does not match any tag, so add the character and
	                        // carry on
	                        tok += this.current();
	                        this.forward();
	                    }
	                }
	                if (data === null && inComment) {
	                    throw new Error('expected end of comment, got end of file');
	                }
	                return token(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
	            }
	        }
	    };
	    _proto._parseString = function _parseString(delimiter) {
	        this.forward();
	        var str = '';
	        while(!this.isFinished() && this.current() !== delimiter){
	            var cur = this.current();
	            if (cur === '\\') {
	                this.forward();
	                switch(this.current()){
	                    case 'n':
	                        str += '\n';
	                        break;
	                    case 't':
	                        str += '\t';
	                        break;
	                    case 'r':
	                        str += '\r';
	                        break;
	                    default:
	                        str += this.current();
	                }
	                this.forward();
	            } else {
	                str += cur;
	                this.forward();
	            }
	        }
	        this.forward();
	        return str;
	    };
	    _proto._matches = function _matches(str) {
	        if (this.index + str.length > this.len) {
	            return null;
	        }
	        var m = this.str.slice(this.index, this.index + str.length);
	        return m === str;
	    };
	    _proto._extractString = function _extractString(str) {
	        if (this._matches(str)) {
	            this.forwardN(str.length);
	            return str;
	        }
	        return null;
	    };
	    _proto._extractUntil = function _extractUntil(charString) {
	        // Extract all non-matching chars, with the default matching set
	        // to everything
	        return this._extractMatching(true, charString || '');
	    };
	    _proto._extract = function _extract(charString) {
	        // Extract all matching chars (no default, so charString must be
	        // explicit)
	        return this._extractMatching(false, charString);
	    };
	    _proto._extractMatching = function _extractMatching(breakOnMatch, charString) {
	        // Pull out characters until a breaking char is hit.
	        // If breakOnMatch is false, a non-matching char stops it.
	        // If breakOnMatch is true, a matching char stops it.
	        if (this.isFinished()) {
	            return null;
	        }
	        var first = charString.indexOf(this.current());
	        // Only proceed if the first character doesn't meet our condition
	        if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
	            var t = this.current();
	            this.forward();
	            // And pull out all the chars one at a time until we hit a
	            // breaking char
	            var idx = charString.indexOf(this.current());
	            while((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()){
	                t += this.current();
	                this.forward();
	                idx = charString.indexOf(this.current());
	            }
	            return t;
	        }
	        return '';
	    };
	    _proto._extractRegex = function _extractRegex(regex) {
	        var matches = this.currentStr().match(regex);
	        if (!matches) {
	            return null;
	        }
	        // Move forward whatever was matched
	        this.forwardN(matches[0].length);
	        return matches;
	    };
	    _proto.isFinished = function isFinished() {
	        return this.index >= this.len;
	    };
	    _proto.forwardN = function forwardN(n) {
	        for(var i = 0; i < n; i++){
	            this.forward();
	        }
	    };
	    _proto.forward = function forward() {
	        this.index++;
	        if (this.previous() === '\n') {
	            this.lineno++;
	            this.colno = 0;
	        } else {
	            this.colno++;
	        }
	    };
	    _proto.backN = function backN(n) {
	        for(var i = 0; i < n; i++){
	            this.back();
	        }
	    };
	    _proto.back = function back() {
	        this.index--;
	        if (this.current() === '\n') {
	            this.lineno--;
	            var idx = this.src.lastIndexOf('\n', this.index - 1);
	            if (idx === -1) {
	                this.colno = this.index;
	            } else {
	                this.colno = this.index - idx;
	            }
	        } else {
	            this.colno--;
	        }
	    };
	    _proto.current = function current() {
	        if (!this.isFinished()) {
	            return this.str.charAt(this.index);
	        }
	        return '';
	    };
	    _proto.currentStr = function currentStr() {
	        if (!this.isFinished()) {
	            return this.str.substr(this.index);
	        }
	        return '';
	    };
	    _proto.previous = function previous() {
	        return this.str.charAt(this.index - 1);
	    };
	    return Tokenizer;
	}();
	var lexer$2 = {
	    lex: function lex(src, opts) {
	        return new Tokenizer(src, opts);
	    },
	    TOKEN_STRING: TOKEN_STRING,
	    TOKEN_WHITESPACE: TOKEN_WHITESPACE,
	    TOKEN_DATA: TOKEN_DATA,
	    TOKEN_BLOCK_START: TOKEN_BLOCK_START,
	    TOKEN_BLOCK_END: TOKEN_BLOCK_END,
	    TOKEN_VARIABLE_START: TOKEN_VARIABLE_START,
	    TOKEN_VARIABLE_END: TOKEN_VARIABLE_END,
	    TOKEN_COMMENT: TOKEN_COMMENT,
	    TOKEN_LEFT_PAREN: TOKEN_LEFT_PAREN,
	    TOKEN_RIGHT_PAREN: TOKEN_RIGHT_PAREN,
	    TOKEN_LEFT_BRACKET: TOKEN_LEFT_BRACKET,
	    TOKEN_RIGHT_BRACKET: TOKEN_RIGHT_BRACKET,
	    TOKEN_LEFT_CURLY: TOKEN_LEFT_CURLY,
	    TOKEN_RIGHT_CURLY: TOKEN_RIGHT_CURLY,
	    TOKEN_OPERATOR: TOKEN_OPERATOR,
	    TOKEN_COMMA: TOKEN_COMMA,
	    TOKEN_COLON: TOKEN_COLON,
	    TOKEN_TILDE: TOKEN_TILDE,
	    TOKEN_PIPE: TOKEN_PIPE,
	    TOKEN_INT: TOKEN_INT,
	    TOKEN_FLOAT: TOKEN_FLOAT,
	    TOKEN_BOOLEAN: TOKEN_BOOLEAN,
	    TOKEN_NONE: TOKEN_NONE,
	    TOKEN_SYMBOL: TOKEN_SYMBOL,
	    TOKEN_SPECIAL: TOKEN_SPECIAL,
	    TOKEN_REGEX: TOKEN_REGEX
	};

	var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_events);

	function _type_of$4(obj) {
	    "@swc/helpers - typeof";
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
	}
	// A simple class system, more documentation to come
	function _defineProperties$2(target, props) {
	    for(var i = 0; i < props.length; i++){
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
	    }
	}
	function _createClass$1(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
	    Object.defineProperty(Constructor, "prototype", {
	        writable: false
	    });
	    return Constructor;
	}
	function _toPropertyKey$1(arg) {
	    var key = _toPrimitive$1(arg, "string");
	    return (typeof key === "undefined" ? "undefined" : _type_of$4(key)) === "symbol" ? key : String(key);
	}
	function _toPrimitive$1(input, hint) {
	    if ((typeof input === "undefined" ? "undefined" : _type_of$4(input)) !== "object" || input === null) return input;
	    var prim = input[Symbol.toPrimitive];
	    if (prim !== undefined) {
	        var res = prim.call(input, hint);
	        if ((typeof res === "undefined" ? "undefined" : _type_of$4(res)) !== "object") return res;
	        throw new TypeError("@@toPrimitive must return a primitive value.");
	    }
	    return (String )(input);
	}
	function _inheritsLoose$7(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$7(subClass, superClass);
	}
	function _setPrototypeOf$7(o, p) {
	    _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$7(o, p);
	}
	var EventEmitter = require$$0$1;
	var lib$7 = libExports;
	function parentWrap(parent, prop) {
	    if (typeof parent !== 'function' || typeof prop !== 'function') {
	        return prop;
	    }
	    return function wrap() {
	        // Save the current parent method
	        var tmp = this.parent;
	        // Set parent to the previous method, call, and restore
	        this.parent = parent;
	        var res = prop.apply(this, arguments);
	        this.parent = tmp;
	        return res;
	    };
	}
	function extendClass(cls, name, props) {
	    props = props || {};
	    lib$7.keys(props).forEach(function(k) {
	        props[k] = parentWrap(cls.prototype[k], props[k]);
	    });
	    var subclass = /*#__PURE__*/ function(_cls) {
	        _inheritsLoose$7(subclass, _cls);
	        function subclass() {
	            return _cls.apply(this, arguments) || this;
	        }
	        _createClass$1(subclass, [
	            {
	                key: "typename",
	                get: function get() {
	                    return name;
	                }
	            }
	        ]);
	        return subclass;
	    }(cls);
	    lib$7._assign(subclass.prototype, props);
	    return subclass;
	}
	var Obj$4 = /*#__PURE__*/ function() {
	    function Obj() {
	        // Unfortunately necessary for backwards compatibility
	        this.init.apply(this, arguments);
	    }
	    var _proto = Obj.prototype;
	    _proto.init = function init() {};
	    Obj.extend = function extend(name, props) {
	        if ((typeof name === "undefined" ? "undefined" : _type_of$4(name)) === 'object') {
	            props = name;
	            name = 'anonymous';
	        }
	        return extendClass(this, name, props);
	    };
	    _createClass$1(Obj, [
	        {
	            key: "typename",
	            get: function get() {
	                return this.constructor.name;
	            }
	        }
	    ]);
	    return Obj;
	}();
	var EmitterObj$2 = /*#__PURE__*/ function(_EventEmitter) {
	    _inheritsLoose$7(EmitterObj, _EventEmitter);
	    function EmitterObj() {
	        var _this2;
	        var _this;
	        _this = _EventEmitter.call(this) || this;
	        // Unfortunately necessary for backwards compatibility
	        (_this2 = _this).init.apply(_this2, arguments);
	        return _this;
	    }
	    var _proto2 = EmitterObj.prototype;
	    _proto2.init = function init() {};
	    EmitterObj.extend = function extend(name, props) {
	        if ((typeof name === "undefined" ? "undefined" : _type_of$4(name)) === 'object') {
	            props = name;
	            name = 'anonymous';
	        }
	        return extendClass(this, name, props);
	    };
	    _createClass$1(EmitterObj, [
	        {
	            key: "typename",
	            get: function get() {
	                return this.constructor.name;
	            }
	        }
	    ]);
	    return EmitterObj;
	}(EventEmitter);
	var object = {
	    Obj: Obj$4,
	    EmitterObj: EmitterObj$2
	};

	function _instanceof$b(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function _type_of$3(obj) {
	    "@swc/helpers - typeof";
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
	}
	function _defineProperties$1(target, props) {
	    for(var i = 0; i < props.length; i++){
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	    }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	    Object.defineProperty(Constructor, "prototype", {
	        writable: false
	    });
	    return Constructor;
	}
	function _toPropertyKey(arg) {
	    var key = _toPrimitive(arg, "string");
	    return (typeof key === "undefined" ? "undefined" : _type_of$3(key)) === "symbol" ? key : String(key);
	}
	function _toPrimitive(input, hint) {
	    if ((typeof input === "undefined" ? "undefined" : _type_of$3(input)) !== "object" || input === null) return input;
	    var prim = input[Symbol.toPrimitive];
	    if (prim !== undefined) {
	        var res = prim.call(input, hint);
	        if ((typeof res === "undefined" ? "undefined" : _type_of$3(res)) !== "object") return res;
	        throw new TypeError("@@toPrimitive must return a primitive value.");
	    }
	    return (String )(input);
	}
	function _inheritsLoose$6(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$6(subClass, superClass);
	}
	function _setPrototypeOf$6(o, p) {
	    _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$6(o, p);
	}
	var _require$6 = object, Obj$3 = _require$6.Obj;
	function traverseAndCheck(obj, type, results) {
	    if (_instanceof$b(obj, type)) {
	        results.push(obj);
	    }
	    if (_instanceof$b(obj, Node)) {
	        obj.findAll(type, results);
	    }
	}
	var Node = /*#__PURE__*/ function(_Obj) {
	    _inheritsLoose$6(Node, _Obj);
	    function Node() {
	        return _Obj.apply(this, arguments) || this;
	    }
	    var _proto = Node.prototype;
	    _proto.init = function init(lineno, colno) {
	        var _arguments = arguments, _this = this;
	        for(var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
	            args[_key - 2] = arguments[_key];
	        }
	        this.lineno = lineno;
	        this.colno = colno;
	        this.fields.forEach(function(field, i) {
	            // The first two args are line/col numbers, so offset by 2
	            var val = _arguments[i + 2];
	            // Fields should never be undefined, but null. It makes
	            // testing easier to normalize values.
	            if (val === undefined) {
	                val = null;
	            }
	            _this[field] = val;
	        });
	    };
	    _proto.findAll = function findAll(type, results) {
	        var _this2 = this;
	        results = results || [];
	        if (_instanceof$b(this, NodeList)) {
	            this.children.forEach(function(child) {
	                return traverseAndCheck(child, type, results);
	            });
	        } else {
	            this.fields.forEach(function(field) {
	                return traverseAndCheck(_this2[field], type, results);
	            });
	        }
	        return results;
	    };
	    _proto.iterFields = function iterFields(func) {
	        var _this3 = this;
	        this.fields.forEach(function(field) {
	            func(_this3[field], field);
	        });
	    };
	    return Node;
	}(Obj$3); // Abstract nodes
	var Value = /*#__PURE__*/ function(_Node) {
	    _inheritsLoose$6(Value, _Node);
	    function Value() {
	        return _Node.apply(this, arguments) || this;
	    }
	    _createClass(Value, [
	        {
	            key: "typename",
	            get: function get() {
	                return 'Value';
	            }
	        },
	        {
	            key: "fields",
	            get: function get() {
	                return [
	                    'value'
	                ];
	            }
	        }
	    ]);
	    return Value;
	}(Node); // Concrete nodes
	var NodeList = /*#__PURE__*/ function(_Node2) {
	    _inheritsLoose$6(NodeList, _Node2);
	    function NodeList() {
	        return _Node2.apply(this, arguments) || this;
	    }
	    var _proto2 = NodeList.prototype;
	    _proto2.init = function init(lineno, colno, nodes) {
	        _Node2.prototype.init.call(this, lineno, colno, nodes || []);
	    };
	    _proto2.addChild = function addChild(node) {
	        this.children.push(node);
	    };
	    _createClass(NodeList, [
	        {
	            key: "typename",
	            get: function get() {
	                return 'NodeList';
	            }
	        },
	        {
	            key: "fields",
	            get: function get() {
	                return [
	                    'children'
	                ];
	            }
	        }
	    ]);
	    return NodeList;
	}(Node);
	var Root = NodeList.extend('Root');
	var Literal = Value.extend('Literal');
	var _Symbol = Value.extend('Symbol');
	var Group = NodeList.extend('Group');
	var ArrayNode = NodeList.extend('Array');
	var Pair = Node.extend('Pair', {
	    fields: [
	        'key',
	        'value'
	    ]
	});
	var Dict = NodeList.extend('Dict');
	var LookupVal = Node.extend('LookupVal', {
	    fields: [
	        'target',
	        'val'
	    ]
	});
	var If = Node.extend('If', {
	    fields: [
	        'cond',
	        'body',
	        'else_'
	    ]
	});
	var IfAsync = If.extend('IfAsync');
	var InlineIf = Node.extend('InlineIf', {
	    fields: [
	        'cond',
	        'body',
	        'else_'
	    ]
	});
	var For = Node.extend('For', {
	    fields: [
	        'arr',
	        'name',
	        'body',
	        'else_'
	    ]
	});
	var AsyncEach = For.extend('AsyncEach');
	var AsyncAll = For.extend('AsyncAll');
	var Macro = Node.extend('Macro', {
	    fields: [
	        'name',
	        'args',
	        'body'
	    ]
	});
	var Caller = Macro.extend('Caller');
	var Import = Node.extend('Import', {
	    fields: [
	        'template',
	        'target',
	        'withContext'
	    ]
	});
	var FromImport = /*#__PURE__*/ function(_Node3) {
	    _inheritsLoose$6(FromImport, _Node3);
	    function FromImport() {
	        return _Node3.apply(this, arguments) || this;
	    }
	    var _proto3 = FromImport.prototype;
	    _proto3.init = function init(lineno, colno, template, names, withContext) {
	        _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
	    };
	    _createClass(FromImport, [
	        {
	            key: "typename",
	            get: function get() {
	                return 'FromImport';
	            }
	        },
	        {
	            key: "fields",
	            get: function get() {
	                return [
	                    'template',
	                    'names',
	                    'withContext'
	                ];
	            }
	        }
	    ]);
	    return FromImport;
	}(Node);
	var FunCall = Node.extend('FunCall', {
	    fields: [
	        'name',
	        'args'
	    ]
	});
	var Filter = FunCall.extend('Filter');
	var FilterAsync = Filter.extend('FilterAsync', {
	    fields: [
	        'name',
	        'args',
	        'symbol'
	    ]
	});
	var KeywordArgs = Dict.extend('KeywordArgs');
	var Block = Node.extend('Block', {
	    fields: [
	        'name',
	        'body'
	    ]
	});
	var Super = Node.extend('Super', {
	    fields: [
	        'blockName',
	        'symbol'
	    ]
	});
	var TemplateRef = Node.extend('TemplateRef', {
	    fields: [
	        'template'
	    ]
	});
	var Extends = TemplateRef.extend('Extends');
	var Include = Node.extend('Include', {
	    fields: [
	        'template',
	        'ignoreMissing'
	    ]
	});
	var Set$1 = Node.extend('Set', {
	    fields: [
	        'targets',
	        'value'
	    ]
	});
	var Switch = Node.extend('Switch', {
	    fields: [
	        'expr',
	        'cases',
	        'default'
	    ]
	});
	var Case = Node.extend('Case', {
	    fields: [
	        'cond',
	        'body'
	    ]
	});
	var Output = NodeList.extend('Output');
	var Capture = Node.extend('Capture', {
	    fields: [
	        'body'
	    ]
	});
	var TemplateData = Literal.extend('TemplateData');
	var UnaryOp = Node.extend('UnaryOp', {
	    fields: [
	        'target'
	    ]
	});
	var BinOp = Node.extend('BinOp', {
	    fields: [
	        'left',
	        'right'
	    ]
	});
	var In = BinOp.extend('In');
	var Is = BinOp.extend('Is');
	var Or = BinOp.extend('Or');
	var And = BinOp.extend('And');
	var Not = UnaryOp.extend('Not');
	var Add = BinOp.extend('Add');
	var Concat = BinOp.extend('Concat');
	var Sub = BinOp.extend('Sub');
	var Mul = BinOp.extend('Mul');
	var Div = BinOp.extend('Div');
	var FloorDiv = BinOp.extend('FloorDiv');
	var Mod = BinOp.extend('Mod');
	var Pow = BinOp.extend('Pow');
	var Neg = UnaryOp.extend('Neg');
	var Pos = UnaryOp.extend('Pos');
	var Compare = Node.extend('Compare', {
	    fields: [
	        'expr',
	        'ops'
	    ]
	});
	var CompareOperand = Node.extend('CompareOperand', {
	    fields: [
	        'expr',
	        'type'
	    ]
	});
	var CallExtension = Node.extend('CallExtension', {
	    init: function init(ext, prop, args, contentArgs) {
	        this.parent();
	        this.extName = ext.__name || ext;
	        this.prop = prop;
	        this.args = args || new NodeList();
	        this.contentArgs = contentArgs || [];
	        this.autoescape = ext.autoescape;
	    },
	    fields: [
	        'extName',
	        'prop',
	        'args',
	        'contentArgs'
	    ]
	});
	var CallExtensionAsync = CallExtension.extend('CallExtensionAsync');
	// This is hacky, but this is just a debugging function anyway
	function print(str, indent, inline) {
	    var lines = str.split('\n');
	    lines.forEach(function(line, i) {
	        if (line && (inline && i > 0 || !inline)) {
	            browser$1.stdout.write(' '.repeat(indent));
	        }
	        var nl = i === lines.length - 1 ? '' : '\n';
	        browser$1.stdout.write("" + line + nl);
	    });
	}
	// Print the AST in a nicely formatted tree format for debuggin
	function printNodes(node, indent) {
	    indent = indent || 0;
	    print(node.typename + ': ', indent);
	    if (_instanceof$b(node, NodeList)) {
	        print('\n');
	        node.children.forEach(function(n) {
	            printNodes(n, indent + 2);
	        });
	    } else if (_instanceof$b(node, CallExtension)) {
	        print(node.extName + "." + node.prop + "\n");
	        if (node.args) {
	            printNodes(node.args, indent + 2);
	        }
	        if (node.contentArgs) {
	            node.contentArgs.forEach(function(n) {
	                printNodes(n, indent + 2);
	            });
	        }
	    } else {
	        var nodes = [];
	        var props = null;
	        node.iterFields(function(val, fieldName) {
	            if (_instanceof$b(val, Node)) {
	                nodes.push([
	                    fieldName,
	                    val
	                ]);
	            } else {
	                props = props || {};
	                props[fieldName] = val;
	            }
	        });
	        if (props) {
	            print(JSON.stringify(props, null, 2) + '\n', null, true);
	        } else {
	            print('\n');
	        }
	        nodes.forEach(function(_ref) {
	            var fieldName = _ref[0], n = _ref[1];
	            print("[" + fieldName + "] =>", indent + 2);
	            printNodes(n, indent + 4);
	        });
	    }
	}
	var nodes$4 = {
	    Node: Node,
	    Root: Root,
	    NodeList: NodeList,
	    Value: Value,
	    Literal: Literal,
	    Symbol: _Symbol,
	    Group: Group,
	    Array: ArrayNode,
	    Pair: Pair,
	    Dict: Dict,
	    Output: Output,
	    Capture: Capture,
	    TemplateData: TemplateData,
	    If: If,
	    IfAsync: IfAsync,
	    InlineIf: InlineIf,
	    For: For,
	    AsyncEach: AsyncEach,
	    AsyncAll: AsyncAll,
	    Macro: Macro,
	    Caller: Caller,
	    Import: Import,
	    FromImport: FromImport,
	    FunCall: FunCall,
	    Filter: Filter,
	    FilterAsync: FilterAsync,
	    KeywordArgs: KeywordArgs,
	    Block: Block,
	    Super: Super,
	    Extends: Extends,
	    Include: Include,
	    Set: Set$1,
	    Switch: Switch,
	    Case: Case,
	    LookupVal: LookupVal,
	    BinOp: BinOp,
	    In: In,
	    Is: Is,
	    Or: Or,
	    And: And,
	    Not: Not,
	    Add: Add,
	    Concat: Concat,
	    Sub: Sub,
	    Mul: Mul,
	    Div: Div,
	    FloorDiv: FloorDiv,
	    Mod: Mod,
	    Pow: Pow,
	    Neg: Neg,
	    Pos: Pos,
	    Compare: Compare,
	    CompareOperand: CompareOperand,
	    CallExtension: CallExtension,
	    CallExtensionAsync: CallExtensionAsync,
	    printNodes: printNodes
	};

	function _instanceof$a(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function _inheritsLoose$5(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$5(subClass, superClass);
	}
	function _setPrototypeOf$5(o, p) {
	    _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$5(o, p);
	}
	var lexer$1 = lexer$2;
	var nodes$3 = nodes$4;
	var Obj$2 = object.Obj;
	var lib$6 = libExports;
	var Parser = /*#__PURE__*/ function(_Obj) {
	    _inheritsLoose$5(Parser, _Obj);
	    function Parser() {
	        return _Obj.apply(this, arguments) || this;
	    }
	    var _proto = Parser.prototype;
	    _proto.init = function init(tokens) {
	        this.tokens = tokens;
	        this.peeked = null;
	        this.breakOnBlocks = null;
	        this.dropLeadingWhitespace = false;
	        this.extensions = [];
	    };
	    _proto.nextToken = function nextToken(withWhitespace) {
	        var tok;
	        if (this.peeked) {
	            if (!withWhitespace && this.peeked.type === lexer$1.TOKEN_WHITESPACE) {
	                this.peeked = null;
	            } else {
	                tok = this.peeked;
	                this.peeked = null;
	                return tok;
	            }
	        }
	        tok = this.tokens.nextToken();
	        if (!withWhitespace) {
	            while(tok && tok.type === lexer$1.TOKEN_WHITESPACE){
	                tok = this.tokens.nextToken();
	            }
	        }
	        return tok;
	    };
	    _proto.peekToken = function peekToken() {
	        this.peeked = this.peeked || this.nextToken();
	        return this.peeked;
	    };
	    _proto.pushToken = function pushToken(tok) {
	        if (this.peeked) {
	            throw new Error('pushToken: can only push one token on between reads');
	        }
	        this.peeked = tok;
	    };
	    _proto.error = function error(msg, lineno, colno) {
	        if (lineno === undefined || colno === undefined) {
	            var tok = this.peekToken() || {};
	            lineno = tok.lineno;
	            colno = tok.colno;
	        }
	        if (lineno !== undefined) {
	            lineno += 1;
	        }
	        if (colno !== undefined) {
	            colno += 1;
	        }
	        return new lib$6.TemplateError(msg, lineno, colno);
	    };
	    _proto.fail = function fail(msg, lineno, colno) {
	        throw this.error(msg, lineno, colno);
	    };
	    _proto.skip = function skip(type) {
	        var tok = this.nextToken();
	        if (!tok || tok.type !== type) {
	            this.pushToken(tok);
	            return false;
	        }
	        return true;
	    };
	    _proto.expect = function expect(type) {
	        var tok = this.nextToken();
	        if (tok.type !== type) {
	            this.fail('expected ' + type + ', got ' + tok.type, tok.lineno, tok.colno);
	        }
	        return tok;
	    };
	    _proto.skipValue = function skipValue(type, val) {
	        var tok = this.nextToken();
	        if (!tok || tok.type !== type || tok.value !== val) {
	            this.pushToken(tok);
	            return false;
	        }
	        return true;
	    };
	    _proto.skipSymbol = function skipSymbol(val) {
	        return this.skipValue(lexer$1.TOKEN_SYMBOL, val);
	    };
	    _proto.advanceAfterBlockEnd = function advanceAfterBlockEnd(name) {
	        var tok;
	        if (!name) {
	            tok = this.peekToken();
	            if (!tok) {
	                this.fail('unexpected end of file');
	            }
	            if (tok.type !== lexer$1.TOKEN_SYMBOL) {
	                this.fail('advanceAfterBlockEnd: expected symbol token or ' + 'explicit name to be passed');
	            }
	            name = this.nextToken().value;
	        }
	        tok = this.nextToken();
	        if (tok && tok.type === lexer$1.TOKEN_BLOCK_END) {
	            if (tok.value.charAt(0) === '-') {
	                this.dropLeadingWhitespace = true;
	            }
	        } else {
	            this.fail('expected block end in ' + name + ' statement');
	        }
	        return tok;
	    };
	    _proto.advanceAfterVariableEnd = function advanceAfterVariableEnd() {
	        var tok = this.nextToken();
	        if (tok && tok.type === lexer$1.TOKEN_VARIABLE_END) {
	            this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === '-';
	        } else {
	            this.pushToken(tok);
	            this.fail('expected variable end');
	        }
	    };
	    _proto.parseFor = function parseFor() {
	        var forTok = this.peekToken();
	        var node;
	        var endBlock;
	        if (this.skipSymbol('for')) {
	            node = new nodes$3.For(forTok.lineno, forTok.colno);
	            endBlock = 'endfor';
	        } else if (this.skipSymbol('asyncEach')) {
	            node = new nodes$3.AsyncEach(forTok.lineno, forTok.colno);
	            endBlock = 'endeach';
	        } else if (this.skipSymbol('asyncAll')) {
	            node = new nodes$3.AsyncAll(forTok.lineno, forTok.colno);
	            endBlock = 'endall';
	        } else {
	            this.fail('parseFor: expected for{Async}', forTok.lineno, forTok.colno);
	        }
	        node.name = this.parsePrimary();
	        if (!_instanceof$a(node.name, nodes$3.Symbol)) {
	            this.fail('parseFor: variable name expected for loop');
	        }
	        var type = this.peekToken().type;
	        if (type === lexer$1.TOKEN_COMMA) {
	            // key/value iteration
	            var key = node.name;
	            node.name = new nodes$3.Array(key.lineno, key.colno);
	            node.name.addChild(key);
	            while(this.skip(lexer$1.TOKEN_COMMA)){
	                var prim = this.parsePrimary();
	                node.name.addChild(prim);
	            }
	        }
	        if (!this.skipSymbol('in')) {
	            this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
	        }
	        node.arr = this.parseExpression();
	        this.advanceAfterBlockEnd(forTok.value);
	        node.body = this.parseUntilBlocks(endBlock, 'else');
	        if (this.skipSymbol('else')) {
	            this.advanceAfterBlockEnd('else');
	            node.else_ = this.parseUntilBlocks(endBlock);
	        }
	        this.advanceAfterBlockEnd();
	        return node;
	    };
	    _proto.parseMacro = function parseMacro() {
	        var macroTok = this.peekToken();
	        if (!this.skipSymbol('macro')) {
	            this.fail('expected macro');
	        }
	        var name = this.parsePrimary(true);
	        var args = this.parseSignature();
	        var node = new nodes$3.Macro(macroTok.lineno, macroTok.colno, name, args);
	        this.advanceAfterBlockEnd(macroTok.value);
	        node.body = this.parseUntilBlocks('endmacro');
	        this.advanceAfterBlockEnd();
	        return node;
	    };
	    _proto.parseCall = function parseCall() {
	        // a call block is parsed as a normal FunCall, but with an added
	        // 'caller' kwarg which is a Caller node.
	        var callTok = this.peekToken();
	        if (!this.skipSymbol('call')) {
	            this.fail('expected call');
	        }
	        var callerArgs = this.parseSignature(true) || new nodes$3.NodeList();
	        var macroCall = this.parsePrimary();
	        this.advanceAfterBlockEnd(callTok.value);
	        var body = this.parseUntilBlocks('endcall');
	        this.advanceAfterBlockEnd();
	        var callerName = new nodes$3.Symbol(callTok.lineno, callTok.colno, 'caller');
	        var callerNode = new nodes$3.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body);
	        // add the additional caller kwarg, adding kwargs if necessary
	        var args = macroCall.args.children;
	        if (!_instanceof$a(args[args.length - 1], nodes$3.KeywordArgs)) {
	            args.push(new nodes$3.KeywordArgs());
	        }
	        var kwargs = args[args.length - 1];
	        kwargs.addChild(new nodes$3.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
	        return new nodes$3.Output(callTok.lineno, callTok.colno, [
	            macroCall
	        ]);
	    };
	    _proto.parseWithContext = function parseWithContext() {
	        var tok = this.peekToken();
	        var withContext = null;
	        if (this.skipSymbol('with')) {
	            withContext = true;
	        } else if (this.skipSymbol('without')) {
	            withContext = false;
	        }
	        if (withContext !== null) {
	            if (!this.skipSymbol('context')) {
	                this.fail('parseFrom: expected context after with/without', tok.lineno, tok.colno);
	            }
	        }
	        return withContext;
	    };
	    _proto.parseImport = function parseImport() {
	        var importTok = this.peekToken();
	        if (!this.skipSymbol('import')) {
	            this.fail('parseImport: expected import', importTok.lineno, importTok.colno);
	        }
	        var template = this.parseExpression();
	        if (!this.skipSymbol('as')) {
	            this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
	        }
	        var target = this.parseExpression();
	        var withContext = this.parseWithContext();
	        var node = new nodes$3.Import(importTok.lineno, importTok.colno, template, target, withContext);
	        this.advanceAfterBlockEnd(importTok.value);
	        return node;
	    };
	    _proto.parseFrom = function parseFrom() {
	        var fromTok = this.peekToken();
	        if (!this.skipSymbol('from')) {
	            this.fail('parseFrom: expected from');
	        }
	        var template = this.parseExpression();
	        if (!this.skipSymbol('import')) {
	            this.fail('parseFrom: expected import', fromTok.lineno, fromTok.colno);
	        }
	        var names = new nodes$3.NodeList();
	        var withContext;
	        while(1){
	            // eslint-disable-line no-constant-condition
	            var nextTok = this.peekToken();
	            if (nextTok.type === lexer$1.TOKEN_BLOCK_END) {
	                if (!names.children.length) {
	                    this.fail('parseFrom: Expected at least one import name', fromTok.lineno, fromTok.colno);
	                }
	                // Since we are manually advancing past the block end,
	                // need to keep track of whitespace control (normally
	                // this is done in `advanceAfterBlockEnd`
	                if (nextTok.value.charAt(0) === '-') {
	                    this.dropLeadingWhitespace = true;
	                }
	                this.nextToken();
	                break;
	            }
	            if (names.children.length > 0 && !this.skip(lexer$1.TOKEN_COMMA)) {
	                this.fail('parseFrom: expected comma', fromTok.lineno, fromTok.colno);
	            }
	            var name = this.parsePrimary();
	            if (name.value.charAt(0) === '_') {
	                this.fail('parseFrom: names starting with an underscore cannot be imported', name.lineno, name.colno);
	            }
	            if (this.skipSymbol('as')) {
	                var alias = this.parsePrimary();
	                names.addChild(new nodes$3.Pair(name.lineno, name.colno, name, alias));
	            } else {
	                names.addChild(name);
	            }
	            withContext = this.parseWithContext();
	        }
	        return new nodes$3.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
	    };
	    _proto.parseBlock = function parseBlock() {
	        var tag = this.peekToken();
	        if (!this.skipSymbol('block')) {
	            this.fail('parseBlock: expected block', tag.lineno, tag.colno);
	        }
	        var node = new nodes$3.Block(tag.lineno, tag.colno);
	        node.name = this.parsePrimary();
	        if (!_instanceof$a(node.name, nodes$3.Symbol)) {
	            this.fail('parseBlock: variable name expected', tag.lineno, tag.colno);
	        }
	        this.advanceAfterBlockEnd(tag.value);
	        node.body = this.parseUntilBlocks('endblock');
	        this.skipSymbol('endblock');
	        this.skipSymbol(node.name.value);
	        var tok = this.peekToken();
	        if (!tok) {
	            this.fail('parseBlock: expected endblock, got end of file');
	        }
	        this.advanceAfterBlockEnd(tok.value);
	        return node;
	    };
	    _proto.parseExtends = function parseExtends() {
	        var tagName = 'extends';
	        var tag = this.peekToken();
	        if (!this.skipSymbol(tagName)) {
	            this.fail('parseTemplateRef: expected ' + tagName);
	        }
	        var node = new nodes$3.Extends(tag.lineno, tag.colno);
	        node.template = this.parseExpression();
	        this.advanceAfterBlockEnd(tag.value);
	        return node;
	    };
	    _proto.parseInclude = function parseInclude() {
	        var tagName = 'include';
	        var tag = this.peekToken();
	        if (!this.skipSymbol(tagName)) {
	            this.fail('parseInclude: expected ' + tagName);
	        }
	        var node = new nodes$3.Include(tag.lineno, tag.colno);
	        node.template = this.parseExpression();
	        if (this.skipSymbol('ignore') && this.skipSymbol('missing')) {
	            node.ignoreMissing = true;
	        }
	        this.advanceAfterBlockEnd(tag.value);
	        return node;
	    };
	    _proto.parseIf = function parseIf() {
	        var tag = this.peekToken();
	        var node;
	        if (this.skipSymbol('if') || this.skipSymbol('elif') || this.skipSymbol('elseif')) {
	            node = new nodes$3.If(tag.lineno, tag.colno);
	        } else if (this.skipSymbol('ifAsync')) {
	            node = new nodes$3.IfAsync(tag.lineno, tag.colno);
	        } else {
	            this.fail('parseIf: expected if, elif, or elseif', tag.lineno, tag.colno);
	        }
	        node.cond = this.parseExpression();
	        this.advanceAfterBlockEnd(tag.value);
	        node.body = this.parseUntilBlocks('elif', 'elseif', 'else', 'endif');
	        var tok = this.peekToken();
	        switch(tok && tok.value){
	            case 'elseif':
	            case 'elif':
	                node.else_ = this.parseIf();
	                break;
	            case 'else':
	                this.advanceAfterBlockEnd();
	                node.else_ = this.parseUntilBlocks('endif');
	                this.advanceAfterBlockEnd();
	                break;
	            case 'endif':
	                node.else_ = null;
	                this.advanceAfterBlockEnd();
	                break;
	            default:
	                this.fail('parseIf: expected elif, else, or endif, got end of file');
	        }
	        return node;
	    };
	    _proto.parseSet = function parseSet() {
	        var tag = this.peekToken();
	        if (!this.skipSymbol('set')) {
	            this.fail('parseSet: expected set', tag.lineno, tag.colno);
	        }
	        var node = new nodes$3.Set(tag.lineno, tag.colno, []);
	        var target;
	        while(target = this.parsePrimary()){
	            node.targets.push(target);
	            if (!this.skip(lexer$1.TOKEN_COMMA)) {
	                break;
	            }
	        }
	        if (!this.skipValue(lexer$1.TOKEN_OPERATOR, '=')) {
	            if (!this.skip(lexer$1.TOKEN_BLOCK_END)) {
	                this.fail('parseSet: expected = or block end in set tag', tag.lineno, tag.colno);
	            } else {
	                node.body = new nodes$3.Capture(tag.lineno, tag.colno, this.parseUntilBlocks('endset'));
	                node.value = null;
	                this.advanceAfterBlockEnd();
	            }
	        } else {
	            node.value = this.parseExpression();
	            this.advanceAfterBlockEnd(tag.value);
	        }
	        return node;
	    };
	    _proto.parseSwitch = function parseSwitch() {
	        /*
	     * Store the tag names in variables in case someone ever wants to
	     * customize this.
	     */ var switchStart = 'switch';
	        var switchEnd = 'endswitch';
	        var caseStart = 'case';
	        var caseDefault = 'default';
	        // Get the switch tag.
	        var tag = this.peekToken();
	        // fail early if we get some unexpected tag.
	        if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
	            this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
	        }
	        // parse the switch expression
	        var expr = this.parseExpression();
	        // advance until a start of a case, a default case or an endswitch.
	        this.advanceAfterBlockEnd(switchStart);
	        this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
	        // this is the first case. it could also be an endswitch, we'll check.
	        var tok = this.peekToken();
	        // create new variables for our cases and default case.
	        var cases = [];
	        var defaultCase;
	        // while we're dealing with new cases nodes...
	        do {
	            // skip the start symbol and get the case expression
	            this.skipSymbol(caseStart);
	            var cond = this.parseExpression();
	            this.advanceAfterBlockEnd(switchStart);
	            // get the body of the case node and add it to the array of cases.
	            var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
	            cases.push(new nodes$3.Case(tok.line, tok.col, cond, body));
	            // get our next case
	            tok = this.peekToken();
	        }while (tok && tok.value === caseStart);
	        // we either have a default case or a switch end.
	        switch(tok.value){
	            case caseDefault:
	                this.advanceAfterBlockEnd();
	                defaultCase = this.parseUntilBlocks(switchEnd);
	                this.advanceAfterBlockEnd();
	                break;
	            case switchEnd:
	                this.advanceAfterBlockEnd();
	                break;
	            default:
	                // otherwise bail because EOF
	                this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
	        }
	        // and return the switch node.
	        return new nodes$3.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
	    };
	    _proto.parseStatement = function parseStatement() {
	        var tok = this.peekToken();
	        var node;
	        if (tok.type !== lexer$1.TOKEN_SYMBOL) {
	            this.fail('tag name expected', tok.lineno, tok.colno);
	        }
	        if (this.breakOnBlocks && lib$6.indexOf(this.breakOnBlocks, tok.value) !== -1) {
	            return null;
	        }
	        switch(tok.value){
	            case 'raw':
	                return this.parseRaw();
	            case 'verbatim':
	                return this.parseRaw('verbatim');
	            case 'if':
	            case 'ifAsync':
	                return this.parseIf();
	            case 'for':
	            case 'asyncEach':
	            case 'asyncAll':
	                return this.parseFor();
	            case 'block':
	                return this.parseBlock();
	            case 'extends':
	                return this.parseExtends();
	            case 'include':
	                return this.parseInclude();
	            case 'set':
	                return this.parseSet();
	            case 'macro':
	                return this.parseMacro();
	            case 'call':
	                return this.parseCall();
	            case 'import':
	                return this.parseImport();
	            case 'from':
	                return this.parseFrom();
	            case 'filter':
	                return this.parseFilterStatement();
	            case 'switch':
	                return this.parseSwitch();
	            default:
	                if (this.extensions.length) {
	                    for(var i = 0; i < this.extensions.length; i++){
	                        var ext = this.extensions[i];
	                        if (lib$6.indexOf(ext.tags || [], tok.value) !== -1) {
	                            return ext.parse(this, nodes$3, lexer$1);
	                        }
	                    }
	                }
	                this.fail('unknown block tag: ' + tok.value, tok.lineno, tok.colno);
	        }
	        return node;
	    };
	    _proto.parseRaw = function parseRaw(tagName) {
	        tagName = tagName || 'raw';
	        var endTagName = 'end' + tagName;
	        // Look for upcoming raw blocks (ignore all other kinds of blocks)
	        var rawBlockRegex = new RegExp('([\\s\\S]*?){%\\s*(' + tagName + '|' + endTagName + ')\\s*(?=%})%}');
	        var rawLevel = 1;
	        var str = '';
	        var matches = null;
	        // Skip opening raw token
	        // Keep this token to track line and column numbers
	        var begun = this.advanceAfterBlockEnd();
	        // Exit when there's nothing to match
	        // or when we've found the matching "endraw" block
	        while((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0){
	            var all = matches[0];
	            var pre = matches[1];
	            var blockName = matches[2];
	            // Adjust rawlevel
	            if (blockName === tagName) {
	                rawLevel += 1;
	            } else if (blockName === endTagName) {
	                rawLevel -= 1;
	            }
	            // Add to str
	            if (rawLevel === 0) {
	                // We want to exclude the last "endraw"
	                str += pre;
	                // Move tokenizer to beginning of endraw block
	                this.tokens.backN(all.length - pre.length);
	            } else {
	                str += all;
	            }
	        }
	        return new nodes$3.Output(begun.lineno, begun.colno, [
	            new nodes$3.TemplateData(begun.lineno, begun.colno, str)
	        ]);
	    };
	    _proto.parsePostfix = function parsePostfix(node) {
	        var lookup;
	        var tok = this.peekToken();
	        while(tok){
	            if (tok.type === lexer$1.TOKEN_LEFT_PAREN) {
	                // Function call
	                node = new nodes$3.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
	            } else if (tok.type === lexer$1.TOKEN_LEFT_BRACKET) {
	                // Reference
	                lookup = this.parseAggregate();
	                if (lookup.children.length > 1) {
	                    this.fail('invalid index');
	                }
	                node = new nodes$3.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
	            } else if (tok.type === lexer$1.TOKEN_OPERATOR && tok.value === '.') {
	                // Reference
	                this.nextToken();
	                var val = this.nextToken();
	                if (val.type !== lexer$1.TOKEN_SYMBOL) {
	                    this.fail('expected name as lookup value, got ' + val.value, val.lineno, val.colno);
	                }
	                // Make a literal string because it's not a variable
	                // reference
	                lookup = new nodes$3.Literal(val.lineno, val.colno, val.value);
	                node = new nodes$3.LookupVal(tok.lineno, tok.colno, node, lookup);
	            } else {
	                break;
	            }
	            tok = this.peekToken();
	        }
	        return node;
	    };
	    _proto.parseExpression = function parseExpression() {
	        var node = this.parseInlineIf();
	        return node;
	    };
	    _proto.parseInlineIf = function parseInlineIf() {
	        var node = this.parseOr();
	        if (this.skipSymbol('if')) {
	            var condNode = this.parseOr();
	            var bodyNode = node;
	            node = new nodes$3.InlineIf(node.lineno, node.colno);
	            node.body = bodyNode;
	            node.cond = condNode;
	            if (this.skipSymbol('else')) {
	                node.else_ = this.parseOr();
	            } else {
	                node.else_ = null;
	            }
	        }
	        return node;
	    };
	    _proto.parseOr = function parseOr() {
	        var node = this.parseAnd();
	        while(this.skipSymbol('or')){
	            var node2 = this.parseAnd();
	            node = new nodes$3.Or(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseAnd = function parseAnd() {
	        var node = this.parseNot();
	        while(this.skipSymbol('and')){
	            var node2 = this.parseNot();
	            node = new nodes$3.And(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseNot = function parseNot() {
	        var tok = this.peekToken();
	        if (this.skipSymbol('not')) {
	            return new nodes$3.Not(tok.lineno, tok.colno, this.parseNot());
	        }
	        return this.parseIn();
	    };
	    _proto.parseIn = function parseIn() {
	        var node = this.parseIs();
	        while(1){
	            // eslint-disable-line no-constant-condition
	            // check if the next token is 'not'
	            var tok = this.nextToken();
	            if (!tok) {
	                break;
	            }
	            var invert = tok.type === lexer$1.TOKEN_SYMBOL && tok.value === 'not';
	            // if it wasn't 'not', put it back
	            if (!invert) {
	                this.pushToken(tok);
	            }
	            if (this.skipSymbol('in')) {
	                var node2 = this.parseIs();
	                node = new nodes$3.In(node.lineno, node.colno, node, node2);
	                if (invert) {
	                    node = new nodes$3.Not(node.lineno, node.colno, node);
	                }
	            } else {
	                // if we'd found a 'not' but this wasn't an 'in', put back the 'not'
	                if (invert) {
	                    this.pushToken(tok);
	                }
	                break;
	            }
	        }
	        return node;
	    };
	    _proto.parseIs = function parseIs() {
	        var node = this.parseCompare();
	        // look for an is
	        if (this.skipSymbol('is')) {
	            // look for a not
	            var not = this.skipSymbol('not');
	            // get the next node
	            var node2 = this.parseCompare();
	            // create an Is node using the next node and the info from our Is node.
	            node = new nodes$3.Is(node.lineno, node.colno, node, node2);
	            // if we have a Not, create a Not node from our Is node.
	            if (not) {
	                node = new nodes$3.Not(node.lineno, node.colno, node);
	            }
	        }
	        // return the node.
	        return node;
	    };
	    _proto.parseCompare = function parseCompare() {
	        var compareOps = [
	            '==',
	            '===',
	            '!=',
	            '!==',
	            '<',
	            '>',
	            '<=',
	            '>='
	        ];
	        var expr = this.parseConcat();
	        var ops = [];
	        while(1){
	            // eslint-disable-line no-constant-condition
	            var tok = this.nextToken();
	            if (!tok) {
	                break;
	            } else if (compareOps.indexOf(tok.value) !== -1) {
	                ops.push(new nodes$3.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
	            } else {
	                this.pushToken(tok);
	                break;
	            }
	        }
	        if (ops.length) {
	            return new nodes$3.Compare(ops[0].lineno, ops[0].colno, expr, ops);
	        } else {
	            return expr;
	        }
	    };
	    _proto.parseConcat = function parseConcat() {
	        var node = this.parseAdd();
	        while(this.skipValue(lexer$1.TOKEN_TILDE, '~')){
	            var node2 = this.parseAdd();
	            node = new nodes$3.Concat(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseAdd = function parseAdd() {
	        var node = this.parseSub();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '+')){
	            var node2 = this.parseSub();
	            node = new nodes$3.Add(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseSub = function parseSub() {
	        var node = this.parseMul();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '-')){
	            var node2 = this.parseMul();
	            node = new nodes$3.Sub(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseMul = function parseMul() {
	        var node = this.parseDiv();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '*')){
	            var node2 = this.parseDiv();
	            node = new nodes$3.Mul(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseDiv = function parseDiv() {
	        var node = this.parseFloorDiv();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '/')){
	            var node2 = this.parseFloorDiv();
	            node = new nodes$3.Div(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseFloorDiv = function parseFloorDiv() {
	        var node = this.parseMod();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '//')){
	            var node2 = this.parseMod();
	            node = new nodes$3.FloorDiv(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseMod = function parseMod() {
	        var node = this.parsePow();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '%')){
	            var node2 = this.parsePow();
	            node = new nodes$3.Mod(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parsePow = function parsePow() {
	        var node = this.parseUnary();
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '**')){
	            var node2 = this.parseUnary();
	            node = new nodes$3.Pow(node.lineno, node.colno, node, node2);
	        }
	        return node;
	    };
	    _proto.parseUnary = function parseUnary(noFilters) {
	        var tok = this.peekToken();
	        var node;
	        if (this.skipValue(lexer$1.TOKEN_OPERATOR, '-')) {
	            node = new nodes$3.Neg(tok.lineno, tok.colno, this.parseUnary(true));
	        } else if (this.skipValue(lexer$1.TOKEN_OPERATOR, '+')) {
	            node = new nodes$3.Pos(tok.lineno, tok.colno, this.parseUnary(true));
	        } else {
	            node = this.parsePrimary();
	        }
	        if (!noFilters) {
	            node = this.parseFilter(node);
	        }
	        return node;
	    };
	    _proto.parsePrimary = function parsePrimary(noPostfix) {
	        var tok = this.nextToken();
	        var val;
	        var node = null;
	        if (!tok) {
	            this.fail('expected expression, got end of file');
	        } else if (tok.type === lexer$1.TOKEN_STRING) {
	            val = tok.value;
	        } else if (tok.type === lexer$1.TOKEN_INT) {
	            val = parseInt(tok.value, 10);
	        } else if (tok.type === lexer$1.TOKEN_FLOAT) {
	            val = parseFloat(tok.value);
	        } else if (tok.type === lexer$1.TOKEN_BOOLEAN) {
	            if (tok.value === 'true') {
	                val = true;
	            } else if (tok.value === 'false') {
	                val = false;
	            } else {
	                this.fail('invalid boolean: ' + tok.value, tok.lineno, tok.colno);
	            }
	        } else if (tok.type === lexer$1.TOKEN_NONE) {
	            val = null;
	        } else if (tok.type === lexer$1.TOKEN_REGEX) {
	            val = new RegExp(tok.value.body, tok.value.flags);
	        }
	        if (val !== undefined) {
	            node = new nodes$3.Literal(tok.lineno, tok.colno, val);
	        } else if (tok.type === lexer$1.TOKEN_SYMBOL) {
	            node = new nodes$3.Symbol(tok.lineno, tok.colno, tok.value);
	        } else {
	            // See if it's an aggregate type, we need to push the
	            // current delimiter token back on
	            this.pushToken(tok);
	            node = this.parseAggregate();
	        }
	        if (!noPostfix) {
	            node = this.parsePostfix(node);
	        }
	        if (node) {
	            return node;
	        } else {
	            throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
	        }
	    };
	    _proto.parseFilterName = function parseFilterName() {
	        var tok = this.expect(lexer$1.TOKEN_SYMBOL);
	        var name = tok.value;
	        while(this.skipValue(lexer$1.TOKEN_OPERATOR, '.')){
	            name += '.' + this.expect(lexer$1.TOKEN_SYMBOL).value;
	        }
	        return new nodes$3.Symbol(tok.lineno, tok.colno, name);
	    };
	    _proto.parseFilterArgs = function parseFilterArgs(node) {
	        if (this.peekToken().type === lexer$1.TOKEN_LEFT_PAREN) {
	            // Get a FunCall node and add the parameters to the
	            // filter
	            var call = this.parsePostfix(node);
	            return call.args.children;
	        }
	        return [];
	    };
	    _proto.parseFilter = function parseFilter(node) {
	        while(this.skip(lexer$1.TOKEN_PIPE)){
	            var name = this.parseFilterName();
	            node = new nodes$3.Filter(name.lineno, name.colno, name, new nodes$3.NodeList(name.lineno, name.colno, [
	                node
	            ].concat(this.parseFilterArgs(node))));
	        }
	        return node;
	    };
	    _proto.parseFilterStatement = function parseFilterStatement() {
	        var filterTok = this.peekToken();
	        if (!this.skipSymbol('filter')) {
	            this.fail('parseFilterStatement: expected filter');
	        }
	        var name = this.parseFilterName();
	        var args = this.parseFilterArgs(name);
	        this.advanceAfterBlockEnd(filterTok.value);
	        var body = new nodes$3.Capture(name.lineno, name.colno, this.parseUntilBlocks('endfilter'));
	        this.advanceAfterBlockEnd();
	        var node = new nodes$3.Filter(name.lineno, name.colno, name, new nodes$3.NodeList(name.lineno, name.colno, [
	            body
	        ].concat(args)));
	        return new nodes$3.Output(name.lineno, name.colno, [
	            node
	        ]);
	    };
	    _proto.parseAggregate = function parseAggregate() {
	        var tok = this.nextToken();
	        var node;
	        switch(tok.type){
	            case lexer$1.TOKEN_LEFT_PAREN:
	                node = new nodes$3.Group(tok.lineno, tok.colno);
	                break;
	            case lexer$1.TOKEN_LEFT_BRACKET:
	                node = new nodes$3.Array(tok.lineno, tok.colno);
	                break;
	            case lexer$1.TOKEN_LEFT_CURLY:
	                node = new nodes$3.Dict(tok.lineno, tok.colno);
	                break;
	            default:
	                return null;
	        }
	        while(1){
	            // eslint-disable-line no-constant-condition
	            var type = this.peekToken().type;
	            if (type === lexer$1.TOKEN_RIGHT_PAREN || type === lexer$1.TOKEN_RIGHT_BRACKET || type === lexer$1.TOKEN_RIGHT_CURLY) {
	                this.nextToken();
	                break;
	            }
	            if (node.children.length > 0) {
	                if (!this.skip(lexer$1.TOKEN_COMMA)) {
	                    this.fail('parseAggregate: expected comma after expression', tok.lineno, tok.colno);
	                }
	            }
	            if (_instanceof$a(node, nodes$3.Dict)) {
	                // TODO: check for errors
	                var key = this.parsePrimary();
	                // We expect a key/value pair for dicts, separated by a
	                // colon
	                if (!this.skip(lexer$1.TOKEN_COLON)) {
	                    this.fail('parseAggregate: expected colon after dict key', tok.lineno, tok.colno);
	                }
	                // TODO: check for errors
	                var value = this.parseExpression();
	                node.addChild(new nodes$3.Pair(key.lineno, key.colno, key, value));
	            } else {
	                // TODO: check for errors
	                var expr = this.parseExpression();
	                node.addChild(expr);
	            }
	        }
	        return node;
	    };
	    _proto.parseSignature = function parseSignature(tolerant, noParens) {
	        var tok = this.peekToken();
	        if (!noParens && tok.type !== lexer$1.TOKEN_LEFT_PAREN) {
	            if (tolerant) {
	                return null;
	            } else {
	                this.fail('expected arguments', tok.lineno, tok.colno);
	            }
	        }
	        if (tok.type === lexer$1.TOKEN_LEFT_PAREN) {
	            tok = this.nextToken();
	        }
	        var args = new nodes$3.NodeList(tok.lineno, tok.colno);
	        var kwargs = new nodes$3.KeywordArgs(tok.lineno, tok.colno);
	        var checkComma = false;
	        while(1){
	            // eslint-disable-line no-constant-condition
	            tok = this.peekToken();
	            if (!noParens && tok.type === lexer$1.TOKEN_RIGHT_PAREN) {
	                this.nextToken();
	                break;
	            } else if (noParens && tok.type === lexer$1.TOKEN_BLOCK_END) {
	                break;
	            }
	            if (checkComma && !this.skip(lexer$1.TOKEN_COMMA)) {
	                this.fail('parseSignature: expected comma after expression', tok.lineno, tok.colno);
	            } else {
	                var arg = this.parseExpression();
	                if (this.skipValue(lexer$1.TOKEN_OPERATOR, '=')) {
	                    kwargs.addChild(new nodes$3.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
	                } else {
	                    args.addChild(arg);
	                }
	            }
	            checkComma = true;
	        }
	        if (kwargs.children.length) {
	            args.addChild(kwargs);
	        }
	        return args;
	    };
	    _proto.parseUntilBlocks = function parseUntilBlocks() {
	        var prev = this.breakOnBlocks;
	        for(var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++){
	            blockNames[_key] = arguments[_key];
	        }
	        this.breakOnBlocks = blockNames;
	        var ret = this.parse();
	        this.breakOnBlocks = prev;
	        return ret;
	    };
	    _proto.parseNodes = function parseNodes() {
	        var tok;
	        var buf = [];
	        while(tok = this.nextToken()){
	            if (tok.type === lexer$1.TOKEN_DATA) {
	                var data = tok.value;
	                var nextToken = this.peekToken();
	                var nextVal = nextToken && nextToken.value;
	                // If the last token has "-" we need to trim the
	                // leading whitespace of the data. This is marked with
	                // the `dropLeadingWhitespace` variable.
	                if (this.dropLeadingWhitespace) {
	                    // TODO: this could be optimized (don't use regex)
	                    data = data.replace(/^\s*/, '');
	                    this.dropLeadingWhitespace = false;
	                }
	                // Same for the succeeding block start token
	                if (nextToken && (nextToken.type === lexer$1.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === '-' || nextToken.type === lexer$1.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === '-' || nextToken.type === lexer$1.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === '-')) {
	                    // TODO: this could be optimized (don't use regex)
	                    data = data.replace(/\s*$/, '');
	                }
	                buf.push(new nodes$3.Output(tok.lineno, tok.colno, [
	                    new nodes$3.TemplateData(tok.lineno, tok.colno, data)
	                ]));
	            } else if (tok.type === lexer$1.TOKEN_BLOCK_START) {
	                this.dropLeadingWhitespace = false;
	                var n = this.parseStatement();
	                if (!n) {
	                    break;
	                }
	                buf.push(n);
	            } else if (tok.type === lexer$1.TOKEN_VARIABLE_START) {
	                var e = this.parseExpression();
	                this.dropLeadingWhitespace = false;
	                this.advanceAfterVariableEnd();
	                buf.push(new nodes$3.Output(tok.lineno, tok.colno, [
	                    e
	                ]));
	            } else if (tok.type === lexer$1.TOKEN_COMMENT) {
	                this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === '-';
	            } else {
	                // Ignore comments, otherwise this should be an error
	                this.fail('Unexpected token at top-level: ' + tok.type, tok.lineno, tok.colno);
	            }
	        }
	        return buf;
	    };
	    _proto.parse = function parse() {
	        return new nodes$3.NodeList(0, 0, this.parseNodes());
	    };
	    _proto.parseAsRoot = function parseAsRoot() {
	        return new nodes$3.Root(0, 0, this.parseNodes());
	    };
	    return Parser;
	}(Obj$2); // var util = require('util');
	// var l = lexer.lex('{%- if x -%}\n hello {% endif %}');
	// var t;
	// while((t = l.nextToken())) {
	//     console.log(util.inspect(t));
	// }
	// var p = new Parser(lexer.lex('hello {% filter title %}' +
	//                              'Hello madam how are you' +
	//                              '{% endfilter %}'));
	// var n = p.parseAsRoot();
	// nodes.printNodes(n);
	var parser$2 = {
	    parse: function parse(src, extensions, opts) {
	        var p = new Parser(lexer$1.lex(src, opts));
	        if (extensions !== undefined) {
	            p.extensions = extensions;
	        }
	        return p.parseAsRoot();
	    },
	    Parser: Parser
	};

	function _instanceof$9(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	var nodes$2 = nodes$4;
	var lib$5 = libExports;
	var sym = 0;
	function gensym() {
	    return 'hole_' + sym++;
	}
	// copy-on-write version of map
	function mapCOW(arr, func) {
	    var res = null;
	    for(var i = 0; i < arr.length; i++){
	        var item = func(arr[i]);
	        if (item !== arr[i]) {
	            if (!res) {
	                res = arr.slice();
	            }
	            res[i] = item;
	        }
	    }
	    return res || arr;
	}
	function walk(ast, func, depthFirst) {
	    if (!_instanceof$9(ast, nodes$2.Node)) {
	        return ast;
	    }
	    if (!depthFirst) {
	        var astT = func(ast);
	        if (astT && astT !== ast) {
	            return astT;
	        }
	    }
	    if (_instanceof$9(ast, nodes$2.NodeList)) {
	        var children = mapCOW(ast.children, function(node) {
	            return walk(node, func, depthFirst);
	        });
	        if (children !== ast.children) {
	            ast = new nodes$2[ast.typename](ast.lineno, ast.colno, children);
	        }
	    } else if (_instanceof$9(ast, nodes$2.CallExtension)) {
	        var args = walk(ast.args, func, depthFirst);
	        var contentArgs = mapCOW(ast.contentArgs, function(node) {
	            return walk(node, func, depthFirst);
	        });
	        if (args !== ast.args || contentArgs !== ast.contentArgs) {
	            ast = new nodes$2[ast.typename](ast.extName, ast.prop, args, contentArgs);
	        }
	    } else {
	        var props = ast.fields.map(function(field) {
	            return ast[field];
	        });
	        var propsT = mapCOW(props, function(prop) {
	            return walk(prop, func, depthFirst);
	        });
	        if (propsT !== props) {
	            ast = new nodes$2[ast.typename](ast.lineno, ast.colno);
	            propsT.forEach(function(prop, i) {
	                ast[ast.fields[i]] = prop;
	            });
	        }
	    }
	    return depthFirst ? func(ast) || ast : ast;
	}
	function depthWalk(ast, func) {
	    return walk(ast, func, true);
	}
	function _liftFilters(node, asyncFilters, prop) {
	    var children = [];
	    var walked = depthWalk(prop ? node[prop] : node, function(descNode) {
	        var symbol;
	        if (_instanceof$9(descNode, nodes$2.Block)) {
	            return descNode;
	        } else if (_instanceof$9(descNode, nodes$2.Filter) && lib$5.indexOf(asyncFilters, descNode.name.value) !== -1 || _instanceof$9(descNode, nodes$2.CallExtensionAsync)) {
	            symbol = new nodes$2.Symbol(descNode.lineno, descNode.colno, gensym());
	            children.push(new nodes$2.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
	        }
	        return symbol;
	    });
	    if (prop) {
	        node[prop] = walked;
	    } else {
	        node = walked;
	    }
	    if (children.length) {
	        children.push(node);
	        return new nodes$2.NodeList(node.lineno, node.colno, children);
	    } else {
	        return node;
	    }
	}
	function liftFilters(ast, asyncFilters) {
	    return depthWalk(ast, function(node) {
	        if (_instanceof$9(node, nodes$2.Output)) {
	            return _liftFilters(node, asyncFilters);
	        } else if (_instanceof$9(node, nodes$2.Set)) {
	            return _liftFilters(node, asyncFilters, 'value');
	        } else if (_instanceof$9(node, nodes$2.For)) {
	            return _liftFilters(node, asyncFilters, 'arr');
	        } else if (_instanceof$9(node, nodes$2.If)) {
	            return _liftFilters(node, asyncFilters, 'cond');
	        } else if (_instanceof$9(node, nodes$2.CallExtension)) {
	            return _liftFilters(node, asyncFilters, 'args');
	        } else {
	            return undefined;
	        }
	    });
	}
	function liftSuper(ast) {
	    return walk(ast, function(blockNode) {
	        if (!_instanceof$9(blockNode, nodes$2.Block)) {
	            return;
	        }
	        var hasSuper = false;
	        var symbol = gensym();
	        blockNode.body = walk(blockNode.body, function(node) {
	            // eslint-disable-line consistent-return
	            if (_instanceof$9(node, nodes$2.FunCall) && node.name.value === 'super') {
	                hasSuper = true;
	                return new nodes$2.Symbol(node.lineno, node.colno, symbol);
	            }
	        });
	        if (hasSuper) {
	            blockNode.body.children.unshift(new nodes$2.Super(0, 0, blockNode.name, new nodes$2.Symbol(0, 0, symbol)));
	        }
	    });
	}
	function convertStatements(ast) {
	    return depthWalk(ast, function(node) {
	        if (!_instanceof$9(node, nodes$2.If) && !_instanceof$9(node, nodes$2.For)) {
	            return undefined;
	        }
	        var async = false;
	        walk(node, function(child) {
	            if (_instanceof$9(child, nodes$2.FilterAsync) || _instanceof$9(child, nodes$2.IfAsync) || _instanceof$9(child, nodes$2.AsyncEach) || _instanceof$9(child, nodes$2.AsyncAll) || _instanceof$9(child, nodes$2.CallExtensionAsync)) {
	                async = true;
	                // Stop iterating by returning the node
	                return child;
	            }
	            return undefined;
	        });
	        if (async) {
	            if (_instanceof$9(node, nodes$2.If)) {
	                return new nodes$2.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
	            } else if (_instanceof$9(node, nodes$2.For) && !_instanceof$9(node, nodes$2.AsyncAll)) {
	                return new nodes$2.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
	            }
	        }
	        return undefined;
	    });
	}
	function cps(ast, asyncFilters) {
	    return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
	}
	function transform(ast, asyncFilters) {
	    return cps(ast, asyncFilters || []);
	}
	// var parser = require('./parser');
	// var src = 'hello {% foo %}{% endfoo %} end';
	// var ast = transform(parser.parse(src, [new FooExtension()]), ['bar']);
	// nodes.printNodes(ast);
	var transformer$1 = {
	    transform: transform
	};

	function _instanceof$8(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function _type_of$2(obj) {
	    "@swc/helpers - typeof";
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
	}
	var lib$4 = libExports;
	var arrayFrom = Array.from;
	var supportsIterators = typeof Symbol === 'function' && Symbol.iterator && typeof arrayFrom === 'function';
	// Frames keep track of scoping both at compile-time and run-time so
	// we know how to access variables. Block tags can introduce special
	// variables, for example.
	var Frame$2 = /*#__PURE__*/ function() {
	    function Frame(parent, isolateWrites) {
	        this.variables = Object.create(null);
	        this.parent = parent;
	        this.topLevel = false;
	        // if this is true, writes (set) should never propagate upwards past
	        // this frame to its parent (though reads may).
	        this.isolateWrites = isolateWrites;
	    }
	    var _proto = Frame.prototype;
	    _proto.set = function set(name, val, resolveUp) {
	        // Allow variables with dots by automatically creating the
	        // nested structure
	        var parts = name.split('.');
	        var obj = this.variables;
	        var frame = this;
	        if (resolveUp) {
	            if (frame = this.resolve(parts[0], true)) {
	                frame.set(name, val);
	                return;
	            }
	        }
	        for(var i = 0; i < parts.length - 1; i++){
	            var id = parts[i];
	            if (!obj[id]) {
	                obj[id] = {};
	            }
	            obj = obj[id];
	        }
	        obj[parts[parts.length - 1]] = val;
	    };
	    _proto.get = function get(name) {
	        var val = this.variables[name];
	        if (val !== undefined) {
	            return val;
	        }
	        return null;
	    };
	    _proto.lookup = function lookup(name) {
	        var p = this.parent;
	        var val = this.variables[name];
	        if (val !== undefined) {
	            return val;
	        }
	        return p && p.lookup(name);
	    };
	    _proto.resolve = function resolve(name, forWrite) {
	        var p = forWrite && this.isolateWrites ? undefined : this.parent;
	        var val = this.variables[name];
	        if (val !== undefined) {
	            return this;
	        }
	        return p && p.resolve(name);
	    };
	    _proto.push = function push(isolateWrites) {
	        return new Frame(this, isolateWrites);
	    };
	    _proto.pop = function pop() {
	        return this.parent;
	    };
	    return Frame;
	}();
	function makeMacro(argNames, kwargNames, func) {
	    return function macro() {
	        for(var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++){
	            macroArgs[_key] = arguments[_key];
	        }
	        var argCount = numArgs(macroArgs);
	        var args;
	        var kwargs = getKeywordArgs(macroArgs);
	        if (argCount > argNames.length) {
	            args = macroArgs.slice(0, argNames.length);
	            // Positional arguments that should be passed in as
	            // keyword arguments (essentially default values)
	            macroArgs.slice(args.length, argCount).forEach(function(val, i) {
	                if (i < kwargNames.length) {
	                    kwargs[kwargNames[i]] = val;
	                }
	            });
	            args.push(kwargs);
	        } else if (argCount < argNames.length) {
	            args = macroArgs.slice(0, argCount);
	            for(var i = argCount; i < argNames.length; i++){
	                var arg = argNames[i];
	                // Keyword arguments that should be passed as
	                // positional arguments, i.e. the caller explicitly
	                // used the name of a positional arg
	                args.push(kwargs[arg]);
	                delete kwargs[arg];
	            }
	            args.push(kwargs);
	        } else {
	            args = macroArgs;
	        }
	        return func.apply(this, args);
	    };
	}
	function makeKeywordArgs(obj) {
	    obj.__keywords = true;
	    return obj;
	}
	function isKeywordArgs(obj) {
	    return obj && Object.prototype.hasOwnProperty.call(obj, '__keywords');
	}
	function getKeywordArgs(args) {
	    var len = args.length;
	    if (len) {
	        var lastArg = args[len - 1];
	        if (isKeywordArgs(lastArg)) {
	            return lastArg;
	        }
	    }
	    return {};
	}
	function numArgs(args) {
	    var len = args.length;
	    if (len === 0) {
	        return 0;
	    }
	    var lastArg = args[len - 1];
	    if (isKeywordArgs(lastArg)) {
	        return len - 1;
	    } else {
	        return len;
	    }
	}
	// A SafeString object indicates that the string should not be
	// autoescaped. This happens magically because autoescaping only
	// occurs on primitive string objects.
	function SafeString(val) {
	    if (typeof val !== 'string') {
	        return val;
	    }
	    this.val = val;
	    this.length = val.length;
	}
	SafeString.prototype = Object.create(String.prototype, {
	    length: {
	        writable: true,
	        configurable: true,
	        value: 0
	    }
	});
	SafeString.prototype.valueOf = function valueOf() {
	    return this.val;
	};
	SafeString.prototype.toString = function toString() {
	    return this.val;
	};
	function copySafeness(dest, target) {
	    if (_instanceof$8(dest, SafeString)) {
	        return new SafeString(target);
	    }
	    return target.toString();
	}
	function markSafe(val) {
	    var type = typeof val === "undefined" ? "undefined" : _type_of$2(val);
	    if (type === 'string') {
	        return new SafeString(val);
	    } else if (type !== 'function') {
	        return val;
	    } else {
	        return function wrapSafe(args) {
	            var ret = val.apply(this, arguments);
	            if (typeof ret === 'string') {
	                return new SafeString(ret);
	            }
	            return ret;
	        };
	    }
	}
	function suppressValue(val, autoescape) {
	    val = val !== undefined && val !== null ? val : '';
	    if (autoescape && !_instanceof$8(val, SafeString)) {
	        val = lib$4.escape(val.toString());
	    }
	    return val;
	}
	function ensureDefined(val, lineno, colno) {
	    if (val === null || val === undefined) {
	        throw new lib$4.TemplateError('attempted to output null or undefined value', lineno + 1, colno + 1);
	    }
	    return val;
	}
	function memberLookup(obj, val) {
	    if (obj === undefined || obj === null) {
	        return undefined;
	    }
	    if (typeof obj[val] === 'function') {
	        return function() {
	            for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
	                args[_key2] = arguments[_key2];
	            }
	            return obj[val].apply(obj, args);
	        };
	    }
	    return obj[val];
	}
	function callWrap(obj, name, context, args) {
	    if (!obj) {
	        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
	    } else if (typeof obj !== 'function') {
	        throw new Error('Unable to call `' + name + '`, which is not a function');
	    }
	    return obj.apply(context, args);
	}
	function contextOrFrameLookup(context, frame, name) {
	    var val = frame.lookup(name);
	    return val !== undefined ? val : context.lookup(name);
	}
	function handleError$1(error, lineno, colno) {
	    if (error.lineno) {
	        return error;
	    } else {
	        return new lib$4.TemplateError(error, lineno, colno);
	    }
	}
	function asyncEach(arr, dimen, iter, cb) {
	    if (lib$4.isArray(arr)) {
	        var len = arr.length;
	        lib$4.asyncIter(arr, function iterCallback(item, i, next) {
	            switch(dimen){
	                case 1:
	                    iter(item, i, len, next);
	                    break;
	                case 2:
	                    iter(item[0], item[1], i, len, next);
	                    break;
	                case 3:
	                    iter(item[0], item[1], item[2], i, len, next);
	                    break;
	                default:
	                    item.push(i, len, next);
	                    iter.apply(this, item);
	            }
	        }, cb);
	    } else {
	        lib$4.asyncFor(arr, function iterCallback(key, val, i, len, next) {
	            iter(key, val, i, len, next);
	        }, cb);
	    }
	}
	function asyncAll(arr, dimen, func, cb) {
	    var finished = 0;
	    var len;
	    var outputArr;
	    function done(i, output) {
	        finished++;
	        outputArr[i] = output;
	        if (finished === len) {
	            cb(null, outputArr.join(''));
	        }
	    }
	    if (lib$4.isArray(arr)) {
	        len = arr.length;
	        outputArr = new Array(len);
	        if (len === 0) {
	            cb(null, '');
	        } else {
	            for(var i = 0; i < arr.length; i++){
	                var item = arr[i];
	                switch(dimen){
	                    case 1:
	                        func(item, i, len, done);
	                        break;
	                    case 2:
	                        func(item[0], item[1], i, len, done);
	                        break;
	                    case 3:
	                        func(item[0], item[1], item[2], i, len, done);
	                        break;
	                    default:
	                        item.push(i, len, done);
	                        func.apply(this, item);
	                }
	            }
	        }
	    } else {
	        var keys = lib$4.keys(arr || {});
	        len = keys.length;
	        outputArr = new Array(len);
	        if (len === 0) {
	            cb(null, '');
	        } else {
	            for(var _i = 0; _i < keys.length; _i++){
	                var k = keys[_i];
	                func(k, arr[k], _i, len, done);
	            }
	        }
	    }
	}
	function fromIterator(arr) {
	    if ((typeof arr === "undefined" ? "undefined" : _type_of$2(arr)) !== 'object' || arr === null || lib$4.isArray(arr)) {
	        return arr;
	    } else if (supportsIterators && Symbol.iterator in arr) {
	        return arrayFrom(arr);
	    } else {
	        return arr;
	    }
	}
	var runtime$1 = {
	    Frame: Frame$2,
	    makeMacro: makeMacro,
	    makeKeywordArgs: makeKeywordArgs,
	    numArgs: numArgs,
	    suppressValue: suppressValue,
	    ensureDefined: ensureDefined,
	    memberLookup: memberLookup,
	    contextOrFrameLookup: contextOrFrameLookup,
	    callWrap: callWrap,
	    handleError: handleError$1,
	    isArray: lib$4.isArray,
	    keys: lib$4.keys,
	    SafeString: SafeString,
	    copySafeness: copySafeness,
	    markSafe: markSafe,
	    asyncEach: asyncEach,
	    asyncAll: asyncAll,
	    inOperator: lib$4.inOperator,
	    fromIterator: fromIterator
	};

	function _instanceof$7(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function _inheritsLoose$4(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$4(subClass, superClass);
	}
	function _setPrototypeOf$4(o, p) {
	    _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$4(o, p);
	}
	var parser$1 = parser$2;
	var transformer = transformer$1;
	var nodes$1 = nodes$4;
	var _require$5 = libExports, TemplateError = _require$5.TemplateError;
	var _require2$2 = runtime$1, Frame$1 = _require2$2.Frame;
	var _require3 = object, Obj$1 = _require3.Obj;
	// These are all the same for now, but shouldn't be passed straight
	// through
	var compareOps = {
	    '==': '==',
	    '===': '===',
	    '!=': '!=',
	    '!==': '!==',
	    '<': '<',
	    '>': '>',
	    '<=': '<=',
	    '>=': '>='
	};
	var Compiler = /*#__PURE__*/ function(_Obj) {
	    _inheritsLoose$4(Compiler, _Obj);
	    function Compiler() {
	        return _Obj.apply(this, arguments) || this;
	    }
	    var _proto = Compiler.prototype;
	    _proto.init = function init(templateName, throwOnUndefined) {
	        this.templateName = templateName;
	        this.codebuf = [];
	        this.lastId = 0;
	        this.buffer = null;
	        this.bufferStack = [];
	        this._scopeClosers = '';
	        this.inBlock = false;
	        this.throwOnUndefined = throwOnUndefined;
	    };
	    _proto.fail = function fail(msg, lineno, colno) {
	        if (lineno !== undefined) {
	            lineno += 1;
	        }
	        if (colno !== undefined) {
	            colno += 1;
	        }
	        throw new TemplateError(msg, lineno, colno);
	    };
	    _proto._pushBuffer = function _pushBuffer() {
	        var id = this._tmpid();
	        this.bufferStack.push(this.buffer);
	        this.buffer = id;
	        this._emit("var " + this.buffer + " = \"\";");
	        return id;
	    };
	    _proto._popBuffer = function _popBuffer() {
	        this.buffer = this.bufferStack.pop();
	    };
	    _proto._emit = function _emit(code) {
	        this.codebuf.push(code);
	    };
	    _proto._emitLine = function _emitLine(code) {
	        this._emit(code + '\n');
	    };
	    _proto._emitLines = function _emitLines() {
	        var _this = this;
	        for(var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++){
	            lines[_key] = arguments[_key];
	        }
	        lines.forEach(function(line) {
	            return _this._emitLine(line);
	        });
	    };
	    _proto._emitFuncBegin = function _emitFuncBegin(node, name) {
	        this.buffer = 'output';
	        this._scopeClosers = '';
	        this._emitLine("function " + name + "(env, context, frame, runtime, cb) {");
	        this._emitLine("var lineno = " + node.lineno + ";");
	        this._emitLine("var colno = " + node.colno + ";");
	        this._emitLine("var " + this.buffer + " = \"\";");
	        this._emitLine('try {');
	    };
	    _proto._emitFuncEnd = function _emitFuncEnd(noReturn) {
	        if (!noReturn) {
	            this._emitLine('cb(null, ' + this.buffer + ');');
	        }
	        this._closeScopeLevels();
	        this._emitLine('} catch (e) {');
	        this._emitLine('  cb(runtime.handleError(e, lineno, colno));');
	        this._emitLine('}');
	        this._emitLine('}');
	        this.buffer = null;
	    };
	    _proto._addScopeLevel = function _addScopeLevel() {
	        this._scopeClosers += '})';
	    };
	    _proto._closeScopeLevels = function _closeScopeLevels() {
	        this._emitLine(this._scopeClosers + ';');
	        this._scopeClosers = '';
	    };
	    _proto._withScopedSyntax = function _withScopedSyntax(func) {
	        var _scopeClosers = this._scopeClosers;
	        this._scopeClosers = '';
	        func.call(this);
	        this._closeScopeLevels();
	        this._scopeClosers = _scopeClosers;
	    };
	    _proto._makeCallback = function _makeCallback(res) {
	        var err = this._tmpid();
	        return 'function(' + err + (res ? ',' + res : '') + ') {\n' + 'if(' + err + ') { cb(' + err + '); return; }';
	    };
	    _proto._tmpid = function _tmpid() {
	        this.lastId++;
	        return 't_' + this.lastId;
	    };
	    _proto._templateName = function _templateName() {
	        return this.templateName == null ? 'undefined' : JSON.stringify(this.templateName);
	    };
	    _proto._compileChildren = function _compileChildren(node, frame) {
	        var _this2 = this;
	        node.children.forEach(function(child) {
	            _this2.compile(child, frame);
	        });
	    };
	    _proto._compileAggregate = function _compileAggregate(node, frame, startChar, endChar) {
	        var _this3 = this;
	        if (startChar) {
	            this._emit(startChar);
	        }
	        node.children.forEach(function(child, i) {
	            if (i > 0) {
	                _this3._emit(',');
	            }
	            _this3.compile(child, frame);
	        });
	        if (endChar) {
	            this._emit(endChar);
	        }
	    };
	    _proto._compileExpression = function _compileExpression(node, frame) {
	        // TODO: I'm not really sure if this type check is worth it or
	        // not.
	        this.assertType(node, nodes$1.Literal, nodes$1.Symbol, nodes$1.Group, nodes$1.Array, nodes$1.Dict, nodes$1.FunCall, nodes$1.Caller, nodes$1.Filter, nodes$1.LookupVal, nodes$1.Compare, nodes$1.InlineIf, nodes$1.In, nodes$1.Is, nodes$1.And, nodes$1.Or, nodes$1.Not, nodes$1.Add, nodes$1.Concat, nodes$1.Sub, nodes$1.Mul, nodes$1.Div, nodes$1.FloorDiv, nodes$1.Mod, nodes$1.Pow, nodes$1.Neg, nodes$1.Pos, nodes$1.Compare, nodes$1.NodeList);
	        this.compile(node, frame);
	    };
	    _proto.assertType = function assertType(node) {
	        for(var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
	            types[_key2 - 1] = arguments[_key2];
	        }
	        if (!types.some(function(t) {
	            return _instanceof$7(node, t);
	        })) {
	            this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
	        }
	    };
	    _proto.compileCallExtension = function compileCallExtension(node, frame, async) {
	        var _this4 = this;
	        var args = node.args;
	        var contentArgs = node.contentArgs;
	        var autoescape = typeof node.autoescape === 'boolean' ? node.autoescape : true;
	        if (!async) {
	            this._emit(this.buffer + " += runtime.suppressValue(");
	        }
	        this._emit("env.getExtension(\"" + node.extName + "\")[\"" + node.prop + "\"](");
	        this._emit('context');
	        if (args || contentArgs) {
	            this._emit(',');
	        }
	        if (args) {
	            if (!_instanceof$7(args, nodes$1.NodeList)) {
	                this.fail('compileCallExtension: arguments must be a NodeList, ' + 'use `parser.parseSignature`');
	            }
	            args.children.forEach(function(arg, i) {
	                // Tag arguments are passed normally to the call. Note
	                // that keyword arguments are turned into a single js
	                // object as the last argument, if they exist.
	                _this4._compileExpression(arg, frame);
	                if (i !== args.children.length - 1 || contentArgs.length) {
	                    _this4._emit(',');
	                }
	            });
	        }
	        if (contentArgs.length) {
	            contentArgs.forEach(function(arg, i) {
	                if (i > 0) {
	                    _this4._emit(',');
	                }
	                if (arg) {
	                    _this4._emitLine('function(cb) {');
	                    _this4._emitLine('if(!cb) { cb = function(err) { if(err) { throw err; }}}');
	                    var id = _this4._pushBuffer();
	                    _this4._withScopedSyntax(function() {
	                        _this4.compile(arg, frame);
	                        _this4._emitLine("cb(null, " + id + ");");
	                    });
	                    _this4._popBuffer();
	                    _this4._emitLine("return " + id + ";");
	                    _this4._emitLine('}');
	                } else {
	                    _this4._emit('null');
	                }
	            });
	        }
	        if (async) {
	            var res = this._tmpid();
	            this._emitLine(', ' + this._makeCallback(res));
	            this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");
	            this._addScopeLevel();
	        } else {
	            this._emit(')');
	            this._emit(", " + autoescape + " && env.opts.autoescape);\n");
	        }
	    };
	    _proto.compileCallExtensionAsync = function compileCallExtensionAsync(node, frame) {
	        this.compileCallExtension(node, frame, true);
	    };
	    _proto.compileNodeList = function compileNodeList(node, frame) {
	        this._compileChildren(node, frame);
	    };
	    _proto.compileLiteral = function compileLiteral(node) {
	        if (typeof node.value === 'string') {
	            var val = node.value.replace(/\\/g, '\\\\');
	            val = val.replace(/"/g, '\\"');
	            val = val.replace(/\n/g, '\\n');
	            val = val.replace(/\r/g, '\\r');
	            val = val.replace(/\t/g, '\\t');
	            val = val.replace(/\u2028/g, "\\u2028");
	            this._emit("\"" + val + "\"");
	        } else if (node.value === null) {
	            this._emit('null');
	        } else {
	            this._emit(node.value.toString());
	        }
	    };
	    _proto.compileSymbol = function compileSymbol(node, frame) {
	        var name = node.value;
	        var v = frame.lookup(name);
	        if (v) {
	            this._emit(v);
	        } else {
	            this._emit('runtime.contextOrFrameLookup(' + 'context, frame, "' + name + '")');
	        }
	    };
	    _proto.compileGroup = function compileGroup(node, frame) {
	        this._compileAggregate(node, frame, '(', ')');
	    };
	    _proto.compileArray = function compileArray(node, frame) {
	        this._compileAggregate(node, frame, '[', ']');
	    };
	    _proto.compileDict = function compileDict(node, frame) {
	        this._compileAggregate(node, frame, '{', '}');
	    };
	    _proto.compilePair = function compilePair(node, frame) {
	        var key = node.key;
	        var val = node.value;
	        if (_instanceof$7(key, nodes$1.Symbol)) {
	            key = new nodes$1.Literal(key.lineno, key.colno, key.value);
	        } else if (!(_instanceof$7(key, nodes$1.Literal) && typeof key.value === 'string')) {
	            this.fail('compilePair: Dict keys must be strings or names', key.lineno, key.colno);
	        }
	        this.compile(key, frame);
	        this._emit(': ');
	        this._compileExpression(val, frame);
	    };
	    _proto.compileInlineIf = function compileInlineIf(node, frame) {
	        this._emit('(');
	        this.compile(node.cond, frame);
	        this._emit('?');
	        this.compile(node.body, frame);
	        this._emit(':');
	        if (node.else_ !== null) {
	            this.compile(node.else_, frame);
	        } else {
	            this._emit('""');
	        }
	        this._emit(')');
	    };
	    _proto.compileIn = function compileIn(node, frame) {
	        this._emit('runtime.inOperator(');
	        this.compile(node.left, frame);
	        this._emit(',');
	        this.compile(node.right, frame);
	        this._emit(')');
	    };
	    _proto.compileIs = function compileIs(node, frame) {
	        // first, we need to try to get the name of the test function, if it's a
	        // callable (i.e., has args) and not a symbol.
	        var right = node.right.name ? node.right.name.value : node.right.value;
	        this._emit('env.getTest("' + right + '").call(context, ');
	        this.compile(node.left, frame);
	        // compile the arguments for the callable if they exist
	        if (node.right.args) {
	            this._emit(',');
	            this.compile(node.right.args, frame);
	        }
	        this._emit(') === true');
	    };
	    _proto._binOpEmitter = function _binOpEmitter(node, frame, str) {
	        this.compile(node.left, frame);
	        this._emit(str);
	        this.compile(node.right, frame);
	    };
	    _proto.compileOr = function compileOr(node, frame) {
	        return this._binOpEmitter(node, frame, ' || ');
	    };
	    _proto.compileAnd = function compileAnd(node, frame) {
	        return this._binOpEmitter(node, frame, ' && ');
	    };
	    _proto.compileAdd = function compileAdd(node, frame) {
	        return this._binOpEmitter(node, frame, ' + ');
	    };
	    _proto.compileConcat = function compileConcat(node, frame) {
	        return this._binOpEmitter(node, frame, ' + "" + ');
	    };
	    _proto.compileSub = function compileSub(node, frame) {
	        return this._binOpEmitter(node, frame, ' - ');
	    };
	    _proto.compileMul = function compileMul(node, frame) {
	        return this._binOpEmitter(node, frame, ' * ');
	    };
	    _proto.compileDiv = function compileDiv(node, frame) {
	        return this._binOpEmitter(node, frame, ' / ');
	    };
	    _proto.compileMod = function compileMod(node, frame) {
	        return this._binOpEmitter(node, frame, ' % ');
	    };
	    _proto.compileNot = function compileNot(node, frame) {
	        this._emit('!');
	        this.compile(node.target, frame);
	    };
	    _proto.compileFloorDiv = function compileFloorDiv(node, frame) {
	        this._emit('Math.floor(');
	        this.compile(node.left, frame);
	        this._emit(' / ');
	        this.compile(node.right, frame);
	        this._emit(')');
	    };
	    _proto.compilePow = function compilePow(node, frame) {
	        this._emit('Math.pow(');
	        this.compile(node.left, frame);
	        this._emit(', ');
	        this.compile(node.right, frame);
	        this._emit(')');
	    };
	    _proto.compileNeg = function compileNeg(node, frame) {
	        this._emit('-');
	        this.compile(node.target, frame);
	    };
	    _proto.compilePos = function compilePos(node, frame) {
	        this._emit('+');
	        this.compile(node.target, frame);
	    };
	    _proto.compileCompare = function compileCompare(node, frame) {
	        var _this5 = this;
	        this.compile(node.expr, frame);
	        node.ops.forEach(function(op) {
	            _this5._emit(" " + compareOps[op.type] + " ");
	            _this5.compile(op.expr, frame);
	        });
	    };
	    _proto.compileLookupVal = function compileLookupVal(node, frame) {
	        this._emit('runtime.memberLookup((');
	        this._compileExpression(node.target, frame);
	        this._emit('),');
	        this._compileExpression(node.val, frame);
	        this._emit(')');
	    };
	    _proto._getNodeName = function _getNodeName(node) {
	        switch(node.typename){
	            case 'Symbol':
	                return node.value;
	            case 'FunCall':
	                return 'the return value of (' + this._getNodeName(node.name) + ')';
	            case 'LookupVal':
	                return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';
	            case 'Literal':
	                return node.value.toString();
	            default:
	                return '--expression--';
	        }
	    };
	    _proto.compileFunCall = function compileFunCall(node, frame) {
	        // Keep track of line/col info at runtime by settings
	        // variables within an expression. An expression in javascript
	        // like (x, y, z) returns the last value, and x and y can be
	        // anything
	        this._emit('(lineno = ' + node.lineno + ', colno = ' + node.colno + ', ');
	        this._emit('runtime.callWrap(');
	        // Compile it as normal.
	        this._compileExpression(node.name, frame);
	        // Output the name of what we're calling so we can get friendly errors
	        // if the lookup fails.
	        this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');
	        this._compileAggregate(node.args, frame, '[', '])');
	        this._emit(')');
	    };
	    _proto.compileFilter = function compileFilter(node, frame) {
	        var name = node.name;
	        this.assertType(name, nodes$1.Symbol);
	        this._emit('env.getFilter("' + name.value + '").call(context, ');
	        this._compileAggregate(node.args, frame);
	        this._emit(')');
	    };
	    _proto.compileFilterAsync = function compileFilterAsync(node, frame) {
	        var name = node.name;
	        var symbol = node.symbol.value;
	        this.assertType(name, nodes$1.Symbol);
	        frame.set(symbol, symbol);
	        this._emit('env.getFilter("' + name.value + '").call(context, ');
	        this._compileAggregate(node.args, frame);
	        this._emitLine(', ' + this._makeCallback(symbol));
	        this._addScopeLevel();
	    };
	    _proto.compileKeywordArgs = function compileKeywordArgs(node, frame) {
	        this._emit('runtime.makeKeywordArgs(');
	        this.compileDict(node, frame);
	        this._emit(')');
	    };
	    _proto.compileSet = function compileSet(node, frame) {
	        var _this6 = this;
	        var ids = [];
	        // Lookup the variable names for each identifier and create
	        // new ones if necessary
	        node.targets.forEach(function(target) {
	            var name = target.value;
	            var id = frame.lookup(name);
	            if (id === null || id === undefined) {
	                id = _this6._tmpid();
	                // Note: This relies on js allowing scope across
	                // blocks, in case this is created inside an `if`
	                _this6._emitLine('var ' + id + ';');
	            }
	            ids.push(id);
	        });
	        if (node.value) {
	            this._emit(ids.join(' = ') + ' = ');
	            this._compileExpression(node.value, frame);
	            this._emitLine(';');
	        } else {
	            this._emit(ids.join(' = ') + ' = ');
	            this.compile(node.body, frame);
	            this._emitLine(';');
	        }
	        node.targets.forEach(function(target, i) {
	            var id = ids[i];
	            var name = target.value;
	            // We are running this for every var, but it's very
	            // uncommon to assign to multiple vars anyway
	            _this6._emitLine("frame.set(\"" + name + "\", " + id + ", true);");
	            _this6._emitLine('if(frame.topLevel) {');
	            _this6._emitLine("context.setVariable(\"" + name + "\", " + id + ");");
	            _this6._emitLine('}');
	            if (name.charAt(0) !== '_') {
	                _this6._emitLine('if(frame.topLevel) {');
	                _this6._emitLine("context.addExport(\"" + name + "\", " + id + ");");
	                _this6._emitLine('}');
	            }
	        });
	    };
	    _proto.compileSwitch = function compileSwitch(node, frame) {
	        var _this7 = this;
	        this._emit('switch (');
	        this.compile(node.expr, frame);
	        this._emit(') {');
	        node.cases.forEach(function(c, i) {
	            _this7._emit('case ');
	            _this7.compile(c.cond, frame);
	            _this7._emit(': ');
	            _this7.compile(c.body, frame);
	            // preserve fall-throughs
	            if (c.body.children.length) {
	                _this7._emitLine('break;');
	            }
	        });
	        if (node.default) {
	            this._emit('default:');
	            this.compile(node.default, frame);
	        }
	        this._emit('}');
	    };
	    _proto.compileIf = function compileIf(node, frame, async) {
	        var _this8 = this;
	        this._emit('if(');
	        this._compileExpression(node.cond, frame);
	        this._emitLine(') {');
	        this._withScopedSyntax(function() {
	            _this8.compile(node.body, frame);
	            if (async) {
	                _this8._emit('cb()');
	            }
	        });
	        if (node.else_) {
	            this._emitLine('}\nelse {');
	            this._withScopedSyntax(function() {
	                _this8.compile(node.else_, frame);
	                if (async) {
	                    _this8._emit('cb()');
	                }
	            });
	        } else if (async) {
	            this._emitLine('}\nelse {');
	            this._emit('cb()');
	        }
	        this._emitLine('}');
	    };
	    _proto.compileIfAsync = function compileIfAsync(node, frame) {
	        this._emit('(function(cb) {');
	        this.compileIf(node, frame, true);
	        this._emit('})(' + this._makeCallback());
	        this._addScopeLevel();
	    };
	    _proto._emitLoopBindings = function _emitLoopBindings(node, arr, i, len) {
	        var _this9 = this;
	        var bindings = [
	            {
	                name: 'index',
	                val: i + " + 1"
	            },
	            {
	                name: 'index0',
	                val: i
	            },
	            {
	                name: 'revindex',
	                val: len + " - " + i
	            },
	            {
	                name: 'revindex0',
	                val: len + " - " + i + " - 1"
	            },
	            {
	                name: 'first',
	                val: i + " === 0"
	            },
	            {
	                name: 'last',
	                val: i + " === " + len + " - 1"
	            },
	            {
	                name: 'length',
	                val: len
	            }
	        ];
	        bindings.forEach(function(b) {
	            _this9._emitLine("frame.set(\"loop." + b.name + "\", " + b.val + ");");
	        });
	    };
	    _proto.compileFor = function compileFor(node, frame) {
	        var _this10 = this;
	        // Some of this code is ugly, but it keeps the generated code
	        // as fast as possible. ForAsync also shares some of this, but
	        // not much.
	        var i = this._tmpid();
	        var len = this._tmpid();
	        var arr = this._tmpid();
	        frame = frame.push();
	        this._emitLine('frame = frame.push();');
	        this._emit("var " + arr + " = ");
	        this._compileExpression(node.arr, frame);
	        this._emitLine(';');
	        this._emit("if(" + arr + ") {");
	        this._emitLine(arr + ' = runtime.fromIterator(' + arr + ');');
	        // If multiple names are passed, we need to bind them
	        // appropriately
	        if (_instanceof$7(node.name, nodes$1.Array)) {
	            this._emitLine("var " + i + ";");
	            // The object could be an arroy or object. Note that the
	            // body of the loop is duplicated for each condition, but
	            // we are optimizing for speed over size.
	            this._emitLine("if(runtime.isArray(" + arr + ")) {");
	            this._emitLine("var " + len + " = " + arr + ".length;");
	            this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
	            // Bind each declared var
	            node.name.children.forEach(function(child, u) {
	                var tid = _this10._tmpid();
	                _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");
	                _this10._emitLine("frame.set(\"" + child + "\", " + arr + "[" + i + "][" + u + "]);");
	                frame.set(node.name.children[u].value, tid);
	            });
	            this._emitLoopBindings(node, arr, i, len);
	            this._withScopedSyntax(function() {
	                _this10.compile(node.body, frame);
	            });
	            this._emitLine('}');
	            this._emitLine('} else {');
	            // Iterate over the key/values of an object
	            var _node$name$children = node.name.children, key = _node$name$children[0], val = _node$name$children[1];
	            var k = this._tmpid();
	            var v = this._tmpid();
	            frame.set(key.value, k);
	            frame.set(val.value, v);
	            this._emitLine(i + " = -1;");
	            this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");
	            this._emitLine("for(var " + k + " in " + arr + ") {");
	            this._emitLine(i + "++;");
	            this._emitLine("var " + v + " = " + arr + "[" + k + "];");
	            this._emitLine("frame.set(\"" + key.value + "\", " + k + ");");
	            this._emitLine("frame.set(\"" + val.value + "\", " + v + ");");
	            this._emitLoopBindings(node, arr, i, len);
	            this._withScopedSyntax(function() {
	                _this10.compile(node.body, frame);
	            });
	            this._emitLine('}');
	            this._emitLine('}');
	        } else {
	            // Generate a typical array iteration
	            var _v = this._tmpid();
	            frame.set(node.name.value, _v);
	            this._emitLine("var " + len + " = " + arr + ".length;");
	            this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");
	            this._emitLine("var " + _v + " = " + arr + "[" + i + "];");
	            this._emitLine("frame.set(\"" + node.name.value + "\", " + _v + ");");
	            this._emitLoopBindings(node, arr, i, len);
	            this._withScopedSyntax(function() {
	                _this10.compile(node.body, frame);
	            });
	            this._emitLine('}');
	        }
	        this._emitLine('}');
	        if (node.else_) {
	            this._emitLine('if (!' + len + ') {');
	            this.compile(node.else_, frame);
	            this._emitLine('}');
	        }
	        this._emitLine('frame = frame.pop();');
	    };
	    _proto._compileAsyncLoop = function _compileAsyncLoop(node, frame, parallel) {
	        var _this11 = this;
	        // This shares some code with the For tag, but not enough to
	        // worry about. This iterates across an object asynchronously,
	        // but not in parallel.
	        var i = this._tmpid();
	        var len = this._tmpid();
	        var arr = this._tmpid();
	        var asyncMethod = parallel ? 'asyncAll' : 'asyncEach';
	        frame = frame.push();
	        this._emitLine('frame = frame.push();');
	        this._emit('var ' + arr + ' = runtime.fromIterator(');
	        this._compileExpression(node.arr, frame);
	        this._emitLine(');');
	        if (_instanceof$7(node.name, nodes$1.Array)) {
	            var arrayLen = node.name.children.length;
	            this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");
	            node.name.children.forEach(function(name) {
	                _this11._emit(name.value + ",");
	            });
	            this._emit(i + ',' + len + ',next) {');
	            node.name.children.forEach(function(name) {
	                var id = name.value;
	                frame.set(id, id);
	                _this11._emitLine("frame.set(\"" + id + "\", " + id + ");");
	            });
	        } else {
	            var id = node.name.value;
	            this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");
	            this._emitLine('frame.set("' + id + '", ' + id + ');');
	            frame.set(id, id);
	        }
	        this._emitLoopBindings(node, arr, i, len);
	        this._withScopedSyntax(function() {
	            var buf;
	            if (parallel) {
	                buf = _this11._pushBuffer();
	            }
	            _this11.compile(node.body, frame);
	            _this11._emitLine('next(' + i + (buf ? ',' + buf : '') + ');');
	            if (parallel) {
	                _this11._popBuffer();
	            }
	        });
	        var output = this._tmpid();
	        this._emitLine('}, ' + this._makeCallback(output));
	        this._addScopeLevel();
	        if (parallel) {
	            this._emitLine(this.buffer + ' += ' + output + ';');
	        }
	        if (node.else_) {
	            this._emitLine('if (!' + arr + '.length) {');
	            this.compile(node.else_, frame);
	            this._emitLine('}');
	        }
	        this._emitLine('frame = frame.pop();');
	    };
	    _proto.compileAsyncEach = function compileAsyncEach(node, frame) {
	        this._compileAsyncLoop(node, frame);
	    };
	    _proto.compileAsyncAll = function compileAsyncAll(node, frame) {
	        this._compileAsyncLoop(node, frame, true);
	    };
	    _proto._compileMacro = function _compileMacro(node, frame) {
	        var _this12 = this;
	        var args = [];
	        var kwargs = null;
	        var funcId = 'macro_' + this._tmpid();
	        var keepFrame = frame !== undefined;
	        // Type check the definition of the args
	        node.args.children.forEach(function(arg, i) {
	            if (i === node.args.children.length - 1 && _instanceof$7(arg, nodes$1.Dict)) {
	                kwargs = arg;
	            } else {
	                _this12.assertType(arg, nodes$1.Symbol);
	                args.push(arg);
	            }
	        });
	        var realNames = [].concat(args.map(function(n) {
	            return "l_" + n.value;
	        }), [
	            'kwargs'
	        ]);
	        // Quoted argument names
	        var argNames = args.map(function(n) {
	            return "\"" + n.value + "\"";
	        });
	        var kwargNames = (kwargs && kwargs.children || []).map(function(n) {
	            return "\"" + n.key.value + "\"";
	        });
	        // We pass a function to makeMacro which destructures the
	        // arguments so support setting positional args with keywords
	        // args and passing keyword args as positional args
	        // (essentially default values). See runtime.js.
	        var currFrame;
	        if (keepFrame) {
	            currFrame = frame.push(true);
	        } else {
	            currFrame = new Frame$1();
	        }
	        this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(', ') + "], ", "[" + kwargNames.join(', ') + "], ", "function (" + realNames.join(', ') + ") {", 'var callerFrame = frame;', 'frame = ' + (keepFrame ? 'frame.push(true);' : 'new runtime.Frame();'), 'kwargs = kwargs || {};', 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }');
	        // Expose the arguments to the template. Don't need to use
	        // random names because the function
	        // will create a new run-time scope for us
	        args.forEach(function(arg) {
	            _this12._emitLine("frame.set(\"" + arg.value + "\", l_" + arg.value + ");");
	            currFrame.set(arg.value, "l_" + arg.value);
	        });
	        // Expose the keyword arguments
	        if (kwargs) {
	            kwargs.children.forEach(function(pair) {
	                var name = pair.key.value;
	                _this12._emit("frame.set(\"" + name + "\", ");
	                _this12._emit("Object.prototype.hasOwnProperty.call(kwargs, \"" + name + "\")");
	                _this12._emit(" ? kwargs[\"" + name + "\"] : ");
	                _this12._compileExpression(pair.value, currFrame);
	                _this12._emit(');');
	            });
	        }
	        var bufferId = this._pushBuffer();
	        this._withScopedSyntax(function() {
	            _this12.compile(node.body, currFrame);
	        });
	        this._emitLine('frame = ' + (keepFrame ? 'frame.pop();' : 'callerFrame;'));
	        this._emitLine("return new runtime.SafeString(" + bufferId + ");");
	        this._emitLine('});');
	        this._popBuffer();
	        return funcId;
	    };
	    _proto.compileMacro = function compileMacro(node, frame) {
	        var funcId = this._compileMacro(node);
	        // Expose the macro to the templates
	        var name = node.name.value;
	        frame.set(name, funcId);
	        if (frame.parent) {
	            this._emitLine("frame.set(\"" + name + "\", " + funcId + ");");
	        } else {
	            if (node.name.value.charAt(0) !== '_') {
	                this._emitLine("context.addExport(\"" + name + "\");");
	            }
	            this._emitLine("context.setVariable(\"" + name + "\", " + funcId + ");");
	        }
	    };
	    _proto.compileCaller = function compileCaller(node, frame) {
	        // basically an anonymous "macro expression"
	        this._emit('(function (){');
	        var funcId = this._compileMacro(node, frame);
	        this._emit("return " + funcId + ";})()");
	    };
	    _proto._compileGetTemplate = function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
	        var parentTemplateId = this._tmpid();
	        var parentName = this._templateName();
	        var cb = this._makeCallback(parentTemplateId);
	        var eagerCompileArg = eagerCompile ? 'true' : 'false';
	        var ignoreMissingArg = ignoreMissing ? 'true' : 'false';
	        this._emit('env.getTemplate(');
	        this._compileExpression(node.template, frame);
	        this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);
	        return parentTemplateId;
	    };
	    _proto.compileImport = function compileImport(node, frame) {
	        var target = node.target.value;
	        var id = this._compileGetTemplate(node, frame, false, false);
	        this._addScopeLevel();
	        this._emitLine(id + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(id));
	        this._addScopeLevel();
	        frame.set(target, id);
	        if (frame.parent) {
	            this._emitLine("frame.set(\"" + target + "\", " + id + ");");
	        } else {
	            this._emitLine("context.setVariable(\"" + target + "\", " + id + ");");
	        }
	    };
	    _proto.compileFromImport = function compileFromImport(node, frame) {
	        var _this13 = this;
	        var importedId = this._compileGetTemplate(node, frame, false, false);
	        this._addScopeLevel();
	        this._emitLine(importedId + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(importedId));
	        this._addScopeLevel();
	        node.names.children.forEach(function(nameNode) {
	            var name;
	            var alias;
	            var id = _this13._tmpid();
	            if (_instanceof$7(nameNode, nodes$1.Pair)) {
	                name = nameNode.key.value;
	                alias = nameNode.value.value;
	            } else {
	                name = nameNode.value;
	                alias = name;
	            }
	            _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ", \"" + name + "\")) {");
	            _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");
	            _this13._emitLine('} else {');
	            _this13._emitLine("cb(new Error(\"cannot import '" + name + "'\")); return;");
	            _this13._emitLine('}');
	            frame.set(alias, id);
	            if (frame.parent) {
	                _this13._emitLine("frame.set(\"" + alias + "\", " + id + ");");
	            } else {
	                _this13._emitLine("context.setVariable(\"" + alias + "\", " + id + ");");
	            }
	        });
	    };
	    _proto.compileBlock = function compileBlock(node) {
	        var id = this._tmpid();
	        // If we are executing outside a block (creating a top-level
	        // block), we really don't want to execute its code because it
	        // will execute twice: once when the child template runs and
	        // again when the parent template runs. Note that blocks
	        // within blocks will *always* execute immediately *and*
	        // wherever else they are invoked (like used in a parent
	        // template). This may have behavioral differences from jinja
	        // because blocks can have side effects, but it seems like a
	        // waste of performance to always execute huge top-level
	        // blocks twice
	        if (!this.inBlock) {
	            this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
	        }
	        this._emit("context.getBlock(\"" + node.name.value + "\")");
	        if (!this.inBlock) {
	            this._emit(')');
	        }
	        this._emitLine('(env, context, frame, runtime, ' + this._makeCallback(id));
	        this._emitLine(this.buffer + " += " + id + ";");
	        this._addScopeLevel();
	    };
	    _proto.compileSuper = function compileSuper(node, frame) {
	        var name = node.blockName.value;
	        var id = node.symbol.value;
	        var cb = this._makeCallback(id);
	        this._emitLine("context.getSuper(env, \"" + name + "\", b_" + name + ", frame, runtime, " + cb);
	        this._emitLine(id + " = runtime.markSafe(" + id + ");");
	        this._addScopeLevel();
	        frame.set(id, id);
	    };
	    _proto.compileExtends = function compileExtends(node, frame) {
	        var k = this._tmpid();
	        var parentTemplateId = this._compileGetTemplate(node, frame, true, false);
	        // extends is a dynamic tag and can occur within a block like
	        // `if`, so if this happens we need to capture the parent
	        // template in the top-level scope
	        this._emitLine("parentTemplate = " + parentTemplateId);
	        this._emitLine("for(var " + k + " in parentTemplate.blocks) {");
	        this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");
	        this._emitLine('}');
	        this._addScopeLevel();
	    };
	    _proto.compileInclude = function compileInclude(node, frame) {
	        this._emitLine('var tasks = [];');
	        this._emitLine('tasks.push(');
	        this._emitLine('function(callback) {');
	        var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);
	        this._emitLine("callback(null," + id + ");});");
	        this._emitLine('});');
	        var id2 = this._tmpid();
	        this._emitLine('tasks.push(');
	        this._emitLine('function(template, callback){');
	        this._emitLine('template.render(context.getVariables(), frame, ' + this._makeCallback(id2));
	        this._emitLine('callback(null,' + id2 + ');});');
	        this._emitLine('});');
	        this._emitLine('tasks.push(');
	        this._emitLine('function(result, callback){');
	        this._emitLine(this.buffer + " += result;");
	        this._emitLine('callback(null);');
	        this._emitLine('});');
	        this._emitLine('env.waterfall(tasks, function(){');
	        this._addScopeLevel();
	    };
	    _proto.compileTemplateData = function compileTemplateData(node, frame) {
	        this.compileLiteral(node, frame);
	    };
	    _proto.compileCapture = function compileCapture(node, frame) {
	        var _this14 = this;
	        // we need to temporarily override the current buffer id as 'output'
	        // so the set block writes to the capture output instead of the buffer
	        var buffer = this.buffer;
	        this.buffer = 'output';
	        this._emitLine('(function() {');
	        this._emitLine('var output = "";');
	        this._withScopedSyntax(function() {
	            _this14.compile(node.body, frame);
	        });
	        this._emitLine('return output;');
	        this._emitLine('})()');
	        // and of course, revert back to the old buffer id
	        this.buffer = buffer;
	    };
	    _proto.compileOutput = function compileOutput(node, frame) {
	        var _this15 = this;
	        var children = node.children;
	        children.forEach(function(child) {
	            // TemplateData is a special case because it is never
	            // autoescaped, so simply output it for optimization
	            if (_instanceof$7(child, nodes$1.TemplateData)) {
	                if (child.value) {
	                    _this15._emit(_this15.buffer + " += ");
	                    _this15.compileLiteral(child, frame);
	                    _this15._emitLine(';');
	                }
	            } else {
	                _this15._emit(_this15.buffer + " += runtime.suppressValue(");
	                if (_this15.throwOnUndefined) {
	                    _this15._emit('runtime.ensureDefined(');
	                }
	                _this15.compile(child, frame);
	                if (_this15.throwOnUndefined) {
	                    _this15._emit("," + node.lineno + "," + node.colno + ")");
	                }
	                _this15._emit(', env.opts.autoescape);\n');
	            }
	        });
	    };
	    _proto.compileRoot = function compileRoot(node, frame) {
	        var _this16 = this;
	        if (frame) {
	            this.fail('compileRoot: root node can\'t have frame');
	        }
	        frame = new Frame$1();
	        this._emitFuncBegin(node, 'root');
	        this._emitLine('var parentTemplate = null;');
	        this._compileChildren(node, frame);
	        this._emitLine('if(parentTemplate) {');
	        this._emitLine('parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);');
	        this._emitLine('} else {');
	        this._emitLine("cb(null, " + this.buffer + ");");
	        this._emitLine('}');
	        this._emitFuncEnd(true);
	        this.inBlock = true;
	        var blockNames = [];
	        var blocks = node.findAll(nodes$1.Block);
	        blocks.forEach(function(block, i) {
	            var name = block.name.value;
	            if (blockNames.indexOf(name) !== -1) {
	                throw new Error("Block \"" + name + "\" defined more than once.");
	            }
	            blockNames.push(name);
	            _this16._emitFuncBegin(block, "b_" + name);
	            var tmpFrame = new Frame$1();
	            _this16._emitLine('var frame = frame.push(true);');
	            _this16.compile(block.body, tmpFrame);
	            _this16._emitFuncEnd();
	        });
	        this._emitLine('return {');
	        blocks.forEach(function(block, i) {
	            var blockName = "b_" + block.name.value;
	            _this16._emitLine(blockName + ": " + blockName + ",");
	        });
	        this._emitLine('root: root\n};');
	    };
	    _proto.compile = function compile(node, frame) {
	        var _compile = this['compile' + node.typename];
	        if (_compile) {
	            _compile.call(this, node, frame);
	        } else {
	            this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
	        }
	    };
	    _proto.getCode = function getCode() {
	        return this.codebuf.join('');
	    };
	    return Compiler;
	}(Obj$1);
	var compiler$3 = {
	    compile: function compile(src, asyncFilters, extensions, name, opts) {
	        if (opts === void 0) {
	            opts = {};
	        }
	        var c = new Compiler(name, opts.throwOnUndefined);
	        // Run the extension preprocessors against the source.
	        var preprocessors = (extensions || []).map(function(ext) {
	            return ext.preprocess;
	        }).filter(function(f) {
	            return !!f;
	        });
	        var processedSrc = preprocessors.reduce(function(s, processor) {
	            return processor(s);
	        }, src);
	        c.compile(transformer.transform(parser$1.parse(processedSrc, extensions, opts), asyncFilters, name));
	        return c.getCode();
	    },
	    Compiler: Compiler
	};

	var filters$1 = {exports: {}};

	function _instanceof$6(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	var lib$3 = libExports;
	var r = runtime$1;
	var _exports = filters$1.exports = {};
	function normalize$2(value, defaultValue) {
	    if (value === null || value === undefined || value === false) {
	        return defaultValue;
	    }
	    return value;
	}
	_exports.abs = Math.abs;
	function isNaN$1(num) {
	    return num !== num; // eslint-disable-line no-self-compare
	}
	function batch(arr, linecount, fillWith) {
	    var i;
	    var res = [];
	    var tmp = [];
	    for(i = 0; i < arr.length; i++){
	        if (i % linecount === 0 && tmp.length) {
	            res.push(tmp);
	            tmp = [];
	        }
	        tmp.push(arr[i]);
	    }
	    if (tmp.length) {
	        if (fillWith) {
	            for(i = tmp.length; i < linecount; i++){
	                tmp.push(fillWith);
	            }
	        }
	        res.push(tmp);
	    }
	    return res;
	}
	_exports.batch = batch;
	function capitalize(str) {
	    str = normalize$2(str, '');
	    var ret = str.toLowerCase();
	    return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
	}
	_exports.capitalize = capitalize;
	function center(str, width) {
	    str = normalize$2(str, '');
	    width = width || 80;
	    if (str.length >= width) {
	        return str;
	    }
	    var spaces = width - str.length;
	    var pre = lib$3.repeat(' ', spaces / 2 - spaces % 2);
	    var post = lib$3.repeat(' ', spaces / 2);
	    return r.copySafeness(str, pre + str + post);
	}
	_exports.center = center;
	function default_(val, def, bool) {
	    if (bool) {
	        return val || def;
	    } else {
	        return val !== undefined ? val : def;
	    }
	}
	// TODO: it is confusing to export something called 'default'
	_exports['default'] = default_; // eslint-disable-line dot-notation
	function dictsort(val, caseSensitive, by) {
	    if (!lib$3.isObject(val)) {
	        throw new lib$3.TemplateError('dictsort filter: val must be an object');
	    }
	    var array = [];
	    // deliberately include properties from the object's prototype
	    for(var k in val){
	        // eslint-disable-line guard-for-in, no-restricted-syntax
	        array.push([
	            k,
	            val[k]
	        ]);
	    }
	    var si;
	    if (by === undefined || by === 'key') {
	        si = 0;
	    } else if (by === 'value') {
	        si = 1;
	    } else {
	        throw new lib$3.TemplateError('dictsort filter: You can only sort by either key or value');
	    }
	    array.sort(function(t1, t2) {
	        var a = t1[si];
	        var b = t2[si];
	        if (!caseSensitive) {
	            if (lib$3.isString(a)) {
	                a = a.toUpperCase();
	            }
	            if (lib$3.isString(b)) {
	                b = b.toUpperCase();
	            }
	        }
	        return a > b ? 1 : a === b ? 0 : -1; // eslint-disable-line no-nested-ternary
	    });
	    return array;
	}
	_exports.dictsort = dictsort;
	function dump(obj, spaces) {
	    return JSON.stringify(obj, null, spaces);
	}
	_exports.dump = dump;
	function escape$1(str) {
	    if (_instanceof$6(str, r.SafeString)) {
	        return str;
	    }
	    str = str === null || str === undefined ? '' : str;
	    return r.markSafe(lib$3.escape(str.toString()));
	}
	_exports.escape = escape$1;
	function safe(str) {
	    if (_instanceof$6(str, r.SafeString)) {
	        return str;
	    }
	    str = str === null || str === undefined ? '' : str;
	    return r.markSafe(str.toString());
	}
	_exports.safe = safe;
	function first(arr) {
	    return arr[0];
	}
	_exports.first = first;
	function forceescape(str) {
	    str = str === null || str === undefined ? '' : str;
	    return r.markSafe(lib$3.escape(str.toString()));
	}
	_exports.forceescape = forceescape;
	function groupby(arr, attr) {
	    return lib$3.groupBy(arr, attr, this.env.opts.throwOnUndefined);
	}
	_exports.groupby = groupby;
	function indent(str, width, indentfirst) {
	    str = normalize$2(str, '');
	    if (str === '') {
	        return '';
	    }
	    width = width || 4;
	    // let res = '';
	    var lines = str.split('\n');
	    var sp = lib$3.repeat(' ', width);
	    var res = lines.map(function(l, i) {
	        return i === 0 && !indentfirst ? l : "" + sp + l;
	    }).join('\n');
	    return r.copySafeness(str, res);
	}
	_exports.indent = indent;
	function join$1(arr, del, attr) {
	    del = del || '';
	    if (attr) {
	        arr = lib$3.map(arr, function(v) {
	            return v[attr];
	        });
	    }
	    return arr.join(del);
	}
	_exports.join = join$1;
	function last(arr) {
	    return arr[arr.length - 1];
	}
	_exports.last = last;
	function lengthFilter(val) {
	    var value = normalize$2(val, '');
	    if (value !== undefined) {
	        if (typeof Map === 'function' && _instanceof$6(value, Map) || typeof Set === 'function' && _instanceof$6(value, Set)) {
	            // ECMAScript 2015 Maps and Sets
	            return value.size;
	        }
	        if (lib$3.isObject(value) && !_instanceof$6(value, r.SafeString)) {
	            // Objects (besides SafeStrings), non-primative Arrays
	            return lib$3.keys(value).length;
	        }
	        return value.length;
	    }
	    return 0;
	}
	_exports.length = lengthFilter;
	function list$1(val) {
	    if (lib$3.isString(val)) {
	        return val.split('');
	    } else if (lib$3.isObject(val)) {
	        return lib$3._entries(val || {}).map(function(_ref) {
	            var key = _ref[0], value = _ref[1];
	            return {
	                key: key,
	                value: value
	            };
	        });
	    } else if (lib$3.isArray(val)) {
	        return val;
	    } else {
	        throw new lib$3.TemplateError('list filter: type not iterable');
	    }
	}
	_exports.list = list$1;
	function lower(str) {
	    str = normalize$2(str, '');
	    return str.toLowerCase();
	}
	_exports.lower = lower;
	function nl2br(str) {
	    if (str === null || str === undefined) {
	        return '';
	    }
	    return r.copySafeness(str, str.replace(/\r\n|\n/g, '<br />\n'));
	}
	_exports.nl2br = nl2br;
	function random(arr) {
	    return arr[Math.floor(Math.random() * arr.length)];
	}
	_exports.random = random;
	/**
	 * Construct select or reject filter
	 *
	 * @param {boolean} expectedTestResult
	 * @returns {function(array, string, *): array}
	 */ function getSelectOrReject(expectedTestResult) {
	    function filter(arr, testName, secondArg) {
	        if (testName === void 0) {
	            testName = 'truthy';
	        }
	        var context = this;
	        var test = context.env.getTest(testName);
	        return lib$3.toArray(arr).filter(function examineTestResult(item) {
	            return test.call(context, item, secondArg) === expectedTestResult;
	        });
	    }
	    return filter;
	}
	_exports.reject = getSelectOrReject(false);
	function rejectattr(arr, attr) {
	    return arr.filter(function(item) {
	        return !item[attr];
	    });
	}
	_exports.rejectattr = rejectattr;
	_exports.select = getSelectOrReject(true);
	function selectattr(arr, attr) {
	    return arr.filter(function(item) {
	        return !!item[attr];
	    });
	}
	_exports.selectattr = selectattr;
	function replace$1(str, old, new_, maxCount) {
	    var originalStr = str;
	    if (_instanceof$6(old, RegExp)) {
	        return str.replace(old, new_);
	    }
	    if (typeof maxCount === 'undefined') {
	        maxCount = -1;
	    }
	    var res = ''; // Output
	    // Cast Numbers in the search term to string
	    if (typeof old === 'number') {
	        old = '' + old;
	    } else if (typeof old !== 'string') {
	        // If it is something other than number or string,
	        // return the original string
	        return str;
	    }
	    // Cast numbers in the replacement to string
	    if (typeof str === 'number') {
	        str = '' + str;
	    }
	    // If by now, we don't have a string, throw it back
	    if (typeof str !== 'string' && !_instanceof$6(str, r.SafeString)) {
	        return str;
	    }
	    // ShortCircuits
	    if (old === '') {
	        // Mimic the python behaviour: empty string is replaced
	        // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
	        res = new_ + str.split('').join(new_) + new_;
	        return r.copySafeness(str, res);
	    }
	    var nextIndex = str.indexOf(old);
	    // if # of replacements to perform is 0, or the string to does
	    // not contain the old value, return the string
	    if (maxCount === 0 || nextIndex === -1) {
	        return str;
	    }
	    var pos = 0;
	    var count = 0; // # of replacements made
	    while(nextIndex > -1 && (maxCount === -1 || count < maxCount)){
	        // Grab the next chunk of src string and add it with the
	        // replacement, to the result
	        res += str.substring(pos, nextIndex) + new_;
	        // Increment our pointer in the src string
	        pos = nextIndex + old.length;
	        count++;
	        // See if there are any more replacements to be made
	        nextIndex = str.indexOf(old, pos);
	    }
	    // We've either reached the end, or done the max # of
	    // replacements, tack on any remaining string
	    if (pos < str.length) {
	        res += str.substring(pos);
	    }
	    return r.copySafeness(originalStr, res);
	}
	_exports.replace = replace$1;
	function reverse(val) {
	    var arr;
	    if (lib$3.isString(val)) {
	        arr = list$1(val);
	    } else {
	        // Copy it
	        arr = lib$3.map(val, function(v) {
	            return v;
	        });
	    }
	    arr.reverse();
	    if (lib$3.isString(val)) {
	        return r.copySafeness(val, arr.join(''));
	    }
	    return arr;
	}
	_exports.reverse = reverse;
	function round(val, precision, method) {
	    precision = precision || 0;
	    var factor = Math.pow(10, precision);
	    var rounder;
	    if (method === 'ceil') {
	        rounder = Math.ceil;
	    } else if (method === 'floor') {
	        rounder = Math.floor;
	    } else {
	        rounder = Math.round;
	    }
	    return rounder(val * factor) / factor;
	}
	_exports.round = round;
	function slice(arr, slices, fillWith) {
	    var sliceLength = Math.floor(arr.length / slices);
	    var extra = arr.length % slices;
	    var res = [];
	    var offset = 0;
	    for(var i = 0; i < slices; i++){
	        var start = offset + i * sliceLength;
	        if (i < extra) {
	            offset++;
	        }
	        var end = offset + (i + 1) * sliceLength;
	        var currSlice = arr.slice(start, end);
	        if (fillWith && i >= extra) {
	            currSlice.push(fillWith);
	        }
	        res.push(currSlice);
	    }
	    return res;
	}
	_exports.slice = slice;
	function sum(arr, attr, start) {
	    if (start === void 0) {
	        start = 0;
	    }
	    if (attr) {
	        arr = lib$3.map(arr, function(v) {
	            return v[attr];
	        });
	    }
	    return start + arr.reduce(function(a, b) {
	        return a + b;
	    }, 0);
	}
	_exports.sum = sum;
	_exports.sort = r.makeMacro([
	    'value',
	    'reverse',
	    'case_sensitive',
	    'attribute'
	], [], function sortFilter(arr, reversed, caseSens, attr) {
	    var _this = this;
	    // Copy it
	    var array = lib$3.map(arr, function(v) {
	        return v;
	    });
	    var getAttribute = lib$3.getAttrGetter(attr);
	    array.sort(function(a, b) {
	        var x = attr ? getAttribute(a) : a;
	        var y = attr ? getAttribute(b) : b;
	        if (_this.env.opts.throwOnUndefined && attr && (x === undefined || y === undefined)) {
	            throw new TypeError("sort: attribute \"" + attr + "\" resolved to undefined");
	        }
	        if (!caseSens && lib$3.isString(x) && lib$3.isString(y)) {
	            x = x.toLowerCase();
	            y = y.toLowerCase();
	        }
	        if (x < y) {
	            return reversed ? 1 : -1;
	        } else if (x > y) {
	            return reversed ? -1 : 1;
	        } else {
	            return 0;
	        }
	    });
	    return array;
	});
	function string(obj) {
	    return r.copySafeness(obj, obj);
	}
	_exports.string = string;
	function striptags(input, preserveLinebreaks) {
	    input = normalize$2(input, '');
	    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
	    var trimmedInput = trim(input.replace(tags, ''));
	    var res = '';
	    if (preserveLinebreaks) {
	        res = trimmedInput.replace(/^ +| +$/gm, '') // remove leading and trailing spaces
	        .replace(/ +/g, ' ') // squash adjacent spaces
	        .replace(/(\r\n)/g, '\n') // normalize linebreaks (CRLF -> LF)
	        .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
	    } else {
	        res = trimmedInput.replace(/\s+/gi, ' ');
	    }
	    return r.copySafeness(input, res);
	}
	_exports.striptags = striptags;
	function title(str) {
	    str = normalize$2(str, '');
	    var words = str.split(' ').map(function(word) {
	        return capitalize(word);
	    });
	    return r.copySafeness(str, words.join(' '));
	}
	_exports.title = title;
	function trim(str) {
	    return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
	}
	_exports.trim = trim;
	function truncate(input, length, killwords, end) {
	    var orig = input;
	    input = normalize$2(input, '');
	    length = length || 255;
	    if (input.length <= length) {
	        return input;
	    }
	    if (killwords) {
	        input = input.substring(0, length);
	    } else {
	        var idx = input.lastIndexOf(' ', length);
	        if (idx === -1) {
	            idx = length;
	        }
	        input = input.substring(0, idx);
	    }
	    input += end !== undefined && end !== null ? end : '...';
	    return r.copySafeness(orig, input);
	}
	_exports.truncate = truncate;
	function upper(str) {
	    str = normalize$2(str, '');
	    return str.toUpperCase();
	}
	_exports.upper = upper;
	function urlencode(obj) {
	    var enc = encodeURIComponent;
	    if (lib$3.isString(obj)) {
	        return enc(obj);
	    } else {
	        var keyvals = lib$3.isArray(obj) ? obj : lib$3._entries(obj);
	        return keyvals.map(function(_ref2) {
	            var k = _ref2[0], v = _ref2[1];
	            return enc(k) + "=" + enc(v);
	        }).join('&');
	    }
	}
	_exports.urlencode = urlencode;
	// For the jinja regexp, see
	// https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
	var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
	// from http://blog.gerv.net/2011/05/html5_email_address_regexp/
	var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
	var httpHttpsRe = /^https?:\/\/.*$/;
	var wwwRe = /^www\./;
	var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;
	function urlize(str, length, nofollow) {
	    if (isNaN$1(length)) {
	        length = Infinity;
	    }
	    var noFollowAttr = nofollow === true ? ' rel="nofollow"' : '';
	    var words = str.split(/(\s+)/).filter(function(word) {
	        // If the word has no length, bail. This can happen for str with
	        // trailing whitespace.
	        return word && word.length;
	    }).map(function(word) {
	        var matches = word.match(puncRe);
	        var possibleUrl = matches ? matches[1] : word;
	        var shortUrl = possibleUrl.substr(0, length);
	        // url that starts with http or https
	        if (httpHttpsRe.test(possibleUrl)) {
	            return "<a href=\"" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
	        }
	        // url that starts with www.
	        if (wwwRe.test(possibleUrl)) {
	            return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
	        }
	        // an email address of the form username@domain.tld
	        if (emailRe.test(possibleUrl)) {
	            return "<a href=\"mailto:" + possibleUrl + "\">" + possibleUrl + "</a>";
	        }
	        // url that ends in .com, .org or .net that is not an email address
	        if (tldRe.test(possibleUrl)) {
	            return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
	        }
	        return word;
	    });
	    return words.join('');
	}
	_exports.urlize = urlize;
	function wordcount(str) {
	    str = normalize$2(str, '');
	    var words = str ? str.match(/\w+/g) : null;
	    return words ? words.length : null;
	}
	_exports.wordcount = wordcount;
	function float(val, def) {
	    var res = parseFloat(val);
	    return isNaN$1(res) ? def : res;
	}
	_exports.float = float;
	var intFilter = r.makeMacro([
	    'value',
	    'default',
	    'base'
	], [], function doInt(value, defaultValue, base) {
	    if (base === void 0) {
	        base = 10;
	    }
	    var res = parseInt(value, base);
	    return isNaN$1(res) ? defaultValue : res;
	});
	_exports.int = intFilter;
	// Aliases
	_exports.d = _exports.default;
	_exports.e = _exports.escape;
	var filtersExports = filters$1.exports;

	var _polyfillNode_fs = {};

	var _polyfillNode_fs$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: _polyfillNode_fs
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_fs$1);

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	function resolve() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : '/';

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	}
	// path.normalize(path)
	// posix version
	function normalize$1(path) {
	  var isPathAbsolute = isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isPathAbsolute).join('/');

	  if (!path && !isPathAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isPathAbsolute ? '/' : '') + path;
	}
	// posix version
	function isAbsolute(path) {
	  return path.charAt(0) === '/';
	}

	// posix version
	function join() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return normalize$1(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	}


	// path.relative(from, to)
	// posix version
	function relative(from, to) {
	  from = resolve(from).substr(1);
	  to = resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	}

	var sep = '/';
	var delimiter$1 = ':';

	function dirname(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	}

	function basename(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	}


	function extname(path) {
	  return splitPath(path)[3];
	}
	var _polyfillNode_path = {
	  extname: extname,
	  basename: basename,
	  dirname: dirname,
	  sep: sep,
	  delimiter: delimiter$1,
	  relative: relative,
	  join: join,
	  isAbsolute: isAbsolute,
	  normalize: normalize$1,
	  resolve: resolve
	};
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ?
	    function (str, start, len) { return str.substr(start, len) } :
	    function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	var _polyfillNode_path$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		basename: basename,
		default: _polyfillNode_path,
		delimiter: delimiter$1,
		dirname: dirname,
		extname: extname,
		isAbsolute: isAbsolute,
		join: join,
		normalize: normalize$1,
		relative: relative,
		resolve: resolve,
		sep: sep
	});

	var require$$1 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_path$1);

	function _inheritsLoose$3(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$3(subClass, superClass);
	}
	function _setPrototypeOf$3(o, p) {
	    _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$3(o, p);
	}
	var path$3 = require$$1;
	var _require$4 = object, EmitterObj$1 = _require$4.EmitterObj;
	var loader = /*#__PURE__*/ function(_EmitterObj) {
	    _inheritsLoose$3(Loader, _EmitterObj);
	    function Loader() {
	        return _EmitterObj.apply(this, arguments) || this;
	    }
	    var _proto = Loader.prototype;
	    _proto.resolve = function resolve(from, to) {
	        return path$3.resolve(path$3.dirname(from), to);
	    };
	    _proto.isRelative = function isRelative(filename) {
	        return filename.indexOf('./') === 0 || filename.indexOf('../') === 0;
	    };
	    return Loader;
	}(EmitterObj$1);

	function _inheritsLoose$2(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$2(subClass, superClass);
	}
	function _setPrototypeOf$2(o, p) {
	    _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$2(o, p);
	}
	var Loader$2 = loader;
	var PrecompiledLoader$2 = /*#__PURE__*/ function(_Loader) {
	    _inheritsLoose$2(PrecompiledLoader, _Loader);
	    function PrecompiledLoader(compiledTemplates) {
	        var _this;
	        _this = _Loader.call(this) || this;
	        _this.precompiled = compiledTemplates || {};
	        return _this;
	    }
	    var _proto = PrecompiledLoader.prototype;
	    _proto.getSource = function getSource(name) {
	        if (this.precompiled[name]) {
	            return {
	                src: {
	                    type: 'code',
	                    obj: this.precompiled[name]
	                },
	                path: name
	            };
	        }
	        return null;
	    };
	    return PrecompiledLoader;
	}(Loader$2);
	var precompiledLoader = {
	    PrecompiledLoader: PrecompiledLoader$2
	};

	function _inheritsLoose$1(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf$1(subClass, superClass);
	}
	function _setPrototypeOf$1(o, p) {
	    _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf$1(o, p);
	}
	var fs$1 = require$$0;
	var path$2 = require$$1;
	var Loader$1 = loader;
	var _require$3 = precompiledLoader, PrecompiledLoader$1 = _require$3.PrecompiledLoader;
	var chokidar;
	var FileSystemLoader$1 = /*#__PURE__*/ function(_Loader) {
	    _inheritsLoose$1(FileSystemLoader, _Loader);
	    function FileSystemLoader(searchPaths, opts) {
	        var _this;
	        _this = _Loader.call(this) || this;
	        if (typeof opts === 'boolean') {
	            console.log('[nunjucks] Warning: you passed a boolean as the second ' + 'argument to FileSystemLoader, but it now takes an options ' + 'object. See http://mozilla.github.io/nunjucks/api.html#filesystemloader');
	        }
	        opts = opts || {};
	        _this.pathsToNames = {};
	        _this.noCache = !!opts.noCache;
	        if (searchPaths) {
	            searchPaths = Array.isArray(searchPaths) ? searchPaths : [
	                searchPaths
	            ];
	            // For windows, convert to forward slashes
	            _this.searchPaths = searchPaths.map(path$2.normalize);
	        } else {
	            _this.searchPaths = [
	                '.'
	            ];
	        }
	        if (opts.watch) {
	            // Watch all the templates in the paths and fire an event when
	            // they change
	            try {
	                chokidar = require('chokidar'); // eslint-disable-line global-require
	            } catch (e) {
	                throw new Error('watch requires chokidar to be installed');
	            }
	            var paths = _this.searchPaths.filter(fs$1.existsSync);
	            var watcher = chokidar.watch(paths);
	            watcher.on('all', function(event, fullname) {
	                fullname = path$2.resolve(fullname);
	                if (event === 'change' && fullname in _this.pathsToNames) {
	                    _this.emit('update', _this.pathsToNames[fullname], fullname);
	                }
	            });
	            watcher.on('error', function(error) {
	                console.log('Watcher error: ' + error);
	            });
	        }
	        return _this;
	    }
	    var _proto = FileSystemLoader.prototype;
	    _proto.getSource = function getSource(name) {
	        var fullpath = null;
	        var paths = this.searchPaths;
	        for(var i = 0; i < paths.length; i++){
	            var basePath = path$2.resolve(paths[i]);
	            var p = path$2.resolve(paths[i], name);
	            // Only allow the current directory and anything
	            // underneath it to be searched
	            if (p.indexOf(basePath) === 0 && fs$1.existsSync(p)) {
	                fullpath = p;
	                break;
	            }
	        }
	        if (!fullpath) {
	            return null;
	        }
	        this.pathsToNames[fullpath] = name;
	        var source = {
	            src: fs$1.readFileSync(fullpath, 'utf-8'),
	            path: fullpath,
	            noCache: this.noCache
	        };
	        this.emit('load', name, source);
	        return source;
	    };
	    return FileSystemLoader;
	}(Loader$1);
	var NodeResolveLoader = /*#__PURE__*/ function(_Loader2) {
	    _inheritsLoose$1(NodeResolveLoader, _Loader2);
	    function NodeResolveLoader(opts) {
	        var _this2;
	        _this2 = _Loader2.call(this) || this;
	        opts = opts || {};
	        _this2.pathsToNames = {};
	        _this2.noCache = !!opts.noCache;
	        if (opts.watch) {
	            try {
	                chokidar = require('chokidar'); // eslint-disable-line global-require
	            } catch (e) {
	                throw new Error('watch requires chokidar to be installed');
	            }
	            _this2.watcher = chokidar.watch();
	            _this2.watcher.on('change', function(fullname) {
	                _this2.emit('update', _this2.pathsToNames[fullname], fullname);
	            });
	            _this2.watcher.on('error', function(error) {
	                console.log('Watcher error: ' + error);
	            });
	            _this2.on('load', function(name, source) {
	                _this2.watcher.add(source.path);
	            });
	        }
	        return _this2;
	    }
	    var _proto2 = NodeResolveLoader.prototype;
	    _proto2.getSource = function getSource(name) {
	        // Don't allow file-system traversal
	        if (/^\.?\.?(\/|\\)/.test(name)) {
	            return null;
	        }
	        if (/^[A-Z]:/.test(name)) {
	            return null;
	        }
	        var fullpath;
	        try {
	            fullpath = require.resolve(name);
	        } catch (e) {
	            return null;
	        }
	        this.pathsToNames[fullpath] = name;
	        var source = {
	            src: fs$1.readFileSync(fullpath, 'utf-8'),
	            path: fullpath,
	            noCache: this.noCache
	        };
	        this.emit('load', name, source);
	        return source;
	    };
	    return NodeResolveLoader;
	}(Loader$1);
	var nodeLoaders = {
	    FileSystemLoader: FileSystemLoader$1,
	    PrecompiledLoader: PrecompiledLoader$1,
	    NodeResolveLoader: NodeResolveLoader
	};

	// This file will automatically be rewired to web-loader.js when
	// building for the browser
	var loaders$1 = nodeLoaders;

	var tests$1 = {};

	function _instanceof$5(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function _type_of$1(obj) {
	    "@swc/helpers - typeof";
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
	}
	(function(exports) {
	    var SafeString = runtime$1.SafeString;
	    /**
		 * Returns `true` if the object is a function, otherwise `false`.
		 * @param { any } value
		 * @returns { boolean }
		 */ function callable(value) {
	        return typeof value === 'function';
	    }
	    exports.callable = callable;
	    /**
		 * Returns `true` if the object is strictly not `undefined`.
		 * @param { any } value
		 * @returns { boolean }
		 */ function defined(value) {
	        return value !== undefined;
	    }
	    exports.defined = defined;
	    /**
		 * Returns `true` if the operand (one) is divisble by the test's argument
		 * (two).
		 * @param { number } one
		 * @param { number } two
		 * @returns { boolean }
		 */ function divisibleby(one, two) {
	        return one % two === 0;
	    }
	    exports.divisibleby = divisibleby;
	    /**
		 * Returns true if the string has been escaped (i.e., is a SafeString).
		 * @param { any } value
		 * @returns { boolean }
		 */ function escaped(value) {
	        return _instanceof$5(value, SafeString);
	    }
	    exports.escaped = escaped;
	    /**
		 * Returns `true` if the arguments are strictly equal.
		 * @param { any } one
		 * @param { any } two
		 */ function equalto(one, two) {
	        return one === two;
	    }
	    exports.equalto = equalto;
	    // Aliases
	    exports.eq = exports.equalto;
	    exports.sameas = exports.equalto;
	    /**
		 * Returns `true` if the value is evenly divisible by 2.
		 * @param { number } value
		 * @returns { boolean }
		 */ function even(value) {
	        return value % 2 === 0;
	    }
	    exports.even = even;
	    /**
		 * Returns `true` if the value is falsy - if I recall correctly, '', 0, false,
		 * undefined, NaN or null. I don't know if we should stick to the default JS
		 * behavior or attempt to replicate what Python believes should be falsy (i.e.,
		 * empty arrays, empty dicts, not 0...).
		 * @param { any } value
		 * @returns { boolean }
		 */ function falsy(value) {
	        return !value;
	    }
	    exports.falsy = falsy;
	    /**
		 * Returns `true` if the operand (one) is greater or equal to the test's
		 * argument (two).
		 * @param { number } one
		 * @param { number } two
		 * @returns { boolean }
		 */ function ge(one, two) {
	        return one >= two;
	    }
	    exports.ge = ge;
	    /**
		 * Returns `true` if the operand (one) is greater than the test's argument
		 * (two).
		 * @param { number } one
		 * @param { number } two
		 * @returns { boolean }
		 */ function greaterthan(one, two) {
	        return one > two;
	    }
	    exports.greaterthan = greaterthan;
	    // alias
	    exports.gt = exports.greaterthan;
	    /**
		 * Returns `true` if the operand (one) is less than or equal to the test's
		 * argument (two).
		 * @param { number } one
		 * @param { number } two
		 * @returns { boolean }
		 */ function le(one, two) {
	        return one <= two;
	    }
	    exports.le = le;
	    /**
		 * Returns `true` if the operand (one) is less than the test's passed argument
		 * (two).
		 * @param { number } one
		 * @param { number } two
		 * @returns { boolean }
		 */ function lessthan(one, two) {
	        return one < two;
	    }
	    exports.lessthan = lessthan;
	    // alias
	    exports.lt = exports.lessthan;
	    /**
		 * Returns `true` if the string is lowercased.
		 * @param { string } value
		 * @returns { boolean }
		 */ function lower(value) {
	        return value.toLowerCase() === value;
	    }
	    exports.lower = lower;
	    /**
		 * Returns `true` if the operand (one) is less than or equal to the test's
		 * argument (two).
		 * @param { number } one
		 * @param { number } two
		 * @returns { boolean }
		 */ function ne(one, two) {
	        return one !== two;
	    }
	    exports.ne = ne;
	    /**
		 * Returns true if the value is strictly equal to `null`.
		 * @param { any }
		 * @returns { boolean }
		 */ function nullTest(value) {
	        return value === null;
	    }
	    exports.null = nullTest;
	    /**
		 * Returns true if value is a number.
		 * @param { any }
		 * @returns { boolean }
		 */ function number(value) {
	        return typeof value === 'number';
	    }
	    exports.number = number;
	    /**
		 * Returns `true` if the value is *not* evenly divisible by 2.
		 * @param { number } value
		 * @returns { boolean }
		 */ function odd(value) {
	        return value % 2 === 1;
	    }
	    exports.odd = odd;
	    /**
		 * Returns `true` if the value is a string, `false` if not.
		 * @param { any } value
		 * @returns { boolean }
		 */ function string(value) {
	        return typeof value === 'string';
	    }
	    exports.string = string;
	    /**
		 * Returns `true` if the value is not in the list of things considered falsy:
		 * '', null, undefined, 0, NaN and false.
		 * @param { any } value
		 * @returns { boolean }
		 */ function truthy(value) {
	        return !!value;
	    }
	    exports.truthy = truthy;
	    /**
		 * Returns `true` if the value is undefined.
		 * @param { any } value
		 * @returns { boolean }
		 */ function undefinedTest(value) {
	        return value === undefined;
	    }
	    exports.undefined = undefinedTest;
	    /**
		 * Returns `true` if the string is uppercased.
		 * @param { string } value
		 * @returns { boolean }
		 */ function upper(value) {
	        return value.toUpperCase() === value;
	    }
	    exports.upper = upper;
	    /**
		 * If ES6 features are available, returns `true` if the value implements the
		 * `Symbol.iterator` method. If not, it's a string or Array.
		 *
		 * Could potentially cause issues if a browser exists that has Set and Map but
		 * not Symbol.
		 *
		 * @param { any } value
		 * @returns { boolean }
		 */ function iterable(value) {
	        if (typeof Symbol !== 'undefined') {
	            return !!value[Symbol.iterator];
	        } else {
	            return Array.isArray(value) || typeof value === 'string';
	        }
	    }
	    exports.iterable = iterable;
	    /**
		 * If ES6 features are available, returns `true` if the value is an object hash
		 * or an ES6 Map. Otherwise just return if it's an object hash.
		 * @param { any } value
		 * @returns { boolean }
		 */ function mapping(value) {
	        // only maps and object hashes
	        var bool = value !== null && value !== undefined && (typeof value === "undefined" ? "undefined" : _type_of$1(value)) === 'object' && !Array.isArray(value);
	        if (Set) {
	            return bool && !_instanceof$5(value, Set);
	        } else {
	            return bool;
	        }
	    }
	    exports.mapping = mapping;
	})(tests$1);

	function _cycler(items) {
	    var index = -1;
	    return {
	        current: null,
	        reset: function reset() {
	            index = -1;
	            this.current = null;
	        },
	        next: function next() {
	            index++;
	            if (index >= items.length) {
	                index = 0;
	            }
	            this.current = items[index];
	            return this.current;
	        }
	    };
	}
	function _joiner(sep) {
	    sep = sep || ',';
	    var first = true;
	    return function() {
	        var val = first ? '' : sep;
	        first = false;
	        return val;
	    };
	}
	// Making this a function instead so it returns a new object
	// each time it's called. That way, if something like an environment
	// uses it, they will each have their own copy.
	function globals$1() {
	    return {
	        range: function range(start, stop, step) {
	            if (typeof stop === 'undefined') {
	                stop = start;
	                start = 0;
	                step = 1;
	            } else if (!step) {
	                step = 1;
	            }
	            var arr = [];
	            if (step > 0) {
	                for(var i = start; i < stop; i += step){
	                    arr.push(i);
	                }
	            } else {
	                for(var _i = start; _i > stop; _i += step){
	                    // eslint-disable-line for-direction
	                    arr.push(_i);
	                }
	            }
	            return arr;
	        },
	        cycler: function cycler() {
	            return _cycler(Array.prototype.slice.call(arguments));
	        },
	        joiner: function joiner(sep) {
	            return _joiner(sep);
	        }
	    };
	}
	var globals_1 = globals$1;

	var path$1 = require$$1;
	var expressApp$1 = function express(env, app) {
	    function NunjucksView(name, opts) {
	        this.name = name;
	        this.path = name;
	        this.defaultEngine = opts.defaultEngine;
	        this.ext = path$1.extname(name);
	        if (!this.ext && !this.defaultEngine) {
	            throw new Error('No default engine was specified and no extension was provided.');
	        }
	        if (!this.ext) {
	            this.name += this.ext = (this.defaultEngine[0] !== '.' ? '.' : '') + this.defaultEngine;
	        }
	    }
	    NunjucksView.prototype.render = function render(opts, cb) {
	        env.render(this.name, opts, cb);
	    };
	    app.set('view', NunjucksView);
	    app.set('nunjucksEnv', env);
	    return env;
	};

	function _instanceof$4(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function _inheritsLoose(subClass, superClass) {
	    subClass.prototype = Object.create(superClass.prototype);
	    subClass.prototype.constructor = subClass;
	    _setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
	    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	        o.__proto__ = p;
	        return o;
	    };
	    return _setPrototypeOf(o, p);
	}
	var asap = asap_1;
	var _waterfall = aSyncWaterfallExports;
	var lib$2 = libExports;
	var compiler$2 = compiler$3;
	var filters = filtersExports;
	var _require$2 = loaders$1, FileSystemLoader = _require$2.FileSystemLoader, WebLoader = _require$2.WebLoader, PrecompiledLoader = _require$2.PrecompiledLoader;
	var tests = tests$1;
	var globals = globals_1;
	var _require2$1 = object, Obj = _require2$1.Obj, EmitterObj = _require2$1.EmitterObj;
	var globalRuntime = runtime$1;
	var handleError = globalRuntime.handleError, Frame = globalRuntime.Frame;
	var expressApp = expressApp$1;
	// If the user is using the async API, *always* call it
	// asynchronously even if the template was synchronous.
	function callbackAsap(cb, err, res) {
	    asap(function() {
	        cb(err, res);
	    });
	}
	/**
	 * A no-op template, for use with {% include ignore missing %}
	 */ var noopTmplSrc = {
	    type: 'code',
	    obj: {
	        root: function root(env, context, frame, runtime, cb) {
	            try {
	                cb(null, '');
	            } catch (e) {
	                cb(handleError(e, null, null));
	            }
	        }
	    }
	};
	var Environment$2 = /*#__PURE__*/ function(_EmitterObj) {
	    _inheritsLoose(Environment, _EmitterObj);
	    function Environment() {
	        return _EmitterObj.apply(this, arguments) || this;
	    }
	    var _proto = Environment.prototype;
	    _proto.init = function init(loaders, opts) {
	        var _this = this;
	        // The dev flag determines the trace that'll be shown on errors.
	        // If set to true, returns the full trace from the error point,
	        // otherwise will return trace starting from Template.render
	        // (the full trace from within nunjucks may confuse developers using
	        //  the library)
	        // defaults to false
	        opts = this.opts = opts || {};
	        this.opts.dev = !!opts.dev;
	        // The autoescape flag sets global autoescaping. If true,
	        // every string variable will be escaped by default.
	        // If false, strings can be manually escaped using the `escape` filter.
	        // defaults to true
	        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;
	        // If true, this will make the system throw errors if trying
	        // to output a null or undefined value
	        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
	        this.opts.trimBlocks = !!opts.trimBlocks;
	        this.opts.lstripBlocks = !!opts.lstripBlocks;
	        this.loaders = [];
	        if (!loaders) {
	            // The filesystem loader is only available server-side
	            if (FileSystemLoader) {
	                this.loaders = [
	                    new FileSystemLoader('views')
	                ];
	            } else if (WebLoader) {
	                this.loaders = [
	                    new WebLoader('/views')
	                ];
	            }
	        } else {
	            this.loaders = lib$2.isArray(loaders) ? loaders : [
	                loaders
	            ];
	        }
	        // It's easy to use precompiled templates: just include them
	        // before you configure nunjucks and this will automatically
	        // pick it up and use it
	        if (typeof window !== 'undefined' && window.nunjucksPrecompiled) {
	            this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
	        }
	        this._initLoaders();
	        this.globals = globals();
	        this.filters = {};
	        this.tests = {};
	        this.asyncFilters = [];
	        this.extensions = {};
	        this.extensionsList = [];
	        lib$2._entries(filters).forEach(function(_ref) {
	            var name = _ref[0], filter = _ref[1];
	            return _this.addFilter(name, filter);
	        });
	        lib$2._entries(tests).forEach(function(_ref2) {
	            var name = _ref2[0], test = _ref2[1];
	            return _this.addTest(name, test);
	        });
	    };
	    _proto._initLoaders = function _initLoaders() {
	        var _this2 = this;
	        this.loaders.forEach(function(loader) {
	            // Caching and cache busting
	            loader.cache = {};
	            if (typeof loader.on === 'function') {
	                loader.on('update', function(name, fullname) {
	                    loader.cache[name] = null;
	                    _this2.emit('update', name, fullname, loader);
	                });
	                loader.on('load', function(name, source) {
	                    _this2.emit('load', name, source, loader);
	                });
	            }
	        });
	    };
	    _proto.invalidateCache = function invalidateCache() {
	        this.loaders.forEach(function(loader) {
	            loader.cache = {};
	        });
	    };
	    _proto.addExtension = function addExtension(name, extension) {
	        extension.__name = name;
	        this.extensions[name] = extension;
	        this.extensionsList.push(extension);
	        return this;
	    };
	    _proto.removeExtension = function removeExtension(name) {
	        var extension = this.getExtension(name);
	        if (!extension) {
	            return;
	        }
	        this.extensionsList = lib$2.without(this.extensionsList, extension);
	        delete this.extensions[name];
	    };
	    _proto.getExtension = function getExtension(name) {
	        return this.extensions[name];
	    };
	    _proto.hasExtension = function hasExtension(name) {
	        return !!this.extensions[name];
	    };
	    _proto.addGlobal = function addGlobal(name, value) {
	        this.globals[name] = value;
	        return this;
	    };
	    _proto.getGlobal = function getGlobal(name) {
	        if (typeof this.globals[name] === 'undefined') {
	            throw new Error('global not found: ' + name);
	        }
	        return this.globals[name];
	    };
	    _proto.addFilter = function addFilter(name, func, async) {
	        var wrapped = func;
	        if (async) {
	            this.asyncFilters.push(name);
	        }
	        this.filters[name] = wrapped;
	        return this;
	    };
	    _proto.getFilter = function getFilter(name) {
	        if (!this.filters[name]) {
	            throw new Error('filter not found: ' + name);
	        }
	        return this.filters[name];
	    };
	    _proto.addTest = function addTest(name, func) {
	        this.tests[name] = func;
	        return this;
	    };
	    _proto.getTest = function getTest(name) {
	        if (!this.tests[name]) {
	            throw new Error('test not found: ' + name);
	        }
	        return this.tests[name];
	    };
	    _proto.resolveTemplate = function resolveTemplate(loader, parentName, filename) {
	        var isRelative = loader.isRelative && parentName ? loader.isRelative(filename) : false;
	        return isRelative && loader.resolve ? loader.resolve(parentName, filename) : filename;
	    };
	    _proto.getTemplate = function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
	        var _this3 = this;
	        var that = this;
	        var tmpl = null;
	        if (name && name.raw) {
	            // this fixes autoescape for templates referenced in symbols
	            name = name.raw;
	        }
	        if (lib$2.isFunction(parentName)) {
	            cb = parentName;
	            parentName = null;
	            eagerCompile = eagerCompile || false;
	        }
	        if (lib$2.isFunction(eagerCompile)) {
	            cb = eagerCompile;
	            eagerCompile = false;
	        }
	        if (_instanceof$4(name, Template$1)) {
	            tmpl = name;
	        } else if (typeof name !== 'string') {
	            throw new Error('template names must be a string: ' + name);
	        } else {
	            for(var i = 0; i < this.loaders.length; i++){
	                var loader = this.loaders[i];
	                tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];
	                if (tmpl) {
	                    break;
	                }
	            }
	        }
	        if (tmpl) {
	            if (eagerCompile) {
	                tmpl.compile();
	            }
	            if (cb) {
	                cb(null, tmpl);
	                return undefined;
	            } else {
	                return tmpl;
	            }
	        }
	        var syncResult;
	        var createTemplate = function createTemplate(err, info) {
	            if (!info && !err && !ignoreMissing) {
	                err = new Error('template not found: ' + name);
	            }
	            if (err) {
	                if (cb) {
	                    cb(err);
	                    return;
	                } else {
	                    throw err;
	                }
	            }
	            var newTmpl;
	            if (!info) {
	                newTmpl = new Template$1(noopTmplSrc, _this3, '', eagerCompile);
	            } else {
	                newTmpl = new Template$1(info.src, _this3, info.path, eagerCompile);
	                if (!info.noCache) {
	                    info.loader.cache[name] = newTmpl;
	                }
	            }
	            if (cb) {
	                cb(null, newTmpl);
	            } else {
	                syncResult = newTmpl;
	            }
	        };
	        lib$2.asyncIter(this.loaders, function(loader, i, next, done) {
	            function handle(err, src) {
	                if (err) {
	                    done(err);
	                } else if (src) {
	                    src.loader = loader;
	                    done(null, src);
	                } else {
	                    next();
	                }
	            }
	            // Resolve name relative to parentName
	            name = that.resolveTemplate(loader, parentName, name);
	            if (loader.async) {
	                loader.getSource(name, handle);
	            } else {
	                handle(null, loader.getSource(name));
	            }
	        }, createTemplate);
	        return syncResult;
	    };
	    _proto.express = function express(app) {
	        return expressApp(this, app);
	    };
	    _proto.render = function render(name, ctx, cb) {
	        if (lib$2.isFunction(ctx)) {
	            cb = ctx;
	            ctx = null;
	        }
	        // We support a synchronous API to make it easier to migrate
	        // existing code to async. This works because if you don't do
	        // anything async work, the whole thing is actually run
	        // synchronously.
	        var syncResult = null;
	        this.getTemplate(name, function(err, tmpl) {
	            if (err && cb) {
	                callbackAsap(cb, err);
	            } else if (err) {
	                throw err;
	            } else {
	                syncResult = tmpl.render(ctx, cb);
	            }
	        });
	        return syncResult;
	    };
	    _proto.renderString = function renderString(src, ctx, opts, cb) {
	        if (lib$2.isFunction(opts)) {
	            cb = opts;
	            opts = {};
	        }
	        opts = opts || {};
	        var tmpl = new Template$1(src, this, opts.path);
	        return tmpl.render(ctx, cb);
	    };
	    _proto.waterfall = function waterfall(tasks, callback, forceAsync) {
	        return _waterfall(tasks, callback, forceAsync);
	    };
	    return Environment;
	}(EmitterObj);
	var Context = /*#__PURE__*/ function(_Obj) {
	    _inheritsLoose(Context, _Obj);
	    function Context() {
	        return _Obj.apply(this, arguments) || this;
	    }
	    var _proto2 = Context.prototype;
	    _proto2.init = function init(ctx, blocks, env) {
	        var _this4 = this;
	        // Has to be tied to an environment so we can tap into its globals.
	        this.env = env || new Environment$2();
	        // Make a duplicate of ctx
	        this.ctx = lib$2.extend({}, ctx);
	        this.blocks = {};
	        this.exported = [];
	        lib$2.keys(blocks).forEach(function(name) {
	            _this4.addBlock(name, blocks[name]);
	        });
	    };
	    _proto2.lookup = function lookup(name) {
	        // This is one of the most called functions, so optimize for
	        // the typical case where the name isn't in the globals
	        if (name in this.env.globals && !(name in this.ctx)) {
	            return this.env.globals[name];
	        } else {
	            return this.ctx[name];
	        }
	    };
	    _proto2.setVariable = function setVariable(name, val) {
	        this.ctx[name] = val;
	    };
	    _proto2.getVariables = function getVariables() {
	        return this.ctx;
	    };
	    _proto2.addBlock = function addBlock(name, block) {
	        this.blocks[name] = this.blocks[name] || [];
	        this.blocks[name].push(block);
	        return this;
	    };
	    _proto2.getBlock = function getBlock(name) {
	        if (!this.blocks[name]) {
	            throw new Error('unknown block "' + name + '"');
	        }
	        return this.blocks[name][0];
	    };
	    _proto2.getSuper = function getSuper(env, name, block, frame, runtime, cb) {
	        var idx = lib$2.indexOf(this.blocks[name] || [], block);
	        var blk = this.blocks[name][idx + 1];
	        var context = this;
	        if (idx === -1 || !blk) {
	            throw new Error('no super block available for "' + name + '"');
	        }
	        blk(env, context, frame, runtime, cb);
	    };
	    _proto2.addExport = function addExport(name) {
	        this.exported.push(name);
	    };
	    _proto2.getExported = function getExported() {
	        var _this5 = this;
	        var exported = {};
	        this.exported.forEach(function(name) {
	            exported[name] = _this5.ctx[name];
	        });
	        return exported;
	    };
	    return Context;
	}(Obj);
	var Template$1 = /*#__PURE__*/ function(_Obj2) {
	    _inheritsLoose(Template, _Obj2);
	    function Template() {
	        return _Obj2.apply(this, arguments) || this;
	    }
	    var _proto3 = Template.prototype;
	    _proto3.init = function init(src, env, path, eagerCompile) {
	        this.env = env || new Environment$2();
	        if (lib$2.isObject(src)) {
	            switch(src.type){
	                case 'code':
	                    this.tmplProps = src.obj;
	                    break;
	                case 'string':
	                    this.tmplStr = src.obj;
	                    break;
	                default:
	                    throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
	            }
	        } else if (lib$2.isString(src)) {
	            this.tmplStr = src;
	        } else {
	            throw new Error('src must be a string or an object describing the source');
	        }
	        this.path = path;
	        if (eagerCompile) {
	            try {
	                this._compile();
	            } catch (err) {
	                throw lib$2._prettifyError(this.path, this.env.opts.dev, err);
	            }
	        } else {
	            this.compiled = false;
	        }
	    };
	    _proto3.render = function render(ctx, parentFrame, cb) {
	        var _this6 = this;
	        if (typeof ctx === 'function') {
	            cb = ctx;
	            ctx = {};
	        } else if (typeof parentFrame === 'function') {
	            cb = parentFrame;
	            parentFrame = null;
	        }
	        // If there is a parent frame, we are being called from internal
	        // code of another template, and the internal system
	        // depends on the sync/async nature of the parent template
	        // to be inherited, so force an async callback
	        var forceAsync = !parentFrame;
	        // Catch compile errors for async rendering
	        try {
	            this.compile();
	        } catch (e) {
	            var err = lib$2._prettifyError(this.path, this.env.opts.dev, e);
	            if (cb) {
	                return callbackAsap(cb, err);
	            } else {
	                throw err;
	            }
	        }
	        var context = new Context(ctx || {}, this.blocks, this.env);
	        var frame = parentFrame ? parentFrame.push(true) : new Frame();
	        frame.topLevel = true;
	        var syncResult = null;
	        var didError = false;
	        this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err, res) {
	            // TODO: this is actually a bug in the compiled template (because waterfall
	            // tasks are both not passing errors up the chain of callbacks AND are not
	            // causing a return from the top-most render function). But fixing that
	            // will require a more substantial change to the compiler.
	            if (didError && cb && typeof res !== 'undefined') {
	                // prevent multiple calls to cb
	                return;
	            }
	            if (err) {
	                err = lib$2._prettifyError(_this6.path, _this6.env.opts.dev, err);
	                didError = true;
	            }
	            if (cb) {
	                if (forceAsync) {
	                    callbackAsap(cb, err, res);
	                } else {
	                    cb(err, res);
	                }
	            } else {
	                if (err) {
	                    throw err;
	                }
	                syncResult = res;
	            }
	        });
	        return syncResult;
	    };
	    _proto3.getExported = function getExported(ctx, parentFrame, cb) {
	        // eslint-disable-line consistent-return
	        if (typeof ctx === 'function') {
	            cb = ctx;
	            ctx = {};
	        }
	        if (typeof parentFrame === 'function') {
	            cb = parentFrame;
	            parentFrame = null;
	        }
	        // Catch compile errors for async rendering
	        try {
	            this.compile();
	        } catch (e) {
	            if (cb) {
	                return cb(e);
	            } else {
	                throw e;
	            }
	        }
	        var frame = parentFrame ? parentFrame.push() : new Frame();
	        frame.topLevel = true;
	        // Run the rootRenderFunc to populate the context with exported vars
	        var context = new Context(ctx || {}, this.blocks, this.env);
	        this.rootRenderFunc(this.env, context, frame, globalRuntime, function(err) {
	            if (err) {
	                cb(err, null);
	            } else {
	                cb(null, context.getExported());
	            }
	        });
	    };
	    _proto3.compile = function compile() {
	        if (!this.compiled) {
	            this._compile();
	        }
	    };
	    _proto3._compile = function _compile() {
	        var props;
	        if (this.tmplProps) {
	            props = this.tmplProps;
	        } else {
	            var source = compiler$2.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
	            var func = new Function(source); // eslint-disable-line no-new-func
	            props = func();
	        }
	        this.blocks = this._getBlocks(props);
	        this.rootRenderFunc = props.root;
	        this.compiled = true;
	    };
	    _proto3._getBlocks = function _getBlocks(props) {
	        var blocks = {};
	        lib$2.keys(props).forEach(function(k) {
	            if (k.slice(0, 2) === 'b_') {
	                blocks[k.slice(2)] = props[k];
	            }
	        });
	        return blocks;
	    };
	    return Template;
	}(Obj);
	var environment = {
	    Environment: Environment$2,
	    Template: Template$1
	};

	function precompileGlobal$1(templates, opts) {
	    var out = '';
	    opts = opts || {};
	    for(var i = 0; i < templates.length; i++){
	        var name = JSON.stringify(templates[i].name);
	        var template = templates[i].template;
	        out += '(function() {' + '(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})' + '[' + name + '] = (function() {\n' + template + '\n})();\n';
	        if (opts.asFunction) {
	            out += 'return function(ctx, cb) { return nunjucks.render(' + name + ', ctx, cb); }\n';
	        }
	        out += '})();\n';
	    }
	    return out;
	}
	var precompileGlobal_1 = precompileGlobal$1;

	var fs = require$$0;
	var path = require$$1;
	var _require$1 = libExports, _prettifyError = _require$1._prettifyError;
	var compiler$1 = compiler$3;
	var _require2 = environment, Environment$1 = _require2.Environment;
	var precompileGlobal = precompileGlobal_1;
	function match(filename, patterns) {
	    if (!Array.isArray(patterns)) {
	        return false;
	    }
	    return patterns.some(function(pattern) {
	        return filename.match(pattern);
	    });
	}
	function precompileString(str, opts) {
	    opts = opts || {};
	    opts.isString = true;
	    var env = opts.env || new Environment$1([]);
	    var wrapper = opts.wrapper || precompileGlobal;
	    if (!opts.name) {
	        throw new Error('the "name" option is required when compiling a string');
	    }
	    return wrapper([
	        _precompile(str, opts.name, env)
	    ], opts);
	}
	function precompile$1(input, opts) {
	    // The following options are available:
	    //
	    // * name: name of the template (auto-generated when compiling a directory)
	    // * isString: input is a string, not a file path
	    // * asFunction: generate a callable function
	    // * force: keep compiling on error
	    // * env: the Environment to use (gets extensions and async filters from it)
	    // * include: which file/folders to include (folders are auto-included, files are auto-excluded)
	    // * exclude: which file/folders to exclude (folders are auto-included, files are auto-excluded)
	    // * wrapper: function(templates, opts) {...}
	    //       Customize the output format to store the compiled template.
	    //       By default, templates are stored in a global variable used by the runtime.
	    //       A custom loader will be necessary to load your custom wrapper.
	    opts = opts || {};
	    var env = opts.env || new Environment$1([]);
	    var wrapper = opts.wrapper || precompileGlobal;
	    if (opts.isString) {
	        return precompileString(input, opts);
	    }
	    var pathStats = fs.existsSync(input) && fs.statSync(input);
	    var precompiled = [];
	    var templates = [];
	    function addTemplates(dir) {
	        fs.readdirSync(dir).forEach(function(file) {
	            var filepath = path.join(dir, file);
	            var subpath = filepath.substr(path.join(input, '/').length);
	            var stat = fs.statSync(filepath);
	            if (stat && stat.isDirectory()) {
	                subpath += '/';
	                if (!match(subpath, opts.exclude)) {
	                    addTemplates(filepath);
	                }
	            } else if (match(subpath, opts.include)) {
	                templates.push(filepath);
	            }
	        });
	    }
	    if (pathStats.isFile()) {
	        precompiled.push(_precompile(fs.readFileSync(input, 'utf-8'), opts.name || input, env));
	    } else if (pathStats.isDirectory()) {
	        addTemplates(input);
	        for(var i = 0; i < templates.length; i++){
	            var name = templates[i].replace(path.join(input, '/'), '');
	            try {
	                precompiled.push(_precompile(fs.readFileSync(templates[i], 'utf-8'), name, env));
	            } catch (e) {
	                if (opts.force) {
	                    // Don't stop generating the output if we're
	                    // forcing compilation.
	                    console.error(e); // eslint-disable-line no-console
	                } else {
	                    throw e;
	                }
	            }
	        }
	    }
	    return wrapper(precompiled, opts);
	}
	function _precompile(str, name, env) {
	    env = env || new Environment$1([]);
	    var asyncFilters = env.asyncFilters;
	    var extensions = env.extensionsList;
	    var template;
	    name = name.replace(/\\/g, '/');
	    try {
	        template = compiler$1.compile(str, asyncFilters, extensions, name, env.opts);
	    } catch (err) {
	        throw _prettifyError(name, false, err);
	    }
	    return {
	        name: name,
	        template: template
	    };
	}
	var precompile_1 = {
	    precompile: precompile$1,
	    precompileString: precompileString
	};

	function _instanceof$3(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function installCompat() {
	    /* eslint-disable camelcase */ // This must be called like `nunjucks.installCompat` so that `this`
	    // references the nunjucks instance
	    var runtime = this.runtime;
	    var lib = this.lib;
	    // Handle slim case where these 'modules' are excluded from the built source
	    var Compiler = this.compiler.Compiler;
	    var Parser = this.parser.Parser;
	    var nodes = this.nodes;
	    var lexer = this.lexer;
	    var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
	    var orig_memberLookup = runtime.memberLookup;
	    var orig_Compiler_assertType;
	    var orig_Parser_parseAggregate;
	    if (Compiler) {
	        orig_Compiler_assertType = Compiler.prototype.assertType;
	    }
	    if (Parser) {
	        orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
	    }
	    function uninstall() {
	        runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
	        runtime.memberLookup = orig_memberLookup;
	        if (Compiler) {
	            Compiler.prototype.assertType = orig_Compiler_assertType;
	        }
	        if (Parser) {
	            Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
	        }
	    }
	    runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
	        var val = orig_contextOrFrameLookup.apply(this, arguments);
	        if (val !== undefined) {
	            return val;
	        }
	        switch(key){
	            case 'True':
	                return true;
	            case 'False':
	                return false;
	            case 'None':
	                return null;
	            default:
	                return undefined;
	        }
	    };
	    function getTokensState(tokens) {
	        return {
	            index: tokens.index,
	            lineno: tokens.lineno,
	            colno: tokens.colno
	        };
	    }
	    if (browser$1.env.BUILD_TYPE !== 'SLIM' && nodes && Compiler && Parser) {
	        // i.e., not slim mode
	        var Slice = nodes.Node.extend('Slice', {
	            fields: [
	                'start',
	                'stop',
	                'step'
	            ],
	            init: function init(lineno, colno, start, stop, step) {
	                start = start || new nodes.Literal(lineno, colno, null);
	                stop = stop || new nodes.Literal(lineno, colno, null);
	                step = step || new nodes.Literal(lineno, colno, 1);
	                this.parent(lineno, colno, start, stop, step);
	            }
	        });
	        Compiler.prototype.assertType = function assertType(node) {
	            if (_instanceof$3(node, Slice)) {
	                return;
	            }
	            orig_Compiler_assertType.apply(this, arguments);
	        };
	        Compiler.prototype.compileSlice = function compileSlice(node, frame) {
	            this._emit('(');
	            this._compileExpression(node.start, frame);
	            this._emit('),(');
	            this._compileExpression(node.stop, frame);
	            this._emit('),(');
	            this._compileExpression(node.step, frame);
	            this._emit(')');
	        };
	        Parser.prototype.parseAggregate = function parseAggregate() {
	            var _this = this;
	            var origState = getTokensState(this.tokens);
	            // Set back one accounting for opening bracket/parens
	            origState.colno--;
	            origState.index--;
	            try {
	                return orig_Parser_parseAggregate.apply(this);
	            } catch (e) {
	                var errState = getTokensState(this.tokens);
	                var rethrow = function rethrow() {
	                    lib._assign(_this.tokens, errState);
	                    return e;
	                };
	                // Reset to state before original parseAggregate called
	                lib._assign(this.tokens, origState);
	                this.peeked = false;
	                var tok = this.peekToken();
	                if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
	                    throw rethrow();
	                } else {
	                    this.nextToken();
	                }
	                var node = new Slice(tok.lineno, tok.colno);
	                // If we don't encounter a colon while parsing, this is not a slice,
	                // so re-raise the original exception.
	                var isSlice = false;
	                for(var i = 0; i <= node.fields.length; i++){
	                    if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
	                        break;
	                    }
	                    if (i === node.fields.length) {
	                        if (isSlice) {
	                            this.fail('parseSlice: too many slice components', tok.lineno, tok.colno);
	                        } else {
	                            break;
	                        }
	                    }
	                    if (this.skip(lexer.TOKEN_COLON)) {
	                        isSlice = true;
	                    } else {
	                        var field = node.fields[i];
	                        node[field] = this.parseExpression();
	                        isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
	                    }
	                }
	                if (!isSlice) {
	                    throw rethrow();
	                }
	                return new nodes.Array(tok.lineno, tok.colno, [
	                    node
	                ]);
	            }
	        };
	    }
	    function sliceLookup(obj, start, stop, step) {
	        obj = obj || [];
	        if (start === null) {
	            start = step < 0 ? obj.length - 1 : 0;
	        }
	        if (stop === null) {
	            stop = step < 0 ? -1 : obj.length;
	        } else if (stop < 0) {
	            stop += obj.length;
	        }
	        if (start < 0) {
	            start += obj.length;
	        }
	        var results = [];
	        for(var i = start;; i += step){
	            if (i < 0 || i > obj.length) {
	                break;
	            }
	            if (step > 0 && i >= stop) {
	                break;
	            }
	            if (step < 0 && i <= stop) {
	                break;
	            }
	            results.push(runtime.memberLookup(obj, i));
	        }
	        return results;
	    }
	    function hasOwnProp(obj, key) {
	        return Object.prototype.hasOwnProperty.call(obj, key);
	    }
	    var ARRAY_MEMBERS = {
	        pop: function pop(index) {
	            if (index === undefined) {
	                return this.pop();
	            }
	            if (index >= this.length || index < 0) {
	                throw new Error('KeyError');
	            }
	            return this.splice(index, 1);
	        },
	        append: function append(element) {
	            return this.push(element);
	        },
	        remove: function remove(element) {
	            for(var i = 0; i < this.length; i++){
	                if (this[i] === element) {
	                    return this.splice(i, 1);
	                }
	            }
	            throw new Error('ValueError');
	        },
	        count: function count(element) {
	            var count = 0;
	            for(var i = 0; i < this.length; i++){
	                if (this[i] === element) {
	                    count++;
	                }
	            }
	            return count;
	        },
	        index: function index(element) {
	            var i;
	            if ((i = this.indexOf(element)) === -1) {
	                throw new Error('ValueError');
	            }
	            return i;
	        },
	        find: function find(element) {
	            return this.indexOf(element);
	        },
	        insert: function insert(index, elem) {
	            return this.splice(index, 0, elem);
	        }
	    };
	    var OBJECT_MEMBERS = {
	        items: function items() {
	            return lib._entries(this);
	        },
	        values: function values() {
	            return lib._values(this);
	        },
	        keys: function keys() {
	            return lib.keys(this);
	        },
	        get: function get(key, def) {
	            var output = this[key];
	            if (output === undefined) {
	                output = def;
	            }
	            return output;
	        },
	        has_key: function has_key(key) {
	            return hasOwnProp(this, key);
	        },
	        pop: function pop(key, def) {
	            var output = this[key];
	            if (output === undefined && def !== undefined) {
	                output = def;
	            } else if (output === undefined) {
	                throw new Error('KeyError');
	            } else {
	                delete this[key];
	            }
	            return output;
	        },
	        popitem: function popitem() {
	            var keys = lib.keys(this);
	            if (!keys.length) {
	                throw new Error('KeyError');
	            }
	            var k = keys[0];
	            var val = this[k];
	            delete this[k];
	            return [
	                k,
	                val
	            ];
	        },
	        setdefault: function setdefault(key, def) {
	            if (def === void 0) {
	                def = null;
	            }
	            if (!(key in this)) {
	                this[key] = def;
	            }
	            return this[key];
	        },
	        update: function update(kwargs) {
	            lib._assign(this, kwargs);
	            return null; // Always returns None
	        }
	    };
	    OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
	    OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
	    OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
	    runtime.memberLookup = function memberLookup(obj, val, autoescape) {
	        if (arguments.length === 4) {
	            return sliceLookup.apply(this, arguments);
	        }
	        obj = obj || {};
	        // If the object is an object, return any of the methods that Python would
	        // otherwise provide.
	        if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
	            return ARRAY_MEMBERS[val].bind(obj);
	        }
	        if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
	            return OBJECT_MEMBERS[val].bind(obj);
	        }
	        return orig_memberLookup.apply(this, arguments);
	    };
	    return uninstall;
	}
	var jinjaCompat = installCompat;

	var lib$1 = libExports;
	var _require = environment, Environment = _require.Environment, Template = _require.Template;
	var Loader = loader;
	var loaders = loaders$1;
	var precompile = precompile_1;
	var compiler = compiler$3;
	var parser = parser$2;
	var lexer = lexer$2;
	var runtime = runtime$1;
	var nodes = nodes$4;
	var installJinjaCompat = jinjaCompat;
	// A single instance of an environment, since this is so commonly used
	var e;
	function configure(templatesPath, opts) {
	    opts = opts || {};
	    if (lib$1.isObject(templatesPath)) {
	        opts = templatesPath;
	        templatesPath = null;
	    }
	    var TemplateLoader;
	    if (loaders.FileSystemLoader) {
	        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
	            watch: opts.watch,
	            noCache: opts.noCache
	        });
	    } else if (loaders.WebLoader) {
	        TemplateLoader = new loaders.WebLoader(templatesPath, {
	            useCache: opts.web && opts.web.useCache,
	            async: opts.web && opts.web.async
	        });
	    }
	    e = new Environment(TemplateLoader, opts);
	    if (opts && opts.express) {
	        e.express(opts.express);
	    }
	    return e;
	}
	var nunjucks = {
	    Environment: Environment,
	    Template: Template,
	    Loader: Loader,
	    FileSystemLoader: loaders.FileSystemLoader,
	    NodeResolveLoader: loaders.NodeResolveLoader,
	    PrecompiledLoader: loaders.PrecompiledLoader,
	    WebLoader: loaders.WebLoader,
	    compiler: compiler,
	    parser: parser,
	    lexer: lexer,
	    runtime: runtime,
	    lib: lib$1,
	    nodes: nodes,
	    installJinjaCompat: installJinjaCompat,
	    configure: configure,
	    reset: function reset() {
	        e = undefined;
	    },
	    compile: function compile(src, env, path, eagerCompile) {
	        if (!e) {
	            configure();
	        }
	        return new Template(src, env, path, eagerCompile);
	    },
	    render: function render(name, ctx, cb) {
	        if (!e) {
	            configure();
	        }
	        return e.render(name, ctx, cb);
	    },
	    renderString: function renderString(src, ctx, cb) {
	        if (!e) {
	            configure();
	        }
	        return e.renderString(src, ctx, cb);
	    },
	    precompile: precompile ? precompile.precompile : undefined,
	    precompileString: precompile ? precompile.precompileString : undefined
	};
	var nj = /*@__PURE__*/ getDefaultExportFromCjs(nunjucks);

	/* eslint-disable no-bitwise */ var decodeCache = {};
	function getDecodeCache(exclude) {
	    var cache = decodeCache[exclude];
	    if (cache) {
	        return cache;
	    }
	    cache = decodeCache[exclude] = [];
	    for(var i = 0; i < 128; i++){
	        var ch = String.fromCharCode(i);
	        cache.push(ch);
	    }
	    for(var i1 = 0; i1 < exclude.length; i1++){
	        var ch1 = exclude.charCodeAt(i1);
	        cache[ch1] = '%' + ('0' + ch1.toString(16).toUpperCase()).slice(-2);
	    }
	    return cache;
	}
	// Decode percent-encoded string.
	//
	function decode$1(string, exclude) {
	    if (typeof exclude !== 'string') {
	        exclude = decode$1.defaultChars;
	    }
	    var cache = getDecodeCache(exclude);
	    return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
	        var result = '';
	        for(var i = 0, l = seq.length; i < l; i += 3){
	            var b1 = parseInt(seq.slice(i + 1, i + 3), 16);
	            if (b1 < 0x80) {
	                result += cache[b1];
	                continue;
	            }
	            if ((b1 & 0xE0) === 0xC0 && i + 3 < l) {
	                // 110xxxxx 10xxxxxx
	                var b2 = parseInt(seq.slice(i + 4, i + 6), 16);
	                if ((b2 & 0xC0) === 0x80) {
	                    var chr = b1 << 6 & 0x7C0 | b2 & 0x3F;
	                    if (chr < 0x80) {
	                        result += '\ufffd\ufffd';
	                    } else {
	                        result += String.fromCharCode(chr);
	                    }
	                    i += 3;
	                    continue;
	                }
	            }
	            if ((b1 & 0xF0) === 0xE0 && i + 6 < l) {
	                // 1110xxxx 10xxxxxx 10xxxxxx
	                var b21 = parseInt(seq.slice(i + 4, i + 6), 16);
	                var b3 = parseInt(seq.slice(i + 7, i + 9), 16);
	                if ((b21 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
	                    var chr1 = b1 << 12 & 0xF000 | b21 << 6 & 0xFC0 | b3 & 0x3F;
	                    if (chr1 < 0x800 || chr1 >= 0xD800 && chr1 <= 0xDFFF) {
	                        result += '\ufffd\ufffd\ufffd';
	                    } else {
	                        result += String.fromCharCode(chr1);
	                    }
	                    i += 6;
	                    continue;
	                }
	            }
	            if ((b1 & 0xF8) === 0xF0 && i + 9 < l) {
	                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
	                var b22 = parseInt(seq.slice(i + 4, i + 6), 16);
	                var b31 = parseInt(seq.slice(i + 7, i + 9), 16);
	                var b4 = parseInt(seq.slice(i + 10, i + 12), 16);
	                if ((b22 & 0xC0) === 0x80 && (b31 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
	                    var chr2 = b1 << 18 & 0x1C0000 | b22 << 12 & 0x3F000 | b31 << 6 & 0xFC0 | b4 & 0x3F;
	                    if (chr2 < 0x10000 || chr2 > 0x10FFFF) {
	                        result += '\ufffd\ufffd\ufffd\ufffd';
	                    } else {
	                        chr2 -= 0x10000;
	                        result += String.fromCharCode(0xD800 + (chr2 >> 10), 0xDC00 + (chr2 & 0x3FF));
	                    }
	                    i += 9;
	                    continue;
	                }
	            }
	            result += '\ufffd';
	        }
	        return result;
	    });
	}
	decode$1.defaultChars = ';/?:@&=+$,#';
	decode$1.componentChars = '';

	var encodeCache = {};
	// Create a lookup array where anything but characters in `chars` string
	// and alphanumeric chars is percent-encoded.
	//
	function getEncodeCache(exclude) {
	    var cache = encodeCache[exclude];
	    if (cache) {
	        return cache;
	    }
	    cache = encodeCache[exclude] = [];
	    for(var i = 0; i < 128; i++){
	        var ch = String.fromCharCode(i);
	        if (/^[0-9a-z]$/i.test(ch)) {
	            // always allow unencoded alphanumeric characters
	            cache.push(ch);
	        } else {
	            cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
	        }
	    }
	    for(var i1 = 0; i1 < exclude.length; i1++){
	        cache[exclude.charCodeAt(i1)] = exclude[i1];
	    }
	    return cache;
	}
	// Encode unsafe characters with percent-encoding, skipping already
	// encoded sequences.
	//
	//  - string       - string to encode
	//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
	//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
	//
	function encode$1(string, exclude, keepEscaped) {
	    if (typeof exclude !== 'string') {
	        // encode(string, keepEscaped)
	        keepEscaped = exclude;
	        exclude = encode$1.defaultChars;
	    }
	    if (typeof keepEscaped === 'undefined') {
	        keepEscaped = true;
	    }
	    var cache = getEncodeCache(exclude);
	    var result = '';
	    for(var i = 0, l = string.length; i < l; i++){
	        var code = string.charCodeAt(i);
	        if (keepEscaped && code === 0x25 /* % */  && i + 2 < l) {
	            if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
	                result += string.slice(i, i + 3);
	                i += 2;
	                continue;
	            }
	        }
	        if (code < 128) {
	            result += cache[code];
	            continue;
	        }
	        if (code >= 0xD800 && code <= 0xDFFF) {
	            if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
	                var nextCode = string.charCodeAt(i + 1);
	                if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
	                    result += encodeURIComponent(string[i] + string[i + 1]);
	                    i++;
	                    continue;
	                }
	            }
	            result += '%EF%BF%BD';
	            continue;
	        }
	        result += encodeURIComponent(string[i]);
	    }
	    return result;
	}
	encode$1.defaultChars = ";/?:@&=+$,-_.!~*'()#";
	encode$1.componentChars = "-_.!~*'()";

	function format(url) {
	    var result = '';
	    result += url.protocol || '';
	    result += url.slashes ? '//' : '';
	    result += url.auth ? url.auth + '@' : '';
	    if (url.hostname && url.hostname.indexOf(':') !== -1) {
	        // ipv6 address
	        result += '[' + url.hostname + ']';
	    } else {
	        result += url.hostname || '';
	    }
	    result += url.port ? ':' + url.port : '';
	    result += url.pathname || '';
	    result += url.search || '';
	    result += url.hash || '';
	    return result;
	}

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	//
	// Changes from joyent/node:
	//
	// 1. No leading slash in paths,
	//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
	//
	// 2. Backslashes are not replaced with slashes,
	//    so `http:\\example.org\` is treated like a relative path
	//
	// 3. Trailing colon is treated like a part of the path,
	//    i.e. in `http://example.org:foo` pathname is `:foo`
	//
	// 4. Nothing is URL-encoded in the resulting object,
	//    (in joyent/node some chars in auth and paths are encoded)
	//
	// 5. `url.parse()` does not have `parseQueryString` argument
	//
	// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
	//    which can be constructed using other parts of the url.
	//
	function _instanceof$2(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	function Url() {
	    this.protocol = null;
	    this.slashes = null;
	    this.auth = null;
	    this.port = null;
	    this.hostname = null;
	    this.hash = null;
	    this.search = null;
	    this.pathname = null;
	}
	// Reference: RFC 3986, RFC 1808, RFC 2396
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i;
	var portPattern = /:[0-9]*$/;
	// Special case for a simple path URL
	/* eslint-disable-next-line no-useless-escape */ var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
	// RFC 2396: characters reserved for delimiting URLs.
	// We actually just auto-escape these.
	var delims = [
	    '<',
	    '>',
	    '"',
	    '`',
	    ' ',
	    '\r',
	    '\n',
	    '\t'
	];
	// RFC 2396: characters not allowed for various reasons.
	var unwise = [
	    '{',
	    '}',
	    '|',
	    '\\',
	    '^',
	    '`'
	].concat(delims);
	// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	var autoEscape = [
	    '\''
	].concat(unwise);
	// Characters that are never ever allowed in a hostname.
	// Note that any invalid chars are also handled, but these
	// are the ones that are *expected* to be seen, so we fast-path
	// them.
	var nonHostChars = [
	    '%',
	    '/',
	    '?',
	    ';',
	    '#'
	].concat(autoEscape);
	var hostEndingChars = [
	    '/',
	    '?',
	    '#'
	];
	var hostnameMaxLen = 255;
	var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
	var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
	// protocols that can allow "unsafe" and "unwise" chars.
	// protocols that never have a hostname.
	var hostlessProtocol = {
	    javascript: true,
	    'javascript:': true
	};
	// protocols that always contain a // bit.
	var slashedProtocol = {
	    http: true,
	    https: true,
	    ftp: true,
	    gopher: true,
	    file: true,
	    'http:': true,
	    'https:': true,
	    'ftp:': true,
	    'gopher:': true,
	    'file:': true
	};
	function urlParse(url, slashesDenoteHost) {
	    if (url && _instanceof$2(url, Url)) return url;
	    var u = new Url();
	    u.parse(url, slashesDenoteHost);
	    return u;
	}
	Url.prototype.parse = function(url, slashesDenoteHost) {
	    var lowerProto, hec, slashes;
	    var rest = url;
	    // trim before proceeding.
	    // This is to support parse stuff like "  http://foo.com  \n"
	    rest = rest.trim();
	    if (!slashesDenoteHost && url.split('#').length === 1) {
	        // Try fast path regexp
	        var simplePath = simplePathPattern.exec(rest);
	        if (simplePath) {
	            this.pathname = simplePath[1];
	            if (simplePath[2]) {
	                this.search = simplePath[2];
	            }
	            return this;
	        }
	    }
	    var proto = protocolPattern.exec(rest);
	    if (proto) {
	        proto = proto[0];
	        lowerProto = proto.toLowerCase();
	        this.protocol = proto;
	        rest = rest.substr(proto.length);
	    }
	    // figure out if it's got a host
	    // user@server is *always* interpreted as a hostname, and url
	    // resolution will treat //foo/bar as host=foo,path=bar because that's
	    // how the browser resolves relative URLs.
	    /* eslint-disable-next-line no-useless-escape */ if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	        slashes = rest.substr(0, 2) === '//';
	        if (slashes && !(proto && hostlessProtocol[proto])) {
	            rest = rest.substr(2);
	            this.slashes = true;
	        }
	    }
	    if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
	        // there's a hostname.
	        // the first instance of /, ?, ;, or # ends the host.
	        //
	        // If there is an @ in the hostname, then non-host chars *are* allowed
	        // to the left of the last @ sign, unless some host-ending character
	        // comes *before* the @-sign.
	        // URLs are obnoxious.
	        //
	        // ex:
	        // http://a@b@c/ => user:a@b host:c
	        // http://a@b?@c => user:a host:c path:/?@c
	        // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	        // Review our test case against browsers more comprehensively.
	        // find the first instance of any hostEndingChars
	        var hostEnd = -1;
	        for(var i = 0; i < hostEndingChars.length; i++){
	            hec = rest.indexOf(hostEndingChars[i]);
	            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
	                hostEnd = hec;
	            }
	        }
	        // at this point, either we have an explicit point where the
	        // auth portion cannot go past, or the last @ char is the decider.
	        var auth, atSign;
	        if (hostEnd === -1) {
	            // atSign can be anywhere.
	            atSign = rest.lastIndexOf('@');
	        } else {
	            // atSign must be in auth portion.
	            // http://a@b/c@d => host:b auth:a path:/c@d
	            atSign = rest.lastIndexOf('@', hostEnd);
	        }
	        // Now we have a portion which is definitely the auth.
	        // Pull that off.
	        if (atSign !== -1) {
	            auth = rest.slice(0, atSign);
	            rest = rest.slice(atSign + 1);
	            this.auth = auth;
	        }
	        // the host is the remaining to the left of the first non-host char
	        hostEnd = -1;
	        for(var i1 = 0; i1 < nonHostChars.length; i1++){
	            hec = rest.indexOf(nonHostChars[i1]);
	            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
	                hostEnd = hec;
	            }
	        }
	        // if we still have not hit it, then the entire thing is a host.
	        if (hostEnd === -1) {
	            hostEnd = rest.length;
	        }
	        if (rest[hostEnd - 1] === ':') {
	            hostEnd--;
	        }
	        var host = rest.slice(0, hostEnd);
	        rest = rest.slice(hostEnd);
	        // pull out port.
	        this.parseHost(host);
	        // we've indicated that there is a hostname,
	        // so even if it's empty, it has to be present.
	        this.hostname = this.hostname || '';
	        // if hostname begins with [ and ends with ]
	        // assume that it's an IPv6 address.
	        var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';
	        // validate a little.
	        if (!ipv6Hostname) {
	            var hostparts = this.hostname.split(/\./);
	            for(var i2 = 0, l = hostparts.length; i2 < l; i2++){
	                var part = hostparts[i2];
	                if (!part) {
	                    continue;
	                }
	                if (!part.match(hostnamePartPattern)) {
	                    var newpart = '';
	                    for(var j = 0, k = part.length; j < k; j++){
	                        if (part.charCodeAt(j) > 127) {
	                            // we replace non-ASCII char with a temporary placeholder
	                            // we need this to make sure size of hostname is not
	                            // broken by replacing non-ASCII by nothing
	                            newpart += 'x';
	                        } else {
	                            newpart += part[j];
	                        }
	                    }
	                    // we test again with ASCII char only
	                    if (!newpart.match(hostnamePartPattern)) {
	                        var validParts = hostparts.slice(0, i2);
	                        var notHost = hostparts.slice(i2 + 1);
	                        var bit = part.match(hostnamePartStart);
	                        if (bit) {
	                            validParts.push(bit[1]);
	                            notHost.unshift(bit[2]);
	                        }
	                        if (notHost.length) {
	                            rest = notHost.join('.') + rest;
	                        }
	                        this.hostname = validParts.join('.');
	                        break;
	                    }
	                }
	            }
	        }
	        if (this.hostname.length > hostnameMaxLen) {
	            this.hostname = '';
	        }
	        // strip [ and ] from the hostname
	        // the host field still retains them, though
	        if (ipv6Hostname) {
	            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	        }
	    }
	    // chop off from the tail first.
	    var hash = rest.indexOf('#');
	    if (hash !== -1) {
	        // got a fragment string.
	        this.hash = rest.substr(hash);
	        rest = rest.slice(0, hash);
	    }
	    var qm = rest.indexOf('?');
	    if (qm !== -1) {
	        this.search = rest.substr(qm);
	        rest = rest.slice(0, qm);
	    }
	    if (rest) {
	        this.pathname = rest;
	    }
	    if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
	        this.pathname = '';
	    }
	    return this;
	};
	Url.prototype.parseHost = function(host) {
	    var port = portPattern.exec(host);
	    if (port) {
	        port = port[0];
	        if (port !== ':') {
	            this.port = port.substr(1);
	        }
	        host = host.substr(0, host.length - port.length);
	    }
	    if (host) {
	        this.hostname = host;
	    }
	};

	var mdurl = /*#__PURE__*/Object.freeze({
		__proto__: null,
		decode: decode$1,
		encode: encode$1,
		format: format,
		parse: urlParse
	});

	var Any = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

	var Cc = /[\0-\x1F\x7F-\x9F]/;

	var regex$1 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

	var P = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

	var regex = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;

	var Z = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

	var ucmicro = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Any: Any,
		Cc: Cc,
		Cf: regex$1,
		P: P,
		S: regex,
		Z: Z
	});

	// Generated using scripts/write-decode-map.ts
	var htmlDecodeTree = new Uint16Array(// prettier-ignore
	"\u1d41<\xd5\u0131\u028a\u049d\u057b\u05d0\u0675\u06de\u07a2\u07d6\u080f\u0a4a\u0a91\u0da1\u0e6d\u0f09\u0f26\u10ca\u1228\u12e1\u1415\u149d\u14c3\u14df\u1525\0\0\0\0\0\0\u156b\u16cd\u198d\u1c12\u1ddd\u1f7e\u2060\u21b0\u228d\u23c0\u23fb\u2442\u2824\u2912\u2d08\u2e48\u2fce\u3016\u32ba\u3639\u37ac\u38fe\u3a28\u3a71\u3ae0\u3b2e\u0800EMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig\u803b\xc6\u40c6P\u803b&\u4026cute\u803b\xc1\u40c1reve;\u4102\u0100iyx}rc\u803b\xc2\u40c2;\u4410r;\uc000\ud835\udd04rave\u803b\xc0\u40c0pha;\u4391acr;\u4100d;\u6a53\u0100gp\x9d\xa1on;\u4104f;\uc000\ud835\udd38plyFunction;\u6061ing\u803b\xc5\u40c5\u0100cs\xbe\xc3r;\uc000\ud835\udc9cign;\u6254ilde\u803b\xc3\u40c3ml\u803b\xc4\u40c4\u0400aceforsu\xe5\xfb\xfe\u0117\u011c\u0122\u0127\u012a\u0100cr\xea\xf2kslash;\u6216\u0176\xf6\xf8;\u6ae7ed;\u6306y;\u4411\u0180crt\u0105\u010b\u0114ause;\u6235noullis;\u612ca;\u4392r;\uc000\ud835\udd05pf;\uc000\ud835\udd39eve;\u42d8c\xf2\u0113mpeq;\u624e\u0700HOacdefhilorsu\u014d\u0151\u0156\u0180\u019e\u01a2\u01b5\u01b7\u01ba\u01dc\u0215\u0273\u0278\u027ecy;\u4427PY\u803b\xa9\u40a9\u0180cpy\u015d\u0162\u017aute;\u4106\u0100;i\u0167\u0168\u62d2talDifferentialD;\u6145leys;\u612d\u0200aeio\u0189\u018e\u0194\u0198ron;\u410cdil\u803b\xc7\u40c7rc;\u4108nint;\u6230ot;\u410a\u0100dn\u01a7\u01adilla;\u40b8terDot;\u40b7\xf2\u017fi;\u43a7rcle\u0200DMPT\u01c7\u01cb\u01d1\u01d6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01e2\u01f8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020foubleQuote;\u601duote;\u6019\u0200lnpu\u021e\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6a74\u0180git\u022f\u0236\u023aruent;\u6261nt;\u622fourIntegral;\u622e\u0100fr\u024c\u024e;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6a2fcr;\uc000\ud835\udc9ep\u0100;C\u0284\u0285\u62d3ap;\u624d\u0580DJSZacefios\u02a0\u02ac\u02b0\u02b4\u02b8\u02cb\u02d7\u02e1\u02e6\u0333\u048d\u0100;o\u0179\u02a5trahd;\u6911cy;\u4402cy;\u4405cy;\u440f\u0180grs\u02bf\u02c4\u02c7ger;\u6021r;\u61a1hv;\u6ae4\u0100ay\u02d0\u02d5ron;\u410e;\u4414l\u0100;t\u02dd\u02de\u6207a;\u4394r;\uc000\ud835\udd07\u0100af\u02eb\u0327\u0100cm\u02f0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031ccute;\u40b4o\u0174\u030b\u030d;\u42d9bleAcute;\u42ddrave;\u4060ilde;\u42dcond;\u62c4ferentialD;\u6146\u0470\u033d\0\0\0\u0342\u0354\0\u0405f;\uc000\ud835\udd3b\u0180;DE\u0348\u0349\u034d\u40a8ot;\u60dcqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03cf\u03e2\u03f8ontourIntegra\xec\u0239o\u0274\u0379\0\0\u037b\xbb\u0349nArrow;\u61d3\u0100eo\u0387\u03a4ft\u0180ART\u0390\u0396\u03a1rrow;\u61d0ightArrow;\u61d4e\xe5\u02cang\u0100LR\u03ab\u03c4eft\u0100AR\u03b3\u03b9rrow;\u67f8ightArrow;\u67faightArrow;\u67f9ight\u0100AT\u03d8\u03derrow;\u61d2ee;\u62a8p\u0241\u03e9\0\0\u03efrrow;\u61d1ownArrow;\u61d5erticalBar;\u6225n\u0300ABLRTa\u0412\u042a\u0430\u045e\u047f\u037crrow\u0180;BU\u041d\u041e\u0422\u6193ar;\u6913pArrow;\u61f5reve;\u4311eft\u02d2\u043a\0\u0446\0\u0450ightVector;\u6950eeVector;\u695eector\u0100;B\u0459\u045a\u61bdar;\u6956ight\u01d4\u0467\0\u0471eeVector;\u695fector\u0100;B\u047a\u047b\u61c1ar;\u6957ee\u0100;A\u0486\u0487\u62a4rrow;\u61a7\u0100ct\u0492\u0497r;\uc000\ud835\udc9frok;\u4110\u0800NTacdfglmopqstux\u04bd\u04c0\u04c4\u04cb\u04de\u04e2\u04e7\u04ee\u04f5\u0521\u052f\u0536\u0552\u055d\u0560\u0565G;\u414aH\u803b\xd0\u40d0cute\u803b\xc9\u40c9\u0180aiy\u04d2\u04d7\u04dcron;\u411arc\u803b\xca\u40ca;\u442dot;\u4116r;\uc000\ud835\udd08rave\u803b\xc8\u40c8ement;\u6208\u0100ap\u04fa\u04fecr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65fberySmallSquare;\u65ab\u0100gp\u0526\u052aon;\u4118f;\uc000\ud835\udd3csilon;\u4395u\u0100ai\u053c\u0549l\u0100;T\u0542\u0543\u6a75ilde;\u6242librium;\u61cc\u0100ci\u0557\u055ar;\u6130m;\u6a73a;\u4397ml\u803b\xcb\u40cb\u0100ip\u056a\u056fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058d\u05b2\u05ccy;\u4424r;\uc000\ud835\udd09lled\u0253\u0597\0\0\u05a3mallSquare;\u65fcerySmallSquare;\u65aa\u0370\u05ba\0\u05bf\0\0\u05c4f;\uc000\ud835\udd3dAll;\u6200riertrf;\u6131c\xf2\u05cb\u0600JTabcdfgorst\u05e8\u05ec\u05ef\u05fa\u0600\u0612\u0616\u061b\u061d\u0623\u066c\u0672cy;\u4403\u803b>\u403emma\u0100;d\u05f7\u05f8\u4393;\u43dcreve;\u411e\u0180eiy\u0607\u060c\u0610dil;\u4122rc;\u411c;\u4413ot;\u4120r;\uc000\ud835\udd0a;\u62d9pf;\uc000\ud835\udd3eeater\u0300EFGLST\u0635\u0644\u064e\u0656\u065b\u0666qual\u0100;L\u063e\u063f\u6265ess;\u62dbullEqual;\u6267reater;\u6aa2ess;\u6277lantEqual;\u6a7eilde;\u6273cr;\uc000\ud835\udca2;\u626b\u0400Aacfiosu\u0685\u068b\u0696\u069b\u069e\u06aa\u06be\u06caRDcy;\u442a\u0100ct\u0690\u0694ek;\u42c7;\u405eirc;\u4124r;\u610clbertSpace;\u610b\u01f0\u06af\0\u06b2f;\u610dizontalLine;\u6500\u0100ct\u06c3\u06c5\xf2\u06a9rok;\u4126mp\u0144\u06d0\u06d8ownHum\xf0\u012fqual;\u624f\u0700EJOacdfgmnostu\u06fa\u06fe\u0703\u0707\u070e\u071a\u071e\u0721\u0728\u0744\u0778\u078b\u078f\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803b\xcd\u40cd\u0100iy\u0713\u0718rc\u803b\xce\u40ce;\u4418ot;\u4130r;\u6111rave\u803b\xcc\u40cc\u0180;ap\u0720\u072f\u073f\u0100cg\u0734\u0737r;\u412ainaryI;\u6148lie\xf3\u03dd\u01f4\u0749\0\u0762\u0100;e\u074d\u074e\u622c\u0100gr\u0753\u0758ral;\u622bsection;\u62c2isible\u0100CT\u076c\u0772omma;\u6063imes;\u6062\u0180gpt\u077f\u0783\u0788on;\u412ef;\uc000\ud835\udd40a;\u4399cr;\u6110ilde;\u4128\u01eb\u079a\0\u079ecy;\u4406l\u803b\xcf\u40cf\u0280cfosu\u07ac\u07b7\u07bc\u07c2\u07d0\u0100iy\u07b1\u07b5rc;\u4134;\u4419r;\uc000\ud835\udd0dpf;\uc000\ud835\udd41\u01e3\u07c7\0\u07ccr;\uc000\ud835\udca5rcy;\u4408kcy;\u4404\u0380HJacfos\u07e4\u07e8\u07ec\u07f1\u07fd\u0802\u0808cy;\u4425cy;\u440cppa;\u439a\u0100ey\u07f6\u07fbdil;\u4136;\u441ar;\uc000\ud835\udd0epf;\uc000\ud835\udd42cr;\uc000\ud835\udca6\u0580JTaceflmost\u0825\u0829\u082c\u0850\u0863\u09b3\u09b8\u09c7\u09cd\u0a37\u0a47cy;\u4409\u803b<\u403c\u0280cmnpr\u0837\u083c\u0841\u0844\u084dute;\u4139bda;\u439bg;\u67ealacetrf;\u6112r;\u619e\u0180aey\u0857\u085c\u0861ron;\u413ddil;\u413b;\u441b\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087e\u08a9\u08b1\u08e0\u08e6\u08fc\u092f\u095b\u0390\u096a\u0100nr\u0883\u088fgleBracket;\u67e8row\u0180;BR\u0899\u089a\u089e\u6190ar;\u61e4ightArrow;\u61c6eiling;\u6308o\u01f5\u08b7\0\u08c3bleBracket;\u67e6n\u01d4\u08c8\0\u08d2eeVector;\u6961ector\u0100;B\u08db\u08dc\u61c3ar;\u6959loor;\u630aight\u0100AV\u08ef\u08f5rrow;\u6194ector;\u694e\u0100er\u0901\u0917e\u0180;AV\u0909\u090a\u0910\u62a3rrow;\u61a4ector;\u695aiangle\u0180;BE\u0924\u0925\u0929\u62b2ar;\u69cfqual;\u62b4p\u0180DTV\u0937\u0942\u094cownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61bfar;\u6958ector\u0100;B\u0965\u0966\u61bcar;\u6952ight\xe1\u039cs\u0300EFGLST\u097e\u098b\u0995\u099d\u09a2\u09adqualGreater;\u62daullEqual;\u6266reater;\u6276ess;\u6aa1lantEqual;\u6a7dilde;\u6272r;\uc000\ud835\udd0f\u0100;e\u09bd\u09be\u62d8ftarrow;\u61daidot;\u413f\u0180npw\u09d4\u0a16\u0a1bg\u0200LRlr\u09de\u09f7\u0a02\u0a10eft\u0100AR\u09e6\u09ecrrow;\u67f5ightArrow;\u67f7ightArrow;\u67f6eft\u0100ar\u03b3\u0a0aight\xe1\u03bfight\xe1\u03caf;\uc000\ud835\udd43er\u0100LR\u0a22\u0a2ceftArrow;\u6199ightArrow;\u6198\u0180cht\u0a3e\u0a40\u0a42\xf2\u084c;\u61b0rok;\u4141;\u626a\u0400acefiosu\u0a5a\u0a5d\u0a60\u0a77\u0a7c\u0a85\u0a8b\u0a8ep;\u6905y;\u441c\u0100dl\u0a65\u0a6fiumSpace;\u605flintrf;\u6133r;\uc000\ud835\udd10nusPlus;\u6213pf;\uc000\ud835\udd44c\xf2\u0a76;\u439c\u0480Jacefostu\u0aa3\u0aa7\u0aad\u0ac0\u0b14\u0b19\u0d91\u0d97\u0d9ecy;\u440acute;\u4143\u0180aey\u0ab4\u0ab9\u0aberon;\u4147dil;\u4145;\u441d\u0180gsw\u0ac7\u0af0\u0b0eative\u0180MTV\u0ad3\u0adf\u0ae8ediumSpace;\u600bhi\u0100cn\u0ae6\u0ad8\xeb\u0ad9eryThi\xee\u0ad9ted\u0100GL\u0af8\u0b06reaterGreate\xf2\u0673essLes\xf3\u0a48Line;\u400ar;\uc000\ud835\udd11\u0200Bnpt\u0b22\u0b28\u0b37\u0b3areak;\u6060BreakingSpace;\u40a0f;\u6115\u0680;CDEGHLNPRSTV\u0b55\u0b56\u0b6a\u0b7c\u0ba1\u0beb\u0c04\u0c5e\u0c84\u0ca6\u0cd8\u0d61\u0d85\u6aec\u0100ou\u0b5b\u0b64ngruent;\u6262pCap;\u626doubleVerticalBar;\u6226\u0180lqx\u0b83\u0b8a\u0b9bement;\u6209ual\u0100;T\u0b92\u0b93\u6260ilde;\uc000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0bb6\u0bb7\u0bbd\u0bc9\u0bd3\u0bd8\u0be5\u626fqual;\u6271ullEqual;\uc000\u2267\u0338reater;\uc000\u226b\u0338ess;\u6279lantEqual;\uc000\u2a7e\u0338ilde;\u6275ump\u0144\u0bf2\u0bfdownHump;\uc000\u224e\u0338qual;\uc000\u224f\u0338e\u0100fs\u0c0a\u0c27tTriangle\u0180;BE\u0c1a\u0c1b\u0c21\u62eaar;\uc000\u29cf\u0338qual;\u62ecs\u0300;EGLST\u0c35\u0c36\u0c3c\u0c44\u0c4b\u0c58\u626equal;\u6270reater;\u6278ess;\uc000\u226a\u0338lantEqual;\uc000\u2a7d\u0338ilde;\u6274ested\u0100GL\u0c68\u0c79reaterGreater;\uc000\u2aa2\u0338essLess;\uc000\u2aa1\u0338recedes\u0180;ES\u0c92\u0c93\u0c9b\u6280qual;\uc000\u2aaf\u0338lantEqual;\u62e0\u0100ei\u0cab\u0cb9verseElement;\u620cghtTriangle\u0180;BE\u0ccb\u0ccc\u0cd2\u62ebar;\uc000\u29d0\u0338qual;\u62ed\u0100qu\u0cdd\u0d0cuareSu\u0100bp\u0ce8\u0cf9set\u0100;E\u0cf0\u0cf3\uc000\u228f\u0338qual;\u62e2erset\u0100;E\u0d03\u0d06\uc000\u2290\u0338qual;\u62e3\u0180bcp\u0d13\u0d24\u0d4eset\u0100;E\u0d1b\u0d1e\uc000\u2282\u20d2qual;\u6288ceeds\u0200;EST\u0d32\u0d33\u0d3b\u0d46\u6281qual;\uc000\u2ab0\u0338lantEqual;\u62e1ilde;\uc000\u227f\u0338erset\u0100;E\u0d58\u0d5b\uc000\u2283\u20d2qual;\u6289ilde\u0200;EFT\u0d6e\u0d6f\u0d75\u0d7f\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uc000\ud835\udca9ilde\u803b\xd1\u40d1;\u439d\u0700Eacdfgmoprstuv\u0dbd\u0dc2\u0dc9\u0dd5\u0ddb\u0de0\u0de7\u0dfc\u0e02\u0e20\u0e22\u0e32\u0e3f\u0e44lig;\u4152cute\u803b\xd3\u40d3\u0100iy\u0dce\u0dd3rc\u803b\xd4\u40d4;\u441eblac;\u4150r;\uc000\ud835\udd12rave\u803b\xd2\u40d2\u0180aei\u0dee\u0df2\u0df6cr;\u414cga;\u43a9cron;\u439fpf;\uc000\ud835\udd46enCurly\u0100DQ\u0e0e\u0e1aoubleQuote;\u601cuote;\u6018;\u6a54\u0100cl\u0e27\u0e2cr;\uc000\ud835\udcaaash\u803b\xd8\u40d8i\u016c\u0e37\u0e3cde\u803b\xd5\u40d5es;\u6a37ml\u803b\xd6\u40d6er\u0100BP\u0e4b\u0e60\u0100ar\u0e50\u0e53r;\u603eac\u0100ek\u0e5a\u0e5c;\u63deet;\u63b4arenthesis;\u63dc\u0480acfhilors\u0e7f\u0e87\u0e8a\u0e8f\u0e92\u0e94\u0e9d\u0eb0\u0efcrtialD;\u6202y;\u441fr;\uc000\ud835\udd13i;\u43a6;\u43a0usMinus;\u40b1\u0100ip\u0ea2\u0eadncareplan\xe5\u069df;\u6119\u0200;eio\u0eb9\u0eba\u0ee0\u0ee4\u6abbcedes\u0200;EST\u0ec8\u0ec9\u0ecf\u0eda\u627aqual;\u6aaflantEqual;\u627cilde;\u627eme;\u6033\u0100dp\u0ee9\u0eeeuct;\u620fortion\u0100;a\u0225\u0ef9l;\u621d\u0100ci\u0f01\u0f06r;\uc000\ud835\udcab;\u43a8\u0200Ufos\u0f11\u0f16\u0f1b\u0f1fOT\u803b\"\u4022r;\uc000\ud835\udd14pf;\u611acr;\uc000\ud835\udcac\u0600BEacefhiorsu\u0f3e\u0f43\u0f47\u0f60\u0f73\u0fa7\u0faa\u0fad\u1096\u10a9\u10b4\u10bearr;\u6910G\u803b\xae\u40ae\u0180cnr\u0f4e\u0f53\u0f56ute;\u4154g;\u67ebr\u0100;t\u0f5c\u0f5d\u61a0l;\u6916\u0180aey\u0f67\u0f6c\u0f71ron;\u4158dil;\u4156;\u4420\u0100;v\u0f78\u0f79\u611cerse\u0100EU\u0f82\u0f99\u0100lq\u0f87\u0f8eement;\u620builibrium;\u61cbpEquilibrium;\u696fr\xbb\u0f79o;\u43a1ght\u0400ACDFTUVa\u0fc1\u0feb\u0ff3\u1022\u1028\u105b\u1087\u03d8\u0100nr\u0fc6\u0fd2gleBracket;\u67e9row\u0180;BL\u0fdc\u0fdd\u0fe1\u6192ar;\u61e5eftArrow;\u61c4eiling;\u6309o\u01f5\u0ff9\0\u1005bleBracket;\u67e7n\u01d4\u100a\0\u1014eeVector;\u695dector\u0100;B\u101d\u101e\u61c2ar;\u6955loor;\u630b\u0100er\u102d\u1043e\u0180;AV\u1035\u1036\u103c\u62a2rrow;\u61a6ector;\u695biangle\u0180;BE\u1050\u1051\u1055\u62b3ar;\u69d0qual;\u62b5p\u0180DTV\u1063\u106e\u1078ownVector;\u694feeVector;\u695cector\u0100;B\u1082\u1083\u61bear;\u6954ector\u0100;B\u1091\u1092\u61c0ar;\u6953\u0100pu\u109b\u109ef;\u611dndImplies;\u6970ightarrow;\u61db\u0100ch\u10b9\u10bcr;\u611b;\u61b1leDelayed;\u69f4\u0680HOacfhimoqstu\u10e4\u10f1\u10f7\u10fd\u1119\u111e\u1151\u1156\u1161\u1167\u11b5\u11bb\u11bf\u0100Cc\u10e9\u10eeHcy;\u4429y;\u4428FTcy;\u442ccute;\u415a\u0280;aeiy\u1108\u1109\u110e\u1113\u1117\u6abcron;\u4160dil;\u415erc;\u415c;\u4421r;\uc000\ud835\udd16ort\u0200DLRU\u112a\u1134\u113e\u1149ownArrow\xbb\u041eeftArrow\xbb\u089aightArrow\xbb\u0fddpArrow;\u6191gma;\u43a3allCircle;\u6218pf;\uc000\ud835\udd4a\u0272\u116d\0\0\u1170t;\u621aare\u0200;ISU\u117b\u117c\u1189\u11af\u65a1ntersection;\u6293u\u0100bp\u118f\u119eset\u0100;E\u1197\u1198\u628fqual;\u6291erset\u0100;E\u11a8\u11a9\u6290qual;\u6292nion;\u6294cr;\uc000\ud835\udcaear;\u62c6\u0200bcmp\u11c8\u11db\u1209\u120b\u0100;s\u11cd\u11ce\u62d0et\u0100;E\u11cd\u11d5qual;\u6286\u0100ch\u11e0\u1205eeds\u0200;EST\u11ed\u11ee\u11f4\u11ff\u627bqual;\u6ab0lantEqual;\u627dilde;\u627fTh\xe1\u0f8c;\u6211\u0180;es\u1212\u1213\u1223\u62d1rset\u0100;E\u121c\u121d\u6283qual;\u6287et\xbb\u1213\u0580HRSacfhiors\u123e\u1244\u1249\u1255\u125e\u1271\u1276\u129f\u12c2\u12c8\u12d1ORN\u803b\xde\u40deADE;\u6122\u0100Hc\u124e\u1252cy;\u440by;\u4426\u0100bu\u125a\u125c;\u4009;\u43a4\u0180aey\u1265\u126a\u126fron;\u4164dil;\u4162;\u4422r;\uc000\ud835\udd17\u0100ei\u127b\u1289\u01f2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128e\u1298kSpace;\uc000\u205f\u200aSpace;\u6009lde\u0200;EFT\u12ab\u12ac\u12b2\u12bc\u623cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uc000\ud835\udd4bipleDot;\u60db\u0100ct\u12d6\u12dbr;\uc000\ud835\udcafrok;\u4166\u0ae1\u12f7\u130e\u131a\u1326\0\u132c\u1331\0\0\0\0\0\u1338\u133d\u1377\u1385\0\u13ff\u1404\u140a\u1410\u0100cr\u12fb\u1301ute\u803b\xda\u40dar\u0100;o\u1307\u1308\u619fcir;\u6949r\u01e3\u1313\0\u1316y;\u440eve;\u416c\u0100iy\u131e\u1323rc\u803b\xdb\u40db;\u4423blac;\u4170r;\uc000\ud835\udd18rave\u803b\xd9\u40d9acr;\u416a\u0100di\u1341\u1369er\u0100BP\u1348\u135d\u0100ar\u134d\u1350r;\u405fac\u0100ek\u1357\u1359;\u63dfet;\u63b5arenthesis;\u63ddon\u0100;P\u1370\u1371\u62c3lus;\u628e\u0100gp\u137b\u137fon;\u4172f;\uc000\ud835\udd4c\u0400ADETadps\u1395\u13ae\u13b8\u13c4\u03e8\u13d2\u13d7\u13f3rrow\u0180;BD\u1150\u13a0\u13a4ar;\u6912ownArrow;\u61c5ownArrow;\u6195quilibrium;\u696eee\u0100;A\u13cb\u13cc\u62a5rrow;\u61a5own\xe1\u03f3er\u0100LR\u13de\u13e8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13f9\u13fa\u43d2on;\u43a5ing;\u416ecr;\uc000\ud835\udcb0ilde;\u4168ml\u803b\xdc\u40dc\u0480Dbcdefosv\u1427\u142c\u1430\u1433\u143e\u1485\u148a\u1490\u1496ash;\u62abar;\u6aeby;\u4412ash\u0100;l\u143b\u143c\u62a9;\u6ae6\u0100er\u1443\u1445;\u62c1\u0180bty\u144c\u1450\u147aar;\u6016\u0100;i\u144f\u1455cal\u0200BLST\u1461\u1465\u146a\u1474ar;\u6223ine;\u407ceparator;\u6758ilde;\u6240ThinSpace;\u600ar;\uc000\ud835\udd19pf;\uc000\ud835\udd4dcr;\uc000\ud835\udcb1dash;\u62aa\u0280cefos\u14a7\u14ac\u14b1\u14b6\u14bcirc;\u4174dge;\u62c0r;\uc000\ud835\udd1apf;\uc000\ud835\udd4ecr;\uc000\ud835\udcb2\u0200fios\u14cb\u14d0\u14d2\u14d8r;\uc000\ud835\udd1b;\u439epf;\uc000\ud835\udd4fcr;\uc000\ud835\udcb3\u0480AIUacfosu\u14f1\u14f5\u14f9\u14fd\u1504\u150f\u1514\u151a\u1520cy;\u442fcy;\u4407cy;\u442ecute\u803b\xdd\u40dd\u0100iy\u1509\u150drc;\u4176;\u442br;\uc000\ud835\udd1cpf;\uc000\ud835\udd50cr;\uc000\ud835\udcb4ml;\u4178\u0400Hacdefos\u1535\u1539\u153f\u154b\u154f\u155d\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417d;\u4417ot;\u417b\u01f2\u1554\0\u155boWidt\xe8\u0ad9a;\u4396r;\u6128pf;\u6124cr;\uc000\ud835\udcb5\u0be1\u1583\u158a\u1590\0\u15b0\u15b6\u15bf\0\0\0\0\u15c6\u15db\u15eb\u165f\u166d\0\u1695\u169b\u16b2\u16b9\0\u16becute\u803b\xe1\u40e1reve;\u4103\u0300;Ediuy\u159c\u159d\u15a1\u15a3\u15a8\u15ad\u623e;\uc000\u223e\u0333;\u623frc\u803b\xe2\u40e2te\u80bb\xb4\u0306;\u4430lig\u803b\xe6\u40e6\u0100;r\xb2\u15ba;\uc000\ud835\udd1erave\u803b\xe0\u40e0\u0100ep\u15ca\u15d6\u0100fp\u15cf\u15d4sym;\u6135\xe8\u15d3ha;\u43b1\u0100ap\u15dfc\u0100cl\u15e4\u15e7r;\u4101g;\u6a3f\u0264\u15f0\0\0\u160a\u0280;adsv\u15fa\u15fb\u15ff\u1601\u1607\u6227nd;\u6a55;\u6a5clope;\u6a58;\u6a5a\u0380;elmrsz\u1618\u1619\u161b\u161e\u163f\u164f\u1659\u6220;\u69a4e\xbb\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163a\u163c\u163e;\u69a8;\u69a9;\u69aa;\u69ab;\u69ac;\u69ad;\u69ae;\u69aft\u0100;v\u1645\u1646\u621fb\u0100;d\u164c\u164d\u62be;\u699d\u0100pt\u1654\u1657h;\u6222\xbb\xb9arr;\u637c\u0100gp\u1663\u1667on;\u4105f;\uc000\ud835\udd52\u0380;Eaeiop\u12c1\u167b\u167d\u1682\u1684\u1687\u168a;\u6a70cir;\u6a6f;\u624ad;\u624bs;\u4027rox\u0100;e\u12c1\u1692\xf1\u1683ing\u803b\xe5\u40e5\u0180cty\u16a1\u16a6\u16a8r;\uc000\ud835\udcb6;\u402amp\u0100;e\u12c1\u16af\xf1\u0288ilde\u803b\xe3\u40e3ml\u803b\xe4\u40e4\u0100ci\u16c2\u16c8onin\xf4\u0272nt;\u6a11\u0800Nabcdefiklnoprsu\u16ed\u16f1\u1730\u173c\u1743\u1748\u1778\u177d\u17e0\u17e6\u1839\u1850\u170d\u193d\u1948\u1970ot;\u6aed\u0100cr\u16f6\u171ek\u0200ceps\u1700\u1705\u170d\u1713ong;\u624cpsilon;\u43f6rime;\u6035im\u0100;e\u171a\u171b\u623dq;\u62cd\u0176\u1722\u1726ee;\u62bded\u0100;g\u172c\u172d\u6305e\xbb\u172drk\u0100;t\u135c\u1737brk;\u63b6\u0100oy\u1701\u1741;\u4431quo;\u601e\u0280cmprt\u1753\u175b\u1761\u1764\u1768aus\u0100;e\u010a\u0109ptyv;\u69b0s\xe9\u170cno\xf5\u0113\u0180ahw\u176f\u1771\u1773;\u43b2;\u6136een;\u626cr;\uc000\ud835\udd1fg\u0380costuvw\u178d\u179d\u17b3\u17c1\u17d5\u17db\u17de\u0180aiu\u1794\u1796\u179a\xf0\u0760rc;\u65efp\xbb\u1371\u0180dpt\u17a4\u17a8\u17adot;\u6a00lus;\u6a01imes;\u6a02\u0271\u17b9\0\0\u17becup;\u6a06ar;\u6605riangle\u0100du\u17cd\u17d2own;\u65bdp;\u65b3plus;\u6a04e\xe5\u1444\xe5\u14adarow;\u690d\u0180ako\u17ed\u1826\u1835\u0100cn\u17f2\u1823k\u0180lst\u17fa\u05ab\u1802ozenge;\u69ebriangle\u0200;dlr\u1812\u1813\u1818\u181d\u65b4own;\u65beeft;\u65c2ight;\u65b8k;\u6423\u01b1\u182b\0\u1833\u01b2\u182f\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183e\u184d\u0100;q\u1843\u1846\uc000=\u20e5uiv;\uc000\u2261\u20e5t;\u6310\u0200ptwx\u1859\u185e\u1867\u186cf;\uc000\ud835\udd53\u0100;t\u13cb\u1863om\xbb\u13cctie;\u62c8\u0600DHUVbdhmptuv\u1885\u1896\u18aa\u18bb\u18d7\u18db\u18ec\u18ff\u1905\u190a\u1910\u1921\u0200LRlr\u188e\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18a1\u18a2\u18a4\u18a6\u18a8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18b3\u18b5\u18b7\u18b9;\u655d;\u655a;\u655c;\u6559\u0380;HLRhlr\u18ca\u18cb\u18cd\u18cf\u18d1\u18d3\u18d5\u6551;\u656c;\u6563;\u6560;\u656b;\u6562;\u655fox;\u69c9\u0200LRlr\u18e4\u18e6\u18e8\u18ea;\u6555;\u6552;\u6510;\u650c\u0280;DUdu\u06bd\u18f7\u18f9\u18fb\u18fd;\u6565;\u6568;\u652c;\u6534inus;\u629flus;\u629eimes;\u62a0\u0200LRlr\u1919\u191b\u191d\u191f;\u655b;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193b\u6502;\u656a;\u6561;\u655e;\u653c;\u6524;\u651c\u0100ev\u0123\u1942bar\u803b\xa6\u40a6\u0200ceio\u1951\u1956\u195a\u1960r;\uc000\ud835\udcb7mi;\u604fm\u0100;e\u171a\u171cl\u0180;bh\u1968\u1969\u196b\u405c;\u69c5sub;\u67c8\u016c\u1974\u197el\u0100;e\u1979\u197a\u6022t\xbb\u197ap\u0180;Ee\u012f\u1985\u1987;\u6aae\u0100;q\u06dc\u06db\u0ce1\u19a7\0\u19e8\u1a11\u1a15\u1a32\0\u1a37\u1a50\0\0\u1ab4\0\0\u1ac1\0\0\u1b21\u1b2e\u1b4d\u1b52\0\u1bfd\0\u1c0c\u0180cpr\u19ad\u19b2\u19ddute;\u4107\u0300;abcds\u19bf\u19c0\u19c4\u19ca\u19d5\u19d9\u6229nd;\u6a44rcup;\u6a49\u0100au\u19cf\u19d2p;\u6a4bp;\u6a47ot;\u6a40;\uc000\u2229\ufe00\u0100eo\u19e2\u19e5t;\u6041\xee\u0693\u0200aeiu\u19f0\u19fb\u1a01\u1a05\u01f0\u19f5\0\u19f8s;\u6a4don;\u410ddil\u803b\xe7\u40e7rc;\u4109ps\u0100;s\u1a0c\u1a0d\u6a4cm;\u6a50ot;\u410b\u0180dmn\u1a1b\u1a20\u1a26il\u80bb\xb8\u01adptyv;\u69b2t\u8100\xa2;e\u1a2d\u1a2e\u40a2r\xe4\u01b2r;\uc000\ud835\udd20\u0180cei\u1a3d\u1a40\u1a4dy;\u4447ck\u0100;m\u1a47\u1a48\u6713ark\xbb\u1a48;\u43c7r\u0380;Ecefms\u1a5f\u1a60\u1a62\u1a6b\u1aa4\u1aaa\u1aae\u65cb;\u69c3\u0180;el\u1a69\u1a6a\u1a6d\u42c6q;\u6257e\u0261\u1a74\0\0\u1a88rrow\u0100lr\u1a7c\u1a81eft;\u61baight;\u61bb\u0280RSacd\u1a92\u1a94\u1a96\u1a9a\u1a9f\xbb\u0f47;\u64c8st;\u629birc;\u629aash;\u629dnint;\u6a10id;\u6aefcir;\u69c2ubs\u0100;u\u1abb\u1abc\u6663it\xbb\u1abc\u02ec\u1ac7\u1ad4\u1afa\0\u1b0aon\u0100;e\u1acd\u1ace\u403a\u0100;q\xc7\xc6\u026d\u1ad9\0\0\u1ae2a\u0100;t\u1ade\u1adf\u402c;\u4040\u0180;fl\u1ae8\u1ae9\u1aeb\u6201\xee\u1160e\u0100mx\u1af1\u1af6ent\xbb\u1ae9e\xf3\u024d\u01e7\u1afe\0\u1b07\u0100;d\u12bb\u1b02ot;\u6a6dn\xf4\u0246\u0180fry\u1b10\u1b14\u1b17;\uc000\ud835\udd54o\xe4\u0254\u8100\xa9;s\u0155\u1b1dr;\u6117\u0100ao\u1b25\u1b29rr;\u61b5ss;\u6717\u0100cu\u1b32\u1b37r;\uc000\ud835\udcb8\u0100bp\u1b3c\u1b44\u0100;e\u1b41\u1b42\u6acf;\u6ad1\u0100;e\u1b49\u1b4a\u6ad0;\u6ad2dot;\u62ef\u0380delprvw\u1b60\u1b6c\u1b77\u1b82\u1bac\u1bd4\u1bf9arr\u0100lr\u1b68\u1b6a;\u6938;\u6935\u0270\u1b72\0\0\u1b75r;\u62dec;\u62dfarr\u0100;p\u1b7f\u1b80\u61b6;\u693d\u0300;bcdos\u1b8f\u1b90\u1b96\u1ba1\u1ba5\u1ba8\u622arcap;\u6a48\u0100au\u1b9b\u1b9ep;\u6a46p;\u6a4aot;\u628dr;\u6a45;\uc000\u222a\ufe00\u0200alrv\u1bb5\u1bbf\u1bde\u1be3rr\u0100;m\u1bbc\u1bbd\u61b7;\u693cy\u0180evw\u1bc7\u1bd4\u1bd8q\u0270\u1bce\0\0\u1bd2re\xe3\u1b73u\xe3\u1b75ee;\u62ceedge;\u62cfen\u803b\xa4\u40a4earrow\u0100lr\u1bee\u1bf3eft\xbb\u1b80ight\xbb\u1bbde\xe4\u1bdd\u0100ci\u1c01\u1c07onin\xf4\u01f7nt;\u6231lcty;\u632d\u0980AHabcdefhijlorstuwz\u1c38\u1c3b\u1c3f\u1c5d\u1c69\u1c75\u1c8a\u1c9e\u1cac\u1cb7\u1cfb\u1cff\u1d0d\u1d7b\u1d91\u1dab\u1dbb\u1dc6\u1dcdr\xf2\u0381ar;\u6965\u0200glrs\u1c48\u1c4d\u1c52\u1c54ger;\u6020eth;\u6138\xf2\u1133h\u0100;v\u1c5a\u1c5b\u6010\xbb\u090a\u016b\u1c61\u1c67arow;\u690fa\xe3\u0315\u0100ay\u1c6e\u1c73ron;\u410f;\u4434\u0180;ao\u0332\u1c7c\u1c84\u0100gr\u02bf\u1c81r;\u61catseq;\u6a77\u0180glm\u1c91\u1c94\u1c98\u803b\xb0\u40b0ta;\u43b4ptyv;\u69b1\u0100ir\u1ca3\u1ca8sht;\u697f;\uc000\ud835\udd21ar\u0100lr\u1cb3\u1cb5\xbb\u08dc\xbb\u101e\u0280aegsv\u1cc2\u0378\u1cd6\u1cdc\u1ce0m\u0180;os\u0326\u1cca\u1cd4nd\u0100;s\u0326\u1cd1uit;\u6666amma;\u43ddin;\u62f2\u0180;io\u1ce7\u1ce8\u1cf8\u40f7de\u8100\xf7;o\u1ce7\u1cf0ntimes;\u62c7n\xf8\u1cf7cy;\u4452c\u026f\u1d06\0\0\u1d0arn;\u631eop;\u630d\u0280lptuw\u1d18\u1d1d\u1d22\u1d49\u1d55lar;\u4024f;\uc000\ud835\udd55\u0280;emps\u030b\u1d2d\u1d37\u1d3d\u1d42q\u0100;d\u0352\u1d33ot;\u6251inus;\u6238lus;\u6214quare;\u62a1blebarwedg\xe5\xfan\u0180adh\u112e\u1d5d\u1d67ownarrow\xf3\u1c83arpoon\u0100lr\u1d72\u1d76ef\xf4\u1cb4igh\xf4\u1cb6\u0162\u1d7f\u1d85karo\xf7\u0f42\u026f\u1d8a\0\0\u1d8ern;\u631fop;\u630c\u0180cot\u1d98\u1da3\u1da6\u0100ry\u1d9d\u1da1;\uc000\ud835\udcb9;\u4455l;\u69f6rok;\u4111\u0100dr\u1db0\u1db4ot;\u62f1i\u0100;f\u1dba\u1816\u65bf\u0100ah\u1dc0\u1dc3r\xf2\u0429a\xf2\u0fa6angle;\u69a6\u0100ci\u1dd2\u1dd5y;\u445fgrarr;\u67ff\u0900Dacdefglmnopqrstux\u1e01\u1e09\u1e19\u1e38\u0578\u1e3c\u1e49\u1e61\u1e7e\u1ea5\u1eaf\u1ebd\u1ee1\u1f2a\u1f37\u1f44\u1f4e\u1f5a\u0100Do\u1e06\u1d34o\xf4\u1c89\u0100cs\u1e0e\u1e14ute\u803b\xe9\u40e9ter;\u6a6e\u0200aioy\u1e22\u1e27\u1e31\u1e36ron;\u411br\u0100;c\u1e2d\u1e2e\u6256\u803b\xea\u40ealon;\u6255;\u444dot;\u4117\u0100Dr\u1e41\u1e45ot;\u6252;\uc000\ud835\udd22\u0180;rs\u1e50\u1e51\u1e57\u6a9aave\u803b\xe8\u40e8\u0100;d\u1e5c\u1e5d\u6a96ot;\u6a98\u0200;ils\u1e6a\u1e6b\u1e72\u1e74\u6a99nters;\u63e7;\u6113\u0100;d\u1e79\u1e7a\u6a95ot;\u6a97\u0180aps\u1e85\u1e89\u1e97cr;\u4113ty\u0180;sv\u1e92\u1e93\u1e95\u6205et\xbb\u1e93p\u01001;\u1e9d\u1ea4\u0133\u1ea1\u1ea3;\u6004;\u6005\u6003\u0100gs\u1eaa\u1eac;\u414bp;\u6002\u0100gp\u1eb4\u1eb8on;\u4119f;\uc000\ud835\udd56\u0180als\u1ec4\u1ece\u1ed2r\u0100;s\u1eca\u1ecb\u62d5l;\u69e3us;\u6a71i\u0180;lv\u1eda\u1edb\u1edf\u43b5on\xbb\u1edb;\u43f5\u0200csuv\u1eea\u1ef3\u1f0b\u1f23\u0100io\u1eef\u1e31rc\xbb\u1e2e\u0269\u1ef9\0\0\u1efb\xed\u0548ant\u0100gl\u1f02\u1f06tr\xbb\u1e5dess\xbb\u1e7a\u0180aei\u1f12\u1f16\u1f1als;\u403dst;\u625fv\u0100;D\u0235\u1f20D;\u6a78parsl;\u69e5\u0100Da\u1f2f\u1f33ot;\u6253rr;\u6971\u0180cdi\u1f3e\u1f41\u1ef8r;\u612fo\xf4\u0352\u0100ah\u1f49\u1f4b;\u43b7\u803b\xf0\u40f0\u0100mr\u1f53\u1f57l\u803b\xeb\u40ebo;\u60ac\u0180cip\u1f61\u1f64\u1f67l;\u4021s\xf4\u056e\u0100eo\u1f6c\u1f74ctatio\xee\u0559nential\xe5\u0579\u09e1\u1f92\0\u1f9e\0\u1fa1\u1fa7\0\0\u1fc6\u1fcc\0\u1fd3\0\u1fe6\u1fea\u2000\0\u2008\u205allingdotse\xf1\u1e44y;\u4444male;\u6640\u0180ilr\u1fad\u1fb3\u1fc1lig;\u8000\ufb03\u0269\u1fb9\0\0\u1fbdg;\u8000\ufb00ig;\u8000\ufb04;\uc000\ud835\udd23lig;\u8000\ufb01lig;\uc000fj\u0180alt\u1fd9\u1fdc\u1fe1t;\u666dig;\u8000\ufb02ns;\u65b1of;\u4192\u01f0\u1fee\0\u1ff3f;\uc000\ud835\udd57\u0100ak\u05bf\u1ff7\u0100;v\u1ffc\u1ffd\u62d4;\u6ad9artint;\u6a0d\u0100ao\u200c\u2055\u0100cs\u2011\u2052\u03b1\u201a\u2030\u2038\u2045\u2048\0\u2050\u03b2\u2022\u2025\u2027\u202a\u202c\0\u202e\u803b\xbd\u40bd;\u6153\u803b\xbc\u40bc;\u6155;\u6159;\u615b\u01b3\u2034\0\u2036;\u6154;\u6156\u02b4\u203e\u2041\0\0\u2043\u803b\xbe\u40be;\u6157;\u615c5;\u6158\u01b6\u204c\0\u204e;\u615a;\u615d8;\u615el;\u6044wn;\u6322cr;\uc000\ud835\udcbb\u0880Eabcdefgijlnorstv\u2082\u2089\u209f\u20a5\u20b0\u20b4\u20f0\u20f5\u20fa\u20ff\u2103\u2112\u2138\u0317\u213e\u2152\u219e\u0100;l\u064d\u2087;\u6a8c\u0180cmp\u2090\u2095\u209dute;\u41f5ma\u0100;d\u209c\u1cda\u43b3;\u6a86reve;\u411f\u0100iy\u20aa\u20aerc;\u411d;\u4433ot;\u4121\u0200;lqs\u063e\u0642\u20bd\u20c9\u0180;qs\u063e\u064c\u20c4lan\xf4\u0665\u0200;cdl\u0665\u20d2\u20d5\u20e5c;\u6aa9ot\u0100;o\u20dc\u20dd\u6a80\u0100;l\u20e2\u20e3\u6a82;\u6a84\u0100;e\u20ea\u20ed\uc000\u22db\ufe00s;\u6a94r;\uc000\ud835\udd24\u0100;g\u0673\u061bmel;\u6137cy;\u4453\u0200;Eaj\u065a\u210c\u210e\u2110;\u6a92;\u6aa5;\u6aa4\u0200Eaes\u211b\u211d\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6a8arox\xbb\u2124\u0100;q\u212e\u212f\u6a88\u0100;q\u212e\u211bim;\u62e7pf;\uc000\ud835\udd58\u0100ci\u2143\u2146r;\u610am\u0180;el\u066b\u214e\u2150;\u6a8e;\u6a90\u8300>;cdlqr\u05ee\u2160\u216a\u216e\u2173\u2179\u0100ci\u2165\u2167;\u6aa7r;\u6a7aot;\u62d7Par;\u6995uest;\u6a7c\u0280adels\u2184\u216a\u2190\u0656\u219b\u01f0\u2189\0\u218epro\xf8\u209er;\u6978q\u0100lq\u063f\u2196les\xf3\u2088i\xed\u066b\u0100en\u21a3\u21adrtneqq;\uc000\u2269\ufe00\xc5\u21aa\u0500Aabcefkosy\u21c4\u21c7\u21f1\u21f5\u21fa\u2218\u221d\u222f\u2268\u227dr\xf2\u03a0\u0200ilmr\u21d0\u21d4\u21d7\u21dbrs\xf0\u1484f\xbb\u2024il\xf4\u06a9\u0100dr\u21e0\u21e4cy;\u444a\u0180;cw\u08f4\u21eb\u21efir;\u6948;\u61adar;\u610firc;\u4125\u0180alr\u2201\u220e\u2213rts\u0100;u\u2209\u220a\u6665it\xbb\u220alip;\u6026con;\u62b9r;\uc000\ud835\udd25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223a\u223e\u2243\u225e\u2263rr;\u61fftht;\u623bk\u0100lr\u2249\u2253eftarrow;\u61a9ightarrow;\u61aaf;\uc000\ud835\udd59bar;\u6015\u0180clt\u226f\u2274\u2278r;\uc000\ud835\udcbdas\xe8\u21f4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xbb\u1c5b\u0ae1\u22a3\0\u22aa\0\u22b8\u22c5\u22ce\0\u22d5\u22f3\0\0\u22f8\u2322\u2367\u2362\u237f\0\u2386\u23aa\u23b4cute\u803b\xed\u40ed\u0180;iy\u0771\u22b0\u22b5rc\u803b\xee\u40ee;\u4438\u0100cx\u22bc\u22bfy;\u4435cl\u803b\xa1\u40a1\u0100fr\u039f\u22c9;\uc000\ud835\udd26rave\u803b\xec\u40ec\u0200;ino\u073e\u22dd\u22e9\u22ee\u0100in\u22e2\u22e6nt;\u6a0ct;\u622dfin;\u69dcta;\u6129lig;\u4133\u0180aop\u22fe\u231a\u231d\u0180cgt\u2305\u2308\u2317r;\u412b\u0180elp\u071f\u230f\u2313in\xe5\u078ear\xf4\u0720h;\u4131f;\u62b7ed;\u41b5\u0280;cfot\u04f4\u232c\u2331\u233d\u2341are;\u6105in\u0100;t\u2338\u2339\u621eie;\u69dddo\xf4\u2319\u0280;celp\u0757\u234c\u2350\u235b\u2361al;\u62ba\u0100gr\u2355\u2359er\xf3\u1563\xe3\u234darhk;\u6a17rod;\u6a3c\u0200cgpt\u236f\u2372\u2376\u237by;\u4451on;\u412ff;\uc000\ud835\udd5aa;\u43b9uest\u803b\xbf\u40bf\u0100ci\u238a\u238fr;\uc000\ud835\udcben\u0280;Edsv\u04f4\u239b\u239d\u23a1\u04f3;\u62f9ot;\u62f5\u0100;v\u23a6\u23a7\u62f4;\u62f3\u0100;i\u0777\u23aelde;\u4129\u01eb\u23b8\0\u23bccy;\u4456l\u803b\xef\u40ef\u0300cfmosu\u23cc\u23d7\u23dc\u23e1\u23e7\u23f5\u0100iy\u23d1\u23d5rc;\u4135;\u4439r;\uc000\ud835\udd27ath;\u4237pf;\uc000\ud835\udd5b\u01e3\u23ec\0\u23f1r;\uc000\ud835\udcbfrcy;\u4458kcy;\u4454\u0400acfghjos\u240b\u2416\u2422\u2427\u242d\u2431\u2435\u243bppa\u0100;v\u2413\u2414\u43ba;\u43f0\u0100ey\u241b\u2420dil;\u4137;\u443ar;\uc000\ud835\udd28reen;\u4138cy;\u4445cy;\u445cpf;\uc000\ud835\udd5ccr;\uc000\ud835\udcc0\u0b80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248d\u2491\u250e\u253d\u255a\u2580\u264e\u265e\u2665\u2679\u267d\u269a\u26b2\u26d8\u275d\u2768\u278b\u27c0\u2801\u2812\u0180art\u2477\u247a\u247cr\xf2\u09c6\xf2\u0395ail;\u691barr;\u690e\u0100;g\u0994\u248b;\u6a8bar;\u6962\u0963\u24a5\0\u24aa\0\u24b1\0\0\0\0\0\u24b5\u24ba\0\u24c6\u24c8\u24cd\0\u24f9ute;\u413amptyv;\u69b4ra\xee\u084cbda;\u43bbg\u0180;dl\u088e\u24c1\u24c3;\u6991\xe5\u088e;\u6a85uo\u803b\xab\u40abr\u0400;bfhlpst\u0899\u24de\u24e6\u24e9\u24eb\u24ee\u24f1\u24f5\u0100;f\u089d\u24e3s;\u691fs;\u691d\xeb\u2252p;\u61abl;\u6939im;\u6973l;\u61a2\u0180;ae\u24ff\u2500\u2504\u6aabil;\u6919\u0100;s\u2509\u250a\u6aad;\uc000\u2aad\ufe00\u0180abr\u2515\u2519\u251drr;\u690crk;\u6772\u0100ak\u2522\u252cc\u0100ek\u2528\u252a;\u407b;\u405b\u0100es\u2531\u2533;\u698bl\u0100du\u2539\u253b;\u698f;\u698d\u0200aeuy\u2546\u254b\u2556\u2558ron;\u413e\u0100di\u2550\u2554il;\u413c\xec\u08b0\xe2\u2529;\u443b\u0200cqrs\u2563\u2566\u256d\u257da;\u6936uo\u0100;r\u0e19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694bh;\u61b2\u0280;fgqs\u258b\u258c\u0989\u25f3\u25ff\u6264t\u0280ahlrt\u2598\u25a4\u25b7\u25c2\u25e8rrow\u0100;t\u0899\u25a1a\xe9\u24f6arpoon\u0100du\u25af\u25b4own\xbb\u045ap\xbb\u0966eftarrows;\u61c7ight\u0180ahs\u25cd\u25d6\u25derrow\u0100;s\u08f4\u08a7arpoon\xf3\u0f98quigarro\xf7\u21f0hreetimes;\u62cb\u0180;qs\u258b\u0993\u25falan\xf4\u09ac\u0280;cdgs\u09ac\u260a\u260d\u261d\u2628c;\u6aa8ot\u0100;o\u2614\u2615\u6a7f\u0100;r\u261a\u261b\u6a81;\u6a83\u0100;e\u2622\u2625\uc000\u22da\ufe00s;\u6a93\u0280adegs\u2633\u2639\u263d\u2649\u264bppro\xf8\u24c6ot;\u62d6q\u0100gq\u2643\u2645\xf4\u0989gt\xf2\u248c\xf4\u099bi\xed\u09b2\u0180ilr\u2655\u08e1\u265asht;\u697c;\uc000\ud835\udd29\u0100;E\u099c\u2663;\u6a91\u0161\u2669\u2676r\u0100du\u25b2\u266e\u0100;l\u0965\u2673;\u696alk;\u6584cy;\u4459\u0280;acht\u0a48\u2688\u268b\u2691\u2696r\xf2\u25c1orne\xf2\u1d08ard;\u696bri;\u65fa\u0100io\u269f\u26a4dot;\u4140ust\u0100;a\u26ac\u26ad\u63b0che\xbb\u26ad\u0200Eaes\u26bb\u26bd\u26c9\u26d4;\u6268p\u0100;p\u26c3\u26c4\u6a89rox\xbb\u26c4\u0100;q\u26ce\u26cf\u6a87\u0100;q\u26ce\u26bbim;\u62e6\u0400abnoptwz\u26e9\u26f4\u26f7\u271a\u272f\u2741\u2747\u2750\u0100nr\u26ee\u26f1g;\u67ecr;\u61fdr\xeb\u08c1g\u0180lmr\u26ff\u270d\u2714eft\u0100ar\u09e6\u2707ight\xe1\u09f2apsto;\u67fcight\xe1\u09fdparrow\u0100lr\u2725\u2729ef\xf4\u24edight;\u61ac\u0180afl\u2736\u2739\u273dr;\u6985;\uc000\ud835\udd5dus;\u6a2dimes;\u6a34\u0161\u274b\u274fst;\u6217\xe1\u134e\u0180;ef\u2757\u2758\u1800\u65cange\xbb\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277c\u2785\u2787r\xf2\u08a8orne\xf2\u1d8car\u0100;d\u0f98\u2783;\u696d;\u600eri;\u62bf\u0300achiqt\u2798\u279d\u0a40\u27a2\u27ae\u27bbquo;\u6039r;\uc000\ud835\udcc1m\u0180;eg\u09b2\u27aa\u27ac;\u6a8d;\u6a8f\u0100bu\u252a\u27b3o\u0100;r\u0e1f\u27b9;\u601arok;\u4142\u8400<;cdhilqr\u082b\u27d2\u2639\u27dc\u27e0\u27e5\u27ea\u27f0\u0100ci\u27d7\u27d9;\u6aa6r;\u6a79re\xe5\u25f2mes;\u62c9arr;\u6976uest;\u6a7b\u0100Pi\u27f5\u27f9ar;\u6996\u0180;ef\u2800\u092d\u181b\u65c3r\u0100du\u2807\u280dshar;\u694ahar;\u6966\u0100en\u2817\u2821rtneqq;\uc000\u2268\ufe00\xc5\u281e\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288e\u2893\u28a0\u28a5\u28a8\u28da\u28e2\u28e4\u0a83\u28f3\u2902Dot;\u623a\u0200clpr\u284e\u2852\u2863\u287dr\u803b\xaf\u40af\u0100et\u2857\u2859;\u6642\u0100;e\u285e\u285f\u6720se\xbb\u285f\u0100;s\u103b\u2868to\u0200;dlu\u103b\u2873\u2877\u287bow\xee\u048cef\xf4\u090f\xf0\u13d1ker;\u65ae\u0100oy\u2887\u288cmma;\u6a29;\u443cash;\u6014asuredangle\xbb\u1626r;\uc000\ud835\udd2ao;\u6127\u0180cdn\u28af\u28b4\u28c9ro\u803b\xb5\u40b5\u0200;acd\u1464\u28bd\u28c0\u28c4s\xf4\u16a7ir;\u6af0ot\u80bb\xb7\u01b5us\u0180;bd\u28d2\u1903\u28d3\u6212\u0100;u\u1d3c\u28d8;\u6a2a\u0163\u28de\u28e1p;\u6adb\xf2\u2212\xf0\u0a81\u0100dp\u28e9\u28eeels;\u62a7f;\uc000\ud835\udd5e\u0100ct\u28f8\u28fdr;\uc000\ud835\udcc2pos\xbb\u159d\u0180;lm\u2909\u290a\u290d\u43bctimap;\u62b8\u0c00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297e\u2989\u2998\u29da\u29e9\u2a15\u2a1a\u2a58\u2a5d\u2a83\u2a95\u2aa4\u2aa8\u2b04\u2b07\u2b44\u2b7f\u2bae\u2c34\u2c67\u2c7c\u2ce9\u0100gt\u2947\u294b;\uc000\u22d9\u0338\u0100;v\u2950\u0bcf\uc000\u226b\u20d2\u0180elt\u295a\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61cdightarrow;\u61ce;\uc000\u22d8\u0338\u0100;v\u297b\u0c47\uc000\u226a\u20d2ightarrow;\u61cf\u0100Dd\u298e\u2993ash;\u62afash;\u62ae\u0280bcnpt\u29a3\u29a7\u29ac\u29b1\u29ccla\xbb\u02deute;\u4144g;\uc000\u2220\u20d2\u0280;Eiop\u0d84\u29bc\u29c0\u29c5\u29c8;\uc000\u2a70\u0338d;\uc000\u224b\u0338s;\u4149ro\xf8\u0d84ur\u0100;a\u29d3\u29d4\u666el\u0100;s\u29d3\u0b38\u01f3\u29df\0\u29e3p\u80bb\xa0\u0b37mp\u0100;e\u0bf9\u0c00\u0280aeouy\u29f4\u29fe\u2a03\u2a10\u2a13\u01f0\u29f9\0\u29fb;\u6a43on;\u4148dil;\u4146ng\u0100;d\u0d7e\u2a0aot;\uc000\u2a6d\u0338p;\u6a42;\u443dash;\u6013\u0380;Aadqsx\u0b92\u2a29\u2a2d\u2a3b\u2a41\u2a45\u2a50rr;\u61d7r\u0100hr\u2a33\u2a36k;\u6924\u0100;o\u13f2\u13f0ot;\uc000\u2250\u0338ui\xf6\u0b63\u0100ei\u2a4a\u2a4ear;\u6928\xed\u0b98ist\u0100;s\u0ba0\u0b9fr;\uc000\ud835\udd2b\u0200Eest\u0bc5\u2a66\u2a79\u2a7c\u0180;qs\u0bbc\u2a6d\u0be1\u0180;qs\u0bbc\u0bc5\u2a74lan\xf4\u0be2i\xed\u0bea\u0100;r\u0bb6\u2a81\xbb\u0bb7\u0180Aap\u2a8a\u2a8d\u2a91r\xf2\u2971rr;\u61aear;\u6af2\u0180;sv\u0f8d\u2a9c\u0f8c\u0100;d\u2aa1\u2aa2\u62fc;\u62facy;\u445a\u0380AEadest\u2ab7\u2aba\u2abe\u2ac2\u2ac5\u2af6\u2af9r\xf2\u2966;\uc000\u2266\u0338rr;\u619ar;\u6025\u0200;fqs\u0c3b\u2ace\u2ae3\u2aeft\u0100ar\u2ad4\u2ad9rro\xf7\u2ac1ightarro\xf7\u2a90\u0180;qs\u0c3b\u2aba\u2aealan\xf4\u0c55\u0100;s\u0c55\u2af4\xbb\u0c36i\xed\u0c5d\u0100;r\u0c35\u2afei\u0100;e\u0c1a\u0c25i\xe4\u0d90\u0100pt\u2b0c\u2b11f;\uc000\ud835\udd5f\u8180\xac;in\u2b19\u2b1a\u2b36\u40acn\u0200;Edv\u0b89\u2b24\u2b28\u2b2e;\uc000\u22f9\u0338ot;\uc000\u22f5\u0338\u01e1\u0b89\u2b33\u2b35;\u62f7;\u62f6i\u0100;v\u0cb8\u2b3c\u01e1\u0cb8\u2b41\u2b43;\u62fe;\u62fd\u0180aor\u2b4b\u2b63\u2b69r\u0200;ast\u0b7b\u2b55\u2b5a\u2b5flle\xec\u0b7bl;\uc000\u2afd\u20e5;\uc000\u2202\u0338lint;\u6a14\u0180;ce\u0c92\u2b70\u2b73u\xe5\u0ca5\u0100;c\u0c98\u2b78\u0100;e\u0c92\u2b7d\xf1\u0c98\u0200Aait\u2b88\u2b8b\u2b9d\u2ba7r\xf2\u2988rr\u0180;cw\u2b94\u2b95\u2b99\u619b;\uc000\u2933\u0338;\uc000\u219d\u0338ghtarrow\xbb\u2b95ri\u0100;e\u0ccb\u0cd6\u0380chimpqu\u2bbd\u2bcd\u2bd9\u2b04\u0b78\u2be4\u2bef\u0200;cer\u0d32\u2bc6\u0d37\u2bc9u\xe5\u0d45;\uc000\ud835\udcc3ort\u026d\u2b05\0\0\u2bd6ar\xe1\u2b56m\u0100;e\u0d6e\u2bdf\u0100;q\u0d74\u0d73su\u0100bp\u2beb\u2bed\xe5\u0cf8\xe5\u0d0b\u0180bcp\u2bf6\u2c11\u2c19\u0200;Ees\u2bff\u2c00\u0d22\u2c04\u6284;\uc000\u2ac5\u0338et\u0100;e\u0d1b\u2c0bq\u0100;q\u0d23\u2c00c\u0100;e\u0d32\u2c17\xf1\u0d38\u0200;Ees\u2c22\u2c23\u0d5f\u2c27\u6285;\uc000\u2ac6\u0338et\u0100;e\u0d58\u2c2eq\u0100;q\u0d60\u2c23\u0200gilr\u2c3d\u2c3f\u2c45\u2c47\xec\u0bd7lde\u803b\xf1\u40f1\xe7\u0c43iangle\u0100lr\u2c52\u2c5ceft\u0100;e\u0c1a\u2c5a\xf1\u0c26ight\u0100;e\u0ccb\u2c65\xf1\u0cd7\u0100;m\u2c6c\u2c6d\u43bd\u0180;es\u2c74\u2c75\u2c79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2c8f\u2c94\u2c99\u2c9e\u2ca3\u2cb0\u2cb6\u2cd3\u2ce3ash;\u62adarr;\u6904p;\uc000\u224d\u20d2ash;\u62ac\u0100et\u2ca8\u2cac;\uc000\u2265\u20d2;\uc000>\u20d2nfin;\u69de\u0180Aet\u2cbd\u2cc1\u2cc5rr;\u6902;\uc000\u2264\u20d2\u0100;r\u2cca\u2ccd\uc000<\u20d2ie;\uc000\u22b4\u20d2\u0100At\u2cd8\u2cdcrr;\u6903rie;\uc000\u22b5\u20d2im;\uc000\u223c\u20d2\u0180Aan\u2cf0\u2cf4\u2d02rr;\u61d6r\u0100hr\u2cfa\u2cfdk;\u6923\u0100;o\u13e7\u13e5ear;\u6927\u1253\u1a95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2d2d\0\u2d38\u2d48\u2d60\u2d65\u2d72\u2d84\u1b07\0\0\u2d8d\u2dab\0\u2dc8\u2dce\0\u2ddc\u2e19\u2e2b\u2e3e\u2e43\u0100cs\u2d31\u1a97ute\u803b\xf3\u40f3\u0100iy\u2d3c\u2d45r\u0100;c\u1a9e\u2d42\u803b\xf4\u40f4;\u443e\u0280abios\u1aa0\u2d52\u2d57\u01c8\u2d5alac;\u4151v;\u6a38old;\u69bclig;\u4153\u0100cr\u2d69\u2d6dir;\u69bf;\uc000\ud835\udd2c\u036f\u2d79\0\0\u2d7c\0\u2d82n;\u42dbave\u803b\xf2\u40f2;\u69c1\u0100bm\u2d88\u0df4ar;\u69b5\u0200acit\u2d95\u2d98\u2da5\u2da8r\xf2\u1a80\u0100ir\u2d9d\u2da0r;\u69beoss;\u69bbn\xe5\u0e52;\u69c0\u0180aei\u2db1\u2db5\u2db9cr;\u414dga;\u43c9\u0180cdn\u2dc0\u2dc5\u01cdron;\u43bf;\u69b6pf;\uc000\ud835\udd60\u0180ael\u2dd4\u2dd7\u01d2r;\u69b7rp;\u69b9\u0380;adiosv\u2dea\u2deb\u2dee\u2e08\u2e0d\u2e10\u2e16\u6228r\xf2\u1a86\u0200;efm\u2df7\u2df8\u2e02\u2e05\u6a5dr\u0100;o\u2dfe\u2dff\u6134f\xbb\u2dff\u803b\xaa\u40aa\u803b\xba\u40bagof;\u62b6r;\u6a56lope;\u6a57;\u6a5b\u0180clo\u2e1f\u2e21\u2e27\xf2\u2e01ash\u803b\xf8\u40f8l;\u6298i\u016c\u2e2f\u2e34de\u803b\xf5\u40f5es\u0100;a\u01db\u2e3as;\u6a36ml\u803b\xf6\u40f6bar;\u633d\u0ae1\u2e5e\0\u2e7d\0\u2e80\u2e9d\0\u2ea2\u2eb9\0\0\u2ecb\u0e9c\0\u2f13\0\0\u2f2b\u2fbc\0\u2fc8r\u0200;ast\u0403\u2e67\u2e72\u0e85\u8100\xb6;l\u2e6d\u2e6e\u40b6le\xec\u0403\u0269\u2e78\0\0\u2e7bm;\u6af3;\u6afdy;\u443fr\u0280cimpt\u2e8b\u2e8f\u2e93\u1865\u2e97nt;\u4025od;\u402eil;\u6030enk;\u6031r;\uc000\ud835\udd2d\u0180imo\u2ea8\u2eb0\u2eb4\u0100;v\u2ead\u2eae\u43c6;\u43d5ma\xf4\u0a76ne;\u660e\u0180;tv\u2ebf\u2ec0\u2ec8\u43c0chfork\xbb\u1ffd;\u43d6\u0100au\u2ecf\u2edfn\u0100ck\u2ed5\u2eddk\u0100;h\u21f4\u2edb;\u610e\xf6\u21f4s\u0480;abcdemst\u2ef3\u2ef4\u1908\u2ef9\u2efd\u2f04\u2f06\u2f0a\u2f0e\u402bcir;\u6a23ir;\u6a22\u0100ou\u1d40\u2f02;\u6a25;\u6a72n\u80bb\xb1\u0e9dim;\u6a26wo;\u6a27\u0180ipu\u2f19\u2f20\u2f25ntint;\u6a15f;\uc000\ud835\udd61nd\u803b\xa3\u40a3\u0500;Eaceinosu\u0ec8\u2f3f\u2f41\u2f44\u2f47\u2f81\u2f89\u2f92\u2f7e\u2fb6;\u6ab3p;\u6ab7u\xe5\u0ed9\u0100;c\u0ece\u2f4c\u0300;acens\u0ec8\u2f59\u2f5f\u2f66\u2f68\u2f7eppro\xf8\u2f43urlye\xf1\u0ed9\xf1\u0ece\u0180aes\u2f6f\u2f76\u2f7approx;\u6ab9qq;\u6ab5im;\u62e8i\xed\u0edfme\u0100;s\u2f88\u0eae\u6032\u0180Eas\u2f78\u2f90\u2f7a\xf0\u2f75\u0180dfp\u0eec\u2f99\u2faf\u0180als\u2fa0\u2fa5\u2faalar;\u632eine;\u6312urf;\u6313\u0100;t\u0efb\u2fb4\xef\u0efbrel;\u62b0\u0100ci\u2fc0\u2fc5r;\uc000\ud835\udcc5;\u43c8ncsp;\u6008\u0300fiopsu\u2fda\u22e2\u2fdf\u2fe5\u2feb\u2ff1r;\uc000\ud835\udd2epf;\uc000\ud835\udd62rime;\u6057cr;\uc000\ud835\udcc6\u0180aeo\u2ff8\u3009\u3013t\u0100ei\u2ffe\u3005rnion\xf3\u06b0nt;\u6a16st\u0100;e\u3010\u3011\u403f\xf1\u1f19\xf4\u0f14\u0a80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30e0\u310e\u312b\u3147\u3162\u3172\u318e\u3206\u3215\u3224\u3229\u3258\u326e\u3272\u3290\u32b0\u32b7\u0180art\u3047\u304a\u304cr\xf2\u10b3\xf2\u03ddail;\u691car\xf2\u1c65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307f\u308f\u3094\u30cc\u0100eu\u306d\u3071;\uc000\u223d\u0331te;\u4155i\xe3\u116emptyv;\u69b3g\u0200;del\u0fd1\u3089\u308b\u308d;\u6992;\u69a5\xe5\u0fd1uo\u803b\xbb\u40bbr\u0580;abcfhlpstw\u0fdc\u30ac\u30af\u30b7\u30b9\u30bc\u30be\u30c0\u30c3\u30c7\u30cap;\u6975\u0100;f\u0fe0\u30b4s;\u6920;\u6933s;\u691e\xeb\u225d\xf0\u272el;\u6945im;\u6974l;\u61a3;\u619d\u0100ai\u30d1\u30d5il;\u691ao\u0100;n\u30db\u30dc\u6236al\xf3\u0f1e\u0180abr\u30e7\u30ea\u30eer\xf2\u17e5rk;\u6773\u0100ak\u30f3\u30fdc\u0100ek\u30f9\u30fb;\u407d;\u405d\u0100es\u3102\u3104;\u698cl\u0100du\u310a\u310c;\u698e;\u6990\u0200aeuy\u3117\u311c\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xec\u0ff2\xe2\u30fa;\u4440\u0200clqs\u3134\u3137\u313d\u3144a;\u6937dhar;\u6969uo\u0100;r\u020e\u020dh;\u61b3\u0180acg\u314e\u315f\u0f44l\u0200;ips\u0f78\u3158\u315b\u109cn\xe5\u10bbar\xf4\u0fa9t;\u65ad\u0180ilr\u3169\u1023\u316esht;\u697d;\uc000\ud835\udd2f\u0100ao\u3177\u3186r\u0100du\u317d\u317f\xbb\u047b\u0100;l\u1091\u3184;\u696c\u0100;v\u318b\u318c\u43c1;\u43f1\u0180gns\u3195\u31f9\u31fcht\u0300ahlrst\u31a4\u31b0\u31c2\u31d8\u31e4\u31eerrow\u0100;t\u0fdc\u31ada\xe9\u30c8arpoon\u0100du\u31bb\u31bfow\xee\u317ep\xbb\u1092eft\u0100ah\u31ca\u31d0rrow\xf3\u0feaarpoon\xf3\u0551ightarrows;\u61c9quigarro\xf7\u30cbhreetimes;\u62ccg;\u42daingdotse\xf1\u1f32\u0180ahm\u320d\u3210\u3213r\xf2\u0feaa\xf2\u0551;\u600foust\u0100;a\u321e\u321f\u63b1che\xbb\u321fmid;\u6aee\u0200abpt\u3232\u323d\u3240\u3252\u0100nr\u3237\u323ag;\u67edr;\u61fer\xeb\u1003\u0180afl\u3247\u324a\u324er;\u6986;\uc000\ud835\udd63us;\u6a2eimes;\u6a35\u0100ap\u325d\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6a12ar\xf2\u31e3\u0200achq\u327b\u3280\u10bc\u3285quo;\u603ar;\uc000\ud835\udcc7\u0100bu\u30fb\u328ao\u0100;r\u0214\u0213\u0180hir\u3297\u329b\u32a0re\xe5\u31f8mes;\u62cai\u0200;efl\u32aa\u1059\u1821\u32ab\u65b9tri;\u69celuhar;\u6968;\u611e\u0d61\u32d5\u32db\u32df\u332c\u3338\u3371\0\u337a\u33a4\0\0\u33ec\u33f0\0\u3428\u3448\u345a\u34ad\u34b1\u34ca\u34f1\0\u3616\0\0\u3633cute;\u415bqu\xef\u27ba\u0500;Eaceinpsy\u11ed\u32f3\u32f5\u32ff\u3302\u330b\u330f\u331f\u3326\u3329;\u6ab4\u01f0\u32fa\0\u32fc;\u6ab8on;\u4161u\xe5\u11fe\u0100;d\u11f3\u3307il;\u415frc;\u415d\u0180Eas\u3316\u3318\u331b;\u6ab6p;\u6abaim;\u62e9olint;\u6a13i\xed\u1204;\u4441ot\u0180;be\u3334\u1d47\u3335\u62c5;\u6a66\u0380Aacmstx\u3346\u334a\u3357\u335b\u335e\u3363\u336drr;\u61d8r\u0100hr\u3350\u3352\xeb\u2228\u0100;o\u0a36\u0a34t\u803b\xa7\u40a7i;\u403bwar;\u6929m\u0100in\u3369\xf0nu\xf3\xf1t;\u6736r\u0100;o\u3376\u2055\uc000\ud835\udd30\u0200acoy\u3382\u3386\u3391\u33a0rp;\u666f\u0100hy\u338b\u338fcy;\u4449;\u4448rt\u026d\u3399\0\0\u339ci\xe4\u1464ara\xec\u2e6f\u803b\xad\u40ad\u0100gm\u33a8\u33b4ma\u0180;fv\u33b1\u33b2\u33b2\u43c3;\u43c2\u0400;deglnpr\u12ab\u33c5\u33c9\u33ce\u33d6\u33de\u33e1\u33e6ot;\u6a6a\u0100;q\u12b1\u12b0\u0100;E\u33d3\u33d4\u6a9e;\u6aa0\u0100;E\u33db\u33dc\u6a9d;\u6a9fe;\u6246lus;\u6a24arr;\u6972ar\xf2\u113d\u0200aeit\u33f8\u3408\u340f\u3417\u0100ls\u33fd\u3404lsetm\xe9\u336ahp;\u6a33parsl;\u69e4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341c\u341d\u6aaa\u0100;s\u3422\u3423\u6aac;\uc000\u2aac\ufe00\u0180flp\u342e\u3433\u3442tcy;\u444c\u0100;b\u3438\u3439\u402f\u0100;a\u343e\u343f\u69c4r;\u633ff;\uc000\ud835\udd64a\u0100dr\u344d\u0402es\u0100;u\u3454\u3455\u6660it\xbb\u3455\u0180csu\u3460\u3479\u349f\u0100au\u3465\u346fp\u0100;s\u1188\u346b;\uc000\u2293\ufe00p\u0100;s\u11b4\u3475;\uc000\u2294\ufe00u\u0100bp\u347f\u348f\u0180;es\u1197\u119c\u3486et\u0100;e\u1197\u348d\xf1\u119d\u0180;es\u11a8\u11ad\u3496et\u0100;e\u11a8\u349d\xf1\u11ae\u0180;af\u117b\u34a6\u05b0r\u0165\u34ab\u05b1\xbb\u117car\xf2\u1148\u0200cemt\u34b9\u34be\u34c2\u34c5r;\uc000\ud835\udcc8tm\xee\xf1i\xec\u3415ar\xe6\u11be\u0100ar\u34ce\u34d5r\u0100;f\u34d4\u17bf\u6606\u0100an\u34da\u34edight\u0100ep\u34e3\u34eapsilo\xee\u1ee0h\xe9\u2eafs\xbb\u2852\u0280bcmnp\u34fb\u355e\u1209\u358b\u358e\u0480;Edemnprs\u350e\u350f\u3511\u3515\u351e\u3523\u352c\u3531\u3536\u6282;\u6ac5ot;\u6abd\u0100;d\u11da\u351aot;\u6ac3ult;\u6ac1\u0100Ee\u3528\u352a;\u6acb;\u628alus;\u6abfarr;\u6979\u0180eiu\u353d\u3552\u3555t\u0180;en\u350e\u3545\u354bq\u0100;q\u11da\u350feq\u0100;q\u352b\u3528m;\u6ac7\u0100bp\u355a\u355c;\u6ad5;\u6ad3c\u0300;acens\u11ed\u356c\u3572\u3579\u357b\u3326ppro\xf8\u32faurlye\xf1\u11fe\xf1\u11f3\u0180aes\u3582\u3588\u331bppro\xf8\u331aq\xf1\u3317g;\u666a\u0680123;Edehlmnps\u35a9\u35ac\u35af\u121c\u35b2\u35b4\u35c0\u35c9\u35d5\u35da\u35df\u35e8\u35ed\u803b\xb9\u40b9\u803b\xb2\u40b2\u803b\xb3\u40b3;\u6ac6\u0100os\u35b9\u35bct;\u6abeub;\u6ad8\u0100;d\u1222\u35c5ot;\u6ac4s\u0100ou\u35cf\u35d2l;\u67c9b;\u6ad7arr;\u697bult;\u6ac2\u0100Ee\u35e4\u35e6;\u6acc;\u628blus;\u6ac0\u0180eiu\u35f4\u3609\u360ct\u0180;en\u121c\u35fc\u3602q\u0100;q\u1222\u35b2eq\u0100;q\u35e7\u35e4m;\u6ac8\u0100bp\u3611\u3613;\u6ad4;\u6ad6\u0180Aan\u361c\u3620\u362drr;\u61d9r\u0100hr\u3626\u3628\xeb\u222e\u0100;o\u0a2b\u0a29war;\u692alig\u803b\xdf\u40df\u0be1\u3651\u365d\u3660\u12ce\u3673\u3679\0\u367e\u36c2\0\0\0\0\0\u36db\u3703\0\u3709\u376c\0\0\0\u3787\u0272\u3656\0\0\u365bget;\u6316;\u43c4r\xeb\u0e5f\u0180aey\u3666\u366b\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uc000\ud835\udd31\u0200eiko\u3686\u369d\u36b5\u36bc\u01f2\u368b\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369b\u43b8ym;\u43d1\u0100cn\u36a2\u36b2k\u0100as\u36a8\u36aeppro\xf8\u12c1im\xbb\u12acs\xf0\u129e\u0100as\u36ba\u36ae\xf0\u12c1rn\u803b\xfe\u40fe\u01ec\u031f\u36c6\u22e7es\u8180\xd7;bd\u36cf\u36d0\u36d8\u40d7\u0100;a\u190f\u36d5r;\u6a31;\u6a30\u0180eps\u36e1\u36e3\u3700\xe1\u2a4d\u0200;bcf\u0486\u36ec\u36f0\u36f4ot;\u6336ir;\u6af1\u0100;o\u36f9\u36fc\uc000\ud835\udd65rk;\u6ada\xe1\u3362rime;\u6034\u0180aip\u370f\u3712\u3764d\xe5\u1248\u0380adempst\u3721\u374d\u3740\u3751\u3757\u375c\u375fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65b5own\xbb\u1dbbeft\u0100;e\u2800\u373e\xf1\u092e;\u625cight\u0100;e\u32aa\u374b\xf1\u105aot;\u65ecinus;\u6a3alus;\u6a39b;\u69cdime;\u6a3bezium;\u63e2\u0180cht\u3772\u377d\u3781\u0100ry\u3777\u377b;\uc000\ud835\udcc9;\u4446cy;\u445brok;\u4167\u0100io\u378b\u378ex\xf4\u1777head\u0100lr\u3797\u37a0eftarro\xf7\u084fightarrow\xbb\u0f5d\u0900AHabcdfghlmoprstuw\u37d0\u37d3\u37d7\u37e4\u37f0\u37fc\u380e\u381c\u3823\u3834\u3851\u385d\u386b\u38a9\u38cc\u38d2\u38ea\u38f6r\xf2\u03edar;\u6963\u0100cr\u37dc\u37e2ute\u803b\xfa\u40fa\xf2\u1150r\u01e3\u37ea\0\u37edy;\u445eve;\u416d\u0100iy\u37f5\u37farc\u803b\xfb\u40fb;\u4443\u0180abh\u3803\u3806\u380br\xf2\u13adlac;\u4171a\xf2\u13c3\u0100ir\u3813\u3818sht;\u697e;\uc000\ud835\udd32rave\u803b\xf9\u40f9\u0161\u3827\u3831r\u0100lr\u382c\u382e\xbb\u0957\xbb\u1083lk;\u6580\u0100ct\u3839\u384d\u026f\u383f\0\0\u384arn\u0100;e\u3845\u3846\u631cr\xbb\u3846op;\u630fri;\u65f8\u0100al\u3856\u385acr;\u416b\u80bb\xa8\u0349\u0100gp\u3862\u3866on;\u4173f;\uc000\ud835\udd66\u0300adhlsu\u114b\u3878\u387d\u1372\u3891\u38a0own\xe1\u13b3arpoon\u0100lr\u3888\u388cef\xf4\u382digh\xf4\u382fi\u0180;hl\u3899\u389a\u389c\u43c5\xbb\u13faon\xbb\u389aparrows;\u61c8\u0180cit\u38b0\u38c4\u38c8\u026f\u38b6\0\0\u38c1rn\u0100;e\u38bc\u38bd\u631dr\xbb\u38bdop;\u630eng;\u416fri;\u65f9cr;\uc000\ud835\udcca\u0180dir\u38d9\u38dd\u38e2ot;\u62f0lde;\u4169i\u0100;f\u3730\u38e8\xbb\u1813\u0100am\u38ef\u38f2r\xf2\u38a8l\u803b\xfc\u40fcangle;\u69a7\u0780ABDacdeflnoprsz\u391c\u391f\u3929\u392d\u39b5\u39b8\u39bd\u39df\u39e4\u39e8\u39f3\u39f9\u39fd\u3a01\u3a20r\xf2\u03f7ar\u0100;v\u3926\u3927\u6ae8;\u6ae9as\xe8\u03e1\u0100nr\u3932\u3937grt;\u699c\u0380eknprst\u34e3\u3946\u394b\u3952\u395d\u3964\u3996app\xe1\u2415othin\xe7\u1e96\u0180hir\u34eb\u2ec8\u3959op\xf4\u2fb5\u0100;h\u13b7\u3962\xef\u318d\u0100iu\u3969\u396dgm\xe1\u33b3\u0100bp\u3972\u3984setneq\u0100;q\u397d\u3980\uc000\u228a\ufe00;\uc000\u2acb\ufe00setneq\u0100;q\u398f\u3992\uc000\u228b\ufe00;\uc000\u2acc\ufe00\u0100hr\u399b\u399fet\xe1\u369ciangle\u0100lr\u39aa\u39afeft\xbb\u0925ight\xbb\u1051y;\u4432ash\xbb\u1036\u0180elr\u39c4\u39d2\u39d7\u0180;be\u2dea\u39cb\u39cfar;\u62bbq;\u625alip;\u62ee\u0100bt\u39dc\u1468a\xf2\u1469r;\uc000\ud835\udd33tr\xe9\u39aesu\u0100bp\u39ef\u39f1\xbb\u0d1c\xbb\u0d59pf;\uc000\ud835\udd67ro\xf0\u0efbtr\xe9\u39b4\u0100cu\u3a06\u3a0br;\uc000\ud835\udccb\u0100bp\u3a10\u3a18n\u0100Ee\u3980\u3a16\xbb\u397en\u0100Ee\u3992\u3a1e\xbb\u3990igzag;\u699a\u0380cefoprs\u3a36\u3a3b\u3a56\u3a5b\u3a54\u3a61\u3a6airc;\u4175\u0100di\u3a40\u3a51\u0100bg\u3a45\u3a49ar;\u6a5fe\u0100;q\u15fa\u3a4f;\u6259erp;\u6118r;\uc000\ud835\udd34pf;\uc000\ud835\udd68\u0100;e\u1479\u3a66at\xe8\u1479cr;\uc000\ud835\udccc\u0ae3\u178e\u3a87\0\u3a8b\0\u3a90\u3a9b\0\0\u3a9d\u3aa8\u3aab\u3aaf\0\0\u3ac3\u3ace\0\u3ad8\u17dc\u17dftr\xe9\u17d1r;\uc000\ud835\udd35\u0100Aa\u3a94\u3a97r\xf2\u03c3r\xf2\u09f6;\u43be\u0100Aa\u3aa1\u3aa4r\xf2\u03b8r\xf2\u09eba\xf0\u2713is;\u62fb\u0180dpt\u17a4\u3ab5\u3abe\u0100fl\u3aba\u17a9;\uc000\ud835\udd69im\xe5\u17b2\u0100Aa\u3ac7\u3acar\xf2\u03cer\xf2\u0a01\u0100cq\u3ad2\u17b8r;\uc000\ud835\udccd\u0100pt\u17d6\u3adcr\xe9\u17d4\u0400acefiosu\u3af0\u3afd\u3b08\u3b0c\u3b11\u3b15\u3b1b\u3b21c\u0100uy\u3af6\u3afbte\u803b\xfd\u40fd;\u444f\u0100iy\u3b02\u3b06rc;\u4177;\u444bn\u803b\xa5\u40a5r;\uc000\ud835\udd36cy;\u4457pf;\uc000\ud835\udd6acr;\uc000\ud835\udcce\u0100cm\u3b26\u3b29y;\u444el\u803b\xff\u40ff\u0500acdefhiosw\u3b42\u3b48\u3b54\u3b58\u3b64\u3b69\u3b6d\u3b74\u3b7a\u3b80cute;\u417a\u0100ay\u3b4d\u3b52ron;\u417e;\u4437ot;\u417c\u0100et\u3b5d\u3b61tr\xe6\u155fa;\u43b6r;\uc000\ud835\udd37cy;\u4436grarr;\u61ddpf;\uc000\ud835\udd6bcr;\uc000\ud835\udccf\u0100jn\u3b85\u3b87;\u600dj;\u600c".split("").map(function(c) {
	    return c.charCodeAt(0);
	}));

	// Generated using scripts/write-decode-map.ts
	var xmlDecodeTree = new Uint16Array(// prettier-ignore
	"\u0200aglq\t\x15\x18\x1b\u026d\x0f\0\0\x12p;\u4026os;\u4027t;\u403et;\u403cuot;\u4022".split("").map(function(c) {
	    return c.charCodeAt(0);
	}));

	// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134
	var _a;
	var decodeMap = new Map([
	    [
	        0,
	        65533
	    ],
	    // C1 Unicode control character reference replacements
	    [
	        128,
	        8364
	    ],
	    [
	        130,
	        8218
	    ],
	    [
	        131,
	        402
	    ],
	    [
	        132,
	        8222
	    ],
	    [
	        133,
	        8230
	    ],
	    [
	        134,
	        8224
	    ],
	    [
	        135,
	        8225
	    ],
	    [
	        136,
	        710
	    ],
	    [
	        137,
	        8240
	    ],
	    [
	        138,
	        352
	    ],
	    [
	        139,
	        8249
	    ],
	    [
	        140,
	        338
	    ],
	    [
	        142,
	        381
	    ],
	    [
	        145,
	        8216
	    ],
	    [
	        146,
	        8217
	    ],
	    [
	        147,
	        8220
	    ],
	    [
	        148,
	        8221
	    ],
	    [
	        149,
	        8226
	    ],
	    [
	        150,
	        8211
	    ],
	    [
	        151,
	        8212
	    ],
	    [
	        152,
	        732
	    ],
	    [
	        153,
	        8482
	    ],
	    [
	        154,
	        353
	    ],
	    [
	        155,
	        8250
	    ],
	    [
	        156,
	        339
	    ],
	    [
	        158,
	        382
	    ],
	    [
	        159,
	        376
	    ]
	]);
	/**
	 * Polyfill for `String.fromCodePoint`. It is used to create a string from a Unicode code point.
	 */ var fromCodePoint$1 = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
	(_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function fromCodePoint(codePoint) {
	    var output = "";
	    if (codePoint > 0xffff) {
	        codePoint -= 0x10000;
	        output += String.fromCharCode(codePoint >>> 10 & 0x3ff | 0xd800);
	        codePoint = 0xdc00 | codePoint & 0x3ff;
	    }
	    output += String.fromCharCode(codePoint);
	    return output;
	};
	/**
	 * Replace the given code point with a replacement character if it is a
	 * surrogate or is outside the valid range. Otherwise return the code
	 * point unchanged.
	 */ function replaceCodePoint(codePoint) {
	    var _a;
	    if (codePoint >= 0xd800 && codePoint <= 0xdfff || codePoint > 0x10ffff) {
	        return 0xfffd;
	    }
	    return (_a = decodeMap.get(codePoint)) !== null && _a !== void 0 ? _a : codePoint;
	}

	var CharCodes;
	(function(CharCodes) {
	    CharCodes[CharCodes["NUM"] = 35] = "NUM";
	    CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	    CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	    CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	    CharCodes[CharCodes["NINE"] = 57] = "NINE";
	    CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	    CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
	    CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
	    CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
	    CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
	    CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
	    CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
	})(CharCodes || (CharCodes = {}));
	/** Bit that needs to be set to convert an upper case ASCII character to lower case */ var TO_LOWER_BIT = 32;
	var BinTrieFlags;
	(function(BinTrieFlags) {
	    BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	    BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
	    BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
	})(BinTrieFlags || (BinTrieFlags = {}));
	function isNumber(code) {
	    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
	}
	function isHexadecimalCharacter(code) {
	    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
	}
	function isAsciiAlphaNumeric(code) {
	    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
	}
	/**
	 * Checks if the given character is a valid end character for an entity in an attribute.
	 *
	 * Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
	 * See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
	 */ function isEntityInAttributeInvalidEnd(code) {
	    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
	}
	var EntityDecoderState;
	(function(EntityDecoderState) {
	    EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	    EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	    EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	    EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	    EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
	})(EntityDecoderState || (EntityDecoderState = {}));
	var DecodingMode;
	(function(DecodingMode) {
	    /** Entities in text nodes that can end with any character. */ DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	    /** Only allow entities terminated with a semicolon. */ DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	    /** Entities in attributes have limitations on ending characters. */ DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
	})(DecodingMode || (DecodingMode = {}));
	/**
	 * Token decoder with support of writing partial entities.
	 */ var EntityDecoder = /*#__PURE__*/ function() {
	    function EntityDecoder(/** The tree used to decode entities. */ decodeTree, /**
	     * The function that is called when a codepoint is decoded.
	     *
	     * For multi-byte named entities, this will be called multiple times,
	     * with the second codepoint, and the same `consumed` value.
	     *
	     * @param codepoint The decoded codepoint.
	     * @param consumed The number of bytes consumed by the decoder.
	     */ emitCodePoint, /** An object that is used to produce errors. */ errors) {
	        this.decodeTree = decodeTree;
	        this.emitCodePoint = emitCodePoint;
	        this.errors = errors;
	        /** The current state of the decoder. */ this.state = EntityDecoderState.EntityStart;
	        /** Characters that were consumed while parsing an entity. */ this.consumed = 1;
	        /**
	         * The result of the entity.
	         *
	         * Either the result index of a numeric entity, or the codepoint of a
	         * numeric entity.
	         */ this.result = 0;
	        /** The current index in the decode tree. */ this.treeIndex = 0;
	        /** The number of characters that were consumed in excess. */ this.excess = 1;
	        /** The mode in which the decoder is operating. */ this.decodeMode = DecodingMode.Strict;
	    }
	    var _proto = EntityDecoder.prototype;
	    /** Resets the instance to make it reusable. */ _proto.startEntity = function startEntity(decodeMode) {
	        this.decodeMode = decodeMode;
	        this.state = EntityDecoderState.EntityStart;
	        this.result = 0;
	        this.treeIndex = 0;
	        this.excess = 1;
	        this.consumed = 1;
	    };
	    /**
	     * Write an entity to the decoder. This can be called multiple times with partial entities.
	     * If the entity is incomplete, the decoder will return -1.
	     *
	     * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
	     * entity is incomplete, and resume when the next string is written.
	     *
	     * @param string The string containing the entity (or a continuation of the entity).
	     * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	     */ _proto.write = function write(str, offset) {
	        switch(this.state){
	            case EntityDecoderState.EntityStart:
	                {
	                    if (str.charCodeAt(offset) === CharCodes.NUM) {
	                        this.state = EntityDecoderState.NumericStart;
	                        this.consumed += 1;
	                        return this.stateNumericStart(str, offset + 1);
	                    }
	                    this.state = EntityDecoderState.NamedEntity;
	                    return this.stateNamedEntity(str, offset);
	                }
	            case EntityDecoderState.NumericStart:
	                {
	                    return this.stateNumericStart(str, offset);
	                }
	            case EntityDecoderState.NumericDecimal:
	                {
	                    return this.stateNumericDecimal(str, offset);
	                }
	            case EntityDecoderState.NumericHex:
	                {
	                    return this.stateNumericHex(str, offset);
	                }
	            case EntityDecoderState.NamedEntity:
	                {
	                    return this.stateNamedEntity(str, offset);
	                }
	        }
	    };
	    /**
	     * Switches between the numeric decimal and hexadecimal states.
	     *
	     * Equivalent to the `Numeric character reference state` in the HTML spec.
	     *
	     * @param str The string containing the entity (or a continuation of the entity).
	     * @param offset The current offset.
	     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	     */ _proto.stateNumericStart = function stateNumericStart(str, offset) {
	        if (offset >= str.length) {
	            return -1;
	        }
	        if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
	            this.state = EntityDecoderState.NumericHex;
	            this.consumed += 1;
	            return this.stateNumericHex(str, offset + 1);
	        }
	        this.state = EntityDecoderState.NumericDecimal;
	        return this.stateNumericDecimal(str, offset);
	    };
	    _proto.addToNumericResult = function addToNumericResult(str, start, end, base) {
	        if (start !== end) {
	            var digitCount = end - start;
	            this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
	            this.consumed += digitCount;
	        }
	    };
	    /**
	     * Parses a hexadecimal numeric entity.
	     *
	     * Equivalent to the `Hexademical character reference state` in the HTML spec.
	     *
	     * @param str The string containing the entity (or a continuation of the entity).
	     * @param offset The current offset.
	     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	     */ _proto.stateNumericHex = function stateNumericHex(str, offset) {
	        var startIdx = offset;
	        while(offset < str.length){
	            var char = str.charCodeAt(offset);
	            if (isNumber(char) || isHexadecimalCharacter(char)) {
	                offset += 1;
	            } else {
	                this.addToNumericResult(str, startIdx, offset, 16);
	                return this.emitNumericEntity(char, 3);
	            }
	        }
	        this.addToNumericResult(str, startIdx, offset, 16);
	        return -1;
	    };
	    /**
	     * Parses a decimal numeric entity.
	     *
	     * Equivalent to the `Decimal character reference state` in the HTML spec.
	     *
	     * @param str The string containing the entity (or a continuation of the entity).
	     * @param offset The current offset.
	     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	     */ _proto.stateNumericDecimal = function stateNumericDecimal(str, offset) {
	        var startIdx = offset;
	        while(offset < str.length){
	            var char = str.charCodeAt(offset);
	            if (isNumber(char)) {
	                offset += 1;
	            } else {
	                this.addToNumericResult(str, startIdx, offset, 10);
	                return this.emitNumericEntity(char, 2);
	            }
	        }
	        this.addToNumericResult(str, startIdx, offset, 10);
	        return -1;
	    };
	    /**
	     * Validate and emit a numeric entity.
	     *
	     * Implements the logic from the `Hexademical character reference start
	     * state` and `Numeric character reference end state` in the HTML spec.
	     *
	     * @param lastCp The last code point of the entity. Used to see if the
	     *               entity was terminated with a semicolon.
	     * @param expectedLength The minimum number of characters that should be
	     *                       consumed. Used to validate that at least one digit
	     *                       was consumed.
	     * @returns The number of characters that were consumed.
	     */ _proto.emitNumericEntity = function emitNumericEntity(lastCp, expectedLength) {
	        var _a;
	        // Ensure we consumed at least one digit.
	        if (this.consumed <= expectedLength) {
	            (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
	            return 0;
	        }
	        // Figure out if this is a legit end of the entity
	        if (lastCp === CharCodes.SEMI) {
	            this.consumed += 1;
	        } else if (this.decodeMode === DecodingMode.Strict) {
	            return 0;
	        }
	        this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
	        if (this.errors) {
	            if (lastCp !== CharCodes.SEMI) {
	                this.errors.missingSemicolonAfterCharacterReference();
	            }
	            this.errors.validateNumericCharacterReference(this.result);
	        }
	        return this.consumed;
	    };
	    /**
	     * Parses a named entity.
	     *
	     * Equivalent to the `Named character reference state` in the HTML spec.
	     *
	     * @param str The string containing the entity (or a continuation of the entity).
	     * @param offset The current offset.
	     * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	     */ _proto.stateNamedEntity = function stateNamedEntity(str, offset) {
	        var decodeTree = this.decodeTree;
	        var current = decodeTree[this.treeIndex];
	        // The mask is the number of bytes of the value, including the current byte.
	        var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
	        for(; offset < str.length; offset++, this.excess++){
	            var char = str.charCodeAt(offset);
	            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
	            if (this.treeIndex < 0) {
	                return this.result === 0 || // If we are parsing an attribute
	                this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
	                (valueLength === 0 || // And there should be no invalid characters.
	                isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
	            }
	            current = decodeTree[this.treeIndex];
	            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
	            // If the branch is a value, store it and continue
	            if (valueLength !== 0) {
	                // If the entity is terminated by a semicolon, we are done.
	                if (char === CharCodes.SEMI) {
	                    return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
	                }
	                // If we encounter a non-terminated (legacy) entity while parsing strictly, then ignore it.
	                if (this.decodeMode !== DecodingMode.Strict) {
	                    this.result = this.treeIndex;
	                    this.consumed += this.excess;
	                    this.excess = 0;
	                }
	            }
	        }
	        return -1;
	    };
	    /**
	     * Emit a named entity that was not terminated with a semicolon.
	     *
	     * @returns The number of characters consumed.
	     */ _proto.emitNotTerminatedNamedEntity = function emitNotTerminatedNamedEntity() {
	        var _a;
	        var _this = this, result = _this.result, decodeTree = _this.decodeTree;
	        var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
	        this.emitNamedEntityData(result, valueLength, this.consumed);
	        (_a = this.errors) === null || _a === void 0 ? void 0 : _a.missingSemicolonAfterCharacterReference();
	        return this.consumed;
	    };
	    /**
	     * Emit a named entity.
	     *
	     * @param result The index of the entity in the decode tree.
	     * @param valueLength The number of bytes in the entity.
	     * @param consumed The number of characters consumed.
	     *
	     * @returns The number of characters consumed.
	     */ _proto.emitNamedEntityData = function emitNamedEntityData(result, valueLength, consumed) {
	        var decodeTree = this.decodeTree;
	        this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
	        if (valueLength === 3) {
	            // For multi-byte values, we need to emit the second byte.
	            this.emitCodePoint(decodeTree[result + 2], consumed);
	        }
	        return consumed;
	    };
	    /**
	     * Signal to the parser that the end of the input was reached.
	     *
	     * Remaining data will be emitted and relevant errors will be produced.
	     *
	     * @returns The number of characters consumed.
	     */ _proto.end = function end() {
	        var _a;
	        switch(this.state){
	            case EntityDecoderState.NamedEntity:
	                {
	                    // Emit a named entity if we have one.
	                    return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
	                }
	            // Otherwise, emit a numeric entity if we have one.
	            case EntityDecoderState.NumericDecimal:
	                {
	                    return this.emitNumericEntity(0, 2);
	                }
	            case EntityDecoderState.NumericHex:
	                {
	                    return this.emitNumericEntity(0, 3);
	                }
	            case EntityDecoderState.NumericStart:
	                {
	                    (_a = this.errors) === null || _a === void 0 ? void 0 : _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
	                    return 0;
	                }
	            case EntityDecoderState.EntityStart:
	                {
	                    // Return 0 if we have no entity.
	                    return 0;
	                }
	        }
	    };
	    return EntityDecoder;
	}();
	/**
	 * Creates a function that decodes entities in a string.
	 *
	 * @param decodeTree The decode tree.
	 * @returns A function that decodes entities in a string.
	 */ function getDecoder(decodeTree) {
	    var ret = "";
	    var decoder = new EntityDecoder(decodeTree, function(str) {
	        return ret += fromCodePoint$1(str);
	    });
	    return function decodeWithTrie(str, decodeMode) {
	        var lastIndex = 0;
	        var offset = 0;
	        while((offset = str.indexOf("&", offset)) >= 0){
	            ret += str.slice(lastIndex, offset);
	            decoder.startEntity(decodeMode);
	            var len = decoder.write(str, // Skip the "&"
	            offset + 1);
	            if (len < 0) {
	                lastIndex = offset + decoder.end();
	                break;
	            }
	            lastIndex = offset + len;
	            // If `len` is 0, skip the current `&` and continue.
	            offset = len === 0 ? lastIndex + 1 : lastIndex;
	        }
	        var result = ret + str.slice(lastIndex);
	        // Make sure we don't keep a reference to the final string.
	        ret = "";
	        return result;
	    };
	}
	/**
	 * Determines the branch of the current node that is taken given the current
	 * character. This function is used to traverse the trie.
	 *
	 * @param decodeTree The trie.
	 * @param current The current node.
	 * @param nodeIdx The index right after the current node and its value.
	 * @param char The current character.
	 * @returns The index of the next node, or -1 if no branch is taken.
	 */ function determineBranch(decodeTree, current, nodeIdx, char) {
	    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	    // Case 1: Single branch encoded in jump offset
	    if (branchCount === 0) {
	        return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
	    }
	    // Case 2: Multiple branches encoded in jump table
	    if (jumpOffset) {
	        var value = char - jumpOffset;
	        return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
	    }
	    // Case 3: Multiple branches encoded in dictionary
	    // Binary search for the character.
	    var lo = nodeIdx;
	    var hi = lo + branchCount - 1;
	    while(lo <= hi){
	        var mid = lo + hi >>> 1;
	        var midVal = decodeTree[mid];
	        if (midVal < char) {
	            lo = mid + 1;
	        } else if (midVal > char) {
	            hi = mid - 1;
	        } else {
	            return decodeTree[mid + branchCount];
	        }
	    }
	    return -1;
	}
	var htmlDecoder = getDecoder(htmlDecodeTree);
	getDecoder(xmlDecodeTree);
	/**
	 * Decodes an HTML string.
	 *
	 * @param str The string to decode.
	 * @param mode The decoding mode.
	 * @returns The decoded string.
	 */ function decodeHTML(str, mode) {
	    if (mode === void 0) mode = DecodingMode.Legacy;
	    return htmlDecoder(str, mode);
	}

	// Utilities
	//
	function _type_of(obj) {
	    "@swc/helpers - typeof";
	    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
	}
	function _class$1(obj) {
	    return Object.prototype.toString.call(obj);
	}
	function isString$1(obj) {
	    return _class$1(obj) === '[object String]';
	}
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	function has(object, key) {
	    return _hasOwnProperty.call(object, key);
	}
	// Merge objects
	//
	function assign$1(obj /* from1, from2, from3, ... */ ) {
	    var sources = Array.prototype.slice.call(arguments, 1);
	    sources.forEach(function(source) {
	        if (!source) {
	            return;
	        }
	        if ((typeof source === "undefined" ? "undefined" : _type_of(source)) !== 'object') {
	            throw new TypeError(source + 'must be object');
	        }
	        Object.keys(source).forEach(function(key) {
	            obj[key] = source[key];
	        });
	    });
	    return obj;
	}
	// Remove element from array and put another array at those position.
	// Useful for some operations with tokens
	function arrayReplaceAt(src, pos, newElements) {
	    return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
	}
	function isValidEntityCode(c) {
	    /* eslint no-bitwise:0 */ // broken sequence
	    if (c >= 0xD800 && c <= 0xDFFF) {
	        return false;
	    }
	    // never used
	    if (c >= 0xFDD0 && c <= 0xFDEF) {
	        return false;
	    }
	    if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) {
	        return false;
	    }
	    // control codes
	    if (c >= 0x00 && c <= 0x08) {
	        return false;
	    }
	    if (c === 0x0B) {
	        return false;
	    }
	    if (c >= 0x0E && c <= 0x1F) {
	        return false;
	    }
	    if (c >= 0x7F && c <= 0x9F) {
	        return false;
	    }
	    // out of range
	    if (c > 0x10FFFF) {
	        return false;
	    }
	    return true;
	}
	function fromCodePoint(c) {
	    /* eslint no-bitwise:0 */ if (c > 0xffff) {
	        c -= 0x10000;
	        var surrogate1 = 0xd800 + (c >> 10);
	        var surrogate2 = 0xdc00 + (c & 0x3ff);
	        return String.fromCharCode(surrogate1, surrogate2);
	    }
	    return String.fromCharCode(c);
	}
	var UNESCAPE_MD_RE = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g;
	var ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
	var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');
	var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
	function replaceEntityPattern(match, name) {
	    if (name.charCodeAt(0) === 0x23 /* # */  && DIGITAL_ENTITY_TEST_RE.test(name)) {
	        var code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
	        if (isValidEntityCode(code)) {
	            return fromCodePoint(code);
	        }
	        return match;
	    }
	    var decoded = decodeHTML(match);
	    if (decoded !== match) {
	        return decoded;
	    }
	    return match;
	}
	/* function replaceEntities(str) {
	  if (str.indexOf('&') < 0) { return str; }

	  return str.replace(ENTITY_RE, replaceEntityPattern);
	} */ function unescapeMd(str) {
	    if (str.indexOf('\\') < 0) {
	        return str;
	    }
	    return str.replace(UNESCAPE_MD_RE, '$1');
	}
	function unescapeAll(str) {
	    if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) {
	        return str;
	    }
	    return str.replace(UNESCAPE_ALL_RE, function(match, escaped, entity) {
	        if (escaped) {
	            return escaped;
	        }
	        return replaceEntityPattern(match, entity);
	    });
	}
	var HTML_ESCAPE_TEST_RE = /[&<>"]/;
	var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
	var HTML_REPLACEMENTS = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;'
	};
	function replaceUnsafeChar(ch) {
	    return HTML_REPLACEMENTS[ch];
	}
	function escapeHtml(str) {
	    if (HTML_ESCAPE_TEST_RE.test(str)) {
	        return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
	    }
	    return str;
	}
	var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;
	function escapeRE$1(str) {
	    return str.replace(REGEXP_ESCAPE_RE, '\\$&');
	}
	function isSpace(code) {
	    switch(code){
	        case 0x09:
	        case 0x20:
	            return true;
	    }
	    return false;
	}
	// Zs (unicode class) || [\t\f\v\r\n]
	function isWhiteSpace(code) {
	    if (code >= 0x2000 && code <= 0x200A) {
	        return true;
	    }
	    switch(code){
	        case 0x09:
	        case 0x0A:
	        case 0x0B:
	        case 0x0C:
	        case 0x0D:
	        case 0x20:
	        case 0xA0:
	        case 0x1680:
	        case 0x202F:
	        case 0x205F:
	        case 0x3000:
	            return true;
	    }
	    return false;
	}
	/* eslint-disable max-len */ // Currently without astral characters support.
	function isPunctChar(ch) {
	    return P.test(ch) || regex.test(ch);
	}
	// Markdown ASCII punctuation characters.
	//
	// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
	// http://spec.commonmark.org/0.15/#ascii-punctuation-character
	//
	// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
	//
	function isMdAsciiPunct(ch) {
	    switch(ch){
	        case 0x21 /* ! */ :
	        case 0x22 /* " */ :
	        case 0x23 /* # */ :
	        case 0x24 /* $ */ :
	        case 0x25 /* % */ :
	        case 0x26 /* & */ :
	        case 0x27 /* ' */ :
	        case 0x28 /* ( */ :
	        case 0x29 /* ) */ :
	        case 0x2A /* * */ :
	        case 0x2B /* + */ :
	        case 0x2C /* , */ :
	        case 0x2D /* - */ :
	        case 0x2E /* . */ :
	        case 0x2F /* / */ :
	        case 0x3A /* : */ :
	        case 0x3B /* ; */ :
	        case 0x3C /* < */ :
	        case 0x3D /* = */ :
	        case 0x3E /* > */ :
	        case 0x3F /* ? */ :
	        case 0x40 /* @ */ :
	        case 0x5B /* [ */ :
	        case 0x5C /* \ */ :
	        case 0x5D /* ] */ :
	        case 0x5E /* ^ */ :
	        case 0x5F /* _ */ :
	        case 0x60 /* ` */ :
	        case 0x7B /* { */ :
	        case 0x7C /* | */ :
	        case 0x7D /* } */ :
	        case 0x7E /* ~ */ :
	            return true;
	        default:
	            return false;
	    }
	}
	// Hepler to unify [reference labels].
	//
	function normalizeReference(str) {
	    // Trim and collapse whitespace
	    //
	    str = str.trim().replace(/\s+/g, ' ');
	    // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
	    // fixed in v12 (couldn't find any details).
	    //
	    // So treat this one as a special case
	    // (remove this when node v10 is no longer supported).
	    //
	    if ('ẞ'.toLowerCase() === 'Ṿ') {
	        str = str.replace(/ẞ/g, 'ß');
	    }
	    // .toLowerCase().toUpperCase() should get rid of all differences
	    // between letter variants.
	    //
	    // Simple .toLowerCase() doesn't normalize 125 code points correctly,
	    // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
	    // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
	    // uppercased versions).
	    //
	    // Here's an example showing how it happens. Lets take greek letter omega:
	    // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
	    //
	    // Unicode entries:
	    // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
	    // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
	    // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
	    // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
	    //
	    // Case-insensitive comparison should treat all of them as equivalent.
	    //
	    // But .toLowerCase() doesn't change ϑ (it's already lowercase),
	    // and .toUpperCase() doesn't change ϴ (already uppercase).
	    //
	    // Applying first lower then upper case normalizes any character:
	    // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
	    //
	    // Note: this is equivalent to unicode case folding; unicode normalization
	    // is a different step that is not required here.
	    //
	    // Final result should be uppercased, because it's later stored in an object
	    // (this avoid a conflict with Object.prototype members,
	    // most notably, `__proto__`)
	    //
	    return str.toLowerCase().toUpperCase();
	}
	// Re-export libraries commonly used in both markdown-it and its plugins,
	// so plugins won't have to depend on them explicitly, which reduces their
	// bundled size (e.g. a browser build).
	//
	var lib = {
	    mdurl: mdurl,
	    ucmicro: ucmicro
	};

	var utils = /*#__PURE__*/Object.freeze({
		__proto__: null,
		arrayReplaceAt: arrayReplaceAt,
		assign: assign$1,
		escapeHtml: escapeHtml,
		escapeRE: escapeRE$1,
		fromCodePoint: fromCodePoint,
		has: has,
		isMdAsciiPunct: isMdAsciiPunct,
		isPunctChar: isPunctChar,
		isSpace: isSpace,
		isString: isString$1,
		isValidEntityCode: isValidEntityCode,
		isWhiteSpace: isWhiteSpace,
		lib: lib,
		normalizeReference: normalizeReference,
		unescapeAll: unescapeAll,
		unescapeMd: unescapeMd
	});

	// Parse link label
	//
	// this function assumes that first character ("[") already matches;
	// returns the end of the label
	//
	function parseLinkLabel(state, start, disableNested) {
	    var level, found, marker, prevPos;
	    var max = state.posMax;
	    var oldPos = state.pos;
	    state.pos = start + 1;
	    level = 1;
	    while(state.pos < max){
	        marker = state.src.charCodeAt(state.pos);
	        if (marker === 0x5D /* ] */ ) {
	            level--;
	            if (level === 0) {
	                found = true;
	                break;
	            }
	        }
	        prevPos = state.pos;
	        state.md.inline.skipToken(state);
	        if (marker === 0x5B /* [ */ ) {
	            if (prevPos === state.pos - 1) {
	                // increase level if we find text `[`, which is not a part of any token
	                level++;
	            } else if (disableNested) {
	                state.pos = oldPos;
	                return -1;
	            }
	        }
	    }
	    var labelEnd = -1;
	    if (found) {
	        labelEnd = state.pos;
	    }
	    // restore old state
	    state.pos = oldPos;
	    return labelEnd;
	}

	// Parse link destination
	//
	function parseLinkDestination(str, start, max) {
	    var code;
	    var pos = start;
	    var result = {
	        ok: false,
	        pos: 0,
	        str: ''
	    };
	    if (str.charCodeAt(pos) === 0x3C /* < */ ) {
	        pos++;
	        while(pos < max){
	            code = str.charCodeAt(pos);
	            if (code === 0x0A /* \n */ ) {
	                return result;
	            }
	            if (code === 0x3C /* < */ ) {
	                return result;
	            }
	            if (code === 0x3E /* > */ ) {
	                result.pos = pos + 1;
	                result.str = unescapeAll(str.slice(start + 1, pos));
	                result.ok = true;
	                return result;
	            }
	            if (code === 0x5C /* \ */  && pos + 1 < max) {
	                pos += 2;
	                continue;
	            }
	            pos++;
	        }
	        // no closing '>'
	        return result;
	    }
	    // this should be ... } else { ... branch
	    var level = 0;
	    while(pos < max){
	        code = str.charCodeAt(pos);
	        if (code === 0x20) {
	            break;
	        }
	        // ascii control characters
	        if (code < 0x20 || code === 0x7F) {
	            break;
	        }
	        if (code === 0x5C /* \ */  && pos + 1 < max) {
	            if (str.charCodeAt(pos + 1) === 0x20) {
	                break;
	            }
	            pos += 2;
	            continue;
	        }
	        if (code === 0x28 /* ( */ ) {
	            level++;
	            if (level > 32) {
	                return result;
	            }
	        }
	        if (code === 0x29 /* ) */ ) {
	            if (level === 0) {
	                break;
	            }
	            level--;
	        }
	        pos++;
	    }
	    if (start === pos) {
	        return result;
	    }
	    if (level !== 0) {
	        return result;
	    }
	    result.str = unescapeAll(str.slice(start, pos));
	    result.pos = pos;
	    result.ok = true;
	    return result;
	}

	// Parse link title
	//
	// Parse link title within `str` in [start, max] range,
	// or continue previous parsing if `prev_state` is defined (equal to result of last execution).
	//
	function parseLinkTitle(str, start, max, prev_state) {
	    var code;
	    var pos = start;
	    var state = {
	        // if `true`, this is a valid link title
	        ok: false,
	        // if `true`, this link can be continued on the next line
	        can_continue: false,
	        // if `ok`, it's the position of the first character after the closing marker
	        pos: 0,
	        // if `ok`, it's the unescaped title
	        str: '',
	        // expected closing marker character code
	        marker: 0
	    };
	    if (prev_state) {
	        // this is a continuation of a previous parseLinkTitle call on the next line,
	        // used in reference links only
	        state.str = prev_state.str;
	        state.marker = prev_state.marker;
	    } else {
	        if (pos >= max) {
	            return state;
	        }
	        var marker = str.charCodeAt(pos);
	        if (marker !== 0x22 /* " */  && marker !== 0x27 /* ' */  && marker !== 0x28 /* ( */ ) {
	            return state;
	        }
	        start++;
	        pos++;
	        // if opening marker is "(", switch it to closing marker ")"
	        if (marker === 0x28) {
	            marker = 0x29;
	        }
	        state.marker = marker;
	    }
	    while(pos < max){
	        code = str.charCodeAt(pos);
	        if (code === state.marker) {
	            state.pos = pos + 1;
	            state.str += unescapeAll(str.slice(start, pos));
	            state.ok = true;
	            return state;
	        } else if (code === 0x28 /* ( */  && state.marker === 0x29 /* ) */ ) {
	            return state;
	        } else if (code === 0x5C /* \ */  && pos + 1 < max) {
	            pos++;
	        }
	        pos++;
	    }
	    // no closing marker found, but this link title may continue on the next line (for references)
	    state.can_continue = true;
	    state.str += unescapeAll(str.slice(start, pos));
	    return state;
	}

	// Just a shortcut for bulk export

	var helpers = /*#__PURE__*/Object.freeze({
		__proto__: null,
		parseLinkDestination: parseLinkDestination,
		parseLinkLabel: parseLinkLabel,
		parseLinkTitle: parseLinkTitle
	});

	var default_rules = {};
	default_rules.code_inline = function(tokens, idx, options, env, slf) {
	    var token = tokens[idx];
	    return '<code' + slf.renderAttrs(token) + '>' + escapeHtml(token.content) + '</code>';
	};
	default_rules.code_block = function(tokens, idx, options, env, slf) {
	    var token = tokens[idx];
	    return '<pre' + slf.renderAttrs(token) + '><code>' + escapeHtml(tokens[idx].content) + '</code></pre>\n';
	};
	default_rules.fence = function(tokens, idx, options, env, slf) {
	    var token = tokens[idx];
	    var info = token.info ? unescapeAll(token.info).trim() : '';
	    var langName = '';
	    var langAttrs = '';
	    if (info) {
	        var arr = info.split(/(\s+)/g);
	        langName = arr[0];
	        langAttrs = arr.slice(2).join('');
	    }
	    var highlighted;
	    if (options.highlight) {
	        highlighted = options.highlight(token.content, langName, langAttrs) || escapeHtml(token.content);
	    } else {
	        highlighted = escapeHtml(token.content);
	    }
	    if (highlighted.indexOf('<pre') === 0) {
	        return highlighted + '\n';
	    }
	    // If language exists, inject class gently, without modifying original token.
	    // May be, one day we will add .deepClone() for token and simplify this part, but
	    // now we prefer to keep things local.
	    if (info) {
	        var i = token.attrIndex('class');
	        var tmpAttrs = token.attrs ? token.attrs.slice() : [];
	        if (i < 0) {
	            tmpAttrs.push([
	                'class',
	                options.langPrefix + langName
	            ]);
	        } else {
	            tmpAttrs[i] = tmpAttrs[i].slice();
	            tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
	        }
	        // Fake token just to render attributes
	        var tmpToken = {
	            attrs: tmpAttrs
	        };
	        return "<pre><code" + slf.renderAttrs(tmpToken) + ">" + highlighted + "</code></pre>\n";
	    }
	    return "<pre><code" + slf.renderAttrs(token) + ">" + highlighted + "</code></pre>\n";
	};
	default_rules.image = function(tokens, idx, options, env, slf) {
	    var token = tokens[idx];
	    // "alt" attr MUST be set, even if empty. Because it's mandatory and
	    // should be placed on proper position for tests.
	    //
	    // Replace content with actual value
	    token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
	    return slf.renderToken(tokens, idx, options);
	};
	default_rules.hardbreak = function(tokens, idx, options /*, env */ ) {
	    return options.xhtmlOut ? '<br />\n' : '<br>\n';
	};
	default_rules.softbreak = function(tokens, idx, options /*, env */ ) {
	    return options.breaks ? options.xhtmlOut ? '<br />\n' : '<br>\n' : '\n';
	};
	default_rules.text = function(tokens, idx /*, options, env */ ) {
	    return escapeHtml(tokens[idx].content);
	};
	default_rules.html_block = function(tokens, idx /*, options, env */ ) {
	    return tokens[idx].content;
	};
	default_rules.html_inline = function(tokens, idx /*, options, env */ ) {
	    return tokens[idx].content;
	};
	/**
	 * new Renderer()
	 *
	 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
	 **/ function Renderer() {
	    /**
	   * Renderer#rules -> Object
	   *
	   * Contains render rules for tokens. Can be updated and extended.
	   *
	   * ##### Example
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   *
	   * md.renderer.rules.strong_open  = function () { return '<b>'; };
	   * md.renderer.rules.strong_close = function () { return '</b>'; };
	   *
	   * var result = md.renderInline(...);
	   * ```
	   *
	   * Each rule is called as independent static function with fixed signature:
	   *
	   * ```javascript
	   * function my_token_render(tokens, idx, options, env, renderer) {
	   *   // ...
	   *   return renderedHTML;
	   * }
	   * ```
	   *
	   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs)
	   * for more details and examples.
	   **/ this.rules = assign$1({}, default_rules);
	}
	/**
	 * Renderer.renderAttrs(token) -> String
	 *
	 * Render token attributes to string.
	 **/ Renderer.prototype.renderAttrs = function renderAttrs(token) {
	    var i, l, result;
	    if (!token.attrs) {
	        return '';
	    }
	    result = '';
	    for(i = 0, l = token.attrs.length; i < l; i++){
	        result += ' ' + escapeHtml(token.attrs[i][0]) + '="' + escapeHtml(token.attrs[i][1]) + '"';
	    }
	    return result;
	};
	/**
	 * Renderer.renderToken(tokens, idx, options) -> String
	 * - tokens (Array): list of tokens
	 * - idx (Numbed): token index to render
	 * - options (Object): params of parser instance
	 *
	 * Default token renderer. Can be overriden by custom function
	 * in [[Renderer#rules]].
	 **/ Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
	    var token = tokens[idx];
	    var result = '';
	    // Tight list paragraphs
	    if (token.hidden) {
	        return '';
	    }
	    // Insert a newline between hidden paragraph and subsequent opening
	    // block-level tag.
	    //
	    // For example, here we should insert a newline before blockquote:
	    //  - a
	    //    >
	    //
	    if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
	        result += '\n';
	    }
	    // Add token name, e.g. `<img`
	    result += (token.nesting === -1 ? '</' : '<') + token.tag;
	    // Encode attributes, e.g. `<img src="foo"`
	    result += this.renderAttrs(token);
	    // Add a slash for self-closing tags, e.g. `<img src="foo" /`
	    if (token.nesting === 0 && options.xhtmlOut) {
	        result += ' /';
	    }
	    // Check if we need to add a newline after this tag
	    var needLf = false;
	    if (token.block) {
	        needLf = true;
	        if (token.nesting === 1) {
	            if (idx + 1 < tokens.length) {
	                var nextToken = tokens[idx + 1];
	                if (nextToken.type === 'inline' || nextToken.hidden) {
	                    // Block-level tag containing an inline tag.
	                    //
	                    needLf = false;
	                } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
	                    // Opening tag + closing tag of the same type. E.g. `<li></li>`.
	                    //
	                    needLf = false;
	                }
	            }
	        }
	    }
	    result += needLf ? '>\n' : '>';
	    return result;
	};
	/**
	 * Renderer.renderInline(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to render
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * The same as [[Renderer.render]], but for single token of `inline` type.
	 **/ Renderer.prototype.renderInline = function(tokens, options, env) {
	    var result = '';
	    var rules = this.rules;
	    for(var i = 0, len = tokens.length; i < len; i++){
	        var type = tokens[i].type;
	        if (typeof rules[type] !== 'undefined') {
	            result += rules[type](tokens, i, options, env, this);
	        } else {
	            result += this.renderToken(tokens, i, options);
	        }
	    }
	    return result;
	};
	/** internal
	 * Renderer.renderInlineAsText(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to render
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * Special kludge for image `alt` attributes to conform CommonMark spec.
	 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
	 * instead of simple escaping.
	 **/ Renderer.prototype.renderInlineAsText = function(tokens, options, env) {
	    var result = '';
	    for(var i = 0, len = tokens.length; i < len; i++){
	        switch(tokens[i].type){
	            case 'text':
	                result += tokens[i].content;
	                break;
	            case 'image':
	                result += this.renderInlineAsText(tokens[i].children, options, env);
	                break;
	            case 'html_inline':
	            case 'html_block':
	                result += tokens[i].content;
	                break;
	            case 'softbreak':
	            case 'hardbreak':
	                result += '\n';
	                break;
	        }
	    }
	    return result;
	};
	/**
	 * Renderer.render(tokens, options, env) -> String
	 * - tokens (Array): list on block tokens to render
	 * - options (Object): params of parser instance
	 * - env (Object): additional data from parsed input (references, for example)
	 *
	 * Takes token stream and generates HTML. Probably, you will never need to call
	 * this method directly.
	 **/ Renderer.prototype.render = function(tokens, options, env) {
	    var result = '';
	    var rules = this.rules;
	    for(var i = 0, len = tokens.length; i < len; i++){
	        var type = tokens[i].type;
	        if (type === 'inline') {
	            result += this.renderInline(tokens[i].children, options, env);
	        } else if (typeof rules[type] !== 'undefined') {
	            result += rules[type](tokens, i, options, env, this);
	        } else {
	            result += this.renderToken(tokens, i, options, env);
	        }
	    }
	    return result;
	};

	/**
	 * class Ruler
	 *
	 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
	 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
	 *
	 * - keep rules in defined order
	 * - assign the name to each rule
	 * - enable/disable rules
	 * - add/replace rules
	 * - allow assign rules to additional named chains (in the same)
	 * - cacheing lists of active rules
	 *
	 * You will not need use this class directly until write plugins. For simple
	 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
	 * [[MarkdownIt.use]].
	 **/ /**
	 * new Ruler()
	 **/ function Ruler() {
	    // List of added rules. Each element is:
	    //
	    // {
	    //   name: XXX,
	    //   enabled: Boolean,
	    //   fn: Function(),
	    //   alt: [ name2, name3 ]
	    // }
	    //
	    this.__rules__ = [];
	    // Cached rule chains.
	    //
	    // First level - chain name, '' for default.
	    // Second level - diginal anchor for fast filtering by charcodes.
	    //
	    this.__cache__ = null;
	}
	// Helper methods, should not be used directly
	// Find rule index by name
	//
	Ruler.prototype.__find__ = function(name) {
	    for(var i = 0; i < this.__rules__.length; i++){
	        if (this.__rules__[i].name === name) {
	            return i;
	        }
	    }
	    return -1;
	};
	// Build rules lookup cache
	//
	Ruler.prototype.__compile__ = function() {
	    var self = this;
	    var chains = [
	        ''
	    ];
	    // collect unique names
	    self.__rules__.forEach(function(rule) {
	        if (!rule.enabled) {
	            return;
	        }
	        rule.alt.forEach(function(altName) {
	            if (chains.indexOf(altName) < 0) {
	                chains.push(altName);
	            }
	        });
	    });
	    self.__cache__ = {};
	    chains.forEach(function(chain) {
	        self.__cache__[chain] = [];
	        self.__rules__.forEach(function(rule) {
	            if (!rule.enabled) {
	                return;
	            }
	            if (chain && rule.alt.indexOf(chain) < 0) {
	                return;
	            }
	            self.__cache__[chain].push(rule.fn);
	        });
	    });
	};
	/**
	 * Ruler.at(name, fn [, options])
	 * - name (String): rule name to replace.
	 * - fn (Function): new rule function.
	 * - options (Object): new rule options (not mandatory).
	 *
	 * Replace rule by name with new function & options. Throws error if name not
	 * found.
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * Replace existing typographer replacement rule with new one:
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.core.ruler.at('replacements', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/ Ruler.prototype.at = function(name, fn, options) {
	    var index = this.__find__(name);
	    var opt = options || {};
	    if (index === -1) {
	        throw new Error('Parser rule not found: ' + name);
	    }
	    this.__rules__[index].fn = fn;
	    this.__rules__[index].alt = opt.alt || [];
	    this.__cache__ = null;
	};
	/**
	 * Ruler.before(beforeName, ruleName, fn [, options])
	 * - beforeName (String): new rule will be added before this one.
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Add new rule to chain before one with given name. See also
	 * [[Ruler.after]], [[Ruler.push]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/ Ruler.prototype.before = function(beforeName, ruleName, fn, options) {
	    var index = this.__find__(beforeName);
	    var opt = options || {};
	    if (index === -1) {
	        throw new Error('Parser rule not found: ' + beforeName);
	    }
	    this.__rules__.splice(index, 0, {
	        name: ruleName,
	        enabled: true,
	        fn: fn,
	        alt: opt.alt || []
	    });
	    this.__cache__ = null;
	};
	/**
	 * Ruler.after(afterName, ruleName, fn [, options])
	 * - afterName (String): new rule will be added after this one.
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Add new rule to chain after one with given name. See also
	 * [[Ruler.before]], [[Ruler.push]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/ Ruler.prototype.after = function(afterName, ruleName, fn, options) {
	    var index = this.__find__(afterName);
	    var opt = options || {};
	    if (index === -1) {
	        throw new Error('Parser rule not found: ' + afterName);
	    }
	    this.__rules__.splice(index + 1, 0, {
	        name: ruleName,
	        enabled: true,
	        fn: fn,
	        alt: opt.alt || []
	    });
	    this.__cache__ = null;
	};
	/**
	 * Ruler.push(ruleName, fn [, options])
	 * - ruleName (String): name of added rule.
	 * - fn (Function): rule function.
	 * - options (Object): rule options (not mandatory).
	 *
	 * Push new rule to the end of chain. See also
	 * [[Ruler.before]], [[Ruler.after]].
	 *
	 * ##### Options:
	 *
	 * - __alt__ - array with names of "alternate" chains.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 *
	 * md.core.ruler.push('my_rule', function replace(state) {
	 *   //...
	 * });
	 * ```
	 **/ Ruler.prototype.push = function(ruleName, fn, options) {
	    var opt = options || {};
	    this.__rules__.push({
	        name: ruleName,
	        enabled: true,
	        fn: fn,
	        alt: opt.alt || []
	    });
	    this.__cache__ = null;
	};
	/**
	 * Ruler.enable(list [, ignoreInvalid]) -> Array
	 * - list (String|Array): list of rule names to enable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable rules with given names. If any rule name not found - throw Error.
	 * Errors can be disabled by second param.
	 *
	 * Returns list of found rule names (if no exception happened).
	 *
	 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
	 **/ Ruler.prototype.enable = function(list, ignoreInvalid) {
	    if (!Array.isArray(list)) {
	        list = [
	            list
	        ];
	    }
	    var result = [];
	    // Search by name and enable
	    list.forEach(function(name) {
	        var idx = this.__find__(name);
	        if (idx < 0) {
	            if (ignoreInvalid) {
	                return;
	            }
	            throw new Error('Rules manager: invalid rule name ' + name);
	        }
	        this.__rules__[idx].enabled = true;
	        result.push(name);
	    }, this);
	    this.__cache__ = null;
	    return result;
	};
	/**
	 * Ruler.enableOnly(list [, ignoreInvalid])
	 * - list (String|Array): list of rule names to enable (whitelist).
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable rules with given names, and disable everything else. If any rule name
	 * not found - throw Error. Errors can be disabled by second param.
	 *
	 * See also [[Ruler.disable]], [[Ruler.enable]].
	 **/ Ruler.prototype.enableOnly = function(list, ignoreInvalid) {
	    if (!Array.isArray(list)) {
	        list = [
	            list
	        ];
	    }
	    this.__rules__.forEach(function(rule) {
	        rule.enabled = false;
	    });
	    this.enable(list, ignoreInvalid);
	};
	/**
	 * Ruler.disable(list [, ignoreInvalid]) -> Array
	 * - list (String|Array): list of rule names to disable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Disable rules with given names. If any rule name not found - throw Error.
	 * Errors can be disabled by second param.
	 *
	 * Returns list of found rule names (if no exception happened).
	 *
	 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
	 **/ Ruler.prototype.disable = function(list, ignoreInvalid) {
	    if (!Array.isArray(list)) {
	        list = [
	            list
	        ];
	    }
	    var result = [];
	    // Search by name and disable
	    list.forEach(function(name) {
	        var idx = this.__find__(name);
	        if (idx < 0) {
	            if (ignoreInvalid) {
	                return;
	            }
	            throw new Error('Rules manager: invalid rule name ' + name);
	        }
	        this.__rules__[idx].enabled = false;
	        result.push(name);
	    }, this);
	    this.__cache__ = null;
	    return result;
	};
	/**
	 * Ruler.getRules(chainName) -> Array
	 *
	 * Return array of active functions (rules) for given chain name. It analyzes
	 * rules configuration, compiles caches if not exists and returns result.
	 *
	 * Default chain name is `''` (empty string). It can't be skipped. That's
	 * done intentionally, to keep signature monomorphic for high speed.
	 **/ Ruler.prototype.getRules = function(chainName) {
	    if (this.__cache__ === null) {
	        this.__compile__();
	    }
	    // Chain can be empty, if rules disabled. But we still have to return Array.
	    return this.__cache__[chainName] || [];
	};

	// Token class
	/**
	 * class Token
	 **/ /**
	 * new Token(type, tag, nesting)
	 *
	 * Create new token and fill passed properties.
	 **/ function Token(type, tag, nesting) {
	    /**
	   * Token#type -> String
	   *
	   * Type of the token (string, e.g. "paragraph_open")
	   **/ this.type = type;
	    /**
	   * Token#tag -> String
	   *
	   * html tag name, e.g. "p"
	   **/ this.tag = tag;
	    /**
	   * Token#attrs -> Array
	   *
	   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
	   **/ this.attrs = null;
	    /**
	   * Token#map -> Array
	   *
	   * Source map info. Format: `[ line_begin, line_end ]`
	   **/ this.map = null;
	    /**
	   * Token#nesting -> Number
	   *
	   * Level change (number in {-1, 0, 1} set), where:
	   *
	   * -  `1` means the tag is opening
	   * -  `0` means the tag is self-closing
	   * - `-1` means the tag is closing
	   **/ this.nesting = nesting;
	    /**
	   * Token#level -> Number
	   *
	   * nesting level, the same as `state.level`
	   **/ this.level = 0;
	    /**
	   * Token#children -> Array
	   *
	   * An array of child nodes (inline and img tokens)
	   **/ this.children = null;
	    /**
	   * Token#content -> String
	   *
	   * In a case of self-closing tag (code, html, fence, etc.),
	   * it has contents of this tag.
	   **/ this.content = '';
	    /**
	   * Token#markup -> String
	   *
	   * '*' or '_' for emphasis, fence string for fence, etc.
	   **/ this.markup = '';
	    /**
	   * Token#info -> String
	   *
	   * Additional information:
	   *
	   * - Info string for "fence" tokens
	   * - The value "auto" for autolink "link_open" and "link_close" tokens
	   * - The string value of the item marker for ordered-list "list_item_open" tokens
	   **/ this.info = '';
	    /**
	   * Token#meta -> Object
	   *
	   * A place for plugins to store an arbitrary data
	   **/ this.meta = null;
	    /**
	   * Token#block -> Boolean
	   *
	   * True for block-level tokens, false for inline tokens.
	   * Used in renderer to calculate line breaks
	   **/ this.block = false;
	    /**
	   * Token#hidden -> Boolean
	   *
	   * If it's true, ignore this element when rendering. Used for tight lists
	   * to hide paragraphs.
	   **/ this.hidden = false;
	}
	/**
	 * Token.attrIndex(name) -> Number
	 *
	 * Search attribute index by name.
	 **/ Token.prototype.attrIndex = function attrIndex(name) {
	    if (!this.attrs) {
	        return -1;
	    }
	    var attrs = this.attrs;
	    for(var i = 0, len = attrs.length; i < len; i++){
	        if (attrs[i][0] === name) {
	            return i;
	        }
	    }
	    return -1;
	};
	/**
	 * Token.attrPush(attrData)
	 *
	 * Add `[ name, value ]` attribute to list. Init attrs if necessary
	 **/ Token.prototype.attrPush = function attrPush(attrData) {
	    if (this.attrs) {
	        this.attrs.push(attrData);
	    } else {
	        this.attrs = [
	            attrData
	        ];
	    }
	};
	/**
	 * Token.attrSet(name, value)
	 *
	 * Set `name` attribute to `value`. Override old value if exists.
	 **/ Token.prototype.attrSet = function attrSet(name, value) {
	    var idx = this.attrIndex(name);
	    var attrData = [
	        name,
	        value
	    ];
	    if (idx < 0) {
	        this.attrPush(attrData);
	    } else {
	        this.attrs[idx] = attrData;
	    }
	};
	/**
	 * Token.attrGet(name)
	 *
	 * Get the value of attribute `name`, or null if it does not exist.
	 **/ Token.prototype.attrGet = function attrGet(name) {
	    var idx = this.attrIndex(name);
	    var value = null;
	    if (idx >= 0) {
	        value = this.attrs[idx][1];
	    }
	    return value;
	};
	/**
	 * Token.attrJoin(name, value)
	 *
	 * Join value to existing attribute via space. Or create new attribute if not
	 * exists. Useful to operate with token classes.
	 **/ Token.prototype.attrJoin = function attrJoin(name, value) {
	    var idx = this.attrIndex(name);
	    if (idx < 0) {
	        this.attrPush([
	            name,
	            value
	        ]);
	    } else {
	        this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
	    }
	};

	// Core state object
	//
	function StateCore(src, md, env) {
	    this.src = src;
	    this.env = env;
	    this.tokens = [];
	    this.inlineMode = false;
	    this.md = md // link to parser instance
	    ;
	}
	// re-export Token class to use in core rules
	StateCore.prototype.Token = Token;

	// Normalize input string
	// https://spec.commonmark.org/0.29/#line-ending
	var NEWLINES_RE = /\r\n?|\n/g;
	var NULL_RE = /\0/g;
	function normalize(state) {
	    var str;
	    // Normalize newlines
	    str = state.src.replace(NEWLINES_RE, '\n');
	    // Replace NULL characters
	    str = str.replace(NULL_RE, '\uFFFD');
	    state.src = str;
	}

	function block(state) {
	    var token;
	    if (state.inlineMode) {
	        token = new state.Token('inline', '', 0);
	        token.content = state.src;
	        token.map = [
	            0,
	            1
	        ];
	        token.children = [];
	        state.tokens.push(token);
	    } else {
	        state.md.block.parse(state.src, state.md, state.env, state.tokens);
	    }
	}

	function inline(state) {
	    var tokens = state.tokens;
	    // Parse inlines
	    for(var i = 0, l = tokens.length; i < l; i++){
	        var tok = tokens[i];
	        if (tok.type === 'inline') {
	            state.md.inline.parse(tok.content, state.md, state.env, tok.children);
	        }
	    }
	}

	// Replace link-like texts with link nodes.
	//
	// Currently restricted by `md.validateLink()` to http/https/ftp
	//
	function isLinkOpen$1(str) {
	    return /^<a[>\s]/i.test(str);
	}
	function isLinkClose$1(str) {
	    return /^<\/a\s*>/i.test(str);
	}
	function linkify$1(state) {
	    var blockTokens = state.tokens;
	    if (!state.md.options.linkify) {
	        return;
	    }
	    for(var j = 0, l = blockTokens.length; j < l; j++){
	        if (blockTokens[j].type !== 'inline' || !state.md.linkify.pretest(blockTokens[j].content)) {
	            continue;
	        }
	        var tokens = blockTokens[j].children;
	        var htmlLinkLevel = 0;
	        // We scan from the end, to keep position when new tags added.
	        // Use reversed logic in links start/end match
	        for(var i = tokens.length - 1; i >= 0; i--){
	            var currentToken = tokens[i];
	            // Skip content of markdown links
	            if (currentToken.type === 'link_close') {
	                i--;
	                while(tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open'){
	                    i--;
	                }
	                continue;
	            }
	            // Skip content of html tag links
	            if (currentToken.type === 'html_inline') {
	                if (isLinkOpen$1(currentToken.content) && htmlLinkLevel > 0) {
	                    htmlLinkLevel--;
	                }
	                if (isLinkClose$1(currentToken.content)) {
	                    htmlLinkLevel++;
	                }
	            }
	            if (htmlLinkLevel > 0) {
	                continue;
	            }
	            if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {
	                var text = currentToken.content;
	                var links = state.md.linkify.match(text);
	                // Now split string to nodes
	                var nodes = [];
	                var level = currentToken.level;
	                var lastPos = 0;
	                // forbid escape sequence at the start of the string,
	                // this avoids http\://example.com/ from being linkified as
	                // http:<a href="//example.com/">//example.com/</a>
	                if (links.length > 0 && links[0].index === 0 && i > 0 && tokens[i - 1].type === 'text_special') {
	                    links = links.slice(1);
	                }
	                for(var ln = 0; ln < links.length; ln++){
	                    var url = links[ln].url;
	                    var fullUrl = state.md.normalizeLink(url);
	                    if (!state.md.validateLink(fullUrl)) {
	                        continue;
	                    }
	                    var urlText = links[ln].text;
	                    // Linkifier might send raw hostnames like "example.com", where url
	                    // starts with domain name. So we prepend http:// in those cases,
	                    // and remove it afterwards.
	                    //
	                    if (!links[ln].schema) {
	                        urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
	                    } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
	                        urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
	                    } else {
	                        urlText = state.md.normalizeLinkText(urlText);
	                    }
	                    var pos = links[ln].index;
	                    if (pos > lastPos) {
	                        var token = new state.Token('text', '', 0);
	                        token.content = text.slice(lastPos, pos);
	                        token.level = level;
	                        nodes.push(token);
	                    }
	                    var token_o = new state.Token('link_open', 'a', 1);
	                    token_o.attrs = [
	                        [
	                            'href',
	                            fullUrl
	                        ]
	                    ];
	                    token_o.level = level++;
	                    token_o.markup = 'linkify';
	                    token_o.info = 'auto';
	                    nodes.push(token_o);
	                    var token_t = new state.Token('text', '', 0);
	                    token_t.content = urlText;
	                    token_t.level = level;
	                    nodes.push(token_t);
	                    var token_c = new state.Token('link_close', 'a', -1);
	                    token_c.level = --level;
	                    token_c.markup = 'linkify';
	                    token_c.info = 'auto';
	                    nodes.push(token_c);
	                    lastPos = links[ln].lastIndex;
	                }
	                if (lastPos < text.length) {
	                    var token1 = new state.Token('text', '', 0);
	                    token1.content = text.slice(lastPos);
	                    token1.level = level;
	                    nodes.push(token1);
	                }
	                // replace current node
	                blockTokens[j].children = tokens = arrayReplaceAt(tokens, i, nodes);
	            }
	        }
	    }
	}

	// Simple typographic replacements
	//
	// (c) (C) → ©
	// (tm) (TM) → ™
	// (r) (R) → ®
	// +- → ±
	// ... → … (also ?.... → ?.., !.... → !..)
	// ???????? → ???, !!!!! → !!!, `,,` → `,`
	// -- → &ndash;, --- → &mdash;
	//
	// TODO:
	// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
	// - multiplications 2 x 4 -> 2 × 4
	var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;
	// Workaround for phantomjs - need regex without /g flag,
	// or root check will fail every second time
	var SCOPED_ABBR_TEST_RE = /\((c|tm|r)\)/i;
	var SCOPED_ABBR_RE = /\((c|tm|r)\)/ig;
	var SCOPED_ABBR = {
	    c: '©',
	    r: '®',
	    tm: '™'
	};
	function replaceFn(match, name) {
	    return SCOPED_ABBR[name.toLowerCase()];
	}
	function replace_scoped(inlineTokens) {
	    var inside_autolink = 0;
	    for(var i = inlineTokens.length - 1; i >= 0; i--){
	        var token = inlineTokens[i];
	        if (token.type === 'text' && !inside_autolink) {
	            token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
	        }
	        if (token.type === 'link_open' && token.info === 'auto') {
	            inside_autolink--;
	        }
	        if (token.type === 'link_close' && token.info === 'auto') {
	            inside_autolink++;
	        }
	    }
	}
	function replace_rare(inlineTokens) {
	    var inside_autolink = 0;
	    for(var i = inlineTokens.length - 1; i >= 0; i--){
	        var token = inlineTokens[i];
	        if (token.type === 'text' && !inside_autolink) {
	            if (RARE_RE.test(token.content)) {
	                token.content = token.content.replace(/\+-/g, '±')// .., ..., ....... -> …
	                // but ?..... & !..... -> ?.. & !..
	                .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..').replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')// em-dash
	                .replace(/(^|[^-])---(?=[^-]|$)/mg, '$1\u2014')// en-dash
	                .replace(/(^|\s)--(?=\s|$)/mg, '$1\u2013').replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, '$1\u2013');
	            }
	        }
	        if (token.type === 'link_open' && token.info === 'auto') {
	            inside_autolink--;
	        }
	        if (token.type === 'link_close' && token.info === 'auto') {
	            inside_autolink++;
	        }
	    }
	}
	function replace(state) {
	    var blkIdx;
	    if (!state.md.options.typographer) {
	        return;
	    }
	    for(blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--){
	        if (state.tokens[blkIdx].type !== 'inline') {
	            continue;
	        }
	        if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
	            replace_scoped(state.tokens[blkIdx].children);
	        }
	        if (RARE_RE.test(state.tokens[blkIdx].content)) {
	            replace_rare(state.tokens[blkIdx].children);
	        }
	    }
	}

	// Convert straight quotation marks to typographic ones
	//
	var QUOTE_TEST_RE = /['"]/;
	var QUOTE_RE = /['"]/g;
	var APOSTROPHE = '\u2019' /* ’ */ ;
	function replaceAt(str, index, ch) {
	    return str.slice(0, index) + ch + str.slice(index + 1);
	}
	function process_inlines(tokens, state) {
	    var j;
	    var stack = [];
	    for(var i = 0; i < tokens.length; i++){
	        var token = tokens[i];
	        var thisLevel = tokens[i].level;
	        for(j = stack.length - 1; j >= 0; j--){
	            if (stack[j].level <= thisLevel) {
	                break;
	            }
	        }
	        stack.length = j + 1;
	        if (token.type !== 'text') {
	            continue;
	        }
	        var text = token.content;
	        var pos = 0;
	        var max = text.length;
	        /* eslint no-labels:0,block-scoped-var:0 */ OUTER: while(pos < max){
	            QUOTE_RE.lastIndex = pos;
	            var t = QUOTE_RE.exec(text);
	            if (!t) {
	                break;
	            }
	            var canOpen = true;
	            var canClose = true;
	            pos = t.index + 1;
	            var isSingle = t[0] === "'";
	            // Find previous character,
	            // default to space if it's the beginning of the line
	            //
	            var lastChar = 0x20;
	            if (t.index - 1 >= 0) {
	                lastChar = text.charCodeAt(t.index - 1);
	            } else {
	                for(j = i - 1; j >= 0; j--){
	                    if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
	                    if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'
	                    lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
	                    break;
	                }
	            }
	            // Find next character,
	            // default to space if it's the end of the line
	            //
	            var nextChar = 0x20;
	            if (pos < max) {
	                nextChar = text.charCodeAt(pos);
	            } else {
	                for(j = i + 1; j < tokens.length; j++){
	                    if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
	                    if (!tokens[j].content) continue; // should skip all tokens except 'text', 'html_inline' or 'code_inline'
	                    nextChar = tokens[j].content.charCodeAt(0);
	                    break;
	                }
	            }
	            var isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
	            var isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
	            var isLastWhiteSpace = isWhiteSpace(lastChar);
	            var isNextWhiteSpace = isWhiteSpace(nextChar);
	            if (isNextWhiteSpace) {
	                canOpen = false;
	            } else if (isNextPunctChar) {
	                if (!(isLastWhiteSpace || isLastPunctChar)) {
	                    canOpen = false;
	                }
	            }
	            if (isLastWhiteSpace) {
	                canClose = false;
	            } else if (isLastPunctChar) {
	                if (!(isNextWhiteSpace || isNextPunctChar)) {
	                    canClose = false;
	                }
	            }
	            if (nextChar === 0x22 /* " */  && t[0] === '"') {
	                if (lastChar >= 0x30 /* 0 */  && lastChar <= 0x39 /* 9 */ ) {
	                    // special case: 1"" - count first quote as an inch
	                    canClose = canOpen = false;
	                }
	            }
	            if (canOpen && canClose) {
	                // Replace quotes in the middle of punctuation sequence, but not
	                // in the middle of the words, i.e.:
	                //
	                // 1. foo " bar " baz - not replaced
	                // 2. foo-"-bar-"-baz - replaced
	                // 3. foo"bar"baz     - not replaced
	                //
	                canOpen = isLastPunctChar;
	                canClose = isNextPunctChar;
	            }
	            if (!canOpen && !canClose) {
	                // middle of word
	                if (isSingle) {
	                    token.content = replaceAt(token.content, t.index, APOSTROPHE);
	                }
	                continue;
	            }
	            if (canClose) {
	                // this could be a closing quote, rewind the stack to get a match
	                for(j = stack.length - 1; j >= 0; j--){
	                    var item = stack[j];
	                    if (stack[j].level < thisLevel) {
	                        break;
	                    }
	                    if (item.single === isSingle && stack[j].level === thisLevel) {
	                        item = stack[j];
	                        var openQuote = void 0;
	                        var closeQuote = void 0;
	                        if (isSingle) {
	                            openQuote = state.md.options.quotes[2];
	                            closeQuote = state.md.options.quotes[3];
	                        } else {
	                            openQuote = state.md.options.quotes[0];
	                            closeQuote = state.md.options.quotes[1];
	                        }
	                        // replace token.content *before* tokens[item.token].content,
	                        // because, if they are pointing at the same token, replaceAt
	                        // could mess up indices when quote length != 1
	                        token.content = replaceAt(token.content, t.index, closeQuote);
	                        tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, openQuote);
	                        pos += closeQuote.length - 1;
	                        if (item.token === i) {
	                            pos += openQuote.length - 1;
	                        }
	                        text = token.content;
	                        max = text.length;
	                        stack.length = j;
	                        continue OUTER;
	                    }
	                }
	            }
	            if (canOpen) {
	                stack.push({
	                    token: i,
	                    pos: t.index,
	                    single: isSingle,
	                    level: thisLevel
	                });
	            } else if (canClose && isSingle) {
	                token.content = replaceAt(token.content, t.index, APOSTROPHE);
	            }
	        }
	    }
	}
	function smartquotes(state) {
	    /* eslint max-depth:0 */ if (!state.md.options.typographer) {
	        return;
	    }
	    for(var blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--){
	        if (state.tokens[blkIdx].type !== 'inline' || !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
	            continue;
	        }
	        process_inlines(state.tokens[blkIdx].children, state);
	    }
	}

	// Join raw text tokens with the rest of the text
	//
	// This is set as a separate rule to provide an opportunity for plugins
	// to run text replacements after text join, but before escape join.
	//
	// For example, `\:)` shouldn't be replaced with an emoji.
	//
	function text_join(state) {
	    var curr, last;
	    var blockTokens = state.tokens;
	    var l = blockTokens.length;
	    for(var j = 0; j < l; j++){
	        if (blockTokens[j].type !== 'inline') continue;
	        var tokens = blockTokens[j].children;
	        var max = tokens.length;
	        for(curr = 0; curr < max; curr++){
	            if (tokens[curr].type === 'text_special') {
	                tokens[curr].type = 'text';
	            }
	        }
	        for(curr = last = 0; curr < max; curr++){
	            if (tokens[curr].type === 'text' && curr + 1 < max && tokens[curr + 1].type === 'text') {
	                // collapse two adjacent text nodes
	                tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
	            } else {
	                if (curr !== last) {
	                    tokens[last] = tokens[curr];
	                }
	                last++;
	            }
	        }
	        if (curr !== last) {
	            tokens.length = last;
	        }
	    }
	}

	var _rules$2 = [
	    [
	        'normalize',
	        normalize
	    ],
	    [
	        'block',
	        block
	    ],
	    [
	        'inline',
	        inline
	    ],
	    [
	        'linkify',
	        linkify$1
	    ],
	    [
	        'replacements',
	        replace
	    ],
	    [
	        'smartquotes',
	        smartquotes
	    ],
	    // `text_join` finds `text_special` tokens (for escape sequences)
	    // and joins them with the rest of the text
	    [
	        'text_join',
	        text_join
	    ]
	];
	/**
	 * new Core()
	 **/ function Core() {
	    /**
	   * Core#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of core rules.
	   **/ this.ruler = new Ruler();
	    for(var i = 0; i < _rules$2.length; i++){
	        this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
	    }
	}
	/**
	 * Core.process(state)
	 *
	 * Executes core chain rules.
	 **/ Core.prototype.process = function(state) {
	    var rules = this.ruler.getRules('');
	    for(var i = 0, l = rules.length; i < l; i++){
	        rules[i](state);
	    }
	};
	Core.prototype.State = StateCore;

	// Parser state class
	function StateBlock(src, md, env, tokens) {
	    this.src = src;
	    // link to parser instance
	    this.md = md;
	    this.env = env;
	    //
	    // Internal state vartiables
	    //
	    this.tokens = tokens;
	    this.bMarks = [] // line begin offsets for fast jumps
	    ;
	    this.eMarks = [] // line end offsets for fast jumps
	    ;
	    this.tShift = [] // offsets of the first non-space characters (tabs not expanded)
	    ;
	    this.sCount = [] // indents for each line (tabs expanded)
	    ;
	    // An amount of virtual spaces (tabs expanded) between beginning
	    // of each line (bMarks) and real beginning of that line.
	    //
	    // It exists only as a hack because blockquotes override bMarks
	    // losing information in the process.
	    //
	    // It's used only when expanding tabs, you can think about it as
	    // an initial tab length, e.g. bsCount=21 applied to string `\t123`
	    // means first tab should be expanded to 4-21%4 === 3 spaces.
	    //
	    this.bsCount = [];
	    // block parser variables
	    // required block content indent (for example, if we are
	    // inside a list, it would be positioned after list marker)
	    this.blkIndent = 0;
	    this.line = 0 // line index in src
	    ;
	    this.lineMax = 0 // lines count
	    ;
	    this.tight = false // loose/tight mode for lists
	    ;
	    this.ddIndent = -1 // indent of the current dd block (-1 if there isn't any)
	    ;
	    this.listIndent = -1 // indent of the current list block (-1 if there isn't any)
	    ;
	    // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
	    // used in lists to determine if they interrupt a paragraph
	    this.parentType = 'root';
	    this.level = 0;
	    // Create caches
	    // Generate markers.
	    var s = this.src;
	    for(var start = 0, pos = 0, indent = 0, offset = 0, len = s.length, indent_found = false; pos < len; pos++){
	        var ch = s.charCodeAt(pos);
	        if (!indent_found) {
	            if (isSpace(ch)) {
	                indent++;
	                if (ch === 0x09) {
	                    offset += 4 - offset % 4;
	                } else {
	                    offset++;
	                }
	                continue;
	            } else {
	                indent_found = true;
	            }
	        }
	        if (ch === 0x0A || pos === len - 1) {
	            if (ch !== 0x0A) {
	                pos++;
	            }
	            this.bMarks.push(start);
	            this.eMarks.push(pos);
	            this.tShift.push(indent);
	            this.sCount.push(offset);
	            this.bsCount.push(0);
	            indent_found = false;
	            indent = 0;
	            offset = 0;
	            start = pos + 1;
	        }
	    }
	    // Push fake entry to simplify cache bounds checks
	    this.bMarks.push(s.length);
	    this.eMarks.push(s.length);
	    this.tShift.push(0);
	    this.sCount.push(0);
	    this.bsCount.push(0);
	    this.lineMax = this.bMarks.length - 1 // don't count last fake line
	    ;
	}
	// Push new token to "stream".
	//
	StateBlock.prototype.push = function(type, tag, nesting) {
	    var token = new Token(type, tag, nesting);
	    token.block = true;
	    if (nesting < 0) this.level-- // closing tag
	    ;
	    token.level = this.level;
	    if (nesting > 0) this.level++ // opening tag
	    ;
	    this.tokens.push(token);
	    return token;
	};
	StateBlock.prototype.isEmpty = function isEmpty(line) {
	    return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
	};
	StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
	    for(var max = this.lineMax; from < max; from++){
	        if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
	            break;
	        }
	    }
	    return from;
	};
	// Skip spaces from given position.
	StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
	    for(var max = this.src.length; pos < max; pos++){
	        var ch = this.src.charCodeAt(pos);
	        if (!isSpace(ch)) {
	            break;
	        }
	    }
	    return pos;
	};
	// Skip spaces from given position in reverse.
	StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
	    if (pos <= min) {
	        return pos;
	    }
	    while(pos > min){
	        if (!isSpace(this.src.charCodeAt(--pos))) {
	            return pos + 1;
	        }
	    }
	    return pos;
	};
	// Skip char codes from given position
	StateBlock.prototype.skipChars = function skipChars(pos, code) {
	    for(var max = this.src.length; pos < max; pos++){
	        if (this.src.charCodeAt(pos) !== code) {
	            break;
	        }
	    }
	    return pos;
	};
	// Skip char codes reverse from given position - 1
	StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
	    if (pos <= min) {
	        return pos;
	    }
	    while(pos > min){
	        if (code !== this.src.charCodeAt(--pos)) {
	            return pos + 1;
	        }
	    }
	    return pos;
	};
	// cut lines range from source.
	StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
	    if (begin >= end) {
	        return '';
	    }
	    var queue = new Array(end - begin);
	    for(var i = 0, line = begin; line < end; line++, i++){
	        var lineIndent = 0;
	        var lineStart = this.bMarks[line];
	        var first = lineStart;
	        var last = void 0;
	        if (line + 1 < end || keepLastLF) {
	            // No need for bounds check because we have fake entry on tail.
	            last = this.eMarks[line] + 1;
	        } else {
	            last = this.eMarks[line];
	        }
	        while(first < last && lineIndent < indent){
	            var ch = this.src.charCodeAt(first);
	            if (isSpace(ch)) {
	                if (ch === 0x09) {
	                    lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
	                } else {
	                    lineIndent++;
	                }
	            } else if (first - lineStart < this.tShift[line]) {
	                // patched tShift masked characters to look like spaces (blockquotes, list markers)
	                lineIndent++;
	            } else {
	                break;
	            }
	            first++;
	        }
	        if (lineIndent > indent) {
	            // partially expanding tabs in code blocks, e.g '\t\tfoobar'
	            // with indent=2 becomes '  \tfoobar'
	            queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
	        } else {
	            queue[i] = this.src.slice(first, last);
	        }
	    }
	    return queue.join('');
	};
	// re-export Token class to use in block rules
	StateBlock.prototype.Token = Token;

	// GFM table, https://github.github.com/gfm/#tables-extension-
	// Limit the amount of empty autocompleted cells in a table,
	// see https://github.com/markdown-it/markdown-it/issues/1000,
	//
	// Both pulldown-cmark and commonmark-hs limit the number of cells this way to ~200k.
	// We set it to 65k, which can expand user input by a factor of x370
	// (256x256 square is 1.8kB expanded into 650kB).
	var MAX_AUTOCOMPLETED_CELLS = 0x10000;
	function getLine(state, line) {
	    var pos = state.bMarks[line] + state.tShift[line];
	    var max = state.eMarks[line];
	    return state.src.slice(pos, max);
	}
	function escapedSplit(str) {
	    var result = [];
	    var max = str.length;
	    var pos = 0;
	    var ch = str.charCodeAt(pos);
	    var isEscaped = false;
	    var lastPos = 0;
	    var current = '';
	    while(pos < max){
	        if (ch === 0x7c /* | */ ) {
	            if (!isEscaped) {
	                // pipe separating cells, '|'
	                result.push(current + str.substring(lastPos, pos));
	                current = '';
	                lastPos = pos + 1;
	            } else {
	                // escaped pipe, '\|'
	                current += str.substring(lastPos, pos - 1);
	                lastPos = pos;
	            }
	        }
	        isEscaped = ch === 0x5c /* \ */ ;
	        pos++;
	        ch = str.charCodeAt(pos);
	    }
	    result.push(current + str.substring(lastPos));
	    return result;
	}
	function table(state, startLine, endLine, silent) {
	    // should have at least two lines
	    if (startLine + 2 > endLine) {
	        return false;
	    }
	    var nextLine = startLine + 1;
	    if (state.sCount[nextLine] < state.blkIndent) {
	        return false;
	    }
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    // first character of the second line should be '|', '-', ':',
	    // and no other characters are allowed but spaces;
	    // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp
	    var pos = state.bMarks[nextLine] + state.tShift[nextLine];
	    if (pos >= state.eMarks[nextLine]) {
	        return false;
	    }
	    var firstCh = state.src.charCodeAt(pos++);
	    if (firstCh !== 0x7C /* | */  && firstCh !== 0x2D /* - */  && firstCh !== 0x3A /* : */ ) {
	        return false;
	    }
	    if (pos >= state.eMarks[nextLine]) {
	        return false;
	    }
	    var secondCh = state.src.charCodeAt(pos++);
	    if (secondCh !== 0x7C /* | */  && secondCh !== 0x2D /* - */  && secondCh !== 0x3A /* : */  && !isSpace(secondCh)) {
	        return false;
	    }
	    // if first character is '-', then second character must not be a space
	    // (due to parsing ambiguity with list)
	    if (firstCh === 0x2D /* - */  && isSpace(secondCh)) {
	        return false;
	    }
	    while(pos < state.eMarks[nextLine]){
	        var ch = state.src.charCodeAt(pos);
	        if (ch !== 0x7C /* | */  && ch !== 0x2D /* - */  && ch !== 0x3A /* : */  && !isSpace(ch)) {
	            return false;
	        }
	        pos++;
	    }
	    var lineText = getLine(state, startLine + 1);
	    var columns = lineText.split('|');
	    var aligns = [];
	    for(var i = 0; i < columns.length; i++){
	        var t = columns[i].trim();
	        if (!t) {
	            // allow empty columns before and after table, but not in between columns;
	            // e.g. allow ` |---| `, disallow ` ---||--- `
	            if (i === 0 || i === columns.length - 1) {
	                continue;
	            } else {
	                return false;
	            }
	        }
	        if (!/^:?-+:?$/.test(t)) {
	            return false;
	        }
	        if (t.charCodeAt(t.length - 1) === 0x3A /* : */ ) {
	            aligns.push(t.charCodeAt(0) === 0x3A /* : */  ? 'center' : 'right');
	        } else if (t.charCodeAt(0) === 0x3A /* : */ ) {
	            aligns.push('left');
	        } else {
	            aligns.push('');
	        }
	    }
	    lineText = getLine(state, startLine).trim();
	    if (lineText.indexOf('|') === -1) {
	        return false;
	    }
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    columns = escapedSplit(lineText);
	    if (columns.length && columns[0] === '') columns.shift();
	    if (columns.length && columns[columns.length - 1] === '') columns.pop();
	    // header row will define an amount of columns in the entire table,
	    // and align row should be exactly the same (the rest of the rows can differ)
	    var columnCount = columns.length;
	    if (columnCount === 0 || columnCount !== aligns.length) {
	        return false;
	    }
	    if (silent) {
	        return true;
	    }
	    var oldParentType = state.parentType;
	    state.parentType = 'table';
	    // use 'blockquote' lists for termination because it's
	    // the most similar to tables
	    var terminatorRules = state.md.block.ruler.getRules('blockquote');
	    var token_to = state.push('table_open', 'table', 1);
	    var tableLines = [
	        startLine,
	        0
	    ];
	    token_to.map = tableLines;
	    var token_tho = state.push('thead_open', 'thead', 1);
	    token_tho.map = [
	        startLine,
	        startLine + 1
	    ];
	    var token_htro = state.push('tr_open', 'tr', 1);
	    token_htro.map = [
	        startLine,
	        startLine + 1
	    ];
	    for(var i1 = 0; i1 < columns.length; i1++){
	        var token_ho = state.push('th_open', 'th', 1);
	        if (aligns[i1]) {
	            token_ho.attrs = [
	                [
	                    'style',
	                    'text-align:' + aligns[i1]
	                ]
	            ];
	        }
	        var token_il = state.push('inline', '', 0);
	        token_il.content = columns[i1].trim();
	        token_il.children = [];
	        state.push('th_close', 'th', -1);
	    }
	    state.push('tr_close', 'tr', -1);
	    state.push('thead_close', 'thead', -1);
	    var tbodyLines;
	    var autocompletedCells = 0;
	    for(nextLine = startLine + 2; nextLine < endLine; nextLine++){
	        if (state.sCount[nextLine] < state.blkIndent) {
	            break;
	        }
	        var terminate = false;
	        for(var i2 = 0, l = terminatorRules.length; i2 < l; i2++){
	            if (terminatorRules[i2](state, nextLine, endLine, true)) {
	                terminate = true;
	                break;
	            }
	        }
	        if (terminate) {
	            break;
	        }
	        lineText = getLine(state, nextLine).trim();
	        if (!lineText) {
	            break;
	        }
	        if (state.sCount[nextLine] - state.blkIndent >= 4) {
	            break;
	        }
	        columns = escapedSplit(lineText);
	        if (columns.length && columns[0] === '') columns.shift();
	        if (columns.length && columns[columns.length - 1] === '') columns.pop();
	        // note: autocomplete count can be negative if user specifies more columns than header,
	        // but that does not affect intended use (which is limiting expansion)
	        autocompletedCells += columnCount - columns.length;
	        if (autocompletedCells > MAX_AUTOCOMPLETED_CELLS) {
	            break;
	        }
	        if (nextLine === startLine + 2) {
	            var token_tbo = state.push('tbody_open', 'tbody', 1);
	            token_tbo.map = tbodyLines = [
	                startLine + 2,
	                0
	            ];
	        }
	        var token_tro = state.push('tr_open', 'tr', 1);
	        token_tro.map = [
	            nextLine,
	            nextLine + 1
	        ];
	        for(var i3 = 0; i3 < columnCount; i3++){
	            var token_tdo = state.push('td_open', 'td', 1);
	            if (aligns[i3]) {
	                token_tdo.attrs = [
	                    [
	                        'style',
	                        'text-align:' + aligns[i3]
	                    ]
	                ];
	            }
	            var token_il1 = state.push('inline', '', 0);
	            token_il1.content = columns[i3] ? columns[i3].trim() : '';
	            token_il1.children = [];
	            state.push('td_close', 'td', -1);
	        }
	        state.push('tr_close', 'tr', -1);
	    }
	    if (tbodyLines) {
	        state.push('tbody_close', 'tbody', -1);
	        tbodyLines[1] = nextLine;
	    }
	    state.push('table_close', 'table', -1);
	    tableLines[1] = nextLine;
	    state.parentType = oldParentType;
	    state.line = nextLine;
	    return true;
	}

	// Code block (4 spaces padded)
	function code(state, startLine, endLine /*, silent */ ) {
	    if (state.sCount[startLine] - state.blkIndent < 4) {
	        return false;
	    }
	    var nextLine = startLine + 1;
	    var last = nextLine;
	    while(nextLine < endLine){
	        if (state.isEmpty(nextLine)) {
	            nextLine++;
	            continue;
	        }
	        if (state.sCount[nextLine] - state.blkIndent >= 4) {
	            nextLine++;
	            last = nextLine;
	            continue;
	        }
	        break;
	    }
	    state.line = last;
	    var token = state.push('code_block', 'code', 0);
	    token.content = state.getLines(startLine, last, 4 + state.blkIndent, false) + '\n';
	    token.map = [
	        startLine,
	        state.line
	    ];
	    return true;
	}

	// fences (``` lang, ~~~ lang)
	function fence(state, startLine, endLine, silent) {
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var max = state.eMarks[startLine];
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    if (pos + 3 > max) {
	        return false;
	    }
	    var marker = state.src.charCodeAt(pos);
	    if (marker !== 0x7E /* ~ */  && marker !== 0x60 /* ` */ ) {
	        return false;
	    }
	    // scan marker length
	    var mem = pos;
	    pos = state.skipChars(pos, marker);
	    var len = pos - mem;
	    if (len < 3) {
	        return false;
	    }
	    var markup = state.src.slice(mem, pos);
	    var params = state.src.slice(pos, max);
	    if (marker === 0x60 /* ` */ ) {
	        if (params.indexOf(String.fromCharCode(marker)) >= 0) {
	            return false;
	        }
	    }
	    // Since start is found, we can report success here in validation mode
	    if (silent) {
	        return true;
	    }
	    // search end of block
	    var nextLine = startLine;
	    var haveEndMarker = false;
	    for(;;){
	        nextLine++;
	        if (nextLine >= endLine) {
	            break;
	        }
	        pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
	        max = state.eMarks[nextLine];
	        if (pos < max && state.sCount[nextLine] < state.blkIndent) {
	            break;
	        }
	        if (state.src.charCodeAt(pos) !== marker) {
	            continue;
	        }
	        if (state.sCount[nextLine] - state.blkIndent >= 4) {
	            continue;
	        }
	        pos = state.skipChars(pos, marker);
	        // closing code fence must be at least as long as the opening one
	        if (pos - mem < len) {
	            continue;
	        }
	        // make sure tail has spaces only
	        pos = state.skipSpaces(pos);
	        if (pos < max) {
	            continue;
	        }
	        haveEndMarker = true;
	        break;
	    }
	    // If a fence has heading spaces, they should be removed from its inner block
	    len = state.sCount[startLine];
	    state.line = nextLine + (haveEndMarker ? 1 : 0);
	    var token = state.push('fence', 'code', 0);
	    token.info = params;
	    token.content = state.getLines(startLine + 1, nextLine, len, true);
	    token.markup = markup;
	    token.map = [
	        startLine,
	        state.line
	    ];
	    return true;
	}

	// Block quotes
	function blockquote(state, startLine, endLine, silent) {
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var max = state.eMarks[startLine];
	    var oldLineMax = state.lineMax;
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    // check the block quote marker
	    if (state.src.charCodeAt(pos) !== 0x3E /* > */ ) {
	        return false;
	    }
	    // we know that it's going to be a valid blockquote,
	    // so no point trying to find the end of it in silent mode
	    if (silent) {
	        return true;
	    }
	    var oldBMarks = [];
	    var oldBSCount = [];
	    var oldSCount = [];
	    var oldTShift = [];
	    var terminatorRules = state.md.block.ruler.getRules('blockquote');
	    var oldParentType = state.parentType;
	    state.parentType = 'blockquote';
	    var lastLineEmpty = false;
	    var nextLine;
	    // Search the end of the block
	    //
	    // Block ends with either:
	    //  1. an empty line outside:
	    //     ```
	    //     > test
	    //
	    //     ```
	    //  2. an empty line inside:
	    //     ```
	    //     >
	    //     test
	    //     ```
	    //  3. another tag:
	    //     ```
	    //     > test
	    //      - - -
	    //     ```
	    for(nextLine = startLine; nextLine < endLine; nextLine++){
	        // check if it's outdented, i.e. it's inside list item and indented
	        // less than said list item:
	        //
	        // ```
	        // 1. anything
	        //    > current blockquote
	        // 2. checking this line
	        // ```
	        var isOutdented = state.sCount[nextLine] < state.blkIndent;
	        pos = state.bMarks[nextLine] + state.tShift[nextLine];
	        max = state.eMarks[nextLine];
	        if (pos >= max) {
	            break;
	        }
	        if (state.src.charCodeAt(pos++) === 0x3E /* > */  && !isOutdented) {
	            // This line is inside the blockquote.
	            // set offset past spaces and ">"
	            var initial = state.sCount[nextLine] + 1;
	            var spaceAfterMarker = void 0;
	            var adjustTab = void 0;
	            // skip one optional space after '>'
	            if (state.src.charCodeAt(pos) === 0x20 /* space */ ) {
	                // ' >   test '
	                //     ^ -- position start of line here:
	                pos++;
	                initial++;
	                adjustTab = false;
	                spaceAfterMarker = true;
	            } else if (state.src.charCodeAt(pos) === 0x09 /* tab */ ) {
	                spaceAfterMarker = true;
	                if ((state.bsCount[nextLine] + initial) % 4 === 3) {
	                    // '  >\t  test '
	                    //       ^ -- position start of line here (tab has width===1)
	                    pos++;
	                    initial++;
	                    adjustTab = false;
	                } else {
	                    // ' >\t  test '
	                    //    ^ -- position start of line here + shift bsCount slightly
	                    //         to make extra space appear
	                    adjustTab = true;
	                }
	            } else {
	                spaceAfterMarker = false;
	            }
	            var offset = initial;
	            oldBMarks.push(state.bMarks[nextLine]);
	            state.bMarks[nextLine] = pos;
	            while(pos < max){
	                var ch = state.src.charCodeAt(pos);
	                if (isSpace(ch)) {
	                    if (ch === 0x09) {
	                        offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
	                    } else {
	                        offset++;
	                    }
	                } else {
	                    break;
	                }
	                pos++;
	            }
	            lastLineEmpty = pos >= max;
	            oldBSCount.push(state.bsCount[nextLine]);
	            state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);
	            oldSCount.push(state.sCount[nextLine]);
	            state.sCount[nextLine] = offset - initial;
	            oldTShift.push(state.tShift[nextLine]);
	            state.tShift[nextLine] = pos - state.bMarks[nextLine];
	            continue;
	        }
	        // Case 2: line is not inside the blockquote, and the last line was empty.
	        if (lastLineEmpty) {
	            break;
	        }
	        // Case 3: another tag found.
	        var terminate = false;
	        for(var i = 0, l = terminatorRules.length; i < l; i++){
	            if (terminatorRules[i](state, nextLine, endLine, true)) {
	                terminate = true;
	                break;
	            }
	        }
	        if (terminate) {
	            // Quirk to enforce "hard termination mode" for paragraphs;
	            // normally if you call `tokenize(state, startLine, nextLine)`,
	            // paragraphs will look below nextLine for paragraph continuation,
	            // but if blockquote is terminated by another tag, they shouldn't
	            state.lineMax = nextLine;
	            if (state.blkIndent !== 0) {
	                // state.blkIndent was non-zero, we now set it to zero,
	                // so we need to re-calculate all offsets to appear as
	                // if indent wasn't changed
	                oldBMarks.push(state.bMarks[nextLine]);
	                oldBSCount.push(state.bsCount[nextLine]);
	                oldTShift.push(state.tShift[nextLine]);
	                oldSCount.push(state.sCount[nextLine]);
	                state.sCount[nextLine] -= state.blkIndent;
	            }
	            break;
	        }
	        oldBMarks.push(state.bMarks[nextLine]);
	        oldBSCount.push(state.bsCount[nextLine]);
	        oldTShift.push(state.tShift[nextLine]);
	        oldSCount.push(state.sCount[nextLine]);
	        // A negative indentation means that this is a paragraph continuation
	        //
	        state.sCount[nextLine] = -1;
	    }
	    var oldIndent = state.blkIndent;
	    state.blkIndent = 0;
	    var token_o = state.push('blockquote_open', 'blockquote', 1);
	    token_o.markup = '>';
	    var lines = [
	        startLine,
	        0
	    ];
	    token_o.map = lines;
	    state.md.block.tokenize(state, startLine, nextLine);
	    var token_c = state.push('blockquote_close', 'blockquote', -1);
	    token_c.markup = '>';
	    state.lineMax = oldLineMax;
	    state.parentType = oldParentType;
	    lines[1] = state.line;
	    // Restore original tShift; this might not be necessary since the parser
	    // has already been here, but just to make sure we can do that.
	    for(var i1 = 0; i1 < oldTShift.length; i1++){
	        state.bMarks[i1 + startLine] = oldBMarks[i1];
	        state.tShift[i1 + startLine] = oldTShift[i1];
	        state.sCount[i1 + startLine] = oldSCount[i1];
	        state.bsCount[i1 + startLine] = oldBSCount[i1];
	    }
	    state.blkIndent = oldIndent;
	    return true;
	}

	// Horizontal rule
	function hr(state, startLine, endLine, silent) {
	    var max = state.eMarks[startLine];
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var marker = state.src.charCodeAt(pos++);
	    // Check hr marker
	    if (marker !== 0x2A /* * */  && marker !== 0x2D /* - */  && marker !== 0x5F /* _ */ ) {
	        return false;
	    }
	    // markers can be mixed with spaces, but there should be at least 3 of them
	    var cnt = 1;
	    while(pos < max){
	        var ch = state.src.charCodeAt(pos++);
	        if (ch !== marker && !isSpace(ch)) {
	            return false;
	        }
	        if (ch === marker) {
	            cnt++;
	        }
	    }
	    if (cnt < 3) {
	        return false;
	    }
	    if (silent) {
	        return true;
	    }
	    state.line = startLine + 1;
	    var token = state.push('hr', 'hr', 0);
	    token.map = [
	        startLine,
	        state.line
	    ];
	    token.markup = Array(cnt + 1).join(String.fromCharCode(marker));
	    return true;
	}

	// Lists
	// Search `[-+*][\n ]`, returns next pos after marker on success
	// or -1 on fail.
	function skipBulletListMarker(state, startLine) {
	    var max = state.eMarks[startLine];
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var marker = state.src.charCodeAt(pos++);
	    // Check bullet
	    if (marker !== 0x2A /* * */  && marker !== 0x2D /* - */  && marker !== 0x2B /* + */ ) {
	        return -1;
	    }
	    if (pos < max) {
	        var ch = state.src.charCodeAt(pos);
	        if (!isSpace(ch)) {
	            // " -test " - is not a list item
	            return -1;
	        }
	    }
	    return pos;
	}
	// Search `\d+[.)][\n ]`, returns next pos after marker on success
	// or -1 on fail.
	function skipOrderedListMarker(state, startLine) {
	    var start = state.bMarks[startLine] + state.tShift[startLine];
	    var max = state.eMarks[startLine];
	    var pos = start;
	    // List marker should have at least 2 chars (digit + dot)
	    if (pos + 1 >= max) {
	        return -1;
	    }
	    var ch = state.src.charCodeAt(pos++);
	    if (ch < 0x30 /* 0 */  || ch > 0x39 /* 9 */ ) {
	        return -1;
	    }
	    for(;;){
	        // EOL -> fail
	        if (pos >= max) {
	            return -1;
	        }
	        ch = state.src.charCodeAt(pos++);
	        if (ch >= 0x30 /* 0 */  && ch <= 0x39 /* 9 */ ) {
	            // List marker should have no more than 9 digits
	            // (prevents integer overflow in browsers)
	            if (pos - start >= 10) {
	                return -1;
	            }
	            continue;
	        }
	        // found valid marker
	        if (ch === 0x29 /* ) */  || ch === 0x2e /* . */ ) {
	            break;
	        }
	        return -1;
	    }
	    if (pos < max) {
	        ch = state.src.charCodeAt(pos);
	        if (!isSpace(ch)) {
	            // " 1.test " - is not a list item
	            return -1;
	        }
	    }
	    return pos;
	}
	function markTightParagraphs(state, idx) {
	    var level = state.level + 2;
	    for(var i = idx + 2, l = state.tokens.length - 2; i < l; i++){
	        if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
	            state.tokens[i + 2].hidden = true;
	            state.tokens[i].hidden = true;
	            i += 2;
	        }
	    }
	}
	function list(state, startLine, endLine, silent) {
	    var max, pos, start, token;
	    var nextLine = startLine;
	    var tight = true;
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[nextLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    // Special case:
	    //  - item 1
	    //   - item 2
	    //    - item 3
	    //     - item 4
	    //      - this one is a paragraph continuation
	    if (state.listIndent >= 0 && state.sCount[nextLine] - state.listIndent >= 4 && state.sCount[nextLine] < state.blkIndent) {
	        return false;
	    }
	    var isTerminatingParagraph = false;
	    // limit conditions when list can interrupt
	    // a paragraph (validation mode only)
	    if (silent && state.parentType === 'paragraph') {
	        // Next list item should still terminate previous list item;
	        //
	        // This code can fail if plugins use blkIndent as well as lists,
	        // but I hope the spec gets fixed long before that happens.
	        //
	        if (state.sCount[nextLine] >= state.blkIndent) {
	            isTerminatingParagraph = true;
	        }
	    }
	    // Detect list type and position after marker
	    var isOrdered;
	    var markerValue;
	    var posAfterMarker;
	    if ((posAfterMarker = skipOrderedListMarker(state, nextLine)) >= 0) {
	        isOrdered = true;
	        start = state.bMarks[nextLine] + state.tShift[nextLine];
	        markerValue = Number(state.src.slice(start, posAfterMarker - 1));
	        // If we're starting a new ordered list right after
	        // a paragraph, it should start with 1.
	        if (isTerminatingParagraph && markerValue !== 1) return false;
	    } else if ((posAfterMarker = skipBulletListMarker(state, nextLine)) >= 0) {
	        isOrdered = false;
	    } else {
	        return false;
	    }
	    // If we're starting a new unordered list right after
	    // a paragraph, first line should not be empty.
	    if (isTerminatingParagraph) {
	        if (state.skipSpaces(posAfterMarker) >= state.eMarks[nextLine]) return false;
	    }
	    // For validation mode we can terminate immediately
	    if (silent) {
	        return true;
	    }
	    // We should terminate list on style change. Remember first one to compare.
	    var markerCharCode = state.src.charCodeAt(posAfterMarker - 1);
	    // Start list
	    var listTokIdx = state.tokens.length;
	    if (isOrdered) {
	        token = state.push('ordered_list_open', 'ol', 1);
	        if (markerValue !== 1) {
	            token.attrs = [
	                [
	                    'start',
	                    markerValue
	                ]
	            ];
	        }
	    } else {
	        token = state.push('bullet_list_open', 'ul', 1);
	    }
	    var listLines = [
	        nextLine,
	        0
	    ];
	    token.map = listLines;
	    token.markup = String.fromCharCode(markerCharCode);
	    //
	    // Iterate list items
	    //
	    var prevEmptyEnd = false;
	    var terminatorRules = state.md.block.ruler.getRules('list');
	    var oldParentType = state.parentType;
	    state.parentType = 'list';
	    while(nextLine < endLine){
	        pos = posAfterMarker;
	        max = state.eMarks[nextLine];
	        var initial = state.sCount[nextLine] + posAfterMarker - (state.bMarks[nextLine] + state.tShift[nextLine]);
	        var offset = initial;
	        while(pos < max){
	            var ch = state.src.charCodeAt(pos);
	            if (ch === 0x09) {
	                offset += 4 - (offset + state.bsCount[nextLine]) % 4;
	            } else if (ch === 0x20) {
	                offset++;
	            } else {
	                break;
	            }
	            pos++;
	        }
	        var contentStart = pos;
	        var indentAfterMarker = void 0;
	        if (contentStart >= max) {
	            // trimming space in "-    \n  3" case, indent is 1 here
	            indentAfterMarker = 1;
	        } else {
	            indentAfterMarker = offset - initial;
	        }
	        // If we have more than 4 spaces, the indent is 1
	        // (the rest is just indented code block)
	        if (indentAfterMarker > 4) {
	            indentAfterMarker = 1;
	        }
	        // "  -  test"
	        //  ^^^^^ - calculating total length of this thing
	        var indent = initial + indentAfterMarker;
	        // Run subparser & write tokens
	        token = state.push('list_item_open', 'li', 1);
	        token.markup = String.fromCharCode(markerCharCode);
	        var itemLines = [
	            nextLine,
	            0
	        ];
	        token.map = itemLines;
	        if (isOrdered) {
	            token.info = state.src.slice(start, posAfterMarker - 1);
	        }
	        // change current state, then restore it after parser subcall
	        var oldTight = state.tight;
	        var oldTShift = state.tShift[nextLine];
	        var oldSCount = state.sCount[nextLine];
	        //  - example list
	        // ^ listIndent position will be here
	        //   ^ blkIndent position will be here
	        //
	        var oldListIndent = state.listIndent;
	        state.listIndent = state.blkIndent;
	        state.blkIndent = indent;
	        state.tight = true;
	        state.tShift[nextLine] = contentStart - state.bMarks[nextLine];
	        state.sCount[nextLine] = offset;
	        if (contentStart >= max && state.isEmpty(nextLine + 1)) {
	            // workaround for this case
	            // (list item is empty, list terminates before "foo"):
	            // ~~~~~~~~
	            //   -
	            //
	            //     foo
	            // ~~~~~~~~
	            state.line = Math.min(state.line + 2, endLine);
	        } else {
	            state.md.block.tokenize(state, nextLine, endLine, true);
	        }
	        // If any of list item is tight, mark list as tight
	        if (!state.tight || prevEmptyEnd) {
	            tight = false;
	        }
	        // Item become loose if finish with empty line,
	        // but we should filter last element, because it means list finish
	        prevEmptyEnd = state.line - nextLine > 1 && state.isEmpty(state.line - 1);
	        state.blkIndent = state.listIndent;
	        state.listIndent = oldListIndent;
	        state.tShift[nextLine] = oldTShift;
	        state.sCount[nextLine] = oldSCount;
	        state.tight = oldTight;
	        token = state.push('list_item_close', 'li', -1);
	        token.markup = String.fromCharCode(markerCharCode);
	        nextLine = state.line;
	        itemLines[1] = nextLine;
	        if (nextLine >= endLine) {
	            break;
	        }
	        //
	        // Try to check if list is terminated or continued.
	        //
	        if (state.sCount[nextLine] < state.blkIndent) {
	            break;
	        }
	        // if it's indented more than 3 spaces, it should be a code block
	        if (state.sCount[nextLine] - state.blkIndent >= 4) {
	            break;
	        }
	        // fail if terminating block found
	        var terminate = false;
	        for(var i = 0, l = terminatorRules.length; i < l; i++){
	            if (terminatorRules[i](state, nextLine, endLine, true)) {
	                terminate = true;
	                break;
	            }
	        }
	        if (terminate) {
	            break;
	        }
	        // fail if list has another type
	        if (isOrdered) {
	            posAfterMarker = skipOrderedListMarker(state, nextLine);
	            if (posAfterMarker < 0) {
	                break;
	            }
	            start = state.bMarks[nextLine] + state.tShift[nextLine];
	        } else {
	            posAfterMarker = skipBulletListMarker(state, nextLine);
	            if (posAfterMarker < 0) {
	                break;
	            }
	        }
	        if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
	            break;
	        }
	    }
	    // Finalize list
	    if (isOrdered) {
	        token = state.push('ordered_list_close', 'ol', -1);
	    } else {
	        token = state.push('bullet_list_close', 'ul', -1);
	    }
	    token.markup = String.fromCharCode(markerCharCode);
	    listLines[1] = nextLine;
	    state.line = nextLine;
	    state.parentType = oldParentType;
	    // mark paragraphs tight if needed
	    if (tight) {
	        markTightParagraphs(state, listTokIdx);
	    }
	    return true;
	}

	function reference(state, startLine, _endLine, silent) {
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var max = state.eMarks[startLine];
	    var nextLine = startLine + 1;
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    if (state.src.charCodeAt(pos) !== 0x5B /* [ */ ) {
	        return false;
	    }
	    function getNextLine(nextLine) {
	        var endLine = state.lineMax;
	        if (nextLine >= endLine || state.isEmpty(nextLine)) {
	            // empty line or end of input
	            return null;
	        }
	        var isContinuation = false;
	        // this would be a code block normally, but after paragraph
	        // it's considered a lazy continuation regardless of what's there
	        if (state.sCount[nextLine] - state.blkIndent > 3) {
	            isContinuation = true;
	        }
	        // quirk for blockquotes, this line should already be checked by that rule
	        if (state.sCount[nextLine] < 0) {
	            isContinuation = true;
	        }
	        if (!isContinuation) {
	            var terminatorRules = state.md.block.ruler.getRules('reference');
	            var oldParentType = state.parentType;
	            state.parentType = 'reference';
	            // Some tags can terminate paragraph without empty line.
	            var terminate = false;
	            for(var i = 0, l = terminatorRules.length; i < l; i++){
	                if (terminatorRules[i](state, nextLine, endLine, true)) {
	                    terminate = true;
	                    break;
	                }
	            }
	            state.parentType = oldParentType;
	            if (terminate) {
	                // terminated by another block
	                return null;
	            }
	        }
	        var pos = state.bMarks[nextLine] + state.tShift[nextLine];
	        var max = state.eMarks[nextLine];
	        // max + 1 explicitly includes the newline
	        return state.src.slice(pos, max + 1);
	    }
	    var str = state.src.slice(pos, max + 1);
	    max = str.length;
	    var labelEnd = -1;
	    for(pos = 1; pos < max; pos++){
	        var ch = str.charCodeAt(pos);
	        if (ch === 0x5B /* [ */ ) {
	            return false;
	        } else if (ch === 0x5D /* ] */ ) {
	            labelEnd = pos;
	            break;
	        } else if (ch === 0x0A /* \n */ ) {
	            var lineContent = getNextLine(nextLine);
	            if (lineContent !== null) {
	                str += lineContent;
	                max = str.length;
	                nextLine++;
	            }
	        } else if (ch === 0x5C /* \ */ ) {
	            pos++;
	            if (pos < max && str.charCodeAt(pos) === 0x0A) {
	                var lineContent1 = getNextLine(nextLine);
	                if (lineContent1 !== null) {
	                    str += lineContent1;
	                    max = str.length;
	                    nextLine++;
	                }
	            }
	        }
	    }
	    if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A /* : */ ) {
	        return false;
	    }
	    // [label]:   destination   'title'
	    //         ^^^ skip optional whitespace here
	    for(pos = labelEnd + 2; pos < max; pos++){
	        var ch1 = str.charCodeAt(pos);
	        if (ch1 === 0x0A) {
	            var lineContent2 = getNextLine(nextLine);
	            if (lineContent2 !== null) {
	                str += lineContent2;
	                max = str.length;
	                nextLine++;
	            }
	        } else if (isSpace(ch1)) ; else {
	            break;
	        }
	    }
	    // [label]:   destination   'title'
	    //            ^^^^^^^^^^^ parse this
	    var destRes = state.md.helpers.parseLinkDestination(str, pos, max);
	    if (!destRes.ok) {
	        return false;
	    }
	    var href = state.md.normalizeLink(destRes.str);
	    if (!state.md.validateLink(href)) {
	        return false;
	    }
	    pos = destRes.pos;
	    // save cursor state, we could require to rollback later
	    var destEndPos = pos;
	    var destEndLineNo = nextLine;
	    // [label]:   destination   'title'
	    //                       ^^^ skipping those spaces
	    var start = pos;
	    for(; pos < max; pos++){
	        var ch2 = str.charCodeAt(pos);
	        if (ch2 === 0x0A) {
	            var lineContent3 = getNextLine(nextLine);
	            if (lineContent3 !== null) {
	                str += lineContent3;
	                max = str.length;
	                nextLine++;
	            }
	        } else if (isSpace(ch2)) ; else {
	            break;
	        }
	    }
	    // [label]:   destination   'title'
	    //                          ^^^^^^^ parse this
	    var titleRes = state.md.helpers.parseLinkTitle(str, pos, max);
	    while(titleRes.can_continue){
	        var lineContent4 = getNextLine(nextLine);
	        if (lineContent4 === null) break;
	        str += lineContent4;
	        pos = max;
	        max = str.length;
	        nextLine++;
	        titleRes = state.md.helpers.parseLinkTitle(str, pos, max, titleRes);
	    }
	    var title;
	    if (pos < max && start !== pos && titleRes.ok) {
	        title = titleRes.str;
	        pos = titleRes.pos;
	    } else {
	        title = '';
	        pos = destEndPos;
	        nextLine = destEndLineNo;
	    }
	    // skip trailing spaces until the rest of the line
	    while(pos < max){
	        var ch3 = str.charCodeAt(pos);
	        if (!isSpace(ch3)) {
	            break;
	        }
	        pos++;
	    }
	    if (pos < max && str.charCodeAt(pos) !== 0x0A) {
	        if (title) {
	            // garbage at the end of the line after title,
	            // but it could still be a valid reference if we roll back
	            title = '';
	            pos = destEndPos;
	            nextLine = destEndLineNo;
	            while(pos < max){
	                var ch4 = str.charCodeAt(pos);
	                if (!isSpace(ch4)) {
	                    break;
	                }
	                pos++;
	            }
	        }
	    }
	    if (pos < max && str.charCodeAt(pos) !== 0x0A) {
	        // garbage at the end of the line
	        return false;
	    }
	    var label = normalizeReference(str.slice(1, labelEnd));
	    if (!label) {
	        // CommonMark 0.20 disallows empty labels
	        return false;
	    }
	    // Reference can not terminate anything. This check is for safety only.
	    /* istanbul ignore if */ if (silent) {
	        return true;
	    }
	    if (typeof state.env.references === 'undefined') {
	        state.env.references = {};
	    }
	    if (typeof state.env.references[label] === 'undefined') {
	        state.env.references[label] = {
	            title: title,
	            href: href
	        };
	    }
	    state.line = nextLine;
	    return true;
	}

	// List of valid html blocks names, according to commonmark spec
	// https://spec.commonmark.org/0.30/#html-blocks
	var block_names = [
	    'address',
	    'article',
	    'aside',
	    'base',
	    'basefont',
	    'blockquote',
	    'body',
	    'caption',
	    'center',
	    'col',
	    'colgroup',
	    'dd',
	    'details',
	    'dialog',
	    'dir',
	    'div',
	    'dl',
	    'dt',
	    'fieldset',
	    'figcaption',
	    'figure',
	    'footer',
	    'form',
	    'frame',
	    'frameset',
	    'h1',
	    'h2',
	    'h3',
	    'h4',
	    'h5',
	    'h6',
	    'head',
	    'header',
	    'hr',
	    'html',
	    'iframe',
	    'legend',
	    'li',
	    'link',
	    'main',
	    'menu',
	    'menuitem',
	    'nav',
	    'noframes',
	    'ol',
	    'optgroup',
	    'option',
	    'p',
	    'param',
	    'search',
	    'section',
	    'summary',
	    'table',
	    'tbody',
	    'td',
	    'tfoot',
	    'th',
	    'thead',
	    'title',
	    'tr',
	    'track',
	    'ul'
	];

	// Regexps to match html elements
	var attr_name = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
	var unquoted = '[^"\'=<>`\\x00-\\x20]+';
	var single_quoted = "'[^']*'";
	var double_quoted = '"[^"]*"';
	var attr_value = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';
	var attribute = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';
	var open_tag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
	var close_tag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
	var comment = '<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->';
	var processing = '<[?][\\s\\S]*?[?]>';
	var declaration = '<![A-Za-z][^>]*>';
	var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
	var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment + '|' + processing + '|' + declaration + '|' + cdata + ')');
	var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

	// HTML block
	// An array of opening and corresponding closing sequences for html tags,
	// last argument defines whether it can terminate a paragraph or not
	//
	var HTML_SEQUENCES = [
	    [
	        /^<(script|pre|style|textarea)(?=(\s|>|$))/i,
	        /<\/(script|pre|style|textarea)>/i,
	        true
	    ],
	    [
	        /^<!--/,
	        /-->/,
	        true
	    ],
	    [
	        /^<\?/,
	        /\?>/,
	        true
	    ],
	    [
	        /^<![A-Z]/,
	        />/,
	        true
	    ],
	    [
	        /^<!\[CDATA\[/,
	        /\]\]>/,
	        true
	    ],
	    [
	        new RegExp('^</?(' + block_names.join('|') + ')(?=(\\s|/?>|$))', 'i'),
	        /^$/,
	        true
	    ],
	    [
	        new RegExp(HTML_OPEN_CLOSE_TAG_RE.source + '\\s*$'),
	        /^$/,
	        false
	    ]
	];
	function html_block(state, startLine, endLine, silent) {
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var max = state.eMarks[startLine];
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    if (!state.md.options.html) {
	        return false;
	    }
	    if (state.src.charCodeAt(pos) !== 0x3C /* < */ ) {
	        return false;
	    }
	    var lineText = state.src.slice(pos, max);
	    var i = 0;
	    for(; i < HTML_SEQUENCES.length; i++){
	        if (HTML_SEQUENCES[i][0].test(lineText)) {
	            break;
	        }
	    }
	    if (i === HTML_SEQUENCES.length) {
	        return false;
	    }
	    if (silent) {
	        // true if this sequence can be a terminator, false otherwise
	        return HTML_SEQUENCES[i][2];
	    }
	    var nextLine = startLine + 1;
	    // If we are here - we detected HTML block.
	    // Let's roll down till block end.
	    if (!HTML_SEQUENCES[i][1].test(lineText)) {
	        for(; nextLine < endLine; nextLine++){
	            if (state.sCount[nextLine] < state.blkIndent) {
	                break;
	            }
	            pos = state.bMarks[nextLine] + state.tShift[nextLine];
	            max = state.eMarks[nextLine];
	            lineText = state.src.slice(pos, max);
	            if (HTML_SEQUENCES[i][1].test(lineText)) {
	                if (lineText.length !== 0) {
	                    nextLine++;
	                }
	                break;
	            }
	        }
	    }
	    state.line = nextLine;
	    var token = state.push('html_block', '', 0);
	    token.map = [
	        startLine,
	        nextLine
	    ];
	    token.content = state.getLines(startLine, nextLine, state.blkIndent, true);
	    return true;
	}

	// heading (#, ##, ...)
	function heading(state, startLine, endLine, silent) {
	    var pos = state.bMarks[startLine] + state.tShift[startLine];
	    var max = state.eMarks[startLine];
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    var ch = state.src.charCodeAt(pos);
	    if (ch !== 0x23 /* # */  || pos >= max) {
	        return false;
	    }
	    // count heading level
	    var level = 1;
	    ch = state.src.charCodeAt(++pos);
	    while(ch === 0x23 /* # */  && pos < max && level <= 6){
	        level++;
	        ch = state.src.charCodeAt(++pos);
	    }
	    if (level > 6 || pos < max && !isSpace(ch)) {
	        return false;
	    }
	    if (silent) {
	        return true;
	    }
	    // Let's cut tails like '    ###  ' from the end of string
	    max = state.skipSpacesBack(max, pos);
	    var tmp = state.skipCharsBack(max, 0x23, pos) // #
	    ;
	    if (tmp > pos && isSpace(state.src.charCodeAt(tmp - 1))) {
	        max = tmp;
	    }
	    state.line = startLine + 1;
	    var token_o = state.push('heading_open', 'h' + String(level), 1);
	    token_o.markup = '########'.slice(0, level);
	    token_o.map = [
	        startLine,
	        state.line
	    ];
	    var token_i = state.push('inline', '', 0);
	    token_i.content = state.src.slice(pos, max).trim();
	    token_i.map = [
	        startLine,
	        state.line
	    ];
	    token_i.children = [];
	    var token_c = state.push('heading_close', 'h' + String(level), -1);
	    token_c.markup = '########'.slice(0, level);
	    return true;
	}

	// lheading (---, ===)
	function lheading(state, startLine, endLine /*, silent */ ) {
	    var terminatorRules = state.md.block.ruler.getRules('paragraph');
	    // if it's indented more than 3 spaces, it should be a code block
	    if (state.sCount[startLine] - state.blkIndent >= 4) {
	        return false;
	    }
	    var oldParentType = state.parentType;
	    state.parentType = 'paragraph' // use paragraph to match terminatorRules
	    ;
	    // jump line-by-line until empty one or EOF
	    var level = 0;
	    var marker;
	    var nextLine = startLine + 1;
	    for(; nextLine < endLine && !state.isEmpty(nextLine); nextLine++){
	        // this would be a code block normally, but after paragraph
	        // it's considered a lazy continuation regardless of what's there
	        if (state.sCount[nextLine] - state.blkIndent > 3) {
	            continue;
	        }
	        //
	        // Check for underline in setext header
	        //
	        if (state.sCount[nextLine] >= state.blkIndent) {
	            var pos = state.bMarks[nextLine] + state.tShift[nextLine];
	            var max = state.eMarks[nextLine];
	            if (pos < max) {
	                marker = state.src.charCodeAt(pos);
	                if (marker === 0x2D /* - */  || marker === 0x3D /* = */ ) {
	                    pos = state.skipChars(pos, marker);
	                    pos = state.skipSpaces(pos);
	                    if (pos >= max) {
	                        level = marker === 0x3D /* = */  ? 1 : 2;
	                        break;
	                    }
	                }
	            }
	        }
	        // quirk for blockquotes, this line should already be checked by that rule
	        if (state.sCount[nextLine] < 0) {
	            continue;
	        }
	        // Some tags can terminate paragraph without empty line.
	        var terminate = false;
	        for(var i = 0, l = terminatorRules.length; i < l; i++){
	            if (terminatorRules[i](state, nextLine, endLine, true)) {
	                terminate = true;
	                break;
	            }
	        }
	        if (terminate) {
	            break;
	        }
	    }
	    if (!level) {
	        // Didn't find valid underline
	        return false;
	    }
	    var content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
	    state.line = nextLine + 1;
	    var token_o = state.push('heading_open', 'h' + String(level), 1);
	    token_o.markup = String.fromCharCode(marker);
	    token_o.map = [
	        startLine,
	        state.line
	    ];
	    var token_i = state.push('inline', '', 0);
	    token_i.content = content;
	    token_i.map = [
	        startLine,
	        state.line - 1
	    ];
	    token_i.children = [];
	    var token_c = state.push('heading_close', 'h' + String(level), -1);
	    token_c.markup = String.fromCharCode(marker);
	    state.parentType = oldParentType;
	    return true;
	}

	// Paragraph
	function paragraph(state, startLine, endLine) {
	    var terminatorRules = state.md.block.ruler.getRules('paragraph');
	    var oldParentType = state.parentType;
	    var nextLine = startLine + 1;
	    state.parentType = 'paragraph';
	    // jump line-by-line until empty one or EOF
	    for(; nextLine < endLine && !state.isEmpty(nextLine); nextLine++){
	        // this would be a code block normally, but after paragraph
	        // it's considered a lazy continuation regardless of what's there
	        if (state.sCount[nextLine] - state.blkIndent > 3) {
	            continue;
	        }
	        // quirk for blockquotes, this line should already be checked by that rule
	        if (state.sCount[nextLine] < 0) {
	            continue;
	        }
	        // Some tags can terminate paragraph without empty line.
	        var terminate = false;
	        for(var i = 0, l = terminatorRules.length; i < l; i++){
	            if (terminatorRules[i](state, nextLine, endLine, true)) {
	                terminate = true;
	                break;
	            }
	        }
	        if (terminate) {
	            break;
	        }
	    }
	    var content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
	    state.line = nextLine;
	    var token_o = state.push('paragraph_open', 'p', 1);
	    token_o.map = [
	        startLine,
	        state.line
	    ];
	    var token_i = state.push('inline', '', 0);
	    token_i.content = content;
	    token_i.map = [
	        startLine,
	        state.line
	    ];
	    token_i.children = [];
	    state.push('paragraph_close', 'p', -1);
	    state.parentType = oldParentType;
	    return true;
	}

	var _rules$1 = [
	    // First 2 params - rule name & source. Secondary array - list of rules,
	    // which can be terminated by this one.
	    [
	        'table',
	        table,
	        [
	            'paragraph',
	            'reference'
	        ]
	    ],
	    [
	        'code',
	        code
	    ],
	    [
	        'fence',
	        fence,
	        [
	            'paragraph',
	            'reference',
	            'blockquote',
	            'list'
	        ]
	    ],
	    [
	        'blockquote',
	        blockquote,
	        [
	            'paragraph',
	            'reference',
	            'blockquote',
	            'list'
	        ]
	    ],
	    [
	        'hr',
	        hr,
	        [
	            'paragraph',
	            'reference',
	            'blockquote',
	            'list'
	        ]
	    ],
	    [
	        'list',
	        list,
	        [
	            'paragraph',
	            'reference',
	            'blockquote'
	        ]
	    ],
	    [
	        'reference',
	        reference
	    ],
	    [
	        'html_block',
	        html_block,
	        [
	            'paragraph',
	            'reference',
	            'blockquote'
	        ]
	    ],
	    [
	        'heading',
	        heading,
	        [
	            'paragraph',
	            'reference',
	            'blockquote'
	        ]
	    ],
	    [
	        'lheading',
	        lheading
	    ],
	    [
	        'paragraph',
	        paragraph
	    ]
	];
	/**
	 * new ParserBlock()
	 **/ function ParserBlock() {
	    /**
	   * ParserBlock#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of block rules.
	   **/ this.ruler = new Ruler();
	    for(var i = 0; i < _rules$1.length; i++){
	        this.ruler.push(_rules$1[i][0], _rules$1[i][1], {
	            alt: (_rules$1[i][2] || []).slice()
	        });
	    }
	}
	// Generate tokens for input range
	//
	ParserBlock.prototype.tokenize = function(state, startLine, endLine) {
	    var rules = this.ruler.getRules('');
	    var len = rules.length;
	    var maxNesting = state.md.options.maxNesting;
	    var line = startLine;
	    var hasEmptyLines = false;
	    while(line < endLine){
	        state.line = line = state.skipEmptyLines(line);
	        if (line >= endLine) {
	            break;
	        }
	        // Termination condition for nested calls.
	        // Nested calls currently used for blockquotes & lists
	        if (state.sCount[line] < state.blkIndent) {
	            break;
	        }
	        // If nesting level exceeded - skip tail to the end. That's not ordinary
	        // situation and we should not care about content.
	        if (state.level >= maxNesting) {
	            state.line = endLine;
	            break;
	        }
	        // Try all possible rules.
	        // On success, rule should:
	        //
	        // - update `state.line`
	        // - update `state.tokens`
	        // - return true
	        var prevLine = state.line;
	        var ok = false;
	        for(var i = 0; i < len; i++){
	            ok = rules[i](state, line, endLine, false);
	            if (ok) {
	                if (prevLine >= state.line) {
	                    throw new Error("block rule didn't increment state.line");
	                }
	                break;
	            }
	        }
	        // this can only happen if user disables paragraph rule
	        if (!ok) throw new Error('none of the block rules matched');
	        // set state.tight if we had an empty line before current tag
	        // i.e. latest empty line should not count
	        state.tight = !hasEmptyLines;
	        // paragraph might "eat" one newline after it in nested lists
	        if (state.isEmpty(state.line - 1)) {
	            hasEmptyLines = true;
	        }
	        line = state.line;
	        if (line < endLine && state.isEmpty(line)) {
	            hasEmptyLines = true;
	            line++;
	            state.line = line;
	        }
	    }
	};
	/**
	 * ParserBlock.parse(str, md, env, outTokens)
	 *
	 * Process input string and push block tokens into `outTokens`
	 **/ ParserBlock.prototype.parse = function(src, md, env, outTokens) {
	    if (!src) {
	        return;
	    }
	    var state = new this.State(src, md, env, outTokens);
	    this.tokenize(state, state.line, state.lineMax);
	};
	ParserBlock.prototype.State = StateBlock;

	// Inline parser state
	function StateInline(src, md, env, outTokens) {
	    this.src = src;
	    this.env = env;
	    this.md = md;
	    this.tokens = outTokens;
	    this.tokens_meta = Array(outTokens.length);
	    this.pos = 0;
	    this.posMax = this.src.length;
	    this.level = 0;
	    this.pending = '';
	    this.pendingLevel = 0;
	    // Stores { start: end } pairs. Useful for backtrack
	    // optimization of pairs parse (emphasis, strikes).
	    this.cache = {};
	    // List of emphasis-like delimiters for current tag
	    this.delimiters = [];
	    // Stack of delimiter lists for upper level tags
	    this._prev_delimiters = [];
	    // backtick length => last seen position
	    this.backticks = {};
	    this.backticksScanned = false;
	    // Counter used to disable inline linkify-it execution
	    // inside <a> and markdown links
	    this.linkLevel = 0;
	}
	// Flush pending text
	//
	StateInline.prototype.pushPending = function() {
	    var token = new Token('text', '', 0);
	    token.content = this.pending;
	    token.level = this.pendingLevel;
	    this.tokens.push(token);
	    this.pending = '';
	    return token;
	};
	// Push new token to "stream".
	// If pending text exists - flush it as text token
	//
	StateInline.prototype.push = function(type, tag, nesting) {
	    if (this.pending) {
	        this.pushPending();
	    }
	    var token = new Token(type, tag, nesting);
	    var token_meta = null;
	    if (nesting < 0) {
	        // closing tag
	        this.level--;
	        this.delimiters = this._prev_delimiters.pop();
	    }
	    token.level = this.level;
	    if (nesting > 0) {
	        // opening tag
	        this.level++;
	        this._prev_delimiters.push(this.delimiters);
	        this.delimiters = [];
	        token_meta = {
	            delimiters: this.delimiters
	        };
	    }
	    this.pendingLevel = this.level;
	    this.tokens.push(token);
	    this.tokens_meta.push(token_meta);
	    return token;
	};
	// Scan a sequence of emphasis-like markers, and determine whether
	// it can start an emphasis sequence or end an emphasis sequence.
	//
	//  - start - position to scan from (it should point at a valid marker);
	//  - canSplitWord - determine if these markers can be found inside a word
	//
	StateInline.prototype.scanDelims = function(start, canSplitWord) {
	    var max = this.posMax;
	    var marker = this.src.charCodeAt(start);
	    // treat beginning of the line as a whitespace
	    var lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;
	    var pos = start;
	    while(pos < max && this.src.charCodeAt(pos) === marker){
	        pos++;
	    }
	    var count = pos - start;
	    // treat end of the line as a whitespace
	    var nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;
	    var isLastPunctChar = isMdAsciiPunct(lastChar) || isPunctChar(String.fromCharCode(lastChar));
	    var isNextPunctChar = isMdAsciiPunct(nextChar) || isPunctChar(String.fromCharCode(nextChar));
	    var isLastWhiteSpace = isWhiteSpace(lastChar);
	    var isNextWhiteSpace = isWhiteSpace(nextChar);
	    var left_flanking = !isNextWhiteSpace && (!isNextPunctChar || isLastWhiteSpace || isLastPunctChar);
	    var right_flanking = !isLastWhiteSpace && (!isLastPunctChar || isNextWhiteSpace || isNextPunctChar);
	    var can_open = left_flanking && (canSplitWord || !right_flanking || isLastPunctChar);
	    var can_close = right_flanking && (canSplitWord || !left_flanking || isNextPunctChar);
	    return {
	        can_open: can_open,
	        can_close: can_close,
	        length: count
	    };
	};
	// re-export Token class to use in block rules
	StateInline.prototype.Token = Token;

	// Skip text characters for text token, place those to pending buffer
	// and increment current pos
	// Rule to skip pure text
	// '{}$%@~+=:' reserved for extentions
	// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
	// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
	// http://spec.commonmark.org/0.15/#ascii-punctuation-character
	function isTerminatorChar(ch) {
	    switch(ch){
	        case 0x0A /* \n */ :
	        case 0x21 /* ! */ :
	        case 0x23 /* # */ :
	        case 0x24 /* $ */ :
	        case 0x25 /* % */ :
	        case 0x26 /* & */ :
	        case 0x2A /* * */ :
	        case 0x2B /* + */ :
	        case 0x2D /* - */ :
	        case 0x3A /* : */ :
	        case 0x3C /* < */ :
	        case 0x3D /* = */ :
	        case 0x3E /* > */ :
	        case 0x40 /* @ */ :
	        case 0x5B /* [ */ :
	        case 0x5C /* \ */ :
	        case 0x5D /* ] */ :
	        case 0x5E /* ^ */ :
	        case 0x5F /* _ */ :
	        case 0x60 /* ` */ :
	        case 0x7B /* { */ :
	        case 0x7D /* } */ :
	        case 0x7E /* ~ */ :
	            return true;
	        default:
	            return false;
	    }
	}
	function text(state, silent) {
	    var pos = state.pos;
	    while(pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))){
	        pos++;
	    }
	    if (pos === state.pos) {
	        return false;
	    }
	    if (!silent) {
	        state.pending += state.src.slice(state.pos, pos);
	    }
	    state.pos = pos;
	    return true;
	} // Alternative implementation, for memory.
	 //
	 // It costs 10% of performance, but allows extend terminators list, if place it
	 // to `ParserInline` property. Probably, will switch to it sometime, such
	 // flexibility required.
	 /*
	var TERMINATOR_RE = /[\n!#$%&*+\-:<=>@[\\\]^_`{}~]/;

	module.exports = function text(state, silent) {
	  var pos = state.pos,
	      idx = state.src.slice(pos).search(TERMINATOR_RE);

	  // first char is terminator -> empty text
	  if (idx === 0) { return false; }

	  // no terminator -> text till end of string
	  if (idx < 0) {
	    if (!silent) { state.pending += state.src.slice(pos); }
	    state.pos = state.src.length;
	    return true;
	  }

	  if (!silent) { state.pending += state.src.slice(pos, pos + idx); }

	  state.pos += idx;

	  return true;
	}; */

	// Process links like https://example.org/
	// RFC3986: scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
	var SCHEME_RE = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
	function linkify(state, silent) {
	    if (!state.md.options.linkify) return false;
	    if (state.linkLevel > 0) return false;
	    var pos = state.pos;
	    var max = state.posMax;
	    if (pos + 3 > max) return false;
	    if (state.src.charCodeAt(pos) !== 0x3A /* : */ ) return false;
	    if (state.src.charCodeAt(pos + 1) !== 0x2F /* / */ ) return false;
	    if (state.src.charCodeAt(pos + 2) !== 0x2F /* / */ ) return false;
	    var match = state.pending.match(SCHEME_RE);
	    if (!match) return false;
	    var proto = match[1];
	    var link = state.md.linkify.matchAtStart(state.src.slice(pos - proto.length));
	    if (!link) return false;
	    var url = link.url;
	    // invalid link, but still detected by linkify somehow;
	    // need to check to prevent infinite loop below
	    if (url.length <= proto.length) return false;
	    // disallow '*' at the end of the link (conflicts with emphasis)
	    url = url.replace(/\*+$/, '');
	    var fullUrl = state.md.normalizeLink(url);
	    if (!state.md.validateLink(fullUrl)) return false;
	    if (!silent) {
	        state.pending = state.pending.slice(0, -proto.length);
	        var token_o = state.push('link_open', 'a', 1);
	        token_o.attrs = [
	            [
	                'href',
	                fullUrl
	            ]
	        ];
	        token_o.markup = 'linkify';
	        token_o.info = 'auto';
	        var token_t = state.push('text', '', 0);
	        token_t.content = state.md.normalizeLinkText(url);
	        var token_c = state.push('link_close', 'a', -1);
	        token_c.markup = 'linkify';
	        token_c.info = 'auto';
	    }
	    state.pos += url.length - proto.length;
	    return true;
	}

	// Proceess '\n'
	function newline(state, silent) {
	    var pos = state.pos;
	    if (state.src.charCodeAt(pos) !== 0x0A /* \n */ ) {
	        return false;
	    }
	    var pmax = state.pending.length - 1;
	    var max = state.posMax;
	    // '  \n' -> hardbreak
	    // Lookup in pending chars is bad practice! Don't copy to other rules!
	    // Pending string is stored in concat mode, indexed lookups will cause
	    // convertion to flat mode.
	    if (!silent) {
	        if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
	            if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
	                // Find whitespaces tail of pending chars.
	                var ws = pmax - 1;
	                while(ws >= 1 && state.pending.charCodeAt(ws - 1) === 0x20)ws--;
	                state.pending = state.pending.slice(0, ws);
	                state.push('hardbreak', 'br', 0);
	            } else {
	                state.pending = state.pending.slice(0, -1);
	                state.push('softbreak', 'br', 0);
	            }
	        } else {
	            state.push('softbreak', 'br', 0);
	        }
	    }
	    pos++;
	    // skip heading spaces for next line
	    while(pos < max && isSpace(state.src.charCodeAt(pos))){
	        pos++;
	    }
	    state.pos = pos;
	    return true;
	}

	// Process escaped chars and hardbreaks
	var ESCAPED = [];
	for(var i = 0; i < 256; i++){
	    ESCAPED.push(0);
	}
	'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'.split('').forEach(function(ch) {
	    ESCAPED[ch.charCodeAt(0)] = 1;
	});
	function escape(state, silent) {
	    var pos = state.pos;
	    var max = state.posMax;
	    if (state.src.charCodeAt(pos) !== 0x5C /* \ */ ) return false;
	    pos++;
	    // '\' at the end of the inline block
	    if (pos >= max) return false;
	    var ch1 = state.src.charCodeAt(pos);
	    if (ch1 === 0x0A) {
	        if (!silent) {
	            state.push('hardbreak', 'br', 0);
	        }
	        pos++;
	        // skip leading whitespaces from next line
	        while(pos < max){
	            ch1 = state.src.charCodeAt(pos);
	            if (!isSpace(ch1)) break;
	            pos++;
	        }
	        state.pos = pos;
	        return true;
	    }
	    var escapedStr = state.src[pos];
	    if (ch1 >= 0xD800 && ch1 <= 0xDBFF && pos + 1 < max) {
	        var ch2 = state.src.charCodeAt(pos + 1);
	        if (ch2 >= 0xDC00 && ch2 <= 0xDFFF) {
	            escapedStr += state.src[pos + 1];
	            pos++;
	        }
	    }
	    var origStr = '\\' + escapedStr;
	    if (!silent) {
	        var token = state.push('text_special', '', 0);
	        if (ch1 < 256 && ESCAPED[ch1] !== 0) {
	            token.content = escapedStr;
	        } else {
	            token.content = origStr;
	        }
	        token.markup = origStr;
	        token.info = 'escape';
	    }
	    state.pos = pos + 1;
	    return true;
	}

	// Parse backticks
	function backtick(state, silent) {
	    var pos = state.pos;
	    var ch = state.src.charCodeAt(pos);
	    if (ch !== 0x60 /* ` */ ) {
	        return false;
	    }
	    var start = pos;
	    pos++;
	    var max = state.posMax;
	    // scan marker length
	    while(pos < max && state.src.charCodeAt(pos) === 0x60 /* ` */ ){
	        pos++;
	    }
	    var marker = state.src.slice(start, pos);
	    var openerLength = marker.length;
	    if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
	        if (!silent) state.pending += marker;
	        state.pos += openerLength;
	        return true;
	    }
	    var matchEnd = pos;
	    var matchStart;
	    // Nothing found in the cache, scan until the end of the line (or until marker is found)
	    while((matchStart = state.src.indexOf('`', matchEnd)) !== -1){
	        matchEnd = matchStart + 1;
	        // scan marker length
	        while(matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60 /* ` */ ){
	            matchEnd++;
	        }
	        var closerLength = matchEnd - matchStart;
	        if (closerLength === openerLength) {
	            // Found matching closer length.
	            if (!silent) {
	                var token = state.push('code_inline', 'code', 0);
	                token.markup = marker;
	                token.content = state.src.slice(pos, matchStart).replace(/\n/g, ' ').replace(/^ (.+) $/, '$1');
	            }
	            state.pos = matchEnd;
	            return true;
	        }
	        // Some different length found, put it in cache as upper limit of where closer can be found
	        state.backticks[closerLength] = matchStart;
	    }
	    // Scanned through the end, didn't find anything
	    state.backticksScanned = true;
	    if (!silent) state.pending += marker;
	    state.pos += openerLength;
	    return true;
	}

	// ~~strike through~~
	//
	// Insert each marker as a separate text token, and add it to delimiter list
	//
	function strikethrough_tokenize(state, silent) {
	    var start = state.pos;
	    var marker = state.src.charCodeAt(start);
	    if (silent) {
	        return false;
	    }
	    if (marker !== 0x7E /* ~ */ ) {
	        return false;
	    }
	    var scanned = state.scanDelims(state.pos, true);
	    var len = scanned.length;
	    var ch = String.fromCharCode(marker);
	    if (len < 2) {
	        return false;
	    }
	    var token;
	    if (len % 2) {
	        token = state.push('text', '', 0);
	        token.content = ch;
	        len--;
	    }
	    for(var i = 0; i < len; i += 2){
	        token = state.push('text', '', 0);
	        token.content = ch + ch;
	        state.delimiters.push({
	            marker: marker,
	            length: 0,
	            token: state.tokens.length - 1,
	            end: -1,
	            open: scanned.can_open,
	            close: scanned.can_close
	        });
	    }
	    state.pos += scanned.length;
	    return true;
	}
	function postProcess$1(state, delimiters) {
	    var token;
	    var loneMarkers = [];
	    var max = delimiters.length;
	    for(var i = 0; i < max; i++){
	        var startDelim = delimiters[i];
	        if (startDelim.marker !== 0x7E /* ~ */ ) {
	            continue;
	        }
	        if (startDelim.end === -1) {
	            continue;
	        }
	        var endDelim = delimiters[startDelim.end];
	        token = state.tokens[startDelim.token];
	        token.type = 's_open';
	        token.tag = 's';
	        token.nesting = 1;
	        token.markup = '~~';
	        token.content = '';
	        token = state.tokens[endDelim.token];
	        token.type = 's_close';
	        token.tag = 's';
	        token.nesting = -1;
	        token.markup = '~~';
	        token.content = '';
	        if (state.tokens[endDelim.token - 1].type === 'text' && state.tokens[endDelim.token - 1].content === '~') {
	            loneMarkers.push(endDelim.token - 1);
	        }
	    }
	    // If a marker sequence has an odd number of characters, it's splitted
	    // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
	    // start of the sequence.
	    //
	    // So, we have to move all those markers after subsequent s_close tags.
	    //
	    while(loneMarkers.length){
	        var i1 = loneMarkers.pop();
	        var j = i1 + 1;
	        while(j < state.tokens.length && state.tokens[j].type === 's_close'){
	            j++;
	        }
	        j--;
	        if (i1 !== j) {
	            token = state.tokens[j];
	            state.tokens[j] = state.tokens[i1];
	            state.tokens[i1] = token;
	        }
	    }
	}
	// Walk through delimiter list and replace text tokens with tags
	//
	function strikethrough_postProcess(state) {
	    var tokens_meta = state.tokens_meta;
	    var max = state.tokens_meta.length;
	    postProcess$1(state, state.delimiters);
	    for(var curr = 0; curr < max; curr++){
	        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
	            postProcess$1(state, tokens_meta[curr].delimiters);
	        }
	    }
	}
	var r_strikethrough = {
	    tokenize: strikethrough_tokenize,
	    postProcess: strikethrough_postProcess
	};

	// Process *this* and _that_
	//
	// Insert each marker as a separate text token, and add it to delimiter list
	//
	function emphasis_tokenize(state, silent) {
	    var start = state.pos;
	    var marker = state.src.charCodeAt(start);
	    if (silent) {
	        return false;
	    }
	    if (marker !== 0x5F /* _ */  && marker !== 0x2A /* * */ ) {
	        return false;
	    }
	    var scanned = state.scanDelims(state.pos, marker === 0x2A);
	    for(var i = 0; i < scanned.length; i++){
	        var token = state.push('text', '', 0);
	        token.content = String.fromCharCode(marker);
	        state.delimiters.push({
	            // Char code of the starting marker (number).
	            //
	            marker: marker,
	            // Total length of these series of delimiters.
	            //
	            length: scanned.length,
	            // A position of the token this delimiter corresponds to.
	            //
	            token: state.tokens.length - 1,
	            // If this delimiter is matched as a valid opener, `end` will be
	            // equal to its position, otherwise it's `-1`.
	            //
	            end: -1,
	            // Boolean flags that determine if this delimiter could open or close
	            // an emphasis.
	            //
	            open: scanned.can_open,
	            close: scanned.can_close
	        });
	    }
	    state.pos += scanned.length;
	    return true;
	}
	function postProcess(state, delimiters) {
	    var max = delimiters.length;
	    for(var i = max - 1; i >= 0; i--){
	        var startDelim = delimiters[i];
	        if (startDelim.marker !== 0x5F /* _ */  && startDelim.marker !== 0x2A /* * */ ) {
	            continue;
	        }
	        // Process only opening markers
	        if (startDelim.end === -1) {
	            continue;
	        }
	        var endDelim = delimiters[startDelim.end];
	        // If the previous delimiter has the same marker and is adjacent to this one,
	        // merge those into one strong delimiter.
	        //
	        // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
	        //
	        var isStrong = i > 0 && delimiters[i - 1].end === startDelim.end + 1 && // check that first two markers match and adjacent
	        delimiters[i - 1].marker === startDelim.marker && delimiters[i - 1].token === startDelim.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
	        delimiters[startDelim.end + 1].token === endDelim.token + 1;
	        var ch = String.fromCharCode(startDelim.marker);
	        var token_o = state.tokens[startDelim.token];
	        token_o.type = isStrong ? 'strong_open' : 'em_open';
	        token_o.tag = isStrong ? 'strong' : 'em';
	        token_o.nesting = 1;
	        token_o.markup = isStrong ? ch + ch : ch;
	        token_o.content = '';
	        var token_c = state.tokens[endDelim.token];
	        token_c.type = isStrong ? 'strong_close' : 'em_close';
	        token_c.tag = isStrong ? 'strong' : 'em';
	        token_c.nesting = -1;
	        token_c.markup = isStrong ? ch + ch : ch;
	        token_c.content = '';
	        if (isStrong) {
	            state.tokens[delimiters[i - 1].token].content = '';
	            state.tokens[delimiters[startDelim.end + 1].token].content = '';
	            i--;
	        }
	    }
	}
	// Walk through delimiter list and replace text tokens with tags
	//
	function emphasis_post_process(state) {
	    var tokens_meta = state.tokens_meta;
	    var max = state.tokens_meta.length;
	    postProcess(state, state.delimiters);
	    for(var curr = 0; curr < max; curr++){
	        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
	            postProcess(state, tokens_meta[curr].delimiters);
	        }
	    }
	}
	var r_emphasis = {
	    tokenize: emphasis_tokenize,
	    postProcess: emphasis_post_process
	};

	// Process [link](<to> "stuff")
	function link(state, silent) {
	    var code, label, res, ref;
	    var href = '';
	    var title = '';
	    var start = state.pos;
	    var parseReference = true;
	    if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */ ) {
	        return false;
	    }
	    var oldPos = state.pos;
	    var max = state.posMax;
	    var labelStart = state.pos + 1;
	    var labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);
	    // parser failed to find ']', so it's not a valid link
	    if (labelEnd < 0) {
	        return false;
	    }
	    var pos = labelEnd + 1;
	    if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */ ) {
	        //
	        // Inline link
	        //
	        // might have found a valid shortcut link, disable reference parsing
	        parseReference = false;
	        // [link](  <href>  "title"  )
	        //        ^^ skipping these spaces
	        pos++;
	        for(; pos < max; pos++){
	            code = state.src.charCodeAt(pos);
	            if (!isSpace(code) && code !== 0x0A) {
	                break;
	            }
	        }
	        if (pos >= max) {
	            return false;
	        }
	        // [link](  <href>  "title"  )
	        //          ^^^^^^ parsing link destination
	        start = pos;
	        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
	        if (res.ok) {
	            href = state.md.normalizeLink(res.str);
	            if (state.md.validateLink(href)) {
	                pos = res.pos;
	            } else {
	                href = '';
	            }
	            // [link](  <href>  "title"  )
	            //                ^^ skipping these spaces
	            start = pos;
	            for(; pos < max; pos++){
	                code = state.src.charCodeAt(pos);
	                if (!isSpace(code) && code !== 0x0A) {
	                    break;
	                }
	            }
	            // [link](  <href>  "title"  )
	            //                  ^^^^^^^ parsing link title
	            res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
	            if (pos < max && start !== pos && res.ok) {
	                title = res.str;
	                pos = res.pos;
	                // [link](  <href>  "title"  )
	                //                         ^^ skipping these spaces
	                for(; pos < max; pos++){
	                    code = state.src.charCodeAt(pos);
	                    if (!isSpace(code) && code !== 0x0A) {
	                        break;
	                    }
	                }
	            }
	        }
	        if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */ ) {
	            // parsing a valid shortcut link failed, fallback to reference
	            parseReference = true;
	        }
	        pos++;
	    }
	    if (parseReference) {
	        //
	        // Link reference
	        //
	        if (typeof state.env.references === 'undefined') {
	            return false;
	        }
	        if (pos < max && state.src.charCodeAt(pos) === 0x5B /* [ */ ) {
	            start = pos + 1;
	            pos = state.md.helpers.parseLinkLabel(state, pos);
	            if (pos >= 0) {
	                label = state.src.slice(start, pos++);
	            } else {
	                pos = labelEnd + 1;
	            }
	        } else {
	            pos = labelEnd + 1;
	        }
	        // covers label === '' and label === undefined
	        // (collapsed reference link and shortcut reference link respectively)
	        if (!label) {
	            label = state.src.slice(labelStart, labelEnd);
	        }
	        ref = state.env.references[normalizeReference(label)];
	        if (!ref) {
	            state.pos = oldPos;
	            return false;
	        }
	        href = ref.href;
	        title = ref.title;
	    }
	    //
	    // We found the end of the link, and know for a fact it's a valid link;
	    // so all that's left to do is to call tokenizer.
	    //
	    if (!silent) {
	        state.pos = labelStart;
	        state.posMax = labelEnd;
	        var token_o = state.push('link_open', 'a', 1);
	        var attrs = [
	            [
	                'href',
	                href
	            ]
	        ];
	        token_o.attrs = attrs;
	        if (title) {
	            attrs.push([
	                'title',
	                title
	            ]);
	        }
	        state.linkLevel++;
	        state.md.inline.tokenize(state);
	        state.linkLevel--;
	        state.push('link_close', 'a', -1);
	    }
	    state.pos = pos;
	    state.posMax = max;
	    return true;
	}

	// Process ![image](<src> "title")
	function image(state, silent) {
	    var code, content, label, pos, ref, res, title, start;
	    var href = '';
	    var oldPos = state.pos;
	    var max = state.posMax;
	    if (state.src.charCodeAt(state.pos) !== 0x21 /* ! */ ) {
	        return false;
	    }
	    if (state.src.charCodeAt(state.pos + 1) !== 0x5B /* [ */ ) {
	        return false;
	    }
	    var labelStart = state.pos + 2;
	    var labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);
	    // parser failed to find ']', so it's not a valid link
	    if (labelEnd < 0) {
	        return false;
	    }
	    pos = labelEnd + 1;
	    if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */ ) {
	        //
	        // Inline link
	        //
	        // [link](  <href>  "title"  )
	        //        ^^ skipping these spaces
	        pos++;
	        for(; pos < max; pos++){
	            code = state.src.charCodeAt(pos);
	            if (!isSpace(code) && code !== 0x0A) {
	                break;
	            }
	        }
	        if (pos >= max) {
	            return false;
	        }
	        // [link](  <href>  "title"  )
	        //          ^^^^^^ parsing link destination
	        start = pos;
	        res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
	        if (res.ok) {
	            href = state.md.normalizeLink(res.str);
	            if (state.md.validateLink(href)) {
	                pos = res.pos;
	            } else {
	                href = '';
	            }
	        }
	        // [link](  <href>  "title"  )
	        //                ^^ skipping these spaces
	        start = pos;
	        for(; pos < max; pos++){
	            code = state.src.charCodeAt(pos);
	            if (!isSpace(code) && code !== 0x0A) {
	                break;
	            }
	        }
	        // [link](  <href>  "title"  )
	        //                  ^^^^^^^ parsing link title
	        res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
	        if (pos < max && start !== pos && res.ok) {
	            title = res.str;
	            pos = res.pos;
	            // [link](  <href>  "title"  )
	            //                         ^^ skipping these spaces
	            for(; pos < max; pos++){
	                code = state.src.charCodeAt(pos);
	                if (!isSpace(code) && code !== 0x0A) {
	                    break;
	                }
	            }
	        } else {
	            title = '';
	        }
	        if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */ ) {
	            state.pos = oldPos;
	            return false;
	        }
	        pos++;
	    } else {
	        //
	        // Link reference
	        //
	        if (typeof state.env.references === 'undefined') {
	            return false;
	        }
	        if (pos < max && state.src.charCodeAt(pos) === 0x5B /* [ */ ) {
	            start = pos + 1;
	            pos = state.md.helpers.parseLinkLabel(state, pos);
	            if (pos >= 0) {
	                label = state.src.slice(start, pos++);
	            } else {
	                pos = labelEnd + 1;
	            }
	        } else {
	            pos = labelEnd + 1;
	        }
	        // covers label === '' and label === undefined
	        // (collapsed reference link and shortcut reference link respectively)
	        if (!label) {
	            label = state.src.slice(labelStart, labelEnd);
	        }
	        ref = state.env.references[normalizeReference(label)];
	        if (!ref) {
	            state.pos = oldPos;
	            return false;
	        }
	        href = ref.href;
	        title = ref.title;
	    }
	    //
	    // We found the end of the link, and know for a fact it's a valid link;
	    // so all that's left to do is to call tokenizer.
	    //
	    if (!silent) {
	        content = state.src.slice(labelStart, labelEnd);
	        var tokens = [];
	        state.md.inline.parse(content, state.md, state.env, tokens);
	        var token = state.push('image', 'img', 0);
	        var attrs = [
	            [
	                'src',
	                href
	            ],
	            [
	                'alt',
	                ''
	            ]
	        ];
	        token.attrs = attrs;
	        token.children = tokens;
	        token.content = content;
	        if (title) {
	            attrs.push([
	                'title',
	                title
	            ]);
	        }
	    }
	    state.pos = pos;
	    state.posMax = max;
	    return true;
	}

	// Process autolinks '<protocol:...>'
	/* eslint max-len:0 */ var EMAIL_RE = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/;
	/* eslint-disable-next-line no-control-regex */ var AUTOLINK_RE = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
	function autolink(state, silent) {
	    var pos = state.pos;
	    if (state.src.charCodeAt(pos) !== 0x3C /* < */ ) {
	        return false;
	    }
	    var start = state.pos;
	    var max = state.posMax;
	    for(;;){
	        if (++pos >= max) return false;
	        var ch = state.src.charCodeAt(pos);
	        if (ch === 0x3C /* < */ ) return false;
	        if (ch === 0x3E /* > */ ) break;
	    }
	    var url = state.src.slice(start + 1, pos);
	    if (AUTOLINK_RE.test(url)) {
	        var fullUrl = state.md.normalizeLink(url);
	        if (!state.md.validateLink(fullUrl)) {
	            return false;
	        }
	        if (!silent) {
	            var token_o = state.push('link_open', 'a', 1);
	            token_o.attrs = [
	                [
	                    'href',
	                    fullUrl
	                ]
	            ];
	            token_o.markup = 'autolink';
	            token_o.info = 'auto';
	            var token_t = state.push('text', '', 0);
	            token_t.content = state.md.normalizeLinkText(url);
	            var token_c = state.push('link_close', 'a', -1);
	            token_c.markup = 'autolink';
	            token_c.info = 'auto';
	        }
	        state.pos += url.length + 2;
	        return true;
	    }
	    if (EMAIL_RE.test(url)) {
	        var fullUrl1 = state.md.normalizeLink('mailto:' + url);
	        if (!state.md.validateLink(fullUrl1)) {
	            return false;
	        }
	        if (!silent) {
	            var token_o1 = state.push('link_open', 'a', 1);
	            token_o1.attrs = [
	                [
	                    'href',
	                    fullUrl1
	                ]
	            ];
	            token_o1.markup = 'autolink';
	            token_o1.info = 'auto';
	            var token_t1 = state.push('text', '', 0);
	            token_t1.content = state.md.normalizeLinkText(url);
	            var token_c1 = state.push('link_close', 'a', -1);
	            token_c1.markup = 'autolink';
	            token_c1.info = 'auto';
	        }
	        state.pos += url.length + 2;
	        return true;
	    }
	    return false;
	}

	// Process html tags
	function isLinkOpen(str) {
	    return /^<a[>\s]/i.test(str);
	}
	function isLinkClose(str) {
	    return /^<\/a\s*>/i.test(str);
	}
	function isLetter(ch) {
	    /* eslint no-bitwise:0 */ var lc = ch | 0x20 // to lower case
	    ;
	    return lc >= 0x61 /* a */  && lc <= 0x7a /* z */ ;
	}
	function html_inline(state, silent) {
	    if (!state.md.options.html) {
	        return false;
	    }
	    // Check start
	    var max = state.posMax;
	    var pos = state.pos;
	    if (state.src.charCodeAt(pos) !== 0x3C /* < */  || pos + 2 >= max) {
	        return false;
	    }
	    // Quick fail on second char
	    var ch = state.src.charCodeAt(pos + 1);
	    if (ch !== 0x21 /* ! */  && ch !== 0x3F /* ? */  && ch !== 0x2F /* / */  && !isLetter(ch)) {
	        return false;
	    }
	    var match = state.src.slice(pos).match(HTML_TAG_RE);
	    if (!match) {
	        return false;
	    }
	    if (!silent) {
	        var token = state.push('html_inline', '', 0);
	        token.content = match[0];
	        if (isLinkOpen(token.content)) state.linkLevel++;
	        if (isLinkClose(token.content)) state.linkLevel--;
	    }
	    state.pos += match[0].length;
	    return true;
	}

	// Process html entity - &#123;, &#xAF;, &quot;, ...
	var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
	var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;
	function entity(state, silent) {
	    var pos = state.pos;
	    var max = state.posMax;
	    if (state.src.charCodeAt(pos) !== 0x26 /* & */ ) return false;
	    if (pos + 1 >= max) return false;
	    var ch = state.src.charCodeAt(pos + 1);
	    if (ch === 0x23 /* # */ ) {
	        var match = state.src.slice(pos).match(DIGITAL_RE);
	        if (match) {
	            if (!silent) {
	                var code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
	                var token = state.push('text_special', '', 0);
	                token.content = isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
	                token.markup = match[0];
	                token.info = 'entity';
	            }
	            state.pos += match[0].length;
	            return true;
	        }
	    } else {
	        var match1 = state.src.slice(pos).match(NAMED_RE);
	        if (match1) {
	            var decoded = decodeHTML(match1[0]);
	            if (decoded !== match1[0]) {
	                if (!silent) {
	                    var token1 = state.push('text_special', '', 0);
	                    token1.content = decoded;
	                    token1.markup = match1[0];
	                    token1.info = 'entity';
	                }
	                state.pos += match1[0].length;
	                return true;
	            }
	        }
	    }
	    return false;
	}

	// For each opening emphasis-like marker find a matching closing one
	//
	function processDelimiters(delimiters) {
	    var openersBottom = {};
	    var max = delimiters.length;
	    if (!max) return;
	    // headerIdx is the first delimiter of the current (where closer is) delimiter run
	    var headerIdx = 0;
	    var lastTokenIdx = -2 // needs any value lower than -1
	    ;
	    var jumps = [];
	    for(var closerIdx = 0; closerIdx < max; closerIdx++){
	        var closer = delimiters[closerIdx];
	        jumps.push(0);
	        // markers belong to same delimiter run if:
	        //  - they have adjacent tokens
	        //  - AND markers are the same
	        //
	        if (delimiters[headerIdx].marker !== closer.marker || lastTokenIdx !== closer.token - 1) {
	            headerIdx = closerIdx;
	        }
	        lastTokenIdx = closer.token;
	        // Length is only used for emphasis-specific "rule of 3",
	        // if it's not defined (in strikethrough or 3rd party plugins),
	        // we can default it to 0 to disable those checks.
	        //
	        closer.length = closer.length || 0;
	        if (!closer.close) continue;
	        // Previously calculated lower bounds (previous fails)
	        // for each marker, each delimiter length modulo 3,
	        // and for whether this closer can be an opener;
	        // https://github.com/commonmark/cmark/commit/34250e12ccebdc6372b8b49c44fab57c72443460
	        /* eslint-disable-next-line no-prototype-builtins */ if (!openersBottom.hasOwnProperty(closer.marker)) {
	            openersBottom[closer.marker] = [
	                -1,
	                -1,
	                -1,
	                -1,
	                -1,
	                -1
	            ];
	        }
	        var minOpenerIdx = openersBottom[closer.marker][(closer.open ? 3 : 0) + closer.length % 3];
	        var openerIdx = headerIdx - jumps[headerIdx] - 1;
	        var newMinOpenerIdx = openerIdx;
	        for(; openerIdx > minOpenerIdx; openerIdx -= jumps[openerIdx] + 1){
	            var opener = delimiters[openerIdx];
	            if (opener.marker !== closer.marker) continue;
	            if (opener.open && opener.end < 0) {
	                var isOddMatch = false;
	                // from spec:
	                //
	                // If one of the delimiters can both open and close emphasis, then the
	                // sum of the lengths of the delimiter runs containing the opening and
	                // closing delimiters must not be a multiple of 3 unless both lengths
	                // are multiples of 3.
	                //
	                if (opener.close || closer.open) {
	                    if ((opener.length + closer.length) % 3 === 0) {
	                        if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
	                            isOddMatch = true;
	                        }
	                    }
	                }
	                if (!isOddMatch) {
	                    // If previous delimiter cannot be an opener, we can safely skip
	                    // the entire sequence in future checks. This is required to make
	                    // sure algorithm has linear complexity (see *_*_*_*_*_... case).
	                    //
	                    var lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ? jumps[openerIdx - 1] + 1 : 0;
	                    jumps[closerIdx] = closerIdx - openerIdx + lastJump;
	                    jumps[openerIdx] = lastJump;
	                    closer.open = false;
	                    opener.end = closerIdx;
	                    opener.close = false;
	                    newMinOpenerIdx = -1;
	                    // treat next token as start of run,
	                    // it optimizes skips in **<...>**a**<...>** pathological case
	                    lastTokenIdx = -2;
	                    break;
	                }
	            }
	        }
	        if (newMinOpenerIdx !== -1) {
	            // If match for this delimiter run failed, we want to set lower bound for
	            // future lookups. This is required to make sure algorithm has linear
	            // complexity.
	            //
	            // See details here:
	            // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
	            //
	            openersBottom[closer.marker][(closer.open ? 3 : 0) + (closer.length || 0) % 3] = newMinOpenerIdx;
	        }
	    }
	}
	function link_pairs(state) {
	    var tokens_meta = state.tokens_meta;
	    var max = state.tokens_meta.length;
	    processDelimiters(state.delimiters);
	    for(var curr = 0; curr < max; curr++){
	        if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
	            processDelimiters(tokens_meta[curr].delimiters);
	        }
	    }
	}

	// Clean up tokens after emphasis and strikethrough postprocessing:
	// merge adjacent text nodes into one and re-calculate all token levels
	//
	// This is necessary because initially emphasis delimiter markers (*, _, ~)
	// are treated as their own separate text tokens. Then emphasis rule either
	// leaves them as text (needed to merge with adjacent text) or turns them
	// into opening/closing tags (which messes up levels inside).
	//
	function fragments_join(state) {
	    var curr, last;
	    var level = 0;
	    var tokens = state.tokens;
	    var max = state.tokens.length;
	    for(curr = last = 0; curr < max; curr++){
	        // re-calculate levels after emphasis/strikethrough turns some text nodes
	        // into opening/closing tags
	        if (tokens[curr].nesting < 0) level-- // closing tag
	        ;
	        tokens[curr].level = level;
	        if (tokens[curr].nesting > 0) level++ // opening tag
	        ;
	        if (tokens[curr].type === 'text' && curr + 1 < max && tokens[curr + 1].type === 'text') {
	            // collapse two adjacent text nodes
	            tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
	        } else {
	            if (curr !== last) {
	                tokens[last] = tokens[curr];
	            }
	            last++;
	        }
	    }
	    if (curr !== last) {
	        tokens.length = last;
	    }
	}

	// Parser rules
	var _rules = [
	    [
	        'text',
	        text
	    ],
	    [
	        'linkify',
	        linkify
	    ],
	    [
	        'newline',
	        newline
	    ],
	    [
	        'escape',
	        escape
	    ],
	    [
	        'backticks',
	        backtick
	    ],
	    [
	        'strikethrough',
	        r_strikethrough.tokenize
	    ],
	    [
	        'emphasis',
	        r_emphasis.tokenize
	    ],
	    [
	        'link',
	        link
	    ],
	    [
	        'image',
	        image
	    ],
	    [
	        'autolink',
	        autolink
	    ],
	    [
	        'html_inline',
	        html_inline
	    ],
	    [
	        'entity',
	        entity
	    ]
	];
	// `rule2` ruleset was created specifically for emphasis/strikethrough
	// post-processing and may be changed in the future.
	//
	// Don't use this for anything except pairs (plugins working with `balance_pairs`).
	//
	var _rules2 = [
	    [
	        'balance_pairs',
	        link_pairs
	    ],
	    [
	        'strikethrough',
	        r_strikethrough.postProcess
	    ],
	    [
	        'emphasis',
	        r_emphasis.postProcess
	    ],
	    // rules for pairs separate '**' into its own text tokens, which may be left unused,
	    // rule below merges unused segments back with the rest of the text
	    [
	        'fragments_join',
	        fragments_join
	    ]
	];
	/**
	 * new ParserInline()
	 **/ function ParserInline() {
	    /**
	   * ParserInline#ruler -> Ruler
	   *
	   * [[Ruler]] instance. Keep configuration of inline rules.
	   **/ this.ruler = new Ruler();
	    for(var i = 0; i < _rules.length; i++){
	        this.ruler.push(_rules[i][0], _rules[i][1]);
	    }
	    /**
	   * ParserInline#ruler2 -> Ruler
	   *
	   * [[Ruler]] instance. Second ruler used for post-processing
	   * (e.g. in emphasis-like rules).
	   **/ this.ruler2 = new Ruler();
	    for(var i1 = 0; i1 < _rules2.length; i1++){
	        this.ruler2.push(_rules2[i1][0], _rules2[i1][1]);
	    }
	}
	// Skip single token by running all rules in validation mode;
	// returns `true` if any rule reported success
	//
	ParserInline.prototype.skipToken = function(state) {
	    var pos = state.pos;
	    var rules = this.ruler.getRules('');
	    var len = rules.length;
	    var maxNesting = state.md.options.maxNesting;
	    var cache = state.cache;
	    if (typeof cache[pos] !== 'undefined') {
	        state.pos = cache[pos];
	        return;
	    }
	    var ok = false;
	    if (state.level < maxNesting) {
	        for(var i = 0; i < len; i++){
	            // Increment state.level and decrement it later to limit recursion.
	            // It's harmless to do here, because no tokens are created. But ideally,
	            // we'd need a separate private state variable for this purpose.
	            //
	            state.level++;
	            ok = rules[i](state, true);
	            state.level--;
	            if (ok) {
	                if (pos >= state.pos) {
	                    throw new Error("inline rule didn't increment state.pos");
	                }
	                break;
	            }
	        }
	    } else {
	        // Too much nesting, just skip until the end of the paragraph.
	        //
	        // NOTE: this will cause links to behave incorrectly in the following case,
	        //       when an amount of `[` is exactly equal to `maxNesting + 1`:
	        //
	        //       [[[[[[[[[[[[[[[[[[[[[foo]()
	        //
	        // TODO: remove this workaround when CM standard will allow nested links
	        //       (we can replace it by preventing links from being parsed in
	        //       validation mode)
	        //
	        state.pos = state.posMax;
	    }
	    if (!ok) {
	        state.pos++;
	    }
	    cache[pos] = state.pos;
	};
	// Generate tokens for input range
	//
	ParserInline.prototype.tokenize = function(state) {
	    var rules = this.ruler.getRules('');
	    var len = rules.length;
	    var end = state.posMax;
	    var maxNesting = state.md.options.maxNesting;
	    while(state.pos < end){
	        // Try all possible rules.
	        // On success, rule should:
	        //
	        // - update `state.pos`
	        // - update `state.tokens`
	        // - return true
	        var prevPos = state.pos;
	        var ok = false;
	        if (state.level < maxNesting) {
	            for(var i = 0; i < len; i++){
	                ok = rules[i](state, false);
	                if (ok) {
	                    if (prevPos >= state.pos) {
	                        throw new Error("inline rule didn't increment state.pos");
	                    }
	                    break;
	                }
	            }
	        }
	        if (ok) {
	            if (state.pos >= end) {
	                break;
	            }
	            continue;
	        }
	        state.pending += state.src[state.pos++];
	    }
	    if (state.pending) {
	        state.pushPending();
	    }
	};
	/**
	 * ParserInline.parse(str, md, env, outTokens)
	 *
	 * Process input string and push inline tokens into `outTokens`
	 **/ ParserInline.prototype.parse = function(str, md, env, outTokens) {
	    var state = new this.State(str, md, env, outTokens);
	    this.tokenize(state);
	    var rules = this.ruler2.getRules('');
	    var len = rules.length;
	    for(var i = 0; i < len; i++){
	        rules[i](state);
	    }
	};
	ParserInline.prototype.State = StateInline;

	function reFactory(opts) {
	    var re = {};
	    opts = opts || {};
	    re.src_Any = Any.source;
	    re.src_Cc = Cc.source;
	    re.src_Z = Z.source;
	    re.src_P = P.source;
	    // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
	    re.src_ZPCc = [
	        re.src_Z,
	        re.src_P,
	        re.src_Cc
	    ].join('|');
	    // \p{\Z\Cc} (white spaces + control)
	    re.src_ZCc = [
	        re.src_Z,
	        re.src_Cc
	    ].join('|');
	    // Experimental. List of chars, completely prohibited in links
	    // because can separate it from other part of text
	    var text_separators = '[><\uff5c]';
	    // All possible word characters (everything without punctuation, spaces & controls)
	    // Defined via punctuation & spaces to save space
	    // Should be something like \p{\L\N\S\M} (\w but without `_`)
	    re.src_pseudo_letter = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
	    // The same as abothe but without [0-9]
	    // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';
	    re.src_ip4 = '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
	    // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
	    re.src_auth = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';
	    re.src_port = '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';
	    re.src_host_terminator = '(?=$|' + text_separators + '|' + re.src_ZPCc + ')' + '(?!' + (opts['---'] ? '-(?!--)|' : '-|') + '_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';
	    re.src_path = '(?:' + '[/?#]' + '(?:' + '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-;]).|' + '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' + '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' + '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' + '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' + "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" + // allow `I'm_king` if no pair found
	    "\\'(?=" + re.src_pseudo_letter + '|[-])|' + // google has many dots in "google search" links (#66, #81).
	    // github has ... in commit range links,
	    // Restrict to
	    // - english
	    // - percent-encoded
	    // - parts of file path
	    // - params separator
	    // until more examples found.
	    '\\.{2,}[a-zA-Z0-9%/&]|' + '\\.(?!' + re.src_ZCc + '|[.]|$)|' + (opts['---'] ? '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
	     : '\\-+|') + // allow `,,,` in paths
	    ',(?!' + re.src_ZCc + '|$)|' + // allow `;` if not followed by space-like char
	    ';(?!' + re.src_ZCc + '|$)|' + // allow `!!!` in paths, but not at the end
	    '\\!+(?!' + re.src_ZCc + '|[!]|$)|' + '\\?(?!' + re.src_ZCc + '|[?]|$)' + ')+' + '|\\/' + ')?';
	    // Allow anything in markdown spec, forbid quote (") at the first position
	    // because emails enclosed in quotes are far more common
	    re.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';
	    re.src_xn = 'xn--[a-z0-9\\-]{1,59}';
	    // More to read about domain names
	    // http://serverfault.com/questions/638260/
	    re.src_domain_root = // Allow letters & digits (http://test1)
	    '(?:' + re.src_xn + '|' + re.src_pseudo_letter + '{1,63}' + ')';
	    re.src_domain = '(?:' + re.src_xn + '|' + '(?:' + re.src_pseudo_letter + ')' + '|' + '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' + ')';
	    re.src_host = '(?:' + // Don't need IP check, because digits are already allowed in normal domain names
	    //   src_ip4 +
	    // '|' +
	    '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain /* _root */  + ')' + ')';
	    re.tpl_host_fuzzy = '(?:' + re.src_ip4 + '|' + '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' + ')';
	    re.tpl_host_no_ip_fuzzy = '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';
	    re.src_host_strict = re.src_host + re.src_host_terminator;
	    re.tpl_host_fuzzy_strict = re.tpl_host_fuzzy + re.src_host_terminator;
	    re.src_host_port_strict = re.src_host + re.src_port + re.src_host_terminator;
	    re.tpl_host_port_fuzzy_strict = re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;
	    re.tpl_host_port_no_ip_fuzzy_strict = re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;
	    //
	    // Main rules
	    //
	    // Rude test fuzzy links by host, for quick deny
	    re.tpl_host_fuzzy_test = 'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';
	    re.tpl_email_fuzzy = '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' + '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';
	    re.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
	    // but can start with > (markdown blockquote)
	    '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' + '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';
	    re.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
	    // but can start with > (markdown blockquote)
	    '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' + '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';
	    return re;
	}

	function _instanceof$1(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	//
	// Helpers
	//
	// Merge objects
	//
	function assign(obj /* from1, from2, from3, ... */ ) {
	    var sources = Array.prototype.slice.call(arguments, 1);
	    sources.forEach(function(source) {
	        if (!source) {
	            return;
	        }
	        Object.keys(source).forEach(function(key) {
	            obj[key] = source[key];
	        });
	    });
	    return obj;
	}
	function _class(obj) {
	    return Object.prototype.toString.call(obj);
	}
	function isString(obj) {
	    return _class(obj) === '[object String]';
	}
	function isObject(obj) {
	    return _class(obj) === '[object Object]';
	}
	function isRegExp(obj) {
	    return _class(obj) === '[object RegExp]';
	}
	function isFunction(obj) {
	    return _class(obj) === '[object Function]';
	}
	function escapeRE(str) {
	    return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
	}
	//
	var defaultOptions = {
	    fuzzyLink: true,
	    fuzzyEmail: true,
	    fuzzyIP: false
	};
	function isOptionsObj(obj) {
	    return Object.keys(obj || {}).reduce(function(acc, k) {
	        /* eslint-disable-next-line no-prototype-builtins */ return acc || defaultOptions.hasOwnProperty(k);
	    }, false);
	}
	var defaultSchemas = {
	    'http:': {
	        validate: function validate(text, pos, self) {
	            var tail = text.slice(pos);
	            if (!self.re.http) {
	                // compile lazily, because "host"-containing variables can change on tlds update.
	                self.re.http = new RegExp('^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i');
	            }
	            if (self.re.http.test(tail)) {
	                return tail.match(self.re.http)[0].length;
	            }
	            return 0;
	        }
	    },
	    'https:': 'http:',
	    'ftp:': 'http:',
	    '//': {
	        validate: function validate(text, pos, self) {
	            var tail = text.slice(pos);
	            if (!self.re.no_http) {
	                // compile lazily, because "host"-containing variables can change on tlds update.
	                self.re.no_http = new RegExp('^' + self.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
	                // with code comments
	                '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' + self.re.src_port + self.re.src_host_terminator + self.re.src_path, 'i');
	            }
	            if (self.re.no_http.test(tail)) {
	                // should not be `://` & `///`, that protects from errors in protocol name
	                if (pos >= 3 && text[pos - 3] === ':') {
	                    return 0;
	                }
	                if (pos >= 3 && text[pos - 3] === '/') {
	                    return 0;
	                }
	                return tail.match(self.re.no_http)[0].length;
	            }
	            return 0;
	        }
	    },
	    'mailto:': {
	        validate: function validate(text, pos, self) {
	            var tail = text.slice(pos);
	            if (!self.re.mailto) {
	                self.re.mailto = new RegExp('^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i');
	            }
	            if (self.re.mailto.test(tail)) {
	                return tail.match(self.re.mailto)[0].length;
	            }
	            return 0;
	        }
	    }
	};
	// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
	/* eslint-disable-next-line max-len */ var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';
	// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
	var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');
	function resetScanCache(self) {
	    self.__index__ = -1;
	    self.__text_cache__ = '';
	}
	function createValidator(re) {
	    return function(text, pos) {
	        var tail = text.slice(pos);
	        if (re.test(tail)) {
	            return tail.match(re)[0].length;
	        }
	        return 0;
	    };
	}
	function createNormalizer() {
	    return function(match, self) {
	        self.normalize(match);
	    };
	}
	// Schemas compiler. Build regexps.
	//
	function compile(self) {
	    // Load & clone RE patterns.
	    var re = self.re = reFactory(self.__opts__);
	    // Define dynamic patterns
	    var tlds = self.__tlds__.slice();
	    self.onCompile();
	    if (!self.__tlds_replaced__) {
	        tlds.push(tlds_2ch_src_re);
	    }
	    tlds.push(re.src_xn);
	    re.src_tlds = tlds.join('|');
	    function untpl(tpl) {
	        return tpl.replace('%TLDS%', re.src_tlds);
	    }
	    re.email_fuzzy = RegExp(untpl(re.tpl_email_fuzzy), 'i');
	    re.link_fuzzy = RegExp(untpl(re.tpl_link_fuzzy), 'i');
	    re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
	    re.host_fuzzy_test = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');
	    //
	    // Compile each schema
	    //
	    var aliases = [];
	    self.__compiled__ = {} // Reset compiled data
	    ;
	    function schemaError(name, val) {
	        throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
	    }
	    Object.keys(self.__schemas__).forEach(function(name) {
	        var val = self.__schemas__[name];
	        // skip disabled methods
	        if (val === null) {
	            return;
	        }
	        var compiled = {
	            validate: null,
	            link: null
	        };
	        self.__compiled__[name] = compiled;
	        if (isObject(val)) {
	            if (isRegExp(val.validate)) {
	                compiled.validate = createValidator(val.validate);
	            } else if (isFunction(val.validate)) {
	                compiled.validate = val.validate;
	            } else {
	                schemaError(name, val);
	            }
	            if (isFunction(val.normalize)) {
	                compiled.normalize = val.normalize;
	            } else if (!val.normalize) {
	                compiled.normalize = createNormalizer();
	            } else {
	                schemaError(name, val);
	            }
	            return;
	        }
	        if (isString(val)) {
	            aliases.push(name);
	            return;
	        }
	        schemaError(name, val);
	    });
	    //
	    // Compile postponed aliases
	    //
	    aliases.forEach(function(alias) {
	        if (!self.__compiled__[self.__schemas__[alias]]) {
	            // Silently fail on missed schemas to avoid errons on disable.
	            // schemaError(alias, self.__schemas__[alias]);
	            return;
	        }
	        self.__compiled__[alias].validate = self.__compiled__[self.__schemas__[alias]].validate;
	        self.__compiled__[alias].normalize = self.__compiled__[self.__schemas__[alias]].normalize;
	    });
	    //
	    // Fake record for guessed links
	    //
	    self.__compiled__[''] = {
	        validate: null,
	        normalize: createNormalizer()
	    };
	    //
	    // Build schema condition
	    //
	    var slist = Object.keys(self.__compiled__).filter(function(name) {
	        // Filter disabled & fake schemas
	        return name.length > 0 && self.__compiled__[name];
	    }).map(escapeRE).join('|');
	    // (?!_) cause 1.5x slowdown
	    self.re.schema_test = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
	    self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');
	    self.re.schema_at_start = RegExp('^' + self.re.schema_search.source, 'i');
	    self.re.pretest = RegExp('(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@', 'i');
	    //
	    // Cleanup
	    //
	    resetScanCache(self);
	}
	/**
	 * class Match
	 *
	 * Match result. Single element of array, returned by [[LinkifyIt#match]]
	 **/ function Match(self, shift) {
	    var start = self.__index__;
	    var end = self.__last_index__;
	    var text = self.__text_cache__.slice(start, end);
	    /**
	   * Match#schema -> String
	   *
	   * Prefix (protocol) for matched string.
	   **/ this.schema = self.__schema__.toLowerCase();
	    /**
	   * Match#index -> Number
	   *
	   * First position of matched string.
	   **/ this.index = start + shift;
	    /**
	   * Match#lastIndex -> Number
	   *
	   * Next position after matched string.
	   **/ this.lastIndex = end + shift;
	    /**
	   * Match#raw -> String
	   *
	   * Matched string.
	   **/ this.raw = text;
	    /**
	   * Match#text -> String
	   *
	   * Notmalized text of matched string.
	   **/ this.text = text;
	    /**
	   * Match#url -> String
	   *
	   * Normalized url of matched string.
	   **/ this.url = text;
	}
	function createMatch(self, shift) {
	    var match = new Match(self, shift);
	    self.__compiled__[match.schema].normalize(match, self);
	    return match;
	}
	/**
	 * class LinkifyIt
	 **/ /**
	 * new LinkifyIt(schemas, options)
	 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Creates new linkifier instance with optional additional schemas.
	 * Can be called without `new` keyword for convenience.
	 *
	 * By default understands:
	 *
	 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
	 * - "fuzzy" links and emails (example.com, foo@bar.com).
	 *
	 * `schemas` is an object, where each key/value describes protocol/rule:
	 *
	 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
	 *   for example). `linkify-it` makes shure that prefix is not preceeded with
	 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
	 * - __value__ - rule to check tail after link prefix
	 *   - _String_ - just alias to existing rule
	 *   - _Object_
	 *     - _validate_ - validator function (should return matched length on success),
	 *       or `RegExp`.
	 *     - _normalize_ - optional function to normalize text & url of matched result
	 *       (for example, for @twitter mentions).
	 *
	 * `options`:
	 *
	 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
	 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
	 *   like version numbers. Default `false`.
	 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
	 *
	 **/ function LinkifyIt(schemas, options) {
	    if (!_instanceof$1(this, LinkifyIt)) {
	        return new LinkifyIt(schemas, options);
	    }
	    if (!options) {
	        if (isOptionsObj(schemas)) {
	            options = schemas;
	            schemas = {};
	        }
	    }
	    this.__opts__ = assign({}, defaultOptions, options);
	    // Cache last tested result. Used to skip repeating steps on next `match` call.
	    this.__index__ = -1;
	    this.__last_index__ = -1 // Next scan position
	    ;
	    this.__schema__ = '';
	    this.__text_cache__ = '';
	    this.__schemas__ = assign({}, defaultSchemas, schemas);
	    this.__compiled__ = {};
	    this.__tlds__ = tlds_default;
	    this.__tlds_replaced__ = false;
	    this.re = {};
	    compile(this);
	}
	/** chainable
	 * LinkifyIt#add(schema, definition)
	 * - schema (String): rule name (fixed pattern prefix)
	 * - definition (String|RegExp|Object): schema definition
	 *
	 * Add new rule definition. See constructor description for details.
	 **/ LinkifyIt.prototype.add = function add(schema, definition) {
	    this.__schemas__[schema] = definition;
	    compile(this);
	    return this;
	};
	/** chainable
	 * LinkifyIt#set(options)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Set recognition options for links without schema.
	 **/ LinkifyIt.prototype.set = function set(options) {
	    this.__opts__ = assign(this.__opts__, options);
	    return this;
	};
	/**
	 * LinkifyIt#test(text) -> Boolean
	 *
	 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
	 **/ LinkifyIt.prototype.test = function test(text) {
	    // Reset scan cache
	    this.__text_cache__ = text;
	    this.__index__ = -1;
	    if (!text.length) {
	        return false;
	    }
	    var m, ml, me, len, shift, next, re, tld_pos, at_pos;
	    // try to scan for link with schema - that's the most simple rule
	    if (this.re.schema_test.test(text)) {
	        re = this.re.schema_search;
	        re.lastIndex = 0;
	        while((m = re.exec(text)) !== null){
	            len = this.testSchemaAt(text, m[2], re.lastIndex);
	            if (len) {
	                this.__schema__ = m[2];
	                this.__index__ = m.index + m[1].length;
	                this.__last_index__ = m.index + m[0].length + len;
	                break;
	            }
	        }
	    }
	    if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
	        // guess schemaless links
	        tld_pos = text.search(this.re.host_fuzzy_test);
	        if (tld_pos >= 0) {
	            // if tld is located after found link - no need to check fuzzy pattern
	            if (this.__index__ < 0 || tld_pos < this.__index__) {
	                if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
	                    shift = ml.index + ml[1].length;
	                    if (this.__index__ < 0 || shift < this.__index__) {
	                        this.__schema__ = '';
	                        this.__index__ = shift;
	                        this.__last_index__ = ml.index + ml[0].length;
	                    }
	                }
	            }
	        }
	    }
	    if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
	        // guess schemaless emails
	        at_pos = text.indexOf('@');
	        if (at_pos >= 0) {
	            // We can't skip this check, because this cases are possible:
	            // 192.168.1.1@gmail.com, my.in@example.com
	            if ((me = text.match(this.re.email_fuzzy)) !== null) {
	                shift = me.index + me[1].length;
	                next = me.index + me[0].length;
	                if (this.__index__ < 0 || shift < this.__index__ || shift === this.__index__ && next > this.__last_index__) {
	                    this.__schema__ = 'mailto:';
	                    this.__index__ = shift;
	                    this.__last_index__ = next;
	                }
	            }
	        }
	    }
	    return this.__index__ >= 0;
	};
	/**
	 * LinkifyIt#pretest(text) -> Boolean
	 *
	 * Very quick check, that can give false positives. Returns true if link MAY BE
	 * can exists. Can be used for speed optimization, when you need to check that
	 * link NOT exists.
	 **/ LinkifyIt.prototype.pretest = function pretest(text) {
	    return this.re.pretest.test(text);
	};
	/**
	 * LinkifyIt#testSchemaAt(text, name, position) -> Number
	 * - text (String): text to scan
	 * - name (String): rule (schema) name
	 * - position (Number): text offset to check from
	 *
	 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
	 * at given position. Returns length of found pattern (0 on fail).
	 **/ LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
	    // If not supported schema check requested - terminate
	    if (!this.__compiled__[schema.toLowerCase()]) {
	        return 0;
	    }
	    return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
	};
	/**
	 * LinkifyIt#match(text) -> Array|null
	 *
	 * Returns array of found link descriptions or `null` on fail. We strongly
	 * recommend to use [[LinkifyIt#test]] first, for best speed.
	 *
	 * ##### Result match description
	 *
	 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
	 *   protocol-neutral  links.
	 * - __index__ - offset of matched text
	 * - __lastIndex__ - index of next char after mathch end
	 * - __raw__ - matched text
	 * - __text__ - normalized text
	 * - __url__ - link, generated from matched text
	 **/ LinkifyIt.prototype.match = function match(text) {
	    var result = [];
	    var shift = 0;
	    // Try to take previous element from cache, if .test() called before
	    if (this.__index__ >= 0 && this.__text_cache__ === text) {
	        result.push(createMatch(this, shift));
	        shift = this.__last_index__;
	    }
	    // Cut head if cache was used
	    var tail = shift ? text.slice(shift) : text;
	    // Scan string until end reached
	    while(this.test(tail)){
	        result.push(createMatch(this, shift));
	        tail = tail.slice(this.__last_index__);
	        shift += this.__last_index__;
	    }
	    if (result.length) {
	        return result;
	    }
	    return null;
	};
	/**
	 * LinkifyIt#matchAtStart(text) -> Match|null
	 *
	 * Returns fully-formed (not fuzzy) link if it starts at the beginning
	 * of the string, and null otherwise.
	 **/ LinkifyIt.prototype.matchAtStart = function matchAtStart(text) {
	    // Reset scan cache
	    this.__text_cache__ = text;
	    this.__index__ = -1;
	    if (!text.length) return null;
	    var m = this.re.schema_at_start.exec(text);
	    if (!m) return null;
	    var len = this.testSchemaAt(text, m[2], m[0].length);
	    if (!len) return null;
	    this.__schema__ = m[2];
	    this.__index__ = m.index + m[1].length;
	    this.__last_index__ = m.index + m[0].length + len;
	    return createMatch(this, 0);
	};
	/** chainable
	 * LinkifyIt#tlds(list [, keepOld]) -> this
	 * - list (Array): list of tlds
	 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
	 *
	 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
	 * to avoid false positives. By default this algorythm used:
	 *
	 * - hostname with any 2-letter root zones are ok.
	 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
	 *   are ok.
	 * - encoded (`xn--...`) root zones are ok.
	 *
	 * If list is replaced, then exact match for 2-chars root zones will be checked.
	 **/ LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
	    list = Array.isArray(list) ? list : [
	        list
	    ];
	    if (!keepOld) {
	        this.__tlds__ = list.slice();
	        this.__tlds_replaced__ = true;
	        compile(this);
	        return this;
	    }
	    this.__tlds__ = this.__tlds__.concat(list).sort().filter(function(el, idx, arr) {
	        return el !== arr[idx - 1];
	    }).reverse();
	    compile(this);
	    return this;
	};
	/**
	 * LinkifyIt#normalize(match)
	 *
	 * Default normalizer (if schema does not define it's own).
	 **/ LinkifyIt.prototype.normalize = function normalize(match) {
	    // Do minimal possible changes by default. Need to collect feedback prior
	    // to move forward https://github.com/markdown-it/linkify-it/issues/1
	    if (!match.schema) {
	        match.url = 'http://' + match.url;
	    }
	    if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
	        match.url = 'mailto:' + match.url;
	    }
	};
	/**
	 * LinkifyIt#onCompile()
	 *
	 * Override to modify basic RegExp-s.
	 **/ LinkifyIt.prototype.onCompile = function onCompile() {};

	/*! https://mths.be/punycode v1.4.1 by @mathias */


	/** Highest positive signed 32-bit float value */
	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter = '-'; // '\x2D'

	/** Regular expressions */
	var regexPunycode = /^xn--/;
	var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
	var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	var errors = {
	  'overflow': 'Overflow: input needs wider integers to process',
	  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	  'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	var baseMinusTMin = base - tMin;
	var floor = Math.floor;
	var stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
	  throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
	  var length = array.length;
	  var result = [];
	  while (length--) {
	    result[length] = fn(array[length]);
	  }
	  return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
	  var parts = string.split('@');
	  var result = '';
	  if (parts.length > 1) {
	    // In email addresses, only the domain name should be punycoded. Leave
	    // the local part (i.e. everything up to `@`) intact.
	    result = parts[0] + '@';
	    string = parts[1];
	  }
	  // Avoid `split(regex)` for IE8 compatibility. See #17.
	  string = string.replace(regexSeparators, '\x2E');
	  var labels = string.split('.');
	  var encoded = map(labels, fn).join('.');
	  return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
	  var output = [],
	    counter = 0,
	    length = string.length,
	    value,
	    extra;
	  while (counter < length) {
	    value = string.charCodeAt(counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // high surrogate, and there is a next character
	      extra = string.charCodeAt(counter++);
	      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
	        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // unmatched surrogate; only append this code unit, in case the next
	        // code unit is the high surrogate of a surrogate pair
	        output.push(value);
	        counter--;
	      }
	    } else {
	      output.push(value);
	    }
	  }
	  return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
	  return map(array, function(value) {
	    var output = '';
	    if (value > 0xFFFF) {
	      value -= 0x10000;
	      output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
	      value = 0xDC00 | value & 0x3FF;
	    }
	    output += stringFromCharCode(value);
	    return output;
	  }).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
	  if (codePoint - 48 < 10) {
	    return codePoint - 22;
	  }
	  if (codePoint - 65 < 26) {
	    return codePoint - 65;
	  }
	  if (codePoint - 97 < 26) {
	    return codePoint - 97;
	  }
	  return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor(delta / damp) : delta >> 1;
	  delta += floor(delta / numPoints);
	  for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
	    delta = floor(delta / baseMinusTMin);
	  }
	  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
	  // Don't use UCS-2
	  var output = [],
	    inputLength = input.length,
	    out,
	    i = 0,
	    n = initialN,
	    bias = initialBias,
	    basic,
	    j,
	    index,
	    oldi,
	    w,
	    k,
	    digit,
	    t,
	    /** Cached calculation results */
	    baseMinusT;

	  // Handle the basic code points: let `basic` be the number of input code
	  // points before the last delimiter, or `0` if there is none, then copy
	  // the first basic code points to the output.

	  basic = input.lastIndexOf(delimiter);
	  if (basic < 0) {
	    basic = 0;
	  }

	  for (j = 0; j < basic; ++j) {
	    // if it's not a basic code point
	    if (input.charCodeAt(j) >= 0x80) {
	      error('not-basic');
	    }
	    output.push(input.charCodeAt(j));
	  }

	  // Main decoding loop: start just after the last delimiter if any basic code
	  // points were copied; start at the beginning otherwise.

	  for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */ ) {

	    // `index` is the index of the next character to be consumed.
	    // Decode a generalized variable-length integer into `delta`,
	    // which gets added to `i`. The overflow checking is easier
	    // if we increase `i` as we go, then subtract off its starting
	    // value at the end to obtain `delta`.
	    for (oldi = i, w = 1, k = base; /* no condition */ ; k += base) {

	      if (index >= inputLength) {
	        error('invalid-input');
	      }

	      digit = basicToDigit(input.charCodeAt(index++));

	      if (digit >= base || digit > floor((maxInt - i) / w)) {
	        error('overflow');
	      }

	      i += digit * w;
	      t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

	      if (digit < t) {
	        break;
	      }

	      baseMinusT = base - t;
	      if (w > floor(maxInt / baseMinusT)) {
	        error('overflow');
	      }

	      w *= baseMinusT;

	    }

	    out = output.length + 1;
	    bias = adapt(i - oldi, out, oldi == 0);

	    // `i` was supposed to wrap around from `out` to `0`,
	    // incrementing `n` each time, so we'll fix that now:
	    if (floor(i / out) > maxInt - n) {
	      error('overflow');
	    }

	    n += floor(i / out);
	    i %= out;

	    // Insert `n` at position `i` of the output
	    output.splice(i++, 0, n);

	  }

	  return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
	  var n,
	    delta,
	    handledCPCount,
	    basicLength,
	    bias,
	    j,
	    m,
	    q,
	    k,
	    t,
	    currentValue,
	    output = [],
	    /** `inputLength` will hold the number of code points in `input`. */
	    inputLength,
	    /** Cached calculation results */
	    handledCPCountPlusOne,
	    baseMinusT,
	    qMinusT;

	  // Convert the input in UCS-2 to Unicode
	  input = ucs2decode(input);

	  // Cache the length
	  inputLength = input.length;

	  // Initialize the state
	  n = initialN;
	  delta = 0;
	  bias = initialBias;

	  // Handle the basic code points
	  for (j = 0; j < inputLength; ++j) {
	    currentValue = input[j];
	    if (currentValue < 0x80) {
	      output.push(stringFromCharCode(currentValue));
	    }
	  }

	  handledCPCount = basicLength = output.length;

	  // `handledCPCount` is the number of code points that have been handled;
	  // `basicLength` is the number of basic code points.

	  // Finish the basic string - if it is not empty - with a delimiter
	  if (basicLength) {
	    output.push(delimiter);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {

	    // All non-basic code points < n have been handled already. Find the next
	    // larger one:
	    for (m = maxInt, j = 0; j < inputLength; ++j) {
	      currentValue = input[j];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	    // but guard against overflow
	    handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	      error('overflow');
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (j = 0; j < inputLength; ++j) {
	      currentValue = input[j];

	      if (currentValue < n && ++delta > maxInt) {
	        error('overflow');
	      }

	      if (currentValue == n) {
	        // Represent delta as a generalized variable-length integer
	        for (q = delta, k = base; /* no condition */ ; k += base) {
	          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) {
	            break;
	          }
	          qMinusT = q - t;
	          baseMinusT = base - t;
	          output.push(
	            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
	          );
	          q = floor(qMinusT / baseMinusT);
	        }

	        output.push(stringFromCharCode(digitToBasic(q, 0)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        ++handledCPCount;
	      }
	    }

	    ++delta;
	    ++n;

	  }
	  return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
	  return mapDomain(input, function(string) {
	    return regexPunycode.test(string) ?
	      decode(string.slice(4).toLowerCase()) :
	      string;
	  });
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
	  return mapDomain(input, function(string) {
	    return regexNonASCII.test(string) ?
	      'xn--' + encode(string) :
	      string;
	  });
	}
	var version = '1.4.1';
	/**
	 * An object of methods to convert from JavaScript's internal character
	 * representation (UCS-2) to Unicode code points, and back.
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode
	 * @type Object
	 */

	var ucs2 = {
	  decode: ucs2decode,
	  encode: ucs2encode
	};
	var punycode = {
	  version: version,
	  ucs2: ucs2,
	  toASCII: toASCII,
	  toUnicode: toUnicode,
	  encode: encode,
	  decode: decode
	};

	// markdown-it default options
	var cfg_default = {
	    options: {
	        // Enable HTML tags in source
	        html: false,
	        // Use '/' to close single tags (<br />)
	        xhtmlOut: false,
	        // Convert '\n' in paragraphs into <br>
	        breaks: false,
	        // CSS language prefix for fenced blocks
	        langPrefix: 'language-',
	        // autoconvert URL-like texts to links
	        linkify: false,
	        // Enable some language-neutral replacements + quotes beautification
	        typographer: false,
	        // Double + single quotes replacement pairs, when typographer enabled,
	        // and smartquotes on. Could be either a String or an Array.
	        //
	        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	        quotes: '\u201c\u201d\u2018\u2019',
	        /* “”‘’ */ // Highlighter function. Should return escaped HTML,
	        // or '' if the source string is not changed and should be escaped externaly.
	        // If result starts with <pre... internal wrapper is skipped.
	        //
	        // function (/*str, lang*/) { return ''; }
	        //
	        highlight: null,
	        // Internal protection, recursion limit
	        maxNesting: 100
	    },
	    components: {
	        core: {},
	        block: {},
	        inline: {}
	    }
	};

	// "Zero" preset, with nothing enabled. Useful for manual configuring of simple
	// modes. For example, to parse bold/italic only.
	var cfg_zero = {
	    options: {
	        // Enable HTML tags in source
	        html: false,
	        // Use '/' to close single tags (<br />)
	        xhtmlOut: false,
	        // Convert '\n' in paragraphs into <br>
	        breaks: false,
	        // CSS language prefix for fenced blocks
	        langPrefix: 'language-',
	        // autoconvert URL-like texts to links
	        linkify: false,
	        // Enable some language-neutral replacements + quotes beautification
	        typographer: false,
	        // Double + single quotes replacement pairs, when typographer enabled,
	        // and smartquotes on. Could be either a String or an Array.
	        //
	        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	        quotes: '\u201c\u201d\u2018\u2019',
	        /* “”‘’ */ // Highlighter function. Should return escaped HTML,
	        // or '' if the source string is not changed and should be escaped externaly.
	        // If result starts with <pre... internal wrapper is skipped.
	        //
	        // function (/*str, lang*/) { return ''; }
	        //
	        highlight: null,
	        // Internal protection, recursion limit
	        maxNesting: 20
	    },
	    components: {
	        core: {
	            rules: [
	                'normalize',
	                'block',
	                'inline',
	                'text_join'
	            ]
	        },
	        block: {
	            rules: [
	                'paragraph'
	            ]
	        },
	        inline: {
	            rules: [
	                'text'
	            ],
	            rules2: [
	                'balance_pairs',
	                'fragments_join'
	            ]
	        }
	    }
	};

	// Commonmark default options
	var cfg_commonmark = {
	    options: {
	        // Enable HTML tags in source
	        html: true,
	        // Use '/' to close single tags (<br />)
	        xhtmlOut: true,
	        // Convert '\n' in paragraphs into <br>
	        breaks: false,
	        // CSS language prefix for fenced blocks
	        langPrefix: 'language-',
	        // autoconvert URL-like texts to links
	        linkify: false,
	        // Enable some language-neutral replacements + quotes beautification
	        typographer: false,
	        // Double + single quotes replacement pairs, when typographer enabled,
	        // and smartquotes on. Could be either a String or an Array.
	        //
	        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	        quotes: '\u201c\u201d\u2018\u2019',
	        /* “”‘’ */ // Highlighter function. Should return escaped HTML,
	        // or '' if the source string is not changed and should be escaped externaly.
	        // If result starts with <pre... internal wrapper is skipped.
	        //
	        // function (/*str, lang*/) { return ''; }
	        //
	        highlight: null,
	        // Internal protection, recursion limit
	        maxNesting: 20
	    },
	    components: {
	        core: {
	            rules: [
	                'normalize',
	                'block',
	                'inline',
	                'text_join'
	            ]
	        },
	        block: {
	            rules: [
	                'blockquote',
	                'code',
	                'fence',
	                'heading',
	                'hr',
	                'html_block',
	                'lheading',
	                'list',
	                'reference',
	                'paragraph'
	            ]
	        },
	        inline: {
	            rules: [
	                'autolink',
	                'backticks',
	                'emphasis',
	                'entity',
	                'escape',
	                'html_inline',
	                'image',
	                'link',
	                'newline',
	                'text'
	            ],
	            rules2: [
	                'balance_pairs',
	                'emphasis',
	                'fragments_join'
	            ]
	        }
	    }
	};

	// Main parser class
	function _instanceof(left, right) {
	    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
	        return !!right[Symbol.hasInstance](left);
	    } else {
	        return left instanceof right;
	    }
	}
	var config = {
	    default: cfg_default,
	    zero: cfg_zero,
	    commonmark: cfg_commonmark
	};
	//
	// This validator can prohibit more than really needed to prevent XSS. It's a
	// tradeoff to keep code simple and to be secure by default.
	//
	// If you need different setup - override validator method as you wish. Or
	// replace it with dummy function and use external sanitizer.
	//
	var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
	var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;
	function validateLink(url) {
	    // url should be normalized at this point, and existing entities are decoded
	    var str = url.trim().toLowerCase();
	    return BAD_PROTO_RE.test(str) ? GOOD_DATA_RE.test(str) : true;
	}
	var RECODE_HOSTNAME_FOR = [
	    'http:',
	    'https:',
	    'mailto:'
	];
	function normalizeLink(url) {
	    var parsed = urlParse(url, true);
	    if (parsed.hostname) {
	        // Encode hostnames in urls like:
	        // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
	        //
	        // We don't encode unknown schemas, because it's likely that we encode
	        // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
	        //
	        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
	            try {
	                parsed.hostname = punycode.toASCII(parsed.hostname);
	            } catch (er) {}
	        }
	    }
	    return encode$1(format(parsed));
	}
	function normalizeLinkText(url) {
	    var parsed = urlParse(url, true);
	    if (parsed.hostname) {
	        // Encode hostnames in urls like:
	        // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
	        //
	        // We don't encode unknown schemas, because it's likely that we encode
	        // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
	        //
	        if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
	            try {
	                parsed.hostname = punycode.toUnicode(parsed.hostname);
	            } catch (er) {}
	        }
	    }
	    // add '%' to exclude list because of https://github.com/markdown-it/markdown-it/issues/720
	    return decode$1(format(parsed), decode$1.defaultChars + '%');
	}
	/**
	 * class MarkdownIt
	 *
	 * Main parser/renderer class.
	 *
	 * ##### Usage
	 *
	 * ```javascript
	 * // node.js, "classic" way:
	 * var MarkdownIt = require('markdown-it'),
	 *     md = new MarkdownIt();
	 * var result = md.render('# markdown-it rulezz!');
	 *
	 * // node.js, the same, but with sugar:
	 * var md = require('markdown-it')();
	 * var result = md.render('# markdown-it rulezz!');
	 *
	 * // browser without AMD, added to "window" on script load
	 * // Note, there are no dash.
	 * var md = window.markdownit();
	 * var result = md.render('# markdown-it rulezz!');
	 * ```
	 *
	 * Single line rendering, without paragraph wrap:
	 *
	 * ```javascript
	 * var md = require('markdown-it')();
	 * var result = md.renderInline('__markdown-it__ rulezz!');
	 * ```
	 **/ /**
	 * new MarkdownIt([presetName, options])
	 * - presetName (String): optional, `commonmark` / `zero`
	 * - options (Object)
	 *
	 * Creates parser instanse with given config. Can be called without `new`.
	 *
	 * ##### presetName
	 *
	 * MarkdownIt provides named presets as a convenience to quickly
	 * enable/disable active syntax rules and options for common use cases.
	 *
	 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.mjs) -
	 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
	 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.mjs) -
	 *   similar to GFM, used when no preset name given. Enables all available rules,
	 *   but still without html, typographer & autolinker.
	 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.mjs) -
	 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
	 *   For example, when you need only `bold` and `italic` markup and nothing else.
	 *
	 * ##### options:
	 *
	 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
	 *   That's not safe! You may need external sanitizer to protect output from XSS.
	 *   It's better to extend features via plugins, instead of enabling HTML.
	 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
	 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
	 *   world you will need HTML output.
	 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
	 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
	 *   Can be useful for external highlighters.
	 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
	 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
	 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs) +
	 *   quotes beautification (smartquotes).
	 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
	 *   pairs, when typographer enabled and smartquotes on. For example, you can
	 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
	 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
	 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
	 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
	 *   return empty string if the source was not changed and should be escaped
	 *   externaly. If result starts with <pre... internal wrapper is skipped.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * // commonmark mode
	 * var md = require('markdown-it')('commonmark');
	 *
	 * // default mode
	 * var md = require('markdown-it')();
	 *
	 * // enable everything
	 * var md = require('markdown-it')({
	 *   html: true,
	 *   linkify: true,
	 *   typographer: true
	 * });
	 * ```
	 *
	 * ##### Syntax highlighting
	 *
	 * ```js
	 * var hljs = require('highlight.js') // https://highlightjs.org/
	 *
	 * var md = require('markdown-it')({
	 *   highlight: function (str, lang) {
	 *     if (lang && hljs.getLanguage(lang)) {
	 *       try {
	 *         return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
	 *       } catch (__) {}
	 *     }
	 *
	 *     return ''; // use external default escaping
	 *   }
	 * });
	 * ```
	 *
	 * Or with full wrapper override (if you need assign class to `<pre>` or `<code>`):
	 *
	 * ```javascript
	 * var hljs = require('highlight.js') // https://highlightjs.org/
	 *
	 * // Actual default values
	 * var md = require('markdown-it')({
	 *   highlight: function (str, lang) {
	 *     if (lang && hljs.getLanguage(lang)) {
	 *       try {
	 *         return '<pre><code class="hljs">' +
	 *                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
	 *                '</code></pre>';
	 *       } catch (__) {}
	 *     }
	 *
	 *     return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
	 *   }
	 * });
	 * ```
	 *
	 **/ function MarkdownIt(presetName, options) {
	    if (!_instanceof(this, MarkdownIt)) {
	        return new MarkdownIt(presetName, options);
	    }
	    if (!options) {
	        if (!isString$1(presetName)) {
	            options = presetName || {};
	            presetName = 'default';
	        }
	    }
	    /**
	   * MarkdownIt#inline -> ParserInline
	   *
	   * Instance of [[ParserInline]]. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/ this.inline = new ParserInline();
	    /**
	   * MarkdownIt#block -> ParserBlock
	   *
	   * Instance of [[ParserBlock]]. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/ this.block = new ParserBlock();
	    /**
	   * MarkdownIt#core -> Core
	   *
	   * Instance of [[Core]] chain executor. You may need it to add new rules when
	   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
	   * [[MarkdownIt.enable]].
	   **/ this.core = new Core();
	    /**
	   * MarkdownIt#renderer -> Renderer
	   *
	   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
	   * rules for new token types, generated by plugins.
	   *
	   * ##### Example
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   *
	   * function myToken(tokens, idx, options, env, self) {
	   *   //...
	   *   return result;
	   * };
	   *
	   * md.renderer.rules['my_token'] = myToken
	   * ```
	   *
	   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.mjs).
	   **/ this.renderer = new Renderer();
	    /**
	   * MarkdownIt#linkify -> LinkifyIt
	   *
	   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
	   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.mjs)
	   * rule.
	   **/ this.linkify = new LinkifyIt();
	    /**
	   * MarkdownIt#validateLink(url) -> Boolean
	   *
	   * Link validation function. CommonMark allows too much in links. By default
	   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
	   * except some embedded image types.
	   *
	   * You can change this behaviour:
	   *
	   * ```javascript
	   * var md = require('markdown-it')();
	   * // enable everything
	   * md.validateLink = function () { return true; }
	   * ```
	   **/ this.validateLink = validateLink;
	    /**
	   * MarkdownIt#normalizeLink(url) -> String
	   *
	   * Function used to encode link url to a machine-readable format,
	   * which includes url-encoding, punycode, etc.
	   **/ this.normalizeLink = normalizeLink;
	    /**
	   * MarkdownIt#normalizeLinkText(url) -> String
	   *
	   * Function used to decode link url to a human-readable format`
	   **/ this.normalizeLinkText = normalizeLinkText;
	    // Expose utils & helpers for easy acces from plugins
	    /**
	   * MarkdownIt#utils -> utils
	   *
	   * Assorted utility functions, useful to write plugins. See details
	   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.mjs).
	   **/ this.utils = utils;
	    /**
	   * MarkdownIt#helpers -> helpers
	   *
	   * Link components parser functions, useful to write plugins. See details
	   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
	   **/ this.helpers = assign$1({}, helpers);
	    this.options = {};
	    this.configure(presetName);
	    if (options) {
	        this.set(options);
	    }
	}
	/** chainable
	 * MarkdownIt.set(options)
	 *
	 * Set parser options (in the same format as in constructor). Probably, you
	 * will never need it, but you can change options after constructor call.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')()
	 *             .set({ html: true, breaks: true })
	 *             .set({ typographer, true });
	 * ```
	 *
	 * __Note:__ To achieve the best possible performance, don't modify a
	 * `markdown-it` instance options on the fly. If you need multiple configurations
	 * it's best to create multiple instances and initialize each with separate
	 * config.
	 **/ MarkdownIt.prototype.set = function(options) {
	    assign$1(this.options, options);
	    return this;
	};
	/** chainable, internal
	 * MarkdownIt.configure(presets)
	 *
	 * Batch load of all options and compenent settings. This is internal method,
	 * and you probably will not need it. But if you will - see available presets
	 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
	 *
	 * We strongly recommend to use presets instead of direct config loads. That
	 * will give better compatibility with next versions.
	 **/ MarkdownIt.prototype.configure = function(presets) {
	    var self = this;
	    if (isString$1(presets)) {
	        var presetName = presets;
	        presets = config[presetName];
	        if (!presets) {
	            throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name');
	        }
	    }
	    if (!presets) {
	        throw new Error('Wrong `markdown-it` preset, can\'t be empty');
	    }
	    if (presets.options) {
	        self.set(presets.options);
	    }
	    if (presets.components) {
	        Object.keys(presets.components).forEach(function(name) {
	            if (presets.components[name].rules) {
	                self[name].ruler.enableOnly(presets.components[name].rules);
	            }
	            if (presets.components[name].rules2) {
	                self[name].ruler2.enableOnly(presets.components[name].rules2);
	            }
	        });
	    }
	    return this;
	};
	/** chainable
	 * MarkdownIt.enable(list, ignoreInvalid)
	 * - list (String|Array): rule name or list of rule names to enable
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * Enable list or rules. It will automatically find appropriate components,
	 * containing rules with given names. If rule not found, and `ignoreInvalid`
	 * not set - throws exception.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var md = require('markdown-it')()
	 *             .enable(['sub', 'sup'])
	 *             .disable('smartquotes');
	 * ```
	 **/ MarkdownIt.prototype.enable = function(list, ignoreInvalid) {
	    var result = [];
	    if (!Array.isArray(list)) {
	        list = [
	            list
	        ];
	    }
	    [
	        'core',
	        'block',
	        'inline'
	    ].forEach(function(chain) {
	        result = result.concat(this[chain].ruler.enable(list, true));
	    }, this);
	    result = result.concat(this.inline.ruler2.enable(list, true));
	    var missed = list.filter(function(name) {
	        return result.indexOf(name) < 0;
	    });
	    if (missed.length && !ignoreInvalid) {
	        throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
	    }
	    return this;
	};
	/** chainable
	 * MarkdownIt.disable(list, ignoreInvalid)
	 * - list (String|Array): rule name or list of rule names to disable.
	 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
	 *
	 * The same as [[MarkdownIt.enable]], but turn specified rules off.
	 **/ MarkdownIt.prototype.disable = function(list, ignoreInvalid) {
	    var result = [];
	    if (!Array.isArray(list)) {
	        list = [
	            list
	        ];
	    }
	    [
	        'core',
	        'block',
	        'inline'
	    ].forEach(function(chain) {
	        result = result.concat(this[chain].ruler.disable(list, true));
	    }, this);
	    result = result.concat(this.inline.ruler2.disable(list, true));
	    var missed = list.filter(function(name) {
	        return result.indexOf(name) < 0;
	    });
	    if (missed.length && !ignoreInvalid) {
	        throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
	    }
	    return this;
	};
	/** chainable
	 * MarkdownIt.use(plugin, params)
	 *
	 * Load specified plugin with given params into current parser instance.
	 * It's just a sugar to call `plugin(md, params)` with curring.
	 *
	 * ##### Example
	 *
	 * ```javascript
	 * var iterator = require('markdown-it-for-inline');
	 * var md = require('markdown-it')()
	 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
	 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
	 *             });
	 * ```
	 **/ MarkdownIt.prototype.use = function(plugin /*, params, ... */ ) {
	    var args = [
	        this
	    ].concat(Array.prototype.slice.call(arguments, 1));
	    plugin.apply(plugin, args);
	    return this;
	};
	/** internal
	 * MarkdownIt.parse(src, env) -> Array
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Parse input string and return list of block tokens (special token type
	 * "inline" will contain list of inline tokens). You should not call this
	 * method directly, until you write custom renderer (for example, to produce
	 * AST).
	 *
	 * `env` is used to pass data between "distributed" rules and return additional
	 * metadata like reference info, needed for the renderer. It also can be used to
	 * inject data in specific cases. Usually, you will be ok to pass `{}`,
	 * and then pass updated object to renderer.
	 **/ MarkdownIt.prototype.parse = function(src, env) {
	    if (typeof src !== 'string') {
	        throw new Error('Input data should be a String');
	    }
	    var state = new this.core.State(src, this, env);
	    this.core.process(state);
	    return state.tokens;
	};
	/**
	 * MarkdownIt.render(src [, env]) -> String
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Render markdown string into html. It does all magic for you :).
	 *
	 * `env` can be used to inject additional metadata (`{}` by default).
	 * But you will not need it with high probability. See also comment
	 * in [[MarkdownIt.parse]].
	 **/ MarkdownIt.prototype.render = function(src, env) {
	    env = env || {};
	    return this.renderer.render(this.parse(src, env), this.options, env);
	};
	/** internal
	 * MarkdownIt.parseInline(src, env) -> Array
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
	 * block tokens list with the single `inline` element, containing parsed inline
	 * tokens in `children` property. Also updates `env` object.
	 **/ MarkdownIt.prototype.parseInline = function(src, env) {
	    var state = new this.core.State(src, this, env);
	    state.inlineMode = true;
	    this.core.process(state);
	    return state.tokens;
	};
	/**
	 * MarkdownIt.renderInline(src [, env]) -> String
	 * - src (String): source string
	 * - env (Object): environment sandbox
	 *
	 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
	 * will NOT be wrapped into `<p>` tags.
	 **/ MarkdownIt.prototype.renderInline = function(src, env) {
	    env = env || {};
	    return this.renderer.render(this.parseInline(src, env), this.options, env);
	};

	var md = MarkdownIt({
	    html: true,
	    xhtmlOut: true
	});
	var Markup = /*#__PURE__*/ function() {
	    function Markup1() {}
	    Markup1.unescape = function unescape(text) {
	        var unescapeRules = [
	            [
	                "&amp;",
	                "&"
	            ],
	            [
	                "&lt;",
	                "<"
	            ],
	            [
	                "&gt;",
	                ">"
	            ],
	            [
	                "&quot;",
	                '"'
	            ],
	            [
	                "&#x27;",
	                "'"
	            ],
	            [
	                "&#x60;",
	                "`"
	            ]
	        ];
	        unescapeRules.forEach(function(param) {
	            var rule = param[0], out = param[1];
	            text = text.replaceAll(rule, out);
	        });
	        return text;
	    };
	    /**
	   * Parses format-specific syntax like passage links and snippet references
	   */ Markup1.parse = function parse(source) {
	        var _this = this;
	        var twineLink = function(dest, text, func) {
	            if (dest === void 0) dest = "";
	            if (text === void 0) text = "";
	            if (func === void 0) func = "";
	            return '<tw-link role="button" tabindex="0" data-destination="' + dest + '" ' + (func ? 'data-onclick="' + func + '"' : "") + ">" + text + "</tw-link>";
	        };
	        var linkRules = [
	            {
	                match: /\[\[(.+?)\|(.+?)\]\s?\[(.+?)\]\]/g,
	                render: function(param) {
	                    param[0]; var dest = param[1], text = param[2], func = param[3];
	                    return twineLink(dest, text, func);
	                }
	            },
	            {
	                match: /\[\[(.+?)\]\s?\[(.+?)\]\]/g,
	                render: function(param) {
	                    param[0]; var dest = param[1], func = param[2];
	                    return twineLink(dest, dest, func);
	                }
	            },
	            {
	                match: /\[\[(.+?)\|(.+?)\]\]/g,
	                render: function(param) {
	                    param[0]; var dest = param[1], text = param[2];
	                    return twineLink(dest, text);
	                }
	            },
	            {
	                match: /\[\[(.+?)\]\]/g,
	                render: function(param) {
	                    param[0]; var dest = param[1];
	                    return twineLink(dest, dest);
	                }
	            }
	        ];
	        linkRules.forEach(function(rule) {
	            source = source.replaceAll(rule.match, function(text) {
	                return rule.render(rule.match.exec(text) || []);
	            });
	        });
	        var renderSnippet = function(name, attrs, content) {
	            if (name === void 0) name = "";
	            if (attrs === void 0) attrs = "";
	            if (content === void 0) content = "";
	            if (!name) return "";
	            var passage = null;
	            try {
	                passage = window.Story.snippet(name);
	            } catch (e) {
	                console.error(new Error("Could not render snippet: " + e.message));
	            }
	            if (!passage) return "";
	            var context = {};
	            var attrRegex = /([\w\-]+)\s*\=\s*"([\s\S]*?)"/g;
	            var stuff;
	            while((stuff = attrRegex.exec(attrs)) !== null){
	                context[stuff[1]] = stuff[2];
	            }
	            if (content) context.content = snippet(content);
	            var snip = _this.snippet(passage.source, context);
	            return snip;
	        };
	        var snippetRules = [
	            {
	                match: /<%([a-z][a-z0-9\-]*)(\s+([\s\S]*?))?%>(([\s\S]*?)<%\/\1%>)/g,
	                render: function(param) {
	                    param[0]; var name = param[1]; param[2]; var tmp = param[3], attrs = tmp === void 0 ? "" : tmp; param[4]; var tmp1 = param[5], content = tmp1 === void 0 ? "" : tmp1;
	                    return renderSnippet(name, attrs, content);
	                }
	            },
	            {
	                match: /<%([a-z][a-z0-9\-]*)(\s+([\s\S]*?))?\/%>/g,
	                render: function(param) {
	                    param[0]; var name = param[1]; param[2]; var tmp = param[3], attrs = tmp === void 0 ? "" : tmp;
	                    return renderSnippet(name, attrs);
	                }
	            }
	        ];
	        function snippet(source) {
	            var temp = source;
	            snippetRules.forEach(function(snippetRule) {
	                temp = temp.replaceAll(snippetRule.match, function(text) {
	                    return snippetRule.render(snippetRule.match.exec(text) || []);
	                });
	            });
	            return temp;
	        }
	        source = snippet(source);
	        return source;
	    };
	    /**
	   * Parses markdown (not snippets) and returns the parsed content
	   */ Markup1.markdown = function markdown1(source) {
	        return md.render(source);
	    };
	    /**
	   * Adds the needed event listeners to elements like passage links.
	   */ Markup1.addListeners = function addListeners() {
	        document.querySelectorAll("tw-link").forEach(function(l) {
	            var _l_attributes_getNamedItem, _l_attributes_getNamedItem1;
	            var dest = (_l_attributes_getNamedItem = l.attributes.getNamedItem("data-destination")) == null ? void 0 : _l_attributes_getNamedItem.value;
	            var text = l.innerText;
	            var funcStr = (_l_attributes_getNamedItem1 = l.attributes.getNamedItem("data-onclick")) == null ? void 0 : _l_attributes_getNamedItem1.value;
	            if (!dest) {
	                console.warn('Could not find destination for link with text "' + text + '"');
	            }
	            l.addEventListener("click", function() {
	                if (funcStr) eval(funcStr);
	                if (dest) window.Engine.jump(dest);
	            });
	            l.addEventListener("keypress", function(e) {
	                if (e.key !== "Enter" && e.key !== " ") return;
	                if (funcStr) eval(funcStr);
	                if (dest) window.Engine.jump(dest);
	            });
	        });
	    };
	    /**
	   * Renders a snippet and returns the rendered html
	   */ Markup1.snippet = function snippet(source, context) {
	        return this.nunjucks.renderString(source, context);
	    };
	    return Markup1;
	}();
	Markup.nunjucks = nj.configure({
	    autoescape: true
	});

	function _class_private_field_loose_base$1(receiver, privateKey) {
	    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
	        throw new TypeError("attempted to use private field on non-instance");
	    }
	    return receiver;
	}
	var id$1 = 0;
	function _class_private_field_loose_key$1(name) {
	    return "__private_" + id$1++ + "_" + name;
	}
	var _passageEl = /*#__PURE__*/ _class_private_field_loose_key$1("_passageEl");
	var Engine = /*#__PURE__*/ function() {
	    function Engine() {
	        Object.defineProperty(this, _passageEl, {
	            writable: true,
	            value: void 0
	        });
	        // init with the passage element
	        var passageEl = document.querySelector("tw-passage");
	        if (!passageEl) throw new Error("tw-passage element is missing!");
	        _class_private_field_loose_base$1(this, _passageEl)[_passageEl] = passageEl;
	    }
	    var _proto = Engine.prototype;
	    _proto.start = function start() {
	        this.jump(window.Story.startPassage);
	    };
	    /**
	   * Finds, renders and displays the passage by the given name. 
	  */ _proto.jump = function jump(name) {
	        var passage;
	        try {
	            passage = window.Story.passage(name);
	        } catch (e) {
	            console.error(new Error("Could not jump to passage: " + e.message));
	            return;
	        }
	        var html = passage.render();
	        this.show(html);
	    };
	    _proto.show = function show(html) {
	        _class_private_field_loose_base$1(this, _passageEl)[_passageEl].innerHTML = html;
	        Markup.addListeners();
	    };
	    return Engine;
	}();

	var Malachite = /*#__PURE__*/ function() {
	    function Malachite() {
	        this.engine = new Engine();
	    }
	    var _proto = Malachite.prototype;
	    _proto.start = function start() {
	        this.engine.start();
	    };
	    return Malachite;
	}();

	var Passage = /*#__PURE__*/ function() {
	    function Passage(name, tags, source) {
	        this.name = name;
	        this.tags = tags;
	        this.source = source;
	    }
	    var _proto = Passage.prototype;
	    /**
	   * Renders the passage contents and returns the rendered html.
	   */ _proto.render = function render() {
	        var result = this.source;
	        result = Markup.parse(result);
	        if (this.tags.includes("snippet")) {
	            try {
	                result = Markup.snippet(result, {});
	            } catch (e) {
	                console.error(new Error("Could not render snippet: " + e.message));
	            }
	        }
	        result = Markup.markdown(result);
	        return result;
	    };
	    return Passage;
	}();

	function _class_private_field_loose_base(receiver, privateKey) {
	    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
	        throw new TypeError("attempted to use private field on non-instance");
	    }
	    return receiver;
	}
	var id = 0;
	function _class_private_field_loose_key(name) {
	    return "__private_" + id++ + "_" + name;
	}
	function _defineProperties(target, props) {
	    for(var i = 0; i < props.length; i++){
	        var descriptor = props[i];
	        descriptor.enumerable = descriptor.enumerable || false;
	        descriptor.configurable = true;
	        if ("value" in descriptor) descriptor.writable = true;
	        Object.defineProperty(target, descriptor.key, descriptor);
	    }
	}
	function _create_class(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	    return Constructor;
	}
	var _storydata = /*#__PURE__*/ _class_private_field_loose_key("_storydata"), _ifid = /*#__PURE__*/ _class_private_field_loose_key("_ifid"), _startPassage = /*#__PURE__*/ _class_private_field_loose_key("_startPassage"), _getStartPassage = /*#__PURE__*/ _class_private_field_loose_key("_getStartPassage");
	var Story = /*#__PURE__*/ function() {
	    function Story() {
	        var _this = this;
	        var _class_private_field_loose_base__storydata;
	        Object.defineProperty(this, _getStartPassage, {
	            value: getStartPassage
	        });
	        Object.defineProperty(this, _storydata, {
	            writable: true,
	            value: void 0
	        });
	        Object.defineProperty(this, _ifid, {
	            writable: true,
	            value: void 0
	        });
	        Object.defineProperty(this, _startPassage, {
	            writable: true,
	            value: void 0
	        });
	        this.name = this.getAttr("name") || "A Malachite Story";
	        this.passages = [];
	        this.snippets = [];
	        // init the story data, get the story name
	        var dataEl = document.querySelector("tw-storydata");
	        if (!dataEl) throw Error("Story data element is missing!");
	        _class_private_field_loose_base(this, _storydata)[_storydata] = dataEl;
	        // same for the ifid
	        var ifid = this.getAttr("ifid");
	        if (!ifid) throw Error("Story data ifid field is missing!");
	        _class_private_field_loose_base(this, _ifid)[_ifid] = ifid;
	        // get all the passage elements and add them to the passage array
	        (_class_private_field_loose_base__storydata = _class_private_field_loose_base(this, _storydata)[_storydata]) == null ? void 0 : _class_private_field_loose_base__storydata.querySelectorAll("tw-passagedata").forEach(function(p) {
	            var _p_attributes_getNamedItem, _p_attributes_getNamedItem1;
	            var name = ((_p_attributes_getNamedItem = p.attributes.getNamedItem("name")) == null ? void 0 : _p_attributes_getNamedItem.value) || "Passage";
	            var tags = (_p_attributes_getNamedItem1 = p.attributes.getNamedItem("tags")) == null ? void 0 : _p_attributes_getNamedItem1.value.split(" ");
	            var source = Markup.unescape(p.innerHTML);
	            if (!tags || !(tags == null ? void 0 : tags.includes("snippet"))) {
	                _this.passages.push(new Passage(name, tags || [], source));
	            } else {
	                _this.snippets.push(new Passage(name, tags || [], source));
	            }
	        });
	        // get the start passage
	        _class_private_field_loose_base(this, _startPassage)[_startPassage] = _class_private_field_loose_base(this, _getStartPassage)[_getStartPassage]();
	    }
	    var _proto = Story.prototype;
	    _proto.getAttr = function getAttr(attr) {
	        var _class_private_field_loose_base__storydata_attributes_getNamedItem, _class_private_field_loose_base__storydata;
	        return ((_class_private_field_loose_base__storydata = _class_private_field_loose_base(this, _storydata)[_storydata]) == null ? void 0 : (_class_private_field_loose_base__storydata_attributes_getNamedItem = _class_private_field_loose_base__storydata.attributes.getNamedItem(attr)) == null ? void 0 : _class_private_field_loose_base__storydata_attributes_getNamedItem.value) || null;
	    };
	    _proto.passagesByTag = function passagesByTag(tag) {
	        return this.passages.filter(function(p) {
	            return p.tags.includes(tag);
	        });
	    };
	    _proto.snippet = function snippet(name) {
	        var snippet = this.snippets.find(function(p) {
	            return p.name.split(" ").join("-").toLowerCase() === name.trim();
	        });
	        if (!snippet) throw new Error('No passage with name "' + name + '" found.');
	        return snippet;
	    };
	    _proto.passage = function passage(name) {
	        var passage = this.passages.find(function(p) {
	            return p.name === name.trim();
	        });
	        if (!passage) throw new Error('No snippet with name "' + name + '" found.');
	        return passage;
	    };
	    _create_class(Story, [
	        {
	            key: "ifid",
	            get: function get() {
	                return _class_private_field_loose_base(this, _ifid)[_ifid];
	            }
	        },
	        {
	            key: "startPassage",
	            get: function get() {
	                return _class_private_field_loose_base(this, _startPassage)[_startPassage].name;
	            }
	        }
	    ]);
	    return Story;
	}();
	function getStartPassage() {
	    var _class_private_field_loose_base__storydata_attributes_getNamedItem, _class_private_field_loose_base__storydata, _document_querySelector_attributes_getNamedItem, _document_querySelector;
	    // check if we at leats have a story data element. throw an error if not
	    if (!_class_private_field_loose_base(this, _storydata)[_storydata]) throw Error("No story data element found.");
	    // get the passage id of the starting passage
	    var startPassageId = parseInt(((_class_private_field_loose_base__storydata = _class_private_field_loose_base(this, _storydata)[_storydata]) == null ? void 0 : (_class_private_field_loose_base__storydata_attributes_getNamedItem = _class_private_field_loose_base__storydata.attributes.getNamedItem("startnode")) == null ? void 0 : _class_private_field_loose_base__storydata_attributes_getNamedItem.value) || "nah");
	    // and throw an error if it doesn't return a valid id ("nah")
	    if (isNaN(startPassageId)) throw Error("No start passage ID found.");
	    // get the starting passage name
	    var startPassageName = ((_document_querySelector = document.querySelector('[pid="' + startPassageId + '"]')) == null ? void 0 : (_document_querySelector_attributes_getNamedItem = _document_querySelector.attributes.getNamedItem("name")) == null ? void 0 : _document_querySelector_attributes_getNamedItem.value) || null;
	    // get the starting passage
	    var startPassage;
	    try {
	        startPassage = this.passage(startPassageName || "");
	    } catch (e) {
	        throw Error("Starting passage does not exist!");
	    }
	    return startPassage;
	}

	var malachite = new Malachite();
	window.Engine = malachite.engine;
	window.Story = new Story();
	window.Engine.start();

})();
