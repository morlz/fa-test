
export enum CropType {
	WHEAT = 1
}

export class Crop {
	id?: string | null
	type: CropType
	icon: string

	constructor(args: Crop) {
		const {
			id = null,
			type,
			icon,
		} = args

		this.id = id
		this.type = type
		this.icon = icon
	}

}
