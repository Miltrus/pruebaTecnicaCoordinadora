import { NgModule } from '@angular/core';

import { PremiosRoutingModule } from './premios-routing.module';

import { ListPremiosComponent } from './list-premios/list-premios.component';
import { NewPremioComponent } from './new-premio/new-premio.component';
import { EditPremioComponent } from './edit-premio/edit-premio.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListPremiosComponent,
    NewPremioComponent,
    EditPremioComponent
  ],
  imports: [
    SharedModule,
    PremiosRoutingModule
  ]
})
export class PremiosModule { }
