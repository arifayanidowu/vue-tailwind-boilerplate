import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButtonVue from '../AppButton.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(AppButtonVue as any, {
      props: {
        color: 'danger'
      },
      slots: {
        default: 'Hello World'
      }
    })
    expect(wrapper.html()).toContain('Hello World')
  })
})
