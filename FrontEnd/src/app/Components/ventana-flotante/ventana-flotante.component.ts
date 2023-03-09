import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-ventana-flotante',
  templateUrl: './ventana-flotante.component.html',
  styleUrls: ['./ventana-flotante.component.css']
})
export class VentanaFlotanteComponent {

  constructor(private peticion: PeticionService, public alert: AlertasService) {

  }

  ngOnInit(): void {
    this.loadAll()
  }

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
  listaAdmins: any[] = []

  //cargarId

  Id: string = ""


  OpenModal() {
    $('#modalAdmins').modal('show')
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

  save() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/admins/save',
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
          $('#modalAdmins').modal('hide')
          this.loadAll()
        }
        else {
          this.alert.load("danger", respuesta.mensaje)
        }
      }
    )

  }

  loadAll() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/admins/loadAll',
      payload: {

      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        this.listaAdmins = respuesta.mensaje

      }
    )

  }

  cargarId(id: string) {
    console.log(id)
    this.Id = id

    var post = {

      host: this.peticion.urlLocal,
      path: '/admins/loadIdentification',
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
          $('#modalAdmins').modal('show')
        }
        else {
          this.alert.load("danger", respuesta.mensaje)
        }
      }
    )
  }

  update() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/admins/updateIdentification',
      payload: {
        id: this.Id,
        identification: this.identification,
        name: this.name,
        lastName: this.lastName,
        adress: this.adress,
        phone: this.phone,
        age: this.age,
        status: this.status,
        email: this.email,
        password: this.password,
        cPassword: this.cPassword,
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          this.alert.load("success", respuesta.mensaje)
          $('#modalAdmins').modal('hide')
          this.loadAll()
        }
        else {
          this.alert.load("danger", respuesta.mensaje)
        }
      }
    )

  }

  delete() {

    swal({
      title: "¿Estas seguro?",
      text: "Deseas eliminar este administrador",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete: any) => {
        if (willDelete) {
          var post = {

            host: this.peticion.urlLocal,
            path: '/admins/delete',
            payload: {
              id: this.Id
            }

          }

          this.peticion.post(post.host + post.path, post.payload).then(
            (respuesta: any) => {
              if (respuesta.state == true) {
                this.alert.load("success", respuesta.mensaje)
                $('#modalAdmins').modal('hide')
                this.loadAll()
              }
              else {
                this.alert.load("danger", respuesta.mensaje)
              }
            }
          )
          swal("Administrador eliminado correctamente!", {
            icon: "success",
          });
        } else {
          swal("No se eliminó el administrador!");
        }
      });

  }
 
}
