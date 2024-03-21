---
layout: post
title:  "Service Principles vs Managed Identities"
date:   2019-07-30
categories: azure ci-cd
---

| Feature                                   | Service Principle | Managed Identity |
|-------------------------------------------|-------------------|------------------|
| automatically created                     | no                | yes              |
| linked to                                 | nothing           | azure resource   |
| deleted when azure resource is deleted    | no                | yes   |
| can create via cli                        | yes               |                  |
| someone needs to create object            | yes               |
| client id exposed / known to creator      | yes               | no               |
| client secret exposed / known to creator  | yes               | no               |
| client id exposed / known to consumer     | yes               | no               |
| client secret exposed / known to consumer | yes               | no               |
| object validity                           | 1 / 2 years       | 
 

### Service Principle
> …An application whose tokens can be used to authenticate and grant access to specific Azure resources from a user-app, service or automation tool, when an organization is using Azure Active Directory…

```bash
service_principle_name="sp-for-automation";
az ad sp create-for-rbac --name "$service_principle_name";
```


#### References:
* https://devblogs.microsoft.com/devops/demystifying-service-principals-managed-identities/
* 