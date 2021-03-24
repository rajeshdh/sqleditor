<template>
  <v-row align="center" justify="start" flex-wrap no-gutters>
    <v-col class="mr-2" cols="2">
      <div v-if="index > 0" class="d-flex align-center">
        <v-btn-toggle
          v-model="localFilter.andOrOr"
          small
          @change="$emit('input', index, 'andOrOr', $event)"
        >
          <v-btn small text value="and"> and </v-btn>
          <v-btn small text value="or"> or </v-btn>
        </v-btn-toggle>
      </div>
    </v-col>
    <v-col class="mr-2" cols="2">
      <v-select
        v-model="localFilter.column"
        dense
        :items="selectedColumns"
        label="column"
        outlined
        class="mt-5"
        @input="$emit('input', index, 'column', $event)"
        @change="clearFilter(index)"
      ></v-select>
    </v-col>
    <v-col v-if="localFilter.column" cols="2">
      <v-select
        v-model="localFilter.filter"
        dense
        :items="columnFilters(localFilter.column)"
        outlined
        class="mr-2 mt-5"
        label="condition"
        @input="$emit('input', index, 'filter', $event)"
      ></v-select>
    </v-col>
    <v-col v-if="localFilter.column" class="mr-2" cols="2">
      <v-text-field
        v-model="localFilter.input1"
        :rules="[rules.required]"
        autocomplete="new-value"
        label="value"
        outlined
        class="mr-2 mt-5"
        dense
        @input="$emit('input', index, 'input1', $event)"
      ></v-text-field>
    </v-col>
    <v-col
      v-if="
        localFilter.column &&
        localFilter.filter &&
        localFilter.filter === 'between'
      "
      cols="1"
    >
      <div class="d-flex justify-center">
        <span class="text-uppercase">and</span>
      </div>
    </v-col>
    <v-col
      v-if="
        localFilter.column &&
        localFilter.filter &&
        localFilter.filter === 'between'
      "
      cols="2"
    >
      <v-text-field
        v-model="localFilter.input2"
        required
        label="value"
        outlined
        class="mr-2 mt-5"
        :rules="[rules.required]"
        dense
        @input="$emit('input', index, 'input2', $event)"
      ></v-text-field>
    </v-col>
    <v-col cols="1">
      <v-btn
        color="error"
        outlined
        class="mr-2"
        icon
        @click="removeFilter(localFilter.index)"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
// import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'FiltersItems',
  props: {
    selectedFilter: {
      type: Object,
      default() {
        return {}
      },
    },
    index: {
      type: Number,
      default: 0,
    },
    selectedColumns: {
      type: Array,
      default() {
        return [
          {
            index: 0,
            column: null,
            andOrOr: 'and',
            filter: null,
            input1: null,
            input2: null,
          },
        ]
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      filters: [
        'equal',
        'not equal',
        'greater than',
        'less than',
        'between',
        'in',
      ],
      localFilter: { ...this.selectedFilter },
      rules: {
        required: (value) => !!value || 'Required.',
        maxAndIntQueryRows: (value) =>
          (!!parseInt(value) && value >= 0 && value <= 10000) ||
          'Please insert a number between 1 and 10000 rows',
      },
    }
  },
  methods: {
    clearFilter(index) {
      this.$emit('clearFilter', index)
    },
    removeFilter(index) {
      this.$emit('removeFilter', index)
    },
    columnFilters(col) {
      if (col !== null && col !== undefined) {
        return [
          'equal',
          'not equal',
          'greater than',
          'less than',
          'between',
          'in',
        ]
      } else {
        return []
      }
    },
  },
}
</script>
