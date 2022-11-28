import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClienteServiceService } from 'src/app/services/cliente.service.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  title = "Registrar";
  clientes:any[]=[];
  id: number | undefined;
  form:FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _clienteService:ClienteServiceService) { 
    this.form = this.fb.group({
      nombre:["",Validators.compose([
        Validators.required
      ])],
      apellido:["",Validators.compose([
        Validators.required
      ])],
      cedula:["",Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]\d{6,10}$/)
      ])],
      numero:["",Validators.compose([
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]\d{6,10}$/)
      ])],
      direccion:["",Validators.required]
    })
  }
 
  ngOnInit(): void {
    this.obtenerClientes();
  }
  
  obtenerClientes(){
    this._clienteService.getListClientes().subscribe(data =>{
      this.clientes = data;
      console.log(data)
    },error =>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }

  agregarCliente(){
    const cliente:any = {
      nombre:    this.form.get("nombre")?.value,
      apellido:  this.form.get("apellido")?.value,
      cedula:    this.form.get("cedula")?.value,
      numero:    this.form.get("numero")?.value,
      direccion: this.form.get("direccion")?.value
    }

    if(this.id== undefined){
      this._clienteService.saveCliente(cliente).subscribe(data=>{
        this.obtenerClientes();
        this.form.reset();
      },error=>{
        this.toastr.error('Ops ocurrio un error','Error');
        console.log(error);
      });
  }else{
    cliente.id = this.id;
    this._clienteService.updateCliente(this.id,cliente).subscribe(data=>{
      this.form.reset();
      this.title = "Agregar";
      this.id= undefined;
      this.toastr.info('El regitro se actualizo con exito','Registro Actualizado');
      this.obtenerClientes();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }
}

editarCliente(cliente:any){
  this.title = "Editar"; 
  this.id = cliente.id;

  this.form.patchValue({
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    cedula: cliente.cedula,
    numero:cliente.numero,
    direccion: cliente.direccion
  })
}

 

  eliminar(id: number){
    this._clienteService.deleteCliente(id).subscribe(data=>{
      this.toastr.error('Usuario eliminado con exito', 'Usuario Eliminado');
      this.obtenerClientes();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }
}
