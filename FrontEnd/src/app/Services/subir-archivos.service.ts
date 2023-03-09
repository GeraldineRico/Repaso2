import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor(private http:HttpClient) { }

  upload(file: File, url:string,inputName:string){

    //tipo de peticion que se realiza, es igual a la de postman para que permita subir imagenes
    const formData = new FormData();
    formData.append(inputName,file)

    const req = new HttpRequest('POST', url,formData,{
      //para mostrar barra de progreso
      reportProgress:true,
      responseType:'json'
    })

    return this.http.request(req)

  }
}
