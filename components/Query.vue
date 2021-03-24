<template>
  <div class="mt-5">
    <span class="subtitle-1 my-5 text-uppercase">SQL Statement</span>
    <v-divider></v-divider>

    <div
      v-if="selectedColumns.length"
      style="white-space: pre-wrap"
      class="pb-5 pt-2"
      v-html="query"
    ></div>
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
    queryLimit: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      operators: {
        'greater than': '>',
        'less than': '<',
        equal: '==',
        'not equal': '!==',
        in: 'in',
        between: 'between',
      },
    }
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
                filter.input1
              }`
              return statement
            } else if (filter.filter === 'between') {
              statement = `${statement} ${this.operators[filter.filter]} '${
                filter.input1
              }' and '${filter.input2}'`
              return statement
            }
            return statement
          }
        )
        return (
          selectStatement +
          '\nWHERE ' +
          conditionsStatement.join('\n') +
          `\nlimit ${this.queryLimit}`
        )
      } else {
        return selectStatement + '\nWHERE ' + `\nlimit ${this.queryLimit}`
      }
    },
  },
}
</script>
