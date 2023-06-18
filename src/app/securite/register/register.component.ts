import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  
  constructor(private formbuilder:FormBuilder){
    this.reactiveform=this.formbuilder.group({
      login:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password:new FormControl('',Validators.compose([Validators.required])),
      cpassword:new FormControl('',Validators.compose([Validators.required]))
    })
    
  }

  get f(){
    return this.reactiveform.controls;
  }
  


}
