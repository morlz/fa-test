<template>
	<div
		:style="{ backgroundColor }"
		class="AssessmentMark"
	/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { Assessment } from '../../models'
import { colors } from './colors'


@Component
export default class OperationMark extends Vue {

	@Prop({
		required: true,
		validator: el => Assessment[el] !== undefined || el === null
	}) readonly content: Assessment

	get backgroundColor () {
		return colors[this.content] || '#999'
	}

}
</script>

<style lang="stylus" scoped>
.AssessmentMark
	margin 0 5px -1px 0
	display inline-block
	height 12px
	width 24px
	border-radius 6px
</style>