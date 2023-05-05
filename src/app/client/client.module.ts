import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ProduitsModule } from '../produits/produits.module';
import { LayoutsModule } from './composants/layouts/layouts.module';
import { CommandesModule } from '../commandes/commandes.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ProduitsModule,
    LayoutsModule
  ]
})
export class ClientModule { }
