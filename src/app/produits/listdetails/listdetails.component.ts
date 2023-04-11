import { Component, Input } from '@angular/core';
import { Details } from 'src/app/shared/models/details';

@Component({
  selector: 'app-listdetails',
  templateUrl: './listdetails.component.html',
  styleUrls: ['./listdetails.component.css']
})
export class ListdetailsComponent {

@Input() listedescomplements:Details[]|undefined=[]


}
