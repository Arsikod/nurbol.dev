---
title: "Branded type predicates
date: "2023-12-30"
---

**Adding condition to type**

With branded type we can add condition to a base type and proceed only with types that pass certain condition

**i. declare Brand helper**

```typescript
type Brand<T, BrandName extends string> = T & { __brand: BrandName };
```

```typescript
import { Brand } from "./utils/brand";

export type Approved<T> = Brand<T, "Approved">; //⚠️ enhancing base type

type PurchaseDetails = {
  item: string;
  price: number;
};

function isPurchaseApproved(
  details: PurchaseDetails
): details is Approved<PurchaseDetails> {
  if (details.price > 1000) {
    return false;
  }
  return true; //⚠️ Base type will transform to Base with Approved brand
}

function processPurchase(details: Approved<PurchaseDetails>) {
  // ⚠️ accepts only Approved purchases
}

const submitHandler = (details: PurchaseDetails) => {
  if (isPurchaseApproved(details)) {
    processPurchase(details); // ⚠️ This should not error because Branded.
  }

  processPurchase(details); // ⚠️ This should error because unbranded.
};
```
