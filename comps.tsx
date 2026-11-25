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