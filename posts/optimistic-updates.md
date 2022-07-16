---
title: 'Optimistic updates for better UX'
date: '2022-07-16'
---

If we have enough data and can guess what the server response will be, we can update our cache (and our UI at the same
time) with fake data while the server is still working. Then, when the server responds, we can update the cache with the
real data.

```javascript
const customMutation = useMutation(fn, {
    onMutate: (variables) => {
        const prevCache = queryClient.getQueryData(["valuesKey"]);
        const optimisticItemToAdd = {
            // optimistic data here
        };
        queryClient.setQueryData(["valuesKey"], (prevValues) =>
            prevValues.concat(optimisticItemToAdd)
        );
        //return rollback funtion to prevent item appear and delete flickering
        return () => queryClient.setQueryData(["valuesKey"], prevCache);
    },
    onSuccess: (data, variables, rollBack) => {
        //first delete optimistic item, then add actual fetched item
        rollBack();
        queryClient.setQueryData(["valuesKey"], (oldValues) => [...oldValues, data]);
    },
    onSettled: (data, variables) => {
        queryClient.invalidateQueries(["valuesKey"]);
    },
    //return to old state in case of error
    onError: (error, variables, rollBack) => rollBack()
});
```
