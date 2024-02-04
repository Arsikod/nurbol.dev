---
title: "String builder mutability C#"
date: "2024-02-04"
---

**String builder mutability**

```c#
StringBuilder mutable = new StringBuilder("hello");

// ⚠️reference access
StringBuilder appended = mutable.Append(" world");

// ⚠️True
mutable.GetHashCode().Equals(appended.GetHashCode());


string immutable = "hello";

// ⚠️new String class
var appendedGreeting = immutable + " world";

// ⚠️False
immutable.GetHashCode().Equals(appendedGreeting.GetHashCode());

```
