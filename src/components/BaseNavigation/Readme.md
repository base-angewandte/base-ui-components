```vue live
<template>
  <BaseNavigation
    render-as="a"
    :list="list" />
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: "0",
          label: "BaseNavigation",
          shortLabel: "BNavigation",
          route: "/components/BaseNavigation.html",
          placement: "left",
        },
        {
          id: "1",
          label: "BaseButton",
          shortLabel: "BButton",
          route: "/components/BaseButton.html",
          placement: "right",
        },
        {
          id: "2",
          label: "BaseLink",
          shortLabel: "BLink",
          route: "/components/BaseLink.html",
          placement: "right",
        },
        {
          id: "3",
          label: "BaseLink 2(this is a vershould cause a switch to shortLabel)",
          shortLabel: "BLink 2",
          route: "/components/BaseLink.html",
          placement: "left",
        },
      ],
      renderAs: "NuxtLink",
    };
  },
};
</script>
```
