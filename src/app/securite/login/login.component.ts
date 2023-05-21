import { Component } from '@angular/core';
import { Credentials } from 'src/app/shared/models/credentials';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public erroMessage = ""


  constructor(private authservice:AuthService){}
  

  ngOnInit():void{

  }

  form:Credentials={
    login:'',
    password:''
  }

  onSubmit(){
    this.authservice.login(this.form).catch((err)=>(this.erroMessage=err))
  }

}
