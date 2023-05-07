import { Component, EventEmitter, Output } from '@angular/core';
import { PanierService } from 'src/app/shared/services/panier.service';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  constructor(private search:SearchService, private panier:PanierService){
    
  }
  panierItems$=this.panier.achats

  @Output() info=new EventEmitter<string>()


  emetDonnees(data:string){
    this.info.emit(data)
  }

  recherche(data:string){
    this.search.setData(data);
  }


}
