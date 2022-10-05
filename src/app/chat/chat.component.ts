import { Component, OnInit } from '@angular/core';
import { addDoc, collection, DocumentData, Firestore, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comentarios } from '../clases/comentarios/comentarios';
import { UserLoggedService } from '../servicios/UserLoggedService/user-logged.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public chat: FormGroup;
  public comentarios!: Array<Comentarios>;

  constructor(
    private user : UserLoggedService,
    private fb: FormBuilder,
    private firestore: Firestore,
  ) {

    this.chat = this.fb.group({
      mensaje: [null]
    });

    this.comentarios = new Array<Comentarios>();
  }

  ngOnInit(): void {

    //Actualizo la lista de comentarios desde la BD.
    this.obtenerComentarios().then(respuesta => {

      respuesta.forEach(elemento => {

        let comentario = new Comentarios((elemento.data() as any).mensaje, ((elemento.data() as any).hora).toDate(), (elemento.data() as any).usuario);
        this.comentarios.push(comentario);
        this.comentarios.sort(this.ordenarPorHora)
      });
    })
  }

  //Envia el mensaje ingresado por el usuario, actualizando la BD de comentarios.
  enviarMensaje(){
    if(this.chat.get('mensaje')?.value != null){

      let mensaje = this.chat.get('mensaje')?.value;
      let hora = new Date();
      let comentarioNuevo = new Comentarios(mensaje, hora, this.user.name);
      this.actualizarBD(comentarioNuevo);
      this.comentarios.push(comentarioNuevo)
      this.chat.reset()
    }
  }

  //Actualiza la BD de Comentarios
  actualizarBD(comentario: Comentarios){

    let coment = new Object();
    coment = {"mensaje": comentario.mensaje, "hora": comentario.hora, "usuario": comentario.usuario};
    let comentariosRef = collection(this.firestore, 'comentarios');
    addDoc(comentariosRef, coment);
  }

  //Obtiene la lista de Comentarios desde la BD
  async obtenerComentarios(): Promise<QuerySnapshot<DocumentData>>{
    const comentarios = collection(this.firestore, 'comentarios')
    return await getDocs(comentarios);
  }

  //Ordena los comentarios por hora.
  ordenarPorHora(a: Comentarios, b: Comentarios) {
    if (a.hora < b.hora) {
      return -1;
    }
    if (a.hora > b.hora) {
      return 1;
    }
    return 0;
  }

}


