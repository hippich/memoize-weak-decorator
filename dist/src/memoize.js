/**
 * @author adufilie http://github.com/adufilie
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UNDEFINED = {};
function isPrimitive(value) {
    return value === null || typeof value !== 'object';
}
/**
 * Provides Map-like interface that uses Map for primitive keys and WeakMap for non-primitive keys.
 */
class MeekMap {
    constructor() {
        this.map = new Map();
        this.weakMap = new WeakMap();
    }
    has(key) {
        return isPrimitive(key) ? this.map.has(key) : this.weakMap.has(key);
    }
    get(key) {
        return isPrimitive(key) ? this.map.get(key) : this.weakMap.get(key);
    }
    set(key, value) {
        if (isPrimitive(key))
            this.map.set(key, value);
        else
            this.weakMap.set(key, value);
        return this;
    }
}
exports.MeekMap = MeekMap;
/**
 * Provides a multi-dimensional Map-like interface
 */
class HyperMap {
    constructor() {
        // used to avoiding the varying-key-length limitation of the traverse() function below
        this.map_numArgs_cache = new Map();
    }
    has(args) {
        let cache = this.getCache(args.length);
        if (args.length > 1)
            cache = this.traverse(cache, args.slice(0, args.length - 1));
        return cache !== undefined && cache.has(args[args.length - 1]);
    }
    get(args) {
        return this.traverse(this.getCache(args.length), args);
    }
    set(args, value) {
        this.traverse(this.getCache(args.length), args, value);
    }
    // gets the Cache designated for a specific key length
    getCache(numArgs) {
        let cache = this.map_numArgs_cache.get(numArgs);
        if (!cache)
            this.map_numArgs_cache.set(numArgs, cache = new MeekMap());
        return cache;
    }
    // dual-purpose setter/getter
    // note: does not work if subsequent calls vary the length of the keys array for the same cache param
    traverse(cache, keys, value) {
        if (keys.length == 0)
            return undefined;
        if (keys.length == 1) {
            if (value === undefined)
                return cache.get(keys[0]);
            return void cache.set(keys[0], value);
        }
        let nextCache = cache.get(keys[0]);
        if (nextCache === undefined)
            cache.set(keys[0], nextCache = new MeekMap());
        return this.traverse(nextCache, keys.slice(1), value);
    }
}
exports.HyperMap = HyperMap;
class Memoizer {
    constructor(func, getAdditionalArgs, fixedArgsLength) {
        this.cache = new HyperMap();
        this.func = func;
        let cache = this.cache;
        this.get = function (...args) {
            if (fixedArgsLength !== undefined)
                args.length = fixedArgsLength;
            let thisArgs = [this];
            if (getAdditionalArgs)
                thisArgs = thisArgs.concat(getAdditionalArgs.call(this), args);
            else
                thisArgs = thisArgs.concat(args);
            let result = cache.get(thisArgs);
            if (result === undefined && !cache.has(thisArgs)) {
                cache.set(thisArgs, UNDEFINED);
                result = func.apply(this, args);
                if (result !== undefined)
                    cache.set(thisArgs, result);
            }
            return result === UNDEFINED ? undefined : result;
        };
    }
}
function memoize() {
    // called as decorator, target is prototype; return modified descriptor
    if (arguments.length == 3) {
        let [target, propertyKey, descriptor] = Array.from(arguments);
        return decorate(descriptor);
    }
    // called as function
    let params = arguments[0];
    if (typeof params === 'function')
        params = { function: params };
    if (arguments.length == 1 && params && typeof params.function === 'function') {
        return new Memoizer(params.function, params.getAdditionalArgs, params.fixedArgsLength).get;
    }
    else {
        throw new Error("Usage: memoize(params:{ function:Function, getAdditionalArgs?:()=>any[], fixedArgsLength?:number })");
    }
}
exports.default = memoize;
function decorate(descriptor, params) {
    if (descriptor && typeof descriptor.value === 'function')
        descriptor.value = new Memoizer(descriptor.value, params && params.getAdditionalArgs, params && params.fixedArgsLength).get;
    else if (descriptor && (descriptor.set || descriptor.get))
        throw new Error('memoize cannot be used as a decorator for a setter or getter');
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
    return (target, propertyKey, descriptor) => {
        return decorate(descriptor, {
            getAdditionalArgs: function () {
                let fn = this[getMemoizeParams_propName];
                return fn.call(this);
            }
        });
    };
}
exports.memoizeWith = memoizeWith;
//# sourceMappingURL=memoize.js.map