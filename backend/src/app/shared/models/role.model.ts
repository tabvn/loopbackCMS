declare var Object: any;
export interface RoleInterface {
	id?: string;
	name?: string;
	description?: string;

}

export class Role implements RoleInterface {
	id?: string;
	name?: string;
	description?: string;

	constructor(data?: RoleInterface) {
		Object.assign(this, data);
	}

	public static getModelName() {
		return "role";
	}

	public static factory(data: RoleInterface): Role {
		return new Role(data);
	}

	public static getModelDefinition() {
		return {
			name: 'role',
			plural: 'roles',
			properties: {
				name: {
					name: 'name',
					type: 'string',
				},
				description: {
					name: 'description',
					type: 'string',
				},
				id: {
					name: 'id',
					type: 'string'
				},
			},
			relations: {}
		}
	}
}