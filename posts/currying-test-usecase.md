---
title: 'Function currying: testing usecase'
date: '2022-08-01'
---

Javascript testing library implements function currying in order to provide assertions.

```javascript
const firstValue = 1;
const secondValue = 2;

const sum = firstValue + secondValue;

expect(sum).toBe(3);

function expect(current) {
  return {
    toBe(expected) {
      if (current !== expected) {
        throw new Error(`${current} is not equal to ${expected}`);
      }
    },
    // other assertions like toMatchRegex, toHaveLength etc...
  };
}
```

In order to get better information on failed test we can add a `test` wrapper function

```javascript
test('sum adds numbers', () => {
  const firstValue = 1;
  const secondValue = 2;

  const sum = firstValue + secondValue;
  expect(sum).toBe(3);
});

function test(title, callback) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
}
```
