import { Component } from '@angular/core';
import { CatalogueService } from 'src/app/shared/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {

  produit:any

  constructor(private catalogueservice:CatalogueService){

  }

  ngOnInit():void {
    this.catalogueservice.all().subscribe((data)=>{
      console.log(data);
      this.produit=data.produit
      
    })
  }

}
