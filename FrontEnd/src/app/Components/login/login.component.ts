import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router:Router){

  }

  Email:string = ""
  Password:string = ""

  iniciarSesion(){
    // navegar hasta un punto especifico, en este caso el boton de inicio de sesión me lleva a DashboardAdmin
    this.router.navigate(['/DashboardAdmin'])
  }

}
