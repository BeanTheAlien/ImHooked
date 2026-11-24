import { useEffect, useState } from "react";

const __depFactory = (required: () => unknown[]) => {
    return (callback: React.EffectCallback, deps?: React.DependencyList) => {
        return useEffect(() => {
            if(!required().reduce((a, b) => a || !b, false)) return;
            return callback();
        }, deps);
    }
};
export const useWindow = __depFactory(() => [window]);
export const useLocal = __depFactory(() => [window, localStorage]);
export const useSession = __depFactory(() => [window, sessionStorage]);