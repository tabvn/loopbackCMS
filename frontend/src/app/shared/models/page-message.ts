export class PageMessage {
    public type?: string;
    public text?: string;
    public dismissible?: boolean;

    constructor() {
        if (!this.dismissible) {
            this.dismissible = true;
        }
    }
}