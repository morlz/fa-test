<template>
	<div class="IndexPage">
		<h1 class="IndexPage__title">Операции на поле {{ fieldID }}</h1>

		<div class="IndexPage__header">
			<q-tabs
				class="IndexPageTypeToggle"
				v-model="currentTab"
			>
				<q-tab
					label="Запланированные операции"
					name="planed"
				/>

				<q-tab
					label="Выполненные операции"
					name="ready"
				/>
			</q-tabs>

			<q-btn
				@click="operationModal = true"
				class="AddBtn"
			>
				<q-img
					class="AddBtn__img"
					src="statics/icons/buttons/plus-green.svg"
				/>Добавить операцию
			</q-btn>
		</div>

		<operation-list :content="cachedOperations" />

		<loading :value="loadingOperations" />

		<operation-modal
			:crop="fieldCrop"
			:field-id="fieldID"
			@add="onOperationAdd"
			v-model="operationModal"
		/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { namespace } from "vuex-class"
import Loading from '../components/base/Loading.vue'
import OperationList from '../components/operations/OperationList.vue'
import OperationModal from '../components/operations/OperationModal.vue'
import { Operation, Crop, CropType } from '../models'
import store from '../store'

const operations = namespace('operations')

const fieldID = 112
const fieldCrop = new Crop({
	id: 'wheat-19',
	type: CropType.WHEAT,
	icon: `statics/icons/crops/wheat.svg`
})

@Component({
	components: {
		Loading,
		OperationList,
		OperationModal
	}
})
export default class PageIndex extends Vue {
	fieldID = fieldID
	fieldCrop = fieldCrop

	currentTab = 'ready'

	operationModal: boolean = false

	@operations.State(state => state.loading.operations) loadingOperations: boolean
	@operations.State(state => state.cached.operations) cachedOperations: Operation[]
	@operations.Action addOperation: (form) => Promise<void>

	private onOperationAdd (form) {
		this.operationModal = false
		this.addOperation(form)
	}

	beforeRouteEnter (to, from, next) {
		store.dispatch('operations/getAllOperations')
		next()
	}
}
</script>

<style lang="stylus">
.IndexPage
	position relative
	padding 20px 30px
	&__title
		color #333333
		font-size 32px
		line-height 32px

	&__header
		margin 10px 0
		display grid
		grid-auto-flow column
		justify-content space-between


.IndexPageTypeToggle
	font-weight 500
	font-size 11px
	line-height 13px
	text-transform uppercase

	.q-tab--active 
		color #3399FF
	.q-tab__indicator
		display none
		

</style>

<style lang="stylus" scoped>
.AddBtn
	border-radius 24px
	box-shadow 0px 2px 4px rgba(0, 0, 0, .1)
	font-size 13px
	line-height 15px
	color #333333

	&__img
		width 28px
		margin-bottom -5px

</style>
