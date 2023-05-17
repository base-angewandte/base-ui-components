# base-ui-components

> base Angewandte Component Library

This is a component library developed by and used for projects of the
[base Angewandte](https://base.uni-ak.ac.at),
a collection of applications for the staff and students at the [University of
Applied Arts Vienna](https://www.dieangewandte.at).

### Installation and Usage

Install via:
```
npm i base-ui-components
```

You can either import each component individually:

```js
main.js

import Vue from 'vue';
// import the components you would like
import { BaseAutcompleteInput, BaseCarousel } from 'base-ui-components';
// also import the component css
import 'base-ui-components/dist/components/BaseAutocompleteInput/BaseAutocompleteInput.css';
import 'base-ui-components/dist/components/BaseCarousel/BaseCarousel.css';
// additionally a common css file is needed
import 'base-ui-components/dist/base-ui-components-common.css';
import App from './App';

const components = {
  BaseAutcompleteInput,
  BaseCarousel,
};

Object.entries(components)
  .forEach(([name, component]) => {
    Vue.component(name, component);
  });

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

```

or as complete package:

```js
main.js

import Vue from 'vue';
// import the complete components bundle
import * as BaseUiComponents from 'base-ui-components';
// and the css
import 'base-ui-components/dist/base-ui-components.css';
import App from './App';

Object.entries(BaseUiComponents)
  .forEach(([name, component]) => {
    Vue.component(name, component);
  });

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

```

After adding the components, they can be used in your app globally, like so:

```vue
Component.vue

<template>
    <BaseAutocompleteInput
      label="test"
      ...
    />
    <BaseCarousel
      ...
    />
</template>

<script>
  export default {};
</script>
```


All available components, their usage and demos can be found in our [styleguide](https://base-angewandte.github.io/base-ui-components/).

The code base is available at [GitHub](https://github.com/base-angewandte/base-ui-components).

[Development Instructions](buildSetup.md)

### Customization

App color and certain other styles can be customized via css variables.
In order to do so you can add the following variables to your main css/scss file:

```css
:root {
  --app-color: #FF9800;
  --font-color: rgb(0, 0, 0);
  --font-color-second: rgb(107, 107, 107);
  --button-header-color: rgb(240, 240, 240);
  --input-field-color: rgb(200, 200, 200);
  --background-color: #f0f0f0;
  --box-color: #ffffff;

  --uploadbar-color: #999999;
  --switch-checked-color: #4d4d4d;
  --switch-svg-checked-color: #ffffff;
  --graytext-color: rgba(16, 16, 16, 0.3);
}
```
Then in your `main.js` file import your styles before the base-ui-components file. E.g.:

```js
import './styles/app.scss';

import 'base-ui-components/dist/lib/base-ui-components.min.css';
```


### License

See [LICENSE](LICENSE.md)


<!-- logo angewandte -->
![alt text](./static/angewandte-logo.svg "Angewandte")
<!-- logo base -->
![alt text](./static/base.png "base Angewandte")
<!-- logo zukunvt?  or anything else? -->

### Support

This open-source project was developed (and more specifically - cross-browser tested) with the support of:

[![Browserstack-logo](./static/browserstack.svg)](https://www.browserstack.com)

