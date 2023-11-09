```vue live
<template>
  <BaseNavigation
    :render-as="renderAs"
    :primary-items="primaryItems"
    :secondary-items="secondaryItems" />
</template>

<script>
export default {
  data() {
    return {
      primaryItems: [
        {
          id: "0",
          label: "BaseNavigation",
          shortLabel: "BNavigation",
          route: "/components/BaseNavigation.html",
        },
        {
          id: "3",
          label: "BaseLink 2(this is a vershould cause a switch to shortLabel)",
          shortLabel: "BLink 2",
          route: "/components/BaseLink.html",
        },
      ],
      secondaryItems: [
        {
          id: "1",
          label: "BaseButton",
          shortLabel: "BButton",
          route: "/components/BaseButton.html",
        },
        {
          id: "2",
          label: "BaseLink",
          shortLabel: "BLink",
          route: "/components/BaseLink.html",
        },
      ],
      renderAs: "RouterLink",
    };
  },
};
</script>
```
