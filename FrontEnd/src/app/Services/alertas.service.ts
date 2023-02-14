import { Injectable } from '@angular/core';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  //Array 
  public datos:any[] = []

  //funcion privada para borrar alertas
  private borrarAlertas(){
    
    setTimeout(() => {
      this.datos.splice(0,1)
    }, 5000);
    
    
  }



  /**para documentar lo que hace esta función. 
   * Funcion alertas
   * @param tipo sucess, primary, danger
   * @param mensaje mensaje
   */
  public load(tipoLoad:string,alertaLoad:string){
    this.datos.push({tipo:tipoLoad,alertas:alertaLoad})
    this.borrarAlertas()
  }
}
