
import { fieldService } from '../../services'
import { Operation } from '../../models'

export const getAllOperations = async ({ commit }: any) => {
	commit('loadingSet', { operations: true })
	try {
		const operations = await fieldService.getOperations()
		commit('cachedSet', { operations })
	} catch (err) {
		// TODO: handle errors
	}
	commit('loadingSet', { operations: false })
}

export const addOperation = async ({ dispatch }, form) => {
	try {
		const operation = new Operation(form)
		const operations = await fieldService.saveOperation(operation)
	} catch (err) {
		// TODO: handle errors
	}

	dispatch('getAllOperations')
}