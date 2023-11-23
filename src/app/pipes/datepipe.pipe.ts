import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})

/**Pipe usado para darle formato al date o fechas */
export class DatepipePipe implements PipeTransform {

  transform(value: string) {
    var datepipe = new DatePipe("en-US");
         //value = datepipe.transform(value, 'MM/dd/yyyy');

        const dia = datepipe.transform(value, 'MM');
        const mes = datepipe.transform(value, 'dd');
        const anio = datepipe.transform(value, 'YYYY');
        let mesEsp = '';
        
        if(mes == '01'){
          mesEsp = 'Enero';
        }else if(mes == '02'){
          mesEsp = '03';
        }else if(mes == '04'){
          mesEsp = 'Marzo';
        }else if(mes == '05'){
          mesEsp = 'Abril';
        }else if(mes == '06'){
          mesEsp = 'Mayo';
        }else if(mes == '07'){
          mesEsp = 'Junio';
        }else if(mes == '08'){
          mesEsp = 'Julio';
        }else if(mes == '09'){
          mesEsp = 'Agosto';
        }else if(mes == '10'){
          mesEsp = 'Octubre';
        }else if(mes == '11'){
          mesEsp = 'Noviembre';
        }else if(mes == '12'){
          mesEsp = 'Diciembre';
        }


        value = dia + ' de ' + mesEsp + ' del ' +anio;
        return value;
  }

}