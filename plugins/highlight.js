import Vue from 'vue'
import VueHighlightJS from 'vue-highlight.js'

// eslint-disable-next-line camelcase
import sql_more from 'highlight.js/lib/languages/sql_more'

import 'highlight.js/styles/dracula.css'

Vue.use(VueHighlightJS, {
  languages: {
    sql_more,
  },
})
