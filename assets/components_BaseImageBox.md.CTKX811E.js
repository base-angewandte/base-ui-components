import{_ as o,a as d,b as i,o as s,aL as a,I as r}from"./chunks/framework.DNZP2baM.js";const p=JSON.parse('{"title":"BaseImageBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseImageBox.md","filePath":"components/BaseImageBox.md","lastUpdated":1679928144000}'),l={name:"components/BaseImageBox.md"};function n(c,t,b,h,x,g){const e=d("vue-live");return s(),i("div",null,[t[0]||(t[0]=a('<h1 id="baseimagebox" tabindex="-1">BaseImageBox <a class="header-anchor" href="#baseimagebox" aria-label="Permalink to &quot;BaseImageBox&quot;">​</a></h1><blockquote><p>A component with the primary purpose to display images in responsive boxes but also allowing for text only</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>title</td><td>The title of the item in question (max 2 lines), also used as img alt text</td><td>string</td><td>-</td><td>&#39;No title&#39;</td></tr><tr><td>altTitle</td><td>specify a separate title to display on title hover and for the<br> image alt text. Useful for example if <code>interpretTextAsHtml</code> is<br> set <code>true</code> and the <code>title</code> contains HTML</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>subtext</td><td>Text displayed directly below title (max two lines; max 3 lines with title)</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>altSubtext</td><td>specify a separate subtext to display on subtext hover. Useful for example<br> if <code>interpretTextAsHtml</code> is set <code>true</code> and the <code>subtext</code> contains HTML</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>showTitle</td><td>should the title be displayed or box only display the image</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>showTitleOnHover</td><td>should the title be displayed on box hover</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>titleRows</td><td>define the number of rows before the title is truncated with ...<br><br><strong>auto</strong>: If subtext is defined, the title is displayed in one row, otherwise in two rows.<br><strong>1</strong>: Title is displayed in one row.</td><td>string|number</td><td><code>auto</code>, <code>1</code></td><td>&#39;auto&#39;</td></tr><tr><td>imageUrl</td><td>define a url to a single image<br><br>data variants to render a single image using <code>src</code> or <code>srcset</code> for a responsive image:<br><strong>src</strong>: <code>&#39;path&#39;</code><br><strong>srcset</strong>: <code>{ &#39;640w&#39;: &#39;path&#39; }</code></td><td>string|object</td><td>-</td><td>null</td></tr><tr><td>images</td><td>define up to 4 image url to be displayed in a grid<br><br>array variants to render a single image using <code>src</code> or <code>srcset</code> for a responsive image:<br><strong>src</strong>: <code>[&#39;path&#39;]</code><br><strong>srcset</strong>: <code>[{ &#39;640w&#39;: &#39;path&#39; }]</code></td><td>array</td><td>-</td><td>[]</td></tr><tr><td>imageShadow</td><td>display shadow overlays at the top and bottom of the image<br>to make text easier to read</td><td>boolean</td><td>-</td><td>true</td></tr><tr><td>imageFooterMargin</td><td>define the margin (left, bottom, right) between the image footer and the image</td><td>string</td><td><code>large</code>, <code>small</code></td><td>&#39;large&#39;</td></tr><tr><td>description</td><td>descriptive element displayed at bottom of box (e.g. item type like &quot;Bilderserie&quot;)</td><td>string</td><td>-</td><td>null</td></tr><tr><td>additional</td><td>descriptive element displayed at bottom of box (e.g. item type like &quot;Bilderserie&quot;)</td><td>string</td><td>-</td><td>null</td></tr><tr><td>icon</td><td>set optional icon<br>e.g. for items without image</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>iconSize</td><td>set optional icon size</td><td>string</td><td><code>small</code>, <code>medium</code>, <code>large</code>, <code>xlarge</code>, <code>xxlarge</code></td><td>&#39;xxlarge&#39;</td></tr><tr><td>playIcon</td><td>display play icon<br>e.g. for Video, Audio files</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>selectable</td><td>determines if the box should be selectable and the checkbox is displayed</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>draggable</td><td>set prop true if box can be dragged - used solely for styling purposes</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>selected</td><td>set select status (checkbox checked) from outside</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>boxSize</td><td>specify the size of the box</td><td>object</td><td>-</td><td>{<br> width: &#39;auto&#39;,<br> height: &#39;auto&#39;<br>}</td></tr><tr><td>boxText</td><td>specify any text that should be displayed instead of an image;<br>each array element on new line</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>lazyload</td><td>specify lazy image loading</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>imageFirst</td><td>specify position of image</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>centerHeader</td><td>specify if header should be centered horizontally<br>(aligned left otherwise)</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>renderElementAs</td><td>define html element that should be rendered<br>this could either be a native HTML element or a framework specific component<br>name (e.g. <code>&#39;RouterLink&#39;</code>) or a component passed directly<br><br><strong>caveat</strong>: if you are using Nuxt the string <code>&#39;NuxtLink&#39;</code> is not enough,<br> but you need to import the component as <code>import { NuxtLink } from &#39;#components&#39;;</code><br> and pass the component to the prop!</td><td>string|object</td><td>-</td><td>&#39;div&#39;</td></tr><tr><td>linkTo</td><td>if element is rendered as vue link component, specify a value for the <code>to</code> attribute<br>can either be a string or a <code>vue-router</code> Location object (= object with <code>path</code> property<br>and optional <code>params</code> or <code>query</code> object)<br>(this needs vue-router)</td><td>string|object</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>interpretTextAsHtml</td><td>if necessary box text (<code>title</code>, <code>subtext</code>, <code>boxText</code>) can<br> be rendered as html<br><br> <em>tip</em>: do not forget to set prop <code>altTitle</code> and/or <code>altSubtext</code> if the<br> title text or subtext contains html - otherwise the complete html will<br> be displayed on text hover and for image alt text<br><br> <strong>caveat</strong>: setting this variable <code>true</code> can lead to XSS attacks. Only use<br> this prop on trusted content and never on user-provided content.</td><td>boolean</td><td>-</td><td>false</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>clicked</td><td></td><td>event triggered when selectable is false and box is clicked</td></tr><tr><td>select-triggered</td><td><strong>undefined</strong> <code>Boolean</code> - was box selected</td><td>event triggered when box is selectable and clicked upon</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>title-right</td><td>create custom content (e.g. additional text or icon) right of the title</td><td></td></tr><tr><td>icon</td><td>create custom content (e.g. folder icon)</td><td></td></tr><tr><td>text</td><td>to display more advanced text - if you use this please specify the <code>ref</code> attribute with <code>boxTextInner</code> that has the line-height css attribute set - so the text display height can be calculated correctly!</td><td></td></tr><tr><td>footer-left</td><td>create custom content (e.g. featured icon for files) left of text</td><td></td></tr><tr><td>footer-right</td><td>create custom content (e.g. published icon for files) left of text</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2><p>A variety of possibilities with image box</p>',11)),r(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <div ref="boxesContainer" class="boxes-background">
      <BaseImageBox
        :selectable="selectActive"
        :image-url="imgUrl"
        :box-size="boxSize"
        title="Box with Image"
        subtext="and title and subtitle"
        description="and description"
        class="box"
        @select-triggered="handleBoxArray($event, '1')"
      />
      <BaseImageBox
        :selectable="selectActive"
        :show-title="false"
        :image-url="imgUrl"
        :box-size="boxSize"
        title="box with no title"
        description="show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '2')"
      />
      <BaseImageBox
        :selectable="selectActive"
        :box-text="[
          'This box has only text to show',
          'And then some more text that will exceed the size of the box for sure',
        ]"
        :box-size="boxSize"
        title="text only"
        subtext="no description"
        class="box"
        @select-triggered="handleBoxArray($event, '3')"
      />
      <BaseImageBox
        :selectable="selectActive"
        :box-size="boxSize"
        :box-text="[
          'This box has only text to show',
          'And then some more text that will exceed the size of the box for sure',
        ]"
        title="text only"
        subtext="with description"
        class="box"
        description="no overlap with text"
      />

      <BaseImageBox
        :selectable="selectActive"
        :image-url="imgUrl"
        :box-size="boxSize"
        title="Box with Image"
        subtext="and title and subtitle"
        description="and footer slots used"
        class="box"
        @select-triggered="handleBoxArray($event, '5')"
      >
        <template #footer-left>
          <BaseIcon
            name="subscribe"
            title="icon in slot: footer-left"
            class="base-image-box__footer-icon"
          />
        </template>
        <template #footer-right>
          <BaseIcon
            name="eye"
            title="icon in slot: footer-right"
            class="base-image-box__footer-icon"
          />
        </template>
      </BaseImageBox>

      <BaseImageBox
        :selectable="selectActive"
        :show-title="false"
        :image-url="imgUrl"
        :box-size="boxSize"
        :play-icon="true"
        title="box with no title"
        description="play icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '6')"
      />

      <BaseImageBox
        :selectable="selectActive"
        :show-title="false"
        :box-size="boxSize"
        icon="file-object"
        :iconSize="iconSize"
        title="box with no title, icon"
        description="icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '7')"
      />

      <BaseImageBox
        :selectable="selectActive"
        :show-title="false"
        :box-size="boxSize"
        :play-icon="true"
        icon="audio-object"
        :iconSize="iconSize"
        title="box with no title, icon and play-icon"
        description="icon, play icon & show-title false"
        class="box"
        @select-triggered="handleBoxArray($event, '8')"
      >
        <template #footer-right>
          <span>00:04:22</span>
        </template>
      </BaseImageBox>

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 1)"
        :box-size="boxSize"
        :title-rows="1"
        title="Box with Image first"
        subtext="and slot title-right used"
        image-footer-margin="small"
        class="box"
        @select-triggered="handleBoxArray($event, '9')"
      >
        <template #title-right>
          <div class="slot-title-right">
            <span class="slot-title-right__text">(3)</span>
          </div>
        </template>
        <template #footer-right>
          <div class="quick-actions">
            <BaseButton button-style="circle" icon="download" text="Download" />
            <BaseButton
              button-style="circle"
              icon="information-solo"
              text="Remove"
            />
          </div>
        </template>
      </BaseImageBox>

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 2)"
        :box-size="boxSize"
        title="Box with 2 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '10')"
      />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 3)"
        :box-size="boxSize"
        title="Box with 3 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '11')"
      />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :images="images.slice(0, 4)"
        :box-size="boxSize"
        title="Box with 4 Images"
        subtext="Image Grid"
        class="box"
        @select-triggered="handleBoxArray($event, '12')"
      />

      <BaseImageBox
        :selectable="selectActive"
        :image-first="true"
        :image-shadow="false"
        :icon-size="iconSize"
        :box-size="boxSize"
        :center-header="true"
        title="Box with centered header"
        subtext="and icon slots used"
        class="box"
        @select-triggered="handleBoxArray($event, '13')"
      >
        <template #icon>
          <img
            src="https://base.uni-ak.ac.at/bs/img/icons/image.svg"
            alt=""
            style="width: 100%;"
          />
        </template>
      </BaseImageBox>
    </div>
    <div class="button-area">
      <BaseButton
        text="Toggle Select"
        @clicked="selectActive = !selectActive"
      />
    </div>
    <div class="button-area">
      {{ "Selected boxes: " + selectedBoxes }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectActive: false,
      selectedBoxes: [],
      iconSize: "xxlarge",
      boxSize: { width: "calc(25% - 16px)" },
    };
  },
  computed: {
    imgUrl() {
      return "https://picsum.photos/seed/bb/460/341";
    },
    images() {
      return [
        "https://picsum.photos/seed/aa/460/341",
        "https://picsum.photos/seed/bb/460/341",
        "https://picsum.photos/seed/cc/460/341",
        "https://picsum.photos/seed/dd/460/341",
      ];
    },
  },
  methods: {
    handleBoxArray(val, num) {
      if (val) {
        this.selectedBoxes.push(num);
      } else {
        this.selectedBoxes.splice(this.selectedBoxes.indexOf(num), 1);
      }
    },
    boxResizeHandler() {
      return new ResizeObserver((entries) => {
        const currentWidth = entries[0].contentRect.width;

        if (currentWidth > 400) {
          this.iconSize = "xxlarge";
        } else {
          this.iconSize = "large";
        }

        if (currentWidth > 800) {
          this.boxSize = { width: "calc(25% - 16px)" };
        } else {
          this.boxSize = { width: "calc(50% - 16px)" };
        }
      });
    },
  },
  mounted() {
    this.boxResizeHandler().observe(this.$refs.boxesContainer);
  },
};
<\/script>

<style lang="scss" scoped>
.boxes-background {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  padding: 16px 0 16px 16px;
}

.box {
  margin-right: 16px;
  margin-bottom: 16px;
}

.button-area {
  margin-top: 16px;
}

.base-image-box__footer-icon {
  width: 16px;
  height: 16px;
}

.quick-actions {
  display: flex;
}

.slot-title-right {
  display: flex;
  align-items: center;
  color: $font-color-second;
  font-size: $font-size-small;
}

.slot-title-right__text > *:not(:last-child) {
  margin-right: 8px;
}

.slot-title-right__icon {
  width: 16px;
  min-width: 16px;
  height: 16px;
}

.quick-actions .base-button {
  &:not(:last-child) {
    margin-right: 4px;
  }
}
</style>
`,requires:{}})])}const u=o(l,[["render",n]]);export{p as __pageData,u as default};
