import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from 'src/app/Services/alertas.service';
import { PeticionService } from 'src/app/Services/peticion.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit{

  constructor(private actroute: ActivatedRoute, private peticion:PeticionService, private alert: AlertasService){

  }

  ngOnInit(): void {
    console.log(this.actroute.snapshot.params["identificador"])
    this.cargarId(this.actroute.snapshot.params["identificador"])
    
  }

   //Captura de los datos para guardar
   code: string = ""
   nameProduct: string = ""
   price: string = ""
   detail: string = ""
   Id:string = ""

  cargarId(id: string) {
    this.Id = id

    var post = {

      host: this.peticion.urlLocal,
      path: '/products/loadIdentification',
      payload: {
        id: id
      }

    }

    this.peticion.post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        if (respuesta.state == true) {
          console.log(respuesta)
          this.code = respuesta.data.code
          this.nameProduct = respuesta.data.nameProduct
          this.price = respuesta.data.price
          this.detail = respuesta.data.detail
        }
        else {
          this.alert.load("danger", respuesta.mensaje)
        }
      }
    )

  }



}
