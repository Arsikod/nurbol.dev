---
title: "Exhaustive switch check in TS"
date: "2024-02-11"
---

**Practical use of "never" type**
Adding size XL to an enum with cause a compile time error since all sizes did not pass checks and there is still one value left that is not never.

```typescript
enum ShirtSize {
  Small,
  Medium,
  Large,
}

function assertNever(size: never): never {
  throw new Error("Unexpected value: " + size);
}

function printSize(size: ShirtSize) {
  switch (size) {
    case ShirtSize.Small:
      return "small";
    case ShirtSize.Medium:
      return "medium";
    case ShirtSize.Large:
      return "large";
    default:
      return assertNever(size);
  }
}
```
