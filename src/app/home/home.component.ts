import { Component, Inject, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  chatDisponible: boolean | undefined;

  constructor(
    public ruta: Router,
    private usuarioLogueado: UserLoggedService,
    private auth: Auth,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.usuarioNombreSub = this.usuarioLogueado.nombreLogueado$.subscribe(nombre => {
      this.usuarioNombre = nombre;
    });
    this.usuarioApellidoSub = this.usuarioLogueado.apellidoLogueado$.subscribe(apellido => {
      this.usuarioApellido = apellido;
    });

    this.usuarioLogueado.accesoChat.subscribe( () => {
      this.chatDisponible = true;
      this.dialog.open(DialogChatError, {});

      setTimeout(() =>{
        this.chatDisponible = false;
        this.dialog.closeAll()
      },3500)
    })

  }

  hacerLogin(){
    this.ruta.navigateByUrl('login');
  }

  hacerLogout(){
    signOut(this.auth)
    .then(() => {
      this.usuarioNombre = undefined;
      this.usuarioApellido = undefined;
      this.usuarioLogueado.deleteLogged();
      this.ruta.navigateByUrl('');
    })
    .catch()
    .finally( () => {
      this.usuarioNombreSub.unsubscribe();
      this.usuarioApellidoSub.unsubscribe();
    })
  }

  ngOnDestroy(): void {
    this.usuarioNombreSub.unsubscribe();
    this.usuarioApellidoSub.unsubscribe();
  }

}

//DIALOGO DE ERROR EN CHAT
@Component({
  selector: 'dialog-chat-error',
  template: ' <div class="text-danger opacity-50 shadow-lg fs-2 fw-bolder" mat-dialog-content> Debe registrarse para acceder al chat! </div>'
})
export class DialogChatError {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {}) {}
}
