import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlertasService } from 'src/app/Services/alertas.service';
import { MenuService } from 'src/app/Services/menu.service';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var swal:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public alert: AlertasService, private peticion: PeticionService, private router: Router, private menu:MenuService) {

  }

  Email: string = ""
  Password: string = ""
  rutas: string = "/clients/login"


  //para validar desde el frontend los datos que llegan
  validacionLogin(): boolean {

    //para validar que el dato email no este vacio, nulo o indefinido
    if (this.Email == "" || this.Email == null || this.Email == undefined) {
      this.alert.load("danger", "El campo email es obligatorio")
      return false
    }

    function validarEmail(Email: string) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
      return regex.test(Email);
    }

    if (!validarEmail(this.Email)) {
      this.alert.load("danger", "El email debe contener @ . y dominio.")
      return false
    }

    //para validar que el dato password no este vacio, nulo o indefinido
    if (this.Password == "" || this.Password == null || this.Password == undefined) {
      this.alert.load("danger", "El campo contraseña es obligatorio")
      return false
    }

    function validarContraseña(Password: string) {
      var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
      return regex.test(Password);
    }

    if (!validarContraseña(this.Password)) {
      this.alert.load("danger", "La contraseña debe ser de mínimo 12 caracteres y debe contener mayúsculas, minúsculas, números y un carácter especial.")
      return false
    }

    return true
  }

  iniciarSesion() {
    var post = {
      host: this.peticion.urlLocal,
      path: this.rutas,
      payload: {
        email: this.Email,
        password: this.Password,
      }
    }


    if (this.validacionLogin() == true) {
      this.peticion.post(post.host + post.path, post.payload).then(
        (respuesta: any) => {
          if (respuesta.state == false) {
            swal("Ops!", respuesta.mensaje, "error")
            //this.alert.load("danger", respuesta.mensaje)
          } else {
            swal("Bienvenid@!", respuesta.mensaje, "success")
            //this.alert.load("success", respuesta.mensaje)
            this.menu.cargarMenuPrincipal()

            if(this.rutas === "/clients/login"){
              this.router.navigate(['/Home'])
            }else if(this.rutas === "/admins/login"){
              this.router.navigate(['/DashboardAdmin'])
            }
            
          }
        })
    }
  }





  // verCookie() {
  //   var post = {
  //     host: this.peticion.urlLocal,
  //     path: "/clients/verCookie",
  //     payload: {

  //     }
  //   }

  // }
}