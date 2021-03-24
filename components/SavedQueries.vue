<template>
  <v-col class="query-col">
    <div @click="setQuery(query.id)">
      <highlight-code
        lang="sql_more"
        style="white-space: pre-wrap"
        class="pb-5 pt-2 query"
      >
        {{ query.text }}</highlight-code
      >
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      default() {
        return {
          id: 0,
          text: '',
        }
      },
    },
  },
  methods: {
    setQuery(index) {
      this.$emit('setQuery', index)
    },
  },
}
</script>
