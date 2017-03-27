declare var Object: any;
export interface NodeInterface {
    id?: string;
    title?: string;
    body?: string;
    createdAt?: any;
    updatedAt?: any;
    status?: number;
    taxonomies?: any[];
    images?: any[];


}

export class Node implements NodeInterface {

    id?: string;
    title?: string;
    body?: string;
    createdAt?: any;
    updatedAt?: any;
    status?: number;
    taxonomies?: any[];
    images?: any[];

    constructor(data?: NodeInterface) {
        Object.assign(this, data);
    }

    public static getModelName() {
        return "node";
    }

    public static factory(data: NodeInterface): Node {
        return new Node(data);
    }

    public static getModelDefinition() {
        return {
            name: 'node',
            plural: 'nodes',
            properties: {
                title: {
                    name: 'title',
                    type: 'string',
                },
                body: {
                    name: 'body',
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
            relations: {
                user: {
                    name: 'user',
                    type: 'any',
                    model: 'user'
                }
            }
        }
    }
}