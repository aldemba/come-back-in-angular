import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

 @Input() listCardVersCard:any

 constructor(private panier:PanierService){}

 addToCart(produit:Produit,quantite:number){
  this.panier.ajouterAuPanier(produit,quantite);
 }

}
