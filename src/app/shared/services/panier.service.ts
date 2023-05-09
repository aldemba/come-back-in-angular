import { Injectable } from '@angular/core';
import { Produit } from '../models/produit';
import { BehaviorSubject, map, Observable, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PanierService {

  mesAchatSubject =  new BehaviorSubject<Produit[]>([]);
  achats = this.mesAchatSubject.asObservable();

  constructor() 
  { 
      let mesProduitsDuPanier = JSON.parse(localStorage.getItem("panier")||'[]'); 

      if(!mesProduitsDuPanier) mesProduitsDuPanier = [];

      this.mesAchatSubject.next(mesProduitsDuPanier);
  }

  ajouterAuPanier(produit: Produit,quantite:number)
  {
    this.achats.pipe(
      take(1),

      map((produits: Produit[]) => {
          
        let tab = JSON.parse(localStorage.getItem("panier")||'[]');

          if(tab)
          {
            let found = false
            tab.forEach((p:any) => {
              if (produit.id == p.id && produit.nom == p.nom)
                found = true
            })

            if(!found) //Si on ne trouve pas le produit dans le panier on l'ajoute
            {
              produit = Object.assign({}, produit, {"quantite":quantite}) //qte du produit for the very first time

              produits.push(produit);
            }
            else // si on l'a trouvé on augmente sa quantité
            {
              // if(produit.categorie == "menu" && produit.tailles)
              // {
              //   produit = Object.assign({}, produit, {"quantite":1}) //qte du produit for the very first time
              //   produits.push(produit);
              // }
                produits.forEach(p => {
                  if(p.id == produit.id)
                    p.quantite+=Number  (quantite) ;
                })
            }
          }

        this.mesAchatSubject.next(produits); //on passe le nouveau tableeau au behaviourSubject

        localStorage.setItem("panier", JSON.stringify(produits)); //on ecrase le panier du local storage avec le new
      })
    ).subscribe();
  }

  getPanier(){ return this.achats } //Retourne le panier 
 
  remove(produit: Produit){
    this.achats.pipe(
      take(1),

      map((produits: Produit[]) => {
        let tab = JSON.parse(localStorage.getItem("panier")||'[]');

        if(tab){
          let found = tab.find((param:any) => param.id == produit.id)
          if(found)
          {
            produits.splice(produits.indexOf(produit), 1)

            this.mesAchatSubject.next(produits);

            localStorage.setItem("panier", JSON.stringify(produits));
          }
      }})).subscribe()
  }  

  plusOuMoins(produit: Produit, plusOuMoins:number){

    this.achats.pipe(
      take(1),

      map((produits: Produit[]) => {
          
        let tab = JSON.parse(localStorage.getItem("panier")||'[]');

          if(tab){
            let found = false
            tab.forEach((p:any) => {
              if (produit.id == p.id && produit.nom == p.nom)
                found = true
            })
            if(found)
            {
                produits.forEach(p => {
                  if(produit.id == p.id && produit.nom == p.nom)
                    if(plusOuMoins == 1)  // dans un panier pour chaque produit on a les boutons +1 et -1 pour augmenter les quantités 
                      p.quantite++  //si on clique sur 1, augmente la quantite de 1
                    else if(plusOuMoins == -1 && p.quantite > 1) // si on clique sur -1 et que le produit sur lequel on a cliqué a une quantite >1 
                      p.quantite--; //alors diminue de 1 la quantite du produit
                })
            }
          }

        this.mesAchatSubject.next(produits);
        localStorage.setItem("panier", JSON.stringify(produits));
      })
    ).subscribe();
  }

  resetPanier()
  {
    this.mesAchatSubject.next([]);
    localStorage.setItem("panier", JSON.stringify([]));
  }


  PricePanier(){
    let tab=0
    this.achats.pipe(
      map((produits) => {
        produits.forEach((element:any) =>{
          tab+=(element.prix * element.quantite)
        });
        localStorage.setItem('produit', JSON.stringify(produits));
      })
    ).subscribe();
    return tab
  }

}
