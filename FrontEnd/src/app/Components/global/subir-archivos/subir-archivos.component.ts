import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { SubirArchivosService } from 'src/app/Services/subir-archivos.service';

@Component({
  selector: 'app-subir-archivos',
  templateUrl: './subir-archivos.component.html',
  styleUrls: ['./subir-archivos.component.css']
})
export class SubirArchivosComponent implements OnInit{

  constructor(private uploadService: SubirArchivosService){
    

  }

  ngOnInit(): void {
    console.log(this.urldestino)
    console.log(this.path)
    console.log(this.inputName)
  }

  

  selectedFiles:any;
  archivoseleccionado:any;
  progress:number = 0
  nombrearchivo:string  = ""
  message = ""
  estado:boolean = false

  @Input() urldestino:string = ""
  @Input() path:string = ""
  @Input() inputName:string = ""

  selectFile(event:any){
    this.selectedFiles = event.target.files
    this.nombrearchivo = this.selectedFiles[0].name
  }



  upload(){
    this.message = ""
    this.progress = 0;
    this.archivoseleccionado = this.selectedFiles.item(0)

    this.uploadService.upload(this.archivoseleccionado,this.urldestino + this.path, this.inputName).subscribe(
    (event:any) => {

      if(event.type === HttpEventType.UploadProgress){
        this.progress = Math.round(100 * event.loaded / event.total)
      }
      else if(event instanceof HttpResponse){

        this.message = event.body.mensaje
        console.log(event.body)
        this.estado = event.body.state
        if(event.body.state == false){
          this.nombrearchivo = ""
        }


      }
      
    }
    )

    

  }

}
