import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var $: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  constructor(private peticion:PeticionService, private router:Router){

  }

  ngOnInit(): void {
    this.cargarMenuPrincipal()
  }
  
  
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

  cerrarSesion() {
    var post = {
      host: this.peticion.urlLocal,
      path: "/cerrarSesion",
      payload: {}
    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        this.router.navigate(['/Login'])
        }
      )   

    
  }

  
}
