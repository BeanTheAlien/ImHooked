import { useEffect, useState } from "react";

const __depFactory = (required: () => boolean) => {
    return (callback: React.EffectCallback, deps?: React.DependencyList) => {
        return useEffect(() => {
            if(!required()) return;
            return callback();
        }, deps);
    }
};
export const useWindow = __depFactory(() => !window);
export const useLocal = __depFactory(() => !window || !localStorage);
export const useSession = __depFactory(() => !window || !sessionStorage);
export function useAsync(callback: () => Promise<void>, deps?: React.DependencyList) {
    return useEffect(() => {
        (async () => {
            callback();
        })();
    }, deps);
}