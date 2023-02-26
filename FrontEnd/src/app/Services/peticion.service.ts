import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient, private router:Router) { }

  public urlLocal:string = "http://localhost:3000"

  post(url:string,data:{}){

    let promise = new Promise((resolve,reject) => {

      this.http.post(url,data)
      .toPromise()
      .then((
        res:any) => {
          //condicion para que redireccione si la validacion de rol llega en true
          // if(res.redireccion == true){
          //   this.router.navigate(['/Login'])
          // }
          resolve(res)
        })

    })
    return promise
    


  }
}
