import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { HttpClientModule } from '@angular/common/http';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { JuegosComponent } from './juegos.component';


@NgModule({
  declarations: [
    JuegosComponent,
    MayorMenorComponent,
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HttpClientModule
  ]
})
export class JuegosModule { }
