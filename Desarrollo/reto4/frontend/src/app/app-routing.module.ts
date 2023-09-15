import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PiedraPapelTijeraComponent } from './piedrapapeltijera/piedrapapeltijera.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  { path: 'menu', component: MenuComponent },

  { path: 'piedrapapeltijera', component: PiedraPapelTijeraComponent },

  { path: 'ahorcado', component: AhorcadoComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
