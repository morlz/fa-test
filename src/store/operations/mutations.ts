import Vue from 'vue'

export const loadingSet = (state: any, payload: any) =>
	Object
		.entries(payload)
		.map(
			([key, value]) =>
				Vue.set(state.loading, key, value)
		)

export const cachedSet = (state: any, payload: any) =>
	Object
		.entries(payload)
		.map(
			([key, value]) =>
				Vue.set(state.cached, key, value)
		)