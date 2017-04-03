declare var Object: any;
export interface FriendInterface {
	id?: string,
	users?: any[]
}

export class Friend implements FriendInterface {

	public id?: string;
	public users?: any[];


	constructor(data?: FriendInterface) {
		Object.assign(this, data);
	}

	public static getModelName() {
		return "friend";
	}

	public static factory(data: FriendInterface): Friend {
		return new Friend(data);
	}

	public static getModelDefinition() {
		return {
			name: 'friend',
			plural: 'friends',
			properties: {
				id: {
					name: 'id',
					type: 'string',
				},
				users: {
					name: 'users',
					type: 'array',
				}

			},
			relations: {

			}
		}
	}
}