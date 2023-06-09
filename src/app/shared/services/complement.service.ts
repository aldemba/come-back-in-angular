import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplementService {

  private elementsSelectionnesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  elementsSelectionnes$ = this.elementsSelectionnesSubject.asObservable();

  constructor() {}

  // updateSelectedElements(elements: any[]) {
  //   this.elementsSelectionnesSubject.next(elements);
  // }

  ajouterElementSelectionne(element: any) {
    const elementsSelectionnes = this.elementsSelectionnesSubject.getValue();
    elementsSelectionnes.push(element);
    this.elementsSelectionnesSubject.next(elementsSelectionnes);
  }

  supprimerElementSelectionne(elementId: any) {
    const elementsSelectionnes = this.elementsSelectionnesSubject.getValue();
    // const index = elementsSelectionnes.indexOf(element);
    const index = elementsSelectionnes.findIndex(element => element.id === elementId);
    if (index > -1) {
      elementsSelectionnes.splice(index, 1);
      this.elementsSelectionnesSubject.next(elementsSelectionnes);
    }
  }
}
