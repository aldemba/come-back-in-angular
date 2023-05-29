import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PanierService } from 'src/app/shared/services/panier.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  estConnecte: boolean = false;

  
  constructor(private search:SearchService, private panier:PanierService, private token:TokenService, private router:Router){
    
  }

  ngOnInit(){
    const token = localStorage.getItem('token');
    this.estConnecte = !!token; // Vérifie si le token existe
  }

  panierItems$=this.panier.achats

  @Output() info=new EventEmitter<string>()


  emetDonnees(data:string){
    this.info.emit(data)
  }

  recherche(data:string){
    this.search.setData(data);
  }

  logout(){
    this.token.clearToken()
  }

  login(){
    this.router.navigate(["security/login"])
  }


}
