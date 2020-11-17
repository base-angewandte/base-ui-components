<template>
  <div
    id="app"
    class="app">
    <h1>BaseMediaPreview</h1>

    <div style="display: flex;">
      <BaseImageBox
        v-for="(item, index) in media"
        ref="slideShowItem"
        :key="index"
        :title="item.title"
        :image-url="item.source"
        style="margin-right: 10px"
        @clicked="openPreview(item, index)" />
    </div>

    <BaseMediaPreview
      :show-preview="showPreview"
      :media-url="previewSource"
      :display-name="previewTitle"
      :slide-show-index="previewIndex"
      @slide="slide"
      @hide-preview="showPreview = false" />

    <br>
    <hr>
    <br>

    <h1>BaseExpandBox / BaseTextList.cols2</h1>

    <BaseExpandBox>
      <BaseTextList
        render-label-as="h2"
        :data="baseExpandBoxOneColumn"
        :cols2="true" />
    </BaseExpandBox>

    <br>
    <hr>
    <br>

    <h1>BaseExpandBox / BaseTextList.cols2</h1>
    <BaseExpandBox>
      <BaseTextList
        render-label-as="h2"
        :data="baseExpandBox.column1"
        :cols2="true" />
    </BaseExpandBox>

    <br>
    <hr>
    <br>

    <h1>BaseExpandBox / BaseTextList</h1>
    <BaseExpandBox>
      <BaseTextList
        render-label-as="h2"
        :data="baseExpandBox.column1" />
    </BaseExpandBox>
  </div>
</template>

<script>
// import axios from 'axios';

import BaseMediaPreview from '@/components/BaseMediaPreview/BaseMediaPreview';
import BaseImageBox from '@/components/BaseImageBox/BaseImageBox';
import BaseTextList from '@/components/BaseTextList/BaseTextList';
import BaseExpandBox from '@/components/BaseExpandBox/BaseExpandBox';

export default {
  name: 'App',
  components: {
    BaseMediaPreview,
    BaseImageBox,
    BaseExpandBox,
    BaseTextList,
  },
  data() {
    return {
      previewIndex: null,
      showPreview: false,
      previewTitle: '',
      previewSource: '',
      media: [
        {
          title: 'Image 1',
          source: 'https://placeimg.com/1260/800/arch.jpg',
        },
        {
          title: 'Image 2',
          source: 'https://placeimg.com/1260/800/people.jpg',
        },
        {
          title: 'Image 3',
          source: 'https://placeimg.com/1260/800/nature.jpg',
        },
        // {
        //   title: 'Video 4',
        //   source: 'https://base.uni-ak.ac.at/portfolio/p/A5BBXV1wqqSQpVA1wpK2H09B9Dm7NyUyjarXwJ9nU2eBOxwpnkHDRD/XbBF54QEPsP75dbzLKUwh9/playlist.m3u8',
        // },
        {
          title: 'Audio 4',
          source: 'http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3',
        },
      ],
      location: [48.208370, 16.384510],
      locationAddress: [
        {
          label: 'Address',
          data: [
            'Vordere Zollamtsstrasse 7',
            '1030 Vienna',
            'Austria',
          ],
        },
      ],
      baseExpandBoxOneColumn: [
        {
          label: 'Description',
          data: `Die Ausstellung „Throwing Gestures“ befragt Geste als körperliche Bewegung, die ihre Bedeutung in der politischen Zuschreibung sowie durch ihre mediale (Un)Sichtbarkeit erlangt. „Throwing Gestures“ untersucht mediale Repräsentationen (politischer) Gesten, ihre Übersetzungen, Verschiebungen und (De-) Kontextualisierung, Versprachlichung sowie Videoerkennung und filmische Formen. Die Kunstwerke analysieren dabei Machtstrukturen, seien sie sichtbar, unsichtbar oder manifest in materiellen Formen, wie Architektur und Technik. Die in der Ausstellung gezeigten Arbeiten sind in den vergangenen beiden Jahren im Rahmen des interdisziplinären Forschungsprojekts „The Entanglement between Gesture, Media and Politics“ entstanden. Künstler/innen, Performer/innen, Medien- und Kulturwissenschaftler/ innen haben in intensiven zeitlich wie räumlich begrenzten Arbeitssituationen, Fragestellungen, Methoden und Recherche ausgetauscht, eigene Zugänge kritisch hinterfragt sowie disziplinübergreifende Interessen mit Kolleg/innen ausfindig gemacht. Ergänzt werden die so entstandenen Arbeiten durch Werke geladener Künstler/innen, die sowohl wichtige Referenzen im Forschungsprozess darstellen als auch für die Auseinandersetzung mit Geste signifikante Aspekte aufgreifen. Die Zusammenstellung der Arbeiten zeigt klar: Die mediale Präsenz von Protestgesten ist in einen komplexen Kampf um Aufmerksamkeit eingewoben, in der „Ökonomie der Aufmerksamkeit“ sind Protestgesten auf einer sozio-ökonomischen Folie zu analysieren. So lässt sich – etwas polemisch – vermuten, dass das „Policing the Crisis“ (Stuart Hall et al.) der Ära Margaret Thatcher in das Zeitalter seiner kommerziellen Verwertung eingetreten ist. Zusammen mit der Ausstellung bildet das gleichnamige internationale Symposium den Abschluss des interdisziplinären Forschungsprojektes. Drei Panels nähern sich dem Thema aus unterschiedlichen Perspektiven. „Im/Perceptible Gesture“ diskutiert, wie Bewegung zu Geste wird und wie Technik an diesem Prozess beteiligt ist. Das Panel „Gesture and the Political“ untersucht politische Gesten, Auftreten und Verbreitung in Protestbewegungen und ihre Ästhetisierung in Populärkultur und Kunst. „Staging the Entanglement between Arts and Humanities“ reflektiert die Arbeitsprozesse zwischen künstlerischen und wissenschaftlichen Akteuren in interdisziplinären Projekten und diskutiert unterschiedliche Arten der Präsentation ihrer Ergebnisse. An der Ausstellung beteiligte Künstler/innen: Larry Archiampong & David Blandy, Jakob Argauer, Florian Bettel, Dina Boswank, Justine A. Chambers, Jeremy Deller, Timo Herbst, Kerstin Honeit, Irina Kaldrack, Silas Mücke, Marcus Nebe, Tobias Schulze, Konrad Strutz, Bahaa Talis, Nasan Tur, Laurie Young. Kuratiert von Florian Bettel, Dina Boswank, Timo Herbst, Konrad Strutz und Laurie Young. Beim Symposium sprechen Marie-Luise Angerer (Potsdam), Florian Bettel (Wien), Andreas Broeckmann (Lüneburg), Timo Herbst (Leipzig), Irina Kaldrack (Braunschweig), Martina Leeker (Berlin), Zoe Lefkofridi (Salzburg), Oliver Marchart (Wien), Stefanie Kiwi Menrath (Hildesheim), Stefan Rieger (Bochum), Konrad Strutz (Wien), Laurie Young (Berlin). Detaillierte Informationen unter gesture-media-politics.de Das Projekt „The Entanglement between Gesture, Media and Politics“ wird durchgeführt an der Hochschule für Bildende Künste Braunschweig und ist gefördert durch die Volkswagen-Stiftung im Rahmen des Programms Arts & Science in Motion. Unterstützt von der Universität für angewandte Kunst sierungsmethoden gesammelt, erfasst, erschlossen und aufbewahrt, um sie so für die zukünftige Forschung zugänglich zu halten. Ein Großteil der Archivalien wird im Einarbeitungsprozess digitalisiert, um sie als Anschauungsmaterial auch online verfügbar zu machen.

          Die Präsenzbibliothek der basis wien verfügt über einen stetig wachsenden Bestand von Ausstellungskatalogen, Monographien und theoretischen Werken zur zeitgenössischen Kunst sowie eine Auswahl an österreichischen und internationalen Kunstzeitschriften. Die Publikationen werden laufend in die basis wien Datenbank eingearbeitet, sodass auch eine Online-Recherche möglich ist.

          Betreut werden das Archiv und die Bibliothek von langjährigen Mitarbeiterinnen, die ihr Fachwissen auch für Beratungen und Auftragsrecherchen zur Verfügung stellen. Im Falle einer Präsentation oder Publikation auf der Grundlage von Recherchen in der basis wien werden die Besucher_innen gebeten, die basis wien als Quelle zu nennen.
          `,
        },
      ],
      baseExpandBox: {
        column1: [
          {
            label: 'Description 1',
            data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            `,
          },
          {
            label: 'Description 2',
            data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, consetetur sadipscing elitr, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          `,
          },
          {
            label: 'Description 3',
            data: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, consetetur sadipscing elitr, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
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
        ],
        column2: [
          {
            label: 'Vero eos et accusam',
            data: 'no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          },
          {
            label: 'Vero eos et accusam',
            data: [
              'Lorem ipsum dolor sit amet',
              'Consetetur sadipscing elitr, sed diam nonumy',
              'Eirmod tempor invidunt',
              'Eirmod tempor ',
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
              'Eirmod tempor ',
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
              'Eirmod tempor ',
              'Eirmod tempor invidunt',
              'Eirmod tempor invidunt',
            ],
          },
        ],
      },
    };
  },
  computed: {
    getImgUrl() {
      /* eslint-disable-next-line */
      return 'https://placeimg.com/1260/800/arch.jpg';
    },
  },
  watch: {},
  methods: {
    openPreview(item, index) {
      this.previewIndex = index;
      this.previewTitle = item.title;
      this.previewSource = item.source;
      this.showPreview = true;
    },
    slide(obj) {
      let index;

      if (obj.direction === 'next') {
        if (obj.index + 1 < this.media.length) {
          index = obj.index + 1;
        } else {
          index = 0;
        }
      }

      if (obj.direction === 'prev') {
        if (obj.index - 1 >= 0) {
          index = obj.index - 1;
        } else {
          index = this.media.length - 1;
        }
      }

      this.openPreview(this.media[index], index);
    },
  },
};
</script>

<style lang="scss">
@import "../src/styles/variables";

.app {
  max-width: 1260px;
  margin: 0 auto;
}
</style>
