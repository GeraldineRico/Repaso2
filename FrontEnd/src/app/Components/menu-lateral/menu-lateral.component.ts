import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent {

  constructor(private router:Router){

  }

  datosMenu = [
    {nombre:'Dashboard',destino:'/DashboardAdmin'},
    {nombre:'Clientes',destino:'/Clientes'},
    {nombre:'Ventana flotante',destino:'/VentanaFlotante'}
  ]

  cerrarSesion(){
    this.router.navigate(['/'])
  }
}
