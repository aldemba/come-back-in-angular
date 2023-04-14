import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() info=new EventEmitter<string>()


  emetDonnees(data:string){
    this.info.emit(data)
  }
}
