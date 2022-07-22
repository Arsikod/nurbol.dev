---
title: 'React Context Factory Abstraction'
date: '2022-07-22'
---

1 - makes out of context usage message more **explicit**  
2 - **abstracts** useContext hook  
3 - resolves typescripts **"undefined"** type problem

```javascript
function contextFactory(){
    const context = createContext(undefined);
    
    function useCtx(){
        const ctx = useContext(context);
        
        if(!ctx) {
            throw new Error('useContext must be inside of a Provider with a value')
        }
        
        return ctx
    }
    
    return [context, useCtx]
}
```