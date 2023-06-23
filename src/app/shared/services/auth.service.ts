import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  url_inscription="http://localhost:8000/api/clients"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.tokenserv.getToken()}`,
    })
  }

  


  constructor(private http:HttpClient,private tokenserv:TokenService,private redirige:Router,private userserv:UserService) { }

  public hasRole(role: string){ return this.user?.roles?.includes(role as never); }

  // login(usercred:Credentials): Observable<Itoken>{
  //   return this.http.post<Itoken>(this.url,usercred)
  //    }


  public async login(body : Credentials)
  {
    return await firstValueFrom(
      this.http.post<Itoken>(this.url, body,this.httpOptions).pipe(
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
      console.log(this.user);
      
      this.userserv.getClientId().then(m =>
        this.tokenserv.saveId(m)        
      );
            
      (this.hasRole("ROLE_CLIENT")) ?  this.redirige.navigate(["/client"]) : this.redirige.navigate(["/client/details/1"])
    })
  }


  public inscription(body: User)
  {
    return this.http.post<any>(this.url_inscription, body).subscribe(
    {
      next: data => { 
        console.log(data);
        this.redirige.navigate(["/security/login"])
      },
      error: () => catchError(this.handleError),
    });
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
