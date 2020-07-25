---
layout: post
title:  "How to run a Pipeline for Merge Requests Only"
date:   2020-06-08
categories: gitlab
---

Your job should look like this

```
test:
  stage: test
  script:
    - echo "Running this pipeline only for merge requests"
  only:
    - merge_requests
```
