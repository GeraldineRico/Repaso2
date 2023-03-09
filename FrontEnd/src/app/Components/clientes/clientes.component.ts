import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{


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
  listaClientes: any[] = []

  //cargarId

  cedula: string = ""


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
    this.cedula = ""
  }

  save() {

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

  }

  loadAll() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/clients/loadAll',
      payload: {

      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        this.listaClientes = respuesta.mensaje

      }
    )

  }

  cargarId(identification: string) {
    console.log(identification)
    //this.Id = id
    $('#modalClientes').modal('show')
    // var post = {

    //   host: this.peticion.urlLocal,
    //   path: '/clients/loadIdentification',
    //   payload: {
    //     id: this.Id
    //   }

    // }

    // this.peticion.post(post.host + post.path, post.payload).then(
    //   (respuesta: any) => {
    //     if (respuesta.state == true) {

    //       this.code = respuesta.data.code
    //       this.nameProduct = respuesta.data.nameProduct
    //       this.price = respuesta.data.price
    //       $('#modalProductos').modal('show')
    //     }
    //     else {

    //     }
    //   }
    // )
  }

  // update() {

  //   var post = {

  //     host: this.peticion.urlLocal,
  //     path: '/products/updateIdentification',
  //     payload: {
  //       id: this.Id,
  //       code: this.code,
  //       nameProduct: this.nameProduct,
  //       price: this.price
  //     }

  //   }

  //   this.peticion.post(post.host + post.path, post.payload).then(
  //     (respuesta: any) => {
  //       if (respuesta.state == true) {
  //         this.alert.load("success", respuesta.mensaje)
  //         $('#modalProductos').modal('hide')
  //         this.loadAll()
  //       }
  //       else {
  //         this.alert.load("danger", respuesta.mensaje)
  //       }
  //     }
  //   )

  // }

  // delete() {

  //   var post = {

  //     host: this.peticion.urlLocal,
  //     path: '/products/delete',
  //     payload: {
  //       id: this.Id
  //     }

  //   }

  //   this.peticion.post(post.host + post.path, post.payload).then(
  //     (respuesta: any) => {
  //       if (respuesta.state == true) {
  //         this.alert.load("success", respuesta.mensaje)
  //         $('#modalProductos').modal('hide')
  //         this.loadAll()
  //       }
  //       else {
  //         this.alert.load("danger", respuesta.mensaje)
  //       }
  //     }
  //   )
  // }

}
