git push &&
git push --tags &&
git checkout master &&
git merge develop &&
git push &&
git push --tags &&
git push github master &&
git push --tags github master &&
npm publish &&
git checkout develop
