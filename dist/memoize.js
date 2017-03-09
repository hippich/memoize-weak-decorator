(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["memoize"] = factory();
	else
		root["memoize"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author adufilie http://github.com/adufilie
 */


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var UNDEFINED = {};
function isPrimitive(value) {
    return value === null || (typeof value === "undefined" ? "undefined" : _typeof(value)) !== 'object';
}
/**
 * Provides Map-like interface that uses Map for primitive keys and WeakMap for non-primitive keys.
 */

var MeekMap = function () {
    function MeekMap() {
        _classCallCheck(this, MeekMap);

        this.map = new Map();
        this.weakMap = new WeakMap();
    }

    _createClass(MeekMap, [{
        key: "has",
        value: function has(key) {
            return isPrimitive(key) ? this.map.has(key) : this.weakMap.has(key);
        }
    }, {
        key: "get",
        value: function get(key) {
            return isPrimitive(key) ? this.map.get(key) : this.weakMap.get(key);
        }
    }, {
        key: "set",
        value: function set(key, value) {
            if (isPrimitive(key)) this.map.set(key, value);else this.weakMap.set(key, value);
            return this;
        }
    }]);

    return MeekMap;
}();

exports.MeekMap = MeekMap;
/**
 * Provides a multi-dimensional Map-like interface
 */

var HyperMap = function () {
    function HyperMap() {
        _classCallCheck(this, HyperMap);

        // used to avoiding the varying-key-length limitation of the traverse() function below
        this.map_numArgs_cache = new Map();
    }

    _createClass(HyperMap, [{
        key: "has",
        value: function has(args) {
            var cache = this.getCache(args.length);
            if (args.length > 1) cache = this.traverse(cache, args.slice(0, args.length - 1));
            return cache !== undefined && cache.has(args[args.length - 1]);
        }
    }, {
        key: "get",
        value: function get(args) {
            return this.traverse(this.getCache(args.length), args);
        }
    }, {
        key: "set",
        value: function set(args, value) {
            this.traverse(this.getCache(args.length), args, value);
        }
        // gets the Cache designated for a specific key length

    }, {
        key: "getCache",
        value: function getCache(numArgs) {
            var cache = this.map_numArgs_cache.get(numArgs);
            if (!cache) this.map_numArgs_cache.set(numArgs, cache = new MeekMap());
            return cache;
        }
        // dual-purpose setter/getter
        // note: does not work if subsequent calls vary the length of the keys array for the same cache param

    }, {
        key: "traverse",
        value: function traverse(cache, keys, value) {
            if (keys.length == 0) return undefined;
            if (keys.length == 1) {
                if (value === undefined) return cache.get(keys[0]);
                return void cache.set(keys[0], value);
            }
            var nextCache = cache.get(keys[0]);
            if (nextCache === undefined) cache.set(keys[0], nextCache = new MeekMap());
            return this.traverse(nextCache, keys.slice(1), value);
        }
    }]);

    return HyperMap;
}();

exports.HyperMap = HyperMap;

var Memoizer = function Memoizer(func, getAdditionalArgs, fixedArgsLength) {
    _classCallCheck(this, Memoizer);

    this.cache = new HyperMap();
    this.func = func;
    var cache = this.cache;
    this.get = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (fixedArgsLength !== undefined) args.length = fixedArgsLength;
        var thisArgs = [this];
        if (getAdditionalArgs) thisArgs = thisArgs.concat(getAdditionalArgs.call(this), args);else thisArgs = thisArgs.concat(args);
        var result = cache.get(thisArgs);
        if (result === undefined && !cache.has(thisArgs)) {
            cache.set(thisArgs, UNDEFINED);
            result = func.apply(this, args);
            if (result !== undefined) cache.set(thisArgs, result);
        }
        return result === UNDEFINED ? undefined : result;
    };
};

function memoize() {
    // called as decorator, target is prototype; return modified descriptor
    if (arguments.length == 3) {
        var _Array$from = Array.from(arguments),
            _Array$from2 = _slicedToArray(_Array$from, 3),
            target = _Array$from2[0],
            propertyKey = _Array$from2[1],
            descriptor = _Array$from2[2];

        return decorate(descriptor);
    }
    // called as function
    var params = arguments[0];
    if (typeof params === 'function') params = { function: params };
    if (arguments.length == 1 && params && typeof params.function === 'function') {
        return new Memoizer(params.function, params.getAdditionalArgs, params.fixedArgsLength).get;
    } else {
        throw new Error("Usage: memoize(params:{ function:Function, getAdditionalArgs?:()=>any[], fixedArgsLength?:number })");
    }
}
exports.default = memoize;
function decorate(descriptor, params) {
    if (descriptor && typeof descriptor.value === 'function') descriptor.value = new Memoizer(descriptor.value, params && params.getAdditionalArgs, params && params.fixedArgsLength).get;else if (descriptor && (descriptor.set || descriptor.get)) throw new Error('memoize cannot be used as a decorator for a setter or getter');
    return descriptor;
}
// /**
//  * Generates a method decorator that creates a memoized version of a function with additional args to control memoization
//  * @param getAdditionalMemoizeArgs A function that returns additional arguments for controlling memoization.
//  *                                 If this is an inline function, it must be defined like
//  *                                     <code>function() { return [this.a, this.b]; }</code>
//  *                                 rather than
//  *                                     <code>() => [this.a, this.b]</code>
//  *                                 because when decorators are evaluated the 'this' context is undefined.
//  */
// export function memoizeWith<T, TARGET>(getAdditionalMemoizeArgs:(this:TARGET, self:TARGET)=>any[])
// 	:<T>(
// 		target: TARGET,
// 		propertyKey: string | symbol,
// 		descriptor: TypedPropertyDescriptor<T>
// 	) => TypedPropertyDescriptor<T> | void
// {
// 	return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>):TypedPropertyDescriptor<T> => {
// 		return decorate(descriptor, getAdditionalMemoizeArgs);
// 	};
// }
/**
 * Generates a method decorator that creates a memoized version of a function with additional args to control memoization
 * @param getMemoizeParams_propName The name of another class method that returns additional arguments for controlling memoization.
 */
function memoizeWith(getMemoizeParams_propName) {
    return function (target, propertyKey, descriptor) {
        return decorate(descriptor, {
            getAdditionalArgs: function getAdditionalArgs() {
                var fn = this[getMemoizeParams_propName];
                return fn.call(this);
            }
        });
    };
}
exports.memoizeWith = memoizeWith;

/***/ })
/******/ ]);
});
//# sourceMappingURL=memoize.js.map