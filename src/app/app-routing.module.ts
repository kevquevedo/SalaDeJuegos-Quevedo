import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JuegosComponent } from './juegos/juegos.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component:HomeComponent,
    children:
    [
      {path: 'juegos', component:JuegosComponent},
      {path: 'quiensoy', component:QuienSoyComponent}
    ]
  },
  {path: 'registro', component: RegistroComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
