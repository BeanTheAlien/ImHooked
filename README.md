# ImHooked
I'm Hooked!

These are some custom React hooks I wished were native.\
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