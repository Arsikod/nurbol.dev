---
title: "TS Discriminated union"
date: "2024-02-11"
---

**Discriminated** refers to the presence of a common, singular property in each type of the union that can be used to uniquely identify which type it is. This property is often called a "tag" or "discriminator".

```typescript
type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

function tryParseInt(text: string): Result<number> {
  if (/^-?\d+$/.test(text)) {
    return {
      success: true,
      value: parseInt(text),
    };
  }

  return {
    success: false,
    error: "Invalid number format.",
  };
}

const result = tryParseInt("42");
result.success && result.value; //⚠️ no error property
!result.success && result.error; //⚠️ no value property
```
