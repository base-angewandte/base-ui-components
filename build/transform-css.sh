#!/bin/bash

# `/dist` folder must not contain node_modules
if [ -d "dist/node_modules/" ]; then
  echo 'Error:'
  echo 'Build could not be finished and is broken due external dependencies.'
  echo 'Please check dist/node_modules and add the dependencies to externals section in vite.config.js.'
  exit 0
fi

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
# remove common-css file
rm dist/base-ui-components-common.css

