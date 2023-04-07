import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Catalogue } from '../models/catalogue';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

private urlCatalogue:string="http://localhost:8000/api/catalogues"


  constructor(private http:HttpClient) { }

  all():Observable<Catalogue>{

    //  console.log(this.http.get<any>(this.urlCatalogue));
    
    return this.http.get<any>(this.urlCatalogue).pipe(map(data=>{
      let Catalog:Catalogue={
        menu:data["hydra:member"][0].menus,
        burger:data["hydra:member"][1].burgers,
        produit:[...data['hydra:member'][0].menus,...data['hydra:member'][1].burgers]
      }
      return Catalog
    }),
    )
    
  }
}
