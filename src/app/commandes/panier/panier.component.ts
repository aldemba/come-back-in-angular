import { Component } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  somme=0;
  constructor(private panierserv:PanierService){}

  mesAchats$=this.panierserv.achats

  ngOnInit():void{
    this.calculSomme()
  }

  incrementOuDecrement(produit:Produit,plusOuMoins:number){
    this.panierserv.plusOuMoins(produit,plusOuMoins)
  }

  delete(produit:Produit){
    this.panierserv.remove(produit)
  }

  calculSomme(){
    this.somme=this.panierserv.PricePanier()
  }
}
