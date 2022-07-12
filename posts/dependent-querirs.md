---
title: 'Dependent queries with react-query'
date: '2022-07-10'
---

If false, `enabled` will disable the query from running. We can use that to disable our second query from running until we have the data from our first query.

```javascript
function MyComponent() {
  const { data: firstQueryData } = useQuery(['firstQuery'], fn);

  const secondQuery = useQuer(['secondQuery'], fn, {
    enabled: !!firstQueryData,
  });
}
```
