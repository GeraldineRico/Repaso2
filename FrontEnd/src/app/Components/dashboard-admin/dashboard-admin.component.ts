import { Component, OnInit } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private peticion: PeticionService, public alert: AlertasService) {

  }

  destino:string = this.peticion.urlLocal
  path:string = '/subirImagenes/nombreOpcional'

  ngOnInit(): void {
    this.loadAll()
  }

  //Captura de los datos para guardar
  code: string = ""
  nameProduct: string = ""
  price: string = ""

  //loadAll
  listaProductos: any[] = []

  //cargarId
  Id: string = ""


  OpenModal() {
    $('#modalProductos').modal('show')
    this.limpiar()
  }

  limpiar() {
    this.code = "",
    this.nameProduct = ""
    this.price = ""
    this.Id = ""
  }

  save() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/products/save',
      payload: {
        code: this.code,
        nameProduct: this.nameProduct,
        price: this.price
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          this.alert.load("success", respuesta.mensaje)
          $('#modalProductos').modal('hide')
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
      path: '/products/loadAll',
      payload: {

      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        this.listaProductos = respuesta.data

      }
    )

  }

  cargarId(id: string) {
    console.log(id)
    this.Id = id


    var post = {

      host: this.peticion.urlLocal,
      path: '/products/loadIdentification',
      payload: {
        id: this.Id
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          console.log(respuesta)
          this.code = respuesta.data.code
          this.nameProduct = respuesta.data.nameProduct
          this.price = respuesta.data.price
          $('#modalProductos').modal('show')
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
      path: '/products/updateIdentification',
      payload: {
        id: this.Id,
        code: this.code,
        nameProduct: this.nameProduct,
        price: this.price
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          this.alert.load("success", respuesta.mensaje)
          $('#modalProductos').modal('hide')
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
      text: "Deseas eliminar este producto",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete: any) => {
        if (willDelete) {
          var post = {

            host: this.peticion.urlLocal,
            path: '/products/delete',
            payload: {
              id: this.Id
            }

          }

          this.peticion.post(post.host + post.path, post.payload).then(
            (respuesta: any) => {
              if (respuesta.state == true) {
                this.alert.load("success", respuesta.mensaje)
                $('#modalProductos').modal('hide')
                this.loadAll()
              }
              else {
                this.alert.load("danger", respuesta.mensaje)
              }
            }
          )
          swal("Producto eliminado correctamente!", {
            icon: "success",
          });
        } else {
          swal("No se eliminó el producto!");
        }
      });
       
  }

}
