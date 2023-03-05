import { Injectable } from '@angular/core';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private peticion:PeticionService) { }

  datosMenuPrincipal:any[] = []

  cargarMenuPrincipal(){
    var post = {
      host: this.peticion.urlLocal,
      path: "/clients/menuPrincipal",
      payload: {}
    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        this.datosMenuPrincipal = respuesta.menu
        }
      )
  }
}
