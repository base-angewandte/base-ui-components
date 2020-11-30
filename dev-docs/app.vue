<template>
  <div
    id="app"
    style="max-width: 1400px; margin: 0 auto;">
    <BaseResultBoxSection
      v-if="editMode"
      v-model="entriesList"
      :action="activeAction"
      :is-loading="false"
      :selected-list="selectedBoxes"
      :show-options="true"
      :draggable="true"
      :edit-mode.sync="editMode"
      :option-button-text="{ delete: 'delete linked', drag: 'drag' }"
      :action-button-text="{ delete: 'delete', drag: 'done' }"
      :show-action-button-box="true"
      :show-edit-mode-return-button="false"
      cancel-text="cancel"
      header-text="Activity Showcase"
      @entry-selected="entrySelected"
      @all-selected="selectEntries($event)"
      @cancel-action="activeAction = ''"
      @set-action="activeAction = $event"
      @submit-action="activeAction = ''"
      @entries-changed="activeAction = ''">
      <template #header>
        <h3 class="activity-showcase__header">
          Activity Showcase
        </h3>
      </template>
      <template #optionButtons="scope">
        <BaseButton
          :text="'add Album'"
          icon-size="large"
          icon="collection"
          button-style="single"
          @clicked="scope.setAction('delete')" />
        <BaseButton
          :text="'add Activity'"
          icon-size="large"
          icon="sheet-empty"
          button-style="single"
          @clicked="scope.setAction('delete')" />
        <BaseButton
          :text="'delete'"
          icon-size="large"
          icon="waste-bin"
          button-style="single"
          @clicked="scope.setAction('delete')" />
      </template>
      <template #actionButtons>
        <BaseBoxButton
          :text="'Add Album'"
          :box-size="{ width: 'auto' }"
          :show-plus="true"
          icon="collection"
          box-style="large"
          box-type="button"
          class="base-result-box-section__box" />
        <BaseBoxButton
          :text="'Add Activity'"
          :box-size="{ width: 'auto' }"
          :show-plus="true"
          icon="sheet-empty"
          box-style="large"
          box-type="button"
          class="base-result-box-section__box" />
      </template>
    </BaseResultBoxSection>
    <template
      v-else>
      <div class="activity-showcase">
        <h3 class="activity-showcase__header">
          Activity Showcase
        </h3>
        <BaseButton
          icon="edit"
          text="edit"
          @clicked="editMode = true" />
      </div>
      <base-carousel
        :items="entriesList"
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
        }"
        identifier-property-name="id" />
    </template>
    <BaseResultBoxSection
      :entry-list="entriesList"
      :is-loading="false"
      :show-options="true"
      :show-header="true"
      :draggable="true"
      :max-show-more-rows="1"
      :use-expand-mode="true"
      :use-pagination="true"
      :show-action-button-boxes="true"
      :max-rows="2"
      @submit-action="test">
      <template #header>
        <div :style="{ display: 'flex' }">
          <h3 class="activity-showcase__header">
            Results
          </h3>
          <span> (30)</span>
        </div>
      </template>
      <template #optionButtons="scope">
        <BaseButton
          :text="'add Album'"
          icon-size="large"
          icon="collection"
          button-style="single"
          @clicked="scope.submitAction('delete')" />
        <BaseButton
          :text="'add Activity'"
          icon-size="large"
          icon="sheet-empty"
          button-style="single"
          @clicked="scope.submitAction('delete')" />
        <BaseButton
          :text="'delete'"
          icon-size="large"
          icon="waste-bin"
          button-style="single"
          @clicked="scope.submitAction('delete')" />
      </template>
    </BaseResultBoxSection>
    <BaseResultBoxSection
      :entry-list="entriesList"
      :is-loading="false"
      :show-options="true"
      :show-header="true"
      :draggable="true"
      :max-show-more-rows="1"
      :use-expand-mode="true"
      :max-rows="5">
      <template #header>
        <h3 class="activity-showcase__header">
          Results
        </h3>
        <span>(30)</span>
      </template>
    </BaseResultBoxSection>
  </div>
</template>

<script>
// import axios from 'axios';
import axios from 'axios';
import BaseButton from '@/components/BaseButton/BaseButton';
import BaseCarousel from '@/components/BaseCarousel/BaseCarousel';
import BaseBoxButton from '@/components/BaseBoxButton/BaseBoxButton';
import BaseResultBoxSection from '@/components/BaseResultBoxSection/BaseResultBoxSection';

export default {
  name: 'App',
  components: {
    BaseResultBoxSection,
    BaseCarousel,
    BaseButton,
    BaseBoxButton,
  },
  data() {
    return {
      filterType: {
        label: 'all types',
        source: '',
      },
      sortParam: {
        label: 'date modified',
        value: 'date_modified',
      },
      toggleList: false,
      editExpandList: false,
      baseExpandList: [
        {
          label: 'Monographien',
          visible: true, // TODO: define naming, maybe 'hidden' better
          data: [
            {
              label: 'Beiträge in Sammelband',
              data: [
                {
                  value: '1 qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  id: '29', // TODO: should be id (change in open-api-definition)
                  href: '#',
                },
                {
                  value: '2 animi voluptates',
                  attributes: [
                    'ut eum et',
                    'quis odit est',
                  ],
                  id: '31',
                  href: '#',
                },
                {
                  value: '3 officiis quisquam',
                  attributes: [
                    'qui et sit',
                    'occaecati facere temporibus',
                  ],
                  id: '44',
                  href: '#',
                },
                // {
                //   label: 'Sammelbände',
                //   data: [
                //     {
                //       value: '1 qui reiciendis',
                //       attributes: [
                //         'rerum corporis voluptatibus',
                //         'beatae occaecati non',
                //       ],
                //       id: '19',
                //       href: '#',
                //     },
                //   ],
                // },
              ],
            },
            {
              label: 'Konferenzbeiträge',
              data: [
                {
                  value: '1 qui reiciendis',
                  attributes: [
                    'rerum corporis voluptatibus',
                    'beatae occaecati non',
                  ],
                  id: '19',
                  href: '#',
                },
                {
                  value: '2 quia quisquam',
                  attributes: [
                    'quae laudantium expedita',
                    'maxime omnis accusamus',
                  ],
                  id: '28',
                  href: '#',
                },
                {
                  value: '3 qui nesciunt',
                  attributes: [
                    'molestiae commodi ipsum',
                    'eos dolorem in',
                  ],
                  id: '29',
                  href: '#',
                },
              ],
            },
          ],
        },
        {
          label: 'Film/Video',
          visible: true,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              id: '8',
              href: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              id: '24',
              href: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              id: '26',
              href: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              id: '50',
              href: '#',
            },
          ],
        },
        {
          label: 'Audio',
          visible: true,
          data: [
            {
              value: 'sed et',
              attributes: [
                'est quos sed',
                'sed molestiae veritatis',
              ],
              id: '5',
              href: '#',
            },
            {
              value: 'quis quis',
              attributes: [
                'non possimus possimus',
                'nobis recusandae sed',
              ],
              id: '20',
              href: '#',
            },
            {
              value: 'mollitia quo',
              attributes: [
                'non magnam eius',
                'harum exercitationem non',
              ],
              id: '48',
              href: '#',
            },
          ],
        },
        {
          label: 'Preise und Stipendien',
          visible: true,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              id: '8',
              href: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              id: '24',
              href: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              id: '26',
              href: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              id: '50',
              href: '#',
            },
          ],
        },
        {
          label: 'Konferenzen & Symposien',
          visible: true,
          data: [
            {
              value: 'qui fugit',
              attributes: [
                'consequatur consequatur ipsa',
                'et sunt delectus',
              ],
              id: '8',
              href: '#',
            },
            {
              value: 'molestiae error',
              attributes: [
                'nobis voluptatibus quae',
                'iusto et voluptate',
              ],
              id: '24',
              href: '#',
            },
            {
              value: 'cum ut',
              attributes: [
                'sed ut perferendis',
                'velit dicta voluptatem',
              ],
              id: '26',
              href: '#',
            },
            {
              value: 'totam tenetur',
              attributes: [
                'laudantium temporibus cupiditate',
                'ducimus quos quia',
              ],
              id: '50',
              href: '#',
            },
          ],
        },
      ],
      currentFilter: null,
      fieldValueInt: [],
      fetchDropDownList: [],
      autocompleteRequestOngoing: false,
      editMode: false,
      textInput: {
        English: 'Text Set from Outside',
        German: '',
      },
      activeAction: '',
      entriesList: [
        {
          id: 'pCSLggvdsi8asfdsrruuurrrdfb3dddzRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 1',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          // eslint-disable-next-line global-require
          uid: '1',
          subtext: 'Subtitle',
          additional: '07.05.2020 - 21.05.2020',
          // eslint-disable-next-line global-require
          imageUrl: 'https://placeimg.com/460/341/grayscale',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              // eslint-disable-next-line global-require
              '460w': 'https://placeimg.com/460/341/grayscale',
            },
            {
              // eslint-disable-next-line global-require
              '640w': 'https://placeimg.com/640/480/grayscale',
            },
            {
              // eslint-disable-next-line global-require
              '768w': 'https://placeimg.com/768/576/grayscale',
            },
          ],
        },
        {
          id: 'pCSLggvdsi8asfdsrruuurrrdfb3zRTLM4dJR',
          type: 'album',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 2 extra looooong',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
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
          id: 'pCSLgasdfgvdsi8asfdsrrrrrdfb3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 3',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/arch',
            },
            {
              '640w': 'https://placeimg.com/640/480/arch',
            },
            {
              '768w': 'https://placeimg.com/768/576/arch',
            },
          ],
        },
        {
          id: 'pCSLggvdsi8aasdsfdsrrrrrdfb3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 4',
          subtitle: 'A test',
          description: 'Performance',
          additional: '07.05.2020 - 21.05.2020',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
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
          id: 'pCSLggvdsi8asfdsrrrasrrdfb3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 5',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
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
          id: 'pCSLggvdsi8asfdsrrrrdsrdfb3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 6',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          additional: '07.05.2020 - 21.05.2020',
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
              '768w': 'https://placeimg.com/768/576/tech',
            },
          ],
        },
        {
          id: 'pCSLggvdsi8asfdsrrrrrdfb3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 6',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
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
          id: 'pCSLggvdsi8asfdsdfb3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 7',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          // eslint-disable-next-line global-require
          imageUrl: require('@/../dev-docs/assets/images/img1.png'),
          additional: '07.05.2020 - 21.05.2020',
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
          id: 'pCSLggvdsi8basdfsssssadf3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'An extra extra long title',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
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
          id: 'pCSLggvdsddddi8b3zRTLM4dJR',
          type: 'album',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 8',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          additional: '07.05.2020 - 21.05.2020',
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
          id: 'pCSLggvdsi8b3zRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Title 9',
          subtitle: 'A test',
          description: 'Performance',
          source: 'http://base.uni-ak.ac.at/portfolio/taxonomy/album',
          additional: '07.05.2020 - 21.05.2020',
          imageUrl: 'https://placeimg.com/640/480/arch',
          href: 'http://base.uni-ak.ac.at',
          previews: [
            {
              '460w': 'https://placeimg.com/460/341/arch',
            },
            {
              '640w': 'https://placeimg.com/640/480/arch',
            },
            {
              '768w': 'https://placeimg.com/768/576/arch',
            },
          ],
        },
        {
          id: 'pCSLggvdsiasdf8b3zRTLM4dJR',
          type: 'album',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'Unknown',
          subtitle: 'Lets find it out and look deeper',
          description: 'Novel',
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
          id: 'pCSLggvdsi8b3fffzRTLM4dJR',
          type: 'activity',
          date_created: '2020-04-27T11:01:37.246606Z',
          title: 'TBD',
          subtitle: 'Misterious',
          text: ['Random text 1', 'Random text 2', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
        },
      ],
      selectedBoxes: [],
      baseDatePanelInput: { date: '' },
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
    test() {
      console.log('reaching');
    },
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

.base-advanced-search {
  margin-top: 32px;
}

.activity-showcase {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-showcase__header {
  font-size: $font-size-regular;
  margin: 0 0 0 $spacing;
}

.activity-showcase-after {
  display: flex;
}

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
  display: block;
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

.example-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.base-advanced-search__filter-row {
  margin-bottom: $spacing;
}

.slide-move {
  transition: all .15s ease-out;
}

.slide-enter {
  opacity: 0;
  transform: translateY(-#{$spacing});
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-#{$spacing});
}

.slide-leave-active {
  position: absolute;
  width: 100%;
  margin: auto;
  transition: opacity 0.15s ease, transform 0.3s ease;
}

.base-result-box-section__box {
  // subtracted 0.01rem for edge
  flex: 0 0 calc(((100% - ((var(--items-per-row) - 1) * #{$spacing}))
  / var(--items-per-row)) - 0.01rem);
}

.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
