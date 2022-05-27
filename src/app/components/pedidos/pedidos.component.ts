import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PedidoServiceService } from 'src/app/services/pedido.service.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  title ="Registrar";
  pedido:any[] = [];
  id:number | undefined; 
  
  filtrofecha:''|undefined;
  form: FormGroup;




  constructor(private fb: FormBuilder, private toastr: ToastrService, private _pedidoService:PedidoServiceService) { 
    this.form = this.fb.group({
      Tipo: ['',Validators.required],
      Producto: ['',Validators.required],
      Empleado: ['',Validators.required],
      Cliente: ['',Validators.required],
      Cantidad: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]\d{1,10}$/)
      ])],
      Precio: ['',Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]\d{1,10}$/)
      ])],
      Fecha: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this._pedidoService.getListPedidos().subscribe(data =>{
      this.pedido = data;
      console.log(data)
    },error =>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }

  agreagarPedido(){
    const pedido:any ={
      Tipo: this.form.get("Tipo")?.value,
      Producto: this.form.get("Producto")?.value,
      Empleado: this.form.get("Empleado")?.value,
      Cliente: this.form.get("Cliente")?.value,
      Cantidad: this.form.get("Cantidad")?.value,
      Precio: this.form.get("Precio")?.value,
      Fecha: this.form.get("Fecha")?.value
    }
    
    if(this.id== undefined){
      this._pedidoService.savePedido(pedido).subscribe(data=>{
        this.obtenerPedidos();
        console.log(pedido);
        this.form.reset();
      },error=>{
        this.toastr.error('Ops ocurrio un error','Error');
        console.log(error);
      });
  }else{
    pedido.id = this.id;
    this._pedidoService.updatePedido(this.id,pedido).subscribe(data=>{
      this.form.reset();
      this.title = "Agregar";
      this.id= undefined;
      this.toastr.info('El regitro se actualizo con exito','Registro Actualizado');
      this.obtenerPedidos();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
    
  }    
  }

  editarPedido(pedido:any){
    this.title = "Editar";
    this.id = pedido.id;
  
    this.form.patchValue({
      Tipo: pedido.tipo,
      Producto: pedido.producto,
      Empleado: pedido.empleado,
      Cliente: pedido.cliente,
      Cantidad:pedido.cantidad,
      Precio: pedido.precio,
      Fecha: pedido.fecha
    })
  }

  eliminar(id: number){
    this._pedidoService.deletePedido(id).subscribe(data=>{
      this.toastr.error('Usuario eliminado con exito', 'Usuario Eliminado');
      this.obtenerPedidos();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
    
  }


}
