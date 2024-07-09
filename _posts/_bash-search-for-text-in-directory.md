Search for text in all files in directory
    
```
search_text="your-search-text";
grep -R "$search_text" ./
```

Searching for emails

```
grep -oE "[[:alnum:]._%+-]+@[[:alnum:].-]+\.[[:alpha:]]{2,}" $file_to_search
```

or if you want a specific domain

```
grep -oE "[[:alnum:]._%+-]+@microgaming.co.uk" $file_to_search
```