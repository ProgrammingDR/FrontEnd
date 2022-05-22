import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  Usuario:any[]=[
    {
      User:"Darwin",
      Password:"150604",
      email:"ejemplo@gmail.com"
    },
    {
      User:"Keily",
      Password:"1234",
      email:"ejemplo@gmail.com"
    }
  ]
  
  //Declaracion de los form sing in and sing up
  form: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});

  //inyeccion de dependencias
  constructor(private fb: FormBuilder, private router: Router,private toastr: ToastrService) { 
    if(localStorage.getItem("userin") == "true"){
      router.navigate(["/inicio"])
    }
  }
  
  //merodo para el sing in
  ingresar(){
    const venta:any ={
      User: this.form.get("User")?.value,
      Pass: this.form.get("Pass")?.value
    }

    if(this.Usuario.some(u => u.User === venta.User && u.Password === venta.Pass)){
      this.toastr.success('Inicio de sesion exitoso', 'Inicio de sesion');
      this.form.reset();
      this.router.navigate(["/inicio"]);
    }else{
      this.toastr.error('Usuario y/o contrase;a incorrectos','Error');
      this.form.reset();
    }
  }

  //Metodo para el sing up
  registrar(){
    const venta2:any ={
      User: this.form2.get("User")?.value,
      Pass: this.form2.get("Pass")?.value,
      email: this.form2.get("email")?.value  
    }
    
    this.Usuario.push(venta2);
    this.form2.reset();
    this.toastr.success('Inicio de sesion y registro exitoso', 'Usuario Registrado');
    this.router.navigate(['/inicio']);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      User: ['',Validators.required],
      Pass: ['',Validators.required]
    });
    this.form2 = this.fb.group({
      User: ['',Validators.required],
      Pass: ['',Validators.required],
      email: ['',Validators.required]
    })
  }
}