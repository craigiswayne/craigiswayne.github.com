```
start="2021-01-26"
end="2021-01-27"
git log --pretty=format:"%ad - %an: %s" --after=$start --until=$end
git log --after=$start --until=$end
```

```
start="2021-07-09"
git log --pretty=format:"%ad - %an: %s" --after=$start
git log --after=$start
```
