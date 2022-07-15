---
title: 'Instant UI update on data mutaion'
date: '2022-07-15'
---

With react-query we can provide faster UI updates while fetching the most accurate data in the background. We'll directly update the individual related query, since that's what's showing on the page where we update it. But we'll also invalidate all of the matching queries so they will be refetched

```javascript
const customMutation = useMutation(fn, {
  onSuccess: (data) => {
    //add return value to cache
    queryClient.setQueryData(['key'], (oldValues) => [...oldValues, data]);
  },
  onMutate: () => {
    //invalidate related queries
    queryClient.invalidateQueries(['key']);
  },
});
```
