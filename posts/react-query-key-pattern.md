---
title: 'React-Query key pattern'
date: '2022-07-08'
---

**Generic to specific**

Take a look at this URL from the Github REST API, it follows the "generic to specific" pattern: repos -> owner -> repo -> issues.

`https://api.github.com/repos/{owner}/{repo}/issues`

Writing an effective query key to match this API call would work in a similar way: start with the most generic item and go to the most specific. However, you might find it helpful to put a string at the beginning of the array key to identify the kind of data being fetched:

`useQuery(["issues", owner, repo], queryFn);`
