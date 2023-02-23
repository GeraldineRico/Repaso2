import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  //variable que contiene la configuración
  requestOption:any = {}

  //configuración del interceptor
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(request.method == "GET"){
      this.requestOption = {
        //cabeceras, qué se está enviando jpg, video, pdf, json 
        headers:new HttpHeaders(
          {"Content-Type": "application/json;charset-UFT-8"}
          ),
          withCredentials:false
      }
    }
    else{
      console.log('Interceptando peticiones')
      this.requestOption = {
        headers:new HttpHeaders (
          {"Content-Type": "application/json;charset-UFT-8"}
          ),
          withCredentials:true
      }
      
    }

    //para que no haga una petición nueva, sino que clone la información de la petición
    const requestClone = request.clone(this.requestOption)

    return next.handle(requestClone)
} 
}
