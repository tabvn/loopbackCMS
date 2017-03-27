import {Pipe, PipeTransform} from '@angular/core';
import {ApiConfig} from "../api.config";

@Pipe({
	name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

	transform(value: any, imageStyle?: any): any {
		if (!imageStyle) {
			imageStyle = "thumbnail_150";
		}
		return ApiConfig.getFileServer() + "/" + imageStyle + '/' + value;
	}

}
