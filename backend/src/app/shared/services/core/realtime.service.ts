import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';
import {ApiConfig} from "../../api.config";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs";

@Injectable()
export class RealtimeService {
    private socket;
    private container: string[] = [];

    constructor(private auth: AuthService) {
        this.initSocket();

        this.auth.currentUser$.subscribe(data => {

            if (data) {
                // used logged in
                this.initSocket();
            } else {
                this.socket.disconnect();
            }
        });

    }

    private initSocket(): void {
        let serverURL = ApiConfig.getPath();
        this.socket = socketIo(serverURL);

        let accessTokenId = this.auth.getAccessTokenId();
        let userId = this.auth.getCurrentUserId();

        this.socket.emit('authentication', {id: accessTokenId, userId: userId});

        this.socket.on('authenticated', () => {


        });

    }

    subscribe(options: any): Observable<any> {


        let subject: Subject<any> = new Subject<any>();

        if (options) {

            let model = options.model;
            let modelId = options.modelId;
            let method = options.method;
            let observableName: string;
            if (method === 'POST') {
                observableName = '/' + model + '/' + method;
            }
            else {
                observableName = '/' + model + '/' + modelId + '/' + method;
            }

            this.socket.on(observableName, (data: any) => {
                subject.next(data);
            });
            this.container.push(observableName);
        } else {
            return Observable.throw("Options must be an object");
        }

        return subject.asObservable();
    }

    unSubscribeAll() {
        for (let i = 0; i < this.container.length; i++) {
            this.socket.removeAllListeners(this.container[i]);
        }
        this.container = [];
    }


}