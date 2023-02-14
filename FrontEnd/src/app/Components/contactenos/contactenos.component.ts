import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent {

  constructor(public aaa:AlertasService){}
}
