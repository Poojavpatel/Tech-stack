* To show all users & emails, and the number of commits in Current Project
```bash
git shortlog --summary --numbered --email
# or 
git shortlog -sne
git shortlog -sne --all # to show users from all branches
```

### UNDO last commit 
IF you have NOT pushed your changes to remote
```bash
git reset HEAD~                       // Undo commit and unstage all files
git reset --soft HEAD~                // Undo last commit and keep all files staged
git reset --hard HEAD~                // Undo the commit and completely remove all changes
```
You have pushed your changes to remote
```bash
git revert HEAD
```
 OR
```bash
git revert <commit hash>
```

---

### 

```bash
git for-each-ref --sort=authorname --format "%(authorname) %(refname)"
git reflog
```

// 
git cz 

// regex for commit msg
https://regex101.com/r/MtG7sy/2
^[A-Z]{1,4}-[0-9]{1,4}:\s(\w*)(\((\w+)\))?:\s(.*)$

---

Did you forget to create a new branch, and made your changes in the wrong branch

```bash
🔮 git switch -c "new-branch"
```

Creates a new branch and moves all your changes to the new branch

---

### Reset current branch to the last pushed commit
```bash
git reset origin/APP-5525-tagged-member-in-private-post --hard
```

---

### Rebase master into your branch (similar to merge master) 

```bash
git pull origin master --rebase  
// after resolving merge conflicts
git rebase --continue
git push origin your_branch -f
```