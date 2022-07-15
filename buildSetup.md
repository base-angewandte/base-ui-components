## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build library components with rollup
npm run build

# build library components with rollup with rebuild on changes
npm run build:watch

# run styleguide for development purposes
npm run styleguide

# build styleguide docs
npm run styleguilde:build

# lint files
npm run lint

# create svg spriteSheet
npm run svg

# create index file for every component (if it does not exist yet)
npm run updateindex

# force index update (also if index.js already exists)
npm run updateindex:all

```

```bash
# to use locally for development
# in this project
npm link

# in target project
npm link base-ui-components
```

## Base Components

for a list of components included in the build and their options run ```npm run styleguide```
or see [styleguide](https://base-angewandte.github.io/base-ui-components/).
