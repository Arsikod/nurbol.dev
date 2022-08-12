---
title: 'False positives / negatives in implementation testing'
date: '2022-08-01'
---

Implementation details are things which **users** of your code will **not** typically use, see, or even **know about**.

**False negative:** test fails because of a broken test, not broken app code. Can break during refactoring of appllication code.

**False positive** test does not fail when it has to.

**How to test?** - ask yourself "if I was a manual tester how would I test it" then write tests accordingly.
