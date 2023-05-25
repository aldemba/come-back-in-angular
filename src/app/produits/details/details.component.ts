import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from 'src/app/shared/models/details';
import { Produit } from 'src/app/shared/models/produit';
import { CatalogueService } from 'src/app/shared/services/catalogue.service';
import { DetailsService } from 'src/app/shared/services/details.service';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
details:any|null;
produitsSimilaires:Produit[] = []

headerVisible=true;

  menus:Produit[]=[];
  burgers:Produit[]=[];
//    produits:Produit;

constructor(private route:ActivatedRoute, private dservice:DetailsService, private panier:PanierService, private catalogue:CatalogueService, private router:Router){}

ngOnInit():void{
  this.catalogue.all().subscribe({
    next:c=>{
      this.burgers=c.burger
      this.menus=c.menu

      let id=0;
      this.route.paramMap.subscribe(param=>{
        id= +param.get("id")!

        this.dservice.getDetails(id).subscribe((data)=>{
          this.details=data
          // console.log(data);
  
          this.produitsSimilaires=[];

          if(this.details.produit['@type']=="Menu"){
            this.menus.forEach(m=>{ if(m.id !=this.details.id && this.produitsSimilaires.length<2) this.produitsSimilaires.push(m) })
            this.produitsSimilaires=this.shuffleArray(this.produitsSimilaires);
          }

          if(this.details.produit['@type']=="Burger"){
            this.burgers.forEach(b=>{ if(b.id !=this.details.id && this.produitsSimilaires.length<2) this.produitsSimilaires.push(b) })
            this.produitsSimilaires=this.shuffleArray(this.produitsSimilaires);
          }

          // console.log(this.produitsSimilaires); 
          //  this.checkHeader();
        })
      })
    }
  })
}

checkHeader(){
//methode pour récupérer la route actuelle
let routeActuelle=this.router.url;

if(routeActuelle=='/client/details/15'){
  // console.log(routeActuelle);
  this.headerVisible=false;

}else{
  this.headerVisible=true;

}

}




addToCart(produit: Produit,quantite:number) {
  let complementsChoisis=document.getElementsByName("choisis[]") //les checkbox de chaque complément
  // let imgc=document.getElementsByName("imagec")
  // let qtecomplementsChoisis=document.getElementsByName("qteChoisie[]") //les checkbox de chaque complément
  let tableauBoissons:any = []
  
  if(complementsChoisis.length>0){
    complementsChoisis.forEach(c=>{
      if((<HTMLInputElement>c).checked){

        let qte=(<HTMLInputElement>c.nextElementSibling).value
        let idComplement=(<HTMLInputElement>c).value
        let image=(<HTMLInputElement>c).src
        console.log(image);
        
        let objet={
          // "image":image,
          "tailleboisson":"/api/taille_boissons/"+idComplement,
          "quantite":+qte
        }
        tableauBoissons.push(objet)
        
      }
    })
  }
  produit=Object.assign({},produit,{"tailleBoissons":tableauBoissons})
  // produit["quantite"] = quantite;
  console.log(produit);
  
  
  this.panier.ajouterAuPanier(produit,quantite);
}


public shuffleArray(array:Produit[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array
}

}
