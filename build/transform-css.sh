#!/bin/bash

add_to_main_css=false;

while getopts "a?" opt; do
    case "$opt" in
    a)
        add_to_main_css=true
        ;;
    esac
done

# make css out of lib.scss file and use postcss autoprefixer
sass src/styles/lib.scss | postcss --use autoprefixer -o lib.post.css;
# create one file out of lib.post.css and normalize.css and minify
cleancss -o dist/base-ui-components-common.css node_modules/normalize.css/normalize.css lib.post.css;
# remove temp file
rm lib.post.css;

# only do this part if main base-ui-components.js together with base-ui-components.css bundle was created
if [ $add_to_main_css = true ] ; then
  # add lib.css and normalize.css to the main base-ui-components.css by creating a temp file
  cat dist/base-ui-components-common.css dist/base-ui-components.css > temp;
  # rename that temp file to replace base-ui-components.css
  mv temp dist/base-ui-components.css;
fi

