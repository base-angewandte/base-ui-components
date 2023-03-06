## Build Setup

``` bash
# install dependencies
npm install

# build library components
npm run build

# build library components and rebuild on changes
npm run build:watch

# add postcss transformations to base-ui-components.css
npm run build:transform-css

# collect css files, generate and update package.json exports property
npm run build:update-package-exports

# commands run after build (build:transform-css, build:transform-css)
npm run build:post-commands

# serve with hot reload at localhost:8080
npm run dev

# lint files
npm run lint

# create svg spriteSheet
npm run svg

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

## Development

The v2 of this component library is currently built via [Vite](https://vitejs.dev).

This project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). More detailed information and documentation is
available [here](https://basedev.uni-ak.ac.at/documentation/base/dev_guide.html#commit-guidelines).
