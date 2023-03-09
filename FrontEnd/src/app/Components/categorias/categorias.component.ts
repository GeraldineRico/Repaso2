import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var $: any;
declare var swal: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  /* constructor(private peticion: PeticionService, public alert: AlertasService) {

  }

  destino: string = this.peticion.urlLocal
  path: string = '/imagenCategorias'

  ngOnInit(): void {
    this.loadAll()
  }

  //Captura de los datos para guardar
  code: string = ""
  nameCategories: string = ""
  detail: string = ""

  //loadAll
  listaCategories: any[] = []

  //cargarId
  Id: string = ""


  OpenModal() {
    $('#modalCategories').modal('show')
    this.limpiar()
  }

  limpiar() {
    this.code = "",
    this.nameCategories = ""
    this.detail = ""
    this.Id = ""
  }

  save() {

    var post = {

      host: this.peticion.urlLocal,
      path: '/categories/save',
      payload: {
        code: this.code,
        nameCategories: this.nameCategories,
        detail: this.detail
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          this.alert.load("success", respuesta.mensaje)
          $('#modalCategories').modal('hide')
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
      path: '/categories/loadAll',
      payload: {

      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        this.listaCategories = respuesta.data

      }
    )

  }

  cargarId(id: string) {
    console.log(id)
    this.Id = id
    this.path = this.path + '/' + this.Id


    var post = {

      host: this.peticion.urlLocal,
      path: '/categories/loadIdentification',
      payload: {
        id: this.Id
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          console.log(respuesta)
          this.code = respuesta.data.code
          this.nameCategories = respuesta.data.nameCategories
          this.detail = respuesta.data.detail
          $('#modalCategories').modal('show')
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
      path: '/categories/updateIdentification',
      payload: {
        id: this.Id,
        code: this.code,
        nameCategories: this.nameCategories,
        detail: this.detail
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          this.alert.load("success", respuesta.mensaje)
          $('#modalCategories').modal('hide')
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
            path: '/categories/delete',
            payload: {
              id: this.Id
            }

          }

          this.peticion.post(post.host + post.path, post.payload).then(
            (respuesta: any) => {
              if (respuesta.state == true) {
                this.alert.load("success", respuesta.mensaje)
                $('#modalCategories').modal('hide')
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

  } */

}
