import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';
import {ApiConfig} from "../../api.config";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs";

@Injectable()
export class RealtimeService {
    public socket;
    private cached: any[] = [];
    private userId: string;

    constructor(private auth: AuthService) {

        this.userId = this.auth.getCurrentUserId();

    }

    connect(): void {

        let accessTokenId = this.auth.getAccessTokenId();
        let userId = this.auth.getCurrentUserId();
        this.userId = userId;

        let serverURL = ApiConfig.getPath();
        this.socket = socketIo(serverURL);
        this.socket.emit('authentication', {id: accessTokenId, userId: userId});


        this.socket.on('authenticated', () => {

        });

        this.socket.on("disconnect", () => {

        });

        this.auth.onAuthChange$.subscribe(user => {

            let token = this.auth.getAccessTokenId();
            let uid: string;
            if (user && user.id) {
                uid = user.id;
            }
            if (uid !== this.userId) {
                this.unSubscribeUser(this.userId);
                this.reconnect();
                this.userId = uid;
            }


        });


    }

    reconnect() {
        this.disconnect();
        this.connect();
    }

    disconnect() {
        this.socket.disconnect();

    }

    observable(options: any): Observable<any> {

        let userId = this.auth.getCurrentUserId();

        if (!this.socket.connected) {
            this.connect();
        }

        let subject: Subject<any> = new Subject<any>();

        if (options) {

            let modelId = options.modelId;
            let method = options.method;
            let subscriptionName: string;

            subscriptionName = '/' + options.model + '/' + method;

            if (modelId) {
                subscriptionName = '/' + options.model + '/' + modelId + '/' + method;
            }

            this.socket.on(subscriptionName, (data: any) => {
                subject.next(data);


            });

            let userSubscription = userId ? userId : "everyone";

            let subscriptionObject: any = {
                user: userSubscription,
                subscription: subscriptionName,
            };
            this.cached.push(subscriptionObject);


        } else {
            return Observable.throw("Options must be an object");
        }

        return subject.asObservable();
    }

    unSubscribeAll(): void {
        for (let i = 0; i < this.cached.length; i++) {
            this.socket.removeAllListeners(this.cached[i]);
        }
        this.cached = [];
    }

    unSubscribeUser(userId: string): void {

        if (this.cached && this.cached.length) {
            let user = userId ? userId : "everyone";

            let userSubscriptions = this.cached.filter((item) => item.user === user);
            if (userSubscriptions && userSubscriptions.length) {
                for (let i = 0; i < userSubscriptions.length; i++) {
                    this.socket.removeAllListeners(userSubscriptions[i]);
                }
            }
            this.cached = this.cached.filter((item) => item.user !== user);
        }

    }


}