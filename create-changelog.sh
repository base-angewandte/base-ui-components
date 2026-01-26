#!/bin/bash

# get the current branch name
current_branch=`git rev-parse --abbrev-ref HEAD`

# check if it is safe to create and change to new branch feature/changelog

# check on which branch user is currently on
if [[ $current_branch != "feature/changelog" ]]
then
  # if other then feature/changelog check if branch already exists
  if [[ `git branch --list feature/changelog` ]]
  then
    # if yes inform user and quit the script
    echo "Branch feature/changelog already exists! Please make sure this branch is not already in use and switch to the branch manually if you really want to use the existing branch before running the script again"
    exit 1
  fi
  echo "Creating and switching to new branch feature/changelog"
  # create a branch for the changelog PR
  git checkout -b feature/changelog
fi

# get the command line argument
version_bump=$1
# create a regex for allowed values of the command line argument ('major'|'minor'|'patch'|{version})
allowed_bump_values="^(major|minor|patch|[0-9]+\.[0-9]+\.[0-9]+)$"

# check if the command line argument matches allowed values
if [[ "$version_bump" =~ $allowed_bump_values ]]; then
  # if yes set the variable to the specified command line argument
  VERSION_BUMP=$1
else
  # if not inform user and stop script
  echo "No or incorrect value for version bump! Set value ('major'|'minor'|'patch'|{version}) with 'npm run changelog -- {version_bump}' - stopping script!"
  exit 1
fi

# update the package version in package.json (and package-lock.json) without a commit
# adding the version bump string via echo execution instead of directly to avoid
# npm warning "Unknown env config 'version-bump'. This will stop working in the next major version of npm."
npm version --commit-hooks false --git-tag-version false $(echo $VERSION_BUMP)

# get the updated version from package.json
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

# inform user
echo "Successfully updated package version to $PACKAGE_VERSION"

echo "Creating changelog now"
# create changelog
gulp -f gulpfile.js changelog

# after changelog creation we want to review and adapt changelog - wait for user confirmation
# until this is done
read -p "Review changelog and press 'Y' to continue when ready (Y/N): " confirm && [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]] || exit 1

# commit the new version (incl. CHANGELOG)
git add CHANGELOG.md package.json package-lock.json &&
# create a commit with the version as commit message
git commit -m "$PACKAGE_VERSION"

# rebase before pushing
git rebase develop
# push to the repository
git push --set-upstream origin feature/changelog
# return to develop branch
git checkout develop

# inform user everything was successfully completed
echo "Successfully updated CHANGELOG.md, commited and pushed branch feature/changelog"
