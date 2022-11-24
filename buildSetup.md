## Build Setup

``` bash
# install dependencies
npm install

# build library components with rollup
npm run build

# add postcss transformations to base-ui-components.css
npm run build:transform-css

# build library components with rollup and rebuild on changes
npm run build:watch

# serve with hot reload at localhost:8080
npm run dev

# run styleguide for development purposes
npm run styleguide

# build styleguide docs
npm run styleguilde:build

# lint files
npm run lint

# create svg spriteSheet
npm run svg

# run unit tests
npm run test:unit

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

For a list of components included in the build and their options run ```npm run styleguide```
or see [styleguide](https://base-angewandte.github.io/base-ui-components/).


## Development

The v2 of this component library is currently build via [rollup](https://rollupjs.org).

This project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). More detailed information and documentation is
available on request.
