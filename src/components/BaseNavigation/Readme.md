```vue live
<template>
  <BaseNavigation :list="list" />
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
          placement: "left",
        },
        {
          id: "1",
          label: "BaseNavigation",
          shortLabel: "BaseNavigation short",
          route: "/components/BaseNavigation.html",
          placement: "right",
        },
        {
          id: "2",
          label: "BaseLink",
          shortLabel: "BaseLink short",
          route: "/components/BaseLink.html",
          placement: "right",
        },
      ],
      renderAs: "NuxtLink",
    };
  },
};
</script>
```
