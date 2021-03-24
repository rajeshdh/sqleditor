/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SelectColumns from '@/components/SelectColumns.vue'

describe('SelectColumns', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(SelectColumns)
    expect(wrapper.vm).toBeTruthy()
  })
})
