## Demo

An Element to render data in datalist tags

```vue live
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
Example with custom properties and language specific label

```vue live
<template>
  <div>
      <BaseDetailBox
        :data="data"
        :language="lang"
        label-property-name="name"
        value-property-name="text" />
      <div class="button-row">
        <BaseButton
          :active="lang === 'en'"
          text="English"
          class="language-button"
          @clicked="lang = 'en'" />
        <BaseButton
          :active="lang === 'de'"
          text="German"
          class="language-button"
          @clicked="lang = 'de'" />
      </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      lang: 'en',
      data: [{
          name: {
            de: 'Telefon',
            en: 'Telephone',
          },
          text: '01234455767',
        },
        {
          name: {
            de: 'Fax',
            en: 'Fax',
          },
          text: '01234455767 123',
        },
        {
          name: {
            de: 'Mobil',
            en: 'Mobile',
          },
          text: '098012345678',
        },
        {
          name: {
            de: 'Email',
            en: 'Email',
          },
          text: 'name@domain.com',
        },
      ]
    };
  },
};
</script>

<style>
  .button-row {
    display: flex;
    margin-top: 16px;
  }
  .language-button {
    margin-right: 16px;
  }

</style>
```
