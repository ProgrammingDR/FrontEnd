import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  private myAppUrl= "https://cafeteriaparaisobackend.azurewebsites.net/";
  private myApiUrl = 'api/Empleado/';

  constructor(private http:HttpClient) { }

  getListEmpleados():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  deleteEmpleado(id : number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveEmpleado(User:any):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, User);
  }

  updateEmpleado(id:number, User:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, User);
  } 

}
