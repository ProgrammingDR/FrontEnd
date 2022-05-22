import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:'inicio',
    component:InicioComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'empleados',
    component:EmpleadosComponent
  },
  {
    path:'ventas',
    component:VentasComponent
  },
  {
    path:'pedidos',
    component:PedidosComponent
  },
  {
    path:'clientes',
    component:ClientesComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
