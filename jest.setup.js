import { config } from '@vue/test-utils'
import Vue from 'vue'

Vue.config.silent = true

config.stubs.nuxt = { template: '<div />' }
config.stubs['nuxt-link'] = { template: '<a><slot /></a>' }
config.stubs['no-ssr'] = { template: '<span><slot /></span>' }
config.stubs.fa = { template: '<i></i>' }
