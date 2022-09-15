import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  private nombreLogueado: Subject<string>;
  public nombreLogueado$: Observable<string>;
  private apellidoLogueado: Subject<string>;
  public apellidoLogueado$: Observable<string>;

  constructor() {
    this.nombreLogueado = new Subject();
    this.nombreLogueado$ = this.nombreLogueado.asObservable();
    this.apellidoLogueado = new Subject();
    this.apellidoLogueado$ = this.apellidoLogueado.asObservable();
  }

  updateUserLogged(nombre: string, apellido: string){

    this.nombreLogueado.next(nombre);
    this.apellidoLogueado.next(apellido);
  }
}
