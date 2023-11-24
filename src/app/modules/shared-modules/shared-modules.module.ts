import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoPipe } from 'src/app/pipes/medico.pipe';


@NgModule({
  declarations: [
    MedicoPipe
  ],
  imports: [
    CommonModule
  ],exports:[
    MedicoPipe
  ]
})
export class SharedModulesModule { }
