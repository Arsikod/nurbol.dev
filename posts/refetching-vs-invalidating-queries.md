---
title: Refetching vs Invalidating queries
date: '2022-07-14'
---

**queryClient.refetchQueries** will force any queries that match the provided query key to refetch. This includes active, inactive, fresh, and stale queries. Yes, even those **inactive** queries that are just sitting in the cache not doing anything will be refetched.

**queryClient.invalidateQueries**, on the other hand, will only mark any fresh queries as stale, which automatically triggers a refetch. However, since React Query will never automatically refetch inactive queries, queryClient.invalidateQueries results in fewer queries refetching, which means less network traffic.

**A good rule to follow:** If you know that the query absolutely needs to refetch, even if its inactive, use queryClient.refetchQueries. For every other situation, use queryClient.invalidateQueries.
