<template>
	<main class="MainLayout">
		<header></header>

		<section class="MainLayout__content">
			<router-view />
		</section>
	</main>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class MainLayout extends Vue {

}

</script>

<style lang="stylus" scoped>
header
	background #091C28
	height 80px

.MainLayout
	background #F9F9F9
	width 100vw
	min-height 100vh
	height 100%

	&__content
		background #fff
		min-height 100%
		margin 0 7%
		box-shadow 0px 0px 20px rgba(0, 0, 0, .2)
</style>
