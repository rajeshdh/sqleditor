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
    selectedFilters: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    query() {
      const selectStatement =
        (this.selectedColumns.length === this.columns.length
          ? 'SELECT *'
          : `SELECT ${this.selectedColumns
              .map((col) => `"${col}"`)
              .join(', ')}`) + `\nFROM ${this.selectedTable}`
      if (this.selectedFilters.length > 0) {
        const conditionsStatement = this.selectedFilters.map(
          (filter, index) => {
            let statement =
              index > 0
                ? `${filter.andOrOr} "${filter.column}"`
                : `"${filter.column}"`
            if (
              [
                'equal',
                'not equal',
                'greater than',
                'less than',
                'in',
              ].includes(filter.filter)
            ) {
              statement = `${statement} ${this.operators[filter.filter]} ${
                filter.inputField1
              }`
              return statement
            } else if (filter.filter === 'between') {
              statement = `${statement} ${this.operators[filter.filter]} '${
                filter.inputField1
              }' and '${filter.inputField2}'`
              return statement
            }
            return statement
          }
        )
        return (
          selectStatement +
          '\nWHERE ' +
          conditionsStatement.join('\n') +
          `\nlimit ${this.numberRows}`
        )
      }
      return selectStatement
    },
  },
}
</script>
