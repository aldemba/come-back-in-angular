import { Component } from '@angular/core';
import { CatalogueService } from 'src/app/shared/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {

  produit:any
  found:Boolean=true

  constructor(private catalogueservice:CatalogueService){

  }

  ngOnInit():void {
    this.catalogueservice.all().subscribe((data)=>{
      console.log(data);
      this.produit=data.produit
      
    })
  }

  // filtreCategories(category:string){
  //   this.catalogueservice.all().subscribe((data)=>{
  //       if (category=="Burger" || category=="Menu") {
  //       this.produit= data.produit.filter(c=>c.type=category)
  //         console.log("tyujk");
          
  //       }else{
  //         this.produit=data.produit
  //         console.log("no");
          
  //       }
  //   })


  // }

  clickchanged(type:string){
    switch (type) {
      case "Burger":
    this.catalogueservice.all().subscribe((data)=>this.produit=data.burger)
        
        break;
        case "Menu":
        this.catalogueservice.all().subscribe((data)=>this.produit=data.menu)
      
          break;
    
      default:
        this.catalogueservice.all().subscribe((data)=>this.produit=data.produit)

        break;
    }
  }



}
