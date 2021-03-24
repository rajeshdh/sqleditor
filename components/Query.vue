<template>
  <div class="mt-5">
    <span class="subtitle-1 my-5 text-uppercase">SQL Statement</span>
    <v-divider></v-divider>

    <highlight-code
      v-if="selectedColumns.length"
      lang="sql_more"
      style="white-space: pre-wrap"
      class="pb-5 pt-2 query"
      >{{ query }}</highlight-code
    >
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
        return selectStatement + `\nlimit ${this.queryLimit}`
      }
    },
  },
}
</script>
<style scoped>
.query {
  background: #232323 !important;
  color: #e6e1dc !important;
}
.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #232323 !important;
  color: #e6e1dc !important;
}

.hljs-comment,
.hljs-quote {
  color: #bc9458;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag {
  color: #c26230;
}

.hljs-number,
.hljs-regexp,
.hljs-string,
.hljs-template-variable,
.hljs-variable {
  color: #a5c261;
}

.hljs-subst {
  color: #519f50;
}

.hljs-name,
.hljs-tag {
  color: #e8bf6a;
}

.hljs-type {
  color: #da4939;
}

.hljs-attr,
.hljs-built_in,
.hljs-builtin-name,
.hljs-bullet,
.hljs-link,
.hljs-symbol {
  color: #6d9cbe;
}

.hljs-params {
  color: #d0d0ff;
}

.hljs-attribute {
  color: #cda869;
}

.hljs-meta {
  color: #9b859d;
}

.hljs-section,
.hljs-title {
  color: #ffc66d;
}

.hljs-addition {
  background-color: #144212;
  color: #e6e1dc;
  display: inline-block;
  width: 100%;
}

.hljs-deletion {
  background-color: #600;
  color: #e6e1dc;
  display: inline-block;
  width: 100%;
}

.hljs-selector-class {
  color: #9b703f;
}

.hljs-selector-id {
  color: #8b98ab;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: 700;
}

.hljs-link {
  text-decoration: underline;
}
</style>
