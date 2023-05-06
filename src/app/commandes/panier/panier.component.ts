import { Component } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  
  constructor(private panierserv:PanierService){}

  mesAchats$=this.panierserv.achats

  ngOnInit():void{

  }

  incrementOuDecrement(produit:Produit,plusOuMoins:number){
    this.panierserv.plusOuMoins(produit,plusOuMoins)
  }

}
