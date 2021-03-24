/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Query from '@/components/Query.vue'

describe('Query', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(Query)
    expect(wrapper.vm).toBeTruthy()
  })
})
