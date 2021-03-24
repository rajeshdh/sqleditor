/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SelectTable from '@/components/SelectTable.vue'

describe('SelectTable', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  test('is a Vue instance', () => {
    const wrapper = mount(SelectTable)
    expect(wrapper.vm).toBeTruthy()
  })
})
