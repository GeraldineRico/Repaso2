import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ContactenosComponent } from './Components/contactenos/contactenos.component';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { DetalleComponent } from './Components/detalle/detalle.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MiPerfilComponent } from './Components/mi-perfil/mi-perfil.component';
import { Page404Component } from './Components/page404/page404.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { VentanaFlotanteComponent } from './Components/ventana-flotante/ventana-flotante.component';

const routes: Routes = [
  {path: 'Home', component: HomeComponent, pathMatch: 'full'},
  {path: 'Contactenos', component: ContactenosComponent, pathMatch: 'full'},
  {path: 'Productos', component: ProductosComponent, pathMatch: 'full'},
  {path: 'Categorias', component: CategoriasComponent, pathMatch: 'full'},
  {path: 'Detalle/:identificador', component: DetalleComponent, pathMatch: 'full'},
  {path: 'MiPerfil', component: MiPerfilComponent, pathMatch: 'full'},
  {path: 'Registro', component: RegistroComponent, pathMatch: 'full'},
  {path: 'Login', component: LoginComponent, pathMatch: 'full'},
  {path: 'DashboardAdmin', component: DashboardAdminComponent, pathMatch: 'full'},
  {path: 'VentanaFlotante', component: VentanaFlotanteComponent, pathMatch: 'full'},
  {path: 'Clientes', component: ClientesComponent, pathMatch: 'full'},
  {path:'', component: HomeComponent, pathMatch: 'full'},
  {path:'**', component: Page404Component, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
