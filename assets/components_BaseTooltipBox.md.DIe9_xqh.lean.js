import{_ as d,a as i,b as l,o as r,aM as s,I as o,i as a,x as n}from"./chunks/framework.CJiAeuRk.js";const f=JSON.parse('{"title":"BaseTooltipBox","description":"","frontmatter":{},"headers":[],"relativePath":"components/BaseTooltipBox.md","filePath":"components/BaseTooltipBox.md","lastUpdated":null}'),b={name:"components/BaseTooltipBox.md"};function c(p,t,h,u,x,m){const e=i("vue-live");return r(),l("div",null,[t[0]||(t[0]=s("",10)),o(e,{layoutProps:{lang:"vue"},code:`<template>
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
