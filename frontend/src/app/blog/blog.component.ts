import {Component, OnInit} from '@angular/core';
import {RealtimeService} from "../../../../backend/src/app/shared/services/core/realtime.service";
import {Node} from "../../../../backend/src/app/shared/models/node.model";
import {LoopBackFilter} from "../../../../backend/src/app/shared/models/base.model";
import {NodeService} from "../../../../backend/src/app/shared/services/custom/node.service";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


    models: any[] = [];
    page: number = 1;
    count: number = 0;

    filter: LoopBackFilter = {
        order: ["createdAt DESC"],
        limit: 8,
        where: {status: 1}
    };

    constructor(private realtime: RealtimeService, private nodeService: NodeService) {

        this.realtime.connect();

        let postSubscription = {
            method: "POST",
            model: "node"
        };
        this.realtime.observable(postSubscription).subscribe(data => {
            this.models.push(data);
            this.count++;
        });

        let deleteSubscription = {
            method: "DELETE",
            model: "node"
        };

        this.realtime.observable(deleteSubscription).subscribe(objectId => {
            console.log("Got data deleted from realtime", objectId);
            this.models = this.models.filter((item) => item.id !== objectId);
            this.count--;
        });
    }

    ngOnInit() {


        this.nodeService.count({status: 1}).subscribe(count => this.count = count.count);
        this.getModels();

    }

    getModels() {
        this.nodeService.find(this.filter).subscribe((response: any) => {
            this.models = response;
        });
    }

    pageChange(event: any) {
        if (this.page !== event) {
            this.page = event;
            this.filter.skip = this.filter.limit * (this.page - 1);
            this.getModels();
        }
    }

}
