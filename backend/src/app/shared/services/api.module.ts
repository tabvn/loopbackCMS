import {JSONSearchParams} from './core/search.params';
import {ErrorHandler} from './core/error.service';
import {AuthService} from './core/auth.service';
import {AppModels} from './custom/app.models';
import {InternalStorage, AppStorage} from '../storage/storage.swaps';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CookieBrowser} from '../storage/cookie.browser';
import {StorageBrowser} from '../storage/storage.browser';
import {UserService} from './custom/user.service';
import {AppService} from "./app.service";
import {RoleService} from "./custom/role.service";
import {VocabularyService} from "./custom/vocabulary.service";
import {TaxonomyService} from "./custom/taxonomy.service";
import {NodeService} from "./custom/node.service";
import {FriendService} from "./custom/friend.service";


@NgModule({
	providers: [
		ErrorHandler
	]
})

export class ApiModule {
	static forRoot(internalStorageProvider: any = {
		provide: InternalStorage,
		useClass: CookieBrowser
	}): ModuleWithProviders {
		return {
			ngModule: ApiModule,
			providers: [
				AppService,
				AuthService,
				JSONSearchParams,
				AppModels,
				VocabularyService,
				NodeService,
				TaxonomyService,
				UserService,
				RoleService,
				FriendService,
				internalStorageProvider,
				{provide: AppStorage, useClass: StorageBrowser}
			]
		};
	}
}