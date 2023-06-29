## Demo

A simple chips input form field with chips displayed below
and default (base project specific) role selection

```vue live
<template>
  <div class="container">
    <BaseChipsBelow
      v-model="selectedList"
      :chips-editable="true"
      :list="[
          {
            id: 'Herbert Marcuse',
            label: 'Herbert Marcuse',
          },
          {
            id: 'Erich From',
            label: 'Erich From',
          },
          {
            id: 'Georg Weerth',
            label: 'Georg Weerth',
          }
      ]"
      :additional-prop-options="[
        {
          label: 'Actor',
        },
        {
          label: 'Magician',
        },
        {
          label: 'Priest',
        },
        {
          label: 'Farmer',
        }]"
      label="Select a Person">
      <template
        #drop-down-entry="{ item }">
        {{ item.label }}
      </template>
    </BaseChipsBelow>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedList: [],
    };
  },
};
</script>

```

## Demo with optional validation

A chips input form field with chips displayed below and optional validation

```vue live
<template>
  <div style="background-color: rgb(240, 240, 240); padding: 16px;">
    <div class="controls">
      <BaseToggle
        v-model="required"
        label="at least one person is required"
        class="control" />
      <BaseToggle
        v-model="additionalPropRequired"
        label="additional option is required"
        class="control" />
      <BaseToggle
        v-model="additionalPropAllowMultipleEntries"
        label="allow multiple additional options"
        class="control" />
      <BaseToggle
        v-model="prefill"
        label="set default additional options"
        class="control" />
      <BaseToggle
        v-model="sortable"
        label="sort entries"
        class="control" />
    </div>
    <div
      style="background-color: #fff; padding: 16px;">
      <BaseChipsBelow
        ref="baseChipsBelow"
        v-model="selectedList"
        :list="list"
        :draggable="false"
        :sortable="sortable"
        :required="required"
        :show-error-icon="true"
        :additional-prop-allow-multiple-entries="additionalPropAllowMultipleEntries"
        :additional-prop-options="additionalPropOptions"
        :additional-prop-required="additionalPropRequired"
        additional-prop-placeholder="Select Role"
        label="Invite persons to edit"
        placeholder="Select persons">
        <template
          #drop-down-entry="{ item }">
          {{ item.label }}
        </template>
      </BaseChipsBelow>
    </div>
    <template
      v-if="required || additionalPropRequired">
      <BaseButton
        button-style="row"
        style="margin: 8px 0;"
        text="Validate"
        @clicked="validate(null)" />
      <div>
        Errors: {{ isValid }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // settable options
      additionalPropAllowMultipleEntries: false,
      required: true,
      additionalPropRequired: false,
      sortable: false,
      prefill: false,
      // data
      additionalPropOptions: [
        {
          label: 'Read',
        },
        {
          label: 'Edit',
        },
      ],
      isValid: 'not validated yet.',
      // Note: set optional default role value(s)
      list: [
        {
          id: 'Herbert Marcuse',
          label: 'Herbert Marcuse',
          // roles: [{ label: 'Read' }],
        },
        {
          id: 'Erich From',
          label: 'Erich From',
          // roles: [{ label: 'Read' }],
        },
        {
          id: 'Georg Weerth',
          label: 'Georg Weerth',
          // roles: [{ label: 'Read' }],
        },
      ],
      selectedList: [
        // prefill list
        // {
        //   id: 'Florian Bettel',
        //   label: 'Florian Bettel',
        //   roles: [{ label: 'Edit' }],
        // },
      ],
    };
  },
  watch: {
    prefill(val) {
      let roles = [];
      if (val) {
        roles = [{ label: 'Read' }];
      }
      this.list = this.list.map(item => ({ ...item, roles }));
    },
  },
  methods: {
    /**
     * validate component from outside
     */
    validate() {
      this.isValid = !this.$refs.baseChipsBelow.validate();
    },
  },
};
</script>

<style>
.base-input .base-input__label-row .base-input__label {
  font-weight: bold;
  color: #000000 !important;
}

.controls {
  margin-bottom: 8px;
}
</style>
```
