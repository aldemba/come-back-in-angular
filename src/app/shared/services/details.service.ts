import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Details } from '../models/details';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

 private urlDetails:string="http://localhost:8000/api/details"


  constructor(private http:HttpClient) { }


  getDetails(id:number):Observable<Details>{
    return this.http.get<any>(`${this.urlDetails}/${id}`)
  

  }

}
