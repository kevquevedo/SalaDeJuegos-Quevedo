import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistroComponent } from './registro/registro.component';
import { ChatComponent } from './chat/chat.component';
import { LogueadoGuard } from './guards/logueado.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component:HomeComponent,
    children:
    [
      {path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(r => r.JuegosModule)},
      {path: 'quiensoy', component:QuienSoyComponent},
      {path: 'chat', component:ChatComponent, canActivate:[LogueadoGuard]}
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
