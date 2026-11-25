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

# Components
## Data Components
### DataStr
Prop(s): T data, ((key: string, value: any) => any)? repl, number? space, boolean? always\
Calls `JSON.stringify` on the provided data. Simple utility component.\
Assigning `always` to true renders regardless of nullish data.