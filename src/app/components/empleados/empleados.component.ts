import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoServiceService } from 'src/app/services/empleado.service.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit                                           {                                          
  title = "Registrar"; 
  empleado:any[] = [];
  id:number| undefined;
form: FormGroup;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _empleadoService:EmpleadoServiceService) {
    this.form = this.fb.group({
      nombre: ["",Validators.compose([
        Validators.required
      ])],
      apellido: ["",Validators.compose([
        Validators.required
      ])],
      cedula:["",Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]\d{6,10}$/)
      ])],
      cargo: ["",Validators.compose([
        Validators.required
      ])],
      numero: ["",Validators.compose([
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]\d{6,10}$/)
      ])],
      direccion: ["",Validators.required]
    })
   }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }                                                          
  obtenerEmpleados(){
    this._empleadoService.getListEmpleados().subscribe(data =>{
      this.empleado = data;
      console.log(data)
    },error =>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }

  agreagarEmpleado(){
    const empleados:any ={
      nombre: this.form.get("nombre")?.value,
      apellido: this.form.get("apellido")?.value,
      cedula: this.form.get("cedula")?.value,
      cargo: this.form.get("cargo")?.value,
      numero: this.form.get("numero")?.value,
      direccion: this.form.get("direccion")?.value
    }
  
    if(this.id== undefined){
      this._empleadoService.saveEmpleado(empleados).subscribe(data=>{
        this.obtenerEmpleados();
        console.log(empleados);
        this.form.reset();
      },error=>{
        this.toastr.error('Ops ocurrio un error','Error');
        console.log(error);
      });
  }else{
    empleados.id = this.id;
    this._empleadoService.updateEmpleado(this.id,empleados).subscribe(data=>{
      this.form.reset();
      this.title = "Agregar";
      this.id= undefined;
      this.toastr.info('El regitro se actualizo con exito','Registro Actualizado');
      this.obtenerEmpleados();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
    
  }        
}           

editarEmpleado(empleado:any){
  this.title = "Editar";
  this.id = empleado.id;

  this.form.patchValue({
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    cedula: empleado.cedula,
    cargo: empleado.cargo,
    numero:empleado.numero,
    direccion: empleado.direccion
  })
}

eliminar(id: number){
  this._empleadoService.deleteEmpleado(id).subscribe(data=>{
    this.toastr.error('Usuario eliminado con exito', 'Usuario Eliminado');
    this.obtenerEmpleados();
  },error=>{
    this.toastr.error('Ops ocurrio un error','Error');
    console.log(error);
  })
  
}
  
}