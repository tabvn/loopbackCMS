import {Injectable} from '@angular/core';

@Injectable()
export class StorageBrowser {
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    get(key: string): any {
        let data: string = localStorage.getItem(key);
        return this.parse(data);
    }

    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    set(key: string, value: any): void {
        localStorage.setItem(
            key,
            typeof value === 'object' ? JSON.stringify(value) : value
        );
    }

    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    remove(key: string): void {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        } else {
            console.log('Trying to remove unexisting key: ', key);
        }
    }

    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    private parse(value: any) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
}