import {Injectable} from '@angular/core';
import {Observable, Subscriber} from "rxjs";

@Injectable()
export class AppService {

    appTitle$: Observable<string>;
    breadcrumb$: Observable<any>;


    constructor() {

    }

    setTitle(title: string) {
        this.appTitle$ = new Observable<string>((observer: Subscriber<string>) => {
            observer.next(title);
        });
    }

    setBreadcrumb(items: any) {
        this.breadcrumb$ = new Observable<string>((observer: Subscriber<any>) => {
            observer.next(items);
        });
    }

    getBreadcrumb(breadcrumb: any): any[] {

        if (breadcrumb && breadcrumb.length) {
            return breadcrumb;
        }
        return [];
    }


}
