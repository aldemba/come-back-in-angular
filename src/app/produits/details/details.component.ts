import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  menus:Produit[]=[];
  burgers:Produit[]=[];
//    produits:Produit;

constructor(private route:ActivatedRoute, private dservice:DetailsService, private panier:PanierService, private catalogue:CatalogueService){}

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
          console.log(data);
  
          this.produitsSimilaires=[];

          if(this.details.produit['@type']=="Menu"){
            this.menus.forEach(m=>{ if(m.id !=this.details.id && this.produitsSimilaires.length<2) this.produitsSimilaires.push(m) })
            this.produitsSimilaires=this.shuffleArray(this.produitsSimilaires);
          }

          if(this.details.produit['@type']=="Burger"){
            this.burgers.forEach(b=>{ if(b.id !=this.details.id && this.produitsSimilaires.length<2) this.produitsSimilaires.push(b) })
            this.produitsSimilaires=this.shuffleArray(this.produitsSimilaires);
          }

          console.log(this.produitsSimilaires); 
        })
      })
    }
  })
}


addToCart(produit: Produit,quantite:number) {
  // produit["quantite"] = quantite;
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
