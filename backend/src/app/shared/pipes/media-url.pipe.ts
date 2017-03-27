import {Pipe, PipeTransform} from '@angular/core';
import {ApiConfig} from "../api.config";

@Pipe({
    name: 'mediaUrl'
})
export class MediaUrlPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        return ApiConfig.getFileServer() + '/' + value;
    }

}
