<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
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
    </v-col>
  </v-row>
</template>

<script>
import SelectColumns from '~/components/SelectColumns.vue'
import SelectTable from '~/components/SelectTable.vue'
export default {
  name: 'Home',
  components: {
    SelectTable,
    SelectColumns,
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
  },
}
</script>
