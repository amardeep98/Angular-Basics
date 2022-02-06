import { Pipe, PipeTransform } from "@angular/core";
import { subscribeToResult } from "rxjs/internal-compatibility";

@Pipe({                               //decorator for a custom pipe
    name: 'shorten'
})

export class ShortenPipe implements PipeTransform{
    transform(value: any){
        if(value.length > 10){
            return value.substr(0, 10) + '...';
        }
        return value;
    }
}