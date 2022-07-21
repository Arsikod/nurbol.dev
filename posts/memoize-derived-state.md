---
title: 'Memoizing derived state'
date: '2022-07-21'
---

There is no need don't need to sync the derived state values because they're simply calculated every render.

```javascript
function MyComponent(props) {
    const [state, setState] = React.useState('')
    
    const derivedValue = calculateDerivedState(args)
    
    const derivedValueFromProps = calculateDerivedStateFromProps(props.value)
    
    const memoizedDerivedValue = useMemo(() => calculateDeriverState(args), [args])
    
    // return JSX
}
```
