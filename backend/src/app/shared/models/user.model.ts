declare var Object: any;
export interface UserInterface {
    firstName?: string;
    lastName?: string;
    realm?: string;
    username?: string;
    password: string;
    email: string;
    emailVerified?: boolean;
    verificationToken?: string;
    id?: string;
    roles?: any[];
    avatar?: any;
    createdAt: Date;
    updatedAt: Date;
}

export class User implements UserInterface {
    firstName?: string;
    lastName?: string;
    realm: string;
    username: string;
    password: string;
    email: string;
    emailVerified: boolean;
    verificationToken: string;
    id: string;
    roles: any[];
    avatar?: any;
    createdAt: Date;
    updatedAt: Date;

    constructor(data?: UserInterface) {
        Object.assign(this, data);
    }

    public static getModelName() {
        return "user";
    }

    public static factory(data: UserInterface): User {
        return new User(data);
    }

    public static getModelDefinition() {
        return {
            name: 'user',
            plural: 'users',
            properties: {
                firstName: {
                    name: 'firstName',
                    type: 'string',
                },
                lastName: {
                    name: 'lastName',
                    type: 'string',
                },
                realm: {
                    name: 'realm',
                    type: 'string'
                },
                username: {
                    name: 'username',
                    type: 'string'
                },
                password: {
                    name: 'password',
                    type: 'string'
                },
                email: {
                    name: 'email',
                    type: 'string'
                },
                emailVerified: {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                verificationToken: {
                    name: 'verificationToken',
                    type: 'string'
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
                roles: {
                    name: 'roles',
                    type: 'any[]',
                    model: 'role'
                },
                avatar: {
                    name: 'avatar',
                    type: 'any[]',
                    model: 'role'
                }
            }
        }
    }
}