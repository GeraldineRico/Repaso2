import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PeticionService } from 'src/app/Services/peticion.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  constructor(private router: Router, private peticion: PeticionService) {

  }

  datosMenu = [
    { nombre: 'Home', destino: '/Home' },
    { nombre: 'Productos', destino: '/DashboardAdmin' },
    { nombre: 'Clientes', destino: '/Clientes' },
    { nombre: 'Administradores', destino: '/VentanaFlotante' }
  ]

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
