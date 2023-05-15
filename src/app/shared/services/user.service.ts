import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private tokenservice:TokenService) { }

  // public getUsername() {  return this.tokenservice.getUser(this.tokenservice.getToken()).username  }

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
  
}
