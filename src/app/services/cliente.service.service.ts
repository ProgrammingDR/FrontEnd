import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {
  private myAppUrl= "https://cafeteriaparaisobackend.azurewebsites.net/";
  private myApiUrl = 'api/Cliente/';

  constructor(private http:HttpClient) { }

  getListClientes():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteCliente(id : number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveCliente(User:any):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, User);
  }

  updateCliente(id:number, User:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, User);
  }
}
