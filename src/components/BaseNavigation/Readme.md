```vue live
<template>
  <BaseNavigation :list="list" :placement="placement" />
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: "0",
          label: "BaseButton",
          shortLabel: "BaseButton short",
          route: "/components/BaseButton.html",
        },
        {
          id: "1",
          label: "BaseNavigation",
          shortLabel: "BaseNavigation short",
          route: "/components/BaseNavigation.html",
        },
        {
          id: "2",
          label: "BaseLink",
          shortLabel: "BaseLink short",
          route: "/components/BaseLink.html",
        },
      ],
      placement: "left",
      renderAs: "NuxtLink",
    };
  },
};
</script>
```
