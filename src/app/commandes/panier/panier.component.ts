import { Component } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  // prixTotal=0;
  somme=0;
  constructor(private panierserv:PanierService){}

  mesAchats$=this.panierserv.achats

  public elts:any=[]

  ngOnInit():void{
    
    // this.panierService.getPanier().subscribe(produits => { this.elements = produits }), j'avais le choix entre mesAchats$ et utliser le pipe async dans la vue ou cette methode
     this.panierserv.getPanier().subscribe(produits =>{ this.elts = produits })
     console.log(this.elts);
    
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

  // totalPrice(){
  //   this.panierserv.getPanier().subscribe({
  //     next:data=>{
  //       this.prixTotal=0;
  //     }
  //   })
  // }
}
