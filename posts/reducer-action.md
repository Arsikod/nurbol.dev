---
title: 'Typing reducer actions'
date: '2022-11-03'
---

Separating reducer action into separate type template  
provides cleaner readability of reducer action typing

```typescript
export type ReducerAction<T, P> = {
  type: T;
  payload: P;
};

export type ShoppingListActions =
  | ReducerAction<'ADD_ITEM', ShoppingListItem>
  | ReducerAction<'UPDATE_ITEM', { index: number; item: ShoppingListItem }>
  | ReducerAction<'DELETE_ITEM', { index: number }>
  | ReducerAction<'UPDATE_NEW_SHOPPING_ITEM_NAME', string>;
```
