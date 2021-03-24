<template>
  <v-app dark class="red--text text--lighten-5">
    <v-app-bar :clipped-left="clipped" fixed app class="primary">
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,

      fixed: false,
      title: 'SQL Editor',
    }
  },
}
</script>
