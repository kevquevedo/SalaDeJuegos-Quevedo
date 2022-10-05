export class Cartas{

  tamaño!: string;
  imagen!: string;

  constructor(tamaño:string, imagen:string){
    this.imagen = imagen;
    switch(tamaño){

      case 'JACK':
        this.tamaño = "11";
        break;
      case 'QUEEN':
        this.tamaño = "12";
        break;
      case 'KING':
        this.tamaño = "13";
        break;
      case 'ACE':
        this.tamaño = "1";
        break;
      default:
        this.tamaño = tamaño;
    }
  }

}
