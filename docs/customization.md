# CSS Styling

### Color Scheme Customization

It is possible to customize the color scheme of base components through the following CSS variables
that can be placed at the :root of your stylesheet:

```scss
:root {
    // primary app color
    --app-color: #673ab7;
    // secondary app color (a lighter version of app color)
    // mostly used for highlighting items on hover or active
    --app-color-secondary: #b085f5;
    // standard font colors
    --font-color: rgb(0, 0, 0);
    // secondary color - for example used in labels
    --font-color-second: rgb(107, 107, 107);
    // background color for buttons or e.g. pop up header and progress bar background
    --button-header-color: rgb(240, 240, 240);
    // active color for drop down list elements
    --keyboard-active-color: rgb(217, 217, 217);
    // color for the border around input fields
    --input-field-color: rgb(200, 200, 200);
    // color used mostly for background in components
    --background-color: #f0f0f0;
    // boxes background color, e.g. BasePagination
    --box-color: #ffffff;
    
    // color used for the progress bar in BaseProgressBar
    --uploadbar-color: #999999;
    // BaseToggle customization colors
    --switch-checked-color: #4d4d4d;
    --switch-svg-checked-color: #ffffff;
    // color used for inactive text
    --graytext-color: rgba(16, 16, 16, 0.3);
    
    // used for user warnings in BaseProgressBar and BaseUploadPopUp
    --warning-color: #ff4444;
    // non-active color for BaseCarousel bullet points
    --pagination-bullet-color: #444444;
}

```

### Icon Customization

Icons used within the components may be customized by providing a self-generated sprite sheet that would need to include icons with the following names:

`add-existing-collection`, `add-existing-object`, `add-new-collection`, `add-new-object`, `archive-arrow`,
`archive-empty`, `archive-sheets`, `arrow-left`, `attachment`, `attention`, `audio-object`, `calendar-many`,
`calendar-number`, `camera`, `check-mark`, `clock`, `collection`, `download`, `drag-lines`, `drag-n-drop`,
`drop-down`, `duplicate`, `edit`, `eye-hide`, `eye`, `file-object`, `forbidden`, `home`, `image-object`,
`information`, `licence`, `logo`, `magnifier`, `next`, `options-menu`, `people`, `play`, `plus`, `prev`, `print`,
`refresh`, `remove`, `save-file`, `share`, `sort`, `subscribe`, `success`, `text`, `unsubscribe`, `video-object`,
`waste-bin`.

To make sure the latest icons are included and for instructions on how to integrate the generated sprite sheet into your front end project please also check documentation in the [BaseIcon component](/components/BaseIcon).
