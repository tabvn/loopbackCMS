import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {PageMessage} from "../models/page-message";

@Injectable()
export class MainService {

    message$: Subject<PageMessage> = new Subject<PageMessage>();

    constructor() {

        this.message$.subscribe(msg => this.message$.next(msg));
    }


}
