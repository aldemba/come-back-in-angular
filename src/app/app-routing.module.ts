import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
{path:'client', loadChildren: ()=>import('./client/client.module').then(m=>m.ClientModule)},
{path:'panier',loadChildren:()=>import('./commandes/commandes.module').then(m=>m.CommandesModule)},
{path:'security',loadChildren:()=>import('./securite/securite.module').then(m=>m.SecuriteModule)},
{path:'', redirectTo:'client',pathMatch:'full'},
{path:'error', component:NotFoundComponent},
{path:'**', redirectTo:'/error'},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
