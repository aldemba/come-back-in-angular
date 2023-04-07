import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';

@Component({
  selector: 'app-listcard',
  templateUrl: './listcard.component.html',
  styleUrls: ['./listcard.component.css']
})
export class ListcardComponent {
  @Input() catalogueVersCard:Produit[]|undefined=[]

  constructor() {
  }

 ngOnInit(): void {
  
 }

}
