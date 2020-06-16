# base-ui-components

> base Angewandte Component Library

This is a component library developed by and used for projects of the
[base Angewandte](https://base.uni-ak.ac.at),
a collection of applications for the staff and students at the [University of
Applied Arts Vienna](https://www.dieangewandte.at).

### Installation and Usage

<!---
Install via:
```
npm i base-ui-components
```
-->

Currently this project is still under development and therefore usage
can not be wholeheartedly be recommended at this point.

If you still would like to do so you can import every component individually to the file you want to use them:

```vue
<template>
    <BaseAutocompleteInput />
</template>

<script>
import { BaseAutocompleteInput } from 'base-ui-components';

export default {
    components: {
        BaseAutocompleteInput,
    },
};
</script>
```
Styles need to be imported separately - this is best done in your `main.js` file:

```js
import Vue from 'vue';
import 'base-ui-components/dist/lib/base-ui-components.min.css';

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
```

The code base is available at [github](https://github.com/base-angewandte/base-ui-components).

There is a [styleguide](https://base-angewandte.github.io/base-ui-components/) listing all available components and their usage.

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
  --graytext-color: #808080;
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
![alt text](static/angewandte-logo.svg "Angewandte")
<!-- logo base -->
![alt text](static/base.png "base Angewandte")
<!-- logo zukunvt?  or anything else? -->

