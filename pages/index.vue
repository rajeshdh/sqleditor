<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <pre>{{ csvTables }}</pre>
      <select-table
        :tables="csvTables"
        :selected-table="selectedTable"
        @select="setTable"
      />
      <pre>{{ tableColumns }}</pre>
    </v-col>
  </v-row>
</template>

<script>
import SelectTable from '~/components/SelectTable.vue'
export default {
  name: 'Home',
  components: {
    SelectTable,
  },
  async asyncData({ $content }) {
    // get csv data
    const csvTables = await $content('csv').only(['slug']).fetch()
    return { csvTables }
  },
  data() {
    return {
      selectedTable: null,
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
  },
}
</script>
