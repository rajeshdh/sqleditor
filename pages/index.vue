<template>
  <v-row justify="center" align="center">
    <v-col>
      <select-table
        :tables="csvTables"
        :selected-table="selectedTable"
        @select="setTable"
      />
      <div
        style="width: 100%"
        class="d-flex justify-space-between align-center"
      >
        <span style="color: #17a7c1" class="font-weight-bold grey--text"
          >Total Columns ({{ tableColumns.length }})</span
        >
        <v-btn class="caption" small outlined text @click="selectAllColumns"
          >Select all columns</v-btn
        >
      </div>
      <select-columns
        :columns="tableColumns"
        :selected-columns="selectedColumns"
        @updateColumns="setColumns"
      />
      <query
        v-if="selectedColumns.length"
        :columns="tableColumns"
        :selected-columns="selectedColumns"
        :selected-table="selectedTable"
        :selected-filters="selectedFilters"
      />

      <div
        style="width: 100%"
        class="d-flex justify-space-between align-center"
      >
        <span class="subtitle-1">FILTERS</span>
        <v-btn text @click="setFilter">
          <v-icon>mdi-plus</v-icon>add filter</v-btn
        >
      </div>
      <v-divider></v-divider>
      <div v-if="selectedFilters.length > 0" class="mt-7">
        <div
          v-for="(item, index) in selectedFilters"
          :key="item.index + item.column"
        >
          <filter-item
            :selected-filter="item"
            :index="index"
            :columns="tableColumns"
            :selected-columns="selectedColumns"
            @input="setField"
            @clearFilter="clearFilter"
            @removeFilter="removeFilter"
          />
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import FilterItem from '~/components/FilterItem.vue'
import Query from '~/components/Query.vue'
import SelectColumns from '~/components/SelectColumns.vue'
import SelectTable from '~/components/SelectTable.vue'
export default {
  name: 'Home',
  components: {
    SelectTable,
    SelectColumns,
    Query,
    FilterItem,
  },
  async asyncData({ $content }) {
    // get csv data
    const csvTables = await $content('csv').only(['slug']).fetch()
    return { csvTables }
  },
  data() {
    return {
      selectedTable: null,
      selectedColumns: [],
      columnsData: [],
      operators: {
        'greater than': '>',
        'less than': '<',
        equal: '==',
        'not equal': '!==',
        in: 'in',
        between: 'between',
      },
      selectedFilters: [],
      filterIndex: 0,
    }
  },
  computed: {
    tableColumns() {
      return this.columnsData &&
        this.columnsData.body &&
        this.columnsData.body.length
        ? Object.keys(this.columnsData.body[0])
        : []
    },
  },
  methods: {
    async setTable(table) {
      this.selectedTable = table
      this.columnsData = await this.$content('csv', this.selectedTable)
        .only(['body'])
        .fetch()
    },
    setColumns(columns) {
      this.selectedColumns = [...columns]
    },
    selectAllColumns() {
      this.selectedColumns = [...this.tableColumns]
    },
    setFilter() {
      const id = this.filterIndex
      const filterData = {
        index: id,
        column: null,
        andOrOr: 'and',
        filter: null,
        input1: null,
        input2: null,
      }
      this.selectedFilters = [...this.selectedFilters, filterData]
      this.filterIndex += 1
    },
    removeFilter(index) {
      this.selectedFilters = this.selectedFilters.filter(
        (filter) => filter.index !== index
      )
    },
    clearFilter(index) {
      const newValue = this.selectedFilters.find((item) => item.index === index)
      newValue.filter = null
      newValue.input1 = null
      newValue.input2 = null

      this.$set(this.selectedFilters, index, newValue)
    },
    setField(index, key, value) {
      const newValue = this.selectedFilters.find((item) => item.index === index)
      newValue[key] = value
      this.$set(this.selectedFilters, index, newValue)
    },
  },
}
</script>
