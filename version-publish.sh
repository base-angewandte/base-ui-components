#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

# commit the new version (incl. CHANGELOG)
git add CHANGELOG.md package.json package-lock.json &&
git commit -m "$PACKAGE_VERSION" &&
git tag v$PACKAGE_VERSION

# push develop branch
git push &&
git push --tags &&
# get main ready
git checkout master &&
git merge develop &&
git push &&
git push --tags &&
# also push main to github
git push github master &&
git push --tags github master &&
# publish
npm publish &&
# also create, commit and publish styleguide
git checkout gh-pages &&
npm run styleguide:build &&
git add . &&
git commit -m "docs: styleguide for v$PACKAGE_VERSION" &&
git push &&
npm run update-pages &&
git checkout develop
