import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/shared/models/produit';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

 @Input() listCardVersCard:any


}
