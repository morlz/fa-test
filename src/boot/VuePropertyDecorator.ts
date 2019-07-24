import { Component } from 'vue-property-decorator'

export default () => {
	Component.registerHooks([
		'meta',
		'beforeRouteEnter',
		'beforeRouteUpdate',
		'beforeRouteLeave'
	])
}