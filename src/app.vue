<template>
  <div id="app">
    <BaseResultBoxSection
      :entry-list="entriesList"
      :action="activeAction"
      :is-loading="false"
      :selected-list="selectedBoxes"
      message-text="delete linked"
      message-subtext="delete linked"
      option-button-text="delete linked"
      action-button-text="delete"
      cancel-text="cancel"
      header-text="header"
      @entry-selected="entrySelected"
      @all-selected="selectEntries($event)"
      @cancel-action="activeAction = ''"
      @set-action="activeAction = $event" />
    <div>
      <BaseForm
        :value-list="formValueList"
        :fields-with-tabs="['texts']"
        :form-id="'xjlaödsjfadlskj'"
        :form-field-json="json" />
    </div>
    <BaseMediaPreview
      :show-preview="togglePreview"
      :media-url="'https://mnmedias.api.telequebec.tv/m3u8/29880.m3u8'"
      :download-url="'https://mnmedias.api.telequebec.tv/m3u8/29880.pdf'"
      @hide-preview="togglePreview = false" />
    <BaseButton
      text="Show Preview"
      @clicked="togglePreview = !togglePreview" />

    <!-- PAGINATION TEST -->
    <BasePagination :total="100" />

    <!-- CHIPS BELOW TEST -->
    <div class="form-field">
      <!-- UPLOAD BAR TEST -->
      <BaseUploadBar
        :progress="progress"
        :filename="'testfile.jpg'" />
      <base-button
        :active="false"
        :text="'Change Progress'"
        icon-size="large"
        button-style="row"
        @clicked="changeProgress" />
    </div>

    <div class="canvas flex">
      <!-- BASE IMAGE BOX TEST -->
      <BaseImageBox
        :selectable="selectable"
        :show-title="false"
        :image-url="require('@/assets/images/img1.png')"
        description="Bildserie"
        title="Afterlife II Ausstellungsansichten"
        class="image-box" />
      <BaseImageBox
        :selectable="selectable"
        :image-url="require('@/static/images/icons.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <BaseImageBox
        :selectable="selectable"
        :image-url="require('@/static/images/roboto_detail_fullscreen_12pt.png')"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <BaseButton
        :active="false"
        :text="'Activate Select'"
        icon-size="large"
        button-style="row"
        @clicked="enableSelect()" />
    </div>
    <div class="form-field canvas">
      <!-- testing all the altered componenents here -->
      <BaseDateInput
        v-model="inputDateTime"
        :type="'datetime'"
        :label="'unknown'" />
      <BaseDateInput
        :label="'unknown'"
        :input="inputDate"
        language="de"
        type="daterange"
        format="date_year" />
      <BaseToggle
        name="BaseToggle"
        label="Zeige Einträge anderen Benutzer*innen auf meinem Showroom-Profil an." />
      <BaseChipsInput
        :list="dropDownInput"
        :placeholder="'Select Your Marx'"
        :selected-list="chipsInput"
        :allow-multiple-entries="true"
        :allow-dynamic-drop-down-entries="true"
        :object-prop="'value'"
        :chips-inline="true"
        :chips-editable="true"
        :identifier="'id'"
        draggable
        label="A label"
        @fetchDropDownEntries="fetch" />
      <BaseChipsInput
        :list="[
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '***', source: '1' },
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '**', source: '2' },
          { title: '...alle Verhältnisse umzuwerfen',
            additional: 'part1', remark: '*', source: '3' },
          { title: 'in denen der Mensch', source: '4' },
          { title: 'ein erniedrigtes, ein geknechtetes', source: '5' },
          { title: 'ein verlassenes, ein verächtliches', source: '6' },
          { title: 'Wesen ist', source: '7' }]"
        :placeholder="'Select your Marx'"
        :object-prop="'title'"
        :chips-editable="true"
        :identifier="'source'"
        :label="'single choice with special drop down body'"
        :allow-unknown-entries="true"
        :add-new-chip-text="'asdfasdfasdfasdf'"
        :allow-multiple-entries="false">
        <template
          v-slot:drop-down-entry="props">
          <span>{{ props.item.title }}</span>
          <span>{{ props.item.additional }}</span>
          <span>{{ props.item.remark }}</span>
        </template>
      </BaseChipsInput>
      <BaseAutocompleteInput
        v-model="autocompleteInput"
        :list="dropDownInput"
        :placeholder="'Fetching from SkosMos'"
        :object-prop="'prefLabel'"
        label="text input with dynamic autocomplete"
        @selected="fetchOther($event, 'this is my type')" />
      <BaseChipsBelow
        v-model="selectedList"
        :chips-inline="false"
        :chips-editable="true"
        :allow-unknown-entries="false"
        :list="[{
                  id: '1',
                  name: 'Herbert Marcuse'
                },
                {
                  id: '2',
                  name: 'Erich From',
                },
                {
                  id: '',
                  name: 'Georg Werth',
                }]"
        :role-options="['Farmer', 'Magician', 'Priest']"
        :hoverbox-content="hoverboxContent"
        identifier="id"
        object-prop="name"
        label="chips-below-test"
        @hoverbox-active="setHoverBox" />
      <BaseInput
        :show-label="false"
        label="This label says Specify any text below"
        placeholder="A custom placeholder" />
      <BaseMenuList
        :selected="showCheckbox"
        :list="list"
        @clicked="activateMenuEntry" />
      <BaseButton
        text="toggle checkboxes"
        button-style="row"
        @clicked="showCheckbox = !showCheckbox" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import BaseInput from './components/BaseInput/BaseInput';
import BaseMenuList from './components/BaseMenuList/BaseMenuList';
import BaseChipsInput from './components/BaseChipsInput/BaseChipsInput';
import BaseAutocompleteInput from './components/BaseAutocompleteInput/BaseAutocompleteInput';
import BaseChipsBelow from './components/BaseChipsBelow/BaseChipsBelow';
import BaseDateInput from './components/BaseDateInput/BaseDateInput';
import BasePagination from './components/BasePagination/BasePagination';
import BaseMediaPreview from './components/BaseMediaPreview/BaseMediaPreview';
import BaseForm from './components/BaseForm/BaseForm';
import BaseButton from './components/BaseButton/BaseButton';
import BaseImageBox from './components/BaseImageBox/BaseImageBox';
import BaseToggle from './components/BaseToggle/BaseToggle';
import BaseUploadBar from './components/BaseUploadBar/BaseUploadBar';
import BaseResultBoxSection from './components/BaseResultBoxSection/BaseResultBoxSection';

export default {
  name: 'App',
  components: {
    BaseResultBoxSection,
    BaseUploadBar,
    BaseForm,
    BaseMediaPreview,
    BasePagination,
    BaseImageBox,
    BaseButton,
    BaseChipsBelow,
    BaseDateInput,
    BaseAutocompleteInput,
    BaseChipsInput,
    BaseMenuList,
    BaseInput,
    BaseToggle,
  },
  data() {
    return {
      activeAction: '',
      entriesList: [
        {
          id: 'pCSLggvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'An extra extra long title',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          // eslint-disable-next-line global-require
          imageUrl: require('@/assets/images/img1.png'),
        },
        {
          id: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Unknown',
          subtitle: 'Lets find it out and look deeper',
          description: 'Novel',
          // eslint-disable-next-line global-require
          imageUrl: require('@/assets/images/img1.png'),
        },
        {
          id: 'pCSLggvdsi8b3fffzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'TBD',
          subtitle: 'Misterious',
          text: ['Random text 1', 'Random text 2'],
        },
      ],
      selectedBoxes: [],
      formValueList: {
        id: 'JVKyWKTr8pit772AQKMW5V',
        parents: [
        ],
        relations: [
        ],
        icon: '/s/img/sheet-empty.svg',
        has_media: false,
        date_created: '2020-01-09T14:34:05.815419+01:00',
        date_changed: '2020-01-09T14:34:55.747568+01:00',
        title: '<ycsaasd',
        subtitle: '',
        type: null,
        notes: '',
        reference: null,
        keywords: [
        ],
        texts: [
          {
            data: [
              {
                text: 'aaa',
                language: {
                  source: 'http://base.uni-ak.ac.at/portfolio/languages/en',
                },
              },
            ],
          },
          {
            data: [
              {
                text: 'asdfsdf',
                language: {
                  source: 'http://base.uni-ak.ac.at/portfolio/languages/en',
                },
              },
            ],
            type: {
              label: {
                de: 'Beschreibung',
                en: 'description',
              },
              source: 'http://base.uni-ak.ac.at/portfolio/vocabulary/description',
            },
          },
        ],
        published: false,
        data: {
        },
      },
      json: {
        id: {
          title: 'Id',
          type: 'string',
          readOnly: true,
          minLength: 1,
          'x-attrs': {
            hidden: true,
          },
        },
        parents: {
          $ref: '#/definitions/Parent',
        },
        relations: {
          $ref: '#/definitions/Relations',
        },
        icon: {
          title: 'Icon',
          type: 'string',
          readOnly: true,
          'x-attrs': {
            hidden: true,
          },
        },
        has_media: {
          title: 'Has media',
          type: 'boolean',
          readOnly: true,
          'x-attrs': {
            hidden: true,
          },
        },
        date_created: {
          title: 'Date created',
          type: 'string',
          format: 'date-time',
          readOnly: true,
          'x-attrs': {
            hidden: true,
          },
        },
        date_changed: {
          title: 'Date changed',
          type: 'string',
          format: 'date-time',
          readOnly: true,
          'x-attrs': {
            hidden: true,
          },
        },
        title: {
          title: 'Title',
          type: 'string',
          maxLength: 255,
          minLength: 1,
          'x-attrs': {
            field_type: 'text',
            field_format: 'half',
            order: 1,
            placeholder: 'Enter title',
          },
        },
        subtitle: {
          title: 'Subtitle',
          type: 'string',
          maxLength: 255,
          'x-nullable': true,
          'x-attrs': {
            field_type: 'text',
            field_format: 'half',
            order: 2,
            placeholder: 'Enter subtitle',
          },
        },
        type: {
          title: 'Type',
          type: 'object',
          properties: {
            source: {
              type: 'string',
              'x-attrs': {
                hidden: true,
              },
            },
            label: {
              type: 'object',
              properties: {
                de: {
                  type: 'string',
                },
                en: {
                  type: 'string',
                },
                fr: {
                  type: 'string',
                },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
          'x-nullable': true,
          'x-attrs': {
            field_type: 'chips',
            source: '/api/v1/jsonschema/',
            order: 3,
            placeholder: 'Enter type',
            set_label_language: true,
          },
        },
        notes: {
          title: 'Notes',
          type: 'string',
          'x-nullable': true,
          'x-attrs': {
            field_type: 'multiline',
            order: 6,
            placeholder: 'Enter notes (will not be published)',
          },
        },
        reference: {
          title: 'Reference',
          type: 'string',
          maxLength: 255,
          'x-nullable': true,
          'x-attrs': {
            hidden: true,
          },
        },
        keywords: {
          title: 'Keywords',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              source: {
                type: 'string',
                'x-attrs': {
                  hidden: true,
                },
              },
              label: {
                type: 'object',
                properties: {
                  de: {
                    type: 'string',
                  },
                  en: {
                    type: 'string',
                  },
                  fr: {
                    type: 'string',
                  },
                },
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
          'x-nullable': true,
          'x-attrs': {
            field_type: 'chips',
            source: '/autosuggest/v1/keywords/',
            prefetch: [
              'source',
            ],
            order: 5,
            allow_unknown_entries: true,
            dynamic_autosuggest: true,
            set_label_language: true,
            placeholder: 'Enter keywords',
          },
        },
        texts: {
          title: 'Text',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'object',
                properties: {
                  source: {
                    type: 'string',
                    'x-attrs': {
                      hidden: true,
                    },
                  },
                  label: {
                    type: 'object',
                    properties: {
                      de: {
                        type: 'string',
                      },
                      en: {
                        type: 'string',
                      },
                      fr: {
                        type: 'string',
                      },
                    },
                    additionalProperties: false,
                  },
                },
                additionalProperties: false,
                title: 'type',
              },
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    language: {
                      type: 'object',
                      properties: {
                        source: {
                          type: 'string',
                          enum: [
                            'http://base.uni-ak.ac.at/portfolio/languages/ab',
                            'http://base.uni-ak.ac.at/portfolio/languages/aa',
                            'http://base.uni-ak.ac.at/portfolio/languages/af',
                            'http://base.uni-ak.ac.at/portfolio/languages/ak',
                            'http://base.uni-ak.ac.at/portfolio/languages/sq',
                            'http://base.uni-ak.ac.at/portfolio/languages/am',
                            'http://base.uni-ak.ac.at/portfolio/languages/ar',
                            'http://base.uni-ak.ac.at/portfolio/languages/an',
                            'http://base.uni-ak.ac.at/portfolio/languages/hy',
                            'http://base.uni-ak.ac.at/portfolio/languages/as',
                            'http://base.uni-ak.ac.at/portfolio/languages/av',
                            'http://base.uni-ak.ac.at/portfolio/languages/ae',
                            'http://base.uni-ak.ac.at/portfolio/languages/ay',
                            'http://base.uni-ak.ac.at/portfolio/languages/az',
                            'http://base.uni-ak.ac.at/portfolio/languages/bm',
                            'http://base.uni-ak.ac.at/portfolio/languages/ba',
                            'http://base.uni-ak.ac.at/portfolio/languages/eu',
                            'http://base.uni-ak.ac.at/portfolio/languages/be',
                            'http://base.uni-ak.ac.at/portfolio/languages/bn',
                            'http://base.uni-ak.ac.at/portfolio/languages/bh',
                            'http://base.uni-ak.ac.at/portfolio/languages/bi',
                            'http://base.uni-ak.ac.at/portfolio/languages/nb',
                            'http://base.uni-ak.ac.at/portfolio/languages/bs',
                            'http://base.uni-ak.ac.at/portfolio/languages/br',
                            'http://base.uni-ak.ac.at/portfolio/languages/bg',
                            'http://base.uni-ak.ac.at/portfolio/languages/my',
                            'http://base.uni-ak.ac.at/portfolio/languages/ca',
                            'http://base.uni-ak.ac.at/portfolio/languages/km',
                            'http://base.uni-ak.ac.at/portfolio/languages/ch',
                            'http://base.uni-ak.ac.at/portfolio/languages/ce',
                            'http://base.uni-ak.ac.at/portfolio/languages/ny',
                            'http://base.uni-ak.ac.at/portfolio/languages/zh',
                            'http://base.uni-ak.ac.at/portfolio/languages/cu',
                            'http://base.uni-ak.ac.at/portfolio/languages/cv',
                            'http://base.uni-ak.ac.at/portfolio/languages/kw',
                            'http://base.uni-ak.ac.at/portfolio/languages/co',
                            'http://base.uni-ak.ac.at/portfolio/languages/cr',
                            'http://base.uni-ak.ac.at/portfolio/languages/hr',
                            'http://base.uni-ak.ac.at/portfolio/languages/cs',
                            'http://base.uni-ak.ac.at/portfolio/languages/da',
                            'http://base.uni-ak.ac.at/portfolio/languages/dv',
                            'http://base.uni-ak.ac.at/portfolio/languages/nl',
                            'http://base.uni-ak.ac.at/portfolio/languages/dz',
                            'http://base.uni-ak.ac.at/portfolio/languages/en',
                            'http://base.uni-ak.ac.at/portfolio/languages/eo',
                            'http://base.uni-ak.ac.at/portfolio/languages/et',
                            'http://base.uni-ak.ac.at/portfolio/languages/ee',
                            'http://base.uni-ak.ac.at/portfolio/languages/fo',
                            'http://base.uni-ak.ac.at/portfolio/languages/fj',
                            'http://base.uni-ak.ac.at/portfolio/languages/fi',
                            'http://base.uni-ak.ac.at/portfolio/languages/fr',
                            'http://base.uni-ak.ac.at/portfolio/languages/ff',
                            'http://base.uni-ak.ac.at/portfolio/languages/gd',
                            'http://base.uni-ak.ac.at/portfolio/languages/gl',
                            'http://base.uni-ak.ac.at/portfolio/languages/lg',
                            'http://base.uni-ak.ac.at/portfolio/languages/ka',
                            'http://base.uni-ak.ac.at/portfolio/languages/de',
                            'http://base.uni-ak.ac.at/portfolio/languages/el',
                            'http://base.uni-ak.ac.at/portfolio/languages/gn',
                            'http://base.uni-ak.ac.at/portfolio/languages/gu',
                            'http://base.uni-ak.ac.at/portfolio/languages/ht',
                            'http://base.uni-ak.ac.at/portfolio/languages/ha',
                            'http://base.uni-ak.ac.at/portfolio/languages/he',
                            'http://base.uni-ak.ac.at/portfolio/languages/hz',
                            'http://base.uni-ak.ac.at/portfolio/languages/hi',
                            'http://base.uni-ak.ac.at/portfolio/languages/ho',
                            'http://base.uni-ak.ac.at/portfolio/languages/hu',
                            'http://base.uni-ak.ac.at/portfolio/languages/is',
                            'http://base.uni-ak.ac.at/portfolio/languages/io',
                            'http://base.uni-ak.ac.at/portfolio/languages/ig',
                            'http://base.uni-ak.ac.at/portfolio/languages/id',
                            'http://base.uni-ak.ac.at/portfolio/languages/ia',
                            'http://base.uni-ak.ac.at/portfolio/languages/ie',
                            'http://base.uni-ak.ac.at/portfolio/languages/iu',
                            'http://base.uni-ak.ac.at/portfolio/languages/ik',
                            'http://base.uni-ak.ac.at/portfolio/languages/ga',
                            'http://base.uni-ak.ac.at/portfolio/languages/it',
                            'http://base.uni-ak.ac.at/portfolio/languages/ja',
                            'http://base.uni-ak.ac.at/portfolio/languages/jv',
                            'http://base.uni-ak.ac.at/portfolio/languages/kl',
                            'http://base.uni-ak.ac.at/portfolio/languages/kn',
                            'http://base.uni-ak.ac.at/portfolio/languages/kr',
                            'http://base.uni-ak.ac.at/portfolio/languages/ks',
                            'http://base.uni-ak.ac.at/portfolio/languages/kk',
                            'http://base.uni-ak.ac.at/portfolio/languages/ki',
                            'http://base.uni-ak.ac.at/portfolio/languages/rw',
                            'http://base.uni-ak.ac.at/portfolio/languages/ky',
                            'http://base.uni-ak.ac.at/portfolio/languages/kv',
                            'http://base.uni-ak.ac.at/portfolio/languages/kg',
                            'http://base.uni-ak.ac.at/portfolio/languages/ko',
                            'http://base.uni-ak.ac.at/portfolio/languages/kj',
                            'http://base.uni-ak.ac.at/portfolio/languages/ku',
                            'http://base.uni-ak.ac.at/portfolio/languages/lo',
                            'http://base.uni-ak.ac.at/portfolio/languages/la',
                            'http://base.uni-ak.ac.at/portfolio/languages/lv',
                            'http://base.uni-ak.ac.at/portfolio/languages/li',
                            'http://base.uni-ak.ac.at/portfolio/languages/ln',
                            'http://base.uni-ak.ac.at/portfolio/languages/lt',
                            'http://base.uni-ak.ac.at/portfolio/languages/lu',
                            'http://base.uni-ak.ac.at/portfolio/languages/lb',
                            'http://base.uni-ak.ac.at/portfolio/languages/mk',
                            'http://base.uni-ak.ac.at/portfolio/languages/mg',
                            'http://base.uni-ak.ac.at/portfolio/languages/ms',
                            'http://base.uni-ak.ac.at/portfolio/languages/ml',
                            'http://base.uni-ak.ac.at/portfolio/languages/mt',
                            'http://base.uni-ak.ac.at/portfolio/languages/gv',
                            'http://base.uni-ak.ac.at/portfolio/languages/mi',
                            'http://base.uni-ak.ac.at/portfolio/languages/mr',
                            'http://base.uni-ak.ac.at/portfolio/languages/mh',
                            'http://base.uni-ak.ac.at/portfolio/languages/mn',
                            'http://base.uni-ak.ac.at/portfolio/languages/na',
                            'http://base.uni-ak.ac.at/portfolio/languages/nv',
                            'http://base.uni-ak.ac.at/portfolio/languages/nd',
                            'http://base.uni-ak.ac.at/portfolio/languages/nr',
                            'http://base.uni-ak.ac.at/portfolio/languages/ng',
                            'http://base.uni-ak.ac.at/portfolio/languages/ne',
                            'http://base.uni-ak.ac.at/portfolio/languages/se',
                            'http://base.uni-ak.ac.at/portfolio/languages/no',
                            'http://base.uni-ak.ac.at/portfolio/languages/nn',
                            'http://base.uni-ak.ac.at/portfolio/languages/oc',
                            'http://base.uni-ak.ac.at/portfolio/languages/oj',
                            'http://base.uni-ak.ac.at/portfolio/languages/or',
                            'http://base.uni-ak.ac.at/portfolio/languages/om',
                            'http://base.uni-ak.ac.at/portfolio/languages/os',
                            'http://base.uni-ak.ac.at/portfolio/languages/pi',
                            'http://base.uni-ak.ac.at/portfolio/languages/pa',
                            'http://base.uni-ak.ac.at/portfolio/languages/fa',
                            'http://base.uni-ak.ac.at/portfolio/languages/pl',
                            'http://base.uni-ak.ac.at/portfolio/languages/pt',
                            'http://base.uni-ak.ac.at/portfolio/languages/ps',
                            'http://base.uni-ak.ac.at/portfolio/languages/qu',
                            'http://base.uni-ak.ac.at/portfolio/languages/ro',
                            'http://base.uni-ak.ac.at/portfolio/languages/rm',
                            'http://base.uni-ak.ac.at/portfolio/languages/rn',
                            'http://base.uni-ak.ac.at/portfolio/languages/ru',
                            'http://base.uni-ak.ac.at/portfolio/languages/sm',
                            'http://base.uni-ak.ac.at/portfolio/languages/sg',
                            'http://base.uni-ak.ac.at/portfolio/languages/sa',
                            'http://base.uni-ak.ac.at/portfolio/languages/sc',
                            'http://base.uni-ak.ac.at/portfolio/languages/sr',
                            'http://base.uni-ak.ac.at/portfolio/languages/sn',
                            'http://base.uni-ak.ac.at/portfolio/languages/ii',
                            'http://base.uni-ak.ac.at/portfolio/languages/sd',
                            'http://base.uni-ak.ac.at/portfolio/languages/si',
                            'http://base.uni-ak.ac.at/portfolio/languages/sk',
                            'http://base.uni-ak.ac.at/portfolio/languages/sl',
                            'http://base.uni-ak.ac.at/portfolio/languages/so',
                            'http://base.uni-ak.ac.at/portfolio/languages/st',
                            'http://base.uni-ak.ac.at/portfolio/languages/es',
                            'http://base.uni-ak.ac.at/portfolio/languages/su',
                            'http://base.uni-ak.ac.at/portfolio/languages/sw',
                            'http://base.uni-ak.ac.at/portfolio/languages/ss',
                            'http://base.uni-ak.ac.at/portfolio/languages/sv',
                            'http://base.uni-ak.ac.at/portfolio/languages/tl',
                            'http://base.uni-ak.ac.at/portfolio/languages/ty',
                            'http://base.uni-ak.ac.at/portfolio/languages/tg',
                            'http://base.uni-ak.ac.at/portfolio/languages/ta',
                            'http://base.uni-ak.ac.at/portfolio/languages/tt',
                            'http://base.uni-ak.ac.at/portfolio/languages/te',
                            'http://base.uni-ak.ac.at/portfolio/languages/th',
                            'http://base.uni-ak.ac.at/portfolio/languages/bo',
                            'http://base.uni-ak.ac.at/portfolio/languages/ti',
                            'http://base.uni-ak.ac.at/portfolio/languages/to',
                            'http://base.uni-ak.ac.at/portfolio/languages/ts',
                            'http://base.uni-ak.ac.at/portfolio/languages/tn',
                            'http://base.uni-ak.ac.at/portfolio/languages/tr',
                            'http://base.uni-ak.ac.at/portfolio/languages/tk',
                            'http://base.uni-ak.ac.at/portfolio/languages/tw',
                            'http://base.uni-ak.ac.at/portfolio/languages/ug',
                            'http://base.uni-ak.ac.at/portfolio/languages/uk',
                            'http://base.uni-ak.ac.at/portfolio/languages/ur',
                            'http://base.uni-ak.ac.at/portfolio/languages/uz',
                            'http://base.uni-ak.ac.at/portfolio/languages/ve',
                            'http://base.uni-ak.ac.at/portfolio/languages/vi',
                            'http://base.uni-ak.ac.at/portfolio/languages/vo',
                            'http://base.uni-ak.ac.at/portfolio/languages/wa',
                            'http://base.uni-ak.ac.at/portfolio/languages/cy',
                            'http://base.uni-ak.ac.at/portfolio/languages/fy',
                            'http://base.uni-ak.ac.at/portfolio/languages/wo',
                            'http://base.uni-ak.ac.at/portfolio/languages/xh',
                            'http://base.uni-ak.ac.at/portfolio/languages/yi',
                            'http://base.uni-ak.ac.at/portfolio/languages/yo',
                            'http://base.uni-ak.ac.at/portfolio/languages/za',
                            'http://base.uni-ak.ac.at/portfolio/languages/zu',
                          ],
                          'x-attrs': {
                            hidden: true,
                          },
                        },
                        label: {
                          type: 'object',
                          properties: {
                            de: {
                              type: 'string',
                            },
                            en: {
                              type: 'string',
                            },
                            fr: {
                              type: 'string',
                            },
                          },
                          additionalProperties: false,
                        },
                      },
                      additionalProperties: false,
                    },
                    text: {
                      type: 'string',
                      title: 'text',
                    },
                  },
                  required: [
                    'text',
                  ],
                  additionalProperties: false,
                },
              },
            },
            additionalProperties: false,
          },
          'x-nullable': true,
          'x-attrs': {
            field_type: 'multiline',
            source_type: '/autosuggest/v1/texttypes/',
            prefetch: [
              'source_type',
            ],
            order: 4,
            placeholder: 'Enter text',
          },
        },
        published: {
          title: 'Published',
          type: 'boolean',
          'x-attrs': {
            hidden: true,
          },
        },
      },
      selectionList: [
        { label: 'Option 1', value: 'option 1' },
        { label: 'Option 2', value: 'option 2' },
        { label: 'Option 3', value: 'option 3' },
        { label: 'Option 4', value: 'option 4' },
        { label: 'Option 44444444444444444444', value: 'option 4466' },
        { label: 'Option 44444444444444444444', value: 'option 4455' },
        { label: 'Option 44444444444444444444', value: 'option 44166' },
        { label: 'Option 44444444444444444444', value: 'option 44143' },
        { label: 'Option 44444444444444444444', value: 'option 4412' },
        { label: 'Option 44444444444444444444', value: 'option 4490' },
        { label: 'Option 44444444444444444444', value: 'option 449' },
        { label: 'Option 44444444444444444444', value: 'option 448' },
        { label: 'Option 44444444444444444444', value: 'option 447' },
        { label: 'Option 44444444444444444444', value: 'option 446' },
        { label: 'Option 44444444444444444444', value: 'option 445' },
        { label: 'Option 44444444444444444444', value: 'option 443' },
        { label: 'Option 44444444444444444444', value: 'option 444' },
        { label: 'Option 44444444444444444444', value: 'option 442' },
        { label: 'Option 44444444444444444444', value: 'option 441' },
      ],
      selectedVal: {},
      newEntity: {
        title: '',
        subtitle: '',
        type: '',
      },
      selectedList: ['Leo Löwenthal', 'Eike Geisel', 'Theodor Adorno'],
      chipsInput: [],
      dropDownInput: [
        '...alle Verhältnisse umzuwerfen',
        'in denen der Mensch',
        'ein erniedrigtes, ein geknechtetes',
        'ein verlassenes, ein verächtliches',
        'Wesen ist'],
      menuEntryActive: false,
      showCheckbox: false,
      showPopUp: false,
      files: [],
      elements: [],
      multilineInput: 'test',
      multilineTest: '',
      selectable: false,
      progress: 0,
      autocompleteInput: 'testtttttttttttt',
      inputDate: {
        date_from: '2019',
        date_to: '',
      },
      inputDateTime: {
        date: '12.12.2019',
        time: '',
      },
      multilineInputObj: {
        English: 'testeng',
        German: 'testger',
      },
      langTab: 'English',
      list: [
        {
          id: '1',
          title: 'On a lovely Summers Day',
          active: false,
          type: 'Wissenschaftliche Abhandlungggggggggggggggggg',
          selected: false,
          shared: true,
          error: true,
        },
        {
          id: '2',
          title: 'Oh this hot hot heat',
          active: false,
          type: '',
          selected: false,
        },
        {
          id: '3',
          title: 'And then again a different title',
          active: false,
          type: 'Ausstellung',
          selected: false,
          shared: true,
        },
        {
          id: '4',
          title: 'Allons-y!eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee!',
          active: false,
          type: 'Bild',
          selected: false,
        },
      ],
      hoverboxContent: {},
      togglePreview: false,
      value12: '',
    };
  },
  computed: {
    multiline: {
      get() {
        return this.langTab === 'English' ? this.multilineInputObj[0].value : this.multilineInputObj[1].value;
      },
      set(event) {
        if (event.tab === 'English') {
          this.$set(this.multilineInputObj[0], 'value', event.val);
        } else {
          this.$set(this.multilineInputObj[1], 'value', event.val);
        }
      },
    },
  },
  watch: {
    async autocompleteInput(val) {
      if (!val || val.length > 3) {
        const result = await axios.get('http://localhost:9900/fetch', {
          params:
            {
              string: val,
            },
        });
        this.dropDownInput = result.data;
      }
    },
  },
  methods: {
    entrySelected({ entryId, selected }) {
      if (selected && !this.selectedBoxes.includes(entryId)) {
        this.selectedBoxes.push(entryId);
      } else if (!selected) {
        this.selectedBoxes = this.selectedBoxes.filter(boxId => boxId !== entryId);
      }
    },
    selectEntries(selectAll) {
      if (selectAll) {
        this.selectedBoxes = this.entriesList.map(entry => entry.id);
      } else {
        this.selectedBoxes = [];
      }
    },
    setHoverBox(val, entry) {
      if (val) {
        console.log(entry);
        this.hoverboxContent = { title: 'test' };
      } else {
        this.hoverboxContent = {};
      }
    },
    changeProgress() {
      if (this.progress <= 0.75) {
        this.progress += 0.25;
      } else {
        this.progress = 0;
      }
    },
    enableSelect() {
      this.selectable = !this.selectable;
    },
    triggerInput(val) {
      console.log(val);
    },
    changeInput() {
      const index = Math.floor((Math.random() * 10) + 1);
      this.chipsInput = ['test1', 'test2', 'test3', 'test4', 'test5',
        'test6', 'test7', 'test8', 'test9', 'test10'].splice(index, 2);
      this.multilineInput = ['test1', 'test2', 'test3', 'test4', 'test5',
        'test6', 'test7', 'test8', 'test9', 'test10'].splice(index, 1);
    },
    boxClicked() {
      console.log('clicked');
    },
    buttonTriggered(event) {
      if (event === 'buttonLeft') {
        this.showPopUp = false;
      }
    },
    dropped(e) {
      if (e.dataTransfer && e.dataTransfer.files.length) {
        for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
          this.files.push(e.dataTransfer.files[i]);
        }
      } else {
        const id = e;
        if (!this.elements.find(item => item.id === id)) {
          this.elements.push(this.list.find(item => item.id === id));
        }
      }
    },
    activateMenuEntry(index) {
      // TODO: this should be a functionality INSIDE menu list!!
      if (!this.list[index].active) {
        this.list.forEach(item => this.$set(item, 'active', false));
        this.$set(this.list[index], 'active', true);
      } else {
        this.$set(this.list[index], 'active', false);
      }
    },
    async fetch(string) {
      if (!string.value || string.value.length > 3) {
        const result = await axios.get('http://localhost:9900/fetch', {
          params:
            {
              string: string.value,
            },
        });
        this.dropDownInput = result.data;
      }
    },
    tabSwitched(val) {
      this.langTab = val;
    },
    fetchOther(value, type) {
      console.log(value);
      console.log(type);
    },
  },
};
</script>

<style lang="scss">
  @import "./styles/variables.scss";

  .dropdown-extended {
    border-top: $separation-line;
    padding: $spacing;

    .show-more-toggle {
      color: $app-color;
    }
  }

  .canvas {
    padding: 16px;
  }

  .flex {
    display: flex;
  }

  .row {
    max-height: 300px;
  }

  div > .base-box-button {
    margin: 8px;
  }

  button {
    display:block;
  }

  .popup-text {
    display: flex;
    align-items: flex-end;
  }

  .popup-text > div:first-of-type {
    margin-right: 16px;
  }

  .form-field {
    background-color: white;
    padding: 16px;
    margin-bottom: 32px;
  }

  .image-box {
    margin: 8px;
  }

  .multiline-dropdown {
    margin-bottom: -4px;
  }
  .spacer {
    height: 300px;
  }

  .result-box {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .result-box:nth-of-type(2n), .result-box:nth-of-type(3n) {
    margin-left: 16px;
  }
</style>
