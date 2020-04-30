A simple example with options button

```vue
<template>
  <BaseOptions
    :always-show-options-button="true"
    :show-options="optionsToggle"
    @options-toggle="optionsToggle = $event" >
    <template
        v-slot:options>
        <BaseButton
        :text="'this button was added via options slot'"
        :has-background-color="false"
        icon-size="large"
        icon="eye"
        button-style="single" />
    </template>
  </BaseOptions>
</template>

<script>
export default {
  data() {
    return {
      optionsToggle: false,
    } ;
  },
};
</script>
```

An example with before and after options with after options not inline

```vue
<template>
  <BaseOptions
    :always-show-options-button="true"
    :show-options="optionsToggle"
    :show-after-options-inline="false"
    align-options="left"
    @options-toggle="optionsToggle = $event" >
    <template v-slot:beforeOptions>
      <div>beforeOptions slot</div>
    </template>
    <template
        v-slot:options>
        <BaseButton
        :text="'this button was added via options slot'"
        :has-background-color="false"
        icon-size="large"
        icon="eye"
        button-style="single" />
    </template>
    <template v-slot:afterOptions>
      <div>afterOptions slot</div>
    </template>
  </BaseOptions>
</template>

<script>
export default {
  data() {
    return {
      optionsToggle: false,
    } ;
  },
};
</script>
```








An example with inline after options slot

```vue
<template>
        <BaseOptions
          :always-show-options-button="true"
          :show-options="showCheckbox"
          :show-after-options-inline="true"
          align-options="left"
          @options-toggle="showCheckbox = $event">
          <template v-slot:afterOptions>
            <div
              ref="afterOptions"
              class="sidebar-drop-downs">
              <BaseDropDown
                v-model="sortParam"
                :placeholder="'Sort By'"
                :label="'Sort by'"
                :options="sortOptions"
                :with-spacing="false"
                class="sidebar-dropdown" />
              <BaseDropDown
                v-model="filterType"
                :label="'filter by type'"
                :options="entryTypes"
                :language="'en'"
                :with-spacing="false"
                value-prop="source"
                align-drop-down="right"
                class="sidebar-dropdown" />
            </div>
          </template>
          <template
            v-slot:options>
            <BaseButton
              :text="'Publish'"
              :has-background-color="false"
              icon-size="large"
              icon="eye"
              button-style="single"
              @clicked="actionAlert('publish')" />
            <BaseButton
              :text="'Take offline'"
              :has-background-color="false"
              icon-size="large"
              icon="forbidden"
              button-style="single"
              @clicked="actionAlert('offline')" />
            <BaseButton
              :text="'Duplicate'"
              :has-background-color="false"
              icon-size="large"
              icon="duplicate"
              button-style="single"
              @clicked="actionAlert('duplicate')" />
            <BaseButton
              :text="'Delete'"
              :has-background-color="false"
              icon-size="large"
              icon="waste-bin"
              button-style="single"
              @clicked="actionAlert('delete')" />
          </template>
        </BaseOptions>
</template>

<script>
export default {
  data() {
    return {
      showCheckbox: false,
      entryTypes: [
        {
          label: 'Option 1',
          id: 'Option 1',
        },
        {
          label: 'Option 2',
          id: 'Option 2',
        },
      ],
      filterType: {
        label: 'No Filter',
        id: '',
      },
      sortOptions: [
        {
          label: 'Option 1',
          id: 'Option 1',
        },
        {
          label: 'Option 2',
          id: 'Option 2',
        },
      ],
      sortParam: {
        label: 'Option 1',
        id: 'Option 1',
      },
    };
  },
  methods: {
    actionAlert(event) {
      alert(event);
    }
  },
};
</script>

<style>
  .sidebar-dropdown {
    margin: 0 16px;
  }

</style>

```
