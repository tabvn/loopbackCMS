import {Component, OnInit} from '@angular/core';
import {Node} from "../../../../../backend/src/app/shared/models/node.model";
import {ActivatedRoute} from "@angular/router";
import {NodeService} from "../../../../../backend/src/app/shared/services/custom/node.service";

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

    model: Node = new Node();

    constructor(private route: ActivatedRoute, private nodeService: NodeService) {

    }

    ngOnInit() {

        let id = this.route.snapshot.params['id'];
        this.nodeService.findById(id).subscribe(data => this.model = data);

    }

}
