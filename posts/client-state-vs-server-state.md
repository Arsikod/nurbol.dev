---
title: 'Client state vs Server state'
date: '2022-07-07'
---

**Client State**

1. Ephemeral - It goes away when the browser is closed.
2. Synchronous - It's instantly available.
3. Client-owned - It stays local to the browser that created it.
4. Always up-to-date.

**Server State**

1. Persisted remotely - The client has no control over what is stored or how it is stored.
2. Asynchronous - It takes a bit of time for the data to come from the server to the client.
3. Shared ownership - Multiple users could change the data.
4. Potentially out-of-date
