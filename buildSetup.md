## Build Setup

### System Requirements

This project is currently compatible with node versions >= 18.0.0 <21.0.0.

### Available Npm Scripts

``` bash
# install dependencies
npm install

# build library components
npm run build

# build library components and rebuild on changes
npm run build:watch

# add postcss transformations to base-ui-components.css
npm run build:transform-css

# commands run after build (build:transform-css, build:transform-css)
npm run build:post-commands

# serve with hot reload at localhost:8080
npm run dev

# lint files
npm run lint

# lint files and fix problems
npm run lint:fix

# publish a new version
npm run version-publish

# run the styleguide in dev mode
npm run styleguide

# build a new styleguide version
npm run styleguide:build

# create svg spriteSheet
npm run svg

# create a changelog for the newest version adding to CHANGELOG.md
npm run changelog

# an argument specifying the styleguide path to correctly link components may be specified like so
npm run changelog -- --styleguide-path=https://base-angewandte.github.io/base-ui-components/
```

## Development

The v3 of this component library is built with [Vite](https://vitejs.dev).

This project uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). More detailed information and documentation is
available [here](https://basedev.uni-ak.ac.at/documentation/base/dev_guide.html#commit-guidelines).

```bash
# to use locally for development
# in this project
npm link

# in target project
npm link base-ui-components
# Note: to date nuxt/bridge projects seem to have issues with importing linked and minified modules -
#       therefore disable minifying in vite.config.js: build.minify: false
```

## Contributor Guidelines

### General

* Adding to or refactoring an existing component please make sure previously existing functionality and styling is not broken by the code extentions (unless that was the purpose of the ticket).
* Before submitting a ticket to code review please make sure the component is functional in the following environments:
  * All supported browsers. Please at least test one browser per operating system: **MacOS**, **Windows**, **Linux**, **iOS**, **Android** and make sure the latest versions of the following browsers are covered: **Firefox**, **Chrome**, **Edge**, **Safari**.
    The base dev team uses [Browserstack](https://www.browserstack.com/) for testing, which provides free accounts for open source projects.
  * A frontend project using SSR (e.g. Nuxt).
  * The component styleguide.


### (S)CSS

* Base Components are using [Sass](https://sass-lang.com/). An array of variables is specified under `src/styles/variables.scss`. Please use these variables as you see fit.

Currently available variables:

```scss=
/* fonts */
$font-size-regular: 1rem;
$font-size-small: math.div(16rem, 19);
$font-size-large: math.div(24rem, 19);
$line-height: math.div(24rem, 19);

/* height and spacing */
$spacing: math.div(16rem, 19);
$spacing-small: math.div(8rem, 19);
$spacing-large: math.div(32rem, 19);
$spacing-small-half: math.div($spacing-small, 2);
/* new styleguide: font size + relative spacing! */
$row-height-large: 1rem +  2*1rem;
$row-height-small: 1.1rem +  2*$spacing-small;
$header-height: 55px;
$chips-spacing: 0.05rem;
$chips-list-height: 1rem + 2*$spacing;
$input-field-line-height: math.div(27rem, 19);
$fade-out-width: 30px;

/* colors */
$app-color: var(--app-color, #673ab7);
$app-color-secondary: var(--app-color-secondary, #b085f5);
$font-color: var(--font-color, rgb(0, 0, 0));
$font-color-second: var(--font-color-second, rgb(107, 107, 107));
$font-color-third: var(--font-color-third, rgb(160, 160, 160));
$button-header-color: var(--button-header-color, rgb(240, 240, 240));
$input-field-color: var(--input-field-color, rgb(200, 200, 200));
$background-color: var(--background-color, #f0f0f0);
$box-color: var(--box-color, white);
/* self defined for now! */
$uploadbar-color: var(--uploadbar-color, #999999);
$keyboard-active-color: var(--keyboard-active-color, rgb(217, 217, 217));
$switch-container-color: $input-field-color;
$switch-color: $background-color;
$switch-checked-color: var(--switch-checked-color, #4d4d4d);
$switch-svg-color: $font-color-third;
$switch-svg-checked-color: var(--switch-svg-checked-color, #ffffff);
$graytext-color: var(--graytext-color, rgba(16, 16, 16, 0.3));
$map-cluster-bg: var(--map-cluster-bg, rgba(255, 152, 0, .4));
$map-cluster-bg-inner: var(--map-cluster-bg-inner, rgba(255, 152, 0, .85));
$map-cluster-bg-hover: var(--map-cluster-bg-hover, rgba(255, 217, 91, .4));
$map-cluster-bg-inner-hover: var(--map-cluster-bg-inner-hover, rgba(255, 217, 91, .85));
$pagination-bullet-color: var(--pagination-bullet-color, #444444);
$warning-color: var(--warning-color, #ff4444);

/* shadows and borders */
$border-width: 2px;
$border-active-width: 4px;
$box-shadow-reg: 0px 0px 3px 0px rgba(0,0,0,0.05);
$box-shadow-hov: 0px 1px 5px 0px rgba(0,0,0,0.15);
$box-shadow-edit: 0 0 15px 5px rgba(0, 0, 0, 0.15);
$drop-shadow: 0px 10px 10px 0px rgba(0,0,0,0.25);
$pop-up-shadow: 0px 0px 36px 0px rgba(0,0,0,0.5);
$pop-up-drop-shadow: 0px 10px 46px 0px rgba(0,0,0,0.25);
$input-shadow: inset 0px 1px 4px 0px rgba(0,0,0,0.2);
$preview-box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.25);
$box-transition: box-shadow 0.2s ease-in-out;
$separation-line: $border-width solid $button-header-color;
$list-border: 5px solid rgba(76, 175, 80, 1);
$list-border-transparent-50: 5px solid rgba(76, 175, 80, 0.5);
$list-border-transparent-100: 5px solid rgba(76, 175, 80, 0);
$upload-border: $border-width dashed $font-color-second;
$upload-border-hover: $border-width dashed $app-color;
$active-border: $border-active-width solid $app-color;
$input-field-border: 1px solid $input-field-color;
$loading-background: rgba(255, 255, 255, 0.5);

/* sizing */
$page-max-width: 1400px;
$page-min-width: 305px;

/* icons */
$icon-max: 48px;
$icon-xxlarge: 64px;
$icon-xlarge: 56px;
$icon-large: 24px;
$icon-medium: 16px;
$icon-small: 12px;
$icon-min: 8px;

/* animations */
$drop-down-arrow-animation: transform 0.5s ease, color 0.2s ease, fill 0.2s ease;

/* break-points */
$mobile: 639px;
$mobile-min-width: 640px;
$tablet: 1024px;

/* z-indeces */
$zindex: (
  boxcontent: 100,
  fadeout: 100,
  uploadbar: 100,
  button-active: 100,
  entry-selector-head: 150,
  dropdown: 200,
  uploadbar-content: 200,
  hoverbox: 500,
  loader: 5000,
  modal_bg: 10000,
  modal: 10020,
);

/* headlines */
$headline-margin-bottom: math.div($line-height, 2);

/* transitions */
$link-transition: color 0.2s ease-in-out;
$base-expand-list-transition-duration: 250ms;

```

* If a component needs to have a `z-index`, it should be set in reference to and added to `$zindex` in `variables.scss` (line 91).

#### Helper Classes

`no-clean`: can be used to not have the directive `v-clean-dom-nodes` applied to a child element


Additional helper classes are available in `src/styles/lib.scss` (e.g. a `.hide` class keep content available for screenreaders).

### Commit Guidelines

* Please follow the conventional commit guidelines specified [here](https://basedev.uni-ak.ac.at/documentation/base/dev_guide.html#commit-guidelines).
* Breaking changes must be mentioned in the commit message according to conventional commit standards.
* The `scope` should always include the name of the component that was changed (in PascalCase). If more then one component was changed they should be separated by comma. e.g. `feat(BaseIcon, BaseInput):`
* The `footer` should include a reference to the ticket that was worked on. e.g. `Refs: #1234`

### Documentation Guidelines

* We are using [Vuepress](ps://vuepress.vuejs.org) to automatically generate a [styleguide](https://base-angewandte.github.io/base-ui-components/components/BaseSwitchButton.html#events) for all components. Therefore all component `props`, `events`, `slots` and public `methods` need to be documented in [JSDoc style](https://jsdoc.app/).


Example for props:

```javascript=
/**
 * set if the switch label is shown
 */
showLabel: {
  type: Boolean,
  default: false,
},
```

Example for events:

```javascript=
/**
* inform parent to fetch autocomplete data for the provided filter
*
* @event fetch-autocomplete
* @type {Object} - object with the following properties:
* @property {string} searchString - the string to autocomplete
* @property {Filter} filter - the filter object
* @property {number} index - the filter index of all filters (main and applied)
*/
this.$emit('fetch-autocomplete', { searchString: input, filter, index });
```

Example for slots:

```htmlbars=
<!-- @slot for adding elements at the end covering the whole height
@binding {string} fieldName - the name of the displayed field
@binding {number} index - the array index of field values -->
<slot
  name="post-input-field"
  :field-name="fieldName"
  :index="valueIndex" />
```

Example for public methods:
```javascript=
/**
 * function to trigger from slot `entries` when an entry was selected
 * @param {Object} obj - selected entry
 * @property {boolean} obj.selected - variable indicating if entry was selected or deselected
 * @property {string} obj.index - the index of the selected or deselected entry in 'entries'
 * @public
 */
selectEntry(obj) {
  // functional code
},
```

* If a prop has limited valid values, they need to be explained in the description of the prop:

```javascript=
/**
 * set a type for the button's active state rendering style
 *  **normal**: gives the switch a more subtle, more condensed look with active item only indicated by grey border,
 *    buttons have a label per default (`showButtonsLabel` is `true`).
 *  **prominent**: larger buttons with more spacing and permanent border around each item, active item is
 *    indicated by a 2px (app-)colored bottom border, button labels are not shown per default (`showButtonsLabel` is `false`)
 *    so the property `icon` should be set for each switch item in `options`.
 */
type: {
  type: String,
  default: 'normal',
  validator: val => ['normal', 'prominent'].includes(val),
},
```


* If a prop is of type object or an array of objects the properties of the object need to be mentioned in the description of the prop:

```javascript=
/**
 * actual entries list - if slot `result-box` is not used to use custom elements this
 * object array should have the following properties to be displayed
 * in a [BaseImageBox](BaseImageBox):
 *
 *    **id** `string` - a unique identifier
 *    **title** `?string` - the title of the box
 *    **subtext** `?string` - a subtitle
 *    **description** `?string` - text displayed at the bottom of the box
 *    **imageUrl** `?string` - url to display an image
 *    **text** `?string[]` - an array with strings that will be
 *    displayed if no image is provided
 *
 *    if a different schema is used please use the slot 'result-box' to create your own
 *    elements - only id and title should still be provided but can also
 *    be customized via `identifierPropertyName` and `titlePropertyName`
     */
entryList: {
  type: Array,
  default: () => [],
},
```
* In case a prop has limited valid values, please make sure this is displayed in the styleguide. This is only extracted automatically if values are validated with the `Array.includes()` method.

DON'T:

```javascript
validator: val => val === 'normal' || val === 'prominent',
```

DO:

```javascript
validator: val => ['normal', 'prominent'].includes(val),
```

* Each component should have a short meaningful description at the beginning of the script tag (but after imports). This is used in the styleguide as introduction to the component.

```javascript=
<script>
import BaseIcon from '../BaseIcon/BaseIcon';
/**
 * accessible tab switch buttons
 */
```

* Also all other code should be documented and commented with the objective in mind to help other developers to understand the code.

* An meaninfull example of the component demonstrating its features or its new or altered features must be provided in an `Readme.md` file located in the same folder as the component. Again, due to using Vuepress this should look as follows:


~~~markdown=
## Demo

A meaningful description of what is shown in this example.

```vue live

<template>
    <MyComponent />
</template>

<script>
export default {};
</script>

<style>
</style>

```
~~~

* An external developer should be able to understand how to use the component from the styleguide documentation. So before commiting code please make sure that all the features and changes are properly documented in the styleguide and check the following:
  * is everything (props, slots, events) documented the way it should be?
  * are there formatting issues?
  * are the styleguide examples working, demonstrating the necessary features and generally making sense?

### Naming Conventions

#### Custom HTML elements

* For several reasons listed in the official [Vue documentation](https://vuejs.org/style-guide/rules-strongly-recommended.html#component-name-casing-in-templates), custom HTML elements should be written in PascalCase (instead of kebap-case):
```htmlbars=
<template>
    <BaseIcon />
</template>
```

#### Events

* Events should always be named kebap-case not camelCase.

```javascript=
this.$emit('fetch-dropdown-entries', { value: val });
```


#### CSS

* We are loosely trying to follow the [BEM (Block Element Modifier)](https://getbem.com/naming/) CSS naming conventions. So CSS naming in each component should follow the structure:

```htmlbars=
<template>
    <div class="my-component my-component--state">
        <div class="my-component__wrapper my-new-component__wrapper--state">
        </div>
    </div>
</template>
```
