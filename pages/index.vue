<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-3">
          <select-table
            :tables="csvTables"
            :selected-table="selectedTable"
            @select="setTable"
          />
          <v-card flat>
            <v-card-text class="d-flex justify-space-between align-center">
              <span style="color: #17a7c1" class="font-weight-bold grey--text"
                >Total Columns ({{ tableColumns.length }})</span
              >
              <v-btn
                class="default"
                color="pink"
                small
                outlined
                @click="selectAllColumns"
                >Select all columns</v-btn
              >
            </v-card-text>
          </v-card>
          <select-columns
            :columns="tableColumns"
            :selected-columns="selectedColumns"
            @updateColumns="setColumns"
          />
          <v-divider class="mb-3 mt-3"></v-divider>
          <v-card flat>
            <v-card-text class="d-flex justify-space-between align-center">
              <span class="subtitle-1">FILTERS</span>
              <v-btn text small outlined color="pink" @click="setFilter">
                <v-icon>mdi-plus</v-icon>add filter</v-btn
              >
            </v-card-text>
          </v-card>

          <div v-if="selectedFilters.length > 0" class="mt-1">
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
          <v-divider></v-divider>
          <v-card flat>
            <v-card-text>
              <span class="subtitle-1 mb-5 my-5">LIMIT</span>
              <v-divider></v-divider>
              <v-form v-model="validForm">
                <v-text-field
                  v-model="queryLimit"
                  outlined
                  dense
                  label="Please enter number of records to return"
                  class="mt-5"
                  required
                  :rules="[rules.required, rules.maxAndIntQueryRows]"
                ></v-text-field>
              </v-form>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="v-card--material pa-3">
          <v-card-text>
            <query
              :columns="tableColumns"
              :selected-columns="selectedColumns"
              :selected-table="selectedTable"
              :selected-filters="selectedFilters"
              :query-limit="queryLimit"
            />
            <v-divider class="mb-3 mt-3"></v-divider>
            <span class="subtitle-1 mb-5 my-5 text-center"
              >Run A Sample Query</span
            >
            <v-divider class="mb-3 mt-3"></v-divider>
            <v-row v-for="query in queries" :key="query.id">
              <saved-queries :query="query" @setQuery="setQuery" />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-banner
          single-line
          class="text-uppercase text-center rounded"
          elevation="1"
        >
          {{ selectedTable }}
        </v-banner>

        <v-data-table
          :headers="tableHeaders"
          :items="tableItems"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
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
      selectedFilters: [],
      filterIndex: 0,
      tableColumns: [],
      validForm: true,
      queryLimit: 10000,
      rules: {
        required: (value) => !!value || 'Required.',
        maxAndIntQueryRows: (value) =>
          (!!parseInt(value) && value >= 0 && value <= 10000) ||
          'Please insert a number between 1 and 10000 rows',
      },
      queries: [
        {
          id: 1,
          text: 'SELECT * FROM products',
        },
        {
          id: 2,
          text: 'SELECT * FROM customers',
        },
      ],
    }
  },
  computed: {
    tableItems() {
      return this.columnsData.body && this.columnsData.body.length
        ? this.columnsData.body
        : []
    },
    tableHeaders() {
      const columns = this.selectedColumns.length
        ? this.selectedColumns
        : this.tableColumns
      return columns.map((item) => {
        return {
          text: item.toUpperCase(),
          value: item,
          class: 'blue lighten-5',
        }
      })
    },
  },
  watch: {
    columnsData(newTable, oldTable) {
      this.tableColumns =
        this.columnsData.body && this.columnsData.body.length
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
    setQuery(query) {
      if (query === 1) {
        this.setTable('products')
        this.$nextTick(() => {
          this.$nuxt.$loading.start()

          setTimeout(() => {
            this.selectAllColumns()
            this.$nuxt.$loading.finish()
          }, 500)
        })
      } else {
        this.setTable('customers')
        this.$nextTick(() => {
          this.$nuxt.$loading.start()

          setTimeout(() => {
            this.selectAllColumns()
            this.$nuxt.$loading.finish()
          }, 500)
        })
      }
    },
  },
}
</script>
