import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import {HttpClientModule} from'@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VentaFilterPipe } from './pipes/venta-filter.pipe';
import {MatTableModule} from '@angular/material/table';
import { PedidoFilterPipe } from './pipes/pedido-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EmpleadosComponent,
    VentasComponent,
    ClientesComponent,
    PedidosComponent,
    LoginComponent,
    InicioComponent,
    VentaFilterPipe,
    PedidoFilterPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
