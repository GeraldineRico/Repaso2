import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactenosComponent } from './Components/contactenos/contactenos.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { Page404Component } from './Components/page404/page404.component';
import { MenuComponent } from './Components/menu/menu.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { AlertasComponent } from './Components/alertas/alertas.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardAdminComponent } from './Components/dashboard-admin/dashboard-admin.component';
import { MenuLateralComponent } from './Components/menu-lateral/menu-lateral.component';
import { VentanaFlotanteComponent } from './Components/ventana-flotante/ventana-flotante.component';
import { ClientesComponent } from './Components/clientes/clientes.component'
import { InterceptorInterceptor } from './interceptors/interceptor.interceptor';
import { SubirArchivosComponent } from './Components/global/subir-archivos/subir-archivos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactenosComponent,
    ProductosComponent,
    Page404Component,
    MenuComponent,
    RegistroComponent,
    FooterComponent,
    LoginComponent,
    AlertasComponent,
    DashboardAdminComponent,
    MenuLateralComponent,
    VentanaFlotanteComponent,
    ClientesComponent,
    SubirArchivosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
