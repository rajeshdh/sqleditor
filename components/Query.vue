<template>
  <div class="mt-5">
    <span class="subtitle-1 text-uppercase">SQL Statement</span>
    <v-divider></v-divider>

    <pre class="pb-5 pt-2" v-text="query"></pre>
  </div>
</template>

<script>
export default {
  name: 'Query',
  props: {
    selectedTable: {
      type: String,
      default: '',
    },
    selectedColumns: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    query() {
      return (
        (this.selectedColumns.length === this.columns.length
          ? 'SELECT *'
          : `SELECT ${this.selectedColumns
              .map((col) => `"${col}"`)
              .join(', ')}`) + `\nFROM ${this.selectedTable}`
      )
    },
  },
}
</script>
