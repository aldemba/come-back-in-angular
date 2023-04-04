import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ProduitsModule } from '../produits/produits.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ProduitsModule
  ]
})
export class ClientModule { }
