export declare type AnyFunction = (...args: any[]) => any;
/**
 * Provides Map-like interface that uses Map for primitive keys and WeakMap for non-primitive keys.
 */
export declare class MeekMap<K, V> {
    private map;
    private weakMap;
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
}
/**
 * Provides a multi-dimensional Map-like interface
 */
export declare class HyperMap<T> {
    has(args: any[]): boolean;
    get(args: any[]): T | undefined;
    set(args: any[], value: T): void;
    private getCache(numArgs);
    private map_numArgs_cache;
    private traverse(cache, keys, value?);
}
export declare type MemoizeParams<F extends AnyFunction> = {
    function: F;
    getAdditionalArgs?: () => any[];
    fixedArgsLength?: number;
};
/**
 * Creates a memoized version of a function.
 */
export default function memoize<F extends AnyFunction>(params: MemoizeParams<F>): F;
/**
 * A method decorator that creates a memoized version of a method.
 */
export default function memoize<T extends AnyFunction>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
/**
 * Generates a method decorator that creates a memoized version of a function with additional args to control memoization
 * @param getMemoizeParams_propName The name of another class method that returns additional arguments for controlling memoization.
 */
export declare function memoizeWith<T extends AnyFunction, P extends string, TARGET extends {
    [X in P]: (this: TARGET) => any[];
}>(getMemoizeParams_propName: P): <T>(target: TARGET, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
