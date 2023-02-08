import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactenosComponent } from './Components/contactenos/contactenos.component';
import { HomeComponent } from './Components/home/home.component';
import { Page404Component } from './Components/page404/page404.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { RegistroComponent } from './Components/registro/registro.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent, pathMatch: 'full'},
  {path: 'Contactenos', component: ContactenosComponent, pathMatch: 'full'},
  {path: 'Productos', component: ProductosComponent, pathMatch: 'full'},
  {path: 'Registro', component: RegistroComponent, pathMatch: 'full'},
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'**', component: Page404Component, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
