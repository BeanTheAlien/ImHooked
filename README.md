# ImHooked
I'm Hooked!

While the original purpouse of the library was for some custom React hooks I wished were native,\
I've expanded to including components, too.\
Have fun :) (docs down below)

# Hooks
## Dependent Hooks
### useWindow
Dependencie(s): window\
Depends on `window`. Quite simple.
### useLocal
Dependencie(s): window, localStorage\
Depends on `window` and `localStorage`. Perfect for apps that use `localStorage`.
### useSession
Dependencie(s): window, sessionStorage\
Depends on `window` and `sessionStorage`. Identical to `useLocal`, but depends on `sessionStorage` instead.
## Independent Hooks
### useAsync
Runs an async `useEffect`. Surprisingly not a thing.
### useInterval
Runs an interval. Also surprisingly not a thing.
## With Hooks
### withWindow
Queues up operations to be ran on `window` once window exists. Can be a one-time operation.
## Mutating Hooks
### useRequired
Takes a form and a dependent object, as well as some possible values to exclude.\
Sets the required attribute of the children on the form, such that it equals\
the boolean value of the dependent.

# Components
## Data Components
### DataStr
Prop(s): T data, ((key: string, value: any) => any)? repl, number? space, boolean? always\
Calls `JSON.stringify` on the provided data. Simple utility component.\
Assigning `always` to true renders regardless of nullish data.
### List
Prop(s): ((element: T) => React.ReactNode)? supply, T[]? stack, (B is boolean)? ctrl, React.CSSProperties? pstyle,\
React.CSSProperties? cstyle, React.CSSProperties? bstyle &\
((N is NativeListButton | NativeListButton[] | undefined) => {} if N is undefined\
else (() => T) datafn, N nb, ListNativeButtonTextDisplayMap? show)
Returns: React.ReactElement if B is false else { list: React.ReactElement, ctrl: ListController\<T\> }\
By far the most comprehensive component yet. The `List` component provides a native list of elements to display, including offering properties for the parent's styling (`pstyle`), the children's (`cstyle`) and native modification buttons (`bstyle`), if the native buttons are specified.\
When `nb` is included, returns a list with native buttons, which can modify the list. Otherwise, the `ListController` is a good way to change the list.\
Also, the `supply` function can be used to customize how rendering looks (not just the plain data, which is the default).\
If you are rendering native buttons, defining the `show` record permits you to override the default native button text.\
If native buttons are included, the `datafn` is used to append the next data onto the list (when pressing the "Add" button).