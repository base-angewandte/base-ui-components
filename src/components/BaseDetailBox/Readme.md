An Element to render data in datalist tags

```vue
<template>
  <BaseDetailBox
    :data="data" />
</template>

<script>
export default {
  data() {
    return {
      data: [{
          label: 'Telefon',
          value: '01234455767',
        },
        {
          label: 'Fax',
          value: '01234455767 123',
        },
        {
          label: 'Mobile',
          value: '098012345678',
        },
        {
          label: 'Email',
          value: 'name@domain.com',
        },
      ]
    };
  },
};
</script>
```
