import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VentaServiceService } from 'src/app/services/venta.service.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  title ="Registrar";
  id:number|undefined;
  venta:any[] = [];

  form: FormGroup;




  constructor(private fb: FormBuilder, private toastr: ToastrService, private _ventaService:VentaServiceService) { 
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
      ])]
    })
  }

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(){
    this._ventaService.getListVentas().subscribe(data =>{
      this.venta = data;
      console.log(data)
    },error =>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }

  agreagarventa(){
    const venta:any ={
      Tipo: this.form.get("Tipo")?.value,
      Producto: this.form.get("Producto")?.value,
      Empleado: this.form.get("Empleado")?.value,
      Cliente: this.form.get("Cliente")?.value,
      Cantidad: this.form.get("Cantidad")?.value,
      Precio: this.form.get("Precio")?.value
    }

    if(this.id== undefined){
      this._ventaService.saveVenta(venta).subscribe(data=>{
        this.obtenerVentas();
        console.log(venta);
        this.form.reset();
      },error=>{
        this.toastr.error('Ops ocurrio un error','Error');
        console.log(error);
      });
  }else{
    venta.id = this.id;
    this._ventaService.updateVenta(this.id,venta).subscribe(data=>{
      this.form.reset();
      this.title = "Agregar";
      this.id= undefined;
      this.toastr.info('El regitro se actualizo con exito','Registro Actualizado');
      this.obtenerVentas();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
    
  }    
  }

  editarVenta(venta:any){
    this.title = "Editar";
    this.id = venta.id;
  
    this.form.patchValue({
      Tipo: venta.tipo,
      Producto: venta.producto,
      Empleado: venta.empleado,
      Cliente: venta.cliente,
      Cantidad:venta.cantidad,
      Precio: venta.precio
    })
  }
  
  eliminar(id: number){
    this._ventaService.deleteVenta(id).subscribe(data=>{
      this.toastr.error('Usuario eliminado con exito', 'Usuario Eliminado');
      this.obtenerVentas();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
    
  }

}
