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
  
  Usuario:any[]=[]
  
  //Declaracion de los form sing in and sing up
  form: FormGroup = new FormGroup({});
  form2: FormGroup = new FormGroup({});

  //inyeccion de dependencias
  constructor(private fb: FormBuilder, private router: Router,private toastr: ToastrService,private _loginservice:LoginService) { 
    if(localStorage.getItem("userin") == "true"){
      router.navigate(["/inicio"])
    }
  }


  obtenerUsuario(){
    this._loginservice.getListUsers().subscribe(data =>{
      this.Usuario = data;
      console.log(this.Usuario)
    },error =>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    })
  }
  
  //merodo para el sing in
  ingresar(){
    const venta:any ={
      User: this.form.get("User")?.value,
      Pass: this.form.get("Pass")?.value
    }
    this.obtenerUsuario()
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
    this._loginservice.saveUser(venta2).subscribe(data=>{
      this.obtenerUsuario();
      console.log(venta2);
      this.form.reset();
    },error=>{
      this.toastr.error('Ops ocurrio un error','Error');
      console.log(error);
    });
    this.form2.reset();
    this.toastr.success('Registro exitoso', 'Usuario Registrado');
  }

  ngOnInit(): void {

    this.obtenerUsuario()
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