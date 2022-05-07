import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  title ="Registrar";
  venta:any[] = [{
    Tipo: "Bebida",
    Producto: "Jugo mixto",
    Empleado: "Darwin",
    Cliente: "Uri",
    Cantidad: "10",
    Precio:"70"
  },
  {
    Tipo: "Bebida",
    Producto: "Jugo mixto",
    Empleado: "Darwin",
    Cliente: "Uri",
    Cantidad: "10",
    Precio:"70"
  }];

  form: FormGroup;




  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      Tipo: [''],
      Producto: [''],
      Empleado: [''],
      Cliente: [''],
      Cantidad: [''],
      Precio: ['']
    })
  }

  ngOnInit(): void {
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

      this.venta.push(venta);
      this.form.reset();
  }

          eliminar(index:number){
          this.venta.splice(index, 1)
          }

}
