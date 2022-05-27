import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private myAppUrl='https://localhost:7068/';
  private myApiUrl = 'api/Login/';

  constructor(private http:HttpClient) { }

  getListUsers():Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  saveUser(User:any):Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, User);
  }
}
