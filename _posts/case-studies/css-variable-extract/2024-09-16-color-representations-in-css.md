---
layout: post
title:  "Color Representation in CSS"
date:   2024-09-16
categories: [css,utility,generator]
---

I wanted to create a css color extractor that would examine a stylesheet, find all colors and create variables for each color found

Normally I would dive straight in, but the more I played around with colors in css, i found that this is actually very tricky

I first started with how many different ways you can state a color in CSS

The table below shows what i've found

| Types                   | Examples                         | REGEX                                                               | Notes                             |
|-------------------------|----------------------------------|---------------------------------------------------------------------|-----------------------------------|
| Legacy HTML Color Names | `lime`                           | ?                                                                   | 16 in total                       |
| Modern HTML Color Names | `AliceBlue`                      | use `indexOf`?                                                      | 140 in total                      |
| Hex                     | `#B1CB1C`                        | `#[a-zA-Z\d]{3,8}`                                                  | letters can be upper or lowercase |
| Hex Shorthand           | `#6B5`                           | same as above                                                       |                                   |
| Hex with Alpha          | `#2d01c8e6`                      | same as above                                                       |                                   |
| Strict rgb              | `rgb(255,0,12)`                  | `rgb\(\s*\d{1,3},?\s*\d{1,3},?\s*\d{1,3}\)`                         |                                   |
| RGB with Alpha Decimal  | `rgb(255,0,12,0.1)`              | `rgba?\(\s*\d{1,3}\s*,?\s*\d{1,3}\s*,?\s*\d{1,3}\s*(?:, 0\.\d+)?\)` |                                   |
| RGB with Alpha %        | `rgb(255,0,12,10%)`              | `rgba?\(\d{1,3},\d{1,3},\d{1,3},\d{1,3}%\)`                         |                                   |
| RGB with Alpha %        | `rgb(45 0 198 /90%)`             | ?                                                                   |                                   |
| HSL                     | `hsl(253deg 99% 39% / 90%)`      | ?                                                                   |                                   |
| HWB                     | `hwb(253deg 0.39% 22.39% / 90%)` | ?                                                                   |                                   |
| LCH                     | `lch(24 105.99 302.72 / 0.9)`    | ?                                                                   |                                   |
| OKLCH                   | ?                                | ?                                                                   |                                   |
| LAB                     | `lab(24 57.29 -89.17 / 0.9)`     | ?                                                                   |                                   |
| OKLAB                   | ?                                | ?                                                                   |                                   |
| CMYK                    | ?                                | ?                                                                   |                                   |
| HSV/HSB                 | ?                                | ?                                                                   |                                   |

## Variances
* RGB values can either have 0->unlimited spaces between commas
* RGB values don't necessarily need commas between values

## Steps:
1. lowercase everything?
2. extract html safe colors
3. Find all possible instances of colors
4. Grab color names from an api
5. Normalize them (remove spaces)
6. Count occurrences of each color
7. Create palette
   * primary -> most uses
   * secondary -> 2nd most color uses
   * etc etc

----

## References:
* https://www.unm.edu/~tbeach/IT145/color.html#:~:text=HTML%20used%20to%20recognize%2016,those%20are%20red%20and%20white).
* https://www.w3schools.com/colors/colors_names.asp
* https://htmlcolorcodes.com/color-names/
* https://www.color-name.com/hex/110011