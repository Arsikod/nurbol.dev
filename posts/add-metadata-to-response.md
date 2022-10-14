---
title: 'Include metadata into response'
date: '2022-10-14'
---

Adding metadata to response is possible through axios interceptor.
Here is example with pagination data added to a header.

**Important**
First "Access-Control-Expose-Headers" should be on the backend side.

```javascript
response.Headers.Add('Access-Control-Expose-Headers', 'Pagination');
```

**1: add enhanced response class class**

```javascript
export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
```

**2: intercept response, parse metadata and add to response data**

```javascript
axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers['pagination'];

    if (pagination) {
      response.data = new PaginatedResponse(response.data, JSON.parse(pagination));

      return response;
    }

    return response;
  },
  (error: AxiosError<IResponseData>) => {
   ...error handling
  }
);
```
