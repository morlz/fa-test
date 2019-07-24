<template>
	<div class="OperationList">
		<q-table
			:columns="columns"
			:data="content"
			:pagination.sync="pg"
			flat
			hide-bottom
			row-key="id"
		>
			<template v-slot:body="props">
				<q-tr :props="props">
					<q-td
						:key="props.cols[0].name"
						:props="props"
					>{{ props.cols[0].value }}</q-td>

					<q-td
						:key="props.cols[1].name"
						:props="props"
					>{{ props.cols[1].value }}</q-td>

					<q-td
						:key="props.cols[2].name"
						:props="props"
					>
						<q-img
							:src="props.row.crop.icon"
							class="OperationList__icon"
							v-if="props.row.crop"
						/>
						{{ props.cols[2].value }}
					</q-td>

					<q-td
						:class="{
							'empty': props.row.assessment === null
						}"
						:key="props.cols[3].name"
						:props="props"
					>
						<assessment-mark :content="props.row.assessment" />
						{{ props.cols[3].value }}
					</q-td>
				</q-tr>
			</template>
		</q-table>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { namespace } from "vuex-class"
import { Operation, OperationType, Assessment, CropType } from '../../models'
import moment from 'moment'
import AssessmentMark from './AssessmentMark.vue'

@Component({
	components: {
		AssessmentMark
	}
})
export default class OperationList extends Vue {

	pg = { rowsPerPage: 0, sortBy: 'string' }

	@Prop({
		type: Array,
		required: true,
		validator: arr => arr.every(el => el instanceof Operation)
	}) readonly content: Operation[]


	get columns () {
		return [
			{
				name: 'date',
				align: 'left',
				label: this.$t('date'),
				field: (row: Operation) => moment(row.date).format('DD MMM YYYY'),
				sortable: true
			},
			{
				name: 'op',
				align: 'left',
				label: this.$t('operation'),
				field: (row: Operation) => row.type,
				format: (type: OperationType) => OperationType[type] === undefined
					? this.$t(`fieldEmpty`)
					: this.$t(`operaionTypes.${OperationType[type]}`),
				sortable: true
			},
			{
				name: 'crop',
				align: 'left',
				label: this.$t('crop'),
				field: (row: Operation) => row.crop.type,
				format: (type: CropType) => CropType[type] === undefined
					? this.$t(`fieldEmpty`)
					: this.$t(`cropTypes.${CropType[type]}`),
				sortable: true
			},
			{
				name: 'assessment',
				align: 'left',
				label: this.$t('assessment'),
				field: (row: Operation) => row.assessment,
				format: (type: Assessment) => Assessment[type] === undefined
					? this.$t(`fieldEmpty`)
					: this.$t(`assessmentTypes.${Assessment[type]}`),
				sortable: true
			},
		]
	}

	get assessmentColors () {
		return {
			[Assessment.EXCELLENT]: 0x66CC66,
			[Assessment.SATISFACTORILY]: 0xFFE06D,
			[Assessment.BADLY]: 0xFF7360,
		}
	}
}
</script>

<style lang="stylus" scoped>
.OperationList
	&__icon
		margin-right 10px
		width 32px

.empty
	opacity .3
</style>

<style lang="stylus">
.OperationList
	thead
		background #EDEEEE
		box-shadow 0px 4px 4px rgba(0, 0, 0, .25)

	.scroll
		overflow auto !important
</style>