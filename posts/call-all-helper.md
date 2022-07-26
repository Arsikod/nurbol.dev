---
title: 'Call all helper'
date: '2022-07-26'
---

We can construct a function that we can call, passing any number of functions that will return  
a function that calls all of passed functions.

```javascript
function callAll(...fns) {
    return (...args) => {
        fns.forEach(fn => {
            fn && fn(...args)
        })
    }
}
```

and typed version

```typescript
interface CallBack<Params extends any[]> {
  (...args: Params): void;
}

function callAll<Params extends any[]>(...fns: Array<CallBack<Params> | undefined>) {
  return (...args: Params) =>
    fns.forEach((fn) => fn && fn(...args));
}
```