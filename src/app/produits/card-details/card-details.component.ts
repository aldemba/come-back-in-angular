import { Component, Input } from '@angular/core';
import { Details } from 'src/app/shared/models/details';
import { ComplementService } from 'src/app/shared/services/complement.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {

  constructor(private comp:ComplementService){}

@Input() transfert:any

onQuantiteChange(event: any, elementId: any) {
  const quantiteValue = parseInt(event.target.value);
  this.comp.updateQuantiteElement(elementId, quantiteValue);
}



}
