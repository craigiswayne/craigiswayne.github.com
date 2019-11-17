---
layout: post
title:  "Javascript Maintenance"
date:   2019-07-30
categories: javascript maintenance housekeeping
---


see: https://gist.github.com/craigiswayne/62ec315e91a885417d87a4801d8c705e

Managing undocumented and convoluted front-end angular applications is a nightmare as many of you know...

However this document will serve to help those tasked with this management.

tsconfig.json changes

```
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

This above snippet will prevent the use of unused variables, libraries and parameters

<br/>

---

<br/>

## DotNet Angular Lint intergration
To maintain coding standards for everyone, you can integrate `npm lint` tests so that when your dotnet project publishes, an `npm lint` is run

in your `*.csproj` file

```
<Target Name="PublishRunWebpack" AfterTargets="ComputeFilesToPublish">
  <Exec WorkingDirectory="$(SpaRoot)" Command="npm install" />
  <Exec WorkingDirectory="$(SpaRoot)" Command="npm run lint" /> <!----- ADD THIS LINE AFTER npm install runs -->
</Target>
```
