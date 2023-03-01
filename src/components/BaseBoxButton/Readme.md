Example buttons with a 1:1 ratio (100%)

```js live

const executeFire = function(){
    alert('button clicked!');
}
<div
  style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <base-box-button
       :show-plus="true"
       style="margin-right: 16px;"
       box-style="large"
       text="Large Style Button"
       icon="file-object"
       subtext="Click or Drag'n Drop"
       @clicked="executeFire"/>
 <base-box-button
      box-style="small"
      text="Small Style Button"
      icon="save-file"
      subtext="Click or Drag'n Drop"
      @clicked="executeFire"/>
</div>
```


Example button with a 1:2 ratio (50%)
```js live

const executeFire = function(){
    alert('button clicked!');
}
<div
  style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <base-box-button
       :show-plus="true"
       :box-size="{ width: '50%' }"
       box-ratio="50"
       style="margin-right: 16px;"
       box-style="large"
       text="Large Style Button"
       icon="file-object"
       subtext="Click or Drag'n Drop"
       @clicked="executeFire"/>
</div>
```
