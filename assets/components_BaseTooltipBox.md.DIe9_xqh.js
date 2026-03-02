import{_ as d,a as i,b as l,o as r,aM as s,I as o,i as a,x as n}from"./chunks/framework.CJiAeuRk.js";const f=JSON.parse('{"title":"BaseTooltipBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseTooltipBox.md","filePath":"components/BaseTooltipBox.md","lastUpdated":null}'),b={name:"components/BaseTooltipBox.md"};function c(p,t,h,u,x,m){const e=i("vue-live");return r(),l("div",null,[t[0]||(t[0]=s('<h1 id="basetooltipbox" tabindex="-1">BaseTooltipBox <a class="header-anchor" href="#basetooltipbox" aria-label="Permalink to &quot;BaseTooltipBox&quot;">​</a></h1><blockquote><p>Component to display a tooltip for additional content e.g.: quick actions</p></blockquote><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>attachTo</td><td>HTMLElement to attach the tooltip<br>e.g.: vue ref element</td><td>null</td><td>-</td><td></td></tr><tr><td>directionOrder</td><td>define the default direction order</td><td>array</td><td>-</td><td>[&#39;top&#39;, &#39;bottom&#39;, &#39;right&#39;, &#39;left&#39;]</td></tr><tr><td>styles</td><td>add additional styling<br><strong>caveat</strong>: properties <code>top</code>, <code>left</code> and <code>right</code> will be overwritten due position calculation</td><td>object</td><td>-</td><td>{}</td></tr><tr><td>modalTitle</td><td>title of the modal popup on mobile<br>if more customisation is needed, use the slot <code>header-title</code> instead</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>typeOnMobile</td><td>specify how the component is rendered on mobile resolutions<br><br><strong>box</strong>: component is rendered at the <code>attachTo</code> HTMLElement<br><strong>modal</strong>: component is rendered as a modal popup<br><strong>fullscreen</strong>: component is rendered as ap popup with max height and width</td><td>string</td><td><code>box</code>, <code>fullscreen</code>, <code>modal</code></td><td>&#39;modal&#39;</td></tr><tr><td>thresholdTop</td><td>specify a threshold value in px for the box top position calculation<br>Useful to prevent top alignment of the TooltipBox, for example, when there is a fixed-positioned header (BaseHeader).<br><br>Note: The value can also be set globally with the CSS variable <code>--base-tooltip-box-threshold-top</code>.<br> The property will be overwritten by the CSS variable.</td><td>number</td><td>-</td><td>0</td></tr><tr><td>headerId</td><td>customise the tooltipBox id<br> if you are using the <code>header-title</code> slot this should also be set as id on your custom title element<br> (it is also available via slot binding)</td><td>string|number</td><td>-</td><td>&#39;popup-title&#39;</td></tr><tr><td>descriptionElementId</td><td>specify the id of the element containing a description - for accessibility only</td><td>string</td><td>-</td><td>&#39;popup-body&#39;</td></tr><tr><td>overlayBackgroundVisible</td><td>define if the overlay background should be visible<br> (semitransparent black) - this only applies to <code>typeOnMobile</code> &#39;modal&#39;</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>mobileSize</td><td>define a custom size (in px) when the component should switch to mobile view</td><td>number</td><td>-</td><td>640</td></tr><tr><td>initialFocusElement</td><td>HTMLElement to focus after opening the tooltip<br>Note: If empty, the header title will be focused by default.<br> If using the slot for a custom header, be sure to<br> define an id attribute with the value <code>headerId</code><br> The value should be a valid CSS selector.</td><td>string</td><td>-</td><td>&#39;&#39;</td></tr><tr><td>focusableElements</td><td>list of focusable HTML elements using tab key navigation</td><td>array</td><td>-</td><td>[&#39;a[href]&#39;, &#39;button:enabled&#39;, &#39;input:enabled&#39;, &#39;*[tabindex]:not([tabindex=&quot;-1&quot;])&#39;]</td></tr><tr><td>disableTabKeyHandler</td><td>specify to disable the tab key handler within the component</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>clickOutsideOptions</td><td>specify options for the click-outside handler<br><a href="https://vueuse.org/core/onClickOutside/#type-declarations" target="_blank" rel="noreferrer">https://vueuse.org/core/onClickOutside/#type-declarations</a></td><td>object</td><td>-</td><td>{<br> capture: false<br>}</td></tr></tbody></table><h2 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Event name</th><th>Properties</th><th>Description</th></tr></thead><tbody><tr><td>close</td><td><strong>undefined</strong> <code>boolean</code> - the updated state</td><td>Event emitted when close button is clicked or clicked-outside is triggered</td></tr></tbody></table><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Name</th><th>Description</th><th>Bindings</th></tr></thead><tbody><tr><td>header-title</td><td>customize the header displayed on mobile for <code>typeOnMobile</code> <code>modal</code> and <code>fullscreen</code></td><td><strong>header-id</strong> <code>string, number</code> - bind this id to your slot element containing the title text for assistive technology to work properly</td></tr><tr><td>default</td><td>slot to inject box content</td><td></td></tr></tbody></table><hr><h2 id="demo" tabindex="-1">Demo <a class="header-anchor" href="#demo" aria-label="Permalink to &quot;Demo&quot;">​</a></h2>',10)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div>
    <BaseTooltipBox
      v-if="tooltip"
      :attach-to="$refs.button.$el"
      :threshold-top="70"
      :type-on-mobile="'box'"
      class="base-tooltip-box"
      @close="close"
    >
      <p>{{ data }}</p>
    </BaseTooltipBox>
    <BaseButton
      ref="button"
      tabindex="0"
      icon="information"
      text="info"
      @blur="close"
      @clicked="toggle"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "additional information",
      toggleButtonDisabled: false,
      tooltip: false,
    };
  },
  methods: {
    close() {
      this.tooltip = false;
      // prevent reopening of the tooltip
      this.toggleDisabled = true;
      setTimeout(() => (this.toggleDisabled = false), 0);
    },
    toggle() {
      if (this.toggleDisabled) return;
      this.tooltip = !this.tooltip;
    },
  },
};
<\/script>

<style lang="scss" scoped>
.base-tooltip-box {
  @media screen and (min-width: 641px) {
    max-width: 400px;
  }
}
</style>
`,requires:{}}),t[1]||(t[1]=a("h2",{id:"demo-with-baseimageboxes",tabindex:"-1"},[n("Demo with BaseImageBoxes "),a("a",{class:"header-anchor",href:"#demo-with-baseimageboxes","aria-label":'Permalink to "Demo with BaseImageBoxes"'},"​")],-1)),o(e,{layoutProps:{lang:"vue"},code:`<template>
  <div ref="boxesContainer" class="boxes-background">
    <BaseImageBox
      v-for="box in boxes"
      :key="box.id"
      :box-size="boxSize"
      :image-first="true"
      :image-shadow="false"
      :image-url="box.imageUrl"
      :title="box.title"
      class="box"
    >
      <template #footer-right>
        <div class="base-quick-actions">
          <button
            :id="'button_' + box.id"
            :ref="'button_' + box.id"
            class="base-button"
            @click="toggleBox(box.id, !box.action.info.active)"
          >
            <BaseIcon name="information" class="base-button__icon" />
          </button>

          <BaseTooltipBox
            v-if="activeTooltipBoxId === box.id"
            :attach-to="$refs['button_' + box.id][0]"
            :direction-order="directionOrder"
            :modal-title="box.title"
            :threshold-top="70"
            @close="closeBox(box.id)"
          >
            <BaseTextList
              :data="box.action.info.data"
              class="base-tooltip-box-body"
            />
          </BaseTooltipBox>
        </div>
      </template>
    </BaseImageBox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      directionOrder: ["right", "left", "top", "bottom"],
      boxSize: { width: "calc(25% - 16px)" },
      activeTooltipBoxId: null,
      boxes: [
        {
          id: "a1",
          title: "History and Theory",
          imageUrl: "https://picsum.photos/seed/aa/460/400",
          action: {
            info: {
              data: [
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2006",
                  },
                },
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2006",
                  },
                },
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2006",
                  },
                },
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2023",
                  },
                },
              ],
            },
          },
        },
        {
          id: "a2",
          title: "History and Theory",
          imageUrl: "https://picsum.photos/seed/bb/460/400",
          action: {
            info: {
              data: [
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2006",
                  },
                },
              ],
            },
          },
        },
        {
          id: "a3",
          title: "History and Theory",
          imageUrl: "https://picsum.photos/seed/cc/460/400",
          action: {
            info: {
              data: [
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2006",
                  },
                },
              ],
            },
          },
        },
        {
          id: "a4",
          title: "History and Theory",
          imageUrl: "https://picsum.photos/seed/dd/460/400",
          action: {
            info: {
              data: [
                {
                  label: "Typ",
                  data: {
                    value: "Kunstwerk",
                  },
                },
                {
                  label: "Künstler*in",
                  data: {
                    value: "Bernadette Kooperation",
                  },
                },
                {
                  label: "Datierung",
                  data: {
                    value: "2006",
                  },
                },
              ],
            },
          },
        },
      ],
      toggleBoxButtonDisabled: false,
    };
  },
  mounted() {
    this.boxResizeHandler().observe(this.$refs.boxesContainer);
  },
  methods: {
    boxResizeHandler() {
      return new ResizeObserver((entries) => {
        const currentWidth = entries[0].contentRect.width;
        if (currentWidth > 800) {
          this.boxSize = { width: "calc(25% - 16px)" };
        } else if (currentWidth > 400) {
          this.boxSize = { width: "calc(50% - 16px)" };
        } else {
          this.boxSize = { width: "calc(100% - 16px)" };
        }
      });
    },
    toggleBox(id) {
      if (this.toggleBoxButtonDisabled) return;
      this.activeTooltipBoxId = this.activeTooltipBoxId !== id ? id : null;
    },
    closeBox() {
      this.activeTooltipBoxId = null;
      this.toggleBoxButtonDisabled = true;
      setTimeout(() => (this.toggleBoxButtonDisabled = false), 0);
    },
  },
};
<\/script>

<style lang="scss" scoped>
.boxes-background {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(240, 240, 240);
  padding: 16px 0 0 16px;
}

.box {
  margin-right: 16px;
  margin-bottom: 16px;
}

.base-quick-actions {
  display: flex;
}

.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #6b6b6b;
  border-radius: 50%;
  background-color: #fff;
  color: #6b6b6b;
  cursor: pointer;
}

.base-button__icon {
  pointer-events: none;
  width: 12px;
  min-width: 12px;
  height: 12px;
}

.base-tooltip-box-body {
  width: 252px;
}

@media screen and (min-width: 641px) {
  .base-tooltip-box {
    width: 300px;
    height: 195px;
  }
}
</style>

<style>
/* use deep selector (>>>) to overwrite baseTextList styles */
>>> .base-text-list-label {
  font-weight: bold;
  margin-top: 8px !important;
}

>>> .base-text-list-group:first-of-type .base-text-list-label {
  margin-top: 0 !important;
}
</style>
`,requires:{}})])}const v=d(b,[["render",c]]);export{f as __pageData,v as default};
