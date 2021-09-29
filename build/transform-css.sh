#!/bin/bash

# attempt to fix this script on windows
fixpath() {
  case "$OSTYPE" in
    *linux* ) echo "${1//\\/\/}"
      ;;
    *ux* ) echo "linux"
      ;;
    *darwin* ) echo "${1//\\/\/}" ;;
    *bsd* ) echo "${1//\\/\/}" ;;
    *win* ) echo "${1//\//\\}" ;;
  esac
}

# make css out of lib.scss file and use postcss autoprefixer
sass $(fixpath 'src/styles/lib.scss') | postcss --use autoprefixer -o lib.post.css;
# create one file out of lib.post.css and normalize.css and minify
cleancss -o $(fixpath 'dist/base-ui-components-common.css') $(fixpath 'node_modules/normalize.css/normalize.css lib.post.css');
# remove temp file
rm lib.post.css;

# add lib.css and normalize.css to the main base-ui-components.css by creating a temp file
cat $(fixpath 'dist/base-ui-components-common.css') $(fixpath 'dist/base-ui-components.css') > temp;
# rename that temp file to replace base-ui-components.css
mv temp $(fixpath 'dist/base-ui-components.css');
