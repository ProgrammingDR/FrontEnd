import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VentaServiceService {
  private myAppUrl='https://localhost:7068/';
  private myApiUrl = 'api/Venta/';
  filtroVenta:"" | undefined;
  constructor(private http:HttpClient) { }

  getListVentas():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteVenta(id : number):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveVenta(User:any):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, User);
  }

  updateVenta(id:number, User:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, User);
  }
}
