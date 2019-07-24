import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import operations from './operations'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const store = new Vuex.Store({
    modules: {
	  // example
	  operations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

export default store
