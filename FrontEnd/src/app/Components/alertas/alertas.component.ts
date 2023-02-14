import { Component } from '@angular/core';
import { AlertasService } from 'src/app/Services/alertas.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent {
    constructor(public alert:AlertasService){}
}
