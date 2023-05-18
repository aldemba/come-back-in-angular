import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { throwError,firstValueFrom,catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 private url_allUsers:string='http://localhost:8000/api/users'

  constructor(private http:HttpClient, private tokenservice:TokenService) { }

  // public getUsername() {  return this.tokenservice.getUser(this.tokenservice.getToken()).username  }

  public async getAllUsers():Promise<any>  {  return await firstValueFrom(this.http.get<any>(this.url_allUsers).pipe( catchError(this.handleError)));}


  public getUsername() {
    const token = this.tokenservice.getToken();
    if (token !== null && typeof token === 'string') {
      const user = this.tokenservice.getUser(token);
      if (user !== null && typeof user.username === 'string') {
        return user.username;
      }
    }
    // Traitez le cas où le token est nul, n'est pas une chaîne de caractères
    // ou lorsque l'utilisateur ou le nom d'utilisateur n'est pas disponible
    // return 'Nom d'utilisateur non disponible';
    console.log("token nul,utilisateur ou nom utilisateur non disponible");
    
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

  async getClientId()
  {
    let username = this.getUsername()

    let users = await this.getAllUsers()
      
    let client = users.find((el:any) => el.email == username);
              
    return await client.id
  }
  
}
