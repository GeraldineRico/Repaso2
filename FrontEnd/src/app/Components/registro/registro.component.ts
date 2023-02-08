import { Component } from '@angular/core';


// interface clientes{
//   nombre:string,
//   segundoNombre?:string, //el signo ? vuelve el campo opcional
//   email:string,
//   password:string,
//   habilidades:string[] //un array de datos tipo string
// }

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

nombre:string = ""
email:string = ""
password:string = ""

Guardar (){
  console.log(this.nombre)
}

// clientes1:clientes = {
//   nombre:"Geraldine",
//   email:"demo@gmail.com",
//   password:"123456",
//   habilidades:["Programar", "dibujar"]
// }

}
