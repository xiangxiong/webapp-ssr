/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createWebSocket = createWebSocket;
exports.initEventHandle = initEventHandle;
exports.closeConnection = closeConnection;
var ws;
var lockReconnect = false;
var wsUrl = 'wss://stream.binance.cloud:9443/ws/bnbbtc@depth20';

function createWebSocket() {
    try {
        ws = new WebSocket(wsUrl);
        initEventHandle();
    } catch (e) {
        reconnect(wsUrl);
    }
}

function initEventHandle() {
    ws.onclose = function () {
        reconnect(wsUrl);
    };
    ws.onerror = function () {
        reconnect(wsUrl);
    };
    ws.onopen = function () {
        heartCheck.reset().start();
    };
    ws.onmessage = function (event) {
        heartCheck.reset().start();
    };
}

function closeConnection() {
    ws.close();
}

function reconnect(url) {
    if (lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 2000);
}

var heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function reset() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function start() {
        var self = this;
        this.timeoutObj = setTimeout(function () {
            ws.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function () {
                ws.close();
            }, self.timeout);
        }, this.timeout);
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _reactRedux = __webpack_require__(1);

var _actions = __webpack_require__(7);

var _style = __webpack_require__(38);

var _style2 = _interopRequireDefault(_style);

var _withStyle = __webpack_require__(13);

var _withStyle2 = _interopRequireDefault(_withStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
    _inherits(Header, _Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));
    }

    _createClass(Header, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.staticContext) {
                this.props.staticContext.css.push(_style2.default._getCss());
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                login = _props.login,
                handleLogin = _props.handleLogin,
                handleLoginOut = _props.handleLoginOut;


            return _react2.default.createElement(
                'div',
                { className: _style2.default.test1 },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/' },
                    '\u9996\u9875'
                ),
                _react2.default.createElement('br', null),
                login ? _react2.default.createElement(
                    _react.Fragment,
                    null,
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/translation' },
                        '\u7FFB\u8BD1\u5217\u8868'
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        { onClick: handleLoginOut },
                        '\u9000\u51FA'
                    )
                ) : _react2.default.createElement(
                    'div',
                    { onClick: handleLogin },
                    '\u767B\u5F55'
                )
            );
        }
    }]);

    return Header;
}(_react.Component);

var mapState = function mapState(state) {
    return {
        login: state.header.login
    };
};

var mapDispatch = function mapDispatch(dispatch) {
    return {
        handleLogin: function handleLogin() {
            dispatch((0, _actions.login)());
        },
        handleLoginOut: function handleLoginOut() {
            dispatch((0, _actions.loginOut)());
        }
    };
};

// 实际上是一个高阶组件.
exports.default = (0, _reactRedux.connect)(mapState, mapDispatch)(Header);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHeaderInfo = exports.loginOut = exports.login = undefined;

var _constants = __webpack_require__(8);

var changeLogin = function changeLogin(value) {
    return {
        type: _constants.CHANGE_LOGIN,
        value: value
    };
};

var login = exports.login = function login() {
    return function (dispatch, getState, axiosInstance) {
        return axiosInstance.get('/api/login.json').then(function (res) {
            dispatch(changeLogin(true));
        });
    };
};

var loginOut = exports.loginOut = function loginOut() {
    return function (dispatch, getState, axiosInstance) {
        return axiosInstance.get('/api/logout.json').then(function (res) {
            dispatch(changeLogin(false));
        });
    };
};

var getHeaderInfo = exports.getHeaderInfo = function getHeaderInfo() {
    return function (dispatch, getState, axiosInstance) {
        return axiosInstance.get('/api/isLogin.json?secret=D37msjPeC3').then(function (res) {
            dispatch(changeLogin(res.data.data.login));
        });
    };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_LOGIN = exports.CHANGE_LOGIN = 'HOME/CHANGE_LOGIN';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.reducer = undefined;

var _reducer = __webpack_require__(23);

var _reducer2 = _interopRequireDefault(_reducer);

var _actions = __webpack_require__(7);

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reducer = _reducer2.default;
exports.actions = actions;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    secret: 'D37msjPeC3'
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_LIST = exports.CHANGE_LIST = 'HOME/CHANGE_LIST';

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_LIST = exports.CHANGE_LIST = 'TRANSLATION/CHANGE_LIST';

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 这个函数，返回一个组件
// 这个函数，是生成高阶组件的函数.
exports.default = function (DecoratedComponent, styles) {
    // 返回的组件，叫高阶组件
    return function (_Component) {
        _inherits(NewComponent, _Component);

        function NewComponent() {
            _classCallCheck(this, NewComponent);

            return _possibleConstructorReturn(this, (NewComponent.__proto__ || Object.getPrototypeOf(NewComponent)).apply(this, arguments));
        }

        _createClass(NewComponent, [{
            key: 'componentWillMount',
            value: function componentWillMount() {
                if (this.props.staticContext) {
                    this.props.staticContext.css.push(styles._getCss());
                }
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(DecoratedComponent, this.props);
            }
        }]);

        return NewComponent;
    }(_react.Component);
};

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(40);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(41);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _home = __webpack_require__(24);

var _home2 = _interopRequireDefault(_home);

var _App = __webpack_require__(21);

var _App2 = _interopRequireDefault(_App);

var _trade = __webpack_require__(29);

var _trade2 = _interopRequireDefault(_trade);

var _translation = __webpack_require__(30);

var _translation2 = _interopRequireDefault(_translation);

var _notfound = __webpack_require__(28);

var _notfound2 = _interopRequireDefault(_notfound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/',
  component: _App2.default,
  loadData: _App2.default.loadData,
  routes: [{
    path: '/',
    component: _home2.default,
    exact: true,
    loadData: _home2.default.loadData,
    key: 'home'
  }, {
    path: '/trade',
    component: _trade2.default,
    exact: true,
    key: 'trade'
  }, {
    path: '/translation',
    component: _translation2.default,
    loadData: _translation2.default.loadData,
    exact: true,
    key: 'translation'
  }, {
    component: _notfound2.default
  }]
}];
// export default (
//     <div>
//         <Route path='/' exact component={Home}></Route>
//         <Route path='/trade' exact component={Trade}></Route>
//     </div>
// )

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(42);

var _reactRouterDom = __webpack_require__(2);

var _reactRouterConfig = __webpack_require__(3);

var _reactRedux = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = exports.render = function render(store, routes, req, context) {
    var content = (0, _server.renderToString)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.path, context: context },
            _react2.default.createElement(
                'div',
                null,
                (0, _reactRouterConfig.renderRoutes)(routes)
            )
        )
    ));

    var cssStr = context.css.length ? context.css.join('\n') : '';

    //  console.log("cssStr",cssStr);
    return '<html>\n     <head>\n         <title>ssr</title>\n         <style>' + cssStr + '</style>\n     </head>\n     <body>\n     <div id="root">' + content + '</div>\n     <script>\n     window.context = {\n         state:' + JSON.stringify(store.getState()) + '\n     }\n     </script>\n     </body>\n     </html>\n     <script src=\'/index.js\'></script>\n     ';
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getClientStore = exports.getStore = undefined;

var _redux = __webpack_require__(43);

var _reduxThunk = __webpack_require__(44);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _store = __webpack_require__(26);

var _store2 = __webpack_require__(9);

var _store3 = __webpack_require__(32);

var _request = __webpack_require__(22);

var _request2 = _interopRequireDefault(_request);

var _request3 = __webpack_require__(35);

var _request4 = _interopRequireDefault(_request3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)({
    home: _store.reducer,
    header: _store2.reducer,
    translation: _store3.reducer
});
// const reducer = (state = {name:'dll'},action)=>{
//     return state;
// }

var getStore = exports.getStore = function getStore(req) {
    // 改变服务器端store的内容,那么就一定要使用serverAxios.
    return (0, _redux.createStore)(reducer, (0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument((0, _request4.default)(req))));
};

var getClientStore = exports.getClientStore = function getClientStore() {
    var defaultState = window.context.state;
    // 改变客户端store的内容,一定要使用clientAxios.

    return (0, _redux.createStore)(reducer, defaultState, (0, _redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument(_request2.default)));
};
// const store = createStore(reducer);
exports.default = getStore;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Header = __webpack_require__(6);

var _Header2 = _interopRequireDefault(_Header);

var _Connection = __webpack_require__(5);

var _reactRouterConfig = __webpack_require__(3);

var _store = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = props;
        return _this;
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Header2.default, null),
                (0, _reactRouterConfig.renderRoutes)(this.state.route.routes)
            );
        }
    }]);

    return App;
}(_react.Component);

App.loadData = function (store) {
    return store.dispatch(_store.actions.getHeaderInfo());
};
exports.default = App;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _config = __webpack_require__(10);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = _axios2.default.create({
    baseURL: '/',
    params: {
        secret: _config2.default.secret
    }
});
exports.default = instance;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(8);

var defaultState = {
    login: true
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case _constants.CHANGE_LOGIN:
            return _extends({}, state, {
                login: action.value
            });
        default:
            return state;
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(1);

var _actions = __webpack_require__(25);

var _style = __webpack_require__(39);

var _style2 = _interopRequireDefault(_style);

var _withStyle = __webpack_require__(13);

var _withStyle2 = _interopRequireDefault(_withStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: 'getList',


        // componentWillMount(){
        //     if(this.props.staticContext){
        //         // console.log("styles._getCss()",styles._getCss());
        //         this.props.staticContext.css.push(styles._getCss());
        //     }
        // }

        value: function getList() {
            var list = this.props.list;

            return list == null ? "" : list.map(function (item, i) {
                return _react2.default.createElement(
                    'div',
                    { key: i },
                    item.title,
                    ' '
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: _style2.default.test },
                this.getList()
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.list && !this.props.list.length) {
                this.props.getHomeList();
            }
        }
    }]);

    return Home;
}(_react.Component);

Home.loadData = function (store) {
    // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好.
    return store.dispatch((0, _actions.getHomeList)());
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        list: state.home.newsList
        //  name:state.home.name
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        getHomeList: function getHomeList() {
            dispatch((0, _actions.getHomeList)());
        }
    };
};

// const ExportHome = 

// ExportHome.loadData = (store) =>{
//     // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好.
//    return store.dispatch(getHomeList());
// }


exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _withStyle2.default)(Home, _style2.default));

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getHomeList = undefined;

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _constants = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import clientAxios from '../../../client/request';
// import serverAxios from '../../../server/request';

var changeList = function changeList(list) {
    return {
        type: _constants.CHANGE_LIST,
        list: list
    };
};

var getHomeList = exports.getHomeList = function getHomeList() {
    return function (dispatch, getState, axiosInstance) {
        return axiosInstance.get('/api/news.json').then(function (res) {
            var list = res.data.data;
            dispatch(changeList(list));
        });
    };
};
// http://47.95.113.63/ssr/api/news.json?secret=D37msjPeC3
// 浏览器运行
// http:localhost:3000/api/news.json
// 服务器运行
// 服务器根目录下/api/news.json
// let url = '';
// if(server){
//     url = 'http://47.95.113.63/ssr/api/news.json?secret=D37msjPeC3';
// }else{
//     url = '/api/news.json?secret=D37msjPeC3';
// }
// let request = null;
// if(server){
//     request = serverAxios;
// }else{
//     request = clientAxios;
// }
// const request = server ? serverAxios : clientAxios;

// const options = {
//     method:'get',
//     headers:{"Access-Control-Allow-Origin":"*"},
//     url:url
// };
// const options = {
//     method: 'POST',
//     headers: { "Access-Control-Allow-Origin":"*" },
//     // data: qs.stringify(data),
//     url
//   }
// axios(options)
// .then((response)=>{
//     response.headers.
// });

//  const url = 'https://www.binance.co/exchange/public/product';
//  const list =  [{
//     "symbol": "ETHSGD",
//     "quoteAssetName": "SGD",
//     "tradedMoney": 357.0,
//     "baseAssetUnit": "",
//     "baseAssetName": "ETH",
//     "baseAsset": "ETH",
//     "tickSize": "0.0000001",
//     "prevClose": 140.0,
//     "activeBuy": 0.0,
//     "high": "140.0000000",
//     "lastAggTradeId": -1,
//     "low": "140.0000000",
//     "matchingUnitType": "STANDARD",
//     "close": "140.0000000",
//     "quoteAsset": "SGD",
//     "productType": null,
//     "active": true,
//     "minTrade": 0.01000000,
//     "activeSell": 2.55,
//     "withdrawFee": "10",
//     "volume": "2.5500000",
//     "decimalPlaces": 8,
//     "quoteAssetUnit": "",
//     "open": "140.0000000",
//     "status": "TRADING",
//     "minQty": 1E-8
// }, {
//     "symbol": "BTCSGD",
//     "quoteAssetName": "SGD",
//     "tradedMoney": 180.6,
//     "baseAssetUnit": "฿",
//     "baseAssetName": "Bitcoin",
//     "baseAsset": "BTC",
//     "tickSize": "0.01",
//     "prevClose": 53.7,
//     "activeBuy": 0.0,
//     "high": "53.70",
//     "lastAggTradeId": -1,
//     "low": "1.10",
//     "matchingUnitType": "STANDARD",
//     "close": "5.00",
//     "quoteAsset": "SGD",
//     "productType": null,
//     "active": true,
//     "minTrade": 0.00000100,
//     "activeSell": 57.0,
//     "withdrawFee": "10",
//     "volume": "57.00",
//     "decimalPlaces": 8,
//     "quoteAssetUnit": "",
//     "open": "53.70",
//     "status": "TRADING",
//     "minQty": 1E-8
// }];
// dispatch(changeList(list));

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _reducer = __webpack_require__(27);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reducer = _reducer2.default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(11);

var defaultState = {
    // name: 'dell li',
    newsList: []
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case _constants.CHANGE_LIST:
            return _extends({}, state, {
                newsList: action.list
            });
        default:
            return state;
    }
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
    _inherits(NotFound, _Component);

    function NotFound() {
        _classCallCheck(this, NotFound);

        return _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).apply(this, arguments));
    }

    _createClass(NotFound, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var staticContext = this.props.staticContext;

            staticContext && (staticContext.NOT_FOUND = true);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                '404,sorry ,Not Page'
            );
        }
    }]);

    return NotFound;
}(_react.Component);

exports.default = NotFound;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Header = __webpack_require__(6);

var _Header2 = _interopRequireDefault(_Header);

var _Connection = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Trade = function (_Component) {
    _inherits(Trade, _Component);

    function Trade() {
        _classCallCheck(this, Trade);

        var _this = _possibleConstructorReturn(this, (Trade.__proto__ || Object.getPrototypeOf(Trade)).call(this));

        _this.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(Trade, [{
        key: 'handleConnection',
        value: function handleConnection() {
            if (this.state.isOpen) {
                (0, _Connection.closeConnection)();
                this.setState({
                    isOpen: false
                });
            } else {
                (0, _Connection.createWebSocket)();
                this.setState({
                    isOpen: true
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'button',
                        { onClick: this.handleConnection.bind(this) },
                        this.state.isOpen ? "关闭" : "连接WS"
                    )
                )
            );
        }
    }]);

    return Trade;
}(_react.Component);

// const Trade = () =>{
//     return (
//         <div>
//             <Header/>
//             <div>
//                  <button onClick={()=>{alert('click!')}}>连接WS</button>
//             </div>
//         </div>
//     )
// }

exports.default = Trade;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _actions = __webpack_require__(31);

var _reactRedux = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Translation = function (_Component) {
    _inherits(Translation, _Component);

    function Translation() {
        _classCallCheck(this, Translation);

        return _possibleConstructorReturn(this, (Translation.__proto__ || Object.getPrototypeOf(Translation)).call(this));
    }

    _createClass(Translation, [{
        key: 'getList',
        value: function getList() {
            var list = this.props.list;

            return list == null || undefined ? "" : list.map(function (item) {
                return _react2.default.createElement(
                    'div',
                    { key: item.id },
                    item.title
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.login ? _react2.default.createElement(
                'div',
                null,
                this.getList()
            ) : _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.props.list.length) {
                this.props.getTranslationList();
            }
        }
    }]);

    return Translation;
}(_react.Component);

Translation.loadData = function (store) {
    return store.dispatch((0, _actions.getTranslationList)());
};

var mapStateToProps = function mapStateToProps(state) {
    return {
        list: state.translation.translationList,
        login: state.header.login
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        getTranslationList: function getTranslationList() {
            dispatch((0, _actions.getTranslationList)());
        }
    };
};

// const ExportTranslation = ;
// ExportTranslation.loadData = (store) =>{
//     return store.dispatch(getTranslationList())
// }

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Translation);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTranslationList = undefined;

var _constants = __webpack_require__(12);

var changeList = function changeList(list) {
    return {
        type: _constants.CHANGE_LIST,
        list: list
    };
};

var getTranslationList = exports.getTranslationList = function getTranslationList() {
    return function (dispatch, getState, axiosInstance) {
        return axiosInstance.get('/api/translations.json').then(function (res) {
            if (res.data.success) {
                dispatch(changeList(res.data.data));
            } else {
                dispatch(changeList([]));
            }
        });
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = undefined;

var _reducer = __webpack_require__(33);

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reducer = _reducer2.default;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(12);

var defaultState = {
    translationList: []
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    switch (action.type) {
        case _constants.CHANGE_LIST:
            return _extends({}, state, {
                translationList: action.list
            });
        default:
            return state;
    }
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(19);

var _express2 = _interopRequireDefault(_express);

var _expressHttpProxy = __webpack_require__(20);

var _expressHttpProxy2 = _interopRequireDefault(_expressHttpProxy);

var _utils = __webpack_require__(17);

var _reactRouterConfig = __webpack_require__(3);

var _store = __webpack_require__(18);

var _Routes = __webpack_require__(16);

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();


// 静态文件中间件.
app.use(_express2.default.static('public'));

app.use('/api', (0, _expressHttpProxy2.default)('http://47.95.113.63', {
  proxyReqPathResolver: function proxyReqPathResolver(req) {
    return '/ssr/api' + req.url;
    // console.log(req.url);
    // var parts = req.url.split('?');
    // var queryString = parts[1];
    // var updatedPath = parts[0].replace(/test/, 'tent');
    // return updatedPath + (queryString ? '?' + queryString : '');
  }
}));

app.get('*', function (req, res) {
  var store = (0, _store.getStore)(req);

  // 根据路由的路径，来往store里面加数据.
  // 让matchRoutes 里面的所有组件，对应的LoadData方法执行一次.
  var matchedRoutes = (0, _reactRouterConfig.matchRoutes)(_Routes2.default, req.path);
  var promises = [];

  matchedRoutes.forEach(function (item) {
    if (item.route.loadData) {
      var primise = new Promise(function (resolve, reject) {
        item.route.loadData(store).then(resolve).catch(resolve);
      });
      promises.push(primise);
    }
  });

  Promise.all(promises).then(function () {
    var context = { css: [] };

    var html = (0, _utils.render)(store, _Routes2.default, req, context);
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url);
    } else if (context.NOT_FOUND) {
      res.status(404);
      res.send(html);
    } else {
      res.status(200);
      res.send(html);
    }
  });
});

var server = app.listen(3000);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _config = __webpack_require__(10);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createInstance = function createInstance(req) {
  return _axios2.default.create({
    baseURL: 'http://47.95.113.63/ssr',
    headers: {
      cookie: req.get('cookie') || '',
      params: {
        secret: _config2.default.secret
      }
    }
  });
};
exports.default = createInstance;

// headers:{
//     cookie:req.get('cookie')
// }

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(false);
// imports


// module
exports.push([module.i, ".style_test1_-hash：base64-5-{\n    background: pink;\n}", ""]);

// exports
exports.locals = {
	"test1": "style_test1_-hash：base64-5-"
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(14)(false);
// imports


// module
exports.push([module.i, "body{\n    background: gray;\n}\n.style_test_-hash：base64-5-{\n    background: red;\n    margin-top: 50px;\n}", ""]);

// exports
exports.locals = {
	"test": "style_test_-hash：base64-5-"
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(36);
    var insertCss = __webpack_require__(15);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(37);
    var insertCss = __webpack_require__(15);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../node_modules/css-loader/index.js??ref--1-1!./style.css", function() {
        content = require("!!../../../node_modules/css-loader/index.js??ref--1-1!./style.css");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ })
/******/ ]);