import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogue } from '../models/catalogue';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

private urlCatalogue:string="http://localhost:8000/api/catalogues"


  constructor(private http:HttpClient) { }

  all():Observable<Catalogue>{
      
    return this.http.get<any>(this.urlCatalogue)
    
  }
}
