git stash basics



Why?

Store changes to files in a temporary place on your machine only.



Suppose you're not ready to commit your work, or if you wish to work on a different branch;

you can simply "store" your files in a temporary location, and bring them back when you want.



thing of it as your own personal "Work In Progress" section.



each time you stash, you create a NEW stash, meaning you could have multiple "WIP" sections.



Below are some commands to do so:



1. `git stash list`

* view all stash's on your pc



1. `git stash`

* will store all "tracked" files in a temporary location, using the last commit message as the stash label



1. `git stash -u`

* will store all "tracked" and "untracked" files in a temporary location, using the last commit message as the stash label



1. `git stash push -um "Your Custom Message"`

* will store all "tracked" and "untracked" files in a temporary location, using "Your Custom Message" as the stash label

* this is extremely useful when you have lots of stash's to keep track of
