/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import FilterItem from '@/components/FilterItem.vue'

describe('FilterItem', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(FilterItem)
    expect(wrapper.vm).toBeTruthy()
  })
})
