import { Component, OnInit } from '@angular/core';
import { Cartas } from 'src/app/clases/cartas/cartas';
import { CartasService } from 'src/app/servicios/Cartas/cartas.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  existeNuevaCarta : boolean = false;
  nombreDeMazo!: string;
  ultimaCarta! : Cartas;
  nuevaCarta! : Cartas;
  puntaje : number = 0;
  public mensajeGameOver: boolean = false;
  public mensajeGameWin: boolean = false;

  constructor(private cartasService : CartasService) {
    this.cartasService.crearMazo();
    this.ultimaCarta = new Cartas('', '');
    this.nuevaCarta = new Cartas('', '');
  }

  ngOnInit(): void {

    this.cartasService.ultimaCarta.subscribe( respuesta => {
      this.ultimaCarta = new Cartas( (respuesta as any).value, (respuesta as any).image )
    })

    this.cartasService.nuevaCarta.subscribe( respuesta => {
      this.nuevaCarta = new Cartas( (respuesta as any).value, (respuesta as any).image )
    })
  }


  sacarNuevaCarta(parametro: string){

    this.nombreDeMazo = this.cartasService.nombreMazo;
    this.existeNuevaCarta = true;
    this.validarTamaño(this.ultimaCarta, this.nuevaCarta, parametro)

  }

  validarTamaño(carta1 : Cartas, carta2: Cartas, parametro: string){

    let comparacion: string = "igual";

    //Comparo el valor de las cartas
    if(parseInt(carta2.tamaño) > parseInt(carta1.tamaño)){
      comparacion = "mayor"
    }else if(parseInt(carta2.tamaño) < parseInt(carta1.tamaño)){
      comparacion = "menor"
    }

    //Comparo el resultado del valor de las cartas con lo que ingresó el usuario.
    if(parametro == comparacion){
      this.mensajeGameWin = true;
      setTimeout(() =>{
        this.puntaje++;
        this.mensajeGameWin = false;
        this.existeNuevaCarta = false;
        this.ultimaCarta = this.nuevaCarta;
        this.cartasService.obtenerCarta(this.nombreDeMazo)
      },2000)
    }else{
      this.mensajeGameOver = true;
      setTimeout(() =>{
        this.mensajeGameOver = false;
        this.existeNuevaCarta = false;
      },2000)
    }


  }



}
