import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';

declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit{
  constructor(private peticion: PeticionService, public alert: AlertasService) {

  }

  ngOnInit(): void {
    this.loadAll(this.Id)
  }

  destino:string = this.peticion.urlLocal
  path:string = '/FotoPerfil/fotoPerfil'

  //Captura de los datos para guardar
  identification: Number = 0
  name: string = ""
  lastName: String = ""
  adress: String = ""
  phone: Number = 0
  age: Number = 0
  status: String = ""
  email: String = ""
  password: String = ""
  cPassword: String = ""

  //loadAll
  listaClientes: any[] = []

  //cargarId

  Id: string = ""


  OpenModal() {
    $('#modalClientes').modal('show')
    this.limpiar()
  }

  limpiar() {
    this.identification = 0
    this.name = ""
    this.lastName = ""
    this.adress = ""
    this.phone = 0
    this.age = 0
    this.status = ""
    this.email = ""
    this.password = ""
    this.cPassword = ""
    this.Id = ""
  }

/*   save() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/clients/save',
      payload: {
        identification: this.identification,
        name: this.name,
        lastName: this.lastName,
        adress: this.adress,
        phone: this.phone,
        age: this.age,
        status: this.status,
        email: this.email,
        password: this.password,
        cPassword: this.cPassword
      }

    }
 
    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          this.alert.load("success", respuesta.mensaje)
          $('#modalClientes').modal('hide')
          this.loadAll()
        }
        else {
          this.alert.load("danger", respuesta.mensaje)
        }
      }
    )

  }*/

  loadAll(id: string) {

    var post = {

      host: this.peticion.urlLocal,
      path: '/clients/loadAll',
      payload: {
        id: this.Id
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        this.listaClientes = respuesta.mensaje

      }
    )

  }

  cargarId(id: string) {
    console.log(id)
    this.Id = id
    
    var post = {

      host: this.peticion.urlLocal,
      path: '/clients/loadIdentification',
      payload: {
        id: this.Id
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          console.log(respuesta.state)

          this.identification = respuesta.mensaje.identification
          this.name = respuesta.mensaje.name
          this.lastName = respuesta.mensaje.lastName
          this.adress = respuesta.mensaje.adress
          this.phone = respuesta.mensaje.phone
          this.age = respuesta.mensaje.age
          this.status = respuesta.mensaje.status
          this.email = respuesta.mensaje.email
          this.password = respuesta.mensaje.password
          this.cPassword = respuesta.mensaje.cPassword
          $('#modalClientes').modal('show')
        }
        else {
          this.alert.load("danger", respuesta.mensaje)
        }
      }
    )
  }
}
