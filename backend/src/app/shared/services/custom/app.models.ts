import {Injectable} from '@angular/core';
import {User} from "../../models/user.model";
import {Role} from "../../models/role.model";
import {Media} from "../../models/media.model";
import {Vocabulary} from "../../models/vocabulary.model";
import {Taxonomy} from "../../models/taxonomy.model";
import {Node} from "../../models/node.model";
import {Friend} from "../../models/friend.model";
export interface Models { [name: string]: any

}

@Injectable()
export class AppModels {

	private models: Models = {
		User: User,
		Role: Role,
		Media: Media,
		Taxonomy: Taxonomy,
		Vocabulary: Vocabulary,
		Node: Node,
		Friend: Friend
	};

	public get(modelName: string): any {
		return this.models[modelName];
	}

	public getAll(): Models {
		return this.models;
	}

	public getModelNames(): string[] {
		return Object.keys(this.models);
	}
}