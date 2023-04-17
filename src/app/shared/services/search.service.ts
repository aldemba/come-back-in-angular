import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTerms= new BehaviorSubject<string>("");
  resultSearch$=this.searchTerms.asObservable();

  setData(value:string):void{
    this.searchTerms.next(value);
  }

  constructor() { }
}
