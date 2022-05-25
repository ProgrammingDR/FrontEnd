import { Pipe, PipeTransform } from '@angular/core';
import { single } from 'rxjs';

@Pipe({
  name: 'ventaFilter'
})

export class VentaFilterPipe implements PipeTransform {

  transform(value:any[],campo:string, ...args: any[]):any {
    if (!value) return null;
    if(!args) return value;
    return value.filter(single => single[campo].toLowerCase().includes(args));
  }
}
