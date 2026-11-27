import React, { Children, isValidElement, JSX, RefObject } from "react";
import { useEffect, useState } from "react";

const __depFactory = (required: () => boolean) => {
    return (callback: React.EffectCallback, deps?: React.DependencyList) => {
        useEffect(() => {
            if(!required()) return;
            return callback();
        }, deps);
    }
};
/**
 * Depends on `window` existing, blocking the call if it doesn't.
 * @param callback The callback to be ran.
 * @param deps The dependencies to the useEffect.
 * === Meta ===
 * Dependencies: window
 * 
 * Returned: callback() | undefined
 */
export const useWindow = __depFactory(() => !window);
/**
 * Depends on `window` and `localStorage` existing, blocking the call if it doesn't.
 * @param callback The callback to be ran.
 * @param deps The dependencies to the useEffect.
 * === Meta ===
 * Dependencies: window, localStorage
 * 
 * Returned: callback() | undefined
 */
export const useLocal = __depFactory(() => !window || !localStorage);
/**
 * Depends on `window` and `sessionStorage` existing, blocking the call if it doesn't.
 * @param callback The callback to be ran.
 * @param deps The dependencies to the useEffect.
 * === Meta ===
 * Dependencies: window
 * 
 * Returned: callback() | undefined
 */
export const useSession = __depFactory(() => !window || !sessionStorage);
/**
 * Runs an async operation, internally wrapping the callback into a useEffect function,
 * which calls and awaits the callback.
 * @param callback The callback to be ran.
 * @param deps The dependencies to the useEffect.
 * === Meta ===
 * Returned: undefined
 */
export function useAsync(callback: () => Promise<void>, deps?: React.DependencyList) {
    useEffect(() => {
        (async () => {
            await callback();
        })();
    }, deps);
}
/**
 * Runs an interval operation at the specified timeout.
 * 
 * Callback is applied as the direct first parameter and the interval is destroyed automatically.
 * @param callback The callback to be ran.
 * @param timeout The interval's timeout to be applied.
 * @param deps The dependencies to the useEffect.
 * === Meta ===
 * Returned: () => clearInterval(iv)
 */
export function useInterval(callback: () => void, timeout: number, deps?: React.DependencyList) {
    useEffect(() => {
        const iv = setInterval(callback, timeout);
        return () => clearInterval(iv);
    }, deps);
}
interface WithObject<T> {
    /**
     * The source of truth.
     * 
     * What object is being currently executed on.
     */
    src: T;
    /**
     * The currently queued series of operations.
     * 
     * Only exposes names of operations.
     * 
     * Likely empty.
     */
    queue: (keyof T)[];
    __internalPrivateQueueStack: [keyof T, unknown[]][];
    /**
     * Queues an operation onto this `WithObject`.
     * 
     * Automatically drops non-function queues.
     * @param objectKey The key for the query.
     * @param argList The args to be applied (infered to be of the required types for the application).
     */
    then<K extends keyof T>(objectKey: K, ...argList: T[K] extends (...args: infer A) => unknown ? A : never): WithObject<T>;
}
const __withFactory = <T>(src: T) => {
    /**
     * @param once Whether this should run once or not.
     */
    return (once = false) => {
        const obj: WithObject<T> = {
            src,
            queue: [],
            __internalPrivateQueueStack: [],
            then: function<K extends keyof T>(k: K, ...arg: T[K] extends (...args: infer A) => unknown ? A : never) {
                const v = this.src[k];
                if(typeof v != "function") return this;
                this.queue.push(k);
                this.__internalPrivateQueueStack.push([k, arg]);
                return this;
            }
        };
        useEffect(() => {
            // require existing object
            if(!obj.src) return;
            obj.__internalPrivateQueueStack.forEach(q => {
                const v = obj.src[q[0]];
                if(typeof v != "function") return;
                Reflect.apply(v, obj.src, q[1]);
            });
            obj.queue.length = 0;
        }, !once ? [obj.src] : []);
        return obj;
    }
}
/**
 * Expose a series of operations to do with `window`.
 * @param once Whether to apply the useEffect once ([] deps) or indef ([obj.src] deps).
 * @returns A `WithObject` for `window`.
 */
export const withWindow = __withFactory(window);
/**
 * Applies the `required` attribute to the children of the form, such that the value is equal to the
 * boolean value of `dep` (`!!dep`).
 * 
 * When `dep` is a real value, the required attribute is set to true. Otherwise, the required
 * attribute is set to false.
 * @param form The HTML form element or a reference to it.
 * @param dep The dependent object.
 * @param exclude Certain elements to be excluded from aquiring the `required` tag
 * (either literal elements or references to them).
 */
export function useRequired<T>(form: JSX.IntrinsicElements["form"] | RefObject<JSX.IntrinsicElements["form"]>, dep: T | null | undefined, exclude?: (React.ReactElement | RefObject<React.ReactElement>)[]) {
    useEffect(() => {
        Children.map(("current" in form ? form.current : form)?.children, c => {
            if(isValidElement<{ required?: boolean }>(c) && !(exclude ?? []).map(e => "current" in e ? e.current : e).includes(c)) {
                c.props.required = !!dep;
            }
        });
    }, [dep]);
}