import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  Users:any[] = []
  
  //Declaracion de los form sing in and sing up
  formSingIn: FormGroup = new FormGroup({});
  formSingUp: FormGroup = new FormGroup({});

  //inyeccion de dependencias
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _loginservice:LoginService) { 
      this.formSingIn = this.fb.group({
        User: ['',Validators.required],
        Pass: ['',Validators.required]
      });
      this.formSingUp = this.fb.group({
        User: ['',Validators.required],
        Pass: ['',Validators.required],
        email: ['',Validators.required]
      })
     }

  //Get All users
  obtenerUsuario(){
    this._loginservice.getListUsers().subscribe(data =>{
      this.Users = data;
    },error =>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }
  
  //sing in
  ingresar(){
    const venta = {
      User: this.formSingIn.get("User")?.value,
      Pass: this.formSingIn.get("Pass")?.value
    }
     this.obtenerUsuario()
     if(this.Users.some(u => u.user === venta.User && u.pass === venta.Pass)){
      this.toastr.success('Inicio de sesion exitoso', 'Inicio de sesion');
      this.router.navigate(["/inicio"]);
    }else{
      this.toastr.error('Usuario y/o contrase;a incorrectos','Error');
      this.formSingIn.reset();
    }
  }

  //sing up
  registrar(){
    const singUp = {
      User: this.formSingUp.get("User")?.value,
      Pass: this.formSingUp.get("Pass")?.value,
      email: this.formSingUp.get("email")?.value  
    }
    this._loginservice.saveUser(singUp).subscribe(data=>{
      this.toastr.success('Registro exitoso', 'Usuario Registrado');
      this.formSingUp.reset();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    });
  }

  //charge 
  ngOnInit(): void {
    this.obtenerUsuario() 
  }
}