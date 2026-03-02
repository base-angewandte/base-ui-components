#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[", ]//g')

# get main ready
git checkout main &&
# pull first in case there are commits by somebody else
git pull &&
git merge develop &&
git push &&
git tag $PACKAGE_VERSION &&
git push --tags &&
# also push main to github
git push github main &&
git push --tags github main &&
# publish
npm publish &&
# also create, commit and publish styleguide
git checkout gh-pages &&
# pull first in case there are new version made by somebody else
git pull &&
git merge main &&
# remove components folder before building so removed components dont remain in the build
rm -rf docs/components &&
npm run styleguide:build &&
git add styleguide/* &&
git commit -m "docs: styleguide for $PACKAGE_VERSION" &&
git push &&
npm run update-pages &&
git checkout develop
