import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLoggedService } from '../servicios/UserLoggedService/user-logged.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate {

  constructor(
    private userService:UserLoggedService){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let retorno = false

    if(this.userService.isLogin()){
      retorno = true
    }else{
      this.userService.activarErrorMensajeChat();
    }

    return retorno;
  }

}
