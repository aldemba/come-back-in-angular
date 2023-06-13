import { Component, Input } from '@angular/core';
import { Details } from 'src/app/shared/models/details';
import { ComplementService } from 'src/app/shared/services/complement.service';

@Component({
  selector: 'app-listdetails',
  templateUrl: './listdetails.component.html',
  styleUrls: ['./listdetails.component.css']
})
export class ListdetailsComponent {

  constructor(private comp:ComplementService){}

@Input() listedescomplements:Details[]|undefined=[];

// elementsSelectionnes: any[]=[];

onCheckboxChange(event: any) {
  const elementId = event.target.value;
  const isChecked = event.target.checked;
  const elementType = event.target.dataset.type;
  const elementName = event.target.dataset.nom;

  if (isChecked) {
    const newElement={id:elementId,nom:elementName,type:elementType}
    this.comp.ajouterElementSelectionne(newElement);
  } else {
     this.comp.supprimerElementSelectionne(elementId);
    }
  }

 


}
