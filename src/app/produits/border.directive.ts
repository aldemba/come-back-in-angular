import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {

 
  constructor(private el:ElementRef) { 
    this.setBorder('#f5f5f5');
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder('#009688');
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder('#f5f5f5');
  }



  setBorder(color:string){
    let border='solid 4px ' + color;
    this.el.nativeElement.style.border=border;
  }

}
