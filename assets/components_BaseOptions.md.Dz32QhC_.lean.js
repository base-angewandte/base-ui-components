import{_ as n,a as i,b as a,o as d,aM as r,I as o,i as s}from"./chunks/framework.CJiAeuRk.js";const g=JSON.parse('{"title":"BaseOptions","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseOptions.md","filePath":"components/BaseOptions.md","lastUpdated":1679928144000}'),l={name:"components/BaseOptions.md"};function p(c,t,u,b,h,f){const e=i("vue-live");return d(),a("div",null,[t[0]||(t[0]=r("",11)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-background">
    <BaseOptions
      :key="useOptionsButtonOn"
      v-model:show-options="optionsToggle"
      :options-config="[
        {
          text: 'button added via optionsConfig',
          icon: 'eye',
          value: 'show',
        },
        {
          text: 'and a disabled button',
          icon: 'waste-bin',
          value: 'delete',
          disabled: true,
        },
      ]"
      :use-options-button-on="useOptionsButtonOn"
    >
    </BaseOptions>
    <p class="options-settings">Choose settings:</p>
    <div class="button-switches">
      <BaseButton
        :active="useOptionsButtonOn === 'always'"
        button-style="row"
        text="always"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'always'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'never'"
        button-style="row"
        text="never"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'never'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'mobile'"
        button-style="row"
        text="mobile"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'mobile'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'fitted'"
        button-style="row"
        text="fitted"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'fitted'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsToggle: false,
      useOptionsButtonOn: "always",
    };
  },
};
<\/script>

<style>
.options-background {
  background: rgb(240, 240, 240);
}
.button-switches {
  display: flex;
  flex-direction: row;
}
.button-switch {
  margin: 8px;
}
.options-settings {
  margin: 16px 0 8px 16px;
}
</style>
`,requires:{}}),t[1]||(t[1]=s("p",null,"Advanced example with all slots filled. Choose different settings for available properties below and resize to see the different effects!",-1)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-background">
    <BaseOptions
      :key="useOptionsButtonOn"
      v-model:show-options="optionsToggle"
      :use-options-button-on="useOptionsButtonOn"
      :options-hidden="optionsHidden"
      :show-after-options-below="showAfterOptionsBelow"
      :options-button-disabled="optionsButtonDisabled"
      :align-options="alignOptions"
    >
      <template #beforeOptions>
        <div :style="{ whiteSpace: 'nowrap' }">beforeOptions slot</div>
      </template>
      <template #options>
        <BaseButton
          :text="'added via slot'"
          :has-background-color="false"
          icon-size="large"
          icon="eye"
          button-style="single"
        />
        <BaseButton
          :text="'second action'"
          :has-background-color="false"
          icon-size="large"
          icon="waste-bin"
          button-style="single"
        />
      </template>
      <template #afterOptions>
        <div :style="{ whiteSpace: 'nowrap' }">afterOptions slot element</div>
      </template>
    </BaseOptions>
    <p class="options-settings">Choose settings:</p>
    <div class="button-switches">
      <BaseButton
        :active="showAfterOptionsBelow"
        button-style="row"
        text="show after options below"
        class="button-switch"
        @clicked="showAfterOptionsBelow = !showAfterOptionsBelow"
      />
      <BaseButton
        :active="alignOptions === 'left'"
        button-style="row"
        text="Align Options Left"
        class="button-switch"
        @clicked="alignOptions = 'left'"
      />
      <BaseButton
        :active="alignOptions === 'right'"
        button-style="row"
        text="Align Options Right"
        class="button-switch"
        @clicked="alignOptions = 'right'"
      />
      <BaseButton
        :active="optionsHidden"
        button-style="row"
        text="Hide Options"
        class="button-switch"
        @clicked="optionsHidden = !optionsHidden"
      />
      <BaseButton
        :active="optionsButtonDisabled"
        button-style="row"
        text="Disable Options Button"
        class="button-switch"
        @clicked="optionsButtonDisabled = !optionsButtonDisabled"
      />
    </div>
    <p class="options-settings">
      Choose setting for 'useOptionsButtonOn' prop:
    </p>
    <div class="button-switches">
      <BaseButton
        :active="useOptionsButtonOn === 'always'"
        button-style="row"
        text="always"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'always'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'never'"
        button-style="row"
        text="never"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'never'"
      />
      <BaseButton
        :active="useOptionsButtonOn === 'mobile'"
        button-style="row"
        text="mobile"
        class="button-switch"
        @clicked="useOptionsButtonOn = 'mobile'"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsToggle: false,
      optionsHidden: false,
      showAfterOptionsBelow: true,
      alignOptions: "right",
      useOptionsButtonOn: "always",
      optionsButtonDisabled: false,
    };
  },
};
<\/script>
<style>
.options-background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
.button-switches {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.button-switch {
  margin: 8px;
}
.options-settings {
  margin: 16px 0 8px 16px;
}
</style>
`,requires:{}}),t[2]||(t[2]=s("p",null,"An more real-life example with after options slot rendered below options if space runs out.",-1)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div class="options-background">
    <BaseOptions
      v-model:show-options="showCheckbox"
      :use-options-button-on="'always'"
      :show-after-options-below="true"
      align-options="left"
    >
      <template #afterOptions>
        <div ref="afterOptions" class="sidebar-drop-downs">
          <BaseDropDown
            v-model="sortParam"
            :placeholder="'Sort By'"
            :label="'Sort by'"
            :options="sortOptions"
            :with-spacing="false"
            class="sidebar-dropdown"
          />
          <BaseDropDown
            v-model="filterType"
            :label="'filter by type'"
            :options="entryTypes"
            :language="'en'"
            :with-spacing="false"
            value-prop="source"
            align-drop-down="right"
            class="sidebar-dropdown"
          />
        </div>
      </template>
      <template #options>
        <BaseButton
          :text="'Publish'"
          :has-background-color="false"
          icon-size="large"
          icon="eye"
          button-style="single"
          @clicked="actionAlert('publish')"
        />
        <BaseButton
          :text="'Take offline'"
          :has-background-color="false"
          icon-size="large"
          icon="forbidden"
          button-style="single"
          @clicked="actionAlert('offline')"
        />
        <BaseButton
          :text="'Duplicate'"
          :has-background-color="false"
          icon-size="large"
          icon="duplicate"
          button-style="single"
          @clicked="actionAlert('duplicate')"
        />
        <BaseButton
          :text="'Delete'"
          :has-background-color="false"
          icon-size="large"
          icon="waste-bin"
          button-style="single"
          @clicked="actionAlert('delete')"
        />
      </template>
    </BaseOptions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCheckbox: false,
      entryTypes: [
        {
          label: "Option 1",
          id: "Option 1",
        },
        {
          label: "Option 2",
          id: "Option 2",
        },
      ],
      filterType: {
        label: "No Filter",
        id: "",
      },
      sortOptions: [
        {
          label: "Option 1",
          id: "Option 1",
        },
        {
          label: "Option 2",
          id: "Option 2",
        },
      ],
      sortParam: {
        label: "Option 1",
        id: "Option 1",
      },
    };
  },
  methods: {
    actionAlert(event) {
      alert(event);
    },
  },
};
<\/script>

<style>
.sidebar-dropdown {
  margin: 0 16px;
}
.options-background {
  background: rgb(240, 240, 240);
  padding: 16px;
}
</style>
`,requires:{}})])}const O=n(l,[["render",p]]);export{g as __pageData,O as default};
