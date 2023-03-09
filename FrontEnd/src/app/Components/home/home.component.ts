import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/Services/peticion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private peticion: PeticionService) {

  }

  ngOnInit(): void {
    this.cargarPrductos()
  }

  listaProductos:any[] = []

  cargarPrductos() {

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

}