(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(14)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var script_1 = __webpack_require__(5);
exports.default = script_1.WindowType;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(6);
var draggable_helper_1 = __webpack_require__(15);
var resizable_helper_1 = __webpack_require__(16);
var button_vue_1 = __webpack_require__(17);
var dom_1 = __webpack_require__(7);
var z_element_1 = __webpack_require__(21);
var instances = [];
var WindowType = /** @class */ (function (_super) {
    tslib_1.__extends(WindowType, _super);
    function WindowType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zIndex = 'auto';
        _this.onResizeWindow = function () {
            _this.fixPosition();
        };
        return _this;
    }
    WindowType.prototype.mounted = function () {
        var _this = this;
        instances.push(this);
        this.isOpen && setPosition(this, this.initialPosition);
        this.draggableHelper = new draggable_helper_1.DraggableHelper(this.titlebarElement(), this.windowElement(), function () { return _this.fixPosition(); });
        this.setDimension();
        this.resizable && this.initResizeHelper();
        this.zElement = new z_element_1.ZElement(this.zGroup, function (zIndex) { return _this.zIndex = "" + zIndex; });
        window.addEventListener('resize', this.onResizeWindow);
    };
    WindowType.prototype.beforeDestroy = function () {
        window.removeEventListener('resize', this.onResizeWindow);
        this.zElement.unregister();
        this.resizableHelper && this.resizableHelper.teardown();
        this.draggableHelper.teardown();
        instances.splice(instances.indexOf(this), 1);
    };
    WindowType.prototype.windowElement = function () {
        return this.$refs.window;
    };
    WindowType.prototype.titlebarElement = function () {
        return this.$refs.titlebar;
    };
    WindowType.prototype.contentElement = function () {
        return this.$refs.content;
    };
    WindowType.prototype.activate = function () {
        this.zElement.raise();
    };
    Object.defineProperty(WindowType.prototype, "styleWindow", {
        get: function () {
            return tslib_1.__assign({}, this.windowStyle.window, { zIndex: this.zIndex });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowType.prototype, "styleTitlebar", {
        get: function () {
            return this.windowStyle.titlebar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WindowType.prototype, "styleContent", {
        get: function () {
            var style = tslib_1.__assign({}, this.windowStyle.content);
            if (this.resizable) {
                style.padding = '0';
            }
            if (this.isScrollable) {
                style.overflow = 'auto';
            }
            return style;
        },
        enumerable: true,
        configurable: true
    });
    WindowType.prototype.onResizableChange = function (resizable) {
        console.error("prop 'resizable' can't be changed");
    };
    WindowType.prototype.onIsOpenChange = function (isOpen) {
        if (isOpen && this.activateWhenOpen)
            this.activate();
    };
    WindowType.prototype.onZGroupChange = function () {
        this.zElement.group = this.zGroup;
    };
    WindowType.prototype.fixPosition = function () {
        var w = this.windowElement();
        var rect = w.getBoundingClientRect();
        if (rect.left < 0)
            w.style.left = "0px";
        if (rect.top < 0)
            w.style.top = "0px";
        if (rect.right > window.innerWidth)
            w.style.left = window.innerWidth - rect.width + "px";
        if (rect.bottom > window.innerHeight)
            w.style.top = window.innerHeight - rect.height + "px";
    };
    WindowType.prototype.setDimension = function () {
        var content = this.contentElement();
        if (this.initialWidth != undefined)
            content.style.width = this.initialWidth + "px";
        if (this.initialHeight != undefined)
            content.style.height = this.initialHeight + "px";
    };
    WindowType.prototype.initResizeHelper = function () {
        var _this = this;
        var titlebarHeight = dom_1.naturalSize(this.titlebarElement()).height;
        this.resizableHelper = new resizable_helper_1.ResizableHelper(this.windowElement(), {
            onResize: function () { return _this.onResize(); },
            minWidth: this.minWidth,
            minHeight: this.minHeight + titlebarHeight,
            maxWidth: this.maxWidth,
            maxHeight: this.maxHeight ? this.maxHeight + titlebarHeight : undefined,
        });
    };
    WindowType.prototype.onResize = function () {
        // const { width: wWidth, height: wHeight } = this.windowElement().getBoundingClientRect()
        var _a = dom_1.contentSize(this.windowElement()), wWidth = _a.width, wHeight = _a.height;
        var tHeight = this.titlebarElement().getBoundingClientRect().height;
        var content = this.contentElement();
        content.style.width = wWidth + "px";
        content.style.height = wHeight - tHeight + "px";
    };
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: true })
    ], WindowType.prototype, "isOpen", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: String, default: '' })
    ], WindowType.prototype, "title", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false })
    ], WindowType.prototype, "closeButton", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false })
    ], WindowType.prototype, "resizable", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false })
    ], WindowType.prototype, "isScrollable", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: true })
    ], WindowType.prototype, "activateWhenOpen", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: String, default: 'auto' })
    ], WindowType.prototype, "initialPosition", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 })
    ], WindowType.prototype, "zGroup", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], WindowType.prototype, "windowStyle", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Watch('resizable')
    ], WindowType.prototype, "onResizableChange", null);
    tslib_1.__decorate([
        vue_property_decorator_1.Watch('isOpen')
    ], WindowType.prototype, "onIsOpenChange", null);
    tslib_1.__decorate([
        vue_property_decorator_1.Watch('zGroup')
    ], WindowType.prototype, "onZGroupChange", null);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number })
    ], WindowType.prototype, "initialWidth", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number })
    ], WindowType.prototype, "initialHeight", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 })
    ], WindowType.prototype, "minWidth", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number, default: 0 })
    ], WindowType.prototype, "minHeight", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number })
    ], WindowType.prototype, "maxWidth", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Number })
    ], WindowType.prototype, "maxHeight", void 0);
    WindowType = tslib_1.__decorate([
        vue_property_decorator_1.Component({
            components: { MyButton: button_vue_1.default }
        })
    ], WindowType);
    return WindowType;
}(vue_property_decorator_1.Vue));
exports.WindowType = WindowType;
// todo: cleanup
function setPosition(w, positionString) {
    var el = w.windowElement();
    var _a = dom_1.naturalSize(el), width = _a.width, height = _a.height;
    var left;
    var top;
    switch (positionString) {
        case 'auto':
            {
                var x_1 = 20;
                var y_1 = 50;
                var nTries = 0;
                do {
                    if (instances.every(function (j) {
                        if (w == j)
                            return true;
                        var _a = j.windowElement().getBoundingClientRect(), left = _a.left, top = _a.top;
                        return distance2(left, top, x_1, y_1) > 16;
                    })) {
                        break;
                    }
                    x_1 = (x_1 + 40) % (window.innerWidth - 200);
                    y_1 = (y_1 + 40) % (window.innerHeight - 200);
                } while (++nTries < 100);
                left = x_1;
                top = y_1;
            }
            break;
        case 'center':
            left = (window.innerWidth - width) / 2;
            top = (window.innerHeight - height) / 2;
            break;
        default:
            try {
                var nums = positionString.split('/').map(Number);
                if (nums.length != 2)
                    throw null;
                var x = nums[0], y = nums[1];
                if (!isFinite(x) || !isFinite(y))
                    throw null;
                left = x >= 0 ? x : window.innerWidth - width + x;
                top = y >= 0 ? y : window.innerHeight - height + y;
            }
            catch (e) {
                throw new Error("invalid position string: " + positionString);
            }
    }
    el.style.left = left + "px";
    el.style.top = top + "px";
}
function distance2(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy;
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("vue-property-decorator");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function naturalSize(el) {
    var _a = el.style, width = _a.width, height = _a.height;
    el.style.width = 'auto';
    el.style.height = 'auto';
    var rect = contentSize(el);
    el.style.width = width;
    el.style.height = height;
    return rect;
}
exports.naturalSize = naturalSize;
function contentSize(el) {
    var style = window.getComputedStyle(el);
    var width = Number(style.width.split('px')[0]);
    var height = Number(style.height.split('px')[0]);
    var top = Number(style.top.split('px')[0]);
    var left = Number(style.left.split('px')[0]);
    var right = left + width;
    var bottom = top + height;
    return { width: width, height: height, top: top, left: left, bottom: bottom, right: right };
}
exports.contentSize = contentSize;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var vue_property_decorator_1 = __webpack_require__(6);
var default_1 = /** @class */ (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hover = false;
        _this.active = false;
        return _this;
    }
    Object.defineProperty(default_1.prototype, "style", {
        get: function () {
            var s = this.windowStyle.button;
            this.hover && (s = tslib_1.__assign({}, s, this.windowStyle.buttonHover));
            this.active && (s = tslib_1.__assign({}, s, this.windowStyle.buttonActive));
            return s;
        },
        enumerable: true,
        configurable: true
    });
    default_1.prototype.mousedown = function (e) {
        var _this = this;
        e.preventDefault();
        this.active = true;
        document.addEventListener('mouseup', function (e) { return _this.active = false; });
    };
    tslib_1.__decorate([
        vue_property_decorator_1.Inject()
    ], default_1.prototype, "windowStyle", void 0);
    tslib_1.__decorate([
        vue_property_decorator_1.Prop({ type: Boolean, default: false })
    ], default_1.prototype, "disabled", void 0);
    default_1 = tslib_1.__decorate([
        vue_property_decorator_1.Component
    ], default_1);
    return default_1;
}(vue_property_decorator_1.Vue));
exports.default = default_1;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_vue_1 = __webpack_require__(11);
var style_1 = __webpack_require__(23);
exports.StyleBlack = style_1.StyleBlack;
exports.StyleWhite = style_1.StyleWhite;
exports.StyleMetal = style_1.StyleMetal;
exports.StyleFactory = style_1.StyleFactory;
var script_1 = __webpack_require__(5);
exports.WindowType = script_1.WindowType;
function install(vue, options) {
    if (options === void 0) { options = { prefix: 'hsc-window' }; }
    var prefix = options.prefix;
    vue.component("" + prefix, index_vue_1.default);
    vue.component(prefix + "-style-black", style_1.StyleBlack);
    vue.component(prefix + "-style-white", style_1.StyleWhite);
    vue.component(prefix + "-style-metal", style_1.StyleMetal);
}
exports.install = install;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_300294cc_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-300294cc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_300294cc_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/window/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-300294cc", Component.options)
  } else {
    hotAPI.reload("data-v-300294cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("2d6076cf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-300294cc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-300294cc\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\n.window[data-v-300294cc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: column;\n          flex-flow: column;\n  position: absolute;\n  border-radius: 4pt 4pt 0 0;\n}\n.titlebar[data-v-300294cc] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row nowrap;\n          flex-flow: row nowrap;\n  border-radius: 4pt 4pt 0 0;\n  font-family: sans-serif;\n  padding: .5em;\n  -webkit-box-flex: 0;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n}\n.title[data-v-300294cc] {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.content[data-v-300294cc] {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  padding: 0.5em;\n}\n.draggable-handle[data-v-300294cc] {\n  cursor: move;\n}\n.fade-enter[data-v-300294cc],\n.fade-leave-to[data-v-300294cc] {\n  opacity: 0;\n  -webkit-transform: scale(0.9);\n          transform: scale(0.9);\n}\n.fade-enter-active[data-v-300294cc],\n.fade-leave-active[data-v-300294cc] {\n  transition: 0.2s;\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DraggableHelper = /** @class */ (function () {
    function DraggableHelper(handle, container, onMove) {
        var _this = this;
        this.handle = handle;
        this.container = container;
        this.onMove = onMove;
        this.mousedown = function (e) {
            // e.stopPropagation()
            e.preventDefault();
            var _a = _this.handle.getBoundingClientRect(), left = _a.left, top = _a.top;
            _this.offsetX = e.clientX - left;
            _this.offsetY = e.clientY - top;
            document.addEventListener('mousemove', _this.mousemove);
            document.addEventListener('mouseup', _this.mouseup);
        };
        this.mousemove = function (e) {
            _this.container.style.left = e.clientX - _this.offsetX + "px";
            _this.container.style.top = e.clientY - _this.offsetY + "px";
            _this.onMove && _this.onMove();
        };
        this.mouseup = function (e) {
            document.removeEventListener('mousemove', _this.mousemove);
            document.removeEventListener('mouseup', _this.mouseup);
        };
        handle.addEventListener('mousedown', this.mousedown);
        handle.classList.add('draggable-handle');
    }
    DraggableHelper.prototype.teardown = function () {
        this.handle.removeEventListener('mousedown', this.mousedown);
        this.handle.classList.remove('draggable-handle');
    };
    return DraggableHelper;
}());
exports.DraggableHelper = DraggableHelper;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(7);
var ResizableHelper = /** @class */ (function () {
    function ResizableHelper(container, options) {
        var _this = this;
        this.container = container;
        this.options = options;
        this.handles = HandleClasses.map(function (H) { return new H(container, _this); });
        var _a = dom_1.naturalSize(container), width = _a.width, height = _a.height;
        var maxWidth = options.maxWidth || window.innerWidth;
        var maxHeight = options.maxHeight || window.innerHeight;
        var resize = false;
        if (width < options.minWidth || width > maxWidth) {
            container.style.width = clamp(width, options.minWidth, maxWidth) + "px";
            resize = true;
        }
        if (height < options.minHeight || height > maxHeight) {
            container.style.height = clamp(height, options.minHeight, maxHeight) + "px";
            resize = true;
        }
        resize && options.onResize && options.onResize();
    }
    ResizableHelper.prototype.teardown = function () {
        this.handles.forEach(function (h) { return h.teardown(); });
    };
    return ResizableHelper;
}());
exports.ResizableHelper = ResizableHelper;
var HandleClasses = [];
var HandleBase = /** @class */ (function () {
    function HandleBase(container, helper) {
        var _this = this;
        this.container = container;
        this.helper = helper;
        this.handleSize = 8;
        this.mousedown = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var _a = dom_1.contentSize(_this.container), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
            _this.x0 = e.clientX;
            _this.y0 = e.clientY;
            _this.left0 = left;
            _this.top0 = top;
            _this.width0 = width;
            _this.height0 = height;
            _this.calcSafeBoundaries();
            document.addEventListener('mousemove', _this.mousemove);
            document.addEventListener('mouseup', _this.mouseup);
        };
        this.mousemove = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.setPosition(e);
            _this.fixPosition();
            _this.helper.options.onResize && _this.helper.options.onResize();
        };
        this.mouseup = function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.removeEventListener('mousemove', _this.mousemove);
            document.removeEventListener('mouseup', _this.mouseup);
        };
        this.handle = this.createHandleElement();
        this.handle.addEventListener('mousedown', this.mousedown);
        // this.handle.style.border = 'solid 1px black'
    }
    HandleBase.prototype.teardown = function () {
        this.handle.removeEventListener('mousedown', this.mousedown);
        this.handle.parentElement.removeChild(this.handle);
    };
    HandleBase.prototype.calcSafeBoundaries = function () {
        var _a = dom_1.contentSize(this.container), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
        var options = this.helper.options;
        var maxWidth = options.maxWidth || window.innerWidth;
        var maxHeight = options.maxHeight || window.innerHeight;
        this.minLeft = Math.max(right - maxWidth, 0);
        this.maxLeft = right - options.minWidth;
        this.minRight = left + options.minWidth;
        this.maxRight = Math.min(left + maxWidth, window.innerWidth);
        this.minTop = Math.max(bottom - maxHeight, 0);
        this.maxTop = bottom - options.minHeight;
        this.minBottom = top + options.minHeight;
        this.maxBottom = Math.min(top + maxHeight, window.innerHeight);
    };
    HandleBase.prototype.fixPosition = function () {
        var _a = dom_1.contentSize(this.container), width = _a.width, height = _a.height, left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
        var options = this.helper.options;
        if (left < this.minLeft) {
            this.container.style.width = width + left - this.minLeft + "px";
            this.container.style.left = this.minLeft + "px";
        }
        else if (left > this.maxLeft) {
            this.container.style.width = options.minWidth + "px";
            this.container.style.left = this.maxLeft + "px";
        }
        else if (right < this.minRight) {
            this.container.style.width = options.minWidth + "px";
        }
        else if (right > this.maxRight) {
            this.container.style.width = this.maxRight - left + "px";
        }
        if (top < this.minTop) {
            this.container.style.height = height + top - this.minTop + "px";
            this.container.style.top = this.minTop + "px";
        }
        else if (top > this.maxTop) {
            this.container.style.height = options.minHeight + "px";
            this.container.style.top = this.maxTop + "px";
        }
        else if (bottom < this.minBottom) {
            this.container.style.height = options.minHeight + "px";
        }
        else if (bottom > this.maxBottom) {
            this.container.style.height = this.maxBottom - top + "px";
        }
    };
    HandleBase.prototype.createHandleElement = function () {
        var div = document.createElement('div');
        var style = div.style;
        // style.border = 'solid 1px red'
        // style.backgroundColor = 'rgba(0,0,0,0.25)'
        style.position = 'absolute';
        this.applyStyle(style);
        this.container.appendChild(div);
        return div;
    };
    return HandleBase;
}());
HandleClasses.push(/** @class */ (function (_super) {
    tslib_1.__extends(BottomRight, _super);
    function BottomRight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BottomRight.prototype.setPosition = function (e) {
        this.container.style.width = this.width0 + e.clientX - this.x0 + "px";
        this.container.style.height = this.height0 + e.clientY - this.y0 + "px";
    };
    BottomRight.prototype.applyStyle = function (style) {
        style.width = 2 * this.handleSize + "px";
        style.height = 2 * this.handleSize + "px";
        style.right = -this.handleSize + "px";
        style.bottom = -this.handleSize + "px";
        style.cursor = 'nwse-resize';
    };
    return BottomRight;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(Bottom, _super);
    function Bottom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bottom.prototype.setPosition = function (e) {
        this.container.style.height = this.height0 + e.clientY - this.y0 + "px";
    };
    Bottom.prototype.applyStyle = function (style) {
        style.right = this.handleSize + "px";
        style.left = this.handleSize + "px";
        style.height = 2 * this.handleSize + "px";
        style.bottom = -this.handleSize + "px";
        style.cursor = 'ns-resize';
    };
    return Bottom;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(BottomLeft, _super);
    function BottomLeft() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BottomLeft.prototype.setPosition = function (e) {
        this.container.style.left = this.left0 + e.clientX - this.x0 + "px";
        this.container.style.width = this.width0 - (e.clientX - this.x0) + "px";
        this.container.style.height = this.height0 + e.clientY - this.y0 + "px";
    };
    BottomLeft.prototype.applyStyle = function (style) {
        style.left = -this.handleSize + "px";
        style.bottom = -this.handleSize + "px";
        style.width = 2 * this.handleSize + "px";
        style.height = 2 * this.handleSize + "px";
        style.cursor = 'nesw-resize';
    };
    return BottomLeft;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(Left, _super);
    function Left() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Left.prototype.setPosition = function (e) {
        this.container.style.left = this.left0 + e.clientX - this.x0 + "px";
        this.container.style.width = this.width0 - (e.clientX - this.x0) + "px";
    };
    Left.prototype.applyStyle = function (style) {
        style.left = -this.handleSize + "px";
        style.bottom = this.handleSize + "px";
        style.width = 2 * this.handleSize + "px";
        style.top = this.handleSize + "px";
        style.cursor = 'ew-resize';
    };
    return Left;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(TopLeft, _super);
    function TopLeft() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopLeft.prototype.setPosition = function (e) {
        this.container.style.left = this.left0 + e.clientX - this.x0 + "px";
        this.container.style.width = this.width0 - (e.clientX - this.x0) + "px";
        this.container.style.top = this.top0 + e.clientY - this.y0 + "px";
        this.container.style.height = this.height0 - (e.clientY - this.y0) + "px";
    };
    TopLeft.prototype.applyStyle = function (style) {
        style.left = -this.handleSize + "px";
        style.top = -this.handleSize + "px";
        style.width = 2 * this.handleSize + "px";
        style.height = 2 * this.handleSize + "px";
        style.cursor = 'nwse-resize';
    };
    return TopLeft;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(Top, _super);
    function Top() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Top.prototype.setPosition = function (e) {
        this.container.style.top = this.top0 + e.clientY - this.y0 + "px";
        this.container.style.height = this.height0 - (e.clientY - this.y0) + "px";
    };
    Top.prototype.applyStyle = function (style) {
        style.left = this.handleSize + "px";
        style.right = this.handleSize + "px";
        style.height = 2 * this.handleSize + "px";
        style.top = -this.handleSize + "px";
        style.cursor = 'ns-resize';
    };
    return Top;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(TopRight, _super);
    function TopRight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopRight.prototype.setPosition = function (e) {
        this.container.style.top = this.top0 + e.clientY - this.y0 + "px";
        this.container.style.height = this.height0 - (e.clientY - this.y0) + "px";
        this.container.style.width = this.width0 + e.clientX - this.x0 + "px";
    };
    TopRight.prototype.applyStyle = function (style) {
        style.right = -this.handleSize + "px";
        style.top = -this.handleSize + "px";
        style.height = 2 * this.handleSize + "px";
        style.width = 2 * this.handleSize + "px";
        style.cursor = 'nesw-resize';
    };
    return TopRight;
}(HandleBase)), /** @class */ (function (_super) {
    tslib_1.__extends(Right, _super);
    function Right() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Right.prototype.setPosition = function (e) {
        this.container.style.width = this.width0 + e.clientX - this.x0 + "px";
    };
    Right.prototype.applyStyle = function (style) {
        style.right = -this.handleSize + "px";
        style.top = this.handleSize + "px";
        style.bottom = this.handleSize + "px";
        style.width = 2 * this.handleSize + "px";
        style.cursor = 'ew-resize';
    };
    return Right;
}(HandleBase)));
function clamp(x, min, max) {
    return x < min ? min : (x > max ? max : x);
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_button_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_button_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_button_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_button_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_button_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_22b0d96a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_button_vue__ = __webpack_require__(20);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-22b0d96a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__ts_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_button_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_22b0d96a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_button_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/button.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22b0d96a", Component.options)
  } else {
    hotAPI.reload("data-v-22b0d96a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e13da89", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22b0d96a\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./button.vue", function() {
     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-22b0d96a\",\"scoped\":true,\"hasInlineConfig\":false}!../node_modules/sass-loader/lib/loader.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./button.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "\nbutton[data-v-22b0d96a] {\n  background-color: transparent;\n  border: none;\n  font-size: medium;\n  margin: 0;\n  padding: 0 0.25em;\n  border-radius: 4pt;\n}\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      style: _vm.style,
      attrs: { disabled: _vm.disabled },
      on: {
        click: function($event) {
          _vm.$emit("click")
        },
        mouseenter: function($event) {
          _vm.hover = true
        },
        mouseleave: function($event) {
          _vm.hover = false
        },
        mousedown: function($event) {
          $event.stopPropagation()
          _vm.mousedown($event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-22b0d96a", esExports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ZElement = /** @class */ (function () {
    function ZElement(_group, onChange) {
        var _this = this;
        this._group = _group;
        this.onChange = onChange;
        this.a(function (a) { return a.push(_this); });
    }
    Object.defineProperty(ZElement.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (_group) {
            this._group = _group;
            var a1 = a(this._group);
            var a2 = a(_group);
            a1.splice(a1.indexOf(this), 1);
            a2.push(this);
            refresh();
        },
        enumerable: true,
        configurable: true
    });
    ZElement.prototype.unregister = function () {
        var _this = this;
        this.a(function (a) { return a.splice(a.indexOf(_this), 1); });
    };
    ZElement.prototype.raise = function () {
        var _this = this;
        this.a(function (a) {
            a.splice(a.indexOf(_this), 1);
            a.push(_this);
        });
    };
    ZElement.prototype.a = function (cb) {
        cb(a(this._group));
        refresh();
    };
    return ZElement;
}());
exports.ZElement = ZElement;
var registry = new Map();
var BASE = 1000; // TODO move to config
function a(group) {
    if (!registry.has(group))
        registry.set(group, []);
    return registry.get(group);
}
function refresh() {
    var zIndex = BASE;
    for (var _i = 0, _a = keys(registry).sort(); _i < _a.length; _i++) {
        var g = _a[_i];
        for (var _b = 0, _c = a(g); _b < _c.length; _b++) {
            var z = _c[_b];
            if (zIndex != z.zIndex) {
                z.zIndex = zIndex;
                z.onChange(zIndex);
            }
            zIndex++;
        }
    }
}
function keys(map) {
    var keys = [];
    map.forEach(function (v, k) { return keys.push(k); });
    return keys;
}


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    {
      attrs: { name: "fade" },
      on: {
        "after-leave": function($event) {
          _vm.$emit("close")
        }
      }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isOpen,
              expression: "isOpen"
            }
          ],
          ref: "window",
          staticClass: "window",
          style: _vm.styleWindow,
          on: { mousedown: _vm.activate }
        },
        [
          _c(
            "div",
            {
              ref: "titlebar",
              staticClass: "titlebar",
              style: _vm.styleTitlebar
            },
            [
              _c(
                "div",
                { staticClass: "title" },
                [
                  _vm.$slots.title
                    ? [_vm._t("title")]
                    : [_vm._v(_vm._s(_vm.title))]
                ],
                2
              ),
              _vm._v(" "),
              _vm.closeButton
                ? [
                    _c(
                      "my-button",
                      {
                        on: {
                          click: function($event) {
                            _vm.$emit("closebuttonclick")
                          }
                        }
                      },
                      [_vm._v("×")]
                    )
                  ]
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { ref: "content", staticClass: "content", style: _vm.styleContent },
            [_vm._t("default")],
            2
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-300294cc", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function StyleFactory(windowStyle) {
    return {
        provide: function () {
            return { windowStyle: windowStyle };
        },
        render: function (h) {
            return h('div', this.$slots.default);
        },
    };
}
exports.StyleFactory = StyleFactory;
exports.StyleBlack = StyleFactory({
    window: {
        color: '#fff',
        boxShadow: '0 0 6pt rgba(255, 255, 255, 0.75)',
        backgroundColor: 'rgba(31, 31, 31, 0.9)'
    },
    titlebar: {
        backgroundColor: 'rgba(63, 63, 63, 0.9)'
    },
    content: {},
    button: {
        color: 'white'
    },
    buttonHover: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)'
    },
    buttonActive: {
        color: 'black',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});
exports.StyleWhite = StyleFactory({
    window: {
        color: '#000',
        boxShadow: '0 2pt 4pt rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(239, 239, 239, 0.95)'
    },
    titlebar: {
        backgroundColor: 'rgba(191, 191, 191, 0.9)'
    },
    content: {},
    button: {
        color: '#000'
    },
    buttonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    buttonActive: {
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});
exports.StyleMetal = StyleFactory({
    window: {
        color: '#000',
        boxShadow: '0 4pt 8pt rgba(0, 0, 0, 0.5)',
        background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))'
    },
    titlebar: {
        background: 'linear-gradient(to bottom, rgb(215, 215, 215), rgb(191, 191, 191))'
    },
    content: {},
    button: {
        color: '#000'
    },
    buttonHover: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    buttonActive: {
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});


/***/ })
/******/ ])));