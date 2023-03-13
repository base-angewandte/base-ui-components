## 2.0.6 (2023-03-07)


### Added

* **[BaseForm](https://base-angewandte.github.io/base-ui-components/#baseform), [BaseFormFieldCreator](https://base-angewandte.github.io/base-ui-components/#baseformfieldcreator):** handle new x-attributes for input fields , closes #2246
* **[BaseInput](https://base-angewandte.github.io/base-ui-components/#baseinput):** add/handle new properties for input fields type text/number , closes #2244
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/#baseform):** adding optional header element settable by new `x-attrs` field `form_group_title` and new prop `renderHeaderAs` , closes #2238
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/#baseform):** allow to set fieldProps per actual input field for repeatable fields , closes #1978
* **[BaseFormGroup](https://base-angewandte.github.io/base-ui-components/#baseformgroup):** new wrapper component for [BaseForm](#baseform) added , closes #2238


### Removed

* **[BaseDatePanel](https://base-angewandte.github.io/base-ui-components/#basedatepanel):** hide component due to accessibility issues


### Fixed

* **[BaseBoxTooltip](https://base-angewandte.github.io/base-ui-components/#baseboxtooltip):** also change icon color on focus and active
* **[BaseCarousel](https://base-angewandte.github.io/base-ui-components/#basecarousel):** error if href missing in carousel list item , closes #1630
* **[BaseCheckmark](https://base-angewandte.github.io/base-ui-components/#basecheckmark):** previous changes due to eslint errors now implemented correctly
* **[BaseDateInput](https://base-angewandte.github.io/base-ui-components/#basedateinput):** remove keyboard event again added due to linter error
* **[BaseDropDown](https://base-angewandte.github.io/base-ui-components/#basedropdown):** improve accessibility and existing problems with it
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/#baseform):** fix input field slot implementation , closes #1978
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/#baseform):** truly center plus icon of repeatable fields
* **[BaseFormGroups](https://base-angewandte.github.io/base-ui-components/#baseformgroups):** add missing index.js file for build , closes #2238
* **[BaseHlsVideo](https://base-angewandte.github.io/base-ui-components/#basehlsvideo), [BaseMediaCarousel](https://base-angewandte.github.io/base-ui-components/#basemediacarousel):** accessibility improvements based on vuejs-accessibility
* **[BaseInput](https://base-angewandte.github.io/base-ui-components/#baseinput), [BaseChipsInput](https://base-angewandte.github.io/base-ui-components/#basechipsinput), [ BaseMapLocations](https://base-angewandte.github.io/base-ui-components/# basemaplocations):** improve and fix accessibility changes
* **[BaseSwitchButton](https://base-angewandte.github.io/base-ui-components/#baseswitchbutton):** fixing label input linting error


## 2.0.5 (2023-01-12)


### Added

* **[BaseToggle](https://base-angewandte.github.io/base-ui-components/components/BaseToggle)**: add prop id and internal id.
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm) / [BaseFormFieldCreator](https://base-angewandte.github.io/base-ui-components/components/BaseFormFieldCreator)**: expand prop fieldProps to take (nearly) all input component props.
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm) / [BaseFormFieldCreator](https://base-angewandte.github.io/base-ui-components/components/BaseFormFieldCreator)**: add input field slots to make BaseForm customizable + minor styling changes.
* Add automated changelog creation (via [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)) and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) set up.
* Improve documentation for [BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm) and [build setup](docs/development/Readme.md).

### Fixed

* **[BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm):** remove button missing for repeatable fields.
* **[BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm)**: prioritize fieldProps set label over automated extraction from swagger json title attribute.
* **[BaseMenuList](https://base-angewandte.github.io/base-ui-components/components/BaseMenuList):** error on drag if list items without icon.
* [Styleguide](https://base-angewandte.github.io/base-ui-components/) is missing icons.


## 2.0.4 (2022-10-31)

### Features
* [BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm): add compact view for field-groups.

### Improvements
* [BaseProgressBar](https://base-angewandte.github.io/base-ui-components/components/BaseProgressBar): display error message below progress bar.
* Decrease size of x in remove.svg to remove visual effect of it appearing larger than other icons.

### Bugfixes
* Fixing base-ui-icons path for styleguide on github pages.

## 2.0.3 (2022-10-06)

### Features
* [BaseCarousel](https://base-angewandte.github.io/base-ui-components/components/BaseCarousel): add 'clicked' event to be able to manually trigger action on box click.

### Improvements
* [BaseCarousel](https://base-angewandte.github.io/base-ui-components/components/BaseCarousel): improve documentation, removing unnecessary properties from example data.

### Bugfixes
* [BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm): wrong default object for fieldProps, boolean field needs default value, improve adding of fieldProps to field properties.
* [BaseChipsBelow](https://base-angewandte.github.io/base-ui-components/components/BaseChipsBelow): remove leftover test code.
* [BaseInput](https://base-angewandte.github.io/base-ui-components/components/BaseInput) / [BaseSearch](https://base-angewandte.github.io/base-ui-components/components/BaseSearch): prevent scaling of X remove icon.


## 2.0.2 (2022-09-28)

### Bugfixes
* [BaseChipsInputField](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInputField): chips should not retain id (and therefore background color) after being edited.
* Fixing styleguide build linting issues.
* [BaseMenuList](https://base-angewandte.github.io/base-ui-components/components/BaseMenuList): drag image not displayed in Chrome.
* [BaseChipsBelow](https://base-angewandte.github.io/base-ui-components/components/BaseChipsBelow): Drag & Drop sorting broken in Firefox.

## 2.0.1 (2022-09-21)

### Improvements

* Adding version number of base components to styleguide

### Bugfixes
* [BaseAdvancedSearch](https://base-angewandte.github.io/base-ui-components/components/BaseAdvancedSearch):
  * Filter row in mobile view not displayed correctly due to changes in [BaseIcon](https://base-angewandte.github.io/base-ui-components/components/BaseIcon).
  * Fixed controlled Vocabulary options row styling issues.

## 2.0.0 (2022-09-14)

### Breaking Changes
* Icons are now exchangeable and are loaded from a svg-sprite. A default sprite is shipped with the components, however the file `base-ui-icons.svg` (or a custom sprite with the icons that are used in your project, named like the icons listed in
[BaseIcon](https://base-angewandte.github.io/base-ui-components/components/BaseIcon)) must explicitly be copied to the front-end project `public` or `static` (NuxtJS) folder in order for icons to be displayed.<br>
 Also some icons were renamed:
  * `sheet-empty` --> `file-object`
  * `sheet-plus` --> `add-new-object`
* Removed deprecated component `BaseUploadBar`, please use improved component [BaseProgessBar](https://base-angewandte.github.io/base-ui-components/components/BaseProgessBar) instead.
* [BaseResultBoxSection](https://base-angewandte.github.io/base-ui-components/components/BaseResultBoxSection): functionality was heavily refactored, including new dragging functionality and hiding options behind an 'Edit' button.<br>
  * Removed props because obsolete due to functionality changes: `optionButtonText`, `actionButtonText`, `cancelText`, `action`<br>
  * Also `events` were added, removed or renamed in the process, except for `submit-action`<br>
  * Button text and icon for activating/closing edit mode can be configured with `optionsButtonText` and `optionsButtonIcon`, respectively
  * Option buttons are now configurable via `actionButtonsConfig`, so if standard button elements should be used this can be used instead of the `option-buttons` slot.
  * Edit mode can be set from outside with boolean `editMode`, as can `draggable`.
  * `entryList` can now be handled via `v-model`
  * `showActionButtonBox` --> `showActionButtonBoxes`: since not one single action is active at the time but all actions may be triggered, so all buttons should be shown
  * The `.sync` modifier may now be used on `selectedList`.
  * `entryType` used for getting the `i18n` string was removed and the 'Select All/None' text needs to be set via `selectOptionsText`.
  * `usePagination` and `useExpandMode` as distinct props instead of determining pagination use and expand mode use via `maxRows` and `maxShowMoreRows` value set, respectively.
  * Slots were renamed from kebab-case to camel-case.
* [BaseOptions](https://base-angewandte.github.io/base-ui-components/components/BaseOptions): was also quite heavily refactored:
  * Boolean prop `alwaysShowOptionsButton` was removed and replaced with `useOptionsButtonOn` with the available options 'always', 'never' and 'mobile'.
  * `showAfterOptionsInline` was removed and replaced by `showAfterOptionsBelow`, thereby reversing the setting and making the display of slot `afterOptions` below the default behaviour.
  * `buttonText` was renamed to `optionsButtonText` to clarify purpose and now takes an array of object instead of a string with separate options for options hidden and options visible state.
  * Options displayed can now be configured via prop `optionsConfig` if slot is not used.
  * Options button icon is also configurable via `optionsButtonIcon`, taking an object with separate values for options visible and options hidden state.
  * Event `options-toggle` was renamed to `update:show-options` to emit to parent when options button is triggered. Can now be used with the `.sync` modifier.
  * New event `option-triggered` emits an event to the parent when an option button set via `optionsConfig` is triggered with the `optionsConfig` object in question provided as event value.
* [BaseExpandRow](https://base-angewandte.github.io/base-ui-components/components/BaseExpandRow):
  * Prop `label` --> `title`.
  * Removed default string 'Label' for prop `title` (former `label`).
* [BaseBox](https://base-angewandte.github.io/base-ui-components/components/BaseBox): improve prop naming `boxType` --> `renderElementAs`.
* [BaseMap](https://base-angewandte.github.io/base-ui-components/components/BaseMap): added support for multiple locations. `latLong` prop is now an array and was renamed to `marker`. Also numerous new props were added for improved configurability.
* [BaseAutocompleteInput](https://base-angewandte.github.io/base-ui-components/components/BaseAutocompleteInput): the component was refactored to reuse existing components like [BaseInput](https://base-angewandte.github.io/base-ui-components/components/BaseInput) and [BaseDropDownList](https://base-angewandte.github.io/base-ui-components/components/BaseDropDownList) and to unify events and slots with other input components.
  * Event `selected` was renamed to `fetch-drop-down-entries`.
  * Event `autocomplete` was renamed to `input`.
  * As for other components props `identifierPropertyName` and `labelPropertyName` are replacing `objectProp`.
  * Many additional props to improve usage and unify with other input elements.
* The `props` `objectProp` and `identifier` used to specify the relevant
properties in a passed object were replaced and unified across all components with `labelPropertyName` or `valuePropertyName` (depending on how the value is used) and
`identifierPropertyName` respectively.
* [BaseMultilineTextInput](https://base-angewandte.github.io/base-ui-components/components/BaseMultilineTextInput):
  * No `default` slot anymore but unification with other input components (see Features).
  * Event `text-input` removed and using `input` instead to unify with other input components.
* [BaseImageBox](https://base-angewandte.github.io/base-ui-components/components/BaseImageBox): `boxSize` default values changed to `auto`.
* [BaseChipsBelow](https://base-angewandte.github.io/base-ui-components/components/BaseChipsBelow):
  * Up to now the data property `roles` was hardcoded in the component - now all references to `roles` was removed and prop `additionalPropertyName` now allows a custom property to be chosen as value for the additional chips input field.
  * Also props `roleOptions` and `rolesPlaceholder` were renamed to
  `additionalPropOptions` and `additionalPropPlaceholder` respectively.
  * Event `list-change` was renamed to `selected-changed` to harmonize it with other chips input components.
  * `valuePropertyName` was renamed to `labelPropertyName` to better reflect the use of the variable.
  * `identifierPropertyName` and `labelPropertyName` (former `valuePropertyName`) default string value was changed from emtpy string to 'id' and 'label' respectively.
* [BaseMenuList](https://base-angewandte.github.io/base-ui-components/components/BaseMenuList): rename misleading prop name `selected` to `selectActive`.
* [BaseChipsInput](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInput):
  * Removed events `show-drop-down` and `hide-drop-down`.
  * Remove prop `chipsInline` that was replaced by `displayChipsInline` to clarify purpose previously.
  * Event `selected` was renamed to `selected-changed`.
* [BaseDropDownList](https://base-angewandte.github.io/base-ui-components/components/BaseDropDownList): remove default text string 'No options available' for prop `dropDownNoOptionsInfo`.
* Numerous internal CSS classes were renamed to fit the general naming structure. This should not be of any concern if you are just using the components in your project but in case you are targeting any of these classes directly, things might break.
### Features and Improvements

* New components:
  * [BaseAdvancedSearch](https://base-angewandte.github.io/base-ui-components/components/BaseAdvancedSearch): a component to allow for all kind of searches, fulltext, controlled vocabulary, autocomplete, dates with the help of filters.
  * [BaseEntrySelector](https://base-angewandte.github.io/base-ui-components/components/BaseEntrySelector): A component to select options from a list, including search, options and pagination elements.
  * [BaseMapLocations](https://base-angewandte.github.io/base-ui-components/components/BaseMapLocations): a component using [BaseMap](https://base-angewandte.github.io/base-ui-components/components/BaseMap) for displaying locations on a map, a list of addresses and allows for interactions between both.
  * [BaseExpandList](https://base-angewandte.github.io/base-ui-components/components/BaseExpandList): render a list in with sublists in expandable containers.
  * [BaseEditControl](https://base-angewandte.github.io/base-ui-components/components/BaseEditControl): header with control buttons for edit mode functionality.
  * [BaseImage](https://base-angewandte.github.io/base-ui-components/components/BaseImage): component to render an image and optional lazy loading.
  * [BaseMediaCarousel](https://base-angewandte.github.io/base-ui-components/components/BaseMediaCarousel): Component allowing sliding through images, audio, video (currently only hls format) and files.
  * [BaseLink](https://base-angewandte.github.io/base-ui-components/components/BaseLink): component to render different kind of links.
  * [BaseToolTip](https://base-angewandte.github.io/base-ui-components/components/BaseToolTip): a tooltip box.
  * [BaseUploadPopUp](https://base-angewandte.github.io/base-ui-components/components/BaseUploadPopUp): pop up component for upload functionality.
* All form input components (e.g. [BaseInput](https://base-angewandte.github.io/base-ui-components/components/BaseInput)) received additional `props` for handling errors/invalid input and disabled state:
`disabled`, `invalid`, `errorMessage`, `showErrorIcon`, `clearable`. These properties can also be conveyed via [BaseFormFieldCreator](https://base-angewandte.github.io/base-ui-components/components/BaseFormFieldCreator) and [BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm) respectively,
either directly for all input fields (`clearable`, `showErrorIcon`) or for individual fields via `fieldProps` (`required`, `invalid`, `errorMessage`).
* Form input components received `slots` for additional customization possibilities: `label-addition`, `pre-input-field`, `input-field-addition-before`, `input-field-inline-before`, `input-field-addition-after`, `post-input-field`, `error-icon`, `remove-icon`, `below-input`.<br>
  For a demonstration see [BaseChipsInputField](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInputField).
* [BaseDropDownList](https://base-angewandte.github.io/base-ui-components/components/BaseDropDownList): add `prop` `hasSubOptions` to allow for nested lists.
* [BaseSearch](https://base-angewandte.github.io/base-ui-components/components/BaseSearch):
  * Make input element exchangeable with prop `type` which takes the values `text`, `date`, `daterange`, `chips` and `controlled`. This also comes with number of new props (e.g. `labelPropertyName`, `identifierPropertyName`, `isLoading`).
  * Add `language` prop to be able to pass it through to nested components.
* [BaseDateInput](https://base-angewandte.github.io/base-ui-components/components/BaseDateInput): new prop `useFormFieldStyling` (default: `true`) to make form field styling optional.
* [BaseResultBoxSection](https://base-angewandte.github.io/base-ui-components/components/BaseResultBoxSection):
  * Add 'Show More'/'Show less' boxes functionality.
  * Added props `usePaginationLinkElement` to be able to use framework specific link elements
  and `editModeWhiteBackground` to have a white background in edit mode.
* [BaseChipsInputField](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInputField): new slot `chip` to allow for custom chips.
* [BaseChipsInputField](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInputField) / [BaseChipsInput](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInput):
new prop `chipsEditable` to allow chips to be edited. (CAVEAT: if this prop is set `true` chips can not be `draggable` and info box pop up can not be used anymore).
* [BaseIcon](https://base-angewandte.github.io/base-ui-components/components/BaseIcon): new icons in default icon library (e.g. 'share', 'archive-*', 'subscribe').
* New SCSS variables `--app-color-secondary` and `--keyboard-active-color`.
* [BaseMenuList](https://base-angewandte.github.io/base-ui-components/components/BaseMenuList) / [BaseMenuEntry](https://base-angewandte.github.io/base-ui-components/components/BaseMenuEntry):
  * New slot `thumbnails` for custom and in number unlimited icon choices.
  * Add new prop `disabled` to show single entries disabled.
* [BaseExpandBox](https://base-angewandte.github.io/base-ui-components/components/BaseExpandBox): extended props, events and slots for improved usability.
* Lazy loading of images in [BaseCarousel](https://base-angewandte.github.io/base-ui-components/components/BaseCarousel) and [BaseResultBoxSection](https://base-angewandte.github.io/base-ui-components/components/BaseResultBoxSection) and optional in [BaseImageBox](https://base-angewandte.github.io/base-ui-components/components/BaseImageBox).
* [BaseButton](https://base-angewandte.github.io/base-ui-components/components/BaseButton):
  * New option for `iconPosition`: `top`.
  * Improve visibility of disabled secondary button.
  * Allow for button text to be optional and add `text` slot for improved customization.
  * Option to set the `svg` `title` attribute with prop `iconTitle`.
* [BaseInput](https://base-angewandte.github.io/base-ui-components/components/BaseInput):
  * New input types available: `password`, `email`, `url`.
  * New slot `input` to provide a custom input element.
  * Additional prop `inputClass` to ease custom input field styling.
  * New prop `loadable` to reserve space for loader of components based on this component.
* [BaseToggle](https://base-angewandte.github.io/base-ui-components/components/BaseToggle):
  * Adding a `disabled` state, settable via prop.
  * Prop `hideLabel` to hide the toggle label.
  * New slot (`default`) to add elements below the toggle and added prop `bindSlotToState` to only show slot
  content if component is in checked state.
* [BaseMap](https://base-angewandte.github.io/base-ui-components/components/BaseMap): add support for TMS, WMS services, can be specified via prop `tileLayerService`.
* [BaseImageBox](https://base-angewandte.github.io/base-ui-components/components/BaseImageBox):
  * Add props for adding icons visible if no text (`icon`) or if on hover if medium is playable (audio, video) (`playIcon`).
  * Add prop `iconSize`.
  * Add option to only display title on hover (prop `showTitleOnHover`).
  * Additional slots `footer` and `footerLeft` to add additional elements like icons.
  * Add props `renderElementAs` and `linkTo` in order to use framework specific link elements.
  * Have `title` covering two lines if there is no subtitle.
  * Add prop `draggable` to improve styling when elements are draggable.
* [BaseBox](https://base-angewandte.github.io/base-ui-components/components/BaseBox):
  * Additional prop `boxShadowSize` with values `small` or `large` to increase shadow when used it edit mode in different components.
  * Added prop `additionalAttributes` to be able to add additional element HTML attributes.
* [BaseTextList](https://base-angewandte.github.io/base-ui-components/components/BaseTextList): several additional props to improve customizability and added functionality:
  * Display can be rendered in 2 columns.
  * Value - label pairs can be displayed vertically or horizontally (`listType`).
  * Prop `renderLinkAs` to specify if a specialized framework element should be used.
  * Improved ability to display different kind of links or tooltips (see also [BaseLink](https://base-angewandte.github.io/base-ui-components/components/BaseLink) and [BaseToolTip](https://base-angewandte.github.io/base-ui-components/components/BaseToolTip)).
  * Slot `tooltip` to add tooltip content.
  * Improved documentation on how data is rendered based on data structure.
  * Also allow the `data` property in the data structure rendered as `<dt>` element to be a single object instead of an array.
  * `label` property of the `data` prop can now be a string or an object with ISO 639-1 strings as object properties (e.g. { en: 'x', de: 'y' }).
* [BasePagination](https://base-angewandte.github.io/base-ui-components/components/BasePagination):
  * Additional prop `useLinkElement` to specify a framework specific element that should be used.
  * Switch from window `resize` event listener to `ResizeObserver` to calculate correct number of displayed numbers.
* [BaseCarousel](https://base-angewandte.github.io/base-ui-components/components/BaseCarousel):
  * Add prop `renderLinkElementAs` and use framework specific link elements instead of native link element.
  * Emit an event `initialized` as soon as [swiper](https://swiperjs.com) is initialized.
* [BaseExpandRow](https://base-angewandte.github.io/base-ui-components/components/BaseExpandRow): additional props added for improved usability and new functionality like selectability.
* [BaseForm](https://base-angewandte.github.io/base-ui-components/components/BaseForm) / [BaseFormFieldCreator](https://base-angewandte.github.io/base-ui-components/components/BaseFormFieldCreator): adding [BaseToggle](https://base-angewandte.github.io/base-ui-components/components/BaseToggle) to `fieldType` options (`boolean`).
* [BaseFormFieldCreator](https://base-angewandte.github.io/base-ui-components/components/BaseFormFieldCreator): adding slot content to [BaseToggle](https://base-angewandte.github.io/base-ui-components/components/BaseToggle) based on `x-attrs` property `subtext`, which will display an URL link when toggle is `true`.
* [BaseSelectOptions](https://base-angewandte.github.io/base-ui-components/components/BaseSelectOptions):
  * Additional props `reverse` to show relevant elements in reverse order
  and `selectAllDisabled` to disable the 'Select All' button.
  * Add hover/focus state to select all/none button.
* [BasePopUp](https://base-angewandte.github.io/base-ui-components/components/BasePopUp):
  * Add prop `buttonRightDisabled` to be able to disable the e.g. save button.
  * Prop `fullscreenOnMobile` to render component fullscreen on mobile.
* [BaseLoader](https://base-angewandte.github.io/base-ui-components/components/BaseLoader): adding prop `hide` to hide the actual loader element.
* [BaseHlsVideo](https://base-angewandte.github.io/base-ui-components/components/BaseHlsVideo): adding prop `startLevel` to define initial video size.
* [BaseChipsBelow](https://base-angewandte.github.io/base-ui-components/components/BaseChipsBelow): additional prop `addNewChipText` to have same functionality as  in [BaseChipsInput](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInput) available.
* Added lazy loading of components when they are only used conditionally.
* Updated dependencies and refactored sass incompatible division operator.
* Make `package.json` `npm run` commands using shell scripts executable on windows.
* Adding deprecation notice to [BaseMediaPreview](https://base-angewandte.github.io/base-ui-components/components/BaseMediaPreview).
* Use `KeyboardEvent` `key` property instead of `code` in all relevant components.
* Remove leftover `KeyboardEvent` `keyCode` property used in [BaseAutocompleteInput](https://base-angewandte.github.io/base-ui-components/components/BaseAutocompleteInput) and [BasePagination](https://base-angewandte.github.io/base-ui-components/components/BasePagination) since
  this is [deprecated](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode).
* Accessibility related improvements:
  * [BaseResultBoxSection](https://base-angewandte.github.io/base-ui-components/components/BaseResultBoxSection): make drag functionality accessible and improve screen reader text
  * For all form input components the boolean prop `required` was added used in `aria-required`.
  * [BaseDateInput](https://base-angewandte.github.io/base-ui-components/components/BaseDateInput): use custom input element to be able to add aria related attributes.


### Bug Fixes

* [BaseCarousel](https://base-angewandte.github.io/base-ui-components/components/BaseCarousel):
  * Show pagination only when needed.
  * Add subtext array handling.
  * Update [swiper](https://swiperjs.com) component when data change.
* [BaseTextList](https://base-angewandte.github.io/base-ui-components/components/BaseTextList): minor styling adaptions.
* [BaseDateInput](https://base-angewandte.github.io/base-ui-components/components/BaseDateInput): add fadeout.
* [BaseChipsInput](https://base-angewandte.github.io/base-ui-components/components/BaseChipsInput): make single select arrow clickable to open/close drop down
* [BasePagination](https://base-angewandte.github.io/base-ui-components/components/BasePagination): upgrade to Vue 2.6.13 which solves warning with `.native` modifier and revert changes made due to this issue.
* [BaseResultBoxSection](https://base-angewandte.github.io/base-ui-components/components/BaseResultBoxSection): fix incorrect margin between entries in ssr-mode.
* [BasePopUp](https://base-angewandte.github.io/base-ui-components/components/BasePopUp): optimize for mobile view.
* [BaseCheckMark](https://base-angewandte.github.io/base-ui-components/components/BaseCheckMark): fix radio button functionality and styling.
* [BaseImageBox](https://base-angewandte.github.io/base-ui-components/components/BaseImageBox): text-only, multiple line text breaks oddly (Safari 15.4).
* [BaseDateInput](https://base-angewandte.github.io/base-ui-components/components/BaseDateInput) / [BaseDatePanel](https://base-angewandte.github.io/base-ui-components/components/BaseDatePanel): fix missing picker localization.
* [BaseDropDownList](https://base-angewandte.github.io/base-ui-components/components/BaseDropDownList): fix styling of no options slot.
* [BaseChipsBelow](https://base-angewandte.github.io/base-ui-components/components/BaseChipsBelow): dragging only working once on Safari.
