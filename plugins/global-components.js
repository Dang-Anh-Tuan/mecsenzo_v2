import Vue from 'vue'

import {
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: !['', null, undefined].includes(value),
    }
  },
  computesRequired: true,
})

extend('maximumLen', {
  validate(value, args) {
    return value.length <= args.length
  },
  params: ['length'],
})

localize({
  en: {
    messages: {
      required: 'Field is required',
      maximumLen: (_, { length }) => `Must least than ${length} characters`,
    },
  },
  vi: {
    messages: {
      required: 'Không để trống',
      maximumLen: (_, { length }) => `Phải nhỏ hơn ${length} ký tự`,
    },
  },
})
