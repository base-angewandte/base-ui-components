## Demo

Button Single Style

```js live

const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    text="No Icon"
    description="i'm a button with no icon example"
    style="margin-right: 16px;"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="a buttton with a small icon example"
    icon="waste-bin"
    text="Small Icon"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="button with large icon example"
    icon="waste-bin"
    icon-size="large"
    text="Large Icon"
    @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="active button example"
    icon="calendar-number"
    icon-size="large"
    text="Button Active"
    :active="true"
    @clicked="executeFire" />
</div>

```

Button Row Style
```js live

const executeFire = function(){
    alert('button clicked!');
}

<div style="display: flex; background-color: rgb(240, 240, 240); padding: 16px;">
  <BaseButton
    text="Small Icon Right"
    description="button with small icon right example"
    style="margin-right: 16px;"
    icon="save-file"
    icon-position="right"
    button-style="row"
    @clicked="executeFire"/>
  <BaseButton
      text="Large Icon"
      style="margin-right: 16px;"
      icon="add-new-object"
      button-style="row"
      icon-size="large"
      @clicked="executeFire" />
  <BaseButton
      style="margin-right: 16px;"
      :active="true"
      text="Button Active"
      icon="add-new-object"
      button-style="row"
      icon-size="large"
      @clicked="executeFire" />
  <BaseButton
    style="margin-right: 16px;"
    description="Custom Text"
    icon="file-object"
    button-style="row"
    icon-size="large"
    @clicked="executeFire">
    <template #text>Custom Text</template>
  </BaseButton>
  <BaseButton
    style="margin-right: 16px;"
    description="No Text"
    text=""
    button-style="row"
    icon="plus"
    icon-size="large"
    icon-title="Add"
    @clicked="executeFire" />
</div>

```
Button Secondary Style

```js live

const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    button-style="secondary"
    style="margin-right: 16px;"
    icon="waste-bin"
    text="With Icon"
    @clicked="executeFire" />
</div>

```

Button Circle Style

```js live

const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <BaseButton
    button-style="circle"
    style="margin-right: 16px;"
    icon="waste-bin"
    icon-title="button type 'circle'"
    @clicked="executeFire" />
</div>

```


