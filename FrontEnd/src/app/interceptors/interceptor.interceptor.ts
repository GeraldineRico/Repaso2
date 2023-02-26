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
    console.log("interceptando petición")
    this.requestOption = {
      Headers: new HttpHeaders({
        "Content-Type": "application/json;charset=UTF-8"
      }),
      withCredentials: true
    }

    //para que no haga una petición nueva, sino que clone la información de la petición
    const requestClone = request.clone(this.requestOption);

    return next.handle(requestClone)
} 
}
