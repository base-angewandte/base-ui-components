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
Example with custom properties

```vue
<template>
  <BaseDetailBox
    :data="data"
    label-property-name="name"
    value-property-name="text" />
</template>

<script>
export default {
  data() {
    return {
      data: [{
          name: 'Telefon',
          text: '01234455767',
        },
        {
          name: 'Fax',
          text: '01234455767 123',
        },
        {
          name: 'Mobile',
          text: '098012345678',
        },
        {
          name: 'Email',
          text: 'name@domain.com',
        },
      ]
    };
  },
};
</script>
```
