import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { collection, collectionData, Firestore, getDocs} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserLoggedService } from '../servicios/UserLoggedService/user-logged.service';
import { DocumentData, getDocFromCache, QuerySnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMensaje: string | undefined;
  public formulario: FormGroup;
  private usuAux: string | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private firestore: Firestore,
    private usuarioLogueado: UserLoggedService) {

    this.formulario = this.fb.group({
      email: [null],
      contraseña: [null]
    });
  }

  ngOnInit(): void {
  }

  loguearUsuario(formulario: FormGroup){

    let email = formulario.get('email')?.value;
    let contraseña = formulario.get('contraseña')?.value;

    signInWithEmailAndPassword(this.auth, email, contraseña)
    .then(() => {

      this.obtenerUsuarios().then(mensaje =>{
        //Obtengo los datos del usuario registrado
        mensaje.forEach((doc) => {
          if((doc.data() as any).email == email){
            this.usuAux = doc.data() as unknown as string
          }
        })

        //Actualizo el usuario logueado
        this.usuarioLogueado.updateUserLogged((this.usuAux as any).nombre, (this.usuAux as any).apellido);
      })

      this.router.navigateByUrl('');
    })
    .catch(error => {
      if(error.code == 'auth/user-not-found'){
        this.errorMensaje = "El email no se encuentra registrado."
        setTimeout(() =>{
          this.errorMensaje = undefined
        },3500)
      }else if(error.code == 'auth/wrong-password'){
        this.errorMensaje = "La contraseña es incorrecta."
        setTimeout(() =>{
          this.errorMensaje = undefined
        },3500)
      }
      else{
        this.errorMensaje = "Ocurrió un error inesperado"
        setTimeout(() =>{
          this.errorMensaje = undefined
        },3500)
      }
    })
  }

  registrarNuevoUsuario(){
    this.router.navigateByUrl('/registro')
  }

  async obtenerUsuarios(): Promise<QuerySnapshot<DocumentData>>{
    //Obtengo desde Firebase la lista de usuarios
    const usuarios = collection(this.firestore, 'usuarios')
    return await getDocs(usuarios);
  }

  accesoRapido(nombre: string){
    let mail: string;
    let pass: string;
    switch(nombre){
      case "Kevin":
        mail = "quevedo.kevin@gmail.com"
        pass = "kevin123"
        break
      case "Fernando":
        mail = "gonzalez.fernando@gmai.com"
        pass = "fernan123"
        break
      case "German":
        mail = "fernandez.german@gmail.com"
        pass = "ger123"
        break
      default:
        mail = ""
        pass = ""
        break
    }

    signInWithEmailAndPassword(this.auth, mail, pass)
    .then(() => {

      this.obtenerUsuarios().then(mensaje =>{
        //Obtengo los datos del usuario registrado
        mensaje.forEach((doc) => {
          if((doc.data() as any).email == mail){
            this.usuAux = doc.data() as unknown as string
          }
        })

        //Actualizo el usuario logueado
        this.usuarioLogueado.updateUserLogged((this.usuAux as any).nombre, (this.usuAux as any).apellido);
      })
      this.router.navigateByUrl('');
    })

  }
}
