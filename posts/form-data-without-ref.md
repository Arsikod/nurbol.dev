---
title: 'Form data without refs'
date: '2022-10-19'
---

Creating FormData instance from submit events current target can give an access to form elements

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  console.log({
    email: data.get('email'),
    password: data.get('password'),
  });
};
```
