module.exports = {
  COMPONENT_DATA: {
    baseChipsInput: {
      properties: [
        {
          name: ':label',
          description: 'The label for the input field',
          type: 'String',
          remark: '',
          default: 'null',
          required: false,
        },
        {
          name: ':placeholder',
          description: 'Placeholder visible in the input field',
          type: 'String',
          remark: '',
          default: 'null',
          required: false,
        },
        {
          name: ':dropDownNoOptionsInfo',
          description: 'This text is displayed when no options are available in the drop down',
          type: 'String',
          remark: '',
          default: 'No options available',
          required: false,
        },
        {
          name: ':list',
          description: 'List with select options',
          type: 'Array',
          remark: 'This can either be an array of strings or an object, if it is an object, "title" property is required',
          default: '[]',
          required: false,
        },
        {
          name: ':selectedList',
          description: 'List with options already selected',
          type: 'Array',
          remark: '',
          default: '[]',
          required: false,
        },
        {
          name: ':chipsInline',
          description: 'Flag to set selected chips appearing inline or below the input field',
          type: 'Boolean',
          remark: 'not implemented yet! (only chips inline)',
          default: true,
          required: false,
        },
        {
          name: ':allowUnknownEntries',
          description: 'Allow entries that are not from controlled vocabulary',
          type: 'Boolean',
          remark: 'not implemented yet!',
          default: false,
          required: false,
        },
        {
          name: ':allowDynamicDropDownEntries',
          description: 'if true the drop down options are updated with every input',
          type: 'Boolean',
          remark: '',
          default: false,
          required: false,
        },
      ],
      events: [
        {
          name: '@fetchDropDownEntries',
          description: 'Triggered when input is made and "allowDynamicDropDownEntries is set "true" to fetch matching entries',
          params: 'The text input string',
          remark: '',
        },
        {
          name: '@selected',
          description: 'Triggered when an option is selected from the drop down menu',
          params: 'Array with selected options',
          remark: '',
        },
      ],
      slots: [
        {
          name: 'drop-down-entry',
          description: 'Allows to individualize the drop down options (e.g. if "list" properties are passed they can be displayed here)',
          default: '<div class="base-chips-drop-down-entry">\n    {{ entry.title }}\n</div>',
          remark: '',
        },
        {
          name: 'no-options',
          description: 'Element displayed when no options are available (there to increase flexibility e.g. to distinguish between all options selected and'
            + 'no result returned by the dynamic fetching query',
          default: '<div class="base-chips-drop-down-entry-wrapper">\n'
            + '    {{ dropDownNoOptionsInfo }}\n'
            + '</div>',
          remark: '',
        },
      ],
    },
  },
};
