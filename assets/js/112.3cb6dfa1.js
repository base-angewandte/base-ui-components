(window.webpackJsonp=window.webpackJsonp||[]).push([[112],{1345:function(e,t,r){"use strict";r.r(t);var n=r(35),o=Object(n.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"baseadvancedsearch"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#baseadvancedsearch"}},[e._v("#")]),e._v(" BaseAdvancedSearch")]),e._v(" "),t("h2",{attrs:{id:"props"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[e._v("#")]),e._v(" Props")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Prop name")]),e._v(" "),t("th",[e._v("Description")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Values")]),e._v(" "),t("th",[e._v("Default")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("filterList")]),e._v(" "),t("td",[e._v("list of available filters, needs to be an array of objects with the following properties:"),t("br"),t("br"),e._v(" "),t("strong",[e._v("label")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the label of the filter (displayed"),t("br"),e._v(" if not main search) - this prop can be customized by specifying"),t("br"),e._v(" "),t("code",[e._v("labelPropertyName.filter")]),e._v("."),t("br"),e._v(" "),t("strong",[e._v("id")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the identifier of the filter (displayed"),t("br"),e._v(" if not main search) - this prop can be customized by specifying"),t("br"),e._v(" "),t("code",[e._v("identifierPropertyName.filter")]),e._v("."),t("br"),e._v(" "),t("strong",[e._v("type")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the filter type. Possible values: "),t("code",[e._v("text")]),e._v(", "),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("chipssingle")]),e._v(", "),t("code",[e._v("date")]),e._v(", "),t("code",[e._v("daterange")]),e._v("."),t("br"),e._v(" "),t("strong",[e._v("hidden")]),e._v(" "),t("code",[e._v("boolean")]),e._v(" - filters with this attribute true will be filtered from"),t("br"),e._v(" displayed filter list."),t("br"),e._v(" "),t("strong",[e._v("freetext_allowed")]),e._v(" "),t("code",[e._v("boolean")]),e._v(" - determines if predetermined options from "),t("code",[e._v("options")]),t("br"),e._v(" property are used or autocomplete is used."),t("br"),e._v(" "),t("strong",[e._v("options")]),e._v(" "),t("code",[e._v("Object[]")]),e._v(" - for filter type "),t("code",[e._v("chips")]),e._v(" and "),t("code",[e._v("chipssingle")]),e._v(" the controlled"),t("br"),e._v(" vocabulary options."),t("br"),e._v(" "),t("strong",[e._v("subsets")]),e._v(" "),t("code",[e._v("string[]")]),e._v(" - if a filter of "),t("code",[e._v("type")]),e._v(" 'text' or 'chips' with"),t("br"),e._v(" "),t("code",[e._v("freetext_allowed")]),e._v(" (thus triggering autocomplete) has subordinate filters for which"),t("br"),e._v(" the autosuggest results should also be shown - add the filter identifiers here")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("appliedFilters")]),e._v(" "),t("td",[e._v("possibility to set applied filters from outside, for necessary object properties"),t("br"),e._v("see "),t("code",[e._v("filterList")]),e._v(" (except "),t("code",[e._v("options")]),e._v(" - this property is not necessary for applied filters)")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("autocompleteResults")]),e._v(" "),t("td",[e._v("provide the component with the fetched autocomplete results"),t("br"),e._v("(drop down options)."),t("br"),e._v("this needs to be an object array with the properties specified in"),t("br"),t("code",[e._v("autocompletePropertyNames")]),e._v(".")]),e._v(" "),t("td",[e._v("array")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("[]")])]),e._v(" "),t("tr",[t("td",[e._v("defaultFilter")]),e._v(" "),t("td",[e._v("specify a default value for a filter that is set when none of the"),t("br"),e._v("available filters is selected, should have the following properties:"),t("br"),t("br"),e._v(" "),t("strong",[e._v("label")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the label of the filter (displayed"),t("br"),e._v(" if not main search) - this prop can be customized by specifying"),t("br"),e._v(" "),t("code",[e._v("labelPropertyName.filter")]),e._v("."),t("br"),e._v(" "),t("strong",[e._v("id")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the identifier of the filter (displayed"),t("br"),e._v(" if not main search) - this prop can be customized by specifying"),t("br"),e._v(" "),t("code",[e._v("identifierPropertyName.filter")]),e._v("."),t("br"),e._v(" "),t("strong",[e._v("type")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the filter type. Possible values: "),t("code",[e._v("text")]),e._v(", "),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("chipssingle")]),e._v(", "),t("code",[e._v("date")]),e._v(", "),t("code",[e._v("daterange")]),e._v("."),t("br"),e._v(" "),t("strong",[e._v("options")]),e._v(" "),t("code",[e._v("Object[]")]),e._v(" - for filter type "),t("code",[e._v("chips")]),e._v(" and "),t("code",[e._v("chipssingle")]),e._v(" the controlled"),t("br"),e._v(" vocabulary options."),t("br"),e._v(" "),t("strong",[e._v("filter_values")]),e._v(" "),t("code",[e._v("Object[], string[], Object")]),e._v(" - the values selected - object for date"),t("br"),e._v(" or array of objects or strings for type "),t("code",[e._v("text")]),e._v(", type "),t("code",[e._v("chips")]),e._v(" and "),t("code",[e._v("chipssingle")]),e._v(","),t("br"),t("br"),e._v(" defaultFilter does not need the property "),t("code",[e._v("subsets")]),e._v(" since results for all filters are"),t("br"),e._v(" shown per default")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" label: 'Fulltext',"),t("br"),e._v(" id: 'default',"),t("br"),e._v(" type: 'text',"),t("br"),e._v(" options: [],"),t("br"),e._v(" filter_values: []"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("language")]),e._v(" "),t("td",[e._v("specify a language (ISO 639-1) (used for label if label is language specific object"),t("br"),e._v("e.g. "),t("code",[e._v("{ de: 'xxx', en: 'yyy' }")]),e._v(").")]),e._v(" "),t("td",[e._v("string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("''")])]),e._v(" "),t("tr",[t("td",[e._v("isLoadingIndex")]),e._v(" "),t("td",[e._v("set the row loader from outside per row index")]),e._v(" "),t("td",[e._v("number")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("-1")])]),e._v(" "),t("tr",[t("td",[e._v("advancedSearchText")]),e._v(" "),t("td",[e._v("specify informational texts for the component - this needs to be an object with the following"),t("br"),e._v("properties (if you don't want to display any text leave an empty string):"),t("br"),t("br"),e._v(" "),t("strong",[e._v("title")]),e._v(": text shown as first line on the drop-down in filters area."),t("br"),e._v(" "),t("strong",[e._v("subtext")]),e._v(": text shown as second line on the drop-down in filters area."),t("br"),e._v(" "),t("strong",[e._v("availableOptions")]),e._v(": text shown with chips options for controlled vocabulary"),t("br"),e._v(" search."),t("br"),e._v(" "),t("strong",[e._v("addFilter")]),e._v(": text/label used for add filter icon."),t("br"),e._v(" "),t("strong",[e._v("removeFilter")]),e._v(": text/label used for remove filter icon."),t("br"),e._v(" "),t("strong",[e._v("selectFilterLabel")]),e._v(": label (not visible) used for filter chips input field."),t("br"),e._v(" "),t("strong",[e._v("searchLabel")]),e._v(": label (not visible) used for search input field."),t("br"),t("br"),e._v(" The values of this object might be plain text or a key for an i18n file."),t("br"),e._v("This prop can be ignored when the "),t("code",[e._v("no-options")]),e._v(" slot is used.")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" title: 'Advanced Search',"),t("br"),e._v(" subtext: 'Select a filter',"),t("br"),e._v(" availableOptions: 'Available options',"),t("br"),e._v(" addFilter: 'Add filter',"),t("br"),e._v(" removeFilter: 'Remove filter',"),t("br"),e._v(" selectFilterLabel: 'Select filter',"),t("br"),e._v(" searchLabel: 'Search for Entries'"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("dropDownInfoTexts")]),e._v(" "),t("td",[e._v("specify informational texts for the drop-down - this needs to be an object with the following"),t("br"),e._v("properties:"),t("br"),t("br"),e._v(" "),t("strong",[e._v("autocompleteNoOptions")]),e._v(": info text shown when autocomplete search does not yield"),t("br"),e._v(" any results."),t("br"),e._v(" "),t("strong",[e._v("autocompleteOngoing")]),e._v(": info text displayed while autocomplete search is ongoing"),t("br"),e._v(" (and no previous results are displayed)."),t("br"),e._v(" "),t("strong",[e._v("autocompleteInitial")]),e._v(": info text shown when user first opens the search"),t("br"),e._v(" component."),t("br"),e._v(" "),t("strong",[e._v("chipsNoOptions")]),e._v(": info text shown when no options for controlled vocabulary search"),t("br"),e._v(" are available (anymore)."),t("br"),e._v(" "),t("strong",[e._v("chipsMaxOptions")]),e._v(": text displayed if more than max number of options that can be"),t("br"),e._v(" displayed are available (configure via prop "),t("code",[e._v("maxNumberControlledOptions")]),e._v(")."),t("br"),e._v(" "),t("strong",[e._v("chipsNoMatch")]),e._v(": text displayed if string in input does not match any options."),t("br"),e._v(" "),t("strong",[e._v("chipsOngoing")]),e._v(": info text shown when controlled vocabulary chips are being"),t("br"),e._v(" fetched."),t("br"),t("br"),e._v(" The values of this object might be plain text or a key for an i18n file"),t("br"),e._v("This prop can be ignored when the "),t("code",[e._v("no-options")]),e._v(" slot is used.")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" autocompleteNoOptions: 'No matching options found',"),t("br"),e._v(" autocompleteOngoing: 'Autocomplete is being fetched...',"),t("br"),e._v(" autocompleteInitial: 'Please start typing or select a filter to see options',"),t("br"),e._v(" chipsNoOptions: 'No more options available',"),t("br"),e._v(" chipsMaxOptions: 'Please start typing to see options',"),t("br"),e._v(" chipsNoMatch: 'No matching options were found',"),t("br"),e._v(" chipsOngoing: 'Options are being loaded...'"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("placeholder")]),e._v(" "),t("td",[e._v("add a placeholder for the search input, either a string used for every row or"),t("br"),e._v("add separate values for main filter row and already added filters"),t("br"),e._v("properties:"),t("br"),e._v(" "),t("strong",[e._v("filterRow")]),e._v(": for already added filter rows."),t("br"),e._v(" "),t("strong",[e._v("main")]),e._v(": for the primary search input field."),t("br"),t("br"),e._v(" each of these specific placeholders can again be a string or an object with different"),t("br"),e._v(" placeholders for each search type ("),t("code",[e._v("text")]),e._v(", "),t("code",[e._v("chips")]),e._v(", "),t("code",[e._v("date")]),e._v(")")]),e._v(" "),t("td",[e._v("object|string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("() => ({"),t("br"),e._v(" filterRow: 'Add values to your filter',"),t("br"),e._v(" main: 'Search and Discover',"),t("br"),e._v("})")])]),e._v(" "),t("tr",[t("td",[e._v("identifierPropertyName")]),e._v(" "),t("td",[e._v("specify the object property that can be used for identification of filters,"),t("br"),e._v("autocomplete options and controlled vocabulary options."),t("br"),e._v(" Could be a string (used for all the mentioned objects) or an object with the following"),t("br"),e._v(" properties:"),t("br"),e._v(" "),t("strong",[e._v("filter")]),e._v(": identifier property name in filter objects."),t("br"),e._v(" "),t("strong",[e._v("autocompleteOption")]),e._v(": identifier property name in autocomplete option objects."),t("br"),e._v(" "),t("strong",[e._v("controlledVocabularyOption")]),e._v(": identifier property name in controlled"),t("br"),e._v(" vocabulary option objects.")]),e._v(" "),t("td",[e._v("object|string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("() => ({"),t("br"),e._v(" filter: 'id',"),t("br"),e._v(" autocompleteOption: 'id',"),t("br"),e._v(" controlledVocabularyOption: 'id',"),t("br"),e._v("})")])]),e._v(" "),t("tr",[t("td",[e._v("labelPropertyName")]),e._v(" "),t("td",[e._v("specify the object property that should be used for label display of filters,"),t("br"),e._v("autocomplete options and controlled vocabulary options."),t("br"),e._v(" Could be a string (used for all the mentioned objects) or an object with the following"),t("br"),e._v(" properties:"),t("br"),e._v(" "),t("strong",[e._v("filter")]),e._v(": label property name in filter objects."),t("br"),e._v(" "),t("strong",[e._v("autocompleteOption")]),e._v(": label property name in autocomplete option objects."),t("br"),e._v(" "),t("strong",[e._v("controlledVocabularyOption")]),e._v(": label property name in controlled"),t("br"),e._v(" vocabulary option objects.")]),e._v(" "),t("td",[e._v("object|string")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("() => ({"),t("br"),e._v(" filter: 'label',"),t("br"),e._v(" autocompleteOption: 'title',"),t("br"),e._v(" controlledVocabularyOption: 'label',"),t("br"),e._v("})")])]),e._v(" "),t("tr",[t("td",[e._v("autocompletePropertyNames")]),e._v(" "),t("td",[e._v("autocomplete results need a label, and id and a data property that contains all the actual"),t("br"),e._v("autocomplete results for that specific category"),t("br"),e._v("TODO: make category optional")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{"),t("br"),e._v(" label: 'label',"),t("br"),e._v(" id: 'id',"),t("br"),e._v(" data: 'data'"),t("br"),e._v("}")])]),e._v(" "),t("tr",[t("td",[e._v("assistiveText")]),e._v(" "),t("td",[e._v("this prop gives the option to add assistive text for screen readers."),t("br"),e._v("properties:"),t("br"),t("strong",[e._v("selectedOption")]),e._v(": text read when a selected option is focused (currently only"),t("br"),e._v(" working for type chips with autocomplete (=freetext_allowed))")]),e._v(" "),t("td",[e._v("object")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("{}")])]),e._v(" "),t("tr",[t("td",[e._v("applyBoxShadow")]),e._v(" "),t("td",[e._v("if desired the box shadow around the search rows can be deactivated here")]),e._v(" "),t("td",[e._v("boolean")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("true")])]),e._v(" "),t("tr",[t("td",[e._v("dateFieldDelay")]),e._v(" "),t("td",[e._v("use this prop to set a delay in ms before date input calendar is displayed")]),e._v(" "),t("td",[e._v("number")]),e._v(" "),t("td",[e._v("-")]),e._v(" "),t("td",[e._v("0")])])])]),e._v(" "),t("h2",{attrs:{id:"events"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[e._v("#")]),e._v(" Events")]),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Event name")]),e._v(" "),t("th",[e._v("Properties")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[e._v("update:applied-filters")]),e._v(" "),t("td",[t("strong",[e._v("undefined")]),e._v(" "),t("code",[e._v("Filter[]")]),e._v(" - the list of updated applied filters")]),e._v(" "),t("td",[e._v("inform parent of changes in applied filters")])]),e._v(" "),t("tr",[t("td",[e._v("fetch-autocomplete")]),e._v(" "),t("td",[t("strong",[e._v("searchString")]),e._v(" "),t("code",[e._v("string")]),e._v(" - the string to autocomplete"),t("br"),t("strong",[e._v("filter")]),e._v(" "),t("code",[e._v("Filter")]),e._v(" - the filter object"),t("br"),t("strong",[e._v("index")]),e._v(" "),t("code",[e._v("number")]),e._v(" - the filter index of all filters (main and applied)")]),e._v(" "),t("td",[e._v("inform parent to fetch autocomplete data for the provided filter")])]),e._v(" "),t("tr",[t("td",[e._v("search")]),e._v(" "),t("td",[t("strong",[e._v("undefined")]),e._v(" "),t("code",[e._v("Filter[]")]),e._v(" - the updated list of applied filters")]),e._v(" "),t("td",[e._v("inform parent that search should be triggered")])])])]),e._v(" "),t("hr"),e._v(" "),t("h2",{attrs:{id:"demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#demo"}},[e._v("#")]),e._v(" Demo")]),e._v(" "),t("p",[e._v("Search functionality with simple freetext and advanced search")]),e._v(" "),t("p",[e._v("To see autocomplete results try typing 'zentrum'.")]),e._v(" "),t("no-ssr",[t("vue-live",{attrs:{layoutProps:{lang:"vue"},code:'<template>\n  <div class="background">\n    <BaseAdvancedSearch\n      :applied-filters.sync="appliedFilters"\n      :filter-list="filterList"\n      :autocomplete-results="autocompleteResults"\n      :label-property-name="{\n        filter: \'label\',\n        autocompleteOption: \'header\',\n        controlledVocabularyOption: \'label\'\n      }"\n      :identifier-property-name="{\n        filter: \'id\',\n        autocompleteOption: \'id\',\n        controlledVocabularyOption: \'id\'\n      }"\n      :autocompletePropertyNames="{\n        label: \'collection\',\n        id: \'id\',\n        data: \'data\'\n      }"\n      @add-filter="addFilter"\n      @fetch-autocomplete="fetchAutocomplete"\n    />\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      appliedFilters: [],\n      filterList: [\n        {\n          label: "Filter Text",\n          id: "text",\n          type: "text"\n        },\n        {\n          label: "Filter Chips Autocomplete",\n          type: "chips",\n          id: "chips",\n          freetext_allowed: true,\n          subsets: ["chips3", "chips4"]\n        },\n        {\n          label: "Filter Chips Autocomplete 2",\n          id: "chips2",\n          type: "chips",\n          freetext_allowed: true\n        },\n        {\n          label: "Filter Chips Autocomplete 3",\n          id: "chips3",\n          type: "chips",\n          freetext_allowed: true\n        },\n        {\n          label: "Filter Chips Autocomplete 4",\n          id: "chips4",\n          type: "chips",\n          freetext_allowed: true\n        },\n        {\n          label: "Filter Chips Controlled",\n          type: "chips",\n          id: "controlled",\n          freetext_allowed: false,\n          options: [\n            {\n              label: "Test1",\n              id: "Test1"\n            },\n            {\n              label: "Test2",\n              id: "Test2"\n            }\n          ]\n        },\n        {\n          label: "Filter Chips Single",\n          type: "chipssingle",\n          id: "chipssingle",\n          freetext_allowed: false,\n          options: [\n            {\n              label: "Test1",\n              id: "Test1"\n            }\n          ]\n        },\n        {\n          label: "Filter Daterange",\n          id: "daterange",\n          type: "daterange"\n        },\n        {\n          label: "Filter Date",\n          id: "date",\n          type: "date"\n        }\n      ],\n      autocompleteResults: [],\n      potentialResults: [\n        {\n          collection: "Filter Chips Autocomplete",\n          id: "chips",\n          data: [\n            {\n              id: "i:AtyPMbCGvo87shMwRZikwQ",\n              score: 13.0,\n              header: "Zebra - Zentrum für Klassische und Moderne Fotografie",\n              subtext: ["Wien, Austria"]\n            },\n            {\n              id: "i:kK2kZPzffLknjWhuHxU6sa",\n              score: 13.0,\n              header: "Zentrum für Erwachsenenbildung",\n              subtext: ["Strobl"]\n            },\n            {\n              id: "i:QpNo2ZUPzPKM7wJDSy7F4h",\n              score: 13.0,\n              header: "H2 - Zentrum für Gegenwartskunst",\n              subtext: ["Augsburg"]\n            },\n            {\n              id: "i:A6iu4gLU7bGS5kpAE9pTUf",\n              score: 13.0,\n              header:\n                "Tomi Ungerer Museum - Internationales Zentrum für Illustration",\n              subtext: ["Strasbourg"]\n            },\n            {\n              id: "i:FmHikVmyQJuyynSx7NCsNe",\n              score: 13.0,\n              header: "Zentrum für Interdisziplinäre Forschnung",\n              subtext: ["ZIF", "Bielefeld"]\n            },\n            {\n              id: "i:R4YjbtHGNsbKzfwyRDF5XJ",\n              score: 13.0,\n              header: "BrotfabrikGalerie",\n              subtext: ["Zentrum für Kunst & Kultur", "Berlin, AT"]\n            }\n          ]\n        },\n        {\n          collection: "Filter Chips Autocomplete 2",\n          id: "chips2",\n          data: [\n            {\n              id: "i:qQCn2jtewXhKnLVsFaHgk6",\n              score: 13.0,\n              header:\n                "Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe",\n              subtext: []\n            },\n            {\n              id: "i:X44M8fjtLCXfYvhVMo4gRP",\n              score: 13.0,\n              header:\n                \'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany\',\n              subtext: []\n            }\n          ]\n        },\n        {\n          collection: "Filter Chips Autocomplete 3",\n          id: "chips3",\n          data: [\n            {\n              id: "i:qQCn2jtewXhKnLVsFaHgk6",\n              score: 13.0,\n              header:\n                "Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe",\n              subtext: []\n            },\n            {\n              id: "i:X44M8fjtLCXfYvhVMo4gRP",\n              score: 13.0,\n              header:\n                \'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany\',\n              subtext: []\n            },\n            {\n              id: "i:PYqY6pTrmUgZpnRRhmkgY6",\n              score: 13.0,\n              header: "Zentrum für Kunst und Kommunikation",\n              subtext: ["Z.K.K.", "Wien, Austria"]\n            },\n            {\n              id: "i:gpptGbzV9f7uYAmxTjyjMg",\n              score: 13.0,\n              header: "Zentrum für Kunst und Medientechnologie",\n              subtext: ["ZKM", "Karlsruhe"]\n            },\n            {\n              id: "i:Q4AAfWUC6GkHUdRxc7ChxC",\n              score: 13.0,\n              header: "Open Space - Zentrum für Kunstprojekte",\n              subtext: ["Wien, Austria"]\n            },\n            {\n              id: "i:SxX6iZszMJv7M7n54ej6BK",\n              score: 13.0,\n              header: "Zentrum für Literatur- und Kulturforschung Berlin",\n              subtext: [\n                "Geisteswissenschaftliche Zentren Berlin e.V.",\n                "Berlin"\n              ]\n            }\n          ]\n        },\n        {\n          collection: "Filter Chips Autocomplete 4",\n          id: "chips4",\n          data: [\n            {\n              id: "i:qQCn2jtewXhKnLVsFaHgk6",\n              score: 13.0,\n              header:\n                "Artist-in-Residenz, Zentrum für Kunst und Medien, Institut für Visuelle Medien, Karlsruhe",\n              subtext: []\n            },\n            {\n              id: "i:X44M8fjtLCXfYvhVMo4gRP",\n              score: 13.0,\n              header:\n                \'Ankauf "Interactive Plant Growing", Zentrum für Medientechnologie Karlsruhe, Germany\',\n              subtext: []\n            }\n          ]\n        }\n      ]\n    };\n  },\n  methods: {\n    addFilter() {\n      alert("Filter added!");\n    },\n    fetchAutocomplete({ searchString, filter }) {\n      if (\n        searchString &&\n        (filter.type === "text" ||\n          (filter.type === "chips" && filter.freetext_allowed))\n      ) {\n        setTimeout(() => {\n          this.autocompleteResults = this.potentialResults.map(\n            ({ collection, id, data }) => {\n              const filteredResults = data.filter(entry =>\n                entry.header.toLowerCase().includes(searchString.toLowerCase())\n              );\n              return {\n                collection,\n                id,\n                data: filteredResults\n              };\n            }\n          );\n        }, 1000);\n      } else {\n        this.autocompleteResults = [];\n      }\n    }\n  }\n};\n<\/script>\n\n<style>\n.background {\n  background: rgb(240, 240, 240);\n  padding: 16px;\n}\n</style>\n',requires:{}}})],1)],1)}),[],!1,null,null,null);t.default=o.exports}}]);