import { NgModule } from '@angular/core';

import { EmpleadosRoutingModule } from './empleados-routing.module';

import { ListEmpleadosComponent } from './list-empleados/list-empleados.component';
import { NewEmpleadoComponent } from './new-empleado/new-empleado.component';
import { EditEmpleadoComponent } from './edit-empleado/edit-empleado.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListEmpleadosComponent,
    NewEmpleadoComponent,
    EditEmpleadoComponent
  ],
  imports: [
    SharedModule,
    EmpleadosRoutingModule
  ]
})
export class EmpleadosModule { }
