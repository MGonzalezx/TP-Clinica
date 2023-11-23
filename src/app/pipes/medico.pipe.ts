import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from '../clases/especialista';

@Pipe({
  name: 'medico'
})

/***Pipe que retorna el nombre del doc */
export class MedicoPipe implements PipeTransform {

  transform(value: Especialista, items: any): any {
    if(!value)return items;
      if(!items)return value;
      return value.apellido + ", " +value.nombre;
      
  }

}