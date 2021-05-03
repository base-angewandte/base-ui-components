<template>
  <div id="app">
    <base-carousel
      :items="carousel"
      :swiper-options="{
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 15,
        loop: carousel.length > 3,
        speed: 750,
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          1024: {
            slidesPerView: carousel.length < 3 ? 2 : 3,
            slidesPerGroup: carousel.length < 3 ? 2 : 3,
          },
        },
      }" />

    <div>
      <BaseImage
        :lazyload="true"
        alt="Source: https://placeimg.com"
        src="https://placeimg.com/1800/1200/tech/grayscale" />
    </div>
    <h1>BaseDetailBox bbb</h1>
    <div class="background">
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }">
        <p class="example-text">
          Example Content
        </p>
      </base-box>
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }" />
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }" />
      <base-box
        :box-size="{ width: 'calc(25% - 12px)' }" />
    </div>
    <BaseDetailBox
      :data="[{
                label: {
                  de: 'Telefon',
                  en: 'Telephone',
                },
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
      ]"
      language="en" />

    <BaseMap
      :lat-long="[
        '48.208370',
        '16.384510',
      ]"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      class="base-map" />
    <BaseExpandBox>
      <div class="base-expand-box-columns">
        <div class="base-expand-box-column">
          <BaseTextList
            render-label-as="h2"
            :data="data.column1" />
        </div>
        <div class="base-expand-box-column">
          <BaseTextList
            render-label-as="h2"
            :data="data.column2" />
        </div>
      </div>
    </BaseExpandBox>
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
    <!-- BaseDatePanel -->
    <div
      style="max-width: 1000px; margin: 50px auto;
      display: flex; justify-content: space-between;">
      <BaseDatePanel
        v-model="baseDatePanelInput"
        language="de"
        label="Select a date"
        type="date" />

      <base-date-panel
        label="Select a date"
        type="week"
        :input="{ date: '2020-04-29' }"
        :show-label="false"
        :is-inline="true"
        @selected="baseDatePanelSelected($event)" />

      <base-date-panel
        label="Select a date"
        type="week"
        :icon-position="'right'"
        @selected="baseDatePanelSelected($event)" />
    </div>

    <!-- BASE EXPAND ROW TEST -->
    <BaseExpandRow
      :is-expanded="true"
      label="looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        ooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
      icon="camera"
      class="base-expand-row">
      <p>
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam,
        quis nostrud exercitation ullamco labos
      </p>
    </BaseExpandRow>

    <!-- VIDEO TEST -->
    <!-- <video
      width="320"
      height="240"
      controls >
      <source
        src="/home/shauzmayer/index.m3u8"
        type="application/x-mpegURL">
      Your browser does not support the video tag.
    </video> -->
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

    <div class="form-field">
      <BaseProgressBar
        :progress="progress"
        file-name="looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        ooooooooooooooooong" />
      <div :style="{ height: '30px' }" />
      <!-- UPLOAD BAR TEST -->
      <base-button
        :active="false"
        :text="'Change Progress'"
        icon-size="large"
        button-style="row"
        @clicked="changeProgress" />
    </div>
    <div class="spacer" />

    <div class="canvas flex">
      <!-- BASE IMAGE BOX TEST -->
      <BaseImageBox
        :selectable="selectable"
        :box-text="boxText"
        description="Bildserie"
        title="Afterlife II Ausstellungsansichten"
        class="image-box" />
      <BaseImageBox
        :selectable="selectable"
        :show-title="false"
        image-url="https://placeimg.com/460/341/animal"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <BaseImageBox
        :selectable="selectable"
        image-url="https://placeimg.com/460/341/tech"
        title="Afterlife II Ausstellungsansichten"
        description="Bildserie"
        class="image-box" />
      <BaseButton
        :active="false"
        :text="'Activate Select'"
        icon-size="large"
        button-style="row"
        @clicked="enableSelect()" />
      <BaseButton
        :text="'Add Text'"
        @clicked="boxText = ['test', 'test2', 'test3', 'test4', 'test5', 'test6']" />
    </div>

    <div class="canvas">
      <!-- MULTILINE WITH TABS TEST -->
      <BaseMultilineTextInput
        v-model="textInput"
        :tabs="['English', 'German']"
        label="Multiline Label Tabs"
        placeholder="Enter Text here" />
      <base-multiline-text-input
        v-model="multilineInputObj"
        :label="'Label'"
        :tabs="['German', 'English']"
        :placeholder="'Enter Text'"
        @tab-switch="tabSwitched">
        <div class="multiline-dropdown">
          <base-drop-down
            :selected-option="{ label: 'Textart', value: '' }"
            :options="[{
                         value: 'Beschreibung',
                         label: 'Beschreibung',
                       },
                       {
                         value: 'Ausstellungseinladung',
                         label: 'Ausstellungseinladung',
                       },
                       {
                         label: 'Textart',
                         value: '',
                       },
                       {
                         value: 'Zeitungsartikel',
                         label: 'Zeitungsartikel',
                       }]" />
        </div>
      </base-multiline-text-input>
      <base-multiline-text-input
        :input="multilineTest"
        :label="'Label'"
        :placeholder="'Enter Text'"
        @text-input="handleMultilineInput" />
    </div>

    <!-- SEARCH TEST -->
    <div class="canvas">
      <base-search
        :show-image="true"
        @input="triggerInput" />
    </div>

    <!-- FORM FIELD TESTING -->
    <div class="form-field">
      <base-date-input
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
        id="set your marx"
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
      <!--
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
        :allow-multiple-entries="true">
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
        @hoverbox-active="setHoverBox" /> -->
    </div>

    <!-- MENU LIST TEST -->
    <base-menu-list
      :selected="showCheckbox"
      :list="list"
      @clicked="activateMenuEntry" />
    <base-menu-entry
      :entry-id="'asingleentry'"
      :icon="'sheet-empty'"
      :active="menuEntryActive"
      :select-active="showCheckbox"
      :is-selectable="true"
      :thumbnails="['attention', 'people']"
      title="Poesie oh Poesisssssssssssssssssssssssssssssssssse"
      subtext="Aus einer anderen Weltsssssssssssssssssssssssssss"
      description="Gemälde"
      @clicked="menuEntryActive = true" />
    <base-button
      text="toggle checkboxes"
      button-style="row"
      @clicked="showCheckbox = !showCheckbox" />

    <!-- DROP BOX TEST -->
    <div class="flex row">
      <base-drop-box
        :show-plus="true"
        :box-size="{ width: 'calc(25% - 16px)' }"
        drop-type="elements"
        drop-element-name="menuEntry"
        drag-item-class="base-menu-list__list-entry"
        icon="camera"
        text="Datei hinzufügen"
        subtext="(Click oder durch drag'n drop hinzufügen)"
        @dropped-element="dropped($event)"
        @clicked="boxClicked" />
      <base-drop-box
        drop-type="files" />
    </div>
    <div>
      <ul>
        <li
          v-for="item in elements"
          :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>

    <!-- POP UP TEST -->
    <base-button
      draggable="true"
      icon="options-menu"
      @clicked="showPopUp = true" />
    <base-pop-up
      :show="showPopUp"
      title="Bild entfernen"
      button-left-text="Cancel"
      button-right-text="Submit"
      @clicked="buttonTriggered"
      @close="showPopUp = false">
      <div>
        Test Create Entity
      </div>
      <div class="popup-text">
        <base-input
          :label="'Test1'"
          field-type="number"
          placeholder="Enter your Name" />
        <base-input
          :label="'Test'"
          field-type="text"
          placeholder="Enter your Name" />
      </div>
      <div class="popup-text">
        <base-drop-down
          :label="'select type'"
          :option-selected="{ label: 'Alle Typen', value: '' }"
          :options="[
            { label: 'Alle Typen', value: '' },
            { label: 'Bild', value: 'picture' },
            { label: 'Publikation', value: 'publication' },
            { label: 'Film/Videobbbbbbbbbbbbb', value: 'movie'},
          ]"
          :header-background-color="'rgb(240, 240, 240)'" />
        <base-drop-down
          :label="'select type'"
          :option-selected="{ label: 'Alle Typen', value: '' }"
          :options="[
            { label: 'Alle Typen', value: '' },
            { label: 'Bild', value: 'picture' },
            { label: 'Publikation', value: 'publication' },
            { label: 'Film/Videobbbbbbbbbbbbb', value: 'movie'},
          ]"
          :header-background-color="'rgb(240, 240, 240)'" />
      </div>
    </base-pop-up>

    <!-- DROP DOWN TEST -->
    <base-drop-down
      v-model="selectedVal"
      :label="'select type'"
      :show-label="true"
      :options="selectionList" />
    <base-drop-down
      :options="selectionList" />
    <div class="spacer" />
  </div>
</template>

<script>
import axios from 'axios';

import BaseBox from '@/components/BaseBox/BaseBox';
import BaseMenuEntry from '@/components/BaseMenuEntry/BaseMenuEntry';
import BasePopUp from '@/components/BasePopUp/BasePopUp';
import BaseDropDown from '@/components/BaseDropDown/BaseDropDown';
import BaseInput from '@/components/BaseInput/BaseInput';
import BaseDropBox from '@/components/BaseDropBox/BaseDropBox';
import BaseMenuList from '@/components/BaseMenuList/BaseMenuList';
import BaseChipsInput from '@/components/BaseChipsInput/BaseChipsInput';
import BaseSearch from '@/components/BaseSearch/BaseSearch';
import BaseMultilineTextInput from '@/components/BaseMultilineTextInput/BaseMultilineTextInput';
// import BaseAutocompleteInput from '@/components/BaseAutocompleteInput/BaseAutocompleteInput';
// import BaseChipsBelow from '@/components/BaseChipsBelow/BaseChipsBelow';
import BaseDateInput from '@/components/BaseDateInput/BaseDateInput';
import BaseDatePanel from '@/components/BaseDatePanel/BaseDatePanel';
import BasePagination from '@/components/BasePagination/BasePagination';
import BaseMediaPreview from '@/components/BaseMediaPreview/BaseMediaPreview';
import BaseForm from '@/components/BaseForm/BaseForm';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseImageBox from '@/components/BaseImageBox/BaseImageBox';
import BaseToggle from '@/components/BaseToggle/BaseToggle';
import BaseResultBoxSection from '@/components/BaseResultBoxSection/BaseResultBoxSection';
import BaseProgressBar from '@/components/BaseProgressBar/BaseProgressBar';
import BaseCarousel from '@/components/BaseCarousel/BaseCarousel';
import BaseMap from '@/components/BaseMap/BaseMap';
import BaseTextList from '@/components/BaseTextList/BaseTextList';
import BaseExpandBox from '@/components/BaseExpandBox/BaseExpandBox';
import BaseDetailBox from '@/components/BaseDetailBox/BaseDetailBox';
import BaseExpandRow from '@/components/BaseExpandRow/BaseExpandRow';
import BaseImage from '@/components/BaseImage/BaseImage';

export default {
  name: 'App',
  components: {
    BaseImage,
    BaseResultBoxSection,
    BaseForm,
    BaseExpandRow,
    BaseMediaPreview,
    BasePagination,
    // BaseChipsBelow,
    BaseDateInput,
    BaseDatePanel,
    // BaseAutocompleteInput,
    BaseImageBox,
    BaseMultilineTextInput,
    BaseSearch,
    BaseChipsInput,
    BaseMenuList,
    BaseMenuEntry,
    BaseDropDown,
    BasePopUp,
    BaseInput,
    BaseButton,
    BaseDropBox,
    BaseDetailBox,
    BaseToggle,
    BaseProgressBar,
    BaseCarousel,
    BaseMap,
    BaseExpandBox,
    BaseTextList,
    BaseBox,
  },
  data() {
    return {
      boxText: [],
      textInput: {
        English: 'Text Set from Outside',
        German: '',
      },
      activeAction: '',
      data: {
        column1: [{
          label: 'Description',
          data: `Lorem ipsum dolor sit amet, conseteturasdfddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            `,
        },
        {
          label: 'Description',
          data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          `,
        },
        {
          label: 'Vero eos et accusam',
          data: [
            {
              label: 'www',
              value: 'http://base.uni-ak.ac.at',
              url: 'http://base.uni-ak.ac.at',
            },
            {
              label: 'email',
              value: 'base@uni-ak.ac.at',
              url: 'mailto:base@uni-ak.ac.at',
            },
          ],
        },
        {
          label: 'Vero eos et accusam asdfddddddddddddddddddddfffffffffdddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffffffffffffffff ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          data: [
            {
              label: 'www',
              value: 'http://base.uni-ak.ac.at',
              url: 'http://base.uni-ak.ac.at',
            },
            {
              label: 'email',
              value: 'base@uni-ak.ac.at',
              url: 'mailto:base@uni-ak.ac.at',
            },
          ],
        },
        ],
        column2: [{
          label: 'Vero eos et accusam',
          data: 'no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        },
        {
          label: 'Vero eos et accusam',
          data: [
            'Lorem ipsum dolor sit amet',
            'Consetetur sadipscing elitr, sed diam nonumy',
            'Eirmod tempor invidunt',
            'Eirmod tempor inviduntddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'Eirmod tempor invidunt',
            'Eirmod tempor invidunt',
          ],
        },
        {
          label: 'Vero eos et accusam',
          data: [
            'Lorem ipsum dolor sit amet',
            'Consetetur sadipscing elitr, sed diam nonumy',
            'Eirmod tempor invidunt',
            'Eirmod tempor inviduntddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'Eirmod tempor invidunt',
            'Eirmod tempor invidunt',
          ],
        },
        {
          label: 'Vero eos et accusam',
          data: [
            'Lorem ipsum dolor sit amet',
            'Consetetur sadipscing elitr, sed diam nonumy',
            'Eirmod tempor invidunt',
            'Eirmod tempor inviduntddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'Eirmod tempor invidunt',
            'Eirmod tempor invidunt',
          ],
        },
        ],
      },
      entriesList: [
        {
          id: 'pCSLggvdsi8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'An extra extra long title',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          // eslint-disable-next-line global-require
          imageUrl: require('@/../dev-docs/assets/images/img1.png'),
        },
        {
          id: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Unknown',
          subtitle: 'Lets find it out and look deeper',
          description: 'Novel',
          // eslint-disable-next-line global-require
          imageUrl: require('@/../dev-docs/assets/images/img1.png'),
        },
        {
          id: 'pCSLggvdsi8b3fffzRTLM4dJR',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'TBD',
          subtitle: 'Misterious',
          text: ['Random text 1', 'Random text 2', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
        },
      ],
      selectedBoxes: [],
      baseDatePanelInput: { date: '' },
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
        {
          id: '1qw5qwwee',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '15555wqw',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1eeee55',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1rqqwereee',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1ffaerewr',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1ffa',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1ffffdas',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1adafsdf',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1aaa',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '1ddd',
          value: '...alle Verhältnisse umzuwerfen',
        },
        {
          id: '2',
          value: 'in denen der Mensch',
        },
        {
          id: '3',
          value: 'ein erniedrigtes, ein geknechtetes',
        },
        {
          id: '4',
          value: 'ein verlassenes, ein verächtliches',
        },
        {
          id: '5',
          value: 'Wesen ist',
        }],
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
      carousel: [
        {
          uid: '1',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 1',
          additional: '07.05.2020 - 21.05.2020',
          // eslint-disable-next-line global-require
          imageUrl: 'https://placeimg.com/460/341/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              // eslint-disable-next-line global-require
              '460w': 'https://placeimg.com/460/341/animal',
            },
            {
              // eslint-disable-next-line global-require
              '640w': 'https://placeimg.com/640/480/animal',
            },
            {
              // eslint-disable-next-line global-require
              '768w': 'https://placeimg.com/768/576/animal',
            },
          ],
        },
        {
          uid: '2',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 2',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/tech',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/tech',
            },
            {
              '640w': 'https://placeimg.com/640/480/tech',
            },
            {
              '768w': 'https://placeimg.com/768/576/tech',
            },
          ],
        },
        {
          uid: '3',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 3',
          // additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/nature',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/nature',
            },
            {
              '640w': 'https://placeimg.com/640/480/nature',
            },
            {
              '768w': 'https://placeimg.com/768/576/nature',
            },
          ],
        },
        {
          uid: '4',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung 4',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/animal',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/animal',
            },
            {
              '640w': 'https://placeimg.com/640/480/animal',
            },
            {
              '768w': 'https://placeimg.com/768/576/animal',
            },
          ],
        },
        {
          uid: '5',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/people',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/people',
            },
            {
              '640w': 'https://placeimg.com/640/480/people',
            },
            {
              '768w': 'https://placeimg.com/768/576/people',
            },
          ],
        },
        {
          uid: '6',
          title: 'Title',
          subtext: 'Subtitle',
          description: 'Austellung',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/641/480/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/461/341/arch',
            },
            {
              '640w': 'https://placeimg.com/641/480/arch',
            },
            {
              '768w': 'https://placeimg.com/769/576/arch',
            },
          ],
        },
      ],
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
    baseDatePanelSelected(val) {
      console.log('baseDatePanelSelected', val);
    },
    handleMultilineInput(val) {
      console.log(val);
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
      if (this.progress < 100) {
        this.progress += 5;
      } else {
        this.progress = 80;
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
  @import "../src/styles/variables";

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

  .base-map {
    height: 400px;
  }

  .base-expand-row {
    margin: 16px;
  }
  .background {
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(240, 240, 240);
    padding: 16px;
  }

  .base-box {
    margin-right: 16px;
  }

  .base-box:nth-of-type(4n) {
    margin-right: 0;
  }

  .example-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
