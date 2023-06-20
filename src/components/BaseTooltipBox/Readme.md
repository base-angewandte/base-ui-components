## Demo

```vue live
<template>
  <div>
    <BaseTooltipBox
      v-if="tooltip"
      :attach-to="$refs.button.$el"
      :modal-on-mobile="false"
      class="base-tooltip-box"
      @is-active="tooltip = $event">
      <p>{{ data }}</p>
    </BaseTooltipBox>
    <BaseButton
      ref="button"
      tabindex="0"
      icon="information"
      text="info"
      @blur="blur()"
      @clicked="tooltip = !tooltip" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 'additional information',
      tooltip: false,
    };
  },
  methods: {
    blur() {
      console.log('blur');
      this.tooltip = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .base-tooltip-box {
    @media only screen and (min-width: 641px) {
      max-width: 400px;
      /* needs to be at least the same as the styleguide sidebar element (z-index: 1001)
         and lower than the styleguide navbar element (z-index: 1002) */
      z-index: 1001 !important;
    }
  }
</style>
```
## Demo with BaseImageBoxes

```vue live
<template>
  <div
    ref="boxesContainer"
    class="boxes-background">
    <BaseImageBox
      v-for="box in boxes"
      :key="box.id"
      :image-first="true"
      :image-shadow="false"
      :image-url="box.imageUrl"
      :box-size="boxSize"
      :title="box.title"
      class="box">
      <template #footer-right>
        <div class="base-quick-actions">
          <button
            :id="'button_' + box.id"
            :ref="'button_' + box.id"
            class="base-button"
            @click="toggleBox(box.id, !box.action.info.active)">
            <BaseIcon
              name="information"
              class="base-button__icon" />
          </button>

          <BaseTooltipBox
            v-if="box.action.info.active"
            :attach-to="$refs['button_' + box.id][0]"
            :direction-order="directionOrder"
            :modal-title="box.title"
            @is-active="toggleBox(box.id, false)">
            <BaseTextList
              :data="box.action.info.data"
              class="base-tooltip-box-body" />
          </BaseTooltipBox>
        </div>
      </template>
    </BaseImageBox>
  </div>
</template>

<script>
import BaseTextList from '@/components/BaseTextList/BaseTextList';

export default {
  components: {
    BaseTextList,
  },
  data() {
    return {
      directionOrder: ['right', 'left', 'top', 'bottom'],
      boxSize: { width: 'calc(25% - 16px)' },
      boxes: [
        {
          id: 'a1',
          title: 'History and Theory',
          imageUrl: 'https://picsum.photos/seed/aa/460/400',
          action: {
            info: {
              active: false,
              data: [
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2006',
                  },
                },
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2006',
                  },
                },
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2006',
                  },
                },
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2023',
                  },
                },
              ],
            },
          },
        },
        {
          id: 'a2',
          title: 'History and Theory',
          imageUrl: 'https://picsum.photos/seed/bb/460/400',
          action: {
            info: {
              active: false,
              data: [
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2006',
                  },
                },
              ],
            },
          },
        },
        {
          id: 'a3',
          title: 'History and Theory',
          imageUrl: 'https://picsum.photos/seed/cc/460/400',
          action: {
            info: {
              active: false,
              data: [
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2006',
                  },
                },
              ],
            },
          },
        },
        {
          id: 'a4',
          title: 'History and Theory',
          imageUrl: 'https://picsum.photos/seed/dd/460/400',
          action: {
            info: {
              active: false,
              data: [
                {
                  label: 'Typ',
                  data: {
                    value: 'Kunstwerk',
                  },
                },
                {
                  label: 'Künstler*in',
                  data: {
                    value: 'Bernadette Kooperation',
                  },
                },
                {
                  label: 'Datierung',
                  data: {
                    value: '2006',
                  },
                },
              ],
            },
          },
        },
      ],
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
          this.boxSize = { width: 'calc(25% - 16px)' };
        } else if (currentWidth > 400) {
          this.boxSize = { width: 'calc(50% - 16px)' };
        } else {
          this.boxSize = { width: 'calc(100% - 16px)' };
        }
      });
    },
    toggleBox(id, value) {
      // close all info boxes beforehand
      this.boxes = this.boxes.map(obj => ({
        ...obj,
        action: {
          info: {
            active: false,
            data: obj.action.info.data,
          },
        },
      }));

      // toggle selected box
      this.boxes[this.boxes.findIndex(obj => obj.id === id)].action.info.active = value;
    },
  },
};
</script>

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
    border: 1px solid #6B6B6B;
    border-radius: 50%;
    background-color: #fff;
    color: #6B6B6B;
    cursor: pointer;
  }

  .base-button__icon {
    pointer-events: none;
    width: 12px;
    min-width: 12px;
    height: 12px;
  }

  .base-tooltip-box-body {
    width: 250px;

    &::v-deep .base-text-list-group .base-text-list-label {
      font-weight: bold;
      margin-top: 8px;
    }

    &::v-deep .base-text-list-group:first-of-type .base-text-list-label {
      margin-top: 0 !important;
    }
  }

  .base-tooltip-box {
    @media only screen and (min-width: 641px) {
      width: 300px;
      height: 192px;
      /* needs to be at least the same as the styleguide sidebar element (z-index: 1001)
         and lower than the styleguide navbar element (z-index: 1002) */
      z-index: 1001 !important;
    }
  }
</style>
```
