## Build Setup

``` bash
# install dependencies
npm install

# build library components with rollup
npm run build

# add postcss transformations to base-ui-components.css
npm run build:transform-css

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

# create a changelog for the newest version adding to CHANGELOG.md
npm run changelog

# an argument specifying the styleguide path to correctly link components may be specified like so
npm run changelog -- --styleguide-path=https://base-angewandte.github.io/base-ui-components/
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

The v2 of this component library is currently build via [Vite](https://vitejs.dev).

This project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). More detailed information and documentation is
available [here](https://basedev.uni-ak.ac.at/documentation/base/dev_guide.html#commit-guidelines).
