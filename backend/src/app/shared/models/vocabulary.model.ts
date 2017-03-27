declare var Object: any;
export interface VocabularyInterface {
    title?: string;
    name?: string;
    description?: string;
    taxonomies?: any[];
    createdAt: any;
    updatedAt: any;

}

export class Vocabulary implements VocabularyInterface {
    title?: string;
    name?: string;
    description?: string;
    createdAt: any;
    updatedAt: any;

    constructor(data?: VocabularyInterface) {
        Object.assign(this, data);
    }

    public static getModelName() {
        return "vocabulary";
    }

    public static factory(data: VocabularyInterface): Vocabulary {
        return new Vocabulary(data);
    }

    public static getModelDefinition() {
        return {
            name: 'vocabulary',
            plural: 'vocabularies',
            properties: {
                title: {
                    name: 'title',
                    type: 'string',
                },
                name: {
                    name: 'name',
                    type: 'string',
                },
                description: {
                    name: 'description',
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
                    name: 'taxonomies',
                    type: 'any[]',
                    model: 'taxonomy'
                }
            }
        }
    }
}