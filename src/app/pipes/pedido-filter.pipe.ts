import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pedidoFilter'
})
export class PedidoFilterPipe implements PipeTransform {

  transform(value:any[],campo:string, ...args: any[]):any {
    if (!value) return null;
    if(!args) return value;
    return value.filter(single => single[campo].toLowerCase().includes(args));
  }

}
