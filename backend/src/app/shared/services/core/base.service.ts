import {Injectable, Inject, Optional} from '@angular/core';
import {Http, Headers, RequestOptions, Request, RequestMethod} from '@angular/http';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {JSONSearchParams} from './search.params';
import {ErrorHandler} from './error.service';
import {AuthService} from './auth.service';
import {ApiConfig} from '../../api.config';
import {LoopBackFilter, AccessToken} from '../../models/base.model';
import {AppModels} from '../custom/app.models';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

declare var EventSource: any;


@Injectable()
export abstract class BaseService {

    protected path: string;
    protected model: any;

    constructor(@Inject(Http) protected http: Http,
                @Inject(AppModels) protected models: AppModels,
                @Inject(AuthService) protected auth: AuthService,
                @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
                @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
        this.model = this.models.get(this.getModelName());
    }

    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    public request(method: string,
                   url: string,
                   routeParams: any = {},
                   urlParams: any = {},
                   postBody: any = {}): Observable<any> {
        // Headers to be sent
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // Authenticate request
        this.authenticate(url, headers);
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach((key: string) => {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1")
        });
        // Body fix for built in remote methods using "data", "options" or "credentials
        // that are the actual body, Custom remote method properties are different and need
        // to be wrapped into a body object
        let body: any;
        let postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : []
        if (postBodyKeys.length === 1) {
            body = postBody[postBodyKeys[0]];
        } else {
            body = postBody;
        }
        // Separate filter object from url params and add to search query
        if (urlParams.filter) {


            headers.append('filter', JSON.stringify(urlParams.filter));
            delete urlParams.filter;
        }


        this.searchParams.setJSON(urlParams);

        var options = new RequestOptions({
            headers: headers,
            method: method,
            url: url,
            search: Object.keys(urlParams).length > 0
                ? this.searchParams.getURLSearchParams() : null,
            body: body ? JSON.stringify(body) : undefined
        });

        var req = new Request(options);


        return this.http.request(req)
            .map((res: any) => (res.text() != "" ? res.json() : {}))
            .catch((e) => this.errorHandler.handleError(e));
    }

    /**
     * @method authenticate
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    public authenticate<T>(url: string, headers: Headers): void {
        if (this.auth.getAccessTokenId()) {
            headers.append(
                'Authorization',
                ApiConfig.getAuthPrefix() + this.auth.getAccessTokenId()
            );
        }
    }

    /**
     * @method create
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    public create<T>(data: T): Observable<T> {
        return this.request('POST', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural
        ].join('/'), undefined, undefined, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method create
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    public createMany<T>(data: T[]): Observable<T[]> {
        return this.request('POST', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural
        ].join('/'), undefined, undefined, {data})
            .map((datum: T[]) => datum.map((data: T) => this.model.factory(data)));
    }

    /**
     * @method findById
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    public findById<T>(id: any, filter: LoopBackFilter = {}): Observable<T> {
        let _urlParams: any = {};
        if (filter) _urlParams.filter = filter;
        return this.request('GET', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id'
        ].join('/'), {id}, _urlParams, undefined).map((data: T) => this.model.factory(data));
    }

    /**
     * @method find
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    public find<T>(filter: LoopBackFilter = {}): Observable<T[]> {
        return this.request('GET', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural
        ].join('/'), undefined, {filter}, undefined)
            .map((datum: T[]) => datum.map((data: T) => this.model.factory(data)));
    }

    /**
     * @method exists
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    public exists<T>(id: any): Observable<T[]> {
        return this.request('GET', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id/exists'
        ].join('/'), {id}, undefined, undefined);
    }

    /**
     * @method findOne
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    public findOne<T>(filter: LoopBackFilter = {}): Observable<T> {
        return this.request('GET', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'findOne'
        ].join('/'), undefined, {filter}, undefined).map((data: T) => this.model.factory(data));
    }

    /**
     * @method updateAll
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    public updateAll<T>(where: any = {}, data: T): Observable<{ count: 'number' }> {
        let _urlParams: any = {};
        if (where) _urlParams.where = where;
        return this.request('POST', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'update'
        ].join('/'), undefined, _urlParams, {data});
    }

    /**
     * @method deleteById
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    public deleteById<T>(id: any): Observable<T> {
        return this.request('DELETE', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id'
        ].join('/'), {id}, undefined, undefined).map((data: T) => this.model.factory(data));
    }

    /**
     * @method count
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    public count(where: any = {}): Observable<{ count: number }> {
        let _urlParams: any = {};
        if (where) _urlParams.where = where;
        return this.request('GET', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'count'
        ].join('/'), undefined, _urlParams, undefined);
    }

    /**
     * @method updateAttributes
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    public updateAttributes<T>(id: any, data: T): Observable<T> {
        return this.request('PUT', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id'
        ].join('/'), {id}, undefined, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method upsert
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    public upsert<T>(data: any = {}): Observable<T> {
        return this.request('PUT', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
        ].join('/'), undefined, undefined, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method upsertPatch
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    public upsertPatch<T>(data: any = {}): Observable<T> {
        return this.request('PATCH', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
        ].join('/'), undefined, undefined, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method upsertWithWhere
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    public upsertWithWhere<T>(where: any = {}, data: any = {}): Observable<T> {
        let _urlParams: any = {};
        if (where) _urlParams.where = where;
        return this.request('POST', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method replaceOrCreate
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    public replaceOrCreate<T>(data: any = {}): Observable<T> {
        return this.request('POST', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method replaceById
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    public replaceById<T>(id: any, data: any = {}): Observable<T> {
        return this.request('POST', [
            ApiConfig.getPath(),
            ApiConfig.getApiVersion(),
            this.model.getModelDefinition().plural,
            ':id', 'replace'
        ].join('/'), {id}, undefined, {data}).map((data: T) => this.model.factory(data));
    }

    /**
     * @method createChangeStream
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    public createChangeStream(): Observable<any> {
        let subject = new Subject();
        if (typeof EventSource !== 'undefined') {
            let emit = (msg: any) => subject.next(JSON.parse(msg.data));
            var source = new EventSource([
                ApiConfig.getPath(),
                ApiConfig.getApiVersion(),
                this.model.getModelDefinition().plural,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        } else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    }

    /**
     * @method getModelName
     * @return {string}
     * @description
     * Abstract getModelName method
     */
    abstract getModelName(): string;
}