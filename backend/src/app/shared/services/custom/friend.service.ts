import {Inject, Optional} from '@angular/core';
import {Http} from '@angular/http';
import {AppModels} from './app.models';
import {BaseService} from '../core/base.service';
import {ApiConfig} from '../../api.config';
import {AuthService} from '../core/auth.service';
import {JSONSearchParams} from '../core/search.params';
import {ErrorHandler} from '../core/error.service';
import {Observable} from 'rxjs/Rx';

export class FriendService extends BaseService {


	constructor(@Inject(Http) protected http: Http,
							@Inject(AppModels) protected models: AppModels,
							@Inject(AuthService) protected auth: AuthService,
							@Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
							@Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
		super(http, models, auth, searchParams, errorHandler);
	}


	public patchOrCreate(data: any = {}, options: any = {}): Observable<any> {
		let _method: string = "PATCH";
		let _url: string = ApiConfig.getPath() + "/" + ApiConfig.getApiVersion() +
			"/friends";
		let _routeParams: any = {};
		let _postBody: any = {
			data: data
		};
		let _urlParams: any = {};
		let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
		return result;
	}


	public patchAttributes(id: any, data: any = {}): Observable<any> {
		let _method: string = "PATCH";
		let _url: string = ApiConfig.getPath() + "/" + ApiConfig.getApiVersion() +
			"/friends/:id";
		let _routeParams: any = {
			id: id
		};
		let _postBody: any = {
			data: data
		};
		let _urlParams: any = {};
		let result = this.request(_method, _url, _routeParams, _urlParams, _postBody);
		return result;
	}


	public getModelName() {
		return 'Friend';
	}
}