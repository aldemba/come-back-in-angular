import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { Itoken } from '../models/itoken';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User|undefined

  url="http://localhost:8000/api/login_check"


  constructor(private http:HttpClient) { }

  public hasRole(role: string){ return this.user?.roles?.includes(role as never); }

  // login(usercred:Credentials): Observable<Itoken>{
  //   return this.http.post<Itoken>(this.url,usercred)
  //    }

}
