---
title: 'Connecting Zustand to Redux devtools'
date: '2022-11-04'
---

**devtools middleware** in Zustand is used to connect with redux devtools  
When devtools middleware is used in a Zustand store, we need to pass all four generics.

1. State type - CurrentState
2. State setter type with the state type - SetState<CurrentState>
3. State getter type with the state type - GetState<CurrentState>
4. Middleware type with the state type - StoreApiWithDevtools<CurrentState>

The second parameter that is passed to the devtools middleware is an object with the
name property that is used to identify the store.

```typescript
export type CurrentState = {
  items: Array<string>;
  addItem: (item: string) => void;
};

export const useEventsStore = create<
  CurrentState,
  SetState<CurrentState>,
  GetState<CurrentState>,
  StoreApiWithDevtools<CurrentState>
>(
  devtools(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    }),
    {
      name: 'My Items',
    }
  )
);
```
