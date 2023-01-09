#!/bin/bash

# `/dist` folder must not contain node_modules
if [ -d "dist/node_modules/" ]; then
  echo 'Error:'
  echo 'Build could not be finished and is broken due external dependencies.'
  echo 'Please check dist/node_modules and add the dependencies to externals section in vite.config.js.'
  exit 0
fi

# make css out of merged components css files
for d in dist/src/components/*/; do
  # merge rollup built css files
  cat $d*.css > dist/components/`basename "$d"`/`basename "$d"`.css;
  # delete rollup built css files
  # rm -rf cat $d*.vue*.css
done

# cleanup folders
if [ -d "dist/components/" ]; then
  rm -rf dist/src
fi

# make css out of all components css
cat dist/components/*/*.css > dist/base-ui-components.css;

# make css out of lib.scss file and use postcss autoprefixer
sass src/styles/lib.scss | postcss --use autoprefixer -o lib.post.css;
# create one file out of lib.post.css and normalize.css and minify
cleancss -o dist/base-ui-components-common.css node_modules/normalize.css/normalize.css lib.post.css;
# remove temp file
rm lib.post.css;

# add lib.css and normalize.css to the main base-ui-components.css by creating a temp file
cat dist/base-ui-components-common.css dist/base-ui-components.css > temp;
# rename that temp file to replace base-ui-components.css
mv temp dist/base-ui-components.css;

