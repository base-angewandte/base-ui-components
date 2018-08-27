<template>
  <div class="demo-section">
    <h3 class="demo-section-header">{{ title }}</h3>
    <div class="component-description">
      <h4 class="demo-subsection-header">Component Description</h4>

      <h5 class="description-title">Properties</h5>
      <div class="description-body">
        <table class="description-table">
          <tr class="table-row">
            <th>Property Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Default</th>
            <th>Required</th>
            <th>Remark</th>
          </tr>
          <tr
            v-for="(prop, index) in $props.properties"
            :key="index"
            class="table-row">
            <td class="table-name">{{ prop.name }}</td>
            <td>{{ prop.type }}</td>
            <td class="table-text">{{ prop.description }}</td>
            <td>{{ prop.default }}</td>
            <td>{{ prop.required }}</td>
            <td>{{ prop.remark }}</td>
          </tr>
        </table>
      </div>
      <h5 class="description-title">Events</h5>
      <div class="description-body">
        <table class="description-table">
          <tr class="table-row">
            <th>Event Name</th>
            <th>Description</th>
            <th>Params</th>
            <th>Remark</th>
          </tr>
          <tr
            v-for="(prop, index) in $props.events"
            :key="index"
            class="table-row">
            <td class="table-name">{{ prop.name }}</td>
            <td class="table-text">{{ prop.description }}</td>
            <td>{{ prop.params }}</td>
            <td>{{ prop.remark }}</td>
          </tr>
        </table>
      </div>
      <h5 class="description-title">Slots</h5>
      <div class="description-body">
        <table class="description-table">
          <tr class="table-row">
            <th>Slot Name</th>
            <th>Description</th>
            <th>Default Template</th>
            <th>Remark</th>
          </tr>
          <tr
            v-for="(prop, index) in $props.slots"
            :key="index"
            class="table-row">
            <td class="table-name">{{ prop.name }}</td>
            <td class="table-text">{{ prop.description }}</td>
            <td class="table-default-template">{{ prop.default }}</td>
            <td>{{ prop.remark }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="component-demo">
      <h4 class="demo-subsection-header">Component Demo</h4>
      <div class="component-demo-body">
        <slot />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    properties: {
      type: Array,
      default() {
        return [];
      },
    },
    events: {
      type: Array,
      default() {
        return [];
      },
    },
    slots: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../styles/variables";
  .demo-section {

    .demo-section-header {
      padding: 16px;
    }

    .demo-subsection-header {
      padding: 16px;
    }

    .component-description {
      .description-title {
        font-size: 19px;
        font-weight: normal;
        font-style: italic;
        padding: 16px;
      }

      .description-body {
        padding-bottom: 32px;
        .description-table {
          width: 100%;
          background-color: white;
          border-collapse: collapse;

          .table-row {
            padding: 8px 16px;

            td, th {
              padding: 8px;
            }

            th:not(:last-child), td:not(:last-child) {
              border-right: $separation-line;
            }

            .table-default-template {
              white-space: pre-wrap;
            }
          }

          .table-row:not(:last-child) {
            border-bottom: $separation-line;
          }
        }
      }
    }

    .component-demo-body {

    }
  }
</style>
