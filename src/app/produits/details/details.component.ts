import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
details:any|null

constructor(private route:ActivatedRoute, private dservice:DetailsService){}


ngOnInit():void{

let id:number=this.route.snapshot.params['id']
this.dservice.getDetails(id).subscribe((data)=>{
  this.details=data
})

}

}
