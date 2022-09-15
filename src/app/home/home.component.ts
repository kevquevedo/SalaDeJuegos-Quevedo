import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoggedService } from '../servicios/UserLoggedService/user-logged.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioNombre: string | undefined;
  usuarioNombreSub!: Subscription;
  usuarioApellido: string | undefined;
  usuarioApellidoSub!: Subscription;

  constructor(
    public ruta: Router,
    private usuarioLogueado: UserLoggedService,
    private auth: Auth
    ) { }

  ngOnInit(): void {

    this.usuarioNombreSub = this.usuarioLogueado.nombreLogueado$.subscribe(nombre => {
      this.usuarioNombre = nombre;
    });
    this.usuarioApellidoSub = this.usuarioLogueado.apellidoLogueado$.subscribe(apellido => {
      this.usuarioApellido = apellido;
    });
  }

  irAlLogin(){
    this.ruta.navigateByUrl('login');
  }

  irAlLogout(){
    signOut(this.auth)
    .then(() => {
      this.usuarioNombre = undefined;
      this.usuarioApellido = undefined;
      this.usuarioNombreSub.unsubscribe();
      this.usuarioApellidoSub.unsubscribe();
      this.ruta.navigateByUrl('');
    })
    .catch()
  }

  ngOnDestroy(): void {
    this.usuarioNombreSub.unsubscribe();
    this.usuarioApellidoSub.unsubscribe();
  }
}
