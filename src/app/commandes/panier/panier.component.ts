import { Component } from '@angular/core';
import { PanierService } from 'src/app/shared/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  
  constructor(private panierserv:PanierService){}

  mesAchats$=this.panierserv.achats

  ngOnInit():void{

  }

}
