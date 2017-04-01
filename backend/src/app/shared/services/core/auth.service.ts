import {Observable, Subscriber, Subject} from "rxjs";
declare var Object: any;
import {Injectable, Inject} from '@angular/core';
import {InternalStorage} from '../../storage/storage.swaps';
import {SDKToken} from '../../models/base.model';
import {User} from "../../models/user.model";
import {ApiConfig} from "../../api.config";

@Injectable()
export class AuthService {

	public onAuthChange$: Subject<User> = new Subject<User>();
	public currentUser$: Observable<User> = new Observable<User>();
	public _isAdmin: Subject<boolean> = new Subject<boolean>();
	public isAdmin: boolean = false;

	public isAdmin$: Observable<boolean> = this._isAdmin.asObservable();

	/**
	 * @type {SDKToken}
	 **/
	private token: SDKToken = new SDKToken();
	/**
	 * @type {string}
	 **/
	protected prefix: string = '$LoopBackSDK$';

	/**
	 * @method constructor
	 * @param {InternalStorage} storage Internal Storage Driver
	 * @description
	 * The constructor will initialize the token loading data from storage
	 **/
	constructor(@Inject(InternalStorage) protected storage: InternalStorage) {
		this.token.id = this.load('id');
		this.token.user = this.load('user');
		this.token.userId = this.load('userId');
		this.token.issuedAt = this.load('issuedAt');
		this.token.created = this.load('created');
		this.token.ttl = this.load('ttl');
		this.token.rememberMe = this.load('rememberMe');

		this.setCurrentUser(this.token.user);

		this._isAdmin.subscribe(data => {
			this.isAdmin = data;
			console.log("hi", data);
		});
	}

	/**
	 * @method setRememberMe
	 * @param {boolean} value Flag to remember credentials
	 * @return {void}
	 * @description
	 * This method will set a flag in order to remember the current credentials
	 **/
	public setRememberMe(value: boolean): void {
		this.token.rememberMe = value;
	}

	/**
	 * @method setUser
	 * @param {any} user Any type of user model
	 * @return {void}
	 * @description
	 * This method will update the user information and persist it if the
	 * rememberMe flag is set.
	 **/
	public setUser(user: any) {
		this.token.user = user;
		this.save();
	}

	/**
	 * @method setToken
	 * @param {SDKToken} token SDKToken or casted AccessToken instance
	 * @return {void}
	 * @description
	 * This method will set a flag in order to remember the current credentials
	 **/
	public setToken(token: SDKToken): void {
		this.token = Object.assign(this.token, token);
		this.save();
		this.setCurrentUser(token.user);

	}

	setCurrentUser(user: User) {


		this.currentUser$ = new Observable<User>((observer: Subscriber<User>) => {
			observer.next(user);
		});

		this.onAuthChange$.next(user);

		let isAdmin = this.isAdministrator(user);
		this._isAdmin.next(isAdmin);
		this.isAdmin = isAdmin;
		this.isAdmin$ = this._isAdmin.asObservable();

	}
	public isAdministrator(user?: User) {
		if (user) {
			if (user && user.roles) {
				let roles = user.roles;
				if (roles.length) {
					let adminRoles = ApiConfig.getAdminRoles();
					for (let i = 0; i < adminRoles.length; i++) {
						for (let j = 0; j < roles.length; j++) {
							if (roles[j].name == adminRoles[i]) {
								return true;
							}
						}
					}
				}

			}
		}

		return false;
	}

	/**
	 * get user avatar
	 */

	public getCurrentUserAvatar(): string {
		let user = this.getCurrentUserData();
		if (user && user.avatar && user.avatar.media) {
			return user.avatar.media.name;
		}
		return null;
	}


	/**
	 * @method getToken
	 * @return {void}
	 * @description
	 * This method will set a flag in order to remember the current credentials.
	 **/
	public getToken(): SDKToken {
		return <SDKToken> this.token;
	}

	/**
	 * @method getAccessTokenId
	 * @return {string}
	 * @description
	 * This method will return the actual token string, not the object instance.
	 **/
	public getAccessTokenId(): string {
		return this.token.id;
	}

	/**
	 * @method getCurrentUserId
	 * @return {any}
	 * @description
	 * This method will return the current user id, it can be number or string.
	 **/
	public getCurrentUserId(): any {
		return this.token.userId;
	}

	/**
	 * @method getCurrentUserData
	 * @return {any}
	 * @description
	 * This method will return the current user instance.
	 **/
	public getCurrentUserData(): any {
		return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
	}

	/**
	 * @method save
	 * @return {boolean} Wether or not the information was saved
	 * @description
	 * This method will save in either local storage or cookies the current credentials.
	 * But only if rememberMe is enabled.
	 **/
	public save(): boolean {


		if (this.token.rememberMe) {
			this.persist('id', this.token.id);
			this.persist('user', this.token.user);
			this.persist('userId', this.token.userId);
			this.persist('issuedAt', this.token.issuedAt);
			this.persist('created', this.token.created);
			this.persist('ttl', this.token.ttl);
			this.persist('rememberMe', this.token.rememberMe);
			return true;
		} else {
			return false;
		}
	};

	/**
	 * @method load
	 * @param {string} prop Property name
	 * @return {any} Any information persisted in storage
	 * @description
	 * This method will load either from local storage or cookies the provided property.
	 **/
	protected load(prop: string): any {
		return this.storage.get(`${this.prefix}${prop}`);
	}

	/**
	 * @method clear
	 * @return {void}
	 * @description
	 * This method will clear cookies or the local storage.
	 **/
	public clear(): void {
		Object.keys(this.token).forEach((prop: string) => this.storage.remove(`${this.prefix}${prop}`));
		this.token = new SDKToken();
		this.setCurrentUser(null);
	}

	/**
	 * @method clear
	 * @return {void}
	 * @description
	 * This method will clear cookies or the local storage.
	 **/
	protected persist(prop: string, value: any): void {
		try {
			this.storage.set(
				`${this.prefix}${prop}`,
				(typeof value === 'object') ? JSON.stringify(value) : value
			);
		}
		catch (err) {
			console.error('Cannot access local/session storage:', err);
		}
	}
}