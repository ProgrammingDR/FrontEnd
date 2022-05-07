import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
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
  },
  {
    path:'contacto',
    component:ContactoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
