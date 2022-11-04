---
title: 'Pick helper'
date: '2022-11-04'
---

```typescript
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  ...keys: Array<K>
): Pick<T, K> {
  let picked: Partial<T> = {};

  for (const key of keys) {
    picked[key] = obj[key];
  }

  return picked as Pick<T, K>;
}
```

```typescript
const { keyOne, keyTwo } = useStore((state) => pick(state, 'keyOne', 'keyTwo'), shallow);
```
