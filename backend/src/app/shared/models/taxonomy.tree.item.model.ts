export class TaxonomyTreeItem {


    constructor(public model?: any, public checked?: boolean, public level?: number) {
        if (!this.level) {
            this.level = 0;
        }
    }
}