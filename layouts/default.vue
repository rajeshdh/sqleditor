<template>
  <v-app dark class="red--text text--lighten-5">
    <v-app-bar :clipped-left="clipped" fixed app class="primary">
      <v-btn icon to="/" router exact>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" to="/" />
      <v-spacer />

      <v-btn to="/about" router exact class="ma-1" plain> About </v-btn>

      <v-btn icon href="https://github.com/rajeshdh/sqleditor" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn>
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
      title: 'SqlGen - Online SQL Editor',
    }
  },
}
</script>
