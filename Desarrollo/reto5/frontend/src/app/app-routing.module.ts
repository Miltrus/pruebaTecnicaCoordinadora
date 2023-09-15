import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' }, //ruta x defecto

  { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },


  {
    path: 'empleados',
    loadChildren: () => import('./views/empleados/empleados.module').then(m => m.EmpleadosModule)
  },


  {
    path: 'premios',
    loadChildren: () => import('./views/premios/premios.module').then(m => m.PremiosModule)
  },

  {
    path: 'puntajes',
    loadChildren: () => import('./views/puntajes/puntajes.module').then(m => m.PuntajesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
