---
title: 'Typed React Context Factory Abstraction'
date: '2022-10-28'
---

1 - makes out of context usage message more **explicit**  
2 - **abstracts** useContext hook  
3 - resolves typescripts **"undefined"** type problem

```javascript
import { createContext, useContext } from 'react';

export function contextFactory<T extends unknown | null>() {
  const context = createContext<T | undefined>(undefined);

  const useCtx = () => {
    const ctx = useContext(context);

    if (ctx === undefined) {
      throw new Error('useContext must be used inside of a Provider with a value');
    }
    return ctx;
  };

  return [useCtx, context] as const;
}
```

**creating Provider wrapper**

```javascript
interface StoreContextValue {
  value: string;
  addValue: (value: string) => void;
}

const [useStoreContext, StoreContext] = contextFactory<StoreContextValue>();
export { useStoreContext };

interface Props {
  children: ReactNode;
}
export function StoreProvider({ children }: Props) {
  const [value, setValue] = useState<sting | null>(null);

  const addValue = useCallback((value: string) => { setValue(value) }, []);

  return (
    <StoreContext.Provider value={{ value, addValue }}>
      {children}
    </StoreContext.Provider>
  );
}
```
