import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-listcard',
  templateUrl: './listcard.component.html',
  styleUrls: ['./listcard.component.css']
})
export class ListcardComponent {
  @Input() catalogueVersCard:Produit[]|undefined=[]

  CatalogueFiltre:Produit[]|undefined=[]

  constructor(private search:SearchService) {
    this.search.resultSearch$.subscribe((value)=>{
      this.filterProducts(value);
      console.log(this.CatalogueFiltre);
      
    })
  }

 ngOnInit(): void {

  this.CatalogueFiltre = this.catalogueVersCard;
 
 }

 filterProducts(searchTerm: string): void {
  if (searchTerm === '') {
    this.CatalogueFiltre = this.catalogueVersCard;
  } else {
    this.CatalogueFiltre = this.catalogueVersCard?.filter(
      (produit: Produit) =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
}



