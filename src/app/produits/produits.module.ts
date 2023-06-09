import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './produits-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DetailsComponent } from './details/details.component';
import { CardComponent } from './card/card.component';
import { ListcardComponent } from './listcard/listcard.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { LayoutsModule } from '../client/composants/layouts/layouts.module';
import { ListdetailsComponent } from './listdetails/listdetails.component';
import { BorderDirective } from './border.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogueComponent,
    DetailsComponent,
    CardComponent,
    ListcardComponent,
    CardDetailsComponent,
    ListdetailsComponent,
    BorderDirective
  ],
  imports: [
    CommonModule,
    ProduitsRoutingModule,
    LayoutsModule,
    FormsModule
  ],
  exports: [
    CatalogueComponent,
    DetailsComponent
  ]
})
export class ProduitsModule { }
