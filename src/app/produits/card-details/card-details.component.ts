import { Component, Input } from '@angular/core';
import { Details } from 'src/app/shared/models/details';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {
@Input() transfert:any
}
