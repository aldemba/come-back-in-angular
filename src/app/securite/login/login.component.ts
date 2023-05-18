import { Component } from '@angular/core';
import { Credentials } from 'src/app/shared/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(){}

  ngOnInit():void{

  }

  form:Credentials={
    login:'',
    password:''
  }

  onSubmit(){
    
  }

}
