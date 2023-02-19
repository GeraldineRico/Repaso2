import { Component } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  prueba (){
    
  }

  cerrarMenu(){
    $('#myTab').tab('hide')
  }
}
