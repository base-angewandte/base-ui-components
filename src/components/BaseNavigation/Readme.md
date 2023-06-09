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
          shortLabel: "BButton",
          route: "/components/BaseButton.html",
          placement: "left",
        },
        {
          id: "1",
          label: "BaseNavigation",
          shortLabel: "BNavigation",
          route: "/components/BaseNavigation.html",
          placement: "right",
        },
        {
          id: "2",
          label: "BaseLink (this is a very long label which should cause a switch to shortLabel)",
          shortLabel: "BLink",
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
