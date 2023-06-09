import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveId(id: number){  localStorage.setItem("id",id.toString());    }

  getId(){  return localStorage.getItem("id");    }

  saveToken(token: string){  localStorage.setItem("token", token);    }

  // getUser(token: string){  return JSON.parse(atob(token.split(".")[1]))}
  
  // getUser(token: string) {
  //   const base64Token = token.split(".")[1];
  //   const decodedToken = JSON.parse(Buffer.from(base64Token, 'base64').toString('utf8'));
  //   return decodedToken;
  // }

  //Pour utiliser atob, il faut installer Buffer
  
  getUser(token: string){  return JSON.parse(atob(token.split(".")[1]))}
  

  getToken(): string | null{  return localStorage.getItem("token") }


  isLogged():boolean{

    const token=localStorage.getItem('token')

    return !!token
  }



  clearToken()
  {
    localStorage.removeItem("token");
    // location.reload();
     this.router.navigate(["security/login"])
  }



  constructor(private router:Router) { }
}
