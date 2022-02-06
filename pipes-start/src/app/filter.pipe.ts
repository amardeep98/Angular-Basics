import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false                       //applies on the data even when it changes during run-time, not advisable to use
})
export class FilterPipe implements PipeTransform {

  transform(value: any, status: string, filterString: string): unknown {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    const filterArray = [];
    for(let item of value){
      if(item[status] === filterString){
        filterArray.push(item);
      }
    }
    return filterArray;
  }

}

//by default pipe is triggered on the change of input, but change of data(updating arrays or objects) doesn't trigger it
