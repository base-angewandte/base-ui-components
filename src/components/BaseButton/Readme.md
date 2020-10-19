Button Single Style

```js

const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <base-button
    text="No Icon"
    description="i'm a button with no icon example"
    style="margin-right: 16px;"
    @clicked="executeFire"/>
  <base-button
    style="margin-right: 16px;"
    description="a buttton with a small icon example"
    icon="waste-bin"
    text="Small Icon"
    @clicked="executeFire"/>
  <base-button
    style="margin-right: 16px;"
    description="button with large icon example"
    icon="waste-bin"
    icon-size="large"
    text="Large Icon"
    @clicked="executeFire"/>
</div>

```

Button Row Style
```js

const executeFire = function(){
    alert('button clicked!');
}

<div style="display: flex; background-color: rgb(240, 240, 240); padding: 16px;">
  <base-button
    text="Small Icon Right"
    description="button with small icon right example"
    style="margin-right: 16px;"
    icon="save-file"
    icon-position="right"
    button-style="row"
    @clicked="executeFire"/>
  <base-button
      text="Large Icon"
      style="margin-right: 16px;"
      icon="sheet-plus"
      button-style="row"
      icon-size="large"
      @clicked="executeFire"/>
  <base-button
      :active="true"
      text="Button Active"
      icon="sheet-plus"
      button-style="row"
      icon-size="large"
      @clicked="executeFire"/>
</div>

```
Button Secondary Style

```js

const executeFire = function(){
    alert('button clicked!');
}
<div style="display: flex;">
  <base-button
    button-style="secondary"
    style="margin-right: 16px;"
    icon="waste-bin"
    text="With Icon"
    @clicked="executeFire"/>
</div>

```


