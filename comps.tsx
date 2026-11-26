import { useState } from "react"

/**
 * Returns a `<div>` that contains a `JSON.stringify` for the data.
 * 
 * Only renders data string when data is a real value.
 * 
 * Use the `always` parameter to render regardless of value reality.
 * @param data The data to be stringified.
 * @param repl The replacer function.
 * @param space The spaces to inject for pretty print.
 */
export function DataStr<T>({ data, repl, space, always }: { data: T, repl?: (key: string, value: any) => any, space?: number, always?: boolean }) {
    return <div>
        {(always == true || (always == false && data)) && JSON.stringify(data, repl, space)}
    </div>
}

interface ListController<T> {
    /**
     * Get access to the native array.
     * @returns The native array.
     */
    this(): T[];
    /**
     * Appends a new value to this array.
     * @param value The new value to push.
     * @returns A reference to this.
     */
    add(value: T): this;
    /**
     * Removes a value from this array.
     * @param value The value to splice.
     * @returns A reference to this.
     */
    rm(value: T): this;
    /**
     * Pops off the top element from the array.
     * 
     * Potentially undefined, but marked as T here.
     * @returns The top element.
     */
    pop(): T;
    /**
     * Shifts out the bottom element from the array.
     * 
     * Potentially undefined, but marked as T here.
     * @returns The bottom element.
     */
    shift(): T;
    /**
     * Sets the list to a new list.
     * @param newList The new list to use.
     * @returns A reference to this.
     */
    use(newList: T[]): this;
    /**
     * Filters the array and returns the result.
     * @param callback The callback for the filter.
     * @returns The resulting filtered array.
     */
    fltr(callback: (value: T, index: number, array: T[]) => boolean): T[];
    /**
     * Filters the array and automatically applies the result.
     * @param callback The callback for the filter.
     * @returns A reference to this.
     */
    useFltr(callback: (value: T, index: number, array: T[]) => boolean): this;
    /**
     * Maps the array and returns the result.
     * @param callback The callback for the map.
     * @returns The mapped array.
     */
    map<K>(callback: (value: T, index: number, array: T[]) => K): K[];
    /**
     * Returns the element at the specified index.
     * @param index The index to check.
     * @returns The element at that index.
     */
    at(index: number): T;
}
// native list properties
interface __ListProp<T, B extends boolean> {
    supply?: (element: T) => React.ReactNode;
    stack?: T[];
    ctrl?: B;
    pstyle?: React.CSSProperties;
    cstyle?: React.CSSProperties;
    bstyle?: React.CSSProperties;
}
// native buttons properties
type __ListNBProp<T, N extends NativeListButton | NativeListButton[] | undefined> = N extends undefined ? {} : {
    datafn: () => T;
    nb: N;
    // override text displays
    show?: ListNativeButtonTextDisplayMap;
}
type NativeListButton = "add" | "pop" | "shift";
type ListNativeButtonTextDisplayMap = Record<NativeListButton, string>;
export function List<T, B extends boolean, N extends NativeListButton | NativeListButton[] | undefined>(prop: __ListNBProp<T, N> & __ListProp<T, B>) {
    const [list, setList] = useState<T[]>(prop.stack ?? []);
    const el = <div style={prop.pstyle}>
        {list.map((x, i) => {
            return <div style={prop.cstyle} key={i}>
                {!prop.supply ? x as React.ReactNode : prop.supply(x)}
            </div>
        })}
        {"nb" in prop && (() => {
            return (Array.isArray(prop.nb) ? prop.nb : [prop.nb]).map(x => {
                return x == "add" ?
                    <button style={prop.bstyle} onClick={() => ctrlr.add(prop.datafn())}>{prop.show?.add ?? "Add"}</button> :
                    x == "pop" ?
                    <button style={prop.bstyle} onClick={() => ctrlr.pop()}></button> :
                    <button style={prop.bstyle} onClick={() => ctrlr.shift()}></button>
            });
        })()}
    </div>;
    const ctrlr = {
        this: function() {
            return list;
        },
        add: function(v: T) {
            setList(list.concat(v));
            return this;
        },
        rm: function(v: T) {
            list.splice(list.indexOf(v), 1);
            setList(list);
            return this;
        },
        pop: function() {
            const v = list.pop();
            setList(list);
            return v;
        },
        shift: function() {
            const v = list.shift();
            setList(list);
            return v;
        },
        use: function(l: T[]) {
            setList(l);
            return this;
        },
        fltr: function(c: (e: T, i: number, a: T[]) => boolean) {
            return list.filter(c);
        },
        useFltr: function(c: (e: T, i: number, a: T[]) => boolean) {
            this.use(this.fltr(c));
        },
        map: function<K>(c: (e: T, i: number, a: T[]) => K) {
            return list.map(c);
        },
        at: function(i: number) {
            return list.at(i);
        }
    };
    return (prop.ctrl == false ? el : {
        list: el,
        ctrl: ctrlr
    }) as unknown as B extends false ? React.ReactElement : {
        list: React.ReactElement,
        ctrl: ListController<T>
    }
}