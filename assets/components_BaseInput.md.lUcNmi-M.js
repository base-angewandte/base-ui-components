import{_ as o,a as i,b as n,o as r,aL as s,I as l,i as e,x as d}from"./chunks/framework.wIfPYfir.js";const v=JSON.parse('{"title":"BaseInput","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseInput.md","filePath":"components/BaseInput.md","lastUpdated":1679928144000}'),u={name:"components/BaseInput.md"};function p(c,t,m,b,h,g){const a=i("vue-live");return r(),n("div",null,[t[0]||(t[0]=s('<h1 id="baseinput" tabindex="-1">BaseInput <a class="header-anchor" href="#baseinput" aria-label="Permalink to &quot;BaseInput&quot;">​</a></h1><blockquote><p>Form Input Field Component</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>modelValue</td><td>input field settable from outside</td><td>string|number</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>label</td><td>label for input field, required for usability purposes, handle<br>showing of label with property <code>showLabel</code></td><td>string</td><td>-</td><td></td></tr><tr><td>showLabel</td><td>defines if input label should be visible</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>inputId</td><td>if field is occurring more then once - set an <code>id</code><br><strong>caveat</strong>: in case a custom input is used with the <code>input</code> slot it is important to<br>assign the same id to the input element</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>placeholder</td><td>set a placeholder for the input field</td><td>string</td><td>-</td><td>&#39;Enter Text Here&#39;</td></tr><tr><td>required</td><td>mark as required field</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>invalid</td><td>mark the form field as invalid and ideally also provide an error message<br>to display below the form field<br>the v-model directive might be used on this prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>errorMessage</td><td>add an error message to be displayed below form field if field is invalid</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showErrorIcon</td><td>define if error icon should be shown</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>inputType</td><td>specify input type</td><td>string</td><td><code>text</code>, <code>number</code>, <code>password</code>, <code>email</code>, <code>url</code>, <code>search</code></td><td>&#39;text&#39;</td></tr><tr><td>dropDownListId</td><td>specify the id of a linked drop down list</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>linkedListOption</td><td>specify a linked list option (e.g. drop down)<br> (will be used in <code>aria-activedescendant</code> attribute)</td><td>number|string</td><td>-</td><td>null</td></tr><tr><td>hideInputField</td><td>option to hide input field from outside (required for chips input)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isActive</td><td>set input field in active state from outside<br>the v-model directive can be used on this prop</td><td>boolean</td><td>-</td><td>null</td></tr><tr><td>showInputBorder</td><td>option to have the border of the input field not displayed</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>useFormFieldStyling</td><td>define if standard form field styling should be<br>used (otherwise no border, no box shadow)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>clearable</td><td>if <code>true</code> a remove icon (or custom icon if slot <code>remove-icon</code> is used) will be shown allowing to remove<br>all input at once</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>loadable</td><td>if <code>true</code> space is reserved for a loader that can be activated<br>with the <code>isLoading</code> prop</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>isLoading</td><td>show spinner to indicate that something is loading<br>(for dynamically fetched entries that need to do backend requests)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>useFadeOut</td><td>turn off input fade out if it interferes with other styling (e.g. with custom input)</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>inputClass</td><td>specify additional input field styling</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>language</td><td>set a language (ISO 639-1)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>setFocusOnActive</td><td>use this prop to deactivate automatic setting of focus as soon as input element<br>becomes active - this might require external handling of focus setting!</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>disabled</td><td>set <code>true</code> if input field should be disabled</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>minLength</td><td>set min length of characters</td><td>number</td><td>-</td><td>null</td></tr><tr><td>maxLength</td><td>set max length of characters</td><td>number</td><td>-</td><td>null</td></tr><tr><td>decimals</td><td>set number of decimals (inputType=number)&lt;br&gt;<br>Note: -1 is used for endless decimals</td><td>number</td><td>-</td><td>null</td></tr><tr><td>decimalSeparator</td><td>set decimal separator character, e.g. &#39;,&#39; for german<br>note that this only changes the display of decimal values, input<br>values should always be provided with &#39;.&#39; as separator and will be<br>returned as such</td><td>string</td><td>-</td><td>&#39;.&#39;</td></tr><tr><td>min</td><td>set minimum value to accept</td><td>number</td><td>-</td><td>null</td></tr><tr><td>max</td><td>set maximum value to accept</td><td>number</td><td>-</td><td>null</td></tr><tr><td>validationTexts</td><td>define validation messages<br>currently just for type number</td><td>object</td><td>-</td><td>{<br> min: &#39;Value must be greater than or equal to {value}.&#39;,<br> max: &#39;Value must be less than or equal to {value}.&#39;,<br> minLength: &#39;Text must be at least {value} character(s) long.&#39;,<br> maxLength: &#39;Text cannot be longer than {value} characters.&#39;<br>}</td></tr><tr><td>assistiveText</td><td>provide assistive text for screen readers<br><strong>loaderActive</strong>: if <code>loadable</code> is set <code>true</code> this text is read<br> as soon as the loader is appearing (<code>isLoading</code> is set true)<br><strong>clearInput</strong>: text read for remove input icon if prop <code>clearable</code> is set <code>true</code></td><td>object</td><td>-</td><td>{<br> loaderActive: &#39;loading.&#39;,<br> clearInput: &#39;Clear input&#39;<br>}</td></tr><tr><td>ignoreClickOutside</td><td>add queryselector strings for elements that should not trigger a<br>click outside event</td><td>array</td><td>-</td><td>[]</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked-outside</td><td></td><td></td></tr><tr><td>click-input-field</td><td></td><td></td></tr><tr><td>update:invalid</td><td><strong>val</strong> <code>boolean</code> - undefined</td><td>propagate invalid state changes of input field to parent</td></tr><tr><td>update:is-active</td><td></td><td></td></tr><tr><td>update:model-value</td><td><strong>undefined</strong> <code>union</code> - the validated input value</td><td>Event emitted on input, passing input string</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>label-addition</td><td>Slot to allow for additional elements on the right side of the label row &lt;div&gt; (e.g. language tabs))</td><td></td></tr><tr><td>pre-input-field</td><td>add elements before the actual input line but within the input field container</td><td></td></tr><tr><td>input-field-addition-before</td><td>Slot to allow for additional elements in the input field &lt;div&gt; (e.g. chips) (before &lt;input&gt;)</td><td></td></tr><tr><td>input-field-inline-before</td><td>to add elements directly inline before the input (contrary to input-field-addition-before this does not wrap</td><td></td></tr><tr><td>input</td><td>replace native HTML input element with custom input</td><td><strong>id</strong> <code>string</code> - the id of the BaseInput component - if <code>id</code> is not provided in props this is an internal id that should also be set as &lt;input&gt; <code>id</code>. Also if this slot is used the v-model value should be provided to BaseInput as well for validation. Otherwise validation can be triggered with the <code>validate()</code> method.</td></tr><tr><td>remove-icon</td><td>use a custom icon instead of standard remove icon</td><td></td></tr><tr><td>input-field-addition-after</td><td>for adding elements after input (e.g. used to add loader)</td><td></td></tr><tr><td>error-icon</td><td>use a custom icon instead of standard error/warning icon</td><td></td></tr><tr><td>post-input-field</td><td>after the actual input element over whole height of the input field container</td><td></td></tr><tr><td>below-input</td><td>below-input slot added to e.g. add drop down</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A simple example without label</p>',11)),l(a,{layoutProps:{lang:"vue"},code:`<template>
  <BaseInput
    input-id="simpleexample"
    label="This label says Specify any text below"
    placeholder="A custom placeholder"
  />
</template>
<script>
export default {};
<\/script>
`,requires:{}}),t[1]||(t[1]=e("p",null,[d("A example with label and slot demonstrations. Also enter text to see clearable state or toggle controls to see various properties such as invalid state and the "),e("code",null,"below-input"),d(" slot. Also it is demonstrated here how to use the "),e("code",null,"isActive"),d(" prop.")],-1)),t[2]||(t[2]=e("p",null,[d("All events emitted by the native input element (e.g. "),e("code",null,"@keydown"),d(") contained in the BaseInput component are also available.")],-1)),l(a,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseInput
      input-id="withslot"
      :key="'input_' + key"
      v-model="input"
      :invalid="invalid"
      :disabled="disabled"
      :required="true"
      :isActive="inputActive || dropdownActive"
      :clearable="clearable"
      :use-form-field-styling="useFormFieldStyling"
      :show-input-border="showInputBorder"
      :show-label="showLabel"
      :show-error-icon="showErrorIcon"
      :input-type="type.value"
      :loadable="true"
      :decimals="decimals"
      :decimal-separator="language.value === 'de' ? ',' : '.'"
      :min="min"
      :max="max"
      :min-length="minLength"
      :max-length="maxLength"
      :is-loading="isLoading"
      error-message="Your field is invalid"
      label="This label says Specify any text below"
      placeholder="A custom placeholder"
      @click-input-field="inputActive = true"
      @clicked-outside="inputActive = false"
    >
      <template #label-addition>
        <div>label-addition</div>
      </template>
      <template #pre-input-field>
        <div class="pre-input-field">pre-input-field</div>
      </template>
      <template #input-field-addition-before>
        <span class="input-field-addition-before"
          >input-field-addition-before</span
        >
      </template>
      <template #input-field-inline-before>
        <span class="input-field-inline-before">input-field-inline-before</span>
      </template>
      <template #below-input>
        <div v-if="dropdownActive" class="drop-down-slot">
          Text Box Below Input - e.g. for a drop down
        </div>
      </template>
      <template #input-field-addition-after>
        <span class="input-field-addition-after">
          input-field-addition-after
        </span>
      </template>
      <template #post-input-field>
        <span class="post-input-field"> post-input-field </span>
      </template>
      <template #remove-icon>
        <BaseIcon v-if="useCustomRemoveIcon" name="clock" class="icon" />
      </template>
      <template #error-icon>
        <BaseIcon v-if="useCustomErrorIcon" name="eye" class="icon" />
      </template>
    </BaseInput>
    <div class="button-row">
      <BaseToggle
        v-model="invalid"
        label="invalid"
        name="toggle invalid"
        class="toggle"
      />
      <BaseToggle
        v-model="disabled"
        label="disabled"
        name="toggle disabled"
        class="toggle"
      />
      <BaseToggle
        v-model="dropdownActive"
        label="show drop down"
        name="toggle drop down display"
        class="toggle"
      />
      <BaseToggle
        v-model="isLoading"
        label="show loader"
        name="toggle loader"
        class="toggle"
      />
      <BaseToggle
        v-model="clearable"
        label="clearable"
        name="toggle clearable"
        class="toggle"
      />
      <BaseToggle
        v-model="showInputBorder"
        label="input border"
        name="show input border"
        class="toggle"
      />
      <BaseToggle
        v-model="useFormFieldStyling"
        label="form field styling"
        name="use standard form field styling"
        class="toggle"
      />
      <BaseToggle
        v-model="showLabel"
        label="show label"
        name="show label"
        class="toggle"
      />
      <BaseToggle
        v-model="showErrorIcon"
        label="show error icon"
        name="show error icon"
        class="toggle"
      />
      <BaseToggle
        v-model="useCustomErrorIcon"
        :disabled="invalid"
        label="custom error icon"
        name="use a custom error icon"
        class="toggle"
      />
      <BaseToggle
        v-model="useCustomRemoveIcon"
        label="custom remove icon"
        name="use a custom remove icon"
        class="toggle"
      />
    </div>
    <BaseDropDown
      v-model="type"
      :options="[
        {
          label: 'text',
          value: 'text',
        },
        {
          label: 'number',
          value: 'number',
        },
        {
          label: 'password',
          value: 'password',
        },
        {
          label: 'email',
          value: 'email',
        },
        {
          label: 'url',
          value: 'url',
        },
      ]"
      :show-label="true"
      label="Field type"
    />

    <template v-if="type.value !== 'number'">
      <div class="row">
        <BaseInput
          v-model="minLength"
          label="min-length"
          fieldType="number"
          placeholder="Number of minimal characters"
          :min="0"
          class="row__element"
          @update:model-value="updateComponent($event, 'minLength')"
        />
        <BaseInput
          v-model="maxLength"
          label="max-length"
          fieldType="number"
          placeholder="Number of maximal characters"
          :min="1"
          class="row__element"
          @update:model-value="updateComponent($event, 'maxLength')"
        />
      </div>
    </template>
    <template v-if="type.value === 'number'">
      <div class="row">
        <BaseInput
          v-model="decimals"
          label="Decimals"
          fieldType="number"
          placeholder="Number of decimals"
          :min="-1"
          class="row__element"
          @update:model-value="updateComponent($event, 'decimals')"
        />
        <BaseDropDown
          v-model="language"
          :options="[
            {
              label: 'default',
              value: 'en',
            },
            {
              label: 'german',
              value: 'de',
            },
          ]"
          :show-label="true"
          label="Decimal Separator"
          class="row__element"
          @update:model-value="updateComponent"
        />
      </div>
      <div class="row">
        <BaseInput
          v-model="min"
          label="Minimal Value"
          fieldType="number"
          placeholder="Minimal Value"
          class="row__element"
          @update:model-value="updateComponent($event, 'min')"
        />
        <BaseInput
          v-model="max"
          label="Maximal Value"
          fieldType="number"
          placeholder="Maximal Value"
          class="row__element"
          @update:model-value="updateComponent($event, 'max')"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invalid: false,
      disabled: false,
      dropdownActive: false,
      inputActive: false,
      isLoading: false,
      clearable: true,
      useFormFieldStyling: true,
      showInputBorder: true,
      showLabel: true,
      showErrorIcon: true,
      useCustomRemoveIcon: false,
      useCustomErrorIcon: false,
      input: "Test input",
      type: {
        label: "text",
        value: "text",
      },
      language: {
        label: "default",
        value: "en",
      },
      decimals: 0,
      min: null,
      max: null,
      key: 0,
      minLength: null,
      maxLength: null,
    };
  },
  watch: {
    type(val, previousVal) {
      if (val.value === "number" || previousVal.value === "number") {
        this.input = null;
      }
    },
    decimals(val, previousVal) {
      if (!val && previousVal) {
        this.input = null;
      }
    },
  },
  methods: {
    updateComponent(value, key) {
      this.key += 1;
      if (key && [null, undefined, ""].includes(value)) {
        this[key] = null;
      }
    },
  },
};
<\/script>
<style>
.input-field-addition-before {
  margin-right: 16px;
  background-color: lightblue;
}

.input-field-inline-before {
  background: darkseagreen;
}

.input-field-addition-after {
  background: violet;
}

.pre-input-field {
  background: rosybrown;
  align-self: center;
  flex: 1 1 25%;
}

.post-input-field {
  background: lightgoldenrodyellow;
  align-self: center;
  margin-left: 8px;
}

.drop-down-slot {
  width: 100%;
  height: 48px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.icon {
  height: 32px;
  width: 32px;
  padding: 8px;
}

.button-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 16px;
}

.toggle {
  margin-right: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.row__element {
  width: calc(50% - 8px);
}
</style>
`,requires:{}})])}const w=o(u,[["render",p]]);export{v as __pageData,w as default};
