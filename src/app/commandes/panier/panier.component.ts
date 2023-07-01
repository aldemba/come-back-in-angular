import { Component } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';
import { CommandeService } from 'src/app/shared/services/commande.service';
import { PanierService } from 'src/app/shared/services/panier.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
   prixTotal=0;
  somme=0;
  constructor(private panierserv:PanierService, private tokenserv:TokenService, private commandeserv:CommandeService){}

  mesAchats$=this.panierserv.achats

  public elts:any=[]

  ngOnInit():void{
    
    // this.panierService.getPanier().subscribe(produits => { this.elements = produits }), j'avais le choix entre mesAchats$ et utliser le pipe async dans la vue ou cette methode
     this.panierserv.getPanier().subscribe(produits =>{ this.elts = produits })
     console.log(this.elts);
    
    this.calculSomme();
    
    // console.log(this.calculPrixPanier());
    this.calculPrixPanier();
    
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

  // public calculPrixPanier(){
  //   this.panierserv.getPanier().subscribe({
  //     next: data => { 
  //         this.elts=data;
  //         this.prixTotal = 0
  //         this.elts.forEach((el:any) => {  this.prixTotal += el.quantite * el.prix ,
  //         console.log(this.prixTotal),
  //         console.log(el);
          
          
  //         })
  //     }
  //   })  
  // }

  public calculPrixPanier() {
    let prixTotal = 0;
  
    const menuObj = this.elts.find((item: any) => item['@type'] === 'Menu');
    const burgerObj = this.elts.find((item: any) => item['@type'] === 'Burger');
  
    if (menuObj) {
      prixTotal += menuObj.prix * menuObj.quantite;
  
      if (menuObj.tailleBoissons) {
        menuObj.tailleBoissons.forEach((t: any) => {
          if (t["@type"] === "TailleBoisson") {
            prixTotal += t.quantite * t.prix;
          }
        });
      }
  
      if (menuObj.complements) {
        menuObj.complements.forEach((c: any) => {
          if (c["@type"] === "PortionFrite" || c["@type"] === "Boisson") {
            prixTotal += c.quantite * c.prix;
          }
        });
      }
    }
  
    if (burgerObj) {
      prixTotal += burgerObj.prix * burgerObj.quantite;
    }
  
    return prixTotal;
  }
  
  

  commander(){
    let tabBurgers:any = []
    let tabMenus:any = []
    let tabFrites:any = []
    let tabBoissons:any = []
    let tabTailleBoissons:any = []

    const menuObj = this.elts.find((item:any) => item['@type'] === 'Menu');
    const burgerObj = this.elts.find((item:any) => item['@type'] === 'Burger');


    if(menuObj){

      let tailleBois=menuObj.tailleBoissons

      if(tailleBois){
        tailleBois.forEach((t:any)=>{
          console.log(t);
          
          if(t["@type"]=="TailleBoisson"){
            let objet={
              "quantite":t.quantite,
              "@id":"/api/taille_boissons/"+t.id,
              "prix":1000
            }
            tabTailleBoissons.push(objet)

            this.prixTotal +=objet.quantite * objet.prix



          }
        })
      }

      let objet={
        "quantite":menuObj.quantite,
        "@id":"/api/menus/"+menuObj.id,
        "prix":menuObj.prix,
        "tailleBoissons":tabTailleBoissons
      }
      tabMenus.push(objet)

      // this.prixTotal +=menuObj.prix * menuObj.quantite

      this.prixTotal +=objet.quantite * objet.prix


      let complements= menuObj.complements



      if(complements){

        complements.forEach((c:any)=>{
          if (c["@type"]=="PortionFrite") {
            let objet={
              "quantite":c.quantite,
              "@id":"/api/portion_frites/"+c.id,
              "prix":c.prix
            }
            tabFrites.push(objet)

            this.prixTotal +=objet.prix * objet.quantite

          } 
           if(c["@type"]=="Boisson"){
            let objet={
              "quantite":c.quantite,
              "@id":"/api/boissons/"+c.id,
              "prix":500
            }
            tabBoissons.push(objet)

            this.prixTotal +=objet.prix * objet.quantite

          }
        })
      }

    }

    if (burgerObj){
        let objet={
          "quantite":burgerObj.quantite,
          "prix":burgerObj.prix,
          "@id":"api/burger/"+burgerObj.id
        }
        tabBurgers.push(objet)

        this.prixTotal +=objet.prix * objet.quantite

      
    }

    let clientId = this.tokenserv.getId()      

    const tab = 
    {
      "commandeMenus": tabMenus,
      "commandeBurgers": tabBurgers,
      "commandePortions": tabFrites,
      "client_id": "api/clients/"+clientId,
      "prix": this.prixTotal,
      "etat": "en attente",
      "commandeTailles": tabBoissons
    }

    this.commandeserv.saveOrder(tab);

    this.panierserv.resetPanier()
    // this.elts.forEach((el:any)=>{
    //   if(el["@type"]=="Menu"){
    //     let objet={
    //       "quantite":el.quantite,
    //       "@id":"/api/menus/"+el.id,
    //       "prix":el.prix
    //     }
    //     tabMenus.push(objet)
    //   } else if(el["@type"]=="Burger"){
    //     {
    //       // console.log("burger");
          
    //       let objet = {
    //           "quantite": el.quantite,
    //           "@id": "/api/burgers/"+el.id,
    //           "prix":  el.quantite * el.prix
    //       }
    //       tabBurgers.push(objet)
    //     }
    //   }
      
      
    // })
    // let clientId = this.tokenserv.getId()  
      
    // const tab = 
    // {
    //   "user_id":clientId,
    //   "etat": true,
    //   "montant": this.prixTotal,
    //   "commandeMenus": tabMenus,
    //   "commandeBurgers": tabBurgers,
    //   "commandePortions": tabFrites,
    //   "commandeTailles": tabTailleBoissons
    // }

    // this.commandeserv.saveOrder(tab);

    // this.panierserv.resetPanier()
  }

  // totalPrice(){
  //   this.panierserv.getPanier().subscribe({
  //     next:data=>{
  //       this.prixTotal=0;
  //     }
  //   })
  // }
}
