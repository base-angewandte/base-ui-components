## Demo

Examples on BaseDropButton usage

1) Have a buttons array and specify the primaryButton as string only
2) Have buttons array and primary button as object as well
3) Have objects with custom properties for button text and identifier
4) Have buttons array and primary button as object without the primary button being included in the buttons array
5) don't specify a primary button (first item in buttons array will be used)
6) don't specify a buttons array, which means button will appear like a regular base button (also possible: a buttons array with only one option that is also the primary option)
7) like example 1 but switch primary button from outside

```vue live

<template>
  <div class="flex">
    <BaseDropButton
      :buttons="buttons1"
      expand-button-label="Show more actions"
      primary-button="delete"
      @clicked="alert" />
    <BaseDropButton
      :buttons="buttons2"
      :primary-button="primary2"
      expand-button-label="Show more actions"
      @clicked="alert" />
    <BaseDropButton
      :buttons="buttons3"
      :primary-button="primary3"
      label-property-name="text"
      identifier-property-name="value"
      expand-button-label="Show more actions"
      @clicked="alert" />
    <BaseDropButton
      :buttons="buttons4"
      :primary-button="primary4"
      expand-button-label="Show more actions"
      @clicked="alert" />
    <BaseDropButton
      :buttons="buttons5"
      expand-button-label="Show more actions"
      @clicked="alert" />
    <BaseDropButton
      :primary-button="primary6"
      :buttons="[primary6]"
      expand-button-label="Show more actions"
      @clicked="alert" />
    <BaseDropButton
      :buttons="buttons7"
      :primary-button="primary7"
      expand-button-label="Show more actions"
      @clicked="alert" />
    <BaseButton
      text="Switch primary button 7"
      icon="sort"
      expand-button-label="Show more actions"
      @clicked="primary7 = primary7 === 'delete' ? 'print' : 'delete' "/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      buttons1: [{
        label: 'Delete 1',
        action: 'delete',
        icon: 'waste-bin',
      }, {
        label: 'Print',
        action: 'print',
        icon: 'print',
      }, {
        label: 'Archive',
        action: 'archive',
        icon: 'archive-sheets',
      }],
      primary2: {
        label: 'Delete 2',
        action: 'delete',
        icon: 'waste-bin',
      },
      buttons2: [{
        label: 'Delete',
        action: 'delete',
        icon: 'waste-bin',
      }, {
        label: 'Print',
        action: 'print',
        icon: 'print',
      }, {
        label: 'Archive',
        action: 'archive',
        icon: 'archive-sheets',
      }],
      primary3: {
        text: 'Delete 3',
        value: 'delete',
        icon: 'waste-bin',
      },
      buttons3: [{
        text: 'Delete',
        value: 'delete',
        icon: 'waste-bin',
      }, {
        text: 'Print',
        value: 'print',
        icon: 'print',
      }, {
        text: 'Archive',
        value: 'archive',
        icon: 'archive-sheets',
      }],
      buttons4: [{
        label: 'Print',
        action: 'print',
        icon: 'print',
      }, {
        label: 'Archive',
        action: 'archive',
        icon: 'archive-sheets',
      }],
      primary4: {
        label: 'Delete 4',
        action: 'delete',
        icon: 'waste-bin',
      },
      buttons5: [{
        label: 'Delete 5',
        action: 'delete',
        icon: 'waste-bin',
      }, {
        label: 'Print',
        action: 'print',
        icon: 'print',
      }, {
        label: 'Archive',
        action: 'archive',
        icon: 'archive-sheets',
      }],
      primary6: {
        label: 'Delete 6',
        action: 'delete',
        icon: 'waste-bin',
      },
      primary7: 'delete',
      buttons7: [{
        label: 'Delete 7',
        action: 'delete',
        icon: 'waste-bin',
      }, {
        label: 'Print 7',
        action: 'print',
        icon: 'print',
      }, {
        label: 'Archive 7',
        action: 'archive',
        icon: 'archive-sheets',
      }],
    };
  },
  methods: {
    alert(action) {
      alert(`Button with action ${action} was clicked!`);
    }
  }
};
</script>

<style>
.flex {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
```
