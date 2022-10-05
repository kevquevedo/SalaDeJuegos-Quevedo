import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { JuegosComponent } from './juegos.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';

const routes: Routes = [

  {path: '', component:JuegosComponent},
  {path: 'mayorMenor', component:MayorMenorComponent},
  {path: 'ahorcado', component:AhorcadoComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
