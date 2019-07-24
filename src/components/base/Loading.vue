<template functional>
	<transition name="fade">
		<q-inner-loading
			:class="{
				'Loading--primary': props.primary
			}"
			class="Loading"
			cy="Loading"
			v-if="props.value"
			visible
		>
			<q-spinner-ball
				:size="props.size"
				color="primary"
			/>
		</q-inner-loading>
	</transition>
</template>

<script>

export default {
	functional: true,

	props: {
		value: Boolean,
		size: {
			type: String,
			default: a => '50px'
		},
		primary: Boolean
	},
}
</script>


<style lang="stylus">
.Loading
	&--primary
		background rgba(2, 123, 227, 0.6)
		svg
			color #fff !important
</style>