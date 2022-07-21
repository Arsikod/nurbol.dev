---
title: 'Memoizing derived state'
date: '2022-07-21'
---

**Managed State:** State that you need to explicitly manage
**Derived State:** State that you can calculate based on other state
There is no need to sync the derived state values because they're simply calculated every render.

```javascript
function MyComponent(props) {
    const [state, setState] = React.useState('')
    
    const derivedValue = calculateDerivedState(args)
    
    const derivedValueFromProps = calculateDerivedStateFromProps(props.value)
    
    const memoizedDerivedValue = useMemo(() => calculateDeriverState(args), [args])
    
    // return JSX
}
```
