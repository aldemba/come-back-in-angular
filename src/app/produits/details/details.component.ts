import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Details } from 'src/app/shared/models/details';
import { Produit } from 'src/app/shared/models/produit';
import { CatalogueService } from 'src/app/shared/services/catalogue.service';
import { ComplementService } from 'src/app/shared/services/complement.service';
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
selectedElements: any[]=[];


headerVisible=true;

  menus:Produit[]=[];
  burgers:Produit[]=[];

constructor(private route:ActivatedRoute, private dservice:DetailsService, private panier:PanierService, private catalogue:CatalogueService, private router:Router, private comp:ComplementService){}

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

        })
      })
    }
  })
  this.comp.elementsSelectionnes$.subscribe(el=>{
    this.selectedElements=el
    console.log(this.selectedElements);
    
  })
}

// checkHeader(){
// //methode pour récupérer la route actuelle
// let routeActuelle=this.router.url;

// if(routeActuelle=='/client/details/15'){
//   // console.log(routeActuelle);
//   this.headerVisible=false;

// }else{
//   this.headerVisible=true;

// }

// }




addToCart(produit: Produit,quantite:number) {
   let complementsChoisis=document.getElementsByName("accomp[]") //les checkbox de chaque complément
      // let imgc=document.getElementById("imagec");
   // let qtecomplementsChoisis=document.getElementsByName("qteChoisie[]") //les checkbox de chaque complément
   let tableauBoissons:any = []
  
   if(complementsChoisis.length>0){
     complementsChoisis.forEach(c=>{
       if((<HTMLInputElement>c).checked){

         let qte=(<HTMLInputElement>c.nextElementSibling).value
         let idComplement=(<HTMLInputElement>c).value

         let objet={
          "@type":"TailleBoisson",
          "id":idComplement,
           "TailleBoisson":"/api/taille_boissons/"+idComplement,
           "quantite":+qte
         }
         tableauBoissons.push(objet)
        
       }
     })
   }

   const checkboxes = document.getElementsByName("choisis[]") as NodeListOf<HTMLInputElement>;
   const qteInputs = document.getElementsByName("qteChoisie[]") as NodeListOf<HTMLInputElement>;
   const tableauComplements: any[] = [];
 
   checkboxes.forEach((checkbox, index) => {
     if (checkbox.checked) {
       const qteInput = qteInputs[index];
       const qte = Number(qteInput.value);
       const idComplement = checkbox.value;
       const typeComplement = checkbox.getAttribute("data-type");
       const nomComplement = checkbox.getAttribute("data-nom");
       const prixComplement = Number(checkbox.getAttribute("data-prix"));
 
       const complement = {
         id: idComplement,
         "@type": typeComplement,
         "nom": nomComplement,
         "quantite": qte,
         "prix":prixComplement
       };
 
       tableauComplements.push(complement);
     }
   });

   produit=Object.assign({},produit,{"tailleBoissons":tableauBoissons,"complements":tableauComplements})
   
   
  
  // console.log(produit);
  
  
  this.panier.ajouterAuPanier(produit,quantite);
}

// addBoissonMenu(boisson:Produit,menuId:any){
//   boisson.quantite=1
//    let produit=  this.panier.panier.value.produits.find(p=> p.id==menuId)
//     if(produit) produit.boissons?.push(boisson)
//     console.log(this.panier.panier.value.produits)
//     console.log(menuId)
//     console.log(produit)
// }

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



