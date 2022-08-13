scrape
download whole site
wget

```
# One liner
wget --recursive --page-requisites --adjust-extension --span-hosts --convert-links --restrict-file-names=windows --domains yoursite.com --no-parent yoursite.com

# Explained
wget \
     --recursive \ # Download the whole site.
     --page-requisites \ # Get all assets/elements (CSS/JS/images).
     --adjust-extension \ # Save files with .html on the end.
     --span-hosts \ # Include necessary assets from offsite as well.
     --convert-links \ # Update links to still work in the static version.
     --restrict-file-names=windows \ # Modify filenames to work in Windows as well.
     --no-clobber \ # don't overwrite any existing files (used in case the download is interrupted and resumed)
     --domains yoursite.com \ # Do not follow links outside this domain.
     --no-parent \ # Don't follow links outside the directory you pass in.
         yoursite.com/whatever/path # The URL to download
```

OR

```
wget \
    --recursive \
    --no-clobber \
    --page-requisites \
    --html-extension \
    --convert-links \
    --restrict-file-names=windows \
    https://vino.qodeinteractive.com
```

