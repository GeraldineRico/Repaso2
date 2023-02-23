import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';

// interface clientes{
//   nombre:string,
//   segundoNombre?:string, //el signo ? vuelve el campo opcional
//   email:string,
//   password:string,
//   habilidades:string[] //un array de datos tipo string
// }

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(public alert: AlertasService, private peticion: PeticionService, private router: Router) {

  }

  // por orden se dejan las variables a usar despues del constructor
  Identificacion: number = 0
  Nombre: string = ""
  Apellidos: string = ""
  Edad: number = 1
  Direccion: string = ""
  Telefono: number = 0
  EstadoC: string = ""
  Email: string = ""
  Password: string = ""
  cPassword: string = ""
  listaDatos: any[] = []


  ngOnInit() {
    //this.cargarTodas()
  }


  //para validar desde el frontend los datos que llegan
  validacionRegistro(): boolean {
    if (this.Identificacion == 0 || this.Identificacion == null || this.Identificacion == undefined) {
      this.alert.load("danger", "El campo cédula es obligatorio")
      return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (this.Identificacion.toString().length < 8) {
      this.alert.load("danger", "El campo cédula debe ser igual o mayor a 8 caracteres")
      return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (this.Identificacion.toString().length > 10) {
      this.alert.load("danger", "El campo cédula no debe ser superior de 10 caracteres")
      return false
    }

    //para validar que el dato nombre no este vacio, nulo o indefinido
    if (this.Nombre == "" || this.Nombre == null || this.Nombre == undefined) {
      this.alert.load("danger", "El campo nombre es obligatorio")
      return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (this.Nombre.length < 3) {
      this.alert.load("danger", "El campo nombre debe ser mayor de 3 caracteres")
      return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (this.Nombre.length > 20) {
      this.alert.load("danger", "El campo nombre no debe ser superior de 20 caracteres")
      return false
    }

    //para validar que el dato apellido no este vacio, nulo o indefinido
    if (this.Apellidos == "" || this.Apellidos == null || this.Apellidos == undefined) {
      this.alert.load("danger", "El campo apellido es obligatorio")
      return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (this.Apellidos.length < 3) {
      this.alert.load("danger", "El campo apellido debe ser mayor de 3 caracteres")
      return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (this.Apellidos.length > 20) {
      this.alert.load("danger", "El campo apellido no debe ser superior de 20 caracteres")
      return false
    }

    //para validar que el dato direccion no este vacio, nulo o indefinido
    if (this.Direccion == "" || this.Direccion == null || this.Direccion == undefined) {
      this.alert.load("danger", "El campo dirección es obligatorio")
      return false
    }

    //para validar que el dato telefono no este vacio, nulo o indefinido
    if (this.Telefono == 0 || this.Telefono == null || this.Telefono == undefined) {
      this.alert.load("danger", "El campo teléfono es obligatorio")
      return false
    }


    //para validar que el dato edad no este vacio, nulo o indefinido
    if (this.Edad == 0 || this.Edad == null || this.Edad == undefined) {
      this.alert.load("danger", "El campo edad es obligatorio")
      return false
    }

    // para validar la cantidad de caracteres minimos que debe tener el campo
    if (this.Edad < 18) {
      this.alert.load("danger", "Para registrarse en nuestra página debe ser mayor de edad")
      return false
    }

    // para validar la cantidad de caracteres maximos que debe tener el campo   
    if (this.Edad > 100) {
      this.alert.load("danger", "El campo edad no debe ser superior de 100")
      return false
    }

    //para validar que el dato estadoCivil no este vacio, nulo o indefinido
    if (this.EstadoC == "" || this.EstadoC == null || this.EstadoC == undefined) {
      this.alert.load("danger", "El campo estado civil es obligatorio")
      return false
    }

    //para validar que el dato estadoCivil se llene de acuerdo a la lista especificada
    if (this.EstadoC != "Soltero" && this.EstadoC != "Casado" && this.EstadoC != "Union libre") {
      this.alert.load("danger", "Debe seleccionar una opción")
      return false
    }

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

    //para validar que el dato cPassword no este vacio, nulo o indefinido
    if (this.cPassword == "" || this.cPassword == null || this.cPassword == undefined) {
      this.alert.load("danger", "El campo confirmación contraseña es obligatorio")
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



  // función para guardar información del cliente en el formulario registro
  Registrar() {
    var post = {
      host: this.peticion.urlLocal,
      path: "/clients/save",
      payload: {

        identification: this.Identificacion,
        name: this.Nombre,
        lastName: this.Apellidos,
        adress: this.Direccion,
        phone: this.Telefono,
        age: this.Edad,
        status: this.EstadoC,
        email: this.Email,
        password: this.Password,
        cPassword: this.cPassword
      }
    }


    if (this.validacionRegistro() == true) {
      this.peticion.post(post.host + post.path, post.payload).then(
        (respuesta: any) => {
          if (respuesta.state == false) {
            this.alert.load("danger", respuesta.mensaje)
          } else {
            this.alert.load("success", respuesta.mensaje)
            this.router.navigate(['/Login'])
          }
        })
    }



  }

  //funcion qupe de acuerdo a la petición que tenga, por el host y el path ejecuta y trae una respuesta desde el backend


  cargarTodas() {

    var post = {
      host: this.peticion.urlLocal,
      path: "/clients/loadAll",
      payload: {
      }
    }
    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        console.log(respuesta)
        this.listaDatos = respuesta.mensaje

      })
  }





  mostrar: boolean = true;

  mostrarOcultar() {
    this.mostrar = !this.mostrar
  }

  // Registrar (){
  //   this.alert.load("success","Usuario registrado")
  //   this.alert.load("danger","Usuario registrado")
  // } 

  // clientes1:clientes = {
  //   nombre:"Geraldine",
  //   email:"demo@gmail.com",
  //   password:"123456",
  //   habilidades:["Programar", "dibujar"]
  // }

}
