import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit                                           {                                        

  title = "Registrar";
  empleado:any[] = [
    {
    Nombre: "Darwin",
    Apellido: "Regalado",
    Cedula:"402-3020939-3",
    Cargo:"CEO",
    Numero:"(809) 590-0761",
    Direccion: "Av.Jacobo Majluta"
    },
    {
      Nombre: "Darwin",
      Apellido: "Regalado",
      Cedula:"402-3020939-3",
      Cargo:"CEO",
      Numero:"(809) 590-0761",
      Direccion: "Av.Jacobo Majluta"
    }
];

form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      Nombre: [''],
      Apellido: [''],
      Cedula:[''],
      Cargo: [''],
      Numero: [''],
      Direccion: ['']
    })
   }

  ngOnInit(): void {
  }                                                                            

  agreagarEmpleado(){
    const empleado:any ={
      Nombre: this.form.get("Nombre")?.value,
      Apellido: this.form.get("Apellido")?.value,
      Cedula: this.form.get("Cedula")?.value,
      Cargo: this.form.get("Cargo")?.value,
      Numero: this.form.get("Numero")?.value,
      Direccion: this.form.get("Direccion")?.value
    }

    this.empleado.push(empleado);
      this.form.reset();

               
}           

eliminar(index:number){
  this.empleado.splice(index, 1)
  }
  
}