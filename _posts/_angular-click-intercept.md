---
layout: post
title:  "Angular Click Interceptor"
date:   2020-04-04 13:43:00 +0200
categories: angular
---

# Request
As a developer I would like to prevent certain actions on our app based off a user's role

## Description
If there was a single function that needed this restriction, it would be pretty simple.

However we want to future proof our app.

So we wanna build a robust solution that can take care our any existing actions that exist on our app and cater for any other functionality that may get added to our app in the future.

Angular has something called a Directive that we can use to achieve this.

A really simple understanding of this could thinking of it as creating a function on all elements that match a query selector.

But think of this query selector available everywhere

## Solution

We will need to create a directive.

```

```


## Resources
1. https://alligator.io/angular/building-custom-directives-angular/
1. https://www.sitepoint.com/practical-guide-angular-directives/
