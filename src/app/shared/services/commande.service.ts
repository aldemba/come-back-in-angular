import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Commandes } from '../models/commandes';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http:HttpClient, private router:Router) { }

  commande_url:string="http://localhost:8000/api/commandes"

  saveOrder(body:any){
    this.http.post<any>(this.commande_url,body).subscribe({
      // next: data => {  this.router.navigate(["/commandes/", data.id]) },
      error: error =>{  alert("Y'a erreur")}
    })
  }
}
