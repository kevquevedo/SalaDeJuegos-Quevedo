import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  public nombreLogueado: Subject<string>;
  public nombreLogueado$: Observable<string>;
  public apellidoLogueado: Subject<string>;
  public apellidoLogueado$: Observable<string>;
  public name: string | undefined;
  public accesoChat: Subject<boolean>;

  constructor() {
    this.accesoChat = new Subject();
    this.nombreLogueado = new Subject();
    this.nombreLogueado$ = this.nombreLogueado.asObservable();
    this.apellidoLogueado = new Subject();
    this.apellidoLogueado$ = this.apellidoLogueado.asObservable();
  }

  updateUserLogged(nombre: string, apellido: string){

    this.name = nombre + " " + apellido;
    this.nombreLogueado.next(nombre);
    this.apellidoLogueado.next(apellido);
  }

  isLogin() : boolean {
    let retorno = false
    if(this.name != undefined){
      retorno = true
    }
    return retorno;
  }

  deleteLogged(){
    this.name = undefined;
  }

  activarErrorMensajeChat(){
    this.accesoChat.next(true)
  }


}
