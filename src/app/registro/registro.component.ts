import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { UserLoggedService } from '../servicios/UserLoggedService/user-logged.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errorMensaje: string | undefined;
  exitoMensaje: string | undefined;
  errorPass: string | undefined;
  public formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private usuarioLogueado: UserLoggedService ) {

    this.formulario = this.fb.group({
      nombre: [null],
      apellido: [null],
      email: [null],
      contraseña: [null],
      repcontraseña: [null]
    });
   }

  ngOnInit(): void {
  }

  crearUsuario(formulario: FormGroup){

    if(formulario.get('contraseña')?.value != formulario.get('repcontraseña')?.value){
      this.errorPass = "Las contraseñas ingresadas no coinciden.";
      setTimeout(() =>{
        this.errorPass = undefined
      },2500)
      return
    }

    let email = formulario.get('email')?.value;
    let contraseña = formulario.get('contraseña')?.value;
    createUserWithEmailAndPassword(this.auth, email, contraseña)
    .then(() => {

      //GRABO EN FIRESTORE
      let usuario = new Object();
      usuario = {"nombre":formulario.get('nombre')?.value, "apellido":formulario.get('apellido')?.value, "email":formulario.get('email')?.value}
      let usuariosRef = collection(this.firestore, 'usuarios');
      addDoc(usuariosRef, usuario);

      //MENSAJE DE EXITO
      this.exitoMensaje = "El usuario se creó con éxito.";
      setTimeout(() =>{
        this.exitoMensaje = undefined
      },2500);

      signInWithEmailAndPassword(this.auth, email, contraseña)
      .then(() => {
        this.obtenerUsuarios().subscribe(usuarios =>{
          usuarios.forEach(usuario => {
            if((usuario as any).email == email){
              this.usuarioLogueado.updateUserLogged((usuario as any).nombre, (usuario as any).apellido);
            }
          });
        })
        this.router.navigateByUrl('');
      })
    })
    .catch(error => {
      if(error.code == 'auth/email-already-in-use'){
        this.errorMensaje = "El email ya se encuentra registrado"
        setTimeout(() =>{
          this.errorMensaje = undefined
        },2500)
      }else{
        this.errorMensaje = "Ocurrió un error inesperado"
        setTimeout(() =>{
          this.errorMensaje = undefined
        },2500)
      }
    })
  }

  obtenerUsuarios(): Observable<[]>{
    const usuarios = collection(this.firestore, 'usuarios')
    return collectionData(usuarios, {idField: 'id'}) as Observable<[]>
  }

}
