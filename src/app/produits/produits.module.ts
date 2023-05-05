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


@NgModule({
  declarations: [
    CatalogueComponent,
    DetailsComponent,
    CardComponent,
    ListcardComponent,
    CardDetailsComponent,
    ListdetailsComponent
  ],
  imports: [
    CommonModule,
    ProduitsRoutingModule,
    LayoutsModule,
  ],
  exports: [
    CatalogueComponent,
    DetailsComponent
  ]
})
export class ProduitsModule { }
