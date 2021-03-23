<template>
  <v-card flat>
    <v-card-text>
      <span class="subtitle-1 my-5">SELECT FROM</span>
      <v-select
        :value="selectedTable"
        dense
        :items="tables"
        item-text="slug"
        item-value="slug"
        label="Please select a table"
        outlined
        class="mt-5"
        @change="setSelectedTable"
      >
        <template slot="selection" slot-scope="{ item }">
          {{ item.slug.toUpperCase() }}
        </template>
        <template slot="item" slot-scope="{ item }">
          {{ item.slug.toUpperCase() }}
        </template>
      </v-select>
      <v-divider class="mb-3 mt-3"></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'SelectTable',
  props: {
    tables: {
      type: Array,
      default() {
        return []
      },
    },
    selectedTable: {
      type: String,
      default: '',
    },
  },
  methods: {
    setSelectedTable(table) {
      this.$emit('select', table)
    },
  },
}
</script>
