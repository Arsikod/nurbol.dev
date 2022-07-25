---
title: 'Safe useReducer dispatch'
date: '2022-07-25'
---

To make sure that `useReducer` dispatch runs **only** if component is mounted
we can obtain it through `useSafeDispatch` hook

```javascript
function useSafeDispatch(dispatch) {
    const mountedRef = useRef(false)
    useEffect(() => {
        mountedRef.current = true

        return () => {
            mountedRef.current = false
        }
    })

    return useCallback(
        (...args) => {
            if (mountedRef.current) {
                dispatch(...args)
            }
        },
        [dispatch],
    )
}
```