---
layout: post
title:  "Types of Azure Static Sites"
date:   2024-05-28 09:03:00 +0000
categories: [comparison,azure,swa]
---

Deciding between an Azure Static Web App vs an attached Static Site to an Azure Storage Account

```mermaid
flowchart
    Q1[Do you require multiple environments?]
    Q1-- YES --> SWA[Static Web App]
    Q2[Github login support?]-- YES --> SWA
    Q3[microsoft.com login support?]-- YES --> SWA
```

| Feature                                        | Static Web App | Static Site attached to Storage Account |
|------------------------------------------------|----------------|-----------------------------------------|
| Environments / Slots                           | Y              | N                                       |
| Custom Authentication*                         | Y              |                                         | 
| Supports its own API                           | Y              |                                         |
| Can be accessed via Azure Storage Explorer App |                | Y                                       |
| Deployment via Pipelines                       | Y              | Y                                       |