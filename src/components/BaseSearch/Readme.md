A simple Search Component

```vue
<template>
  <div class="searchcontainer">
    <BaseSearch
        label="Search your Entries"
        placeholder="Search your Entries"
        showImage
        @input="searchText = $event"
        />
    <div class="searchtext">{{ 'Your Search Text: ' + searchText }}</div>    
  </div>  
</template>
<script>
export default {
  data() {
    return {
      searchText: '',
    };
  },
};
</script>
<style>
.searchcontainer {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}

.searchtext {
  margin-top: 16px;
  padding: 16px;
  width: 100%;
  background-color: white;
}
</style>

```

A component without image and with additional styling

```vue
<template>
  <div class="searchcontainer">
    <BaseSearch
        :style-props="styleProps"
        label="Search your Entries"
        placeholder="Search your Entries"
        />
  </div>  
</template>
<script>
export default {
  data() {
    return {
      styleProps: {
        width: '50%',
        boxShadow: '0 0 20px 0px rgba(0,0,0,0.25)',
      },
    };
  },
};
</script>
<style>
.searchcontainer {
  background-color: rgb(240, 240, 240);
  padding: 16px;
}
</style>

```


