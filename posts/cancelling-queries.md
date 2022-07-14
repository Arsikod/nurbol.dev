---
title: 'Cancelling queries'
date: '2022-07-14'
---

**Queries using `fetch` API**

All we have to do is pass signal to the fetch API.

```javascript
const userQuery = useQuery(['users'], ({ signal }) =>
  fetch('/api/users', { signal }).then((res) => res.json())
);
```

**Queries with timeout**

When React Query cancels the query, it will call the `controller.abort()`, which causes the signal passed in to the query function to run it's abort event handler. That will clear the timeout, and the query will never resolve.

```javascript
const DelayComponent = () => {
  const delayQuery = useQuery(['delay'], ({ signal }) => {
    let timeout;
    const delayPromise = new Promise((resolve) => {
      timeout = setTimeout(() => resolve('Hello'), 1000);
    });

    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
    });

    return delayPromise;
  });

  // ...
};
```

**Queries with `cancelled` boolean flag**

In some cases, you can still limit the amount of work that needs to be done by setting a cancelled boolean flag. In this next example, the Geolocation API will still fetch the user's location, but any extra processing won't happen once the location has been returned.

```javascript
const GeolocationComponent = () => {
  const geolocationQuery = useQuery(['geolocation'], () => {
    let cancelled = false;

    const geolocationPromise = new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve);
    }).then((results) => {
      if (cancelled) {
        return;
      }
      return doExpensiveWork(results);
    });

    signal?.addEventListener('abort', () => {
      cancelled = true;
    });

    return geolocationPromise;
  });

  // ...
};
```
