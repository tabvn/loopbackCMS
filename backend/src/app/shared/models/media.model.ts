declare var Object: any;
export interface MediaInterface {
	id?: string;
	name?: string;
	container?: string;
	size?: number;
	type?: string;
	userId?: string;
	createdAt: any;
	updatedAt: any;

}

export class Media implements MediaInterface {
	id?: string;
	name?: string;
	container?: string;
	size?: number;
	type?: string;
	userId?: string;
	createdAt: any;
	updatedAt: any;

	constructor(data?: MediaInterface) {
		Object.assign(this, data);
	}

	public static getModelName() {
		return "media";
	}

	public static factory(data: MediaInterface): Media {
		return new Media(data);
	}

	public static getModelDefinition() {
		return {
			name: 'media',
			plural: 'media',
			properties: {
				name: {
					name: 'name',
					type: 'string',
				},
				type: {
					name: 'type',
					type: 'string',
				},
				size: {
					name: 'size',
					type: 'number',
				},
				container: {
					name: 'container',
					type: 'string',
				},
				userId: {
					name: 'userId',
					type: 'string',
				},
				id: {
					name: 'id',
					type: 'string'
				},
				createdAt: {
					name: 'createdAt',
					type: 'Date'
				},
				updatedAt: {
					name: 'updatedAt',
					type: 'Date'
				}
			},
			relations: {}
		}
	}
}