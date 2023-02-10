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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
