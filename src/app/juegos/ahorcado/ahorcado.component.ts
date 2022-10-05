import { Component, OnInit } from '@angular/core';
import { collection, DocumentData, Firestore, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Letras } from 'src/app/clases/letras/letras';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  public palabras!: Array<string>;
  public palabraFormateada!: Array<string>;
  public palabraSeleccionada!: Array<Letras>;
  public cantErrores!: number;
  public mensajeGameOver: boolean = false;
  public mensajeGameWin: boolean = false;

  constructor(private firestore: Firestore) {
    this.palabras = new Array<string>();
    this.palabraSeleccionada = new Array<Letras>();
    this.cantErrores = 0;
  }

  ngOnInit(): void {

    this.obtenerPalabras().then(respuesta => {

      respuesta.forEach(elemento => {
        this.palabras.push((elemento.data() as any).palabra);
      });
      this.elegirPalabra()
    })
  }

  //Obtengo la lista de Palabras desde FIREBASE
  async obtenerPalabras(): Promise<QuerySnapshot<DocumentData>>{
    const palabras = collection(this.firestore, 'palabrasAhorcado')
    return await getDocs(palabras);
  }

  //Selecciona una palabra al azar de la lista y arma la misma en el ahorcado
  elegirPalabra(){

    //Elijo una palabra random
    let posicion = Math.floor(Math.random() * (this.palabras.length));
    this.palabraFormateada = this.palabras[posicion].split('');
    //Blanqueo el valor de la palabra Seleccionada y del dibujo del ahorcado
    this.palabraSeleccionada = new Array();
    this.cantErrores = 0;
    //Casteo la palabra seleccionada
    this.palabraFormateada.forEach(valor => {
      let letra = new Letras(valor)
      this.palabraSeleccionada.push(letra)
    })
  }

  //Ingresa la letra elegida por el usuario y la busca en la palabra
  letraSeleccionada(letra : any){

    let contiene = false;
    this.palabraSeleccionada.forEach(item => {
      if((item as Letras).valor.toLowerCase() == letra.toLowerCase()){
        contiene = true;
      }
    })

    if(contiene){

      this.palabraSeleccionada.forEach(item =>{
        if((item as Letras).valor.toLowerCase() == letra.toLowerCase()){
          (item as Letras).visible = true;
        }
      })
      this.evaluarVictoria();
    }else{
      this.cantErrores++;
      this.evaluarCantErrores();
    }

  }

  //EVALUA LA CANTIDAD DE INTENTOS
  evaluarCantErrores(){
    if(this.cantErrores == 6){
      this.mensajeGameOver = true;
      this.cantErrores = 0;
      this.elegirPalabra()
      setTimeout(() =>{
        this.mensajeGameOver = false;
      },2000)
    }
  }

  //EVALUA SI EL USUARIO GANÓ
  evaluarVictoria(){

    let ganador = true;
    this.palabraSeleccionada.forEach(item =>{
      if((item as Letras).visible == false){
        ganador = false
      }
    })

    if(ganador){
      this.mensajeGameWin = true;
      this.cantErrores = 0;
      this.elegirPalabra()
      setTimeout(() =>{
        this.mensajeGameWin = false;
      },2000)
    }
  }

}
