<template>
  <v-row>
    <v-col cols="12">
      <v-combobox
        :value="selectedColumns"
        :items="columns"
        label="Please select columns"
        multiple
        chips
        outlined
        @change="setColumns"
      >
        <template #selection="data">
          <v-chip
            :key="JSON.stringify(data.item)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            close
            :close-icon="closeIcon"
            @click:close="data.parent.selectItem(data.item)"
          >
            {{ data.item }}
          </v-chip>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import { mdiClose } from '@mdi/js'
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    selectedColumns: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      closeIcon: mdiClose,
    }
  },
  methods: {
    setColumns(columns) {
      this.$emit('updateColumns', columns)
    },
  },
}
</script>
