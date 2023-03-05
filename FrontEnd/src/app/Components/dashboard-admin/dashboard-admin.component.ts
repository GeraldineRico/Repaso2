import { Component } from '@angular/core';
declare var $ :any;

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

OpenModal(){
  $('#modalProductos').modal('show')
}

}
