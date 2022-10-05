export class Comentarios {

  mensaje: string | undefined;
  hora!: Date;
  usuario: string | undefined;

  constructor(mensaje: string, hora: Date, usuario: string | undefined){
    this.mensaje = mensaje;
    this.hora = hora;
    this.usuario = usuario;
  }
}
