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
          routeMatch: new RegExp('\/components\/BaseNavigation'),
          route: "./BaseNavigation",
        },
        {
          id: "4",
          label: "External Link to base",
          shortLabel: "External",
          url: "https://base.uni-ak.ac.at",
        },
      ],
      secondaryItems: [
        {
          id: "1",
          label: "BaseButton",
          shortLabel: "BButton",
          route: "./BaseButton",
          routeMatch: new RegExp('\/components\/BaseButton'),
        },
        {
          id: "2",
          label: "BaseLink",
          shortLabel: "BLink",
          route: "./BaseLink",
          routeMatch: new RegExp('\/components\/BaseLink'),
        },
      ],
      renderAs: "RouterLink",
    };
  },
};
</script>
```
