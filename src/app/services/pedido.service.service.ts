import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {
  private myAppUrl= "https://cafeteriaparaisobackend.azurewebsites.net/";
  private myApiUrl = 'api/Pedido/';

  constructor(private http:HttpClient) { }

  getListPedidos():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deletePedido(id : number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  savePedido(User:any):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, User);
  }

  updatePedido(id:number, User:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, User);
  }
}
