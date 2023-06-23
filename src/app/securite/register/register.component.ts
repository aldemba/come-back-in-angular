import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class RegisterComponent {
  
  public reactiveform!: FormGroup

  //pour utiliser reactiveform, il faut importer ReactiveFormsModule dans le module concerné
  
  constructor(private formbuilder:FormBuilder,private auth:AuthService){
    this.reactiveform=this.formbuilder.group({
      // login:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      login:new FormControl('',Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')),
      password:new FormControl('',Validators.compose([Validators.required])),
      cpassword:new FormControl('',Validators.compose([Validators.required]))
    },{
      validators:this.MustMatch('password','cpassword')
    })
    
  }

  get f(){
    return this.reactiveform.controls;
  }

  proceed(){
  let form = this.reactiveform.value;

  this.auth.inscription(form);

  }
  

  MustMatch(password:any,confpassword:any){
    return (formGroup:FormGroup)=>{


      const passwordControl=formGroup.controls[password]
      const confPasswordControl=formGroup.controls[confpassword]

      if (confPasswordControl.errors && !confPasswordControl.errors['Mustmatch']) {
        return;
      }

      if (passwordControl.value !== confPasswordControl.value) {
        confPasswordControl.setErrors({ Mustmatch:true })
      }else{
        confPasswordControl.setErrors(null)
      }


    }

  }


}
