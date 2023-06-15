import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from '../produits/catalogue/catalogue.component';
import { DetailsComponent } from '../produits/details/details.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {path:"",component:CatalogueComponent},
  {path:"details/:id",component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
