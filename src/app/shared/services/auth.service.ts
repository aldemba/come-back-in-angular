import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials';
import { Itoken } from '../models/itoken';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:User|undefined

  url="http://localhost:8000/api/login_check"


  constructor(private http:HttpClient,private tokenserv:TokenService,private redirige:Router,private userserv:UserService) { }

  public hasRole(role: string){ return this.user?.roles?.includes(role as never); }

  // login(usercred:Credentials): Observable<Itoken>{
  //   return this.http.post<Itoken>(this.url,usercred)
  //    }


  public async login(body : Credentials)
  {
    return await firstValueFrom(
      this.http.post<Itoken>(this.url, body).pipe(
        catchError( error => {            
          if(error.status == 401)
            console.log("Login et/ou mot de passe incorrect(s)!")
          return throwError(() => new Error("Login et/ou mot de passe incorrect(s)!"))
        })
      )
    ).then((data) => 
    {
      this.tokenserv.saveToken(data.token)  ;  
      this.user = (this.tokenserv.getUser(data.token));
      this.userserv.getClientId().then(m =>
        this.tokenserv.saveId(m)        
      );
            
      (this.hasRole("ROLE_CLIENT")) ?  this.redirige.navigate(["/client"]) : this.redirige.navigate(["/admin/commandes"])
    })
  }

}
