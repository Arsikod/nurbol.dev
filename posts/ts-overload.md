---
title: "TS function overload"
date: "2024-02-11"
---

**Type narrowing with overload**
As a return type from **reverse** function we can expect narrowed types.

⚠️But be careful when typing return type of overloaded function, make sure that it does match
actual implementation. Because wrong return type will not cause a compile time error

```typescript
//⚠️returning string will not cause error and treat array as string ⚠️
function reverse<T>(array: readonly T[]): string;
```

```typescript
function reverse(string: string): string;
function reverse<T>(array: readonly T[]): T[];
function reverse(stringOrArray: string | readonly unknown[]) {
  return typeof stringOrArray === "string"
    ? [...stringOrArray].reverse().join("")
    : stringOrArray.slice().reverse();
}

//⚠️ const reversedString: string
const reversedString = reverse("hello");

//⚠️ const reversedArray: number[]
const reversedArray = reverse([1, 2, 3, 4, 5]);
```
