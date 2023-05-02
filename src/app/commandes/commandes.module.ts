import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandesRoutingModule } from './commandes-routing.module';
import { PanierComponent } from './panier/panier.component';
import { MesCommandesComponent } from './mes-commandes/mes-commandes.component';


@NgModule({
  declarations: [
    PanierComponent,
    MesCommandesComponent
  ],
  imports: [
    CommonModule,
    CommandesRoutingModule
  ],
  exports:[
    PanierComponent,
    MesCommandesComponent
  ]
})
export class CommandesModule { }
