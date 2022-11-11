---
title: 'Creating context provider and useContextState in one helper'
date: '2022-11-10'
---

To avoid code duplication following helper can be used to create context Provider and useContextstate at once.

**Example implementation**

```typescript
//define state hook
function useNumberState(init?: number) {
  return useState(init || 0);
}

const [CountOneProvider, useCountOne] = createStateContext(useNumberState);
```

**Helper implementation**

```typescript
export function createStateContext<Value, State>(useValue: (init?: Value) => State) {
  const StateContext = React.createContext<State | null>(null);

  function StateProvider({
    initialValue,
    children,
  }: {
    initialValue?: Value;
    children?: React.ReactNode;
  }) {
    return (
      <StateContext.Provider value={useValue(initialValue)}>
        {children}
      </StateContext.Provider>
    );
  }

  function useContextState() {
    const value = React.useContext(StateContext);

    if (value === null) {
      throw new Error('useContext must be used within a Provider');
    }

    return value;
  }

  return [StateProvider, useContextState] as const;
}
```
