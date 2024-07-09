---
layout: post
title:  "Check if Port is opened"
date:   2024-07-01
categories: [port,test]
---


```powershell
$computer_host="microgamin-7b9dd35718dd4d2a8fab7240eb6ea189-dbserver.mysql.database.azure.com";
Test-NetConnection -ComputerName $computer_host -Port 3306 -InformationLevel Detailed
```