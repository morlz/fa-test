<template>
	<q-dialog
		:value="value"
		@input="$emit('input', $event)"
		full-height
		position="left"
	>
		<div class="OperationModal">
			<div class="OperationModal__name">Добавление операции</div>

			<q-separator />

			<div class="OperationModal__field">
				<div class="OperationModalField">
					<div class="OperationModalField__box" />
					<span>Поле</span>
					<span class="OperationModalField__num">{{ fieldId }}</span>
				</div>

				<div class="OperationModalCrop">
					<span class="OperationModalCrop__type">{{ cropType }}</span>
					<span class="OperationModalCrop__subtype">{{ cropSubtype }}</span>
					<q-img
						:src="crop.icon"
						class="OperationModalCrop__img"
					/>
				</div>
			</div>

			<q-separator />

			<section class="OperationModalForm">
				<q-select
					:label="$t('operation')"
					:options="operationOptions"
					class="OperationModalForm__op"
					outlined
					v-model="type"
				/>

				<q-input
					:label="$t('opModal.date')"
					:rules="['date']"
					mask="date"
					outlined
					v-model="form.date"
				>
					<template v-slot:append>
						<q-icon
							class="cursor-pointer"
							name="event"
						>
							<q-popup-proxy
								ref="qDateProxy"
								transition-hide="scale"
								transition-show="scale"
							>
								<q-date
									@input="() => $refs.qDateProxy.hide()"
									v-model="form.date"
								/>
							</q-popup-proxy>
						</q-icon>
					</template>
				</q-input>

				<q-input
					:label="$t('opModal.size')"
					outlined
					v-model="form.area"
				/>
			</section>

			<q-separator />

			<section>
				<q-input
					:placeholder="$t('opModal.comment')"
					borderless
					type="textarea"
					v-model="form.comment"
				/>
			</section>

			<q-separator />

			<section
				:style="{
					'--color': assessmentColor,
					'--text-color': assessmentTextColor,
				}"
				class="OperationModalAssessment"
			>
				<div class="OperationModalAssessment__title">Качество выполнения операции</div>

				<q-btn-toggle
					:options="assessmentOptions"
					class="OperationModalAssessment__btns"
					rounded
					v-model="form.assessment"
				/>
			</section>

			<q-btn
				@click="$emit('add', form)"
				class="OperationModalAdd"
				label="ДОБАВИТЬ ОПЕРАЦИЮ"
			/>
		</div>
	</q-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { Crop, CropType, OperationType, Assessment, Operation } from "../../models"
import { colors, textColors } from './colors'


const form: Operation = {
	type: undefined,
	date: undefined,
	area: undefined,
	comment: '',
	assessment: null,
	crop: null
}

@Component
export default class OperationList extends Vue {

	form = { ...form }

	type = null

	@Prop(Boolean)
	readonly value: boolean

	@Prop(Number)
	readonly fieldId: number

	@Prop({
		type: Crop,
		required: true
	})
	readonly crop: Crop

	@Watch('value')
	onValueChange () {
		this.form = { ...form }
		this.form.crop = this.crop
	}

	@Watch('type')
	onTypeChange (n) {
		this.form.type = n.value
	}

	get cropType () {
		return this.$t(`cropTypes.${CropType[this.crop.type]}`)
	}

	get cropSubtype () {
		return `ПОБЕДА 50`
	}

	get operationOptions () {
		return Object
			.keys(OperationType)
			.filter(el => !Number.isNaN(+el))
			.map(type => {
				return {
					value: +type,
					label: this.$t(`operaionTypes.${OperationType[type]}`)
				}
			})
	}

	get assessmentOptions () {
		return Object
			.keys(Assessment)
			.filter(el => !Number.isNaN(+el))
			.map(type => {
				const label = this.$t(`operaionTypes.${Assessment[type]}`) as string

				return {
					value: type,
					label: label.length > 7
						? label.substr(0, 5) + '.'
						: label
				}
			})
	}

	get assessmentColor () {
		return colors[this.form.assessment]
	}

	get assessmentTextColor () {
		return textColors[this.form.assessment]
	}

}
</script>

<style lang="stylus">
.OperationModal
	background #fff
	width 400px
	position relative

	section
		padding 20px

	&__name
		padding 20px
		font-weight 500
		font-size 21px
		line-height 24px
		letter-spacing -0.933333px

	&__field
		display grid
		grid-gap 10px
		grid-auto-flow column
		justify-content space-between
		padding 20px

.OperationModalField
.OperationModalCrop
	width max-content
	display grid
	grid-gap 0 10px 
	grid-template-columns auto auto
	line-height 16px

.OperationModalField
	&__box
		width 40px
		height 40px
		grid-row 1 / 3
		background #73FF82
		border 1px solid #66CC66

	&__num
		font-weight bold
		font-size 16px

.OperationModalCrop
	text-align right

	&__type
		font-size 16px
		line-height 21px

	&__subtype
		font-weight 500
		font-size 10px
		line-height 11px

	&__img
		width 40px
		height 40px
		grid-column 2 / 3
		grid-row 1 / 3

.OperationModalForm
	display grid
	grid-template-columns 1fr 1fr
	grid-gap 10px
	align-items start
	&__op
		grid-column 1 / 3


.OperationModalAssessment
	display grid
	grid-gap 20px

	--color var(--q-color-primary)
	--text-color var(--q-color-white)

	&__title
		font-weight 500
		font-size 14px
		line-height 16px

	&__btns
		justify-self center
		button
			padding 10px 24px

	.bg-primary
		background var(--color) !important
		color var(--text-color) !important

.OperationModalAdd
	width 100%
	height 70px
	background #66CC66
	color white
	position absolute
	bottom 0
	right 0
	left 0
</style>
