declare var Object: any;
export interface TaxonomyInterface {
	id?: string;
	title?: string;
	description?: string;
	vocabulary?: any;
	vocabularyId?: string;
	parentId?: string;
	children: any[];
	createdAt: any;
	updatedAt: any;


}

export class Taxonomy implements TaxonomyInterface {
	id?: string;
	title?: string;
	description?: string;
	vocabulary?: any;
	vocabularyId?: string;
	parentId?: string;
	children: any[];
	createdAt: any;
	updatedAt: any;

	constructor(data?: TaxonomyInterface) {
		Object.assign(this, data);
	}

	public static getModelName() {
		return "taxonomy";
	}

	public static factory(data: TaxonomyInterface): Taxonomy {
		return new Taxonomy(data);
	}

	public static getModelDefinition() {
		return {
			name: 'taxonomy',
			plural: 'taxonomies',
			properties: {
				title: {
					name: 'title',
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
				vocabylaryId: {
					name: 'vocabularyId',
					type: 'string',
				},
				parentId: {
					name: 'parentId',
					type: 'string',
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
			relations: {
				taxonomies: {
					name: 'vocabulary',
					type: 'any',
					model: 'vocabulary'
				}
			}
		}
	}
}