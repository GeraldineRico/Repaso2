import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/Services/menu.service';
import { PeticionService } from 'src/app/Services/peticion.service';
declare var $: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  constructor(private peticion:PeticionService, private router:Router, public menu: MenuService){

  }

  ngOnInit(): void {
    this.menu.cargarMenuPrincipal()
  }

  

  cerrarSesion() {
    var post = {
      host: this.peticion.urlLocal,
      path: "/cerrarSesion",
      payload: {}
    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        this.menu.cargarMenuPrincipal()
        this.router.navigate(['/Login'])
        }
      )   

    
  }

  
}
