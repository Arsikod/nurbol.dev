---
title: 'Serializable localStorage hook'
date: '2022-07-20'
---

```javascript
function useLocalStorageState(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {}) {
    
    const [state, setState] = useState(() => {
        const valueInLocalStorage = localStorage.getItem(key);
        if (valueInLocalStorage) {
            return deserialize(valueInLocalStorage);
        }
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    });
    
    // in case of key override
    const prevKeyRef = useRef(key);
    
    useEffect(() => {
        const prevKey = prevKeyRef.current;
        if(prevKey !== key){
            localStorage.removeItem(prevKey)
        }
        prevKeyRef.current = key;
        
        localStorage.setItem(key, serialize(state))
    }, [key, serialize, state])
    
    return [state, setState]
}
```
