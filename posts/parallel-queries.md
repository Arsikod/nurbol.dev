---
title: 'Parallel Queries with react-query'
date: '2022-07-09'
---

**Function with two queries**

```javascript
function twoResponseFunctions() {
  return Promise.all([
    fetch('url-1').then((res) => res.json()),
    fetch('url-2').then((res) => res.json()),
  ]);
}
```

**Use function with two queries inside `useQuery`**

```javascript
function MyComponent() {
  const twoQueries = useQuery(['myTwoQueries'], twoResponseFunctions);

  const [firstData, secondData] = twoQueries.data;
}
```
