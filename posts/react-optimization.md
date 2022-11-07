---
title: 'Optimization cheatsheet in React'
date: '2022-11-07'
---

**1) Code splitting** Lazy loading + Suspense wrapper over lazy loaded components

```js
// import About from './views/About'
// import Contact from './views/Contact'
// import Home from './views/Home'
const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/About'));
const Contact = lazy(() => import('./views/Contact'));
```

**2) Optimize re-renders**
• Wrapping function that is being passed as a prop with `useCallback` hook to preserve referential integrity
• memoising derived/computed values passed as a with `useMemo`
• memoising components with `memo`
• state collocation: reducing the number of re-renders by moving state down
• lifting a component up and passing it as a prop

**3) Optimizing long lists with React Virtual**
We are passing a config object with the following properties:
• size - the number of items in the list
• parentRef - the ref that contains the parent element which is scrollable
• estimateSize - a function that returns an estimated size of the items
• overscan - the number of items that should be loaded behind and ahead of the current window
range

**4) Throttle and Debounce events to prevent frequent re-renders**

```ts
export function throttle<T extends (...args: any) => unknown>(
  callback: T,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout>;
  let inThrottle: boolean;
  let lastTime: number;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        if (Date.now() - lastTime >= delay) {
          callback(...args);
          lastTime = Date.now();
        }
      }, Math.max(delay - (Date.now() - lastTime), 0));
    }
  };
}
```

```ts
export function debounce<T extends (...args: any) => unknown>(
  callback: T,
  delay: number
) {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
```

**5) Paying attention to Tree-shakeable library imports**

```js
//Not tree-shakeable
import _ from 'lodash';
import { get } from 'lodash';

//Tree-shakeable
import get from 'lodash/get';
import { get } from 'lodash-es';
```
