import { Component, OnInit } from '@angular/core';
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

  constructor(public alert: AlertasService, private peticion: PeticionService) {

  }

  // por orden se dejan las variables a usar despues del constructor
  Identificacion:number = 0
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
    this.cargarTodas()
  }

  


  // función para guardar información del cliente en el formulario registro
  Registrar(){
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
    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if(respuesta.state == false){
            this.alert.load("danger",respuesta.mensaje)
        }else{
            this.alert.load("success",respuesta.mensaje)
            this.cargarTodas()
        }
      })

      
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
