---
title: 'Zustand create store factory'
date: '2022-11-05'
---

Note: using factory helpers affects flexibility in case of adding another middleware

```javascript
export function createStore(config, options) {
  return create(devtools(withImmer(config), options));
}
```

**typed version**

```typescript
import { devtools, StoreApiWithDevtools } from 'zustand/middleware';
import { Draft } from 'immer';
import create, { GetState, State, StateCreator, StoreApi } from 'zustand';
import { withImmer } from '@/store/middleware/withImmer';

export function createStore<T extends State>(
  config: StateCreator<
    T,
    (partial: ((draft: Draft<T>) => void) | T | Partial<T>, replace?: boolean) => void,
    GetState<T>,
    StoreApiWithDevtools<T> & StoreApi<T>
  >,
  options: Parameters<typeof devtools>[1]
) {
  return create(devtools(withImmer(config), options));
}
```
