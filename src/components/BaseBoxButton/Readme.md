```js

const executeFire = function(){
    alert('button clicked!');
}
<div style="background-color: rgb(240, 240, 240); padding: 16px; display:flex;">
  <base-box-button 
       :show-plus="true"
       style="margin-right: 16px;"
       box-style="large"
       text="Large Style Button"
       icon="sheet-empty"
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
