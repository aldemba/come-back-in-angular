import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Details } from 'src/app/shared/models/details';
import { Produit } from 'src/app/shared/models/produit';
import { DetailsService } from 'src/app/shared/services/details.service';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
details:any|null

constructor(private route:ActivatedRoute, private dservice:DetailsService, private panier:PanierService){}


ngOnInit():void{

let id:number=this.route.snapshot.params['id']
this.dservice.getDetails(id).subscribe((data)=>{
  this.details=data
  console.log(data);
  
})

}

addToCart(produit: Produit,quantite:any) {
  // produit["quantite"] = quantite;
  this.panier.ajouterAuPanier(produit,quantite);
}


}
